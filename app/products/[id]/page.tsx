import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct } from "@/data/products";
import StatusBadge from "@/components/StatusBadge";

type PageParams = { params: Promise<{ id: string }> };

// Pre-render one static page per product at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};

  return {
    title: product.name,
    description: product.tagline,
    openGraph: {
      title: `${product.name} · StaffySoft`,
      description: product.tagline,
      type: "website",
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
});

export default async function ProductPage({ params }: PageParams) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) notFound();

  const comingSoon = product.status === "coming-soon";
  const launched = new Date(product.launchedAt);

  return (
    <article>
      {/* Hero band */}
      <div className="glow border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← All products
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight">
              {product.name}
            </h1>
            <StatusBadge status={product.status} />
          </div>
          <p className="mt-3 text-xl text-muted">{product.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {comingSoon ? (
              <span className="cursor-not-allowed rounded-lg bg-surface-2 px-5 py-2.5 text-sm font-semibold text-muted/60">
                Coming soon
              </span>
            ) : (
              <a
                href={product.signupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-bright"
              >
                Try it / Sign up
              </a>
            )}
            <a
              href={product.addToAccountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2"
            >
              Add to my StaffySoft account
            </a>
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:text-foreground"
            >
              Visit site ↗
            </a>
          </div>
        </div>
      </div>

      {/* Screenshot — full width near the top, large enough to demo the UI. */}
      <div className="mx-auto max-w-5xl px-6 pt-10">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
          {product.hero ? (
            <Image
              src={product.hero}
              alt={`${product.name} screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          ) : (
            <span className="glow flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-surface-2">
              <Image
                src="/staffysoft-logo.jpg"
                alt=""
                width={80}
                height={80}
                className="rounded-xl opacity-60"
              />
              <span className="font-mono text-sm text-muted/70">
                {product.name} — coming soon
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-3xl gap-10 px-6 py-14 md:grid-cols-[1fr_auto] md:gap-14">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            About {product.name}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/90">
            {product.description}
          </p>
        </div>

        <aside className="md:w-48">
          <dl className="space-y-5 text-sm">
            <div>
              <dt className="text-muted">Category</dt>
              <dd className="mt-1 font-medium">{product.category}</dd>
            </div>
            <div>
              <dt className="text-muted">Status</dt>
              <dd className="mt-1">
                <StatusBadge status={product.status} />
              </dd>
            </div>
            <div>
              <dt className="text-muted">
                {comingSoon ? "Expected" : "Launched"}
              </dt>
              <dd className="mt-1 font-medium">{dateFmt.format(launched)}</dd>
            </div>
            {product.pricingNote && (
              <div>
                <dt className="text-muted">Pricing</dt>
                <dd className="mt-1 font-medium">{product.pricingNote}</dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </article>
  );
}
