import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("mx-auto max-w-[1340px] px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
