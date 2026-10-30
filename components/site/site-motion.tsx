"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

/**
 * Progressive enhancement for every page: reveal-on-scroll, the Selected
 * Work scrollytelling, showcase filters, pointer parallax and magnetic
 * buttons. Re-binds on each route change. Content never depends on it — the
 * boot script in app/layout.tsx drops the `js` class if this never runs.
 */
export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealReady = true;
    document.body.classList.add("is-loaded");
    const cleanups: (() => void)[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal on scroll
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealIO.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    // Scrollytelling: the step in the middle of the viewport drives the stage
    const steps = Array.from(document.querySelectorAll<HTMLElement>(".step"));
    const scenes = Array.from(document.querySelectorAll<HTMLElement>(".stage .scene"));
    const countEl = document.querySelector("[data-stage-count]");
    const barEl = document.querySelector<HTMLElement>("[data-stage-bar]");
    const labelEl = document.querySelector("[data-stage-label]");
    if (steps.length) {
      const activate = (i: number) => {
        steps.forEach((s, j) => s.classList.toggle("is-active", i === j));
        scenes.forEach((s, j) => s.classList.toggle("is-active", i === j));
        if (countEl) countEl.textContent = String(i + 1).padStart(2, "0");
        if (barEl) barEl.style.width = ((i + 1) / steps.length) * 100 + "%";
        if (labelEl) labelEl.textContent = steps[i].dataset.label ?? "";
      };
      const stepIO = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && activate(steps.indexOf(e.target as HTMLElement))),
        { rootMargin: "-48% 0px -48% 0px" }
      );
      steps.forEach((s) => stepIO.observe(s));
      activate(0);
      cleanups.push(() => stepIO.disconnect());
    }

    // Showcase filters
    const filters = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-cats]"));
    const statusEl = document.querySelector("[data-filter-status]");
    filters.forEach((f) => {
      const onClick = () => {
        const key = f.dataset.filter!;
        let shown = 0;
        filters.forEach((o) => o.setAttribute("aria-pressed", String(o === f)));
        cards.forEach((c) => {
          const match = key === "all" || c.dataset.cats!.split(" ").includes(key);
          c.hidden = !match;
          if (match) {
            shown++;
            c.classList.add("in");
          }
        });
        if (statusEl) statusEl.textContent = `Showing ${String(shown).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
      };
      f.addEventListener("click", onClick);
      cleanups.push(() => f.removeEventListener("click", onClick));
    });

    if (!reduce && window.matchMedia("(pointer: fine)").matches) {
      // Pointer parallax on layered compositions
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((box) => {
        const layers = Array.from(box.querySelectorAll<HTMLElement>("[data-depth]"));
        const move = (ev: PointerEvent) => {
          const r = box.getBoundingClientRect();
          const x = (ev.clientX - r.left) / r.width - 0.5;
          const y = (ev.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => {
            const d = parseFloat(l.dataset.depth ?? "0");
            l.style.transform = `translate3d(${x * d * 40}px,${y * d * 40}px,0)`;
          });
        };
        const leave = () => layers.forEach((l) => (l.style.transform = ""));
        box.addEventListener("pointermove", move);
        box.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          box.removeEventListener("pointermove", move);
          box.removeEventListener("pointerleave", leave);
        });
      });

      // Magnetic buttons
      document.querySelectorAll<HTMLElement>(".btn").forEach((b) => {
        const move = (ev: PointerEvent) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(ev.clientX - r.left - r.width / 2) * 0.15}px,${(ev.clientY - r.top - r.height / 2) * 0.25}px)`;
        };
        const leave = () => (b.style.transform = "");
        b.addEventListener("pointermove", move);
        b.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          b.removeEventListener("pointermove", move);
          b.removeEventListener("pointerleave", leave);
          b.style.transform = "";
        });
      });
    }

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}
