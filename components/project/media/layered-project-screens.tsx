import Image from "next/image";
import BrowserFrame from "@/components/project/media/browser-frame";
import PhoneFrame from "@/components/project/media/phone-frame";
import type { ProjectImage } from "@/types/portfolio";
import { cn } from "@/lib/utils";

interface LayeredProjectScreensProps {
  base: ProjectImage;
  /** Up to two phone screens staggered over the right edge of the base. */
  layers?: ProjectImage[];
  /** Landscape evidence (e.g. an extension card) tucked under the base's corner. */
  inset?: ProjectImage;
  /** Preload the base as the page's LCP image. */
  preload?: boolean;
  className?: string;
}

function FigureLabel({ image }: { image: ProjectImage }) {
  if (!image.caption) return null;
  return (
    <span className="fig-label mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-secondary">
      {image.caption}
    </span>
  );
}

/**
 * Editorial lead composition: an oversized desktop/admin view anchors the
 * left while phone captures stagger over it at different scales and heights.
 * Below lg this resolves to a readable stacked sequence.
 */
export default function LayeredProjectScreens({ base, layers = [], inset, preload, className }: LayeredProjectScreensProps) {
  const [mobileOne, mobileTwo] = layers;

  if (!mobileOne) {
    return (
      <figure className={cn("m-0 min-w-0", className)}>
        <div className={inset ? "sm:w-[92%]" : undefined}>
          <BrowserFrame image={base} bare preload={preload} />
          <FigureLabel image={base} />
        </div>
        {inset ? (
          <div className="relative z-10 ml-auto mt-6 w-[78%] max-w-[360px] sm:mt-4 sm:w-[38%] lg:-mt-12">
            <div className="overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px]">
              <Image
                src={inset.src}
                alt={inset.alt}
                width={inset.width}
                height={inset.height}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 35vw, 78vw"
                className="block h-auto w-full"
              />
            </div>
            <FigureLabel image={inset} />
          </div>
        ) : null}
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
            preload={preload}
            sizes="(min-width: 1340px) 940px, (min-width: 1024px) 69vw, 100vw"
          />
          <FigureLabel image={base} />
        </div>

        <div className="relative z-10 w-[46%] self-end md:w-[30%] lg:absolute lg:right-[3%] lg:top-[3%] lg:w-[21%]">
          <PhoneFrame image={mobileOne} bare sizes="(min-width: 1024px) 22vw, 38vw" />
          <FigureLabel image={mobileOne} />
        </div>

        {mobileTwo ? (
          <div className="relative z-20 w-[36%] self-center md:w-[23%] lg:absolute lg:bottom-[4%] lg:left-[58%] lg:w-[17%]">
            <PhoneFrame image={mobileTwo} bare sizes="(min-width: 1024px) 18vw, 32vw" />
            <FigureLabel image={mobileTwo} />
          </div>
        ) : null}
      </div>
    </figure>
  );
}
