import Image from "next/image";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";
import { portfolio } from "@/data/portfolio";

const { profile, education } = portfolio;
const [primaryEducation] = education;

const PROFILE = [
  { k: "LOCATION", v: profile.location },
  { k: "EXPERIENCE", v: `${profile.experienceLabel} Experience` },
  { k: "EDUCATION", v: primaryEducation.degree },
  { k: "UNIVERSITY", v: `${primaryEducation.university} — ${primaryEducation.faculty}` },
];

export default function ProfileSection() {
  return (
    <PageContainer className="pb-24 pt-[132px]">
      <Reveal as="section">
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
          <span>PAGE 04 — ABOUT</span>
          <span>PROFILE</span>
        </div>

        <h1 className="m-0 mt-12 break-words font-display text-[clamp(32px,7.2vw,104px)] uppercase leading-[0.92] tracking-[-0.01em] text-foreground">
          Chaipawat
          <br />
          Jatuphattaranun <span className="font-serif italic font-normal normal-case text-accent">Ryu</span>
        </h1>

        <div className="mt-[60px] grid grid-cols-1 items-start gap-[clamp(32px,6vw,80px)] lg:grid-cols-[1fr_0.62fr]">
          <div>
            <p className="m-0 max-w-[520px] text-lg leading-[1.6] text-foreground-secondary">
              {profile.summary}
            </p>
            <div className="mt-11">
              {PROFILE.map((p) => (
                <div
                  key={p.k}
                  className="grid grid-cols-[130px_1fr] items-baseline gap-5 border-t border-border py-[18px] last:border-b"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-foreground-secondary">{p.k}</span>
                  <span className="text-[15px] leading-[1.5] text-foreground">{p.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border p-3.5">
            <div className="flex items-center justify-between pb-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">
                FIG. 02 — IDENTITY
              </span>
            </div>
            <div className="ink-duotone relative aspect-[4/5] overflow-hidden border border-border-strong bg-surface">
              <Image
                src={profile.portraits.secondary.src}
                alt={profile.portraits.secondary.alt}
                fill
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
