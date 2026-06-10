import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import StatusBadge from "./StatusBadge";

/**
 * Top-of-page hero. Shows the StaffySoft pitch plus a spotlight on one
 * featured product (passed in from the page).
 */
export default function Hero({ featured }: { featured: Product }) {
  return (
    <section className="glow border-b border-border/60">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <Image
            src="/staffysoft-logo.jpg"
            alt="StaffySoft logo"
            width={140}
            height={140}
            className="mb-6 rounded-2xl shadow-xl shadow-brand/20"
            priority
          />
          <p className="text-sm font-medium uppercase tracking-widest text-brand-bright">
            Staffordshire Software
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Software that pulls its weight.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            StaffySoft builds focused tools that each do one thing
            exceptionally well — and share a single account when you want them
            to. Browse what we&apos;ve shipped below.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bright"
            >
              Browse products
            </a>
            <Link
              href="/about"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2"
            >
              About StaffySoft
            </Link>
          </div>
        </div>

        <Link
          href={`/products/${featured.id}`}
          className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-brand/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-widest text-muted">
              Featured
            </span>
            <StatusBadge status={featured.status} />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight group-hover:text-brand-bright">
            {featured.name}
          </h2>
          <p className="mt-2 text-muted">{featured.tagline}</p>
          <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-bright">
            Explore
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </p>
        </Link>
      </div>
    </section>
  );
}
