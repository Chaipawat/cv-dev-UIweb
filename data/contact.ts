import { portfolio } from "@/data/portfolio";

const { contact } = portfolio;

const formattedPhone = contact.phone ? contact.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") : null;
const phoneValue =
  contact.phoneMode === "available-on-cv" || !contact.phone ? "Available on CV" : formattedPhone!;
const phoneHref = contact.phone && contact.phoneMode !== "available-on-cv" ? `tel:${contact.phone}` : undefined;

// Strip the protocol/www for display; the full URL is still used as the href.
function shortenUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const linkedinValue = contact.linkedin
  ? shortenUrl(contact.linkedin).replace(/-\d+$/, "")
  : "Add LinkedIn URL";
const githubValue = contact.github ? shortenUrl(contact.github) : "Add GitHub URL";

export const CONTACT_LINKS = [
  {
    key: "EMAIL",
    value: contact.email ?? "Add email",
    href: contact.email ? `mailto:${contact.email}` : undefined,
  },
  { key: "PHONE", value: phoneValue, href: phoneHref },
  {
    key: "LINKEDIN",
    value: linkedinValue,
    href: contact.linkedin ?? undefined,
  },
  {
    key: "GITHUB",
    value: githubValue,
    href: contact.github ?? undefined,
  },
];
