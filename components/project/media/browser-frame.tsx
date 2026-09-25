import Image from "next/image";
import MediaCaption from "@/components/project/media/media-caption";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  image: ProjectImage;
  index?: string;
  label?: string;
  /** Hide the caption row (e.g. when the frame is a layer inside a composition). */
  bare?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Desktop/admin screenshot in a hairline browser chrome. The image keeps its
 * intrinsic ratio (width/height from the manifest) — nothing is cropped.
 */
export default function BrowserFrame({
  image,
  index,
  label,
  bare,
  priority,
  sizes = "(min-width: 1340px) 1100px, (min-width: 768px) 85vw, 100vw",
  className,
}: BrowserFrameProps) {
  return (
    <figure className={cn("m-0 min-w-0", className)}>
      <div className="overflow-hidden border border-border-strong bg-surface">
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
        <div className="ink-duotone">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className="block h-auto w-full"
          />
        </div>
      </div>
      {bare ? null : <MediaCaption index={index} label={label ?? image.category} caption={image.caption} />}
    </figure>
  );
}
