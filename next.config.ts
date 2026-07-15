import type { NextConfig } from "next";

// The site runs as a regular Next.js server app on Vercel. It shipped as a
// fully static export until #15: the signed-in header needs same-origin API
// routes (/api/core/session and the sign-out proxies) that hold the Core
// product API key server-side, which a static export cannot provide. The
// marketing pages themselves are still statically prerendered (SSG) — only
// the app/api/ routes run on the server.
const nextConfig: NextConfig = {
  // Kept from the static-export era so URLs don't change (/products/foo/).
  trailingSlash: true,
  // Kept for byte-identical rendering with the exported site; flip this off
  // later if we want Vercel's image optimization.
  images: { unoptimized: true },
};

export default nextConfig;
