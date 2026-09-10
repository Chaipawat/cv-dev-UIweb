"use client";

import { useEffect, useRef, useState } from "react";

export const SHOT_ENTER_EVENT = "cj:shot-enter";
export const SHOT_LEAVE_EVENT = "cj:shot-leave";

export default function CursorTag() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("VIEW");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hoverCapable) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (el) el.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
    };
    const onEnter = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setLabel(detail || "VIEW");
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener(SHOT_ENTER_EVENT, onEnter as EventListener);
    window.addEventListener(SHOT_LEAVE_EVENT, onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener(SHOT_ENTER_EVENT, onEnter as EventListener);
      window.removeEventListener(SHOT_LEAVE_EVENT, onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] rounded-full bg-accent px-[13px] py-[9px] font-mono text-[11px] tracking-[0.16em] text-white transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      [ {label} ]
    </div>
  );
}
