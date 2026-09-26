import Image from "next/image";
import Link from "next/link";
import { Code2 } from "lucide-react";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import PageIcon from "@/components/shared/page-icon";
import WebGLImage from "@/components/webgl/webgl-image";
import { portfolio } from "@/data/portfolio";
import type { CSSProperties } from "react";

const { profile } = portfolio;

/** Anton is condensed, so it runs larger than the old display face to hold the same presence. */
const TITLE = "font-display uppercase leading-[0.86] tracking-[-0.005em] text-[clamp(56px,18.5vw,280px)]";

/**
 * Nesting per title line — each layer is owned by exactly one system:
 *   [data-m="hero-line"]    GSAP scrub (lines split + squash on scroll)
 *   [data-intro="clip"]     CSS intro (its fill-mode would override inline transforms)
 *   [data-m="hero-stretch"] GSAP velocity stretch
 */
function TitleLine({ i, className, children, after }: { i: number; className?: string; children: string; after?: React.ReactNode }) {
  return (
    <span aria-hidden="true" data-m="hero-line" className="block will-change-transform">
      <span data-intro="clip" className={`block ${TITLE} ${className ?? ""}`} style={{ "--i": i } as CSSProperties}>
        <span data-m="hero-stretch" className="inline-block origin-left will-change-transform">
          {children}
          {after}
        </span>
      </span>
    </span>
  );
}

/**
 * Asymmetric type-led hero on washi: two giant condensed lines stepping
 * right, a single vermilion sun-dot, the portrait in ink/paper duotone pulled
 * up under the second line, a vertical 龍 at the page edge and a terminal
 * status line. Accent budget here: (Ryu), the dot, and the nav's active dot.
 */
export default function HomeHero() {
  const facts = [
    { k: "EXPERIENCE", v: profile.experienceLabel },
    { k: "BASED IN", v: profile.location },
  ];

  return (
    <MotionScope effect="hero" className="relative">
      {/* Vertical edge mark. Sits in the page margin, clear of the title's measure. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(8px,1vw,20px)] top-[150px] z-20 hidden select-none flex-col items-center gap-4 md:flex"
      >
        <span className="font-mincho text-[clamp(40px,4.4vw,72px)] leading-none text-foreground [writing-mode:vertical-rl]">
          龍
        </span>
        <span className="block h-16 w-px bg-border-strong" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-foreground-secondary [writing-mode:vertical-rl]">
          {profile.nickname.toUpperCase()} — {new Date().getFullYear()}
        </span>
      </div>

      <PageContainer className="pb-[clamp(72px,10vw,140px)] pt-[112px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 border-b border-border pb-[18px] font-mono text-[11px] tracking-[0.06em] text-foreground-secondary">
          <span className="inline-flex items-center gap-3">
            <PageIcon icon={Code2} />
            <span>
              <span aria-hidden="true">
                <span className="text-terminal">~/{profile.nickname.toLowerCase()}</span>
                <span className="mx-[0.6em]">$</span>
                <span className="text-foreground">whoami</span>
                <span className="mx-[0.8em]">→</span>
              </span>
              {profile.positioning.toLowerCase()}
            </span>
          </span>
          <span className="tracking-[0.2em]">{profile.location.toUpperCase()}</span>
        </div>

        <h1 className="relative z-10 m-0 mt-[clamp(28px,5vw,64px)] text-foreground">
          <span className="sr-only">
            {profile.title} — {profile.displayName}
          </span>
          <TitleLine i={0}>Software</TitleLine>
          <TitleLine
            i={1}
            className="pl-[clamp(0px,7vw,88px)]"
            after={
              // The one vermilion mark in the title: a hinomaru-like full stop.
              <span className="ml-[0.05em] inline-block h-[0.15em] w-[0.15em] rounded-full bg-accent align-baseline" />
            }
          >
            Developer
          </TitleLine>
        </h1>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Portrait: first on phones (tucked under the title), right column from md. Only the foot of
              "Developer" and its dot touch the photo's top edge (~20% of the ~15.9vw line), capped
              once the title stops growing at 280px — the face always stays clear. */}
          <figure
            data-m="hero-portrait"
            className="relative z-0 order-first m-0 ml-auto mt-[-2vw] w-[62%] sm:w-[44%] md:order-none md:col-span-3 md:col-start-10 md:row-span-2 md:mt-[max(-3vw,-45px)] md:w-full"
          >
            <div data-intro="wipe" className="relative aspect-[4/5] overflow-hidden border border-border-strong bg-surface">
              <div data-m="hero-media" className="ink-duotone absolute inset-0">
                <Image
                  src={profile.portraits.primary.src}
                  alt={profile.portraits.primary.alt}
                  fill
                  preload
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 44vw, 62vw"
                  className="object-cover"
                  style={{ objectPosition: "52% 45%" }}
                />
                {/* The shader does its own grayscale→colour on hover; the duotone
                    blend layers above it are shared with the static image. */}
                <WebGLImage focus={[0.52, 0.45]} />
              </div>
            </div>
            <figcaption className="mt-2.5 flex justify-between gap-3 font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">
              <span>FIG. 00 — {profile.nickname.toUpperCase()}</span>
              <span>{profile.location.split(",")[0].toUpperCase()}</span>
            </figcaption>
          </figure>

          <div data-intro="rise" style={{ "--i": 0 } as CSSProperties} className="md:col-span-4 md:row-start-1 md:pt-[clamp(28px,4vw,56px)]">
            <p className="m-0 font-serif text-[clamp(44px,6.4vw,96px)] italic leading-[0.9] text-accent">({profile.nickname})</p>
            <p className="m-0 mt-4 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
              {profile.fullName.toUpperCase()}
            </p>
          </div>

          <div data-intro="rise" style={{ "--i": 1 } as CSSProperties} className="md:col-span-5 md:col-start-5 md:row-start-1 md:pt-[clamp(32px,4.4vw,64px)]">
            <p className="m-0 font-body text-[clamp(20px,2vw,26px)] font-medium leading-[1.2] tracking-[-0.025em] text-foreground">
              Frontend-focused
              <br />
              <span className="text-foreground-secondary">{profile.focusAreas.join(" / ")}</span>
            </p>
            <nav aria-label="Hero" className="mt-8 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[11px] tracking-[0.2em]">
              <Link
                href="#selected-work"
                className="border-b border-foreground pb-1 text-foreground transition-colors duration-[180ms] hover:border-accent hover:text-accent-text"
              >
                SELECTED WORK ↓
              </Link>
              <Link
                href="/contact"
                className="border-b border-border-strong pb-1 text-foreground-secondary transition-colors duration-[180ms] hover:border-accent hover:text-accent-text"
              >
                CONTACT →
              </Link>
            </nav>

            <dl className="m-0 mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-4">
              {facts.map((row) => (
                <div key={row.k}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">{row.k}</dt>
                  <dd className="m-0 mt-1.5 text-[14px] leading-snug text-foreground">{row.v}</dd>
                </div>
              ))}
            </dl>

            {/* Terminal status line — the page's only blinking cursor. */}
            <p className="m-0 mt-6 border-t border-border pt-4 font-mono text-[12px] leading-[1.7] tracking-[0.02em] text-foreground-secondary">
              <span aria-hidden="true">
                <span className="text-terminal">~/{profile.nickname.toLowerCase()}</span>
                <span className="mx-[0.6em]">$</span>
                <span className="text-foreground">status</span>
                <br />
              </span>
              <span className="inline-flex items-center gap-2 text-terminal">
                {profile.availability.openToWork ? (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terminal" />
                ) : null}
                <span>
                  <span className="sr-only">Status: </span>
                  {profile.availability.text.toLowerCase()}
                </span>
              </span>
              <span aria-hidden="true" className="terminal-cursor" />
            </p>
          </div>
        </div>
      </PageContainer>
    </MotionScope>
  );
}
