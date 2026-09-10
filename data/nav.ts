export interface NavItem {
  href: "/" | "/showcase" | "/work" | "/contact";
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/showcase", label: "Showcase" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];
