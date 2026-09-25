import Image from "next/image";
import MediaCaption from "@/components/project/media/media-caption";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  image: ProjectImage;
  /** Hide the caption row (e.g. when the frame is a layer inside a composition). */
  bare?: boolean;
  /** Preload as the page's LCP image. */
  preload?: boolean;
  /** Softly rounded corners instead of the default hairline square. */
  rounded?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Desktop/admin screenshot in a hairline browser chrome. The image keeps its
 * intrinsic ratio (width/height from the manifest) unless `image.focus` asks
 * for a 2:1 crop.
 */
export default function BrowserFrame({
  image,
  bare,
  preload,
  rounded,
  sizes = "(min-width: 1340px) 1100px, (min-width: 768px) 85vw, 100vw",
  className,
}: BrowserFrameProps) {
  return (
    <figure className={cn("m-0 min-w-0", className)}>
      <div className={cn("overflow-hidden border border-border-strong bg-surface", rounded && "rounded-[8px]")}>
        <div className="flex h-7 items-center gap-3 border-b border-border px-3" aria-hidden="true">
          <span className="flex gap-1">
            <span className="block h-[5px] w-[5px] bg-border-strong" />
            <span className="block h-[5px] w-[5px] bg-border-strong" />
            <span className="block h-[5px] w-[5px] bg-border-strong" />
          </span>
          <span className="min-w-0 flex-1 truncate font-mono text-[10px] tracking-[0.08em] text-foreground-secondary">
            {image.urlLabel ?? image.caption ?? ""}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground-secondary">
            {image.category}
          </span>
        </div>
        <div className={cn("project-ink", image.focus && "relative aspect-[2/1] overflow-hidden")}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            preload={preload}
            className={cn("block w-full", image.focus ? "absolute inset-0 h-full object-cover" : "h-auto")}
            style={image.focus ? { objectPosition: image.focus } : undefined}
          />
        </div>
      </div>
      {bare ? null : <MediaCaption label={image.caption} />}
    </figure>
  );
}
