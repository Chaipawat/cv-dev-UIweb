import type { ReactNode } from "react";

interface SectionLabelProps {
  index: string;
  label: string;
  trailing?: ReactNode;
  /** Command after the prompt, e.g. "ls" → `~/selected-work $ ls`. */
  command?: string;
  /** Blinking cursor after the command. Use sparingly — one per page at most. */
  cursor?: boolean;
  className?: string;
}

const toPath = (label: string) => label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Section header as a terminal prompt: `01  ~/selected-work $ ls`. The prompt
 * is decoration, so assistive tech gets the plain "01 — Selected work".
 */
export default function SectionLabel({ index, label, trailing, command = "ls", cursor, className }: SectionLabelProps) {
  return (
    <div
      className={`flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-[18px] font-mono text-[11px] tracking-[0.06em] text-foreground-secondary ${className ?? ""}`}
    >
      <span>
        <span className="sr-only">
          {index} — {label}
        </span>
        <span aria-hidden="true">
          <span className="mr-3 tracking-[0.2em]">{index}</span>
          <span className="text-terminal">~/{toPath(label)}</span>
          <span className="mx-[0.6em]">$</span>
          <span className="text-foreground">{command}</span>
          {cursor ? <span className="terminal-cursor" /> : null}
        </span>
      </span>
      {trailing ? <span className="tracking-[0.2em]">{trailing}</span> : null}
    </div>
  );
}
