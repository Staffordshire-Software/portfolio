# StaffySoft Portfolio

The public face of [Staffordshire Software](https://github.com/Staffordshire-Software).
Lists every product we've shipped, with two CTAs per entry: **Try it** (sign up
fresh) and **Add to my account** (existing StaffySoft Core users).

Master portfolio board: https://github.com/orgs/Staffordshire-Software/projects/7

## Stack

- **Next.js** (App Router) — static export / SSG. The product list is finite and
  updated infrequently, so the whole site prerenders to static HTML.
- **TypeScript**
- **Tailwind CSS** (v4)
- **Deploy:** Vercel (primary), GitHub Pages (fallback)

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Project layout

```
data/products.ts        ← all product data (the file you edit most)
lib/core.ts             ← StaffySoft Core integration (stubbed)
app/page.tsx            ← home: hero + featured + grid by category
app/products/[id]/      ← per-product page (one static page per product)
app/about/page.tsx      ← about (placeholder copy)
components/             ← ProductCard, StatusBadge, Hero, CategoryGrid
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
     launchedAt: "2026-06-01",    // ISO date
     productUrl: "https://myproduct.staffysoft.com",   // see "Product subdomains"
     signupUrl: "https://myproduct.staffysoft.com",    // same until a signup page exists
     addToAccountUrl: addToAccountUrl("my-product"), // helper from lib/core.ts
     pricingNote: "Free tier + $5/mo Pro", // optional
     // hero: "/my-product.png",  // optional, image under /public
   }
   ```

2. That's it — the home page, category grouping, and the `/products/my-product`
   page are all generated from this list at build time. No other files to touch.
3. Run `npm run build` to confirm it compiles, then open a PR. Merging to `main`
   redeploys (see below).

**Status badges:** `live` is green, `beta` is yellow, `coming-soon` is grey. A
`coming-soon` product shows a disabled "Coming soon" button instead of "Try it".

## Build / static export

```bash
npm run build     # writes the static site to ./out
npm run export    # sanity-checks that ./out was produced
npm run serve     # serve ./out locally to preview the production build
```

> Note: Next.js 14+ has no separate `next export` step. Setting
> `output: "export"` in `next.config.ts` makes `next build` emit `./out`
> directly. `npm run export` just verifies that output exists.
>
> There is no `next start`: that command can't serve an `output: "export"`
> build. Use `npm run serve` (a static file server over `./out`) to preview
> the production build locally.

## Deploy

### Vercel (primary)

1. Import the repo at https://vercel.com/new.
2. The framework auto-detects as Next.js. No env vars are needed for the static
   site.
3. Production branch: `main`. Every push to `main` redeploys; PRs get preview
   URLs automatically.

Until Dan buys a real domain, the production URL is
`https://staffysoft-portfolio.vercel.app`.

### GitHub Pages (fallback)

A ready-to-use workflow lives at `.github/workflows/deploy-pages.yml`.

1. In the repo, go to **Settings → Pages → Build and deployment** and set the
   source to **GitHub Actions**.
2. Trigger the **Deploy to GitHub Pages** workflow from the **Actions** tab
   (it's `workflow_dispatch` / manual so it doesn't compete with Vercel on every
   push).
3. The site publishes to `https://staffordshire-software.github.io/portfolio`.

The workflow sets `NEXT_PUBLIC_BASE_PATH` to the repo name so assets resolve
under the `/portfolio` sub-path, and a `.nojekyll` file ships in `public/` so
GitHub Pages serves Next's `_next/` assets untouched.

To build a Pages-style export locally:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

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
https://github.com/Staffordshire-Software/core — the "Add to my account" CTA
deep-links into Core's `/add?product=ID` endpoint. This is **stubbed** in
`lib/core.ts` until Core ships; that file is the seam to replace when it does.

## Not yet (deferred)

- Analytics (Plausible — Dan will add later)
- Newsletter / email capture
- Real auth integration & cross-product SSO (waiting on Core)
- A CMS — products are checked into the repo on purpose
