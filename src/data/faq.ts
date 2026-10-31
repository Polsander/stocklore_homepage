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
      "Most tools at our price point stop at single-level kits — Stocklore does real manufacturing: multi-level bills of materials, nested build orders, and automatic component consumption, alongside ledger-backed inventory, purchasing, and CRA-ready invoicing. And it's self-serve: no sales calls, no implementation projects, no per-module upsells. You can be working with your own data the same hour you sign up.",
  },
  {
    question: "Is there an AI assistant?",
    answer:
      'Yes! Stocklore is headed as an agent-first platform. The Stocklore assistant will let you run your back office in plain language — "draft an invoice for Andrea\'s Flowers and email her the PDF" — while you approve every action before it happens. It works within your role and permissions, and ships in phases, starting with answers about your own data.',
  },
  {
    question: "How much does it cost?",
    answer:
      "Stocklore is in open beta and completely free right now. When we launch paid plans, pricing will be transparent and set for small businesses — we'll announce it before the beta ends. In return, we just ask beta users to tell us about bugs and what they'd like built next.",
  },
  {
    question: "How do I get started?",
    answer:
      "Click Get started, create a free account, and you're in. You can seed a demo company with realistic data to explore, or import your own products and contacts from CSV or Excel and start invoicing right away.",
  },
  {
    question: "Does Stocklore work on mobile?",
    answer:
      "Stocklore runs in any modern browser. The app is optimized for desktop and laptop screens today — that's where inventory work mostly happens — and a dedicated mobile experience is on the roadmap.",
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
    answer: `Yes! While we are currently working on a roadmap to show users what some upcoming new features are, if something you need is missing, tell us at ${SITE.supportEmail}. Requests from beta users genuinely shape the plan.`,
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
