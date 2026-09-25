"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import type { ProjectCategory } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  slug: string;
  categories: ProjectCategory[];
  /** Server-rendered project plate. */
  node: ReactNode;
}

interface ProjectGalleryProps {
  items: GalleryItem[];
  filters: { id: ProjectCategory; label: string }[];
}

type Filter = ProjectCategory | "all";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Asymmetric two-column rhythm (wide / narrow, then narrow / wide), with the
 * narrow column dropped lower so rows never line up like a card grid.
 * Recomputed on the filtered list so the rhythm survives filtering.
 */
function spanFor(i: number) {
  const wide = i % 4 === 0 || i % 4 === 3;
  return cn(wide ? "md:col-span-7" : "md:col-span-5", !wide && "md:mt-[clamp(80px,10vw,160px)]");
}

export default function ProjectGallery({ items, filters }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? items : items.filter((i) => i.categories.includes(filter));
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: items.length },
    ...filters.map((f) => ({ ...f, count: items.filter((i) => i.categories.includes(f.id)).length })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-x-1 gap-y-2 border-b border-border pb-4"
      >
        {options.map((o) => {
          const active = filter === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o.id)}
              className={cn(
                "flex items-baseline gap-2 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-[180ms]",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground-secondary hover:border-border-strong hover:text-foreground"
              )}
            >
              {o.label}
              <span className={active ? "text-background/60" : "text-foreground-secondary"}>{pad(o.count)}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="m-0 mt-4 font-mono text-[10.5px] tracking-[0.2em] text-foreground-secondary">
        SHOWING {pad(visible.length)} / {pad(items.length)}
      </p>

      <div className="mt-[clamp(32px,5vw,64px)] grid grid-cols-1 gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(64px,8vw,120px)] md:grid-cols-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.div
              key={item.slug}
              layout="position"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.18 } }}
              className={spanFor(i)}
            >
              {item.node}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
