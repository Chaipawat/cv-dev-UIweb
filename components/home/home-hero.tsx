import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import WebGLImage from "@/components/webgl/webgl-image";
import { portfolio } from "@/data/portfolio";
import type { CSSProperties } from "react";

const { profile } = portfolio;

/** Monochrome grade shared by the static portrait and its WebGL layer. */
const PORTRAIT_GRADE = "grayscale brightness-[0.62] contrast-[1.1]";

const TITLE ="font-display font-extrabold uppercase leading-[0.84] tracking-[-0.055em] text-[clamp(38px,13vw,200px)]";

/**
 * Asymmetric type-led hero: two giant lines stepping right, a monochrome
 * portrait crop pulled up under the second line, and the positioning set in
 * a left-weighted column. Rendered statically (no reveal) so the first paint
 * is the finished composition.
 */
export default function HomeHero() {
  const facts = [
    { k: "EXPERIENCE", v: profile.experienceLabel },
    { k: "BASED IN", v: profile.location },
    { k: "STATUS", v: profile.availability.text, live: profile.availability.openToWork },
  ];

  return (
    <MotionScope effect="hero">
    <PageContainer className="pb-[clamp(72px,10vw,140px)] pt-[112px]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b border-border pb-[18px] font-mono text-[11px] tracking-[0.2em] text-foreground-muted">
        <span>{profile.positioning.toUpperCase()}</span>
        <span>
          {profile.location.toUpperCase()} — {new Date().getFullYear()}
        </span>
      </div>

      <h1 className="relative z-10 m-0 mt-[clamp(28px,5vw,64px)] text-foreground">
        <span className="sr-only">
          {profile.title} — {profile.displayName}
        </span>
        <span aria-hidden="true" data-m="hero-line" className="block will-change-transform">
          <span data-intro="clip" className={`block ${TITLE}`} style={{ "--i": 0 } as CSSProperties}>
            Software
          </span>
        </span>
        <span aria-hidden="true" data-m="hero-line" className="block will-change-transform">
          <span data-intro="clip" className={`block pl-[clamp(0px,7vw,88px)] ${TITLE}`} style={{ "--i": 1 } as CSSProperties}>
            Developer
          </span>
        </span>
      </h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
        {/* Portrait: first on phones (tucked under the title), right column from md, pulled up so "Developer" overlaps it. */}
        <figure data-m="hero-portrait" className="relative z-0 order-first m-0 ml-auto mt-[-5vw] w-[62%] sm:w-[44%] md:order-none md:col-span-3 md:col-start-10 md:row-span-2 md:mt-[-15vw] md:w-full xl:mt-[-210px]">
          <div data-intro="wipe" className="relative aspect-[4/5] overflow-hidden border border-border bg-surface">
            <div data-m="hero-media" className="absolute inset-0">
              <Image
                src={profile.portraits.primary.src}
                alt={profile.portraits.primary.alt}
                fill
                priority
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 44vw, 62vw"
                className={`object-cover ${PORTRAIT_GRADE}`}
                style={{ objectPosition: "52% 45%" }}
              />
              <WebGLImage focus={[0.52, 0.45]} className={PORTRAIT_GRADE} />
            </div>
            <span className="absolute inset-0 bg-accent/10 mix-blend-color" aria-hidden="true" />
          </div>
          <figcaption className="mt-2.5 flex justify-between gap-3 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
            <span>FIG. 00 — {profile.nickname.toUpperCase()}</span>
            <span>{profile.location.split(",")[0].toUpperCase()}</span>
          </figcaption>
        </figure>

        <div data-intro="rise" style={{ "--i": 0 } as CSSProperties} className="md:col-span-4 md:row-start-1 md:pt-[clamp(28px,4vw,56px)]">
          <p className="m-0 font-serif text-[clamp(44px,6.4vw,96px)] italic leading-[0.9] text-accent">
            ({profile.nickname})
          </p>
          <p className="m-0 mt-4 font-mono text-[11px] tracking-[0.2em] text-foreground-muted">
            {profile.fullName.toUpperCase()}
          </p>
        </div>

        <div data-intro="rise" style={{ "--i": 1 } as CSSProperties} className="md:col-span-5 md:col-start-5 md:row-start-1 md:pt-[clamp(32px,4.4vw,64px)]">
          <p className="m-0 font-display text-[clamp(20px,2vw,26px)] font-medium leading-[1.2] tracking-[-0.025em] text-foreground">
            Frontend-focused
            <br />
            <span className="text-foreground-secondary">{profile.focusAreas.join(" / ")}</span>
          </p>
          <nav aria-label="Hero" className="mt-8 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[11px] tracking-[0.2em]">
            <Link
              href="#selected-work"
              className="border-b border-foreground pb-1 text-foreground transition-colors duration-[180ms] hover:border-accent hover:text-accent"
            >
              SELECTED WORK ↓
            </Link>
            <Link
              href="/contact"
              className="border-b border-border-strong pb-1 text-foreground-secondary transition-colors duration-[180ms] hover:border-accent hover:text-accent"
            >
              CONTACT →
            </Link>
          </nav>

          <dl className="m-0 mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-4 lg:grid-cols-3 [&>div:last-child]:col-span-2 lg:[&>div:last-child]:col-span-1">
            {facts.map((row) => (
              <div key={row.k}>
                <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-muted">{row.k}</dt>
                <dd className="m-0 mt-1.5 flex items-start gap-2 text-[14px] leading-snug text-foreground">
                  {row.live ? (
                    <span className="mt-[0.45em] block h-1.5 w-1.5 flex-none rounded-full bg-accent-2" aria-hidden="true" />
                  ) : null}
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </PageContainer>
    </MotionScope>
  );
}
