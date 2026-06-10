import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import { products, featuredProduct } from "@/data/products";

export default function Home() {
  const featured = featuredProduct();

  return (
    <>
      <Hero featured={featured} />

      <section id="products" className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">
            Everything we&apos;ve shipped
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Sign up for any product directly, or add it to your existing
            StaffySoft account in one click.
          </p>
        </div>

        <CategoryGrid products={products} />
      </section>
    </>
  );
}
