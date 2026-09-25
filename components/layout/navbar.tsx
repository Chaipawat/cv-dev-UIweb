"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import MobileNav from "@/components/layout/mobile-nav";
import { NAV_ITEMS } from "@/data/nav";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const { profile } = portfolio;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/88 backdrop-blur-[10px]">
      <PageContainer className="flex h-[66px] items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-[9px]">
          <span className="font-body text-[13px] font-medium tracking-[-0.005em] text-foreground">
            {profile.fullName}
          </span>
          {/* Ink, not vermilion: the nav sits in every viewport, so it only
              spends one accent moment (the active dot). */}
          <span className="font-serif text-[16px] italic text-foreground-secondary">({profile.nickname})</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center px-[13px] py-2 font-body text-[13.5px] font-medium transition-colors duration-[180ms]",
                  active ? "text-foreground" : "text-foreground-secondary hover:text-foreground"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mr-2 inline-block h-1 w-1 rounded-full transition-colors duration-[180ms]",
                    active ? "bg-accent" : "bg-transparent"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3.5">
          {profile.availability.openToWork ? (
            <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-terminal lg:inline-flex">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terminal" />
              available
            </span>
          ) : null}
          <span className="hidden font-mono text-[11px] tracking-[0.14em] text-foreground-secondary lg:inline">TH</span>
          <MobileNav pathname={pathname} />
        </div>
      </PageContainer>
    </header>
  );
}
