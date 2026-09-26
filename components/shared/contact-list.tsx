import { Fragment } from "react";
import { ArrowUpRight, BriefcaseBusiness, GitBranch, Mail, Phone, type LucideIcon } from "lucide-react";
import { CONTACT_LINKS } from "@/data/contact";
import { cn } from "@/lib/utils";

/** Allow line breaks only after "/" and "@", so long URLs wrap at path segments, never mid-word. */
function breakable(value: string) {
  return value.split(/(?<=[/@])/).map((part, i) => (
    <Fragment key={i}>
      {i > 0 ? <wbr /> : null}
      {part}
    </Fragment>
  ));
}

interface ContactListProps {
  /** CONTACT_LINKS keys to show, in data order; all when omitted. */
  keys?: string[];
  /** Mark rows for a MotionScope fade-in. Only inside a scope — elsewhere they would stay hidden. */
  reveal?: boolean;
  /** Add a restrained channel glyph; used on the full contact page. */
  showIcons?: boolean;
  /** Reduce the label column and value size for tighter editorial layouts. */
  compact?: boolean;
  className?: string;
}

const CONTACT_ICONS: Record<string, LucideIcon> = {
  EMAIL: Mail,
  PHONE: Phone,
  LINKEDIN: BriefcaseBusiness,
  GITHUB: GitBranch,
};

/** Contact channels as hairline rows with optional route-specific glyphs. */
export default function ContactList({ keys, reveal, showIcons, compact, className }: ContactListProps) {
  const links = keys ? CONTACT_LINKS.filter((c) => keys.includes(c.key)) : CONTACT_LINKS;
  return (
    <ul className={cn("m-0 list-none border-t border-border p-0", className)}>
      {links.map((c) => {
        const Icon = CONTACT_ICONS[c.key];
        const row = (
          <>
            <span className="inline-flex items-center gap-2.5 font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">
              {showIcons && Icon ? (
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-border text-accent-text transition-colors duration-[180ms] group-hover:border-accent">
                  <Icon size={13} strokeWidth={1.6} aria-hidden="true" />
                </span>
              ) : null}
              {c.key}
            </span>
            <span
              className={cn(
                "col-span-2 row-start-2 min-w-0 font-body font-medium leading-[1.2] tracking-[-0.03em] sm:col-span-1 sm:row-start-auto",
                compact ? "text-[clamp(17px,1.7vw,24px)]" : "text-[clamp(20px,2.3vw,30px)]",
                c.href ? "text-foreground transition-colors duration-[180ms] group-hover:text-accent-text" : "text-foreground-secondary",
              )}
            >
              {breakable(c.value)}
            </span>
            {c.href ? (
              <span
                aria-hidden="true"
                className="col-start-2 row-start-1 text-foreground-muted transition-[color,transform] duration-[320ms] group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-accent-text sm:col-start-auto sm:row-start-auto"
              >
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </span>
            ) : null}
          </>
        );
        const rowClass = cn(
          "grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-[clamp(16px,2vw,24px)]",
          compact ? "sm:grid-cols-[94px_1fr_auto]" : "sm:grid-cols-[104px_1fr_auto]",
        );
        return (
          <li key={c.key} data-reveal={reveal ? "fade" : undefined} className="border-b border-border">
            {c.href ? (
              <a
                href={c.href}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className={cn("group", rowClass)}
              >
                {row}
              </a>
            ) : (
              <div className={rowClass}>{row}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
