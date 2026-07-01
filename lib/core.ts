// StaffySoft Core integration.
//
// Core (https://github.com/Staffordshire-Software/core) owns auth, accounts,
// and entitlements. The portfolio deep-links into Core's "add this product to
// my account" flow (`/add?product=<id>`); there is no live API call here — this
// module just centralizes the URL contract so the data file and any future
// client both point at the same place.
//
// When Core is ready for a richer integration, this is the seam to replace:
// swap `addToAccountUrl` for a real entitlement check + redirect (or an
// embedded flow).

/**
 * Default Core accounts host. `accounts.staffysoft.com` is a Vercel alias for
 * the Core project's real `/add` flow (Core #62); it reads better to customers
 * than the underlying `console.` host. Override per environment with
 * NEXT_PUBLIC_STAFFYSOFT_ACCOUNTS_URL (set in Vercel on all portfolio deploys).
 */
export const DEFAULT_ACCOUNTS_URL = "https://accounts.staffysoft.com";

/**
 * Base URL for Core's accounts app. Read from the public env var at build time
 * — Next.js inlines `NEXT_PUBLIC_*` references into the bundle. A configured
 * value has any trailing slash trimmed so link construction stays clean; when
 * unset or blank we fall back to the production host, so local builds need no
 * config.
 */
const configuredAccountsUrl =
  process.env.NEXT_PUBLIC_STAFFYSOFT_ACCOUNTS_URL?.trim();

export const CORE_ACCOUNTS_BASE = configuredAccountsUrl
  ? configuredAccountsUrl.replace(/\/+$/, "")
  : DEFAULT_ACCOUNTS_URL;

/** Build the "Add to my StaffySoft account" deep link for a product id. */
export function addToAccountUrl(productId: string): string {
  return `${CORE_ACCOUNTS_BASE}/add?product=${encodeURIComponent(productId)}`;
}
