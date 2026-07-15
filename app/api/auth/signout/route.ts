// Same-origin sign-out route POSTed by `useSession().signOut` (#15).
//
// Clearing our own cookie is not a logout — the shared Core SSO session would
// silently sign the user back in on the next visit. `core.signOut()` revokes
// the SSO session in Core (propagating logout; it never throws) and hands
// back the expired-cookie descriptors to apply, including the
// `.staffysoft.com` SSO cookie when CORE_SSO_COOKIE_DOMAIN is set.

import { NextRequest, NextResponse } from "next/server";
import {
  CLEAR_PRODUCT_COOKIE,
  PRODUCT_SESSION_COOKIE,
  coreClient,
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

  const res = NextResponse.json({ ok: true });

  if (!coreConfigured()) {
    const { value, ...attrs } = CLEAR_PRODUCT_COOKIE;
    res.cookies.set(PRODUCT_SESSION_COOKIE, value, attrs);
    return res;
  }

  try {
    const { clearCookies } = await coreClient().signOut({
      sessionToken: req.cookies.get(PRODUCT_SESSION_COOKIE)?.value,
      productCookies: [PRODUCT_SESSION_COOKIE],
      // `.staffysoft.com` in prod; unset in local dev where the cookie is
      // host-only (must match Core's CORE_SSO_COOKIE_DOMAIN).
      ssoCookieDomain: process.env.CORE_SSO_COOKIE_DOMAIN?.trim() || undefined,
    });
    for (const { name, value, ...attrs } of clearCookies) {
      res.cookies.set(name, value, attrs);
    }
  } catch {
    // signOut() is documented never to throw, but sign-out must converge to
    // signed-out locally even if that contract is ever broken.
    const { value, ...attrs } = CLEAR_PRODUCT_COOKIE;
    res.cookies.set(PRODUCT_SESSION_COOKIE, value, attrs);
  }
  return res;
}
