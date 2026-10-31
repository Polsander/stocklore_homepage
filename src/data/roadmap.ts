/**
 * The "building in the open" roadmap — the single source for the landing
 * teaser and the /roadmap page.
 *
 * Curated by hand from open_ims: what is on main (docs/architecture/*, the
 * contracts) and what is planned (docs/roadmap/MASTER_PLAN.md,
 * docs/roadmap/final-refactor/*). Shipping a feature = add/flip one entry here
 * and push — Netlify rebuilds the site.
 *
 * Honesty rule: `shipped` requires the feature to be live in production.
 * Anything else carries its real status and renders with a visible badge.
 */

export type RoadmapStatus = "shipped" | "in-progress" | "planned" | "vision";

export type RoadmapArea = "inventory" | "manufacturing" | "catalog" | "sales" | "purchasing" | "platform" | "ai";

export interface RoadmapItem {
  id: string;
  title: string;
  blurb: string;
  status: RoadmapStatus;
  area: RoadmapArea;
  /** "YYYY-MM" — required when shipped; groups the timeline by month. */
  date?: string;
}

export const ROADMAP: RoadmapItem[] = [
  // ── Shipped ────────────────────────────────────────────────────────────────
  {
    id: "assistant-web-dashboards",
    title: "The assistant searches the web and builds dashboards",
    blurb:
      "Ask it to look something up and it cites its sources; describe a chart and it drafts, previews and publishes a dashboard for you. Every record now has an Ask assistant button, and it can take you straight to the screen you need.",
    status: "shipped",
    area: "ai",
    date: "2026-10",
  },
  {
    id: "analytics",
    title: "Analytics dashboards, in the app",
    blurb:
      "Six built-in dashboards — overview, finance (receivables, payables and a 90-day cash forecast), inventory, operations, sales and shipping — each reading only your workspace's data.",
    status: "shipped",
    area: "platform",
    date: "2026-10",
  },
  {
    id: "shipping-charges",
    title: "Shipping charges on every document",
    blurb:
      "Add shipping to an invoice, sales order or purchase order — each charge with its method, amount and its own tax treatment — and see shipping costs by method and carrier.",
    status: "shipped",
    area: "sales",
    date: "2026-10",
  },
  {
    id: "tax-summary",
    title: "Tax summaries by rate",
    blurb: "Every invoice, sales order and purchase order breaks its tax down by rate — on screen, and on the PDF if you want it there.",
    status: "shipped",
    area: "sales",
    date: "2026-10",
  },
  {
    id: "any-spreadsheet",
    title: "Import any spreadsheet",
    blurb: "Bring a spreadsheet in your own layout: Stocklore finds the header row and AI proposes how its columns map, for you to confirm.",
    status: "shipped",
    area: "platform",
    date: "2026-10",
  },
  {
    id: "pdf-photo-import",
    title: "PDFs and photos become draft documents",
    blurb: "Drop in a supplier's PDF or a photo of a document and AI extracts it into a draft purchase order, invoice or sales order for you to review.",
    status: "shipped",
    area: "ai",
    date: "2026-09",
  },
  {
    id: "assistant-email-approvals",
    title: "The assistant emails invoices, and one Approvals page",
    blurb:
      "Ask it to send an invoice and it prepares the email — recipient, subject and message — for you to confirm twice. Every proposal waiting on you now sits on one Approvals page, with bulk approve.",
    status: "shipped",
    area: "ai",
    date: "2026-09",
  },
  {
    id: "document-links",
    title: "Linked documents",
    blurb: "Link any document to any other and see the related ones on every record; copy a document, or restore a deleted one as a new draft.",
    status: "shipped",
    area: "platform",
    date: "2026-09",
  },
  {
    id: "purchase-order-lifecycle",
    title: "Purchase orders: issue, receive, close",
    blurb: "Purchase orders move from draft to issued to closed (and can reopen), and what's on order shows on every product and on the reorder report.",
    status: "shipped",
    area: "purchasing",
    date: "2026-08",
  },
  {
    id: "spreadsheet-import",
    title: "Spreadsheet import for 18 kinds of data",
    blurb:
      "Products, contacts, opening stock, BOMs, invoices, orders and more, through a staging grid that checks every row before it lands — plus a one-click export of your whole workspace.",
    status: "shipped",
    area: "platform",
    date: "2026-08",
  },
  {
    id: "alerts",
    title: "Alerts with a one-click fix",
    blurb:
      "Low stock, confirmed orders not yet shipped, late purchase orders and overdue invoices show up in the bell and on the record — two of them with a proposed fix you can approve in one click.",
    status: "shipped",
    area: "ai",
    date: "2026-08",
  },
  {
    id: "assistant",
    title: "The Stocklore assistant",
    blurb:
      "Ask about your business in plain language and get answers from your own data. Ask it to do the work and it drafts the change, every field shown, for you to approve — within your role, and never on its own.",
    status: "shipped",
    area: "ai",
    date: "2026-07",
  },
  {
    id: "sales-orders",
    title: "Sales orders, quotes and partial shipping",
    blurb:
      "Quote → order → ship → invoice, the way real operations flow. Convert a quote in one click, ship in as many parts as you need, and generate the invoice when you're ready. Stock moves when goods ship, not when paperwork does.",
    status: "shipped",
    area: "sales",
    date: "2026-07",
  },
  {
    id: "partial-receiving",
    title: "Partial receiving",
    blurb: "Receive what actually arrived — per line, as often as needed, into the location you choose — and let delivery status follow reality.",
    status: "shipped",
    area: "purchasing",
    date: "2026-07",
  },
  {
    id: "kits",
    title: "Kits & bundles",
    blurb: "Sell a bundle as one line: confirming the order explodes it into its components, and kit availability follows the components' stock.",
    status: "shipped",
    area: "catalog",
    date: "2026-07",
  },
  {
    id: "reports",
    title: "Valuation, aging and reorder reports",
    blurb: "What your stock is worth on any date (at current cost), how long it has been sitting, and what to reorder — exported to Excel or CSV.",
    status: "shipped",
    area: "inventory",
    date: "2026-07",
  },
  {
    id: "pdf-templates",
    title: "PDF templates",
    blurb: "Pick the layout, paper size, fonts, colours, logo and columns for invoices, quotes, sales orders and purchase orders, with a live preview.",
    status: "shipped",
    area: "sales",
    date: "2026-07",
  },
  {
    id: "public-api",
    title: "Public REST API (beta)",
    blurb:
      "Your data, programmable: personal access tokens capped by your role, OpenAPI docs and rate-limit headers. It's in beta, so it can still change before launch.",
    status: "shipped",
    area: "platform",
    date: "2026-07",
  },
  {
    id: "catalog-rebuild",
    title: "Product pages rebuilt — units of measure, photos, custom fields, categories",
    blurb:
      "Model your catalog your way: sell by the metre or the millilitre, attach product photos, define your own fields, and organize everything with categories.",
    status: "shipped",
    area: "catalog",
    date: "2026-07",
  },
  {
    id: "multi-location",
    title: "Multi-location stock + transfers",
    blurb: "See on-hand quantities per location and move stock between them with a proper two-sided transfer document — nothing goes missing in between.",
    status: "shipped",
    area: "inventory",
    date: "2026-07",
  },
  {
    id: "demo-self-serve",
    title: "Self-serve demo companies",
    blurb: "Curious? Seed a fully-stocked demo company from inside the app and explore with realistic data — no sales call required.",
    status: "shipped",
    area: "platform",
    date: "2026-07",
  },
  {
    id: "stock-ledger",
    title: "The stock ledger — every movement, recorded",
    blurb:
      "Every stock change is now one auditable ledger entry: sales, purchases, builds, transfers, and reason-coded manual adjustments — with low-stock alerts the moment a reorder point is crossed.",
    status: "shipped",
    area: "inventory",
    date: "2026-07",
  },
  {
    id: "permissions-enforced",
    title: "Role permissions enforced on every route",
    blurb: "Admin, edit, and view roles are now enforced server-side across all 100+ API routes — not just hidden buttons in the UI.",
    status: "shipped",
    area: "platform",
    date: "2026-07",
  },
  {
    id: "competitive-study",
    title: "Mapped the entire competitive field",
    blurb:
      "We scored Stocklore against 27 competitors across a 106-feature taxonomy — and published the verdicts into our own roadmap. What you see below is what that research said to build.",
    status: "shipped",
    area: "platform",
    date: "2026-06",
  },

  // ── Now building ──────────────────────────────────────────────────────────
  {
    id: "bookkeeping",
    title: "Bookkeeping, built in",
    blurb:
      "Books your accountant can file from, in stages: tax codes that carry GST and PST as separate components first, then bills, payments and credit notes, a chart of accounts, and month-end — profit & loss, balance sheet, general ledger and a GST/HST return worksheet.",
    status: "in-progress",
    area: "platform",
  },
  {
    id: "assistant-files-out",
    title: "Files from the assistant",
    blurb: "Ask for a spreadsheet or a PDF and the assistant generates it for you to download.",
    status: "in-progress",
    area: "ai",
  },

  // ── Up next ───────────────────────────────────────────────────────────────
  {
    id: "assistant-files-in",
    title: "Files into the chat",
    blurb: "Attach a spreadsheet, PDF or photo to a message and the assistant works from it.",
    status: "planned",
    area: "ai",
  },
  {
    id: "migration-kits",
    title: "Move in from QuickBooks, Sage 50 or inFlow",
    blurb: "Migration kits that bring your existing records across, starting with QuickBooks Online.",
    status: "planned",
    area: "platform",
  },
  {
    id: "costing",
    title: "Moving-average costing & landed cost",
    blurb: "Inventory valued at what you actually paid, freight and duties included — straight from the ledger's cost history.",
    status: "planned",
    area: "inventory",
  },
  {
    id: "team-roles",
    title: "Choose each teammate's role",
    blurb: "Set a member to admin, edit or view from the app. The roles are already enforced on every route; this adds the switch.",
    status: "planned",
    area: "platform",
  },

  // ── The bigger vision ─────────────────────────────────────────────────────
  {
    id: "auto-build",
    title: "Automatic build orders from a sale",
    blurb: "An opt-in policy: confirm an order for an assembly and the build orders create themselves. Designed, not yet scheduled.",
    status: "vision",
    area: "manufacturing",
  },
  {
    id: "accounting-sync",
    title: "QuickBooks & Xero sync",
    blurb: "Stocklore is building its own books first, with a period-journal export for QuickBooks Online planned; a live two-way sync is further out.",
    status: "vision",
    area: "platform",
  },
  {
    id: "barcode-scanning",
    title: "Barcode scanning & label printing",
    blurb: "Products already store barcodes and search finds them; scan-to-add and label printing come later.",
    status: "vision",
    area: "inventory",
  },
  {
    id: "lot-serial",
    title: "Lot & serial tracking",
    blurb: "Full traceability for batch- and serial-numbered goods.",
    status: "vision",
    area: "inventory",
  },
  {
    id: "mobile-app",
    title: "A native mobile app",
    blurb: "Stocklore installs as an app on any device today; a native app is further out.",
    status: "vision",
    area: "platform",
  },
];

/* Convenience slices */
export const shipped = ROADMAP.filter((i) => i.status === "shipped");
export const inProgress = ROADMAP.filter((i) => i.status === "in-progress");
export const planned = ROADMAP.filter((i) => i.status === "planned");
export const vision = ROADMAP.filter((i) => i.status === "vision");

/** Shipped items grouped by month, newest first. */
export const shippedByMonth = (): [string, RoadmapItem[]][] => {
  const groups = new Map<string, RoadmapItem[]>();
  for (const item of shipped) {
    const key = item.date ?? "undated";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()].sort(([a], [b]) => (a < b ? 1 : -1));
};

export const formatMonth = (yyyyMm: string): string => {
  const [y, m] = yyyyMm.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  });
};
