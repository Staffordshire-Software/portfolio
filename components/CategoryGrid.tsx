import type { Product } from "@/data/products";
import { productsByCategory } from "@/data/products";
import ProductCard from "./ProductCard";

/**
 * Renders the full product list grouped by category. Empty categories are
 * skipped (see `productsByCategory`).
 */
export default function CategoryGrid({ products }: { products: Product[] }) {
  const groups = productsByCategory(products);

  return (
    <div className="flex flex-col gap-14">
      {groups.map(({ category, items }) => (
        <section key={category}>
          <h3 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted">
            {category}
            <span className="h-px flex-1 bg-border" aria-hidden />
            <span className="text-xs font-normal normal-case tracking-normal text-muted/70">
              {items.length} {items.length === 1 ? "product" : "products"}
            </span>
          </h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
