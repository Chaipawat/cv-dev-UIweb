import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import Marquee from "@/components/shared/marquee";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

const LINE = "block font-display font-extrabold uppercase leading-[0.86] tracking-[-0.055em] text-[clamp(36px,11vw,172px)]";

/**
 * "I build interfaces for real products." Each line takes its own position
 * on the grid; one keyword switches to the serif. Static in this phase —
 * scroll-velocity stretch and blur arrive with the motion system.
 */
export default function KineticStatement() {
  return (
    <MotionScope effect="statement">
    <section aria-labelledby="statement-heading" className="pb-[clamp(88px,12vw,180px)]">
      <PageContainer>
        <h2 id="statement-heading" className="m-0 text-foreground">
          <span data-m="statement-line" data-reveal="clip" className={LINE}>
            I build
          </span>
          <span data-m="statement-line" data-reveal="clip" className="block pl-[clamp(24px,12vw,220px)] font-serif text-[clamp(44px,13vw,204px)] font-normal italic leading-[0.9] tracking-[-0.02em] text-accent">
            interfaces
          </span>
          <span data-m="statement-line" data-reveal="clip" data-origin="right" className={`${LINE} text-right`}>
            For real
          </span>
          <span data-m="statement-line" data-reveal="clip" className={`${LINE} pl-[clamp(12px,5vw,96px)]`}>
            Products<span className="text-accent">.</span>
          </span>
        </h2>

        <div className="mt-[clamp(40px,6vw,88px)] grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <span className="font-mono text-[11px] tracking-[0.2em] text-foreground-muted md:col-span-3">
            WHAT I DO
          </span>
          <p data-reveal="fade" className="m-0 max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground-secondary md:col-span-6 md:col-start-7">
            {profile.statement}
          </p>
        </div>
      </PageContainer>

      <Marquee
        items={profile.domains}
        duration={56}
        className="mt-[clamp(48px,7vw,96px)] border-y border-border py-[clamp(14px,1.8vw,22px)]"
        itemClassName="font-display text-[clamp(22px,3vw,44px)] font-medium uppercase tracking-[-0.03em] text-foreground"
      />
    </section>
    </MotionScope>
  );
}
