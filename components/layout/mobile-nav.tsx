"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_ITEMS } from "@/data/nav";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const { profile } = portfolio;

export default function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
        >
          <Menu size={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-background/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[120] flex w-[86%] max-w-sm flex-col gap-10 border-l border-border bg-background px-8 py-8 outline-none">
          <Dialog.Description className="sr-only">Site navigation menu</Dialog.Description>
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-[13px] font-medium tracking-[-0.005em]">
              {profile.fullName.split(" ")[0]} <span className="font-serif italic text-accent">{profile.nickname}</span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground"
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Dialog.Close asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
