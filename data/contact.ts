import { portfolioData } from "@/data/portfolio";

const { contact } = portfolioData;

export const CONTACT_EMAIL = contact.email;
export const CONTACT_CV_URL = contact.cvUrl;

const phoneValue =
  contact.phoneMode === "available-on-cv" || !contact.phone ? "Available on CV" : contact.phone;
const phoneHref = contact.phone && contact.phoneMode !== "available-on-cv" ? `tel:${contact.phone}` : undefined;

export const CONTACT_LINKS = [
  {
    key: "EMAIL",
    icon: "mail" as const,
    value: contact.email ?? "Add email",
    href: contact.email ? `mailto:${contact.email}` : undefined,
  },
  { key: "PHONE", icon: "phone" as const, value: phoneValue, href: phoneHref },
  {
    key: "LINKEDIN",
    icon: "link" as const,
    value: contact.linkedin ?? "Add LinkedIn URL",
    href: contact.linkedin ?? undefined,
  },
  {
    key: "GITHUB",
    icon: "code" as const,
    value: contact.github ?? "Add GitHub URL",
    href: contact.github ?? undefined,
  },
  {
    key: "CV",
    icon: "download" as const,
    value: contact.cvUrl ? "Download CV" : "Add CV link",
    href: contact.cvUrl ?? undefined,
  },
];
