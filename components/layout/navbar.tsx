"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "@/components/layout/page-container";
import MobileNav from "@/components/layout/mobile-nav";
import { NAV_ITEMS } from "@/data/nav";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-[100] border-b border-transparent py-[22px] backdrop-blur-[14px] transition-[background,border-color,padding] duration-300",
        scrolled && "border-border bg-background/85 py-3"
      )}
    >
      <PageContainer className="flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-px font-mono text-[15px] font-medium tracking-[0.02em]"
        >
          <span>C</span>
          <span className="text-accent">[</span>
          <span>J</span>
          <span className="text-accent">]</span>
        </Link>

        <div className="hidden items-center gap-1.5 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative px-3.5 py-2 text-[15px] transition-colors duration-300",
                  active ? "font-medium text-foreground" : "font-normal text-foreground-muted"
                )}
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    "absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    active && "scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-foreground px-5 py-[11px] text-sm font-medium text-cream transition-[background,gap] duration-[250ms] hover:gap-3 hover:bg-accent md:flex"
          >
            <span>Let&apos;s Talk</span>
            <span className="text-[13px]">→</span>
          </Link>
          <MobileNav pathname={pathname} />
        </div>
      </PageContainer>
    </nav>
  );
}
