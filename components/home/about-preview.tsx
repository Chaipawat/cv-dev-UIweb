import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import SectionLabel from "@/components/shared/section-label";
import { portfolio } from "@/data/portfolio";

const { profile, education } = portfolio;
const [primaryEducation] = education;

/**
 * Short about teaser: monochrome portrait with a blue duotone wash and an
 * offset hairline frame, beside a few lines of copy and a link to /about.
 */
export default function AboutPreview() {
  const portrait = profile.portraits.secondary;
  return (
    <section aria-labelledby="about-preview-heading">
      <PageContainer className="pb-[clamp(96px,12vw,180px)]">
        <SectionLabel index="05" label="ABOUT" />

        <MotionScope effect="about">
        <div className="mt-[clamp(32px,5vw,64px)] grid grid-cols-1 items-end gap-[clamp(32px,5vw,64px)] md:grid-cols-12 md:gap-8">
          <figure className="relative m-0 w-[72%] max-w-[420px] md:col-span-4 md:w-full">
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-[14px] translate-y-[14px] border border-accent-border"
            />
            <div data-m="about-portrait" data-reveal="unmask" className="relative aspect-[3/4] overflow-hidden bg-surface">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                sizes="(min-width: 768px) 30vw, 72vw"
                className="object-cover grayscale contrast-[1.15] brightness-[0.8]"
                style={{ objectPosition: "50% 20%" }}
              />
              <span aria-hidden="true" className="absolute inset-0 bg-accent mix-blend-multiply opacity-40" />
            </div>
          </figure>

          <div className="md:col-span-7 md:col-start-6">
            <h2
              data-reveal="clip"
              id="about-preview-heading"
              className="m-0 font-display text-[clamp(36px,5.6vw,84px)] font-extrabold uppercase leading-[0.9] tracking-[-0.05em] text-foreground"
            >
              {profile.fullName.split(" ")[0]}
              <span className="ml-[0.25em] font-serif font-normal normal-case italic text-accent">{profile.nickname}</span>
            </h2>
            <p data-reveal="fade" className="m-0 mt-6 max-w-[520px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground-secondary">
              {profile.summary}
            </p>
            <p data-reveal="fade" className="m-0 mt-4 font-mono text-[11px] leading-[1.8] tracking-[0.16em] text-foreground-muted">
              {primaryEducation.degree.toUpperCase()}
              <br />
              {primaryEducation.university.toUpperCase()}
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block border-b border-foreground pb-1 font-mono text-[11px] tracking-[0.2em] text-foreground transition-colors duration-[180ms] hover:border-accent hover:text-accent"
            >
              MORE ABOUT ME →
            </Link>
          </div>
        </div>
        </MotionScope>
      </PageContainer>
    </section>
  );
}
