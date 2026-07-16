// StaffySoft shared theme tokens — canonical registry.
//
// Each app declares its accent color in ONE place; the favicon and UI both
// consume from that source. This file is the source of truth for the pattern:
// app repos carry a `lib/theme.ts` that duplicates their own entry (by
// convention, not by package — consolidating into a shared npm package is
// deferred until 3+ apps are in production; see portfolio#18).

export type StaffySoftAppTheme = {
  slug: "pp" | "tc" | "tg" | "bh" | "vn";
  name: string;
  accent: { hex: `#${string}`; name: string };
  favicon: { letters: string }; // 2-char monogram
};

export const APP_THEMES: Record<StaffySoftAppTheme["slug"], StaffySoftAppTheme> = {
  pp: { slug: "pp", name: "Performer Prompter", accent: { hex: "#B33A3A", name: "crimson" }, favicon: { letters: "PP" } },
  tc: { slug: "tc", name: "ToneSmith",           accent: { hex: "#E8956B", name: "peach"   }, favicon: { letters: "TC" } },
  tg: { slug: "tg", name: "ToneGrid",            accent: { hex: "#D4A64A", name: "gold"    }, favicon: { letters: "TG" } },
  bh: { slug: "bh", name: "Billing Helper",      accent: { hex: "#2B7A78", name: "teal"    }, favicon: { letters: "BH" } },
  vn: { slug: "vn", name: "Voice Note Atomizer", accent: { hex: "#7E5BB9", name: "violet"  }, favicon: { letters: "VN" } },
};
