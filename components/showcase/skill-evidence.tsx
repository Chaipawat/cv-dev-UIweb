"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageContainer from "@/components/layout/page-container";
import ProjectPreview from "@/components/shared/project-preview";
import { SHOWCASE_CATEGORIES, SHOWCASE_DATA, type ShowcaseCategory } from "@/data/showcase";
import { cn } from "@/lib/utils";

const PANEL_ID = "showcase-evidence-panel";

/** Roving-tabindex arrow-key navigation for a horizontal or vertical tablist. */
function handleTabKeyDown(
  e: KeyboardEvent<HTMLButtonElement>,
  keys: string[],
  activeIndex: number,
  select: (key: string) => void,
  refs: React.RefObject<Record<string, HTMLButtonElement | null>>,
  orientation: "horizontal" | "vertical"
) {
  const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
  const prevKey = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
  let nextIndex: number | null = null;

  if (e.key === nextKey) nextIndex = (activeIndex + 1) % keys.length;
  else if (e.key === prevKey) nextIndex = (activeIndex - 1 + keys.length) % keys.length;
  else if (e.key === "Home") nextIndex = 0;
  else if (e.key === "End") nextIndex = keys.length - 1;

  if (nextIndex === null) return;
  e.preventDefault();
  const nextKeyValue = keys[nextIndex];
  select(nextKeyValue);
  refs.current?.[nextKeyValue]?.focus();
}

export default function SkillEvidence() {
  const [category, setCategory] = useState<ShowcaseCategory>("Frontend");
  const techKeys = Object.keys(SHOWCASE_DATA[category]);
  const [tech, setTech] = useState(techKeys[0]);

  const activeTech = SHOWCASE_DATA[category][tech] ? tech : techKeys[0];
  const evidenceList = SHOWCASE_DATA[category][activeTech] ?? [];

  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const techRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function selectCategory(next: ShowcaseCategory) {
    setCategory(next);
    setTech(Object.keys(SHOWCASE_DATA[next])[0]);
  }

  return (
    <PageContainer className="pb-[100px]">
      <div
        role="tablist"
        aria-label="Showcase categories"
        aria-orientation="horizontal"
        className="flex overflow-x-auto border-y border-border"
      >
        {SHOWCASE_CATEGORIES.map((cat, i) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              ref={(el) => {
                categoryRefs.current[cat] = el;
              }}
              role="tab"
              id={`cat-tab-${cat}`}
              aria-selected={active}
              aria-controls={PANEL_ID}
              tabIndex={active ? 0 : -1}
              onClick={() => selectCategory(cat)}
              onKeyDown={(e) =>
                handleTabKeyDown(
                  e,
                  SHOWCASE_CATEGORIES,
                  SHOWCASE_CATEGORIES.indexOf(category),
                  (k) => selectCategory(k as ShowcaseCategory),
                  categoryRefs,
                  "horizontal"
                )
              }
              className={cn(
                "relative min-w-[150px] flex-1 border-r border-border px-[22px] py-5 text-left font-display text-[clamp(16px,1.7vw,21px)] font-medium tracking-[-0.02em] transition-colors duration-[320ms]",
                active ? "bg-surface text-foreground" : "text-foreground-muted"
              )}
            >
              <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] text-foreground-muted" aria-hidden="true">
                0{i + 1}
              </span>
              {cat}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  active ? "scale-x-100" : "scale-x-0"
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-11 grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] md:grid-cols-[220px_1fr]">
        <div className="md:sticky md:top-[104px]">
          <div className="border-b border-border pb-3.5 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
            TECHNOLOGY
          </div>
          <div
            role="tablist"
            aria-label="Technology"
            aria-orientation="vertical"
            className="flex flex-col"
          >
            {techKeys.map((k) => {
              const active = k === activeTech;
              return (
                <button
                  key={k}
                  ref={(el) => {
                    techRefs.current[k] = el;
                  }}
                  role="tab"
                  id={`tech-tab-${k}`}
                  aria-selected={active}
                  aria-controls={PANEL_ID}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTech(k)}
                  onKeyDown={(e) =>
                    handleTabKeyDown(e, techKeys, techKeys.indexOf(activeTech), setTech, techRefs, "vertical")
                  }
                  className={cn(
                    "flex items-center border-b border-border py-3.5 text-left font-mono text-[12.5px] transition-colors duration-[240ms]",
                    active ? "text-foreground" : "text-foreground-muted"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mr-3 inline-block h-px w-3.5 transition-[background,width] duration-[240ms]",
                      active ? "bg-accent" : "bg-border"
                    )}
                  />
                  {k}
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`tech-tab-${activeTech}`}
          tabIndex={-1}
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3.5 font-mono text-[10px] tracking-[0.2em] text-foreground-muted">
            <span aria-live="polite">EVIDENCE — {activeTech}</span>
            <span>
              {evidenceList.length} {evidenceList.length === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {evidenceList.map((item, i) => (
                <motion.article
                  key={`${category}-${activeTech}-${item.title}`}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                >
                  <ProjectPreview variant={item.variant} steps={item.steps} />
                  <div className="pt-[18px]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
                      {item.badge}
                    </span>
                    <h2 className="m-0 mt-3 font-display text-[17px] font-medium tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h2>
                    <p className="m-0 mt-2 text-[13.5px] leading-[1.6] text-foreground-secondary">
                      {item.desc}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
