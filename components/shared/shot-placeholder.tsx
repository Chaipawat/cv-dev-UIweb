"use client";

import { cn } from "@/lib/utils";
import { SHOT_ENTER_EVENT, SHOT_LEAVE_EVENT } from "@/components/shared/cursor-tag";

interface ShotPlaceholderProps {
  label: string;
  className?: string;
  dark?: boolean;
}

/**
 * Neutral visual placeholder for a project screenshot, matching the design's
 * proportions. Swap for a real next/image once screenshots are available —
 * see AGENTS.md "Showcase" guidance on labeling placeholders.
 */
export default function ShotPlaceholder({ label, className, dark }: ShotPlaceholderProps) {
  return (
    <div
      data-shot={label}
      onMouseEnter={() => window.dispatchEvent(new CustomEvent(SHOT_ENTER_EVENT, { detail: label }))}
      onMouseLeave={() => window.dispatchEvent(new Event(SHOT_LEAVE_EVENT))}
      className={cn(
        "flex items-center justify-center bg-[repeating-linear-gradient(135deg,#EEECE5_0px,#EEECE5_8px,#F5F3ED_8px,#F5F3ED_16px)]",
        dark &&
          "bg-[repeating-linear-gradient(135deg,#191919_0px,#191919_10px,#1E1E1E_10px,#1E1E1E_20px)]",
        className
      )}
    >
      <span
        className={cn(
          "rounded-md border border-border bg-surface px-3 py-[7px] font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-subtle",
          dark && "border-[#2E2E2E] bg-[#202020] text-[#7A756C]"
        )}
      >
        {label}
      </span>
    </div>
  );
}
