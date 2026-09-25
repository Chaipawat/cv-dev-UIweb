import Link from "next/link";
import { ArrowLeftRight, Smartphone, Cable, Wrench } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";
import SectionLabel from "@/components/shared/section-label";
import { portfolio } from "@/data/portfolio";
import { formatStack } from "@/data/projects";
import type { SkillGroupKey } from "@/types/portfolio";

// 3-item previews of each capability group; full lists live in portfolio.skills.
const TECHNICAL_GROUPS: { key: SkillGroupKey; icon: typeof ArrowLeftRight }[] = [
  { key: "frontend", icon: ArrowLeftRight },
  { key: "mobile", icon: Smartphone },
  { key: "integration", icon: Cable },
  { key: "workflow", icon: Wrench },
];

const TECHNICAL = TECHNICAL_GROUPS.map(({ key, icon }) => ({
  icon,
  label: portfolio.skills[key].label,
  meta: formatStack(portfolio.skills[key].items, 3),
}));

const SOFT_SKILLS = portfolio.softSkills.map((s, i) => ({
  n: String(i + 1).padStart(2, "0"),
  label: s.name,
  meta: s.shortDescription,
}));

export default function WhatIBring() {
  return (
    <PageContainer className="pb-[120px]">
      <SectionLabel
        index="02"
        label="WHAT I BRING"
        trailing={
          <Link href="/showcase" className="transition-colors duration-[180ms] hover:text-accent">
            EXPLORE SHOWCASE →
          </Link>
        }
      />

      <div className="mt-11 grid grid-cols-1 gap-[clamp(30px,5vw,72px)] lg:grid-cols-2">
        <Reveal>
          <h2 className="m-0 font-display text-[clamp(28px,3.2vw,40px)] font-medium tracking-[-0.035em] text-foreground">
            Technical
          </h2>
          <div className="mt-6">
            {TECHNICAL.map(({ icon: Icon, label, meta }) => (
              <div
                key={label}
                className="grid grid-cols-[26px_120px_1fr] items-center gap-[18px] border-t border-border py-[19px] transition-colors duration-[180ms] last:border-b hover:bg-surface"
              >
                <Icon size={17} strokeWidth={1.6} className="text-foreground-secondary" aria-hidden="true" />
                <span className="font-display text-base font-medium text-foreground">{label}</span>
                <span className="font-mono text-[12.5px] text-foreground-secondary">{meta}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.07}>
          <h2 className="m-0 font-display text-[clamp(28px,3.2vw,40px)] font-medium tracking-[-0.035em] text-foreground">
            Soft <span className="font-serif italic text-foreground-secondary">skills</span>
          </h2>
          <div className="mt-6">
            {SOFT_SKILLS.map((s) => (
              <div
                key={s.n}
                className="grid grid-cols-[26px_1fr] items-baseline gap-[18px] border-t border-border py-[19px] transition-colors duration-[180ms] last:border-b hover:bg-surface"
              >
                <span className="font-mono text-[11px] text-foreground-muted">{s.n}</span>
                <div>
                  <div className="font-display text-base font-medium text-foreground">{s.label}</div>
                  <div className="mt-1.5 text-[13.5px] text-foreground-muted">{s.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </PageContainer>
  );
}
