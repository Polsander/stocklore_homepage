/** Single source for site-wide constants — never hardcode these in components. */
export const SITE = {
  name: "Stocklore",
  url: "https://stocklore.app",
  portalUrl: "https://portal.stocklore.app",
  supportEmail: "support@stocklore.app",
  description:
    "See and manage your whole product business — inventory, purchasing, sales, and CRA-ready invoicing in one tool for Canadian small business, with multi-level manufacturing when an order needs assembly. Free during open beta, with a human-approved AI assistant in development.",
  ogImage: "/og.png",
} as const;
