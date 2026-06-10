import type { ProductStatus } from "@/data/products";

const STYLES: Record<ProductStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className: "bg-green-500/15 text-green-300 ring-green-500/30",
  },
  beta: {
    label: "Beta",
    className: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
  },
  "coming-soon": {
    label: "Coming soon",
    className: "bg-zinc-500/15 text-zinc-300 ring-zinc-500/30",
  },
};

export default function StatusBadge({ status }: { status: ProductStatus }) {
  const { label, className } = STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}
