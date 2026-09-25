import Image from "next/image";
import { getAvailableImages } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

/** Large product overview above two supporting learning-system screens. */
export default function DevPathComposition({ project }: { project: Project }) {
  const images = getAvailableImages(project).filter((image) => image.category === "web").slice(0, 3);
  if (images.length < 2) return null;

  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:grid-cols-[1.15fr_1fr] sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 lg:gap-y-12">
      {images.map((image, index) => (
        <figure
          key={image.src}
          data-reveal="fade"
          className={cn("m-0 min-w-0", index === 0 && "sm:col-span-2")}
        >
          <div className="overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px]">
            <div className="overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={index === 0
                  ? "(min-width: 1440px) 1320px, 94vw"
                  : "(min-width: 1440px) 700px, (min-width: 640px) 50vw, 94vw"}
                className="block h-auto w-full transition-transform duration-[550ms] ease-[var(--ease-editorial)] hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-foreground-secondary lg:text-[10px]">
            FIG. {String(index + 13).padStart(2, "0")} — {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
