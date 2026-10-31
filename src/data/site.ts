/** Single source for site-wide constants — never hardcode these in components. */

/**
 * The app's origin. Its signed-out screens are a fixed contract (open_ims
 * client/README.md › "Signed-out screens"): the root is sign-in (there is no
 * /login), /register is sign-up, /terms and /privacy are public. Every portal
 * link on this site is one of the URLs derived from it below; the merge gate
 * (scripts/site-check.mjs) fails on any other.
 */
const portalUrl = "https://portal.stocklore.app";
const portalPage = (path: string) => new URL(path, portalUrl).href;

export const SITE = {
  name: "Stocklore",
  url: "https://stocklore.app",
  portalUrl,
  signInUrl: portalPage("/"),
  registerUrl: portalPage("/register"),
  termsUrl: portalPage("/terms"),
  privacyUrl: portalPage("/privacy"),
  supportEmail: "support@stocklore.app",
  description:
    "See and manage your whole product business — inventory, purchasing, sales, and CRA-ready invoicing in one tool for Canadian small business, with multi-level manufacturing and an AI assistant that drafts the work for your approval. Free during open beta.",
  ogImage: "/og.png",
} as const;

/**
 * The sign-up link for an address the visitor already typed: the portal opens
 * /register?email=… on step 2, "Finish creating your account". The value has
 * to be URL-encoded — an unencoded `+` decodes to a space, so jordan+test@…
 * would arrive as "jordan test@…" and fail — so it goes through
 * URLSearchParams, never string concatenation. SignupEmailForm doesn't need
 * this (a native GET form encodes the same way); it is for script that has to
 * build the link itself. An empty address is step 1, plain /register.
 */
export const registerUrlFor = (email?: string): string => {
  const address = email?.trim();
  if (!address) return SITE.registerUrl;
  const url = new URL(SITE.registerUrl);
  url.searchParams.set("email", address);
  return url.href;
};
