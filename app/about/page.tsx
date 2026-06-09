import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "StaffySoft is a multi-product software house founded by Dan O'Dea, building focused tools that share a single account.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      <h1 className="text-4xl font-bold tracking-tight">About StaffySoft</h1>

      {/* Placeholder copy — Dan will edit this later. */}
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/90">
        <p>
          StaffySoft (Staffordshire Software) is a multi-product software house
          founded by Dan O&apos;Dea. We build small, focused tools that each do
          one thing exceptionally well.
        </p>
        <p>
          What ties them together is StaffySoft Core: a single account and
          billing layer behind every product. Sign up for one tool and you can
          add any of the others to the same account in a click — no new
          passwords, no duplicate billing.
        </p>
        <p>
          This page is a placeholder. Fuller copy — the story, the principles,
          and what&apos;s coming next — lands here soon.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bright"
        >
          Browse products
        </Link>
        <a
          href="https://github.com/Staffordshire-Software"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2"
        >
          StaffySoft on GitHub
        </a>
      </div>
    </div>
  );
}
