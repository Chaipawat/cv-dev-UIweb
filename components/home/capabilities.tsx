import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import SectionLabel from "@/components/shared/section-label";
import { portfolio } from "@/data/portfolio";
import type { SkillGroupKey } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const { skills } = portfolio;

const PRIMARY: SkillGroupKey[] = ["frontend", "mobile", "integration", "workflow"];

/**
 * Capability groups as typography: a giant group word with its items set as
 * a running line beside it. Backend familiarity is deliberately quieter and
 * labelled as familiarity, not ownership.
 */
export default function Capabilities() {
  return (
    <section aria-labelledby="capabilities-heading">
      <PageContainer className="pb-[clamp(96px,12vw,180px)]">
        <SectionLabel
          index="04"
          label="CAPABILITIES"
          trailing={
            <Link href="/about" className="transition-colors duration-[180ms] hover:text-accent-text">
              HOW I WORK →
            </Link>
          }
        />
        <h2 id="capabilities-heading" className="sr-only">
          Capabilities
        </h2>

        <MotionScope effect="capabilities" className="mt-[clamp(24px,4vw,48px)]">
          {PRIMARY.map((key, i) => {
            const group = skills[key];
            const flip = i % 2 === 1;
            return (
              <div
                key={key}
                data-m="cap-row"
                data-dir={flip ? "-1" : "1"}
                className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-border py-[clamp(18px,2.6vw,36px)] md:grid-cols-12"
              >
                <h3
                  data-m="cap-label"
                  className={cn(
                    "m-0 font-display text-[clamp(40px,7.2vw,112px)] uppercase leading-[0.86] tracking-[-0.01em] text-foreground md:col-span-7",
                    flip && "md:order-2 md:col-start-6 md:text-right"
                  )}
                >
                  {group.label}
                </h3>
                <ul
                  className={cn(
                    "m-0 flex list-none flex-wrap gap-x-[0.9em] gap-y-1 p-0 text-[clamp(16px,1.45vw,20px)] leading-[1.45] text-foreground-secondary md:col-span-5",
                    flip ? "md:order-1 md:col-start-1" : "md:col-start-8"
                  )}
                >
                  {group.items.map((item, j) => (
                    <li key={item} data-reveal="fade" className={j === 0 ? "text-foreground" : undefined}>
                      {item}
                      {j < group.items.length - 1 ? (
                        <span className="ml-[0.9em] text-border-strong" aria-hidden="true">
                          /
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 py-[clamp(18px,2.4vw,32px)] md:grid-cols-12">
            <h3 className="m-0 font-display text-[clamp(24px,3vw,40px)] uppercase leading-[0.95] tracking-[-0.005em] text-foreground-muted md:col-span-5">
              {skills.backendFamiliarity.label}
            </h3>
            <p className="m-0 font-mono text-[12px] leading-[1.8] tracking-[0.06em] text-foreground-secondary md:col-span-7">
              {skills.backendFamiliarity.items.join(" · ")}
              <span className="block text-foreground-secondary">
                Reading backend code to understand API flow — backend is not my primary responsibility.
              </span>
            </p>
          </div>
        </MotionScope>
      </PageContainer>
    </section>
  );
}
