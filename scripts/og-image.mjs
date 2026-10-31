/**
 * Renders the social card, public/og.png (1200×630), from the BUILT site, so
 * it can't drift from the page it advertises: the headline is the hero's own
 * <h1> (highlight included), and the type, colours and mark come from the
 * site's stylesheet and /favicon.svg. Only the card's own words live here.
 *
 * Usage:
 *   npm run build
 *   (cd dist && python3 -m http.server 8788 &)
 *   CHROMIUM_PATH=/path/to/chromium npm run og:image     # → public/og.png
 * then rebuild, so dist/ carries the new card too. It refuses to write a card
 * whose text overflows it.
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://localhost:8788";
const OUT = "public/og.png";
const WIDTH = 1200;
const HEIGHT = 630;

// The card's own words. The headline is whatever the hero's <h1> says.
const SUBLINE = "Inventory, manufacturing, purchasing and CRA-ready invoicing — with an AI assistant that drafts the work and waits for your approval.";
const CHIPS = [{ text: "Free during open beta", primary: true }, { text: "Canadian-made", flag: true }, { text: "stocklore.app" }];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
await page.goto(BASE + "/", { waitUntil: "networkidle" });

await page.evaluate(
  ({ subline, chips, width, height }) => {
    const headline = document.querySelector("main h1").innerHTML;
    const flag = document.querySelector('main svg[viewBox="0 0 960 480"]').outerHTML.replace(/class="[^"]*"/, 'style="height:18px;width:auto"');
    const chip = ({ text, primary, flag: withFlag }) =>
      `<span style="display:inline-flex;align-items:center;gap:10px;padding:12px 22px;border-radius:var(--radius);font-size:24px;font-weight:600;${
        primary ? "background:var(--primary-strong);color:var(--primary-foreground)" : "background:var(--card);border:1px solid var(--border)"
      }">${text}${withFlag ? flag : ""}</span>`;

    document.body.className = "";
    document.body.style.margin = "0";
    document.body.innerHTML = `
      <div id="card" style="position:relative;width:${width}px;height:${height}px;overflow:hidden;background:var(--background);color:var(--foreground)">
        <div class="sl-aurora"></div>
        <div style="position:relative;z-index:1;box-sizing:border-box;height:100%;padding:64px 92px 72px;display:flex;flex-direction:column">
          <div style="display:flex;align-items:center;gap:16px">
            <img src="/favicon.svg" alt="" style="width:64px;height:64px">
            <span style="font-family:var(--font-heading);font-size:40px;font-weight:700;letter-spacing:-0.02em">Stocklore</span>
          </div>
          <h1 style="margin:36px 0 0;font-family:var(--font-heading);font-size:72px;line-height:1.06;font-weight:700;letter-spacing:-0.025em;max-width:1000px">${headline}</h1>
          <p style="margin:24px 0 0;font-size:28px;line-height:1.38;color:var(--muted-foreground);max-width:960px">${subline}</p>
          <div style="margin-top:auto;display:flex;gap:14px">${chips.map(chip).join("")}</div>
        </div>
      </div>`;
  },
  { subline: SUBLINE, chips: CHIPS, width: WIDTH, height: HEIGHT },
);
await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((img) => img.decode())]));
const overflow = await page.evaluate(() => {
  const inner = document.querySelector("#card > div:last-child");
  return { scroll: inner.scrollHeight, client: inner.clientHeight };
});

if (overflow.scroll > overflow.client) {
  console.error(`❌ the card's text needs ${overflow.scroll}px of ${overflow.client}px — shorten SUBLINE (or the hero's <h1>)`);
  await browser.close();
  process.exit(1);
}
await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
await browser.close();
console.log(`✅ ${OUT} (${WIDTH}×${HEIGHT}) — rebuild so dist/ carries it`);
