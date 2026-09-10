"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS } from "@/data/nav";
import { cn } from "@/lib/utils";

export default function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
        >
          <Menu size={18} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-foreground/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[120] flex w-[86%] max-w-sm flex-col gap-10 bg-background px-8 py-8 shadow-card outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-mono text-[15px] font-medium tracking-[0.02em]">
              <span>C</span>
              <span className="text-accent">[</span>
              <span>J</span>
              <span className="text-accent">]</span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Dialog.Close asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-display text-3xl tracking-[-0.03em] transition-colors",
                      active ? "text-accent" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </Dialog.Close>
              );
            })}
          </nav>

          <Dialog.Close asChild>
            <Link
              href="/contact"
              className="mt-auto flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-4 text-sm font-medium text-cream"
            >
              <span>Let&apos;s Talk</span>
              <span>→</span>
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
