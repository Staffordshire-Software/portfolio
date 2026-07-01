import Link from "next/link";
import type { Platform } from "@/data/products";

/**
 * The StaffySoft Core card. Deliberately styled apart from the product cards
 * (dashed brand border, "Platform" tag, no screenshot) so it reads as the
 * layer underneath the apps rather than another app to install.
 */
export default function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <aside className="rounded-2xl border border-dashed border-brand/50 bg-surface p-6 sm:p-8">
      <span className="inline-flex items-center rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest text-brand-bright ring-1 ring-inset ring-brand/30">
        {platform.tag}
      </span>

      <h3 className="mt-4 text-xl font-semibold tracking-tight">
        {platform.name}
      </h3>

      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
        {platform.tagline}
      </p>

      <Link
        href={platform.learnMoreUrl}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright transition-colors hover:text-foreground"
      >
        Learn more
        <span aria-hidden>→</span>
      </Link>
    </aside>
  );
}
