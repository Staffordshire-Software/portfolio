# StaffySoft Portfolio

Public homepage for [Staffordshire Software](https://github.com/Staffordshire-Software). Lists every shipped product with two CTAs per entry: **Try it** (sign up fresh) and **Add to my account** (existing StaffySoft Core users).

Master portfolio board: https://github.com/orgs/Staffordshire-Software/projects/7

## Stack

- Next.js (App Router) — static export
- TypeScript
- Tailwind CSS
- Deploy: Vercel primary, GitHub Pages as fallback

## Local dev

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Adding a product

Product entries live in `data/products.ts` (to be created during the initial build PR). Each entry follows the `Product` type — see that file for the full schema. After adding, open a PR; merging to `main` deploys via Vercel.

## Deploy

### Vercel (primary)

1. Import the repo at https://vercel.com/new
2. Framework is auto-detected as Next.js — no env vars needed for the static site
3. Production branch: `main`

### GitHub Pages (fallback)

```bash
npm run build
# Static output lands in ./out (configured via next.config.ts)
```

Push `./out` to the `gh-pages` branch, or use a GitHub Action workflow.

## Integrations

- **StaffySoft Core** (auth/entitlements): https://github.com/Staffordshire-Software/core — `addToAccountUrl` on each product points to Core's `/add?product=ID` endpoint. Stubbed until Core ships.
