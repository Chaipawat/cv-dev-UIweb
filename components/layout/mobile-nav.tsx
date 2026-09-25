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
          className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-border-strong text-foreground md:hidden"
        >
          <Menu size={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-foreground/20 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[120] flex w-[86%] max-w-sm flex-col gap-10 border-l border-border-strong bg-background px-8 py-8 outline-none">
          <Dialog.Description className="sr-only">Site navigation menu</Dialog.Description>
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-mono text-[12px] tracking-[0.06em] text-foreground-secondary">
              <span aria-hidden="true">
                <span className="text-terminal">~/{profile.nickname.toLowerCase()}</span> $ cd
              </span>
              <span className="sr-only">
                {profile.fullName.split(" ")[0]} ({profile.nickname}) — menu
              </span>
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-border-strong text-foreground"
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col" aria-label="Primary">
            {NAV_ITEMS.map((item, i) => {
              const active = pathname === item.href;
              return (
                <Dialog.Close asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-4 border-b border-border py-3"
                  >
                    <span aria-hidden="true" className="w-6 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[44px] uppercase leading-none tracking-[-0.005em] transition-colors duration-[180ms]",
                        active ? "text-accent" : "text-foreground group-hover:text-accent"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </Dialog.Close>
              );
            })}
          </nav>

          {profile.availability.openToWork ? (
            <p className="m-0 mt-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-terminal">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terminal" />
              {profile.availability.text.toLowerCase()}
            </p>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
