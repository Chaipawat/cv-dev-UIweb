import type { ReactNode } from "react";

interface SectionLabelProps {
  index: string;
  label: string;
  trailing?: ReactNode;
  className?: string;
}

export default function SectionLabel({ index, label, trailing, className }: SectionLabelProps) {
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-[18px] font-mono text-[11px] tracking-[0.2em] text-foreground-muted ${className ?? ""}`}
    >
      <span>
        {index} — {label}
      </span>
      {trailing ? <span>{trailing}</span> : null}
    </div>
  );
}
