import type { ProductStatus } from "@/data/products";

// Status colors ride the shared tokens (tokens.css) so badges stay legible in
// both schemes; globals.css pins the dark values to the pre-#15 palette.
const STYLES: Record<ProductStatus, { label: string; className: string }> = {
  live: {
    label: "Live",
    className: "bg-success/15 text-success ring-success/30",
  },
  beta: {
    label: "Beta",
    className: "bg-warning/15 text-warning ring-warning/30",
  },
  "coming-soon": {
    label: "Coming soon",
    className: "bg-muted/15 text-muted ring-muted/30",
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
