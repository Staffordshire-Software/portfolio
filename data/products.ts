import { addToAccountUrl } from "@/lib/core";

// Single source of truth for every product shown on the portfolio.
//
// To add a product: append a new `Product` entry to the `products` array
// below and open a PR. No code changes are needed elsewhere — pages, the
// category grid, and the per-product routes are all generated from this
// list at build time. See README.md ("Adding a product") for the checklist.
//
// Each product lives at `<product>.staffysoft.com` (see README, "Product
// subdomains"). `productUrl`/`signupUrl` reference that subdomain; the DNS +
// Vercel wiring is handled outside this repo.

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
  /**
   * Pin this product as the homepage hero, regardless of status/date.
   * At most one product should set this; the first match wins.
   */
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "tone-conditioner",
    name: "ToneConditioner",
    tagline: "Sessions that save your work and pick up where you left off.",
    description:
      "ToneGrid gets you started. ToneConditioner keeps you going — with longer sessions, saved progress, and an account that remembers everything. Practice ear training and tone work across devices without losing your place.",
    category: "Music",
    status: "beta",
    launchedAt: "2026-06-01",
    hero: "/products/tonesmith.png",
    productUrl: "https://toneconditioner.staffysoft.com",
    signupUrl: "https://toneconditioner.staffysoft.com",
    addToAccountUrl: addToAccountUrl("tone-conditioner"),
    featured: true,
  },
  {
    id: "performer-prompter",
    name: "Performer Prompter",
    tagline: "Paste. Record. Post. Lyrics and scripts on stage.",
    description:
      "A teleprompter built for performers — paste your lyrics or script, tune the scroll speed and font size, and hit record. Designed for the stage and the studio so nothing you need to read ever scrolls out of reach.",
    category: "Music",
    status: "beta",
    launchedAt: "2026-06-01",
    hero: "/products/performer-prompter.png",
    productUrl: "https://performerprompter.staffysoft.com",
    signupUrl: "https://performerprompter.staffysoft.com",
    addToAccountUrl: addToAccountUrl("performer-prompter"),
  },
  {
    id: "voice-note-atomizer",
    name: "Voice Note Atomizer",
    tagline: "Turn voice notes into structured, searchable snippets.",
    description:
      "Drop in a long voice note and get back individual ideas, tasks, and quotes — each one its own atom you can search, file, and act on. Stop scrubbing through rambling recordings to find the one thing you said.",
    category: "Productivity",
    status: "beta",
    launchedAt: "2026-06-01",
    hero: "/products/voice-note-atomizer.png",
    productUrl: "https://voicenoteatomizer.staffysoft.com",
    signupUrl: "https://voicenoteatomizer.staffysoft.com",
    addToAccountUrl: addToAccountUrl("voice-note-atomizer"),
  },
  {
    id: "interview-lifeguard",
    name: "Interview Lifeguard",
    tagline: "Interview support for neurodivergent engineers under pressure.",
    description:
      "A tool to help neurodivergent folks navigate high-pressure interviews — especially the programming ones — without freezing. Quiet, in-the-moment scaffolding so the interview tests what you know, not how well you handle the panic.",
    category: "Productivity",
    status: "beta",
    launchedAt: "2026-06-01",
    hero: "/products/interview-lifeguard.png",
    productUrl: "https://interviewlifeguard.staffysoft.com",
    signupUrl: "https://interviewlifeguard.staffysoft.com",
    addToAccountUrl: addToAccountUrl("interview-lifeguard"),
  },
  {
    id: "dans-music-studio",
    name: "Dan's Music Studio",
    tagline:
      "West Orange's neighborhood music school — lessons, programs, performances.",
    description:
      "Whether a beginner or looking to improve, Dan's Music Studio helps students achieve their goals. Private and group lessons, all ages, real performance opportunities.",
    category: "Education",
    status: "live",
    launchedAt: "2026-06-01",
    hero: "/products/dansmusicstudio.png",
    productUrl: "https://www.dansmusicstudio.com",
    signupUrl: "https://www.dansmusicstudio.com",
    addToAccountUrl: addToAccountUrl("dans-music-studio"),
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

/**
 * The product to feature in the hero. An explicit `featured` flag wins;
 * otherwise the newest live product, else the newest overall.
 */
export function featuredProduct(list: Product[] = products): Product {
  const pinned = list.find((p) => p.featured);
  if (pinned) return pinned;

  const byNewest = [...list].sort(
    (a, b) => Date.parse(b.launchedAt) - Date.parse(a.launchedAt),
  );
  return byNewest.find((p) => p.status === "live") ?? byNewest[0];
}
