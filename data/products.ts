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
    tagline: "Sessions that save your work and pick up where you left off.",
    description:
      "ToneGrid gets you started. ToneConditioner keeps you going — with longer sessions, saved progress, and an account that remembers everything.",
    category: "Music",
    status: "live",
    launchedAt: "2026-06-01",
    hero: "/products/tonesmith.png",
    productUrl: "https://tonesmith.vercel.app",
    signupUrl: "https://tonesmith.vercel.app",
    addToAccountUrl: addToAccountUrl("tone-conditioner"),
  },
  {
    id: "performer-prompter",
    name: "Performer Prompter",
    tagline: "Paste. Record. Post. Lyrics and scripts on stage.",
    description:
      "A teleprompter built for performers — paste your lyrics or script, tune the scroll speed and font size, hit record. No saved scripts get lost.",
    category: "Music",
    status: "live",
    launchedAt: "2026-06-01",
    hero: "/products/performer-prompter.png",
    productUrl: "https://performer-prompter.vercel.app",
    signupUrl: "https://performer-prompter.vercel.app",
    addToAccountUrl: addToAccountUrl("performer-prompter"),
  },
  {
    id: "lattice",
    name: "Lattice",
    tagline: "AI-powered workspace for diving deep into any research topic.",
    description:
      "Lattice turns scattered research into a structured, searchable workspace — feed in articles, walkthroughs, and notes, and let the AI surface connections.",
    category: "Tools",
    status: "live",
    launchedAt: "2026-06-01",
    hero: "/products/lattice.png",
    productUrl: "https://lattice.vercel.app",
    signupUrl: "https://lattice.vercel.app",
    addToAccountUrl: addToAccountUrl("lattice"),
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
    productUrl: "https://dansmusicstudiocom.vercel.app",
    signupUrl: "https://dansmusicstudiocom.vercel.app",
    addToAccountUrl: addToAccountUrl("dans-music-studio"),
  },
  {
    id: "interview-lifeguard",
    name: "Interview Lifeguard",
    tagline: "Interview support for neurodivergent engineers under pressure.",
    description:
      "A tool to help neurodivergent folks navigate high-pressure interviews — especially the programming ones — without freezing.",
    category: "Productivity",
    status: "coming-soon",
    launchedAt: "2026-06-01",
    productUrl: "https://github.com/Staffordshire-Software/interview-lifeguard",
    signupUrl: "https://github.com/Staffordshire-Software/interview-lifeguard",
    addToAccountUrl: addToAccountUrl("interview-lifeguard"),
  },
  {
    id: "voice-note-atomizer",
    name: "Voice Note Atomizer",
    tagline: "Turn voice notes into structured, searchable snippets.",
    description:
      "Drop in a long voice note; get back individual ideas, tasks, and quotes — each one its own thing.",
    category: "Productivity",
    status: "coming-soon",
    launchedAt: "2026-06-01",
    productUrl: "https://github.com/Staffordshire-Software/voice-note-atomizer",
    signupUrl: "https://github.com/Staffordshire-Software/voice-note-atomizer",
    addToAccountUrl: addToAccountUrl("voice-note-atomizer"),
  },
  {
    id: "teacher-presell",
    name: "Teacher Presell",
    tagline: "Landing page tooling for educators selling their first program.",
    description:
      "Spin up a presell page for a workshop, course, or program before the platform is built — gauge demand, take signups, learn what to ship.",
    category: "Education",
    status: "coming-soon",
    launchedAt: "2026-06-01",
    productUrl: "https://github.com/Staffordshire-Software/teacher-presell",
    signupUrl: "https://github.com/Staffordshire-Software/teacher-presell",
    addToAccountUrl: addToAccountUrl("teacher-presell"),
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
