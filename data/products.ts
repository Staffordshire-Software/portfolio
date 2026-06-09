import { addToAccountUrl } from "@/lib/core";

// Single source of truth for every product shown on the portfolio.
//
// To add a product: append a new `Product` entry to the `products` array
// below and open a PR. No code changes are needed elsewhere — pages, the
// category grid, and the per-product routes are all generated from this
// list at build time. See README.md ("Adding a product") for the checklist.

export type ProductCategory =
  | "Music"
  | "Productivity"
  | "Education"
  | "Business Ops"
  | "Tools"
  | "Other";

export type ProductStatus = "live" | "beta" | "coming-soon";

export type Product = {
  /** URL slug, e.g. "tone-conditioner". Must be unique. */
  id: string;
  /** Display name. */
  name: string;
  /** One-line hook. */
  tagline: string;
  /** A paragraph of description. */
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  /** ISO date the product launched (or is expected to). */
  launchedAt: string;
  /** Optional hero image path under /public. Falls back to generated art. */
  hero?: string;
  /** Public product page or app URL. */
  productUrl: string;
  /** "Try it / Sign up" CTA destination. */
  signupUrl: string;
  /**
   * "Add to my StaffySoft account" CTA — for existing Core users.
   * Core will implement https://accounts.staffysoft.com/add?product=ID later;
   * the link is a stub until then.
   */
  addToAccountUrl: string;
  /** Optional short pricing note, e.g. "Free tier + $6/mo Pro". */
  pricingNote?: string;
};

export const products: Product[] = [
  {
    id: "tone-conditioner",
    name: "ToneConditioner",
    tagline: "Studio-grade tone shaping for players who hate menus.",
    description:
      "ToneConditioner sits between your instrument and your interface and does one thing brilliantly: it makes everything you plug in sound like it belongs on the record. Adaptive EQ, gentle multiband compression, and a cabinet-aware exciter run in real time with sub-3ms latency, so you can chase the tone in your head instead of fighting a thousand parameters. Presets are shareable, the whole thing is MIDI-mappable, and it runs standalone or as a plugin.",
    category: "Music",
    status: "live",
    launchedAt: "2025-11-04",
    productUrl: "https://tonesmith.app",
    signupUrl: "https://tonesmith.app/signup",
    addToAccountUrl: addToAccountUrl("tone-conditioner"),
    pricingNote: "Free tier + $9/mo Pro",
  },
  {
    id: "voice-note-atomizer",
    name: "Voice Note Atomizer",
    tagline: "Talk it out. Get back tasks, notes, and decisions.",
    description:
      "Voice Note Atomizer turns rambling voice memos into structured, searchable output. Record a thought — a meeting recap, a half-formed idea, a to-do list mumbled in the car — and VNA transcribes it, then atomizes it into discrete action items, notes, and decisions you can push to your tools. It learns your shorthand, links related notes over time, and never makes you scrub through a 12-minute recording to find the one thing you needed.",
    category: "Productivity",
    status: "beta",
    launchedAt: "2026-03-18",
    productUrl: "https://vna.staffysoft.app",
    signupUrl: "https://vna.staffysoft.app/signup",
    addToAccountUrl: addToAccountUrl("voice-note-atomizer"),
    pricingNote: "Free during beta",
  },
];

// ---------------------------------------------------------------------------
// Helpers — keep page components free of data-munging logic.
// ---------------------------------------------------------------------------

/** Display order for categories in the grid. */
export const CATEGORY_ORDER: ProductCategory[] = [
  "Music",
  "Productivity",
  "Education",
  "Business Ops",
  "Tools",
  "Other",
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Products grouped by category, in CATEGORY_ORDER, skipping empty groups. */
export function productsByCategory(
  list: Product[] = products,
): { category: ProductCategory; items: Product[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: list.filter((p) => p.category === category),
  })).filter((group) => group.items.length > 0);
}

/** The product to feature in the hero — newest live product, else newest. */
export function featuredProduct(list: Product[] = products): Product {
  const byNewest = [...list].sort(
    (a, b) => Date.parse(b.launchedAt) - Date.parse(a.launchedAt),
  );
  return byNewest.find((p) => p.status === "live") ?? byNewest[0];
}
