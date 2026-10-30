"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BtnIcon } from "@/components/site/primitives";
import { isNavItemActive, NAV_ITEMS } from "@/data/nav";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu whenever the route changes.
  if (open && openedAt !== pathname) {
    setOpen(false);
    setOpenedAt(pathname);
  }

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const className = ["nav", open ? "is-open" : "", hidden && !open ? "is-hidden" : ""].filter(Boolean).join(" ");

  return (
    <header className={className} aria-label="Primary">
      <Link className="brand" href="/">
        <span className="brand__seal" aria-hidden="true">
          龍
        </span>
        <span>{profile.fullName.split(" ")[0]}</span>
        <span className="serif-it">({profile.nickname})</span>
      </Link>
      <ul className="nav__links">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className={item.href === "/contact" ? "nav__mobile-only" : undefined}>
            <Link href={item.href} aria-current={isNavItemActive(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="nav__right">
        <Link className="btn btn--primary" href="/contact">
          Contact <BtnIcon />
        </Link>
        <button
          className="nav__toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => {
            setOpen((o) => !o);
            setOpenedAt(pathname);
          }}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
