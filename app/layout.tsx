import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { colorSchemeInitScript } from "@staffysoft/core-client";
import {
  ColorSchemeProvider,
  ColorSchemeToggle,
  CoreSessionProvider,
} from "@staffysoft/core-client/react";
import HeaderAccount from "@/components/HeaderAccount";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StaffySoft — software that pulls its weight",
    template: "%s · StaffySoft",
  },
  description:
    "StaffySoft is a multi-product software house. Browse every product we've shipped, sign up for any of them, or add one to your existing StaffySoft account.",
  metadataBase: new URL("https://staffysoft-portfolio.vercel.app"),
  openGraph: {
    title: "StaffySoft — software that pulls its weight",
    description:
      "Browse every product StaffySoft has shipped. Sign up fresh, or add one to your existing account.",
    type: "website",
    images: ["/staffysoft-logo.jpg"],
  },
};

function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <Image
            src="/staffysoft-logo.jpg"
            alt="StaffySoft logo"
            width={36}
            height={36}
            className="rounded-lg shadow-lg shadow-brand/20"
            preload
          />
          <span className="text-base font-semibold tracking-tight">
            Staffy<span className="text-brand-bright">Soft</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Inline nav collapses into the MobileNav drawer below `sm`. */}
          <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
            <Link href="/" className="transition-colors hover:text-foreground">
              Products
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground"
            >
              About
            </Link>
            {/* Shared 3-state scheme cycle (System → Light → Dark). */}
            <ColorSchemeToggle className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-surface-2 hover:text-foreground" />
          </nav>
          {/* AccountMenu when signed in, "Sign in" CTA when guest (#15). */}
          <HeaderAccount />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Staffordshire Software.</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Staffordshire-Software"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the head script below sets the color-scheme
    // class/attribute on <html> before first paint, so the server-rendered
    // attributes intentionally differ from the DOM React hydrates into.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* No-FOUC bootstrap: applies the stored scheme preference before the
            app bundle loads. Must stay ahead of any content paint. */}
        <script dangerouslySetInnerHTML={{ __html: colorSchemeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ColorSchemeProvider>
          {/* The SDK defaults lack the trailing slash this site's
              `trailingSlash: true` config redirects to (an extra 308 per
              call), so the endpoints are configured with it. */}
          <CoreSessionProvider
            sessionEndpoint="/api/core/session/"
            signOutEndpoint="/api/auth/signout/"
          >
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CoreSessionProvider>
        </ColorSchemeProvider>
      </body>
    </html>
  );
}
