export interface NavItem {
  href: "/" | "/showcase" | "/work" | "/about" | "/contact";
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/showcase", label: "Showcase" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Keep a section active on its nested routes, while Home matches only `/`. */
export function isNavItemActive(pathname: string, href: NavItem["href"]): boolean {
  if (href === "/") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
