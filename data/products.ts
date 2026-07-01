import { addToAccountUrl } from "@/lib/core";

// Single source of truth for everything shown on the portfolio.
//
// To add a product: append a new `Product` entry to the `products` array
// below and open a PR. No code changes are needed elsewhere — pages, the
// homepage sections, and the per-product routes are all generated from this
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

/**
 * Where (and how big) a product renders on the homepage:
 *
 * - `hero`     — the flagship spotlight card at the top of the shipped grid.
 *                At most one product should use this; the first match wins.
 * - `standard` — a regular card in the shipped grid, below the hero.
 * - `roadmap`  — the compact "coming soon" list at the bottom. No CTAs.
 *
 * StaffySoft Core is deliberately NOT a variant here — it isn't an app to
 * install, so it lives in the separate `platform` export below.
 */
export type ProductVariant = "hero" | "standard" | "roadmap";

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
  variant: ProductVariant;
  /** ISO date the product launched (or is expected to). */
  launchedAt: string;
  /** Optional hero image path under /public. Falls back to generated art. */
  hero?: string;
  /** Public product page or app URL. */
  productUrl: string;
  /** "Try it / Sign up" CTA destination. */
  signupUrl: string;
  /**
   * "Add to my StaffySoft account" CTA — for existing Core users. Built by
   * `addToAccountUrl()` (lib/core.ts), which targets Core's `/add?product=ID`
   * flow; the host is configurable via NEXT_PUBLIC_STAFFYSOFT_ACCOUNTS_URL.
   *
   * Omit for products that aren't StaffySoft account products (e.g. bespoke
   * client sites like Dan's Music Studio) and for roadmap entries — cards and
   * product pages hide the CTA when this is unset.
   */
  addToAccountUrl?: string;
  /** Optional short pricing note, e.g. "Free tier + $6/mo Pro". */
  pricingNote?: string;
};

/**
 * Contact address for "build one for me" style enquiries (bespoke client
 * work, e.g. the Dan's Music Studio card).
 */
export const CONTACT_EMAIL = "danodeawebdev@gmail.com";

/**
 * StaffySoft Core — the platform layer, not a product. Rendered as its own
 * visually distinct card in the homepage "Platform" section so visitors
 * understand it isn't another app to install.
 */
export type Platform = {
  name: string;
  /** Short label shown as a tag on the card, e.g. "Platform". */
  tag: string;
  /** One-line hook. */
  tagline: string;
  /** Internal route for the "Learn more" CTA. */
  learnMoreUrl: string;
};

export const platform: Platform = {
  name: "StaffySoft Core",
  tag: "Platform",
  tagline:
    "The shared spine every StaffySoft product runs on — identity, entitlements, billing, feedback, observability.",
  learnMoreUrl: "/core",
};

// Display order matters: within each variant, cards render in array order.
export const products: Product[] = [
  {
    id: "voice-note-atomizer",
    name: "Voice Note Atomizer",
    tagline:
      "Voice notes in, atomized tasks out — sent wherever you already work.",
    description:
      "Drop in a rambling voice note and get back clean, individual atoms — ideas, tasks, and quotes — delivered to the tools you already work in. Stop scrubbing through recordings to find the one thing you said.",
    category: "Productivity",
    status: "live",
    variant: "hero",
    launchedAt: "2026-06-01",
    hero: "/products/voice-note-atomizer.png",
    productUrl: "https://voicenoteatomizer.staffysoft.com",
    signupUrl: "https://voicenoteatomizer.staffysoft.com",
    addToAccountUrl: addToAccountUrl("voice-note-atomizer"),
    pricingNote: "$4.99/mo",
  },
  {
    id: "performer-prompter",
    name: "Performer Prompter",
    tagline: "Paste. Record. Post. Lyrics and scripts on stage.",
    description:
      "A teleprompter built for performers — paste your lyrics or script, tune the scroll speed and font size, and hit record. Designed for the stage and the studio so nothing you need to read ever scrolls out of reach.",
    category: "Music",
    status: "beta",
    variant: "standard",
    launchedAt: "2026-06-01",
    hero: "/products/performer-prompter.png",
    productUrl: "https://performerprompter.staffysoft.com",
    signupUrl: "https://performerprompter.staffysoft.com",
    addToAccountUrl: addToAccountUrl("performer-prompter"),
    pricingNote: "Free while in friends beta",
  },
  {
    id: "dans-music-studio",
    name: "Dan's Music Studio",
    tagline:
      "Self-service, CMS-driven, bespoke marketing site for a local music school.",
    description:
      "What StaffySoft builds for local businesses, out in the wild: a bespoke marketing site for West Orange's neighborhood music school, driven by a CMS the studio runs itself — lessons, programs, and performances stay current without a developer in the loop.",
    category: "Education",
    status: "live",
    variant: "standard",
    launchedAt: "2026-06-01",
    hero: "/products/dansmusicstudio.png",
    productUrl: "https://www.dansmusicstudio.com",
    signupUrl: "https://www.dansmusicstudio.com",
    // Deliberately no addToAccountUrl — a client showcase, not an account
    // product. The card offers "Visit" + a contact CTA instead.
  },
  {
    id: "tone-conditioner",
    name: "ToneConditioner",
    tagline: "Sessions that save your work and pick up where you left off.",
    description:
      "ToneGrid gets you started. ToneConditioner keeps you going — with longer sessions, saved progress, and an account that remembers everything. Practice ear training and tone work across devices without losing your place.",
    category: "Music",
    status: "coming-soon",
    variant: "roadmap",
    launchedAt: "2026-10-01",
    hero: "/products/tonesmith.png",
    productUrl: "https://toneconditioner.staffysoft.com",
    signupUrl: "https://toneconditioner.staffysoft.com",
  },
  {
    id: "interview-lifeguard",
    name: "Interview Lifeguard",
    tagline: "Interview support for neurodivergent engineers under pressure.",
    description:
      "A tool to help neurodivergent folks navigate high-pressure interviews — especially the programming ones — without freezing. Quiet, in-the-moment scaffolding so the interview tests what you know, not how well you handle the panic.",
    category: "Productivity",
    status: "coming-soon",
    variant: "roadmap",
    launchedAt: "2026-10-01",
    hero: "/products/interview-lifeguard.png",
    productUrl: "https://interviewlifeguard.staffysoft.com",
    signupUrl: "https://interviewlifeguard.staffysoft.com",
  },
];

// ---------------------------------------------------------------------------
// Helpers — keep page components free of data-munging logic.
// ---------------------------------------------------------------------------

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Shipped products (hero + standard), hero first, then array order. */
export function shippedProducts(list: Product[] = products): Product[] {
  const shipped = list.filter(
    (p) => p.variant === "hero" || p.variant === "standard",
  );
  return [
    ...shipped.filter((p) => p.variant === "hero"),
    ...shipped.filter((p) => p.variant === "standard"),
  ];
}

/** Roadmap entries, in array order. */
export function roadmapProducts(list: Product[] = products): Product[] {
  return list.filter((p) => p.variant === "roadmap");
}

/**
 * The product to spotlight in the top-of-page hero. The `hero` variant wins;
 * otherwise the newest live product, else the newest overall.
 */
export function featuredProduct(list: Product[] = products): Product {
  const hero = list.find((p) => p.variant === "hero");
  if (hero) return hero;

  const byNewest = [...list].sort(
    (a, b) => Date.parse(b.launchedAt) - Date.parse(a.launchedAt),
  );
  return byNewest.find((p) => p.status === "live") ?? byNewest[0];
}
