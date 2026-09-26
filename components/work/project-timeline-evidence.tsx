import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PanelsTopLeft } from "lucide-react";
import ScrollRevealMedia from "@/components/work/scroll-reveal-media";
import type { TimelineProjectEvidence } from "@/data/timeline";

export default function ProjectTimelineEvidence({ evidence }: { evidence: TimelineProjectEvidence }) {
  return (
    <figure className="m-0 mt-8 grid grid-cols-1 gap-5 border-y border-border py-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
      <ScrollRevealMedia>
        <Link
          href={evidence.href}
          className="group relative block overflow-hidden border border-border-strong bg-surface p-1 focus-visible:outline-offset-4"
          aria-label={`View ${evidence.title} case study`}
        >
          <span className="project-ink relative block aspect-[16/9] overflow-hidden bg-background">
            <Image
              src={evidence.image.src}
              alt={evidence.image.alt}
              fill
              sizes="(min-width: 1024px) 620px, (min-width: 768px) 65vw, 88vw"
              className="object-contain"
            />
          </span>
          <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center border border-border-strong bg-background/90 text-foreground transition-colors duration-[180ms] group-hover:border-accent group-hover:text-accent-text">
            <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </span>
        </Link>
      </ScrollRevealMedia>

      <figcaption className="flex flex-col border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-accent-text">
          <PanelsTopLeft size={14} strokeWidth={1.6} aria-hidden="true" />
          PROJECT EVIDENCE
        </span>
        <span className="mt-4 font-body text-[clamp(18px,2vw,24px)] font-medium leading-[1.15] tracking-[-0.025em] text-foreground">
          {evidence.title}
        </span>
        <span className="mt-3 text-[13.5px] leading-[1.55] text-foreground-secondary">{evidence.caption}</span>
        <Link
          href={evidence.href}
          className="mt-5 inline-flex items-center gap-2 self-start border-b border-border-strong pb-1 font-mono text-[10px] tracking-[0.16em] text-foreground-secondary transition-colors duration-[180ms] hover:border-accent hover:text-accent-text"
        >
          VIEW CASE STUDY <ArrowUpRight size={12} strokeWidth={1.6} aria-hidden="true" />
        </Link>
      </figcaption>
    </figure>
  );
}
