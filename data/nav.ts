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
