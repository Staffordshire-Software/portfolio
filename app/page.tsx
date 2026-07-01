import Hero from "@/components/Hero";
import HeroProductCard from "@/components/HeroProductCard";
import ProductCard from "@/components/ProductCard";
import PlatformCard from "@/components/PlatformCard";
import RoadmapCard from "@/components/RoadmapCard";
import {
  featuredProduct,
  platform,
  roadmapProducts,
  shippedProducts,
} from "@/data/products";

export default function Home() {
  const featured = featuredProduct();
  const shipped = shippedProducts();
  const flagship = shipped.find((p) => p.variant === "hero");
  const standard = shipped.filter((p) => p.variant === "standard");
  const roadmap = roadmapProducts();

  return (
    <>
      <Hero featured={featured} />

      {/* Shipped: flagship full-width, then the standard cards ranked below. */}
      <section id="products" className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">
            What we&apos;ve shipped
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Add any product to your StaffySoft account in one click, or try it
            first.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {flagship && <HeroProductCard product={flagship} />}
          <div className="grid gap-5 sm:grid-cols-2">
            {standard.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform: the layer under the apps, not another app. */}
      <section id="platform" className="mx-auto max-w-5xl px-6 pb-16 lg:pb-20">
        <h2 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted">
          The platform underneath
          <span className="h-px flex-1 bg-border" aria-hidden />
        </h2>
        <PlatformCard platform={platform} />
      </section>

      {/* Roadmap: coming soon, no CTAs. */}
      {roadmap.length > 0 && (
        <section id="roadmap" className="mx-auto max-w-5xl px-6 pb-16 lg:pb-20">
          <h2 className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted">
            On the roadmap
            <span className="h-px flex-1 bg-border" aria-hidden />
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {roadmap.map((product) => (
              <RoadmapCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
