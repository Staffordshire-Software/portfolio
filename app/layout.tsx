import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  },
};

function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand font-mono text-sm font-bold text-white shadow-lg shadow-brand/30">
            S
          </span>
          <span className="text-base font-semibold tracking-tight">
            Staffy<span className="text-brand-bright">Soft</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-foreground">
            Products
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
