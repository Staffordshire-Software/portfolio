// Server-side StaffySoft Core client (#15).
//
// This module holds the product API key, so it must only be imported from
// server code (route handlers under app/api/). The browser reaches Core
// exclusively through those same-origin routes — never directly.
//
// The marketing site is a "same-site" product (staffysoft.com, the parent
// domain of Core's `.staffysoft.com` SSO cookie): the browser sends Core's
// `staffysoft_sso` cookie to us automatically, and the session route trades it
// for a portfolio-scoped session via `exchangeSsoSession()`.

import "server-only"; // build-time guard: importing this from client code fails

import type { NextRequest } from "next/server";
import { createCoreClient } from "@staffysoft/core-client";
import { DEFAULT_ACCOUNTS_URL } from "./core";

/**
 * httpOnly cookie caching the portfolio-scoped Core session token, so the
 * session route doesn't re-bridge the SSO cookie on every request. It is a
 * cache, not the source of truth: the route re-bridges whenever the SSO
 * cookie's `sid` stops matching (account switch), and drops it when the SSO
 * cookie disappears.
 */
export const PRODUCT_SESSION_COOKIE = "portfolio_session";

/** Expired-cookie attributes used to clear {@link PRODUCT_SESSION_COOKIE}. */
export const CLEAR_PRODUCT_COOKIE = {
  value: "",
  path: "/" as const,
  maxAge: 0,
  httpOnly: true,
  sameSite: "lax" as const,
};

/**
 * Core's base URL for server-to-server SDK calls. Same host as the accounts
 * app the client-side links point at; override with CORE_BASE_URL if they
 * ever diverge (e.g. a preview Core).
 */
export const CORE_BASE_URL = (
  process.env.CORE_BASE_URL?.trim() ||
  process.env.NEXT_PUBLIC_STAFFYSOFT_ACCOUNTS_URL?.trim() ||
  DEFAULT_ACCOUNTS_URL
).replace(/\/+$/, "");

/** Per-product secret (x-api-key). Server-side only — never NEXT_PUBLIC. */
export const CORE_API_KEY = process.env.CORE_API_KEY?.trim() || "";

/**
 * Whether the server-side Core integration is configured. Without an API key
 * the session routes degrade gracefully: every visitor is a guest and the
 * header keeps its "Sign in" CTA — the marketing pages themselves never
 * depend on Core.
 */
export function coreConfigured(): boolean {
  return CORE_API_KEY.length > 0;
}

/**
 * CSRF guard for the cookie-authenticated, state-changing POST routes: a
 * cross-site form/fetch POST must not be able to sign the user out. Browsers
 * always send `Origin` on POST — reject when it doesn't match the host the
 * request arrived on. A missing Origin (curl, server-to-server) is allowed,
 * per the usual same-origin-check guidance.
 */
export function isSameOriginRequest(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  // Every legitimate view of the request's host: Next's parsed URL plus the
  // raw Host/X-Forwarded-Host headers (the forwarded value can be a
  // comma-joined chain when several proxies append to it). These are all
  // server/proxy-set, so accepting a match on any of them stays safe.
  const candidates = new Set(
    [
      req.nextUrl.host,
      req.headers.get("host"),
      ...(req.headers.get("x-forwarded-host")?.split(",") ?? []),
    ]
      .filter((h): h is string => Boolean(h))
      .map((h) => h.trim()),
  );
  try {
    return candidates.has(new URL(origin).host);
  } catch {
    return false;
  }
}

let client: ReturnType<typeof createCoreClient> | null = null;

export function coreClient() {
  client ??= createCoreClient({
    baseUrl: CORE_BASE_URL,
    productKey: process.env.CORE_PRODUCT_KEY?.trim() || "portfolio",
    apiKey: CORE_API_KEY,
  });
  return client;
}
