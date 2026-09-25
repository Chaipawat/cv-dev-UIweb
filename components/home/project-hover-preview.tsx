"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export interface PreviewItem {
  slug: string;
  number: string;
  title: string;
  type: string;
  period: string;
  stack: string;
  focus: string[];
}

interface ProjectHoverPreviewProps {
  items: PreviewItem[];
  children: ReactNode;
}

const QUERY = "(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (hover: hover) and (pointer: fine)";

/**
 * Floating preview plate that trails the cursor over the project index and
 * tilts with cursor speed. Desktop + fine pointer + motion only; the rows
 * themselves carry all the information, so the plate is purely decorative.
 * Rows opt in with `data-preview="<slug>"`.
 */
export default function ProjectHoverPreview({ items, children }: ProjectHoverPreviewProps) {
  const root = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<PreviewItem | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      const el = plate.current;
      if (!scope || !el) return;
      const bySlug = new Map(items.map((i) => [i.slug, i]));
      const mm = gsap.matchMedia();

      mm.add(QUERY, () => {
        gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.86 });
        const x = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3" });
        const rotate = gsap.quickTo(el, "rotation", { duration: 0.6, ease: "power3" });
        let lastX = 0;
        let shown = false;

        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const row = (e.target as Element).closest<HTMLElement>("[data-preview]");
          const item = row ? bySlug.get(row.dataset.preview ?? "") : undefined;
          if (!item) return hide();

          if (!shown) {
            // Appear at the cursor rather than flying in from the last spot.
            gsap.set(el, { x: e.clientX + 40, y: e.clientY });
            gsap.to(el, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "expo.out", overwrite: "auto" });
            shown = true;
          }
          setActive((prev) => (prev?.slug === item.slug ? prev : item));
          x(e.clientX + 40);
          y(e.clientY);
          rotate(gsap.utils.clamp(-7, 7, (e.clientX - lastX) * 0.35));
          lastX = e.clientX;
        };
        const hide = () => {
          if (!shown) return;
          shown = false;
          rotate(0);
          gsap.to(el, { autoAlpha: 0, scale: 0.86, duration: 0.3, ease: "power2.out", overwrite: "auto" });
        };
        // Scrolling moves rows under a still cursor; drop the plate rather than show a stale project.
        const onScroll = () => hide();

        scope.addEventListener("pointermove", onMove);
        scope.addEventListener("pointerleave", hide);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
          scope.removeEventListener("pointermove", onMove);
          scope.removeEventListener("pointerleave", hide);
          window.removeEventListener("scroll", onScroll);
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [items] }
  );

  return (
    <div ref={root} className="relative">
      {children}
      <div
        ref={plate}
        aria-hidden="true"
        className="pointer-events-none invisible fixed left-0 top-0 z-40 hidden w-[300px] border border-border-strong bg-surface-elevated lg:block"
      >
        {active ? (
          <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden p-5">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-accent" />
            <span className="absolute -bottom-[0.18em] -right-[0.04em] font-display text-[150px] leading-none tracking-[-0.01em] text-accent/15">
              {active.number}
            </span>
            <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">
              <span>{active.type.toUpperCase()}</span>
              <span>{active.period}</span>
            </div>
            <div className="relative">
              <p className="m-0 font-display text-[30px] uppercase leading-[0.92] tracking-[-0.005em] text-foreground">
                {active.title}
              </p>
              {active.focus.length ? (
                <p className="m-0 mt-2 font-serif text-[18px] italic leading-tight text-foreground-secondary">
                  {active.focus.slice(0, 3).join(" / ")}
                </p>
              ) : null}
              <p className="m-0 mt-4 font-mono text-[10px] leading-[1.7] tracking-[0.14em] text-foreground-secondary">
                {active.stack.toUpperCase()}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
