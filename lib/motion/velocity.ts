import { gsap } from "@/lib/motion/gsap";

/**
 * Shared scroll velocity in px per 60fps-frame, sampled once per GSAP tick
 * from the real scroll position. Works identically with Lenis smoothing,
 * native touch scrolling, keyboard and scrollbar dragging.
 */
let velocity = 0;
let lastY = 0;
let running = false;

function sample(_time: number, deltaTime: number) {
  const y = window.scrollY;
  const frames = Math.max(deltaTime, 1) / (1000 / 60);
  velocity = (y - lastY) / frames;
  lastY = y;
}

export function startVelocity() {
  if (running) return;
  running = true;
  lastY = window.scrollY;
  gsap.ticker.add(sample);
}

export function stopVelocity() {
  running = false;
  velocity = 0;
  gsap.ticker.remove(sample);
}

/** Signed velocity (positive = scrolling down). */
export function getVelocity() {
  return velocity;
}
