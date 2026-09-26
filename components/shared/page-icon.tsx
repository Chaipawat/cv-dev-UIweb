import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageIconProps {
  icon: LucideIcon;
  className?: string;
}

/** A restrained route marker: one thin-line glyph, aligned with page metadata. */
export default function PageIcon({ icon: Icon, className }: PageIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center border border-border-strong text-accent-text",
        className,
      )}
    >
      <Icon size={14} strokeWidth={1.6} />
    </span>
  );
}
