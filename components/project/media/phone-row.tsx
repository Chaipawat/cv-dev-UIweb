import PhoneFrame from "@/components/project/media/phone-frame";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

// Static class names so Tailwind can see them. Width caps keep two tall
// captures from blowing up to full-bleed height on wide screens.
const LAYOUT: Record<number, string> = {
  1: "max-w-[340px]",
  2: "md:grid-cols-2 max-w-[680px]",
  3: "md:grid-cols-3 max-w-[980px]",
  4: "md:grid-cols-4",
};

interface PhoneRowProps {
  phones: ProjectImage[];
  /** Preload the first screen as the page's LCP image. */
  preload?: boolean;
  className?: string;
}

/**
 * Phone screens as a stepped editorial sequence: every other capture drops
 * lower so the row never reads as a flat grid. Two per row on phones.
 */
export default function PhoneRow({ phones, preload, className }: PhoneRowProps) {
  if (!phones.length) return null;
  const count = Math.min(phones.length, 4);
  return (
    <div
      className={cn(
        "grid w-full grid-cols-2 items-start gap-x-[clamp(14px,3vw,40px)] gap-y-10",
        LAYOUT[count],
        className
      )}
    >
      {phones.map((img, i) => (
        <PhoneFrame
          key={img.src}
          image={img}
          preload={preload && i === 0}
          sizes={`(min-width: 1340px) ${Math.round(1280 / count)}px, (min-width: 768px) ${Math.round(90 / count)}vw, 45vw`}
          className={cn(i % 2 === 1 && "mt-[14%]")}
        />
      ))}
    </div>
  );
}
