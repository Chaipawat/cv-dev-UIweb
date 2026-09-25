import { Mail, Phone, Link as LinkIcon, Code2, Download } from "lucide-react";
import { CONTACT_LINKS } from "@/data/contact";
import { cn } from "@/lib/utils";

const ICONS = { mail: Mail, phone: Phone, link: LinkIcon, code: Code2, download: Download };

export default function ContactDirect() {
  return (
    <div className="rounded-lg border border-border p-6 md:p-8">
      <div className="pb-5 font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">GET IN TOUCH</div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        {CONTACT_LINKS.map((c) => {
          const Icon = ICONS[c.icon];
          const cellClass = "group flex flex-col gap-4 bg-background p-6";
          const content = (
            <>
              <div className="flex items-center justify-between">
                <Icon size={18} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                {c.href ? (
                  <span
                    className="text-foreground-secondary transition-colors duration-[180ms] group-hover:text-accent-text"
                    aria-hidden="true"
                  >
                    →
                  </span>
                ) : null}
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.18em] text-foreground-secondary">{c.key}</div>
                <div
                  className={cn(
                    "mt-2 min-w-0 break-all text-[15px] leading-snug",
                    c.href ? "text-foreground" : "font-mono text-foreground-secondary"
                  )}
                >
                  {c.value}
                </div>
              </div>
            </>
          );

          if (!c.href) {
            return (
              <div key={c.key} className={cellClass}>
                {content}
              </div>
            );
          }

          return (
            <a
              key={c.key}
              href={c.href}
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              className={cn(cellClass, "transition-colors duration-[180ms] hover:bg-surface")}
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}
