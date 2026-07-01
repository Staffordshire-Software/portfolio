import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { CONTACT_EMAIL } from "@/data/products";
import StatusBadge from "./StatusBadge";

/**
 * Standard-size card for the shipped grid. CTAs adapt to the product:
 * account products get "Add to my account" + "Try it"; showcase entries
 * without an `addToAccountUrl` (client work like Dan's Music Studio) get an
 * external "Visit <domain>" link plus a contact CTA; coming-soon products
 * get a disabled ghost button.
 */
export default function ProductCard({ product }: { product: Product }) {
  const comingSoon = product.status === "coming-soon";
  const showcaseHost = product.addToAccountUrl
    ? null
    : new URL(product.productUrl).hostname.replace(/^www\./, "");

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-brand/50">
      {/* Screenshot (live) or branded placeholder (coming soon). */}
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface-2"
      >
        {product.hero ? (
          <Image
            src={product.hero}
            alt={`${product.name} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="glow flex h-full items-center justify-center bg-gradient-to-br from-surface to-surface-2">
            <Image
              src="/staffysoft-logo.jpg"
              alt=""
              width={56}
              height={56}
              className="rounded-xl opacity-60"
            />
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/products/${product.id}`}
            className="text-lg font-semibold tracking-tight transition-colors group-hover:text-brand-bright"
          >
            {product.name}
          </Link>
          <StatusBadge status={product.status} />
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {product.tagline}
        </p>

        {product.pricingNote && (
          <p className="mt-3 text-xs font-medium text-muted/80">
            {product.pricingNote}
          </p>
        )}

        <div className="mt-5 flex flex-1 flex-wrap items-end gap-2.5">
          {comingSoon ? (
            <span className="flex-1 cursor-not-allowed rounded-lg bg-surface-2 px-3 py-2 text-center text-sm font-medium text-muted/60">
              Coming soon
            </span>
          ) : product.addToAccountUrl ? (
            <>
              <a
                href={product.addToAccountUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-brand px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-brand-bright"
              >
                Add to my account
              </a>
              <a
                href={product.signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:bg-surface-2"
              >
                Try it
              </a>
            </>
          ) : (
            <>
              <a
                href={product.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-lg bg-brand px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-brand-bright"
              >
                Visit {showcaseHost}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  `A site like ${product.name}`,
                )}`}
                className="flex-1 rounded-lg border border-border px-3 py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-brand/50 hover:bg-surface-2"
              >
                Get one for your business
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
