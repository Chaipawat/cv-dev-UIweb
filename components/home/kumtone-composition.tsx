import Image from "next/image";
import { getAvailableImages } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

/** Two main photographic UI plates. */
export default function KumtoneComposition({ project }: { project: Project }) {
  const available = getAvailableImages(project);
  const images = available.filter((image) => image.category === "mobile").slice(0, 2);
  if (images.length !== 2) return null;

  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-10 py-4 sm:grid-cols-[1.16fr_1fr] sm:gap-6 md:gap-5 lg:gap-9">
      {images.map((image, index) => (
        <figure
          key={image.src}
          data-reveal="fade"
          className={cn(
            "m-0 min-w-0 sm:w-full sm:max-w-none",
            index === 0
              ? "w-[84%] max-w-[320px] justify-self-start sm:mt-10 lg:mt-20"
              : "w-[74%] max-w-[280px] justify-self-end",
          )}
        >
          <div className="overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px]">
            <div className="overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={index === 0
                  ? "(min-width: 1280px) 300px, (min-width: 768px) 25vw, (min-width: 640px) 50vw, 84vw"
                  : "(min-width: 1280px) 260px, (min-width: 768px) 22vw, (min-width: 640px) 43vw, 74vw"}
                className="block h-auto w-full saturate-[0.96] contrast-[0.99] transition-[filter,transform] duration-[550ms] ease-[var(--ease-editorial)] hover:scale-[1.01] hover:saturate-100 hover:contrast-100 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-foreground-secondary lg:text-[10px]">
            FIG. {String(index + 7).padStart(2, "0")} — {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Small release evidence placed below the project stack, not in the UI grid. */
export function KumtoneStoreEvidence({ project }: { project: Project }) {
  const storeImage = getAvailableImages(project).find((image) => image.category === "detail");
  if (!storeImage) return null;

  return (
        <figure data-reveal="fade" className="m-0 mt-5 flex items-start gap-4 border-t border-border pt-5">
          <div className="w-[120px] shrink-0 overflow-hidden rounded-[2px] border border-border-strong bg-background p-[3px] lg:w-[136px]">
            <Image
              src={storeImage.src}
              alt={storeImage.alt}
              width={storeImage.width}
              height={storeImage.height}
              sizes="(min-width: 1024px) 136px, 120px"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="pt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-foreground-secondary">
            <span className="block">FIG. 09</span>
            <span className="mt-2 block">{storeImage.caption}</span>
          </figcaption>
        </figure>
  );
}
