import { EASE, EASE_EDITORIAL, ScrollTrigger, gsap, type MotionConditions } from "@/lib/motion/gsap";
import { getVelocity } from "@/lib/motion/velocity";

/**
 * Section-specific kinetic effects. Each receives its scope root and the
 * active media conditions (only called when motion is allowed) and may
 * return a cleanup. Targets are located by data attributes, so the markup
 * stays in Server Components.
 *
 * Every section moves differently on purpose:
 *   hero          → scroll pulls the two title lines apart and squashes/stretches them
 *   statement     → lines react to scroll velocity (stretch, skew, blur on desktop)
 *   work          → per-project clip reveals + fade-out handover to the next project
 *   index         → batched row cascade
 *   progression   → sticky year counter driven through the staircase
 *   capabilities  → giant group words drift against each other with scroll
 *   about         → portrait unmasks from the bottom with inner parallax
 *   cta           → headline squashes up from the baseline as it arrives
 *   caseHero      → case-study title lines split on scroll
 *   nextProject   → next-project title stretches into place
 */
type Effect = (root: HTMLElement, c: MotionConditions) => void | (() => void);

const CLIP_HIDDEN = "inset(120% -6% -30% -6%)";
const CLIP_SHOWN = "inset(-30% -6% -30% -6%)";

const $$ = (root: HTMLElement, sel: string) => gsap.utils.toArray<HTMLElement>(root.querySelectorAll(sel));

function markRevealed(els: HTMLElement[], clear: string) {
  els.forEach((el) => el.setAttribute("data-revealed", ""));
  gsap.set(els, { clearProps: clear });
}

/** Clipped line reveal (bottom → top) played once when `trigger` enters. */
function clipReveal(els: HTMLElement[], trigger: Element, opts: { start?: string; stagger?: number; y?: string } = {}) {
  if (!els.length) return;
  gsap.fromTo(
    els,
    { clipPath: CLIP_HIDDEN, yPercent: parseFloat(opts.y ?? "36") },
    {
      clipPath: CLIP_SHOWN,
      yPercent: 0,
      duration: 1.05,
      ease: EASE_EDITORIAL,
      stagger: opts.stagger ?? 0.1,
      scrollTrigger: { trigger, start: opts.start ?? "top 85%", once: true },
      onComplete: () => markRevealed(els, "clipPath"),
    }
  );
}

/** Opacity + small rise, played once. */
function fadeReveal(els: HTMLElement[], trigger: Element, opts: { start?: string; stagger?: number; y?: number } = {}) {
  if (!els.length) return;
  gsap.fromTo(
    els,
    { opacity: 0, y: opts.y ?? 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: EASE,
      stagger: opts.stagger ?? 0.06,
      scrollTrigger: { trigger, start: opts.start ?? "top 85%", once: true },
      onComplete: () => markRevealed(els, "opacity"),
    }
  );
}

/** Horizontal wipe for covers/images, with the inner image settling from a slight zoom. */
function wipeReveal(el: HTMLElement, trigger: Element) {
  const img = el.querySelector("img");
  const tl = gsap.timeline({ scrollTrigger: { trigger, start: "top 80%", once: true } });
  tl.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: EASE_EDITORIAL });
  if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: EASE_EDITORIAL }, 0);
  tl.eventCallback("onComplete", () => markRevealed([el], "clipPath"));
}

/** Runs `tick` on the GSAP ticker only while `trigger` is on screen. */
function whileVisible(trigger: Element, tick: () => void, onIdle?: () => void) {
  let on = false;
  const st = ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      if (self.isActive && !on) {
        gsap.ticker.add(tick);
        on = true;
      } else if (!self.isActive && on) {
        gsap.ticker.remove(tick);
        on = false;
        onIdle?.();
      }
    },
  });
  return () => {
    st.kill();
    if (on) gsap.ticker.remove(tick);
  };
}

/* ------------------------------------------------------------------ */

const hero: Effect = (root, c) => {
  const [top, bottom] = $$(root, '[data-m="hero-line"]');
  const portrait = root.querySelector<HTMLElement>('[data-m="hero-portrait"]');
  // Image + its WebGL layer scale together.
  const img = portrait?.querySelector<HTMLElement>('[data-m="hero-media"]');
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
  });
  // Lines separate and change weight-feel: top squashes down, bottom stretches.
  if (top) tl.to(top, { xPercent: c.desktop ? -9 : -5, scaleY: 0.72, transformOrigin: "0% 100%" }, 0);
  if (bottom) tl.to(bottom, { xPercent: c.desktop ? 7 : 4, scaleY: 1.2, transformOrigin: "0% 0%" }, 0);
  if (portrait) tl.to(portrait, { yPercent: -14 }, 0);
  if (img) tl.to(img, { scale: 1.14 }, 0);
};

const statement: Effect = (root, c) => {
  const lines = $$(root, '[data-m="statement-line"]');
  clipReveal(lines, root, { start: "top 75%", stagger: 0.12 });
  fadeReveal($$(root, '[data-reveal="fade"]'), root, { start: "top 55%" });

  // Velocity response. Each line has its own direction and gain so the
  // block shears apart rather than moving as one slab.
  const setters = lines.map((line, i) => ({
    scaleX: gsap.quickSetter(line, "scaleX"),
    skewX: gsap.quickSetter(line, "skewX", "deg"),
    blur: c.desktop ? gsap.quickSetter(line, "filter") : null,
    dir: i % 2 === 0 ? 1 : -1,
    gain: 1 + (i % 3) * 0.35,
  }));
  lines.forEach((line) => {
    gsap.set(line, { transformOrigin: line.dataset.origin === "right" ? "100% 50%" : "0% 50%" });
  });

  let current = 0;
  const tick = () => {
    const target = gsap.utils.clamp(-60, 60, getVelocity());
    current += (target - current) * 0.12;
    const mag = Math.abs(current);
    setters.forEach((s) => {
      s.scaleX(1 + Math.min(mag * 0.0045 * s.gain, 0.22));
      s.skewX(gsap.utils.clamp(-9, 9, current * -0.14 * s.dir * s.gain));
      if (s.blur) {
        const px = Math.min(mag * 0.045, 2.4);
        s.blur(px > 0.15 ? `blur(${px.toFixed(2)}px)` : "none");
      }
    });
  };
  const reset = () => {
    current = 0;
    gsap.to(lines, { scaleX: 1, skewX: 0, filter: "none", duration: 0.4, ease: EASE });
  };
  return whileVisible(root, tick, reset);
};

const work: Effect = (root, c) => {
  $$(root, '[data-m="project"]').forEach((project) => {
    const variant = project.dataset.variant;
    const rule = project.querySelectorAll<HTMLElement>('[data-m="rule"]');
    if (rule.length) {
      gsap.fromTo(
        rule,
        { scaleX: 0, transformOrigin: "0% 50%" },
        { scaleX: 1, duration: 1.2, ease: EASE_EDITORIAL, scrollTrigger: { trigger: project, start: "top 88%", once: true } }
      );
    }

    const titles = $$(project, '[data-reveal="clip"]');
    if (variant === "full") {
      // Hero project: lines arrive stretched and compress into place.
      clipReveal(titles, project, { stagger: 0.14, y: "60" });
      gsap.fromTo(
        titles,
        { scaleX: 1.18, transformOrigin: "0% 50%" },
        { scaleX: 1, duration: 1.4, ease: EASE_EDITORIAL, stagger: 0.14, scrollTrigger: { trigger: project, start: "top 85%", once: true } }
      );
    } else {
      clipReveal(titles, project, { stagger: 0.1 });
    }

    const fades = $$(project, '[data-reveal="fade"]');
    if (variant === "mobile") {
      // Feature list slides in from the right edge, one row at a time.
      gsap.fromTo(
        fades,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: EASE_EDITORIAL,
          stagger: 0.07,
          scrollTrigger: { trigger: project, start: "top 75%", once: true },
          onComplete: () => markRevealed(fades, "opacity"),
        }
      );
    } else {
      fadeReveal(fades, project, { start: "top 78%" });
    }

    $$(project, '[data-reveal="wipe"]').forEach((el) => wipeReveal(el, el));

    // Handover: each project quietly recedes as the next one takes the stage.
    if (c.desktop) {
      gsap.to(project, {
        opacity: 0.28,
        ease: "none",
        scrollTrigger: { trigger: project, start: "bottom 45%", end: "bottom 5%", scrub: true },
      });
    }
  });
};

const index: Effect = (root) => {
  const rows = $$(root, '[data-m="index-row"]');
  gsap.set(rows, { opacity: 0, y: 26 });
  ScrollTrigger.batch(rows, {
    start: "top 92%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: EASE_EDITORIAL,
        stagger: 0.06,
        onComplete: () => markRevealed(batch as HTMLElement[], "opacity"),
      }),
  });
};

const progression: Effect = (root, c) => {
  const steps = $$(root, '[data-m="step"]');
  const year = root.querySelector<HTMLElement>('[data-m="step-year"]');
  const count = root.querySelector<HTMLElement>('[data-m="step-count"]');
  const shift = root.querySelector<HTMLElement>('[data-m="step-shift"]');
  const rail = root.querySelector<HTMLElement>('[data-m="step-rail"]');
  const list = root.querySelector<HTMLElement>('[data-m="steps"]');
  const total = String(steps.length).padStart(2, "0");

  const activate = (i: number) => {
    steps.forEach((s, j) => s.toggleAttribute("data-active", j === i));
    const step = steps[i];
    if (!step) return;
    if (year && year.textContent !== step.dataset.year) {
      year.textContent = step.dataset.year ?? "";
      gsap.fromTo(year, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: EASE_EDITORIAL });
    }
    if (count) count.textContent = `${String(i + 1).padStart(2, "0")} / ${total}`;
    if (shift) shift.textContent = step.dataset.shift ?? "";
  };

  steps.forEach((step, i) => {
    // Staircase builds as you read: steps start dim and resolve when they reach the reading line.
    gsap.fromTo(
      step,
      { opacity: 0.18, x: c.desktop ? -40 : 0 },
      {
        opacity: 1,
        x: 0,
        ease: "none",
        scrollTrigger: { trigger: step, start: "top 88%", end: "top 55%", scrub: true },
      }
    );
    ScrollTrigger.create({
      trigger: step,
      start: "top 60%",
      end: "bottom 60%",
      onToggle: (self) => self.isActive && activate(i),
    });
  });

  if (rail && list) {
    gsap.fromTo(
      rail,
      { scaleY: 0, transformOrigin: "50% 0%" },
      { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: true } }
    );
  }
  activate(0);
  return () => steps.forEach((s) => s.removeAttribute("data-active"));
};

const capabilities: Effect = (root, c) => {
  const amp = c.desktop ? 0.045 : 0.02;
  $$(root, '[data-m="cap-row"]').forEach((row) => {
    const label = row.querySelector<HTMLElement>('[data-m="cap-label"]');
    // Left-set words drift right, right-set words drift left: always inward,
    // so a giant word never slides into the container edge and gets cut.
    const dir = row.dataset.dir === "-1" ? -1 : 1;
    if (label) {
      gsap.fromTo(
        label,
        { x: 0 },
        {
          x: () => dir * window.innerWidth * amp,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true },
        }
      );
    }
    fadeReveal($$(row, '[data-reveal="fade"]'), row, { stagger: 0.035, y: 10 });
  });
};

const about: Effect = (root) => {
  const frame = root.querySelector<HTMLElement>('[data-m="about-portrait"]');
  const img = frame?.querySelector("img");
  if (frame) {
    gsap.fromTo(
      frame,
      { clipPath: "inset(100% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: EASE_EDITORIAL,
        scrollTrigger: { trigger: frame, start: "top 82%", once: true },
        onComplete: () => markRevealed([frame], "clipPath"),
      }
    );
  }
  if (img) {
    gsap.fromTo(
      img,
      { yPercent: -8, scale: 1.18 },
      { yPercent: 8, scale: 1.18, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } }
    );
  }
  clipReveal($$(root, '[data-reveal="clip"]'), root, { start: "top 70%" });
  fadeReveal($$(root, '[data-reveal="fade"]'), root, { start: "top 65%" });
};

const cta: Effect = (root) => {
  const lines = $$(root, '[data-m="cta-line"]');
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top bottom", end: "top 25%", scrub: 0.7 },
  });
  // Squash → stretch from the baseline, each line slightly later than the last.
  lines.forEach((line, i) => {
    tl.fromTo(
      line,
      { scaleY: 0.25, opacity: 0.2, transformOrigin: line.dataset.origin === "right" ? "100% 100%" : "0% 100%" },
      { scaleY: 1, opacity: 1 },
      i * 0.18
    );
  });
  fadeReveal($$(root, '[data-reveal="fade"]'), root, { start: "top 45%", stagger: 0.08 });
};

const caseHero: Effect = (root, c) => {
  const lines = $$(root, '[data-m="case-line"]');
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
  });
  // Scope sits inside the page container, so lines only move right (never
  // into the left edge): alternate lines travel different distances and split.
  lines.forEach((line, i) => {
    tl.to(line, { xPercent: (i % 2 === 0 ? 1 : 5) * (c.desktop ? 1.4 : 0.7), opacity: 0.35 }, 0);
  });
};

const nextProject: Effect = (root) => {
  const title = root.querySelector<HTMLElement>('[data-m="next-title"]');
  if (!title) return;
  gsap.fromTo(
    title,
    { scaleX: 1.35, scaleY: 0.8, transformOrigin: "0% 100%" },
    { scaleX: 1, scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 40%", scrub: 0.6 } }
  );
};

export const EFFECTS = {
  hero,
  statement,
  work,
  index,
  progression,
  capabilities,
  about,
  cta,
  caseHero,
  nextProject,
} satisfies Record<string, Effect>;

export type EffectName = keyof typeof EFFECTS;
