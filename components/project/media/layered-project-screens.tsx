import type { ReactNode } from "react";
import BrowserFrame from "@/components/project/media/browser-frame";
import PhoneFrame from "@/components/project/media/phone-frame";
import MediaCaption from "@/components/project/media/media-caption";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface LayeredProjectScreensProps {
  base: ProjectImage;
  layers?: ProjectImage[];
  index?: string;
  label?: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}

function FigureLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary", className)}>
      {children}
    </span>
  );
}

/**
 * A three-image editorial layout: an oversized admin view anchors the left;
 * the two LIFF captures stagger at different scales and heights. On smaller
 * screens this deliberately resolves to a readable Admin → LIFF → flow stack.
 */
export default function LayeredProjectScreens({
  base,
  layers = [],
  index,
  label,
  caption,
  priority,
  className,
}: LayeredProjectScreensProps) {
  const [mobileOne, mobileTwo] = layers;
  const captionText = caption ?? [base.caption, ...layers.map((phone) => phone.caption)].filter(Boolean).join(" / ");

  if (!mobileOne) {
    return (
      <figure className={cn("m-0 min-w-0", className)}>
        <BrowserFrame image={base} bare priority={priority} />
        <MediaCaption index={index} label={label} caption={captionText || undefined} />
      </figure>
    );
  }

  return (
    <figure className={cn("m-0 min-w-0", className)}>
      <div className="relative flex flex-col gap-7 md:gap-9 lg:block lg:min-h-[clamp(520px,44vw,700px)]">
        <div className="relative z-0 w-full lg:w-[69%]">
          <BrowserFrame
            image={base}
            bare
            priority={priority}
            sizes="(min-width: 1340px) 940px, (min-width: 1024px) 69vw, 100vw"
          />
          <FigureLabel>FIG. 01 — ADMIN DASHBOARD</FigureLabel>
        </div>

        <div className="relative z-10 w-[46%] self-end md:w-[30%] lg:absolute lg:right-[3%] lg:top-[3%] lg:w-[21%]">
          <PhoneFrame image={mobileOne} bare priority={priority} sizes="(min-width: 1024px) 22vw, 38vw" />
          <FigureLabel>FIG. 02 — LINE LIFF</FigureLabel>
        </div>

        {mobileTwo ? (
          <div className="relative z-20 w-[36%] self-center md:w-[23%] lg:absolute lg:bottom-[4%] lg:left-[58%] lg:w-[17%]">
            <PhoneFrame image={mobileTwo} bare priority={priority} sizes="(min-width: 1024px) 18vw, 32vw" />
            <FigureLabel>FIG. 03 — BOOKING FLOW</FigureLabel>
          </div>
        ) : null}
      </div>
    </figure>
  );
}
