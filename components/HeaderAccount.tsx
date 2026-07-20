"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AccountMenu, useSession } from "@staffysoft/core-client/react";
import { CORE_ACCOUNTS_BASE } from "@/lib/core";

/**
 * The header's account slot (#15): the shared AccountMenu when a Core session
 * is present, the "Sign in" CTA (into Core's accounts app) for guests, and
 * nothing while the session is still resolving — matching AccountMenu's own
 * loading behavior, so the header never flashes the wrong state.
 */
export default function HeaderAccount() {
  // `useSession` state is per hook instance: AccountMenu runs its own copy,
  // so this one must re-sync after the menu signs the user out (onSignedOut
  // below), or the header would show neither menu nor CTA.
  const { session, status, refresh } = useSession();

  // Where Core's hosted account switcher returns the user afterwards — the
  // page they're on, tracked across client-side navigations. The origin is a
  // lazy initializer (no SSR window); the menu only renders client-side, so
  // the server's undefined returnTo never reaches the DOM. The query string
  // is read from the location directly rather than useSearchParams(), which
  // would demand a Suspense boundary on every statically-prerendered page —
  // any query change on this site comes with a pathname change re-render.
  const pathname = usePathname();
  const [origin] = useState(() =>
    typeof window === "undefined" ? "" : window.location.origin,
  );
  const returnTo = origin
    ? `${origin}${pathname}${window.location.search}`
    : undefined;

  if (status === "loading") return null;

  if (!session || session.isGuest) {
    // Straight into Core's sign-in, carrying the page the user is on so they
    // land back here afterwards (via Core's validated post-sign-in redirect).
    // For a user who *already* holds a Core SSO session — this header just
    // couldn't see it, e.g. the very first visit before the session bridge
    // warms — Core's signin page short-circuits and bounces them right back
    // signed in, no form shown (silent SSO).
    const signInHref = returnTo
      ? `${CORE_ACCOUNTS_BASE}/auth/signin?returnTo=${encodeURIComponent(returnTo)}`
      : `${CORE_ACCOUNTS_BASE}/auth/signin`;
    return (
      <a
        href={signInHref}
        className="whitespace-nowrap rounded-lg bg-brand px-2.5 py-1.5 text-xs font-semibold text-brand-contrast transition-colors hover:bg-brand-bright sm:px-3.5"
      >
        Sign in
      </a>
    );
  }

  return (
    <AccountMenu
      baseUrl={CORE_ACCOUNTS_BASE}
      returnTo={returnTo}
      // Trailing slash to match `trailingSlash: true` (the session endpoints
      // come from CoreSessionProvider in the layout; this one is a direct
      // AccountMenu prop with a slash-less default).
      signOutAllEndpoint="/api/core/session/signout-all/"
      onSignedOut={() => void refresh()}
    />
  );
}
