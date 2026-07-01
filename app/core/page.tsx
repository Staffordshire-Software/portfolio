import type { Metadata } from "next";
import Link from "next/link";
import { platform } from "@/data/products";

export const metadata: Metadata = {
  title: platform.name,
  description: platform.tagline,
};

/**
 * Placeholder landing page for StaffySoft Core so the homepage "Learn more"
 * CTA never 404s. The full Core page (architecture, what you get with an
 * account, etc.) is scoped separately and will replace this.
 */
export default function CorePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      <span className="inline-flex items-center rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest text-brand-bright ring-1 ring-inset ring-brand/30">
        {platform.tag}
      </span>

      <h1 className="mt-4 text-4xl font-bold tracking-tight">
        {platform.name}
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p>{platform.tagline}</p>
        <p>
          Core isn&apos;t another app to install. It&apos;s the account layer
          behind every StaffySoft product: sign up once and add any product to
          the same account in a click — one identity, one bill, no duplicate
          passwords.
        </p>
        <p>
          This page is a placeholder. A fuller tour of Core — what it does for
          you and what&apos;s on its roadmap — lands here soon.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bright"
        >
          Browse products
        </Link>
        <Link
          href="/about"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2"
        >
          About StaffySoft
        </Link>
      </div>
    </div>
  );
}
