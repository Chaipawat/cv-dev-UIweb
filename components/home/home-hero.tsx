import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Smartphone } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import EditorialButton from "@/components/shared/editorial-button";
import Reveal from "@/components/shared/reveal";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

export default function HomeHero() {
  return (
    <PageContainer className="pb-24 pt-[132px]">
      <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-muted">
        <span>{profile.positioning.toUpperCase()}</span>
        <span>
          AVAILABLE FOR GOOD WORK — {new Date().getFullYear()}
        </span>
      </div>

      <Reveal>
        <h1 className="m-0 font-display font-extrabold uppercase text-foreground">
          <span className="m-0 mt-11 block text-[clamp(52px,10.4vw,154px)] leading-[0.88] tracking-[-0.05em]">
            SOFTWARE
          </span>
          <span className="mt-1 flex flex-wrap items-baseline gap-[clamp(16px,3vw,48px)]">
            <span className="text-[clamp(52px,10.4vw,154px)] leading-[0.88] tracking-[-0.05em]">Developer</span>
            <span className="text-[clamp(30px,5.2vw,76px)] normal-case leading-none tracking-[-0.02em] text-accent">
             ( Ryu )
            </span>
          </span>
        </h1>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 items-start gap-[clamp(32px,6vw,90px)] lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal delay={0.07}>
          <p className="m-0 max-w-[520px] text-[17px] leading-[1.6] text-foreground-secondary">
            {profile.summary}
          </p>

          <div className="mt-10 flex flex-wrap border-t border-border">
            <div className="flex items-center gap-2.5 border-r border-border py-4 pr-6">
              <MapPin size={15} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
              <span className="font-mono text-xs text-foreground-secondary">{profile.location}</span>
            </div>
            <div className="flex items-center gap-2.5 border-r border-border px-6 py-4">
              <Clock size={15} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
              <span className="font-mono text-xs text-foreground-secondary">{profile.experienceLabel}</span>
            </div>
            <div className="flex items-center gap-2.5 py-4 pl-6">
              <Smartphone size={15} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
              <span className="font-mono text-xs text-foreground-secondary">Web &amp; Mobile</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            <EditorialButton as={Link} href="/work">
              View Work <span aria-hidden="true">→</span>
            </EditorialButton>
            <EditorialButton as={Link} href="/showcase" variant="secondary">
              Explore Showcase
            </EditorialButton>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="border border-border p-3.5">
            <div className="flex items-center justify-between pb-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
                FIG. 01 — PORTRAIT
              </span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-surface">
              <Image
                src={profile.portraits.primary.src}
                alt={profile.portraits.primary.alt}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
              <span className="corner-mark left-0 top-0 h-px w-3.5" />
              <span className="corner-mark left-0 top-0 h-3.5 w-px" />
              <span className="corner-mark bottom-0 right-0 h-px w-3.5" />
              <span className="corner-mark bottom-0 right-0 h-3.5 w-px" />
            </div>
            {profile.availability.openToWork ? (
              <div className="flex items-center justify-between pt-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
                  {profile.availability.text.toUpperCase()}
                </span>
                <span className="block h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden="true" />
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </PageContainer>
  );
}
