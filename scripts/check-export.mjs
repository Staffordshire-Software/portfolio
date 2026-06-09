// Verifies that `next build` produced a deployable static export in ./out.
//
// In Next.js 14+ there is no separate `next export` command — setting
// `output: "export"` in next.config.ts makes `next build` emit ./out directly.
// This script keeps the documented `npm run build && npm run export` flow
// meaningful by sanity-checking the build output.
import { existsSync } from "node:fs";

const entry = "out/index.html";

if (!existsSync(entry)) {
  console.error(`No static export found (${entry} missing).`);
  console.error("Run `npm run build` first.");
  process.exit(1);
}

console.log("Static export ready in ./out");
