/**
 * FAQ content — rewritten from the previous site's six questions (its richest
 * indexed text; themes preserved deliberately for SEO continuity).
 * Rendered as native <details> accordions + FAQPage JSON-LD.
 */
import { SITE } from "./site";

export interface FaqItem {
  question: string;
  /** Plain text — the JSON-LD reuses it verbatim, so it must read complete without the link. */
  answer: string;
  /** Rendered after the answer on the page only; never part of the JSON-LD text. */
  link?: { href: string; label: string };
}

export const FAQ: FaqItem[] = [
  {
    question: "What makes Stocklore different from other inventory software?",
    answer:
      "Most tools at our price point stop at single-level kits — Stocklore does real manufacturing: bills of materials up to six levels deep and build orders that consume components and produce the finished good, alongside ledger-backed inventory, quotes and sales orders, purchasing, and CRA-ready invoicing — with an AI assistant built in, not bolted on. And it's self-serve: no sales calls, no implementation projects, no per-module upsells. You can be working with your own data the same hour you sign up.",
  },
  {
    question: "Is there an AI assistant?",
    answer:
      "Yes, and it's live. Ask it about your business in plain language — what's running low, which invoices are overdue, how last month's sales went — and ask it to do the work: it drafts invoices, orders, stock adjustments and more, shows you every field it would change, and nothing happens until you approve. It works within your role and permissions, can search the web, builds custom dashboards, and can email an invoice to your customer once you confirm.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Stocklore is in open beta and completely free right now. When we launch paid plans, pricing will be transparent and set for small businesses — we'll announce it before the beta ends. In return, we just ask beta users to tell us about bugs and what they'd like built next.",
  },
  {
    question: "How do I get started?",
    answer:
      "Enter your email, create your free account, and you're in. Explore a fully stocked demo company first (it deletes itself after 15 days), or bring in your own products, contacts and documents from a spreadsheet — or from a PDF or photo, which AI turns into a draft for you to check.",
  },
  {
    question: "Does Stocklore work on mobile?",
    answer:
      "Stocklore runs in any modern browser, and you can install it as an app. Lists, records and navigation adapt to a phone; for editing long documents and working with the assistant, a larger screen is still best. There's no native mobile app yet.",
  },
  {
    question: "How is my data handled? What about privacy?",
    // A summary of the portal's Privacy Policy — it may not promise more, or less, than the policy does.
    answer:
      "We keep your account details (name, email and a hashed password), the data your organization enters or uploads, your conversations with the AI assistant, technical logs, and — if you join our product updates list — your name and email until you leave it. Our servers and primary database are in Toronto, Canada. Assistant requests go to the AI provider your organization has chosen — Anthropic, DeepSeek, or a model your organization hosts itself — and a third-party provider may process them outside Canada. Logs are kept for up to 90 days, and when you delete your account, your personal information is deleted or anonymised within 30 days unless the law requires us to keep it. We don't sell personal information or use it for advertising, and we don't use your workspace data to train AI models.",
    link: { href: SITE.privacyUrl, label: "Read the Privacy Policy" },
  },
  {
    question: "Can I see what's new, or request a feature?",
    answer: `Yes — the Updates & Roadmap page shows what shipped each month and what we're building next. If something you need is missing, tell us at ${SITE.supportEmail}. Requests from beta users genuinely shape the plan.`,
    link: { href: "/roadmap", label: "See what's new" },
  },
];

export const faqJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});
