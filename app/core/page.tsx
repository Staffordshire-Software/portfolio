import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Core",
  description:
    "The architecture and motivation behind StaffySoft Core — the shared auth, billing, feedback, and observability spine every StaffySoft product is built on.",
};

// This page is a design memo, not a marketing landing. Keep the tone
// technical and honest; keep the design to the site's existing primitives.

const sections = [
  { id: "why-core-exists", label: "Why Core exists" },
  { id: "what-core-provides", label: "What Core provides" },
  { id: "how-apps-consume-core", label: "How apps consume Core" },
  { id: "definition-of-done", label: "Platform Definition of Done" },
];

/** H2 with a stable id so every section is deep-linkable. */
function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="group scroll-mt-24 text-2xl font-bold tracking-tight"
    >
      <a href={`#${id}`} className="hover:text-brand-bright">
        {children}
        <span
          aria-hidden
          className="ml-2 text-brand-bright opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </span>
      </a>
    </h2>
  );
}

const provides: { name: string; detail: string }[] = [
  {
    name: "Single sign-on",
    detail:
      "One session across every product on .staffysoft.com. Sign in once; every app resolves the same identity.",
  },
  {
    name: "Per-product API keys",
    detail:
      "Each product authenticates to Core with its own key, and product tokens are validated per product — a session minted for one app is rejected by another.",
  },
  {
    name: "Central entitlements registry",
    detail:
      "One place that knows who owns what, at what tier. Products ask Core instead of keeping their own copy of the answer.",
  },
  {
    name: "Hosted Stripe checkout and billing portal",
    detail:
      "Core owns every line of Stripe code. Products link out to Core-hosted checkout and the billing portal and never touch Stripe secrets.",
  },
  {
    name: "Unified feedback triage",
    detail:
      "Feedback from every product lands in one inbox with a shared lifecycle: new → reviewing → resolved / dismissed.",
  },
  {
    name: "Shared observability",
    detail:
      "Sentry wiring ships in the core-client SDK, so every app gets uniform error capture and per-app tagging from one import.",
  },
  {
    name: "Cross-app promotion primitives",
    detail:
      "Building blocks for recommending the right product to the right user, informed by what they already own.",
  },
];

const definitionOfDone = [
  "Uses the current published @staffysoft/core-client",
  "Supports SSO bridge on first request",
  "Calls Core logout, not just local cookie deletion",
  "Has /api/core/session, /api/core/entitlements, /api/core/profile as needed",
  "Feedback widget wired through Core",
  "Sentry browser/server/edge coverage with release tagging",
  "Stripe checkout/portal proxies if monetized",
  "Cross-app smoke test coverage (sign in once → open two apps → both authenticated → sign out from one → both dead)",
  "Product entry in Core seed/admin and portfolio data",
  "Clear free/paid boundary and one activation event",
];

const sentrySnippet = `// instrumentation-client.ts — browser Sentry, wired to the shared org
import { initSentry } from "@staffysoft/core-client/observability";

initSentry({ app: "performer-prompter" });`;

export default function CorePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-brand-bright">
        Architecture note
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">
        StaffySoft Core
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        The shared spine behind every StaffySoft product: auth, billing,
        feedback, and observability as one platform instead of five copies.
        This page explains why it exists, what it provides, and what
        &ldquo;done&rdquo; means for a product built on it.
      </p>

      {/* Compact table of contents. */}
      <nav
        aria-label="On this page"
        className="mt-8 rounded-2xl border border-border bg-surface px-5 py-4"
      >
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          On this page
        </p>
        <ol className="mt-2 flex flex-col gap-1.5 text-sm sm:flex-row sm:flex-wrap sm:gap-x-5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-muted transition-colors hover:text-brand-bright"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="mt-12 space-y-5 leading-relaxed text-foreground/90">
        <SectionHeading id="why-core-exists">Why Core exists</SectionHeading>
        <p>
          StaffySoft ships many small products rather than one big one. That
          model only works if the cost of launching a product stays low — and
          without shared infrastructure, it doesn&apos;t. Every new app would
          reinvent sign-up and sessions, bolt on its own Stripe integration,
          grow its own feedback channel, and wire up its own error reporting.
          Each copy would be slightly different, each would drift, and each
          would be a place for the same bugs to reappear.
        </p>
        <p>
          Core is that shared spine, extracted once and owned centrally.
          Accounts, entitlements, payments, feedback, and observability live in
          one service with one data model, and products consume them through a
          small SDK.
        </p>
        <p>
          The goal is leverage: launching a new product should be{" "}
          <strong className="font-semibold text-foreground">boring</strong>.
          Not effortless — the product itself is still the hard part — but the
          platform work should be a checklist, not a project. When the
          undifferentiated plumbing is a solved problem, a new idea can go from
          repo to revenue without re-earning any of it.
        </p>
      </section>

      <section className="mt-12 space-y-5 leading-relaxed text-foreground/90">
        <SectionHeading id="what-core-provides">
          What Core provides
        </SectionHeading>
        <ul className="space-y-4">
          {provides.map((item) => (
            <li key={item.name} className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <p>
                <strong className="font-semibold text-foreground">
                  {item.name}.
                </strong>{" "}
                <span className="text-foreground/80">{item.detail}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-5 leading-relaxed text-foreground/90">
        <SectionHeading id="how-apps-consume-core">
          How apps consume Core
        </SectionHeading>
        <p>
          Products don&apos;t call Core&apos;s HTTP API by hand. They import{" "}
          <a
            href="https://www.npmjs.com/package/@staffysoft/core-client"
            className="font-mono text-sm text-brand-bright hover:underline"
          >
            @staffysoft/core-client
          </a>
          , the TypeScript SDK that wraps sessions, entitlements, profiles,
          feedback, billing links, and Sentry setup behind typed functions. The
          server-safe root export carries no React; feedback, React hooks, and
          observability live on their own subpaths so each app pulls in only
          what it uses.
        </p>
        <p>
          The flavor of the SDK, in one snippet — browser error reporting for a
          whole product is a single call:
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed">
          <code className="font-mono">{sentrySnippet}</code>
        </pre>
        <p>
          Everything else follows the same shape: one import, sensible
          defaults, and the platform-level concerns (per-app tagging, release
          naming, token validation) handled inside the SDK rather than in each
          product. The SDK is public on npm; Core itself — the service and its
          integration docs — lives in a private repo.
        </p>
      </section>

      <section className="mt-12 space-y-5 leading-relaxed text-foreground/90">
        <SectionHeading id="definition-of-done">
          Platform Definition of Done
        </SectionHeading>
        <p>
          A product isn&apos;t &ldquo;on the platform&rdquo; because it links
          to Core somewhere. It&apos;s done when all of the following hold:
        </p>
        <ul className="space-y-2.5">
          {definitionOfDone.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span className="text-foreground/80">{item}</span>
            </li>
          ))}
        </ul>
        <p>
          This list is the bar every StaffySoft product is held to before it
          counts as launched — and the point of Core is that clearing it is
          routine.
        </p>
      </section>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-contrast transition-colors hover:bg-brand-bright"
        >
          Browse products
        </Link>
        <a
          href="https://www.npmjs.com/package/@staffysoft/core-client"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2"
        >
          core-client on npm
        </a>
      </div>
    </div>
  );
}
