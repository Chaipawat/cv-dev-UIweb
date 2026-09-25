import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface EditorialButtonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export default function EditorialButton<T extends ElementType = "button">({
  variant = "primary",
  className,
  children,
  as,
  ...rest
}: EditorialButtonProps & { as?: T } & Omit<ComponentPropsWithoutRef<T>, keyof EditorialButtonProps | "as">) {
  // Narrowed to what we pass so TS doesn't intersect the props of every
  // intrinsic element (incl. the R3F ones), which collapses to `never`.
  const Component = (as || "button") as ElementType<{ className?: string; children?: React.ReactNode }>;
  return (
    <Component
      className={cn(
        "inline-flex items-center gap-3 rounded-md px-[22px] py-[14px] font-display text-sm font-medium transition-colors duration-[180ms]",
        variant === "primary"
          ? "bg-foreground text-background hover:bg-accent"
          : "border border-border text-foreground hover:border-accent hover:text-accent",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
