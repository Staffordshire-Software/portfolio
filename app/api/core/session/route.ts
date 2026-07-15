// Same-origin session endpoint for `useSession()` / `<AccountMenu>` (#15).
//
// Returns `CoreSession | null` as JSON. The browser never talks to Core
// directly — this route holds the product API key (lib/core-server.ts) and
// resolves the shared `.staffysoft.com` SSO cookie into a portfolio-scoped
// session:
//
//   1. No SSO cookie (or Core not configured) → null, guest header.
//   2. Cached product session whose `sid` still matches the SSO cookie →
//      validate it with `getSession()` and return it.
//   3. Otherwise bridge: `exchangeSsoSession()` mints a portfolio session,
//      cached in an httpOnly cookie for subsequent requests (#77 pattern —
//      an account switch re-points the SSO cookie's `sid`, which stops
//      matching and forces a re-bridge here).
//
// Any Core failure degrades to signed-out rather than erroring the header.

import { NextRequest, NextResponse } from "next/server";
import type { CoreSession } from "@staffysoft/core-client";
import {
  SSO_COOKIE_NAME,
  peekSessionSid,
  peekSsoSession,
} from "@staffysoft/core-client";
import {
  CLEAR_PRODUCT_COOKIE,
  PRODUCT_SESSION_COOKIE,
  coreClient,
  coreConfigured,
} from "@/lib/core-server";

const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // days, matching the SDK docs

export async function GET(req: NextRequest) {
  const ssoToken = req.cookies.get(SSO_COOKIE_NAME)?.value;
  const cachedToken = req.cookies.get(PRODUCT_SESSION_COOKIE)?.value;

  const respond = (
    session: CoreSession | null,
    cookie?: { set: string } | { clear: true },
  ) => {
    const res = NextResponse.json(session);
    if (cookie && "set" in cookie) {
      res.cookies.set(PRODUCT_SESSION_COOKIE, cookie.set, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_COOKIE_MAX_AGE,
        secure: process.env.NODE_ENV === "production",
      });
    } else if (cookie && cachedToken) {
      const { value, ...attrs } = CLEAR_PRODUCT_COOKIE;
      res.cookies.set(PRODUCT_SESSION_COOKIE, value, attrs);
    }
    return res;
  };

  if (!coreConfigured() || !ssoToken) {
    return respond(null, cachedToken ? { clear: true } : undefined);
  }

  const core = coreClient();

  // Reuse the cached product session while it still derives from the SSO
  // session in the cookie (peeks are unverified hints; getSession() is the
  // authority and enforces revocation).
  if (cachedToken && peekSessionSid(cachedToken) === peekSsoSession(ssoToken)?.sid) {
    try {
      const session = await core.getSession(cachedToken);
      if (session) return respond(session);
    } catch {
      // Expired/revoked — fall through and re-bridge from the SSO cookie.
    }
  }

  try {
    const { sessionToken } = await core.exchangeSsoSession(ssoToken);
    const session = await core.getSession(sessionToken);
    return respond(session, { set: sessionToken });
  } catch {
    // Revoked or expired SSO session, or Core unreachable — signed out.
    return respond(null, { clear: true });
  }
}
