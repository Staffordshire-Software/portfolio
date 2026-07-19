"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { ColorSchemeToggle } from "@staffysoft/core-client/react";

/**
 * Below-`sm` replacement for the header's inline nav: a hamburger trigger
 * opening a right-hand drawer with the same links plus the scheme toggle.
 * Radix handles focus trapping, Escape, and overlay dismissal; links close
 * the drawer via Dialog.Close so client-side navigation isn't left behind
 * an open sheet.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // The drawer only exists below `sm`: if the viewport crosses that
  // breakpoint while it's open (rotation, window resize), every bit of its
  // UI goes display:none but Radix's focus trap and scroll lock would stay
  // active — so close it. 640px must match Tailwind's `sm`.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const close = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="rounded-lg border border-border p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground sm:hidden"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M2 4h12M2 8h12M2 12h12" />
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm sm:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-40 flex w-64 max-w-[80vw] flex-col gap-1 border-l border-border bg-background p-4 shadow-xl sm:hidden">
          <Dialog.Description className="sr-only">
            Site navigation links and color scheme setting.
          </Dialog.Description>
          <div className="mb-2 flex items-center justify-between">
            <Dialog.Title className="text-sm font-semibold tracking-tight">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>
            </Dialog.Close>
          </div>
          <nav className="flex flex-col gap-1 text-sm text-muted">
            <Dialog.Close asChild>
              <Link
                href="/"
                className="rounded-lg px-3 py-2 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                Products
              </Link>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Link
                href="/about"
                className="rounded-lg px-3 py-2 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                About
              </Link>
            </Dialog.Close>
          </nav>
          {/* Same shared 3-state scheme cycle as the desktop nav. */}
          <ColorSchemeToggle className="mt-2 rounded-lg border border-border px-3 py-2 text-left text-xs font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
