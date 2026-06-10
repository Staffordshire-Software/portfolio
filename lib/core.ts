// StaffySoft Core integration — STUB.
//
// Core (https://github.com/Staffordshire-Software/core) owns auth, accounts,
// and entitlements. Until it ships, the portfolio only needs to deep-link
// into Core's "add this product to my account" flow. There is no live API
// call here yet; this module just centralizes the URL contract so the data
// file and any future client both point at the same place.
//
// When Core is ready, this is the seam to replace: swap `addToAccountUrl`
// for a real entitlement check + redirect (or an embedded flow).

export const CORE_ACCOUNTS_BASE = "https://accounts.staffysoft.com";

/** Build the "Add to my StaffySoft account" deep link for a product id. */
export function addToAccountUrl(productId: string): string {
  return `${CORE_ACCOUNTS_BASE}/add?product=${encodeURIComponent(productId)}`;
}
