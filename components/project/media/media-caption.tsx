import { cn } from "@/lib/utils";

interface MediaCaptionProps {
  /** Short screen name, e.g. "Admin Dashboard"; set in mono caps after the figure number. */
  label?: string;
  className?: string;
}

/**
 * Editorial figure caption on a hairline: "FIG. 01 — ADMIN DASHBOARD". The
 * number comes from the page-wide CSS counter (`.fig-label` in globals.css).
 */
export default function MediaCaption({ label, className }: MediaCaptionProps) {
  if (!label) return null;
  return (
    <figcaption
      className={cn(
        "fig-label mt-3 border-t border-border pt-2.5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-foreground-secondary",
        className
      )}
    >
      {label}
    </figcaption>
  );
}
