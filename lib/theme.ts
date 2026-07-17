// StaffySoft shared theme tokens — canonical registry.
//
// Each app declares its EXISTING UI accent color in ONE place; the favicon
// and UI both consume from that source (the accent flows FROM the app's
// established brand color TO the favicon, not the other way around). This
// file is the source of truth for the pattern: app repos carry a
// `lib/theme.ts` that duplicates their own entry (by convention, not by
// package — consolidating into a shared npm package is deferred until 3+
// apps are in production; see issue #18).

export type StaffySoftAppTheme = {
  slug: "pp" | "tc" | "tg" | "bh" | "vn";
  name: string;
  accent: { hex: `#${string}`; name: string };
  favicon: { letters: string }; // monogram (2 chars by convention)
};

// The mapped `satisfies` type makes each entry's `slug` provably match its
// key, so the two can't drift.
export const APP_THEMES = {
  pp: { slug: "pp", name: "Performer Prompter", accent: { hex: "#d92d20", name: "brand red" }, favicon: { letters: "PP" } },
  tc: { slug: "tc", name: "ToneSmith",           accent: { hex: "#a0732f", name: "brass" },     favicon: { letters: "TC" } },
  // TG's accent is provisional — the tone-grid repo hasn't adopted the
  // pattern yet, so this is the favicon-master pick, not a verified UI accent.
  tg: { slug: "tg", name: "ToneGrid",            accent: { hex: "#D4A64A", name: "gold" },      favicon: { letters: "TG" } },
  bh: { slug: "bh", name: "Billing Helper",      accent: { hex: "#4f46e5", name: "indigo" },    favicon: { letters: "BH" } },
  vn: { slug: "vn", name: "Voice Note Atomizer", accent: { hex: "#dc2626", name: "record red" }, favicon: { letters: "VN" } },
} satisfies { [S in StaffySoftAppTheme["slug"]]: StaffySoftAppTheme & { slug: S } };
