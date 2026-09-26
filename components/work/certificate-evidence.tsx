"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Award, Maximize2, X } from "lucide-react";
import ScrollRevealMedia from "@/components/work/scroll-reveal-media";
import type { TimelineEvidence } from "@/data/timeline";

export default function CertificateEvidence({ evidence }: { evidence: TimelineEvidence }) {
  return (
    <Dialog.Root>
      <figure className="m-0 mt-8 grid grid-cols-1 gap-5 border-y border-border py-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
        <ScrollRevealMedia>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="group relative block w-full overflow-hidden border border-border-strong bg-surface p-1 text-left focus-visible:outline-offset-4"
              aria-label={`Open ${evidence.title}`}
            >
              <span className="project-ink relative block aspect-[1672/941] overflow-hidden bg-background">
                <Image
                  src={evidence.src}
                  alt={evidence.alt}
                  fill
                  sizes="(min-width: 1024px) 620px, (min-width: 768px) 65vw, 88vw"
                  className="object-contain"
                />
              </span>
              <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center border border-border-strong bg-background/90 text-foreground transition-colors duration-[180ms] group-hover:border-accent group-hover:text-accent-text">
                <Maximize2 size={15} strokeWidth={1.6} aria-hidden="true" />
              </span>
            </button>
          </Dialog.Trigger>
        </ScrollRevealMedia>

        <figcaption className="flex flex-col border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-accent-text">
            <Award size={14} strokeWidth={1.6} aria-hidden="true" />
            {evidence.label}
          </span>
          <span className="mt-4 font-body text-[clamp(18px,2vw,24px)] font-medium leading-[1.15] tracking-[-0.025em] text-foreground">
            {evidence.title}
          </span>
          <span className="mt-3 text-[13.5px] leading-[1.55] text-foreground-secondary">{evidence.issuer}</span>
          <span className="mt-1 font-mono text-[10px] tracking-[0.16em] text-foreground-secondary">{evidence.date}</span>
          <span className="mt-5 font-mono text-[10px] tracking-[0.16em] text-foreground-secondary">OPEN DOCUMENT ↗</span>
        </figcaption>
      </figure>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[130] bg-foreground/55 backdrop-blur-[6px]" />
        <Dialog.Content className="fixed inset-3 z-[140] flex flex-col border border-border-strong bg-background p-3 shadow-2xl outline-none sm:inset-6 lg:inset-10">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
            <div className="min-w-0">
              <Dialog.Title className="truncate font-body text-[15px] font-medium text-foreground">
                {evidence.title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 truncate font-mono text-[10px] tracking-[0.14em] text-foreground-secondary">
                {evidence.issuer} — {evidence.date}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close certificate"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border-strong text-foreground transition-colors duration-[180ms] hover:border-accent hover:text-accent-text"
              >
                <X size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <div className="relative mt-3 min-h-0 flex-1 bg-surface">
            <Image
              src={evidence.src}
              alt={evidence.alt}
              fill
              sizes="94vw"
              className="object-contain"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
