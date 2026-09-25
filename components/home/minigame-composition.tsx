import Image from "next/image";
import { getAvailableImages } from "@/lib/project-media";
import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export default function MiniGameComposition({ project }: { project: Project }) {
  const images = getAvailableImages(project).filter((image) => image.category === "mobile").slice(0, 2);
  if (images.length !== 2) return null;

  return (
    <div className="mt-8 grid min-w-0 grid-cols-1 items-start gap-8 sm:grid-cols-[1.3fr_1fr] sm:gap-5 lg:mt-10 lg:gap-7">
      {images.map((image, index) => (
        <figure
          key={image.src}
          data-reveal="fade"
          className={cn(
            "m-0 min-w-0 sm:w-full sm:max-w-none",
            index === 0
              ? "w-[86%] max-w-[320px] justify-self-start"
              : "w-[68%] max-w-[250px] justify-self-end sm:mt-12 lg:mt-24",
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
                  ? "(min-width: 1280px) 280px, (min-width: 768px) 24vw, (min-width: 640px) 54vw, 86vw"
                  : "(min-width: 1280px) 215px, (min-width: 768px) 19vw, (min-width: 640px) 42vw, 68vw"}
                className="block h-auto w-full saturate-[0.97] transition-[filter,transform] duration-[550ms] ease-[var(--ease-editorial)] hover:scale-[1.01] hover:saturate-100 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-foreground-secondary lg:text-[10px]">
            FIG. {String(index + 9).padStart(2, "0")} — {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
