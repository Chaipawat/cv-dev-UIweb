import { Fragment } from "react";
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
  className?: string;
}

/**
 * Contact channels as hairline rows: mono key, the value set large, and an
 * arrow that slides on hover. Channels without a link render as plain rows.
 */
export default function ContactList({ keys, reveal, className }: ContactListProps) {
  const links = keys ? CONTACT_LINKS.filter((c) => keys.includes(c.key)) : CONTACT_LINKS;
  return (
    <ul className={cn("m-0 list-none border-t border-border p-0", className)}>
      {links.map((c) => {
        const row = (
          <>
            <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">{c.key}</span>
            <span
              className={cn(
                "col-span-2 row-start-2 min-w-0 font-body text-[clamp(20px,2.3vw,30px)] font-medium leading-[1.2] tracking-[-0.03em] sm:col-span-1 sm:row-start-auto",
                c.href ? "text-foreground transition-colors duration-[180ms] group-hover:text-accent-text" : "text-foreground-secondary"
              )}
            >
              {breakable(c.value)}
            </span>
            {c.href ? (
              <span
                aria-hidden="true"
                className="col-start-2 row-start-1 text-lg text-foreground-muted transition-[color,transform] duration-[320ms] group-hover:translate-x-1 group-hover:text-accent-text sm:col-start-auto sm:row-start-auto"
              >
                →
              </span>
            ) : null}
          </>
        );
        const rowClass =
          "grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1.5 py-[clamp(16px,2vw,24px)] sm:grid-cols-[104px_1fr_auto]";
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
