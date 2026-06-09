import type { NextConfig } from "next";

// The site ships as a fully static export (SSG). `next build` writes the
// deployable site to ./out — there is no separate `next export` step in
// Next.js 14+. See README "Deploy" for Vercel and GitHub Pages targets.
//
// GitHub Pages project sites are served from a sub-path (e.g. /portfolio),
// so we read an optional base path from the environment. Vercel serves from
// the domain root and leaves this unset.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /products/foo/index.html so static hosts (GitHub Pages) resolve
  // routes without server-side rewrites.
  trailingSlash: true,
  // The default Image Optimization loader needs a server; static exports
  // must use unoptimized images. We mostly use CSS art for heroes, but this
  // keeps next/image working if real screenshots are added later.
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
