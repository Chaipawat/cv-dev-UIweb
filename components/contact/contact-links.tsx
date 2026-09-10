import PageContainer from "@/components/layout/page-container";
import { CONTACT_LINKS } from "@/data/contact";

export default function ContactLinks() {
  return (
    <PageContainer className="pt-[70px]">
      <div className="flex flex-col">
        {CONTACT_LINKS.map((c) => (
          <a
            key={c.n}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-wrap items-center justify-between gap-6 border-t border-border px-2 py-[38px] transition-[padding,background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface hover:pl-6"
          >
            <div className="flex flex-wrap items-baseline gap-[22px]">
              <span className="font-mono text-xs text-foreground-faint">{c.n}</span>
              <span className="font-display text-[clamp(30px,4.4vw,58px)] leading-none tracking-[-0.035em]">
                {c.label}
              </span>
            </div>
            <div className="flex items-center gap-[18px]">
              <span className="break-all font-mono text-xs text-foreground-muted">{c.value}</span>
              <span className="text-xl text-accent">↗</span>
            </div>
          </a>
        ))}
        <div className="border-t border-border" />
      </div>
    </PageContainer>
  );
}
