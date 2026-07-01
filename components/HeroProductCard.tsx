import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import StatusBadge from "./StatusBadge";

/**
 * Large spotlight card for the flagship (`variant: "hero"`) product. Rendered
 * full-width at the top of the shipped grid so it reads as the headliner,
 * with the standard cards ranked below it. Stacks image-below-copy on small
 * screens.
 */
export default function HeroProductCard({ product }: { product: Product }) {
  return (
    <article className="group grid overflow-hidden rounded-3xl border border-brand/40 bg-surface transition-colors hover:border-brand/70 md:grid-cols-2">
      <div className="flex flex-col justify-center p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={product.status} />
          {product.pricingNote && (
            <span className="text-xs font-medium text-muted/80">
              {product.pricingNote}
            </span>
          )}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="mt-5 text-2xl font-bold tracking-tight transition-colors group-hover:text-brand-bright sm:text-3xl"
        >
          {product.name}
        </Link>

        <p className="mt-3 text-lg leading-relaxed text-muted">
          {product.tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {product.addToAccountUrl && (
            <a
              href={product.addToAccountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bright"
            >
              Add to my account
            </a>
          )}
          <a
            href={product.signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand/50 hover:bg-surface-2"
          >
            Try the demo
          </a>
        </div>
      </div>

      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[16/10] w-full overflow-hidden border-t border-border bg-surface-2 md:aspect-auto md:min-h-full md:border-l md:border-t-0"
      >
        {product.hero ? (
          <Image
            src={product.hero}
            alt={`${product.name} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="glow flex h-full items-center justify-center bg-gradient-to-br from-surface to-surface-2">
            <Image
              src="/staffysoft-logo.jpg"
              alt=""
              width={72}
              height={72}
              className="rounded-xl opacity-60"
            />
          </span>
        )}
      </Link>
    </article>
  );
}
