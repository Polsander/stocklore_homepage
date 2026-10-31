/**
 * Site validation harness — the merge gate from docs/REDESIGN_PLAN.md §10.
 *
 * For every page × theme × device in the matrix:
 *   1. asserts zero horizontal overflow (scrollWidth ≤ clientWidth), and
 *   2. runs axe-core (serious/critical violations fail the run) on a
 *      desktop + phone subset.
 * Once per page (desktop), it also guards the hand-off to the portal:
 *   3. every link into the portal lands on one of its signed-out screens, and a
 *      link that names one ("Sign in", "Get started", …) lands on that one;
 *   4. every sign-up form is a plain GET to /register whose one field is
 *      `email`, and submitting it really arrives URL-encoded.
 * And once per run:
 *   5. /favicon.svg is still a byte-for-byte copy of the portal's mark.
 *
 * Usage:  node scripts/site-check.mjs [baseUrl]     (default http://localhost:8788)
 *   env:  SCREENSHOT_DIR=/path  → also saves review screenshots.
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { createHash } from "node:crypto";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:8788";
const SCREENSHOT_DIR = process.env.SCREENSHOT_DIR;

const PAGES = ["/", "/features/", "/roadmap/", "/contact/", "/email/", "/404.html"];
// The site is light-only by design decision (see docs/REDESIGN_PLAN.md addendum).
const THEMES = ["light"];

// REDESIGN_PLAN.md §10.1 device matrix (CSS px)
const DEVICES = [
  { name: "reflow-320", width: 320, height: 568 },
  { name: "iphone-se", width: 375, height: 667 },
  { name: "android-small", width: 360, height: 640 },
  { name: "iphone-14", width: 390, height: 844 },
  { name: "iphone-16", width: 393, height: 852 },
  { name: "iphone-pro-max", width: 430, height: 932 },
  { name: "pixel-8", width: 412, height: 915 },
  { name: "galaxy-s24", width: 384, height: 832 },
  { name: "iphone-14-landscape", width: 844, height: 390 },
  { name: "ipad-mini", width: 768, height: 1024 },
  { name: "ipad-landscape", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "desktop-xl", width: 1920, height: 1080 },
];

// axe runs on this subset (every page × theme, two representative widths)
const AXE_DEVICES = new Set(["iphone-14", "desktop"]);

// The portal's signed-out screens are a fixed contract (open_ims
// client/README.md › "Signed-out screens"). Pinned here rather than imported
// from src/data/site.ts, so a wrong constant there fails too.
const PORTAL = "https://portal.stocklore.app";
const PORTAL_HOST = new URL(PORTAL).host;
const PORTAL_SCREENS = {
  signIn: `${PORTAL}/`,
  register: `${PORTAL}/register`,
  terms: `${PORTAL}/terms`,
  privacy: `${PORTAL}/privacy`,
};
// A link that says where it goes has to go there — "Get started" landing on
// the sign-in form is the bug this guard exists for.
const LINK_INTENTS = [
  [/get started|start now|sign up|create|claim/i, PORTAL_SCREENS.register],
  [/sign in|log in|open the app/i, PORTAL_SCREENS.signIn],
  [/terms/i, PORTAL_SCREENS.terms],
  [/privacy/i, PORTAL_SCREENS.privacy],
];
const SIGNUP_FORMS = `form[data-signup-form], form[action^="${PORTAL}"]`;
// Plus-addressing is the encoding trap: an unencoded `+` decodes to a space.
const PROBE_EMAIL = "Jordan+Test@Northwind.co";
const PROBE_LANDING = `${PORTAL_SCREENS.register}?email=Jordan%2BTest%40Northwind.co`;

// public/favicon.svg is a byte-for-byte copy of the portal's mark (open_ims
// microservices/ims/client/src/assets/public/svgs/logo.svg). A re-traced or
// minified copy silently drops the dog's eye and nose, which are <ellipse> and
// <rect> elements. A new mark means copying the file again AND updating this.
const FAVICON_SHA256 = "ffcb0f6810781fa5690b5c2b97edbd399f598701fb28f6de9bcaa8543f4fdfa0";

const failures = [];
let checks = 0;

/** Guards 3 and 4 on the loaded page. Leaves the page reloaded at `path`. */
async function portalHandoffFailures(page, path) {
  const out = [];
  const { links, forms } = await page.evaluate(
    ({ host, formSelector }) => ({
      links: [...document.querySelectorAll("a[href]")]
        .filter((a) => new URL(a.href).host === host)
        .map((a) => ({ href: a.getAttribute("href"), text: a.textContent.replace(/\s+/g, " ").trim() })),
      forms: [...document.querySelectorAll(formSelector)].map((form) => ({
        method: form.getAttribute("method"),
        action: form.getAttribute("action"),
        fields: [...form.elements].filter((el) => el.name).map((el) => el.name),
      })),
    }),
    { host: PORTAL_HOST, formSelector: SIGNUP_FORMS },
  );

  const screens = Object.values(PORTAL_SCREENS);
  checks++;
  for (const { href, text } of links) {
    const intended = LINK_INTENTS.find(([pattern]) => pattern.test(text))?.[1];
    if (!screens.includes(href)) out.push(`PORTAL-LINK ${path} "${text}" → ${href} is not one of ${screens.join(", ")}`);
    else if (intended && href !== intended) out.push(`PORTAL-LINK ${path} "${text}" → ${href}, expected ${intended}`);
  }

  for (const [i, form] of forms.entries()) {
    const at = `${path} sign-up form #${i + 1}`;
    const before = out.length;
    checks++;
    if (form.method?.toLowerCase() !== "get") out.push(`SIGNUP-FORM ${at} method="${form.method}", expected "get"`);
    if (form.action !== PORTAL_SCREENS.register) out.push(`SIGNUP-FORM ${at} action="${form.action}", expected "${PORTAL_SCREENS.register}"`);
    if (form.fields.join() !== "email") out.push(`SIGNUP-FORM ${at} named fields [${form.fields.join(", ")}], expected exactly [email]`);
    if (out.length > before) continue;

    // Submit it for real (the portal is stubbed): no script may block or rewrite it.
    const target = page.locator(SIGNUP_FORMS).nth(i);
    try {
      await target.locator('input[name="email"]').fill(PROBE_EMAIL, { timeout: 10_000 });
      await Promise.all([
        page.waitForURL((url) => url.host === PORTAL_HOST, { timeout: 10_000 }),
        target.locator('[type="submit"]').click({ timeout: 10_000 }),
      ]);
      if (page.url() !== PROBE_LANDING) out.push(`SIGNUP-FORM ${at} sent ${PROBE_EMAIL} to ${page.url()}, expected ${PROBE_LANDING}`);
    } catch (err) {
      out.push(`SIGNUP-FORM ${at} could not be submitted: ${err.message.split("\n")[0]}`);
    }
    await page.goto(BASE + path, { waitUntil: "networkidle" });
  }
  return out;
}

// CHROMIUM_PATH lets CI/sandboxes point at a preinstalled browser instead of
// downloading one (e.g. /opt/pw-browsers/chromium).
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
if (SCREENSHOT_DIR) mkdirSync(SCREENSHOT_DIR, { recursive: true });

// 5. The mark, byte for byte
{
  const page = await browser.newPage();
  const res = await page.goto(BASE + "/favicon.svg");
  const sha = createHash("sha256")
    .update(await res.body())
    .digest("hex");
  checks++;
  if (sha !== FAVICON_SHA256) {
    failures.push(`FAVICON /favicon.svg sha256 ${sha} is not the portal's mark (${FAVICON_SHA256}) — copy logo.svg, don't re-export it`);
  }
  await page.close();
}

for (const theme of THEMES) {
  const context = await browser.newContext();
  await context.addInitScript((t) => localStorage.setItem("theme", t), theme);
  // Hermetic: nothing here ever reaches the real portal; a form submit lands on this stub.
  await context.route(
    (url) => url.host === PORTAL_HOST,
    (route) => route.fulfill({ status: 200, contentType: "text/plain", body: "portal stub" }),
  );

  for (const device of DEVICES) {
    const page = await context.newPage();
    await page.setViewportSize({ width: device.width, height: device.height });

    for (const path of PAGES) {
      const res = await page.goto(BASE + path, { waitUntil: "networkidle" });

      // 1. Horizontal-overflow assertion
      const overflow = await page.evaluate(() => {
        const el = document.scrollingElement;
        return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
      });
      checks++;
      if (overflow.scrollWidth > overflow.clientWidth + 1) {
        failures.push(`OVERFLOW ${path} [${theme}/${device.name}] scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`);
      }

      // 2. axe-core on the representative subset
      if (AXE_DEVICES.has(device.name)) {
        const results = await new AxeBuilder({ page }).analyze();
        const serious = results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""));
        checks++;
        for (const v of serious) {
          failures.push(`AXE ${path} [${theme}/${device.name}] ${v.impact}: ${v.id} — ${v.help} (${v.nodes.length} nodes)`);
        }
      }

      if (SCREENSHOT_DIR && ["desktop", "iphone-14"].includes(device.name)) {
        const slug = path === "/" ? "home" : path.replaceAll("/", "").replace(".html", "");
        await page.screenshot({
          path: `${SCREENSHOT_DIR}/${slug}-${theme}-${device.name}.png`,
          fullPage: true,
        });
      }

      // 3 + 4. The portal hand-off — markup is the same at every width, so once per page.
      if (device.name === "desktop") {
        checks++;
        if (res?.status() !== 200) failures.push(`HTTP ${path} answered ${res?.status()}, expected 200`);
        failures.push(...(await portalHandoffFailures(page, path)));
      }
    }
    await page.close();
  }
  await context.close();
}

await browser.close();

console.log(`\n${checks} checks across ${PAGES.length} pages × ${THEMES.length} themes × ${DEVICES.length} devices`);
if (failures.length) {
  console.error(`\n❌ ${failures.length} failure(s):`);
  for (const f of failures) console.error("  " + f);
  process.exit(1);
}
console.log("✅ zero horizontal overflow, zero serious/critical axe violations, portal links and sign-up forms on contract, favicon is the portal's mark");
