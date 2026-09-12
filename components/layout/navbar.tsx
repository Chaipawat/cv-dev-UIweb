"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import MobileNav from "@/components/layout/mobile-nav";
import { NAV_ITEMS } from "@/data/nav";
import { portfolioData } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const { profile } = portfolioData;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/86 backdrop-blur-[10px]">
      <PageContainer className="flex h-[66px] items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-[9px]">
          <span className="font-display text-[13px] font-medium tracking-[-0.005em] text-foreground">
            {profile.fullName}
          </span>
          <span className="font-serif text-[15px] italic text-accent">{profile.nickname}</span>
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
                  "inline-flex items-center px-[13px] py-2 font-display text-[13.5px] font-medium transition-colors duration-[180ms]",
                  active ? "text-foreground" : "text-foreground-muted hover:text-foreground-secondary"
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
          <span className="hidden font-mono text-[11px] tracking-[0.14em] text-foreground-muted lg:inline">
            {profile.location.split(",")[0].toUpperCase()}, TH
          </span>
          <MobileNav pathname={pathname} />
        </div>
      </PageContainer>
    </header>
  );
}
