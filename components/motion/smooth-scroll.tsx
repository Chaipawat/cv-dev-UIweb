"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { MOTION_QUERIES, ScrollTrigger, gsap } from "@/lib/motion/gsap";
import { startVelocity, stopVelocity } from "@/lib/motion/velocity";

declare global {
  interface Window {
    __motionReady?: boolean;
  }
}

/**
 * Scroll-behaviour layer: Lenis smoothing driven by the GSAP ticker so
 * ScrollTrigger and Lenis share one clock. Disabled (native scroll, no
 * `html.motion`) whenever the user prefers reduced motion — including if
 * that preference changes while the page is open.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const query = window.matchMedia(MOTION_QUERIES.motion);
    let raf: ((time: number) => void) | null = null;

    function enable() {
      root.classList.add("motion");
      startVelocity();
      const lenis = new Lenis({
        lerp: 0.11,
        smoothWheel: true,
        // Touch keeps native momentum; Lenis only smooths wheel/trackpad.
        syncTouch: false,
        anchors: { offset: -80 },
        stopInertiaOnNavigate: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = lenis;
    }

    function disable() {
      root.classList.remove("motion");
      stopVelocity();
      if (raf) gsap.ticker.remove(raf);
      raf = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    }

    if (query.matches) enable();
    else disable();
    window.__motionReady = true;

    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) enable();
      else disable();
      ScrollTrigger.refresh();
    };
    query.addEventListener("change", onChange);

    return () => {
      query.removeEventListener("change", onChange);
      disable();
    };
  }, []);

  // Back/forward navigations fire popstate before the pathname changes; those
  // keep the restored scroll position instead of jumping to the top.
  const historyNavigation = useRef(false);
  const firstRender = useRef(true);
  useEffect(() => {
    const onPopState = () => {
      historyNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // New route: jump to top without smoothing and re-measure triggers once layout settles.
  useEffect(() => {
    const restoring = firstRender.current || historyNavigation.current;
    firstRender.current = false;
    historyNavigation.current = false;
    if (!restoring) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
