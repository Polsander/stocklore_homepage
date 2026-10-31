/**
 * The /features page content — every claim traces to open_ims: what is on
 * main (docs/architecture/*, the contracts) and what is planned
 * (docs/roadmap/final-refactor/*). Status honesty: "live" means in the product
 * today; everything else is badged.
 */

export type FeatureStatus = "live" | "in-progress" | "planned";

export interface FeatureItem {
  title: string;
  blurb: string;
  status: FeatureStatus;
}

export interface FeatureArea {
  /** Anchor id — the landing tour links to /features#<id>. */
  id: string;
  title: string;
  lede: string;
  items: FeatureItem[];
}

export const FEATURE_AREAS: FeatureArea[] = [
  {
    id: "inventory",
    title: "Inventory control",
    lede: "Numbers you can trust, because every change is a recorded movement.",
    items: [
      {
        title: "Ledger-backed stock tracking",
        blurb:
          "Every quantity is the sum of an append-only movement ledger — sales, purchases, builds, transfers, adjustments — with the full history one click away.",
        status: "live",
      },
      {
        title: "Movement history & audit trail",
        blurb: "Who changed what, when, from which document — for every product.",
        status: "live",
      },
      {
        title: "Manual adjustments with reasons",
        blurb: "Recount, damaged, lost, found — corrections are reason-coded and auditable.",
        status: "live",
      },
      {
        title: "Reorder points & low-stock alerts",
        blurb: "Set a reorder point; the moment stock crosses it, everyone in the workspace gets an alert, and the reorder report shows what to buy.",
        status: "live",
      },
      {
        title: "Multi-location stock",
        blurb: "Per-location on-hand quantities, with a location context on every document.",
        status: "live",
      },
      {
        title: "Stock transfers",
        blurb: "Move stock between locations in one step — and reverse a transfer if you need to.",
        status: "live",
      },
      {
        title: "Valuation, aging & movement reports",
        blurb: "What your stock is worth on any date (at current cost), how long it has been sitting, and how it moved — exported to Excel or CSV.",
        status: "live",
      },
      {
        title: "Moving-average costing & landed cost",
        blurb: "Inventory valued at what you actually paid, freight and duties included.",
        status: "planned",
      },
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    lede: "Real BOM depth — the kind rivals gate behind $300+/month tiers.",
    items: [
      {
        title: "Multi-level bills of materials",
        blurb: "Recipes within recipes: BOMs nest through sub-assemblies up to six levels deep, and components can be goods or services like labour.",
        status: "live",
      },
      {
        title: "Build orders",
        blurb: "Plan a build, then complete it: components are consumed and the finished good is produced at the order's location, every leg on the ledger.",
        status: "live",
      },
      {
        title: "Linked sub-assembly builds",
        blurb: "Build sub-assemblies on their own orders and link them to the build or sale they serve, so the whole chain stays visible.",
        status: "live",
      },
    ],
  },
  {
    id: "catalog",
    title: "Product catalog",
    lede: "Model products the way your business actually works.",
    items: [
      {
        title: "SKUs, barcodes & product types",
        blurb: "Goods and services, tracked or untracked, with barcodes your search can find.",
        status: "live",
      },
      {
        title: "Units of measure",
        blurb: "Stock in one unit, buy and sell in others — packs like a case of 12 included — with conversions handled for you.",
        status: "live",
      },
      { title: "Product images", blurb: "Upload photos, pick a primary, and see them across the app.", status: "live" },
      { title: "Custom fields", blurb: "Define your own typed product fields — text, number, date, yes/no.", status: "live" },
      { title: "Categories", blurb: "Organize the catalog with nested categories.", status: "live" },
      { title: "Multiple vendors per product", blurb: "Track every supplier for a product, each with its own cost, and mark one preferred.", status: "live" },
      { title: "Kits & bundles", blurb: "Sell a bundle as one line; confirming the order explodes it into its components.", status: "live" },
      { title: "Attachments", blurb: "Attach files to products and every document, up to 25 MB each.", status: "live" },
    ],
  },
  {
    id: "purchasing",
    title: "Purchasing",
    lede: "Buying that keeps the stock number honest.",
    items: [
      { title: "Purchase orders", blurb: "Draft → issued → closed, with reopen; delivery and payment tracking, PDF and email.", status: "live" },
      { title: "Vendor management", blurb: "Unified contacts for customers and vendors, with addresses and net terms.", status: "live" },
      { title: "Receiving", blurb: "Receiving a PO writes the stock in — straight onto the ledger.", status: "live" },
      { title: "Partial receiving", blurb: "Receive per line and as often as goods arrive, into the location you choose.", status: "live" },
      { title: "On-order quantities", blurb: "What's on order shows on every product and on the reorder report.", status: "live" },
    ],
  },
  {
    id: "sales",
    title: "Sales, invoicing & tax",
    lede: "From quote to paid — CRA-ready from day one.",
    items: [
      { title: "Quotes", blurb: "Start a sales order as a quote, send it as a PDF, and convert it to an order in one click.", status: "live" },
      {
        title: "Sales orders",
        blurb: "A true order between quote and invoice: confirm it, ship it, and generate the invoice when you're ready. Stock moves when goods ship.",
        status: "live",
      },
      { title: "Partial shipping", blurb: "Ship per line, in as many parts as you need, from the location you choose.", status: "live" },
      { title: "Invoices", blurb: "Draft → confirmed workflow with delivery and payment status, PDF export, and email straight from the app.", status: "live" },
      {
        title: "Canadian tax, natively",
        blurb:
          "GST, HST and PST rates for any province or territory, each mapped to its GST34 line. A line carries one rate today, so GST + PST provinces use a combined rate.",
        status: "live",
      },
      { title: "Tax modes", blurb: "Tax-exclusive, tax-inclusive, or non-taxable — per document.", status: "live" },
      { title: "Shipping charges", blurb: "Shipping on invoices and orders, each charge with its own method, amount and tax treatment.", status: "live" },
      { title: "PDF templates", blurb: "Layout, paper size, fonts, colours, logo and columns for every document type, with a live preview.", status: "live" },
    ],
  },
  {
    id: "assistant",
    title: "AI assistant",
    lede: "It does the busywork; you approve every change.",
    items: [
      {
        title: "Answers from your own data",
        blurb: "Ask in plain language — what's low, what's overdue, how sales went — and it answers from your workspace, as you.",
        status: "live",
      },
      {
        title: "Drafts the work, you approve",
        blurb:
          "It drafts documents, status changes, stock adjustments, contacts and products; each card shows every field, and nothing happens until you approve.",
        status: "live",
      },
      { title: "Emails invoices", blurb: "It prepares the email to your customer and sends it only after you confirm twice.", status: "live" },
      { title: "Web search", blurb: "It looks things up on the web and cites its sources.", status: "live" },
      { title: "Custom dashboards", blurb: "Describe a chart and it drafts, previews and publishes a dashboard for you.", status: "live" },
      {
        title: "Ask from anywhere",
        blurb: "An Ask assistant button on records; it can take you to the right screen and point at what you need.",
        status: "live",
      },
      {
        title: "Alerts with a one-click fix",
        blurb: "Unshipped orders and late purchase orders come with a proposed fix you can approve in one click.",
        status: "live",
      },
      { title: "Files from the assistant", blurb: "Ask for a spreadsheet or PDF and download what it generates.", status: "in-progress" },
      { title: "Files into the chat", blurb: "Attach a spreadsheet, PDF or photo to a message and it works from it.", status: "planned" },
    ],
  },
  {
    id: "platform",
    title: "Platform & team",
    lede: "Small-business simple, engineered like it matters.",
    items: [
      { title: "Roles enforced server-side", blurb: "Admin, edit, and view floors enforced on every single API route.", status: "live" },
      {
        title: "Import & export",
        blurb: "18 kinds of data from our template or your own spreadsheet, plus PDFs and photos turned into draft documents; export everything to Excel.",
        status: "live",
      },
      { title: "Analytics dashboards", blurb: "Six built-in dashboards, including receivables, payables and a 90-day cash forecast.", status: "live" },
      {
        title: "Multiple organizations",
        blurb: "Run several businesses under one account and switch between them; add teammates who have a Stocklore account.",
        status: "live",
      },
      { title: "Realtime updates", blurb: "Changes appear on open screens instantly, and alerts arrive in the bell.", status: "live" },
      { title: "Self-serve demo company", blurb: "Explore a fully stocked demo company — it deletes itself after 15 days.", status: "live" },
      { title: "Installable app", blurb: "Install Stocklore as an app on your computer or phone.", status: "live" },
      {
        title: "Public REST API (beta)",
        blurb: "Personal access tokens capped by your role, with OpenAPI docs. In beta, so it can still change before launch.",
        status: "live",
      },
      { title: "Choose each teammate's role", blurb: "Set a member to admin, edit or view from the app.", status: "planned" },
    ],
  },
  {
    id: "bookkeeping",
    title: "Bookkeeping",
    lede: "Books your accountant can file from — being built now, in stages.",
    items: [
      { title: "Tax codes with GST and PST components", blurb: "One tax code carrying each component separately, for every province.", status: "in-progress" },
      { title: "Bills, payments & credit notes", blurb: "Supplier bills, customer payments, deposits, refunds and credits.", status: "planned" },
      { title: "Chart of accounts & journal", blurb: "A Canadian chart of accounts with every transaction posted to it.", status: "planned" },
      { title: "Banking & reconciliation", blurb: "Match your bank activity to your books.", status: "planned" },
      {
        title: "Month-end reports",
        blurb: "Profit & loss, balance sheet, general ledger, a GST/HST return worksheet, and a period journal for QuickBooks Online.",
        status: "planned",
      },
    ],
  },
];
