// Global sign-out proxy (#15, ADR-0011) — "Sign out of all StaffySoft apps".
//
// AccountMenu POSTs here; we forward to Core's cookie-authenticated
// `/api/sdk/v1/session/signout-all` with the product API key attached
// server-side (the browser never sees it), relay Core's response and its
// `.staffysoft.com` cookie expiries back, and clear our own session cookie.
// The marketing site holds no state beyond that cookie, so the proxy is thin
// by design. Whatever Core answers, the local session converges to signed
// out — AccountMenu re-syncs its state after any settled response.

import { NextRequest, NextResponse } from "next/server";
import { SSO_COOKIE_NAME } from "@staffysoft/core-client";

// The upstream Set-Cookie relay uses `Headers.getSetCookie()`, which exists in
// Node/undici but not in every edge runtime — pin the route to Node.js.
export const runtime = "nodejs";
import {
  CLEAR_PRODUCT_COOKIE,
  CORE_API_KEY,
  CORE_BASE_URL,
  PRODUCT_SESSION_COOKIE,
  coreConfigured,
  isSameOriginRequest,
} from "@/lib/core-server";

export async function POST(req: NextRequest) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json(
      { error: { code: "cross_origin" } },
      { status: 403 },
    );
  }

  const ssoToken = req.cookies.get(SSO_COOKIE_NAME)?.value;

  let status = 401;
  let body: unknown = { error: { code: "no_session" } };
  const relayedCookies: string[] = [];

  if (coreConfigured() && ssoToken) {
    try {
      const upstream = await fetch(
        `${CORE_BASE_URL}/api/sdk/v1/session/signout-all`,
        {
          method: "POST",
          headers: {
            "x-api-key": CORE_API_KEY,
            "x-product-key": process.env.CORE_PRODUCT_KEY?.trim() || "portfolio",
            cookie: `${SSO_COOKIE_NAME}=${ssoToken}`,
          },
          cache: "no-store",
        },
      );
      status = upstream.status;
      body = await upstream.json().catch(() => ({}));
      // Core's expiries are Domain=.staffysoft.com, so relaying them from
      // this same-site origin removes the shared SSO cookie too.
      relayedCookies.push(...upstream.headers.getSetCookie());
    } catch {
      status = 502;
      body = { error: { code: "core_unreachable" } };
    }
  }

  const res = NextResponse.json(body, { status });
  const { value, ...attrs } = CLEAR_PRODUCT_COOKIE;
  res.cookies.set(PRODUCT_SESSION_COOKIE, value, attrs);
  // Raw header appends must come after cookies.set(), which rewrites the
  // whole set-cookie header from its own jar and would drop them.
  for (const cookie of relayedCookies) {
    res.headers.append("set-cookie", cookie);
  }
  return res;
}
