import Link from "next/link";
import type { Product } from "@/data/products";
import StatusBadge from "./StatusBadge";

/**
 * Compact entry for the roadmap section — name, tagline, status badge, and
 * deliberately no CTAs (nothing to try or add yet).
 */
export default function RoadmapCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col rounded-2xl border border-border/70 bg-surface/60 p-5 transition-colors hover:border-brand/40">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/products/${product.id}`}
          className="font-semibold tracking-tight transition-colors hover:text-brand-bright"
        >
          {product.name}
        </Link>
        <StatusBadge status={product.status} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {product.tagline}
      </p>
    </article>
  );
}
