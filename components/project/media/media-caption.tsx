import { cn } from "@/lib/utils";

interface MediaCaptionProps {
  /** Figure index, e.g. "01". */
  index?: string;
  /** Short mono label, e.g. "LIFF" or "ADMIN". */
  label?: string;
  caption?: string;
  className?: string;
}

/** Editorial figure caption: "FIG. 01 — ADMIN" on a hairline, caption text beside it. */
export default function MediaCaption({ index, label, caption, className }: MediaCaptionProps) {
  if (!index && !label && !caption) return null;
  return (
    <figcaption
      className={cn(
        "mt-3 flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-border pt-2.5",
        className
      )}
    >
      {index || label ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-muted">
          {index ? `FIG. ${index}` : null}
          {index && label ? " — " : null}
          {label}
        </span>
      ) : null}
      {caption ? <span className="min-w-0 text-[13px] leading-snug text-foreground-secondary">{caption}</span> : null}
    </figcaption>
  );
}
