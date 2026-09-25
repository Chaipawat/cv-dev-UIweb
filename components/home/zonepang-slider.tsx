"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type TouchEvent } from "react";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_DURATION = 4500;

export default function ZonepangSlider({ images }: { images: ProjectImage[] }) {
  const root = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [playWhileFocused, setPlayWhileFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const current = images[active];
  const isPlaying = !reducedMotion && !manualPaused && !hovered && (!focused || playWhileFocused) && visible && pageVisible;

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % images.length), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, images.length, isPlaying]);

  function goTo(index: number) {
    setManualPaused(true);
    setPlayWhileFocused(false);
    setActive((index + images.length) % images.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(active + (event.key === "ArrowRight" ? 1 : -1));
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current.x;
    const verticalDistance = event.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(distance) > 50 && Math.abs(distance) > Math.abs(verticalDistance)) goTo(active + (distance < 0 ? 1 : -1));
  }

  function onBlur(event: FocusEvent<HTMLDivElement>) {
    if (!root.current?.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
      setPlayWhileFocused(false);
    }
  }

  return (
    <div
      ref={root}
      className="relative min-w-0 text-foreground"
      role="region"
      aria-roledescription="carousel"
      aria-label="Zonepang product showcase"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={onBlur}
    >
      <div className="mb-5 flex items-center justify-between border-t border-border pt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground-secondary sm:text-[10px]">
        <span>Selected interfaces / Zonepang</span>
        <span className="flex items-center gap-2"><span aria-hidden="true" className={cn("h-1 w-1 rounded-full", isPlaying ? "bg-terminal" : "bg-border-strong")} />{isPlaying ? "Auto / 4.5s" : "Paused"}</span>
      </div>
      <div className="relative pb-4 pr-3 sm:pb-6 sm:pr-6">
        <div aria-hidden="true" className="absolute bottom-0 left-5 right-0 top-5 border border-border bg-surface/60 sm:left-8 sm:top-8" />
      <div
        className="relative overflow-hidden border border-border-strong bg-background p-1 shadow-[0_8px_24px_-16px_rgba(28,27,24,0.22)] sm:p-1.5"
        onTouchStart={(event) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => { touchStart.current = null; }}
      >
        <div className="relative aspect-[1.88] overflow-hidden bg-background sm:aspect-[2]">
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={current.src}
              className="ecosystem-ink absolute inset-0"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, ease: EASE }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1280px) 900px, (min-width: 1024px) 65vw, 100vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>

      <div className="mb-6 mt-5 flex items-center justify-between gap-2 sm:mb-8 sm:mt-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">
          <span aria-hidden="true" className="font-display text-[48px] leading-none tracking-[-0.04em] sm:text-[64px]">{String(active + 1).padStart(2, "0")}<span className="text-accent">.</span></span>
          <div className="min-w-0">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-foreground-secondary">FIG. {String(active + 3).padStart(2, "0")} / {String(images.length).padStart(2, "0")} SCREENS</p>
            <p className="m-0 truncate font-mono text-[10px] uppercase tracking-[0.06em] sm:text-xs">{current.caption}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-0.5 sm:gap-2">
          {!reducedMotion ? (
            <button
              type="button"
              onClick={() => {
                setManualPaused((paused) => !paused);
                setPlayWhileFocused(manualPaused);
              }}
              aria-label={manualPaused ? "Play Zonepang slideshow" : "Pause Zonepang slideshow"}
              className="flex h-11 w-11 items-center justify-center text-foreground-secondary transition-colors duration-[180ms] hover:text-accent-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {manualPaused ? <Play size={16} strokeWidth={1.5} aria-hidden="true" /> : <Pause size={16} strokeWidth={1.5} aria-hidden="true" />}
            </button>
          ) : null}
          <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous Zonepang screen" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong transition-colors duration-[180ms] hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => goTo(active + 1)} aria-label="Next Zonepang screen" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong transition-colors duration-[180ms] hover:border-foreground hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4" aria-label="Zonepang platform screens">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(index)}
            aria-pressed={index === active}
            aria-label={`Show ${image.caption} screen`}
            className={cn(
              "group/slide min-w-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
          >
            <span className={cn("relative block aspect-[1.88] overflow-hidden border bg-background p-[2px] transition-[transform,opacity,border-color] duration-[320ms]", index === active ? "-translate-y-1 border-foreground opacity-100" : "border-border-strong opacity-60 group-hover/slide:-translate-y-1 group-hover/slide:opacity-100 group-focus-visible/slide:opacity-100")}>
              <span className="ecosystem-ink relative block h-full w-full overflow-hidden">
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 180px, 24vw" className="object-contain" />
              </span>
            </span>
            <span className="relative mt-3 block h-px overflow-hidden bg-border" aria-hidden="true">
              {index === active ? <motion.span key={`${active}-${isPlaying}`} className="absolute inset-0 origin-left bg-accent" initial={{ scaleX: isPlaying ? 0 : 1 }} animate={{ scaleX: 1 }} transition={{ duration: isPlaying ? SLIDE_DURATION / 1000 : 0, ease: "linear" }} /> : null}
            </span>
            <span className="mt-2 flex items-baseline gap-2 font-mono text-[9px] uppercase tracking-[0.08em] text-foreground-secondary sm:text-[10px]">
              <span className={index === active ? "text-accent-text" : "text-foreground-secondary"}>{String(index + 1).padStart(2, "0")}</span>
              <span className="hidden truncate sm:inline">{image.caption}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
