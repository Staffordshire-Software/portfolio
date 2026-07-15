# StaffySoft Portfolio

The public face of [Staffordshire Software](https://github.com/Staffordshire-Software).
The homepage is split into three sections, all driven by `data/products.ts`:

- **What we've shipped** — a flagship (`variant: "hero"`) card followed by
  standard cards. Account products get **Add to my account** (existing
  StaffySoft Core users) plus a try/demo CTA; showcase entries without an
  `addToAccountUrl` (bespoke client sites) get a **Visit** link and a contact
  CTA instead.
- **Platform** — a single, visually distinct card for StaffySoft Core (the
  `platform` export, not a product entry), linking to `/core`.
- **On the roadmap** — compact `variant: "roadmap"` cards with no CTAs.

Master portfolio board: https://github.com/orgs/Staffordshire-Software/projects/7

## Stack

- **Next.js** (App Router) — marketing pages are statically prerendered (SSG);
  a handful of API routes (`app/api/`) run server-side for the signed-in
  header (they hold the Core product API key, which can never ship to the
  browser). The site was a fully static export until
  [#15](https://github.com/Staffordshire-Software/portfolio/issues/15).
- **TypeScript**
- **Tailwind CSS** (v4), themed by the shared StaffySoft design tokens from
  `@staffysoft/core-client` (light/dark/system)
- **Deploy:** Vercel

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Project layout

```
data/products.ts        ← all product + platform data (the file you edit most)
lib/core.ts             ← Core URL contract used by the client (links, CTAs)
lib/core-server.ts      ← server-side Core SDK client (holds the API key)
app/page.tsx            ← home: hero + shipped / platform / roadmap sections
app/products/[id]/      ← per-product page (one static page per product)
app/about/page.tsx      ← about (placeholder copy)
app/api/core/session/   ← same-origin session endpoint for useSession()
app/api/auth/signout/   ← propagating sign-out (this app + Core SSO session)
app/api/core/session/signout-all/ ← "sign out of all apps" proxy → Core
components/             ← Hero, HeroProductCard, ProductCard, PlatformCard,
                          RoadmapCard, StatusBadge, HeaderAccount
```

## Adding a product

1. Open `data/products.ts` and append a new entry to the `products` array. Each
   entry follows the `Product` type defined at the top of that file:

   ```ts
   {
     id: "my-product",            // URL slug — must be unique
     name: "My Product",
     tagline: "One-line hook.",
     description: "A paragraph...",
     category: "Tools",           // Music | Productivity | Education | Business Ops | Tools | Other
     status: "live",              // live | beta | coming-soon
     variant: "standard",         // hero (flagship, max one) | standard | roadmap
     launchedAt: "2026-06-01",    // ISO date
     productUrl: "https://myproduct.staffysoft.com",   // see "Product subdomains"
     signupUrl: "https://myproduct.staffysoft.com",    // same until a signup page exists
     addToAccountUrl: addToAccountUrl("my-product"), // helper from lib/core.ts — omit for
                                                     // non-account showcase entries
     pricingNote: "Free tier + $5/mo Pro", // optional
     // hero: "/my-product.png",  // optional, image under /public
   }
   ```

2. That's it — the home page sections and the `/products/my-product` page are
   all generated from this list at build time. No other files to touch.
3. Run `npm run build` to confirm it compiles, then open a PR. Merging to `main`
   redeploys (see below).

**Status badges:** `live` is green, `beta` is yellow, `coming-soon` is grey. A
`coming-soon` product shows a disabled "Coming soon" button instead of "Try it".

## Build

```bash
npm run build     # production build (marketing pages prerender as SSG)
npm run start     # serve the production build locally
```

> The site was a fully static export (`output: "export"`) until
> [#15](https://github.com/Staffordshire-Software/portfolio/issues/15) added
> the signed-in header, whose session/sign-out routes need a server to keep
> the Core API key out of the browser. GitHub Pages (static-only) was dropped
> as a deploy target at the same time.

## Deploy

1. Import the repo at https://vercel.com/new.
2. The framework auto-detects as Next.js. No env vars are _required_ — the site
   builds and runs with sensible defaults (every visitor is a guest until
   `CORE_API_KEY` is configured). See `.env.example` for the full list:
   `NEXT_PUBLIC_STAFFYSOFT_ACCOUNTS_URL` points CTAs at Core, and
   `CORE_API_KEY` / `CORE_SSO_COOKIE_DOMAIN` light up the signed-in header.
3. Production branch: `main`. Every push to `main` redeploys; PRs get preview
   URLs automatically.

Until Dan buys a real domain, the production URL is
`https://staffysoft-portfolio.vercel.app`.

## Product subdomains

Each product lives at `<subdomain>.staffysoft.com` (typically the product `id` with
hyphens removed — e.g. `tone-conditioner` → `toneconditioner.staffysoft.com`). Wire each one up via a Cloudflare CNAME
(target: `cname.vercel-dns.com`, **DNS only** — gray cloud, so Vercel can issue
SSL) plus a Vercel project domain attach. Dan handles the DNS + Vercel wiring;
this repo just references the subdomain in `data/products.ts`
(`productUrl` / `signupUrl`).

Current subdomains:

| Product | Subdomain |
|---|---|
| ToneConditioner | `toneconditioner.staffysoft.com` |
| Voice Note Atomizer | `voicenoteatomizer.staffysoft.com` |
| Interview Lifeguard | `interviewlifeguard.staffysoft.com` |
| Performer Prompter | `performerprompter.staffysoft.com` |

## Integrations

**StaffySoft Core** (auth/entitlements):
https://github.com/Staffordshire-Software/core — two integrations:

- **Deep links** (`lib/core.ts`): the "Add to my account" CTA points at Core's
  `/add?product=ID` endpoint; the header's "Sign in" CTA and the account
  switcher point at the same host. Base URL from
  `NEXT_PUBLIC_STAFFYSOFT_ACCOUNTS_URL`, defaulting to
  `https://accounts.staffysoft.com`.
- **Signed-in header** (#15): `@staffysoft/core-client`'s `CoreSessionProvider`
  + `AccountMenu` render the current account (with switch / sign out / sign out
  of all apps), and the shared design tokens + `ColorSchemeToggle` drive
  System/Light/Dark. The same-origin routes under `app/api/` resolve the
  shared `.staffysoft.com` SSO cookie server-side (see `lib/core-server.ts`);
  requires `CORE_API_KEY`, and degrades to guest-only without it.

## Not yet (deferred)

- Analytics (Plausible — Dan will add later)
- Newsletter / email capture
- A CMS — products are checked into the repo on purpose
