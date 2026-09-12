import { Mail, Phone, Link as LinkIcon, Code2, Download } from "lucide-react";
import { CONTACT_LINKS } from "@/data/contact";
import { cn } from "@/lib/utils";

const ICONS = { mail: Mail, phone: Phone, link: LinkIcon, code: Code2, download: Download };

export default function ContactDirect() {
  return (
    <div>
      <div className="pb-3.5 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">DIRECT</div>
      {CONTACT_LINKS.map((c) => {
        const Icon = ICONS[c.icon];
        const rowClass =
          "grid grid-cols-[24px_96px_1fr_18px] items-center gap-4 border-t border-border py-[18px]";
        const content = (
          <>
            <Icon size={16} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-foreground-muted">{c.key}</span>
            <span className={cn("text-[14.5px]", c.href ? "text-foreground" : "font-mono text-foreground-muted")}>
              {c.value}
            </span>
            {c.href ? (
              <span className="text-sm text-foreground-muted" aria-hidden="true">
                →
              </span>
            ) : (
              <span />
            )}
          </>
        );

        if (!c.href) {
          return (
            <div key={c.key} className={cn(rowClass, "text-foreground-muted")}>
              {content}
            </div>
          );
        }

        return (
          <a
            key={c.key}
            href={c.href}
            {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            className={cn(rowClass, "text-foreground transition-colors duration-[180ms] hover:bg-surface")}
          >
            {content}
          </a>
        );
      })}
      <div className="border-t border-border" />

      <div className="mt-14 border-l-2 border-accent pl-[22px]">
        <div className="font-serif text-[clamp(24px,3vw,34px)] italic leading-[1.25] text-foreground">
          Good ideas start with a conversation.
        </div>
        <div className="mt-3.5 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
          REPLY WITHIN 1–2 DAYS
        </div>
      </div>
    </div>
  );
}
