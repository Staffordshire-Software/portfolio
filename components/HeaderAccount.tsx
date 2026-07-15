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
  // the server's undefined returnTo never reaches the DOM.
  const pathname = usePathname();
  const [origin] = useState(() =>
    typeof window === "undefined" ? "" : window.location.origin,
  );
  const returnTo = origin ? `${origin}${pathname}` : undefined;

  if (status === "loading") return null;

  if (!session || session.isGuest) {
    return (
      <a
        href={CORE_ACCOUNTS_BASE}
        className="rounded-lg bg-brand px-3.5 py-1.5 text-xs font-semibold text-brand-contrast transition-colors hover:bg-brand-bright"
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
