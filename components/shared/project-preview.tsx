import type { EvidenceVariant } from "@/data/showcase";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  variant: EvidenceVariant;
  steps?: string[];
  className?: string;
  children?: React.ReactNode;
}

function PanelMock() {
  return (
    <div className="h-full overflow-hidden rounded-md border border-border bg-surface-elevated">
      <div className="flex h-6 items-center gap-1.5 border-b border-border px-3">
        <span className="block h-1.5 w-1.5 rounded-full bg-border" />
        <span className="block h-1.5 w-1.5 rounded-full bg-border" />
        <span className="ml-2 h-[9px] w-24 max-w-[45%] rounded-sm bg-[#1a1a1a]" />
      </div>
      <div className="grid h-[calc(100%-24px)] grid-cols-[56px_1fr]">
        <div className="flex flex-col gap-2 border-r border-border p-2.5">
          <span className="block h-1.5 rounded-sm bg-accent/70" />
          <span className="block h-1.5 rounded-sm bg-[#1a1a1a]" />
          <span className="block h-1.5 rounded-sm bg-[#1a1a1a]" />
          <span className="block h-1.5 w-2/3 rounded-sm bg-[#1a1a1a]" />
        </div>
        <div className="flex flex-col gap-2.5 p-3">
          <div className="flex gap-2">
            <span className="h-8 flex-1 rounded-md border border-border" />
            <span className="h-8 flex-1 rounded-md border border-border" />
            <span className="h-8 flex-1 rounded-md border border-accent-border bg-accent-soft" />
          </div>
          <span className="h-14 rounded-md border border-border" />
        </div>
      </div>
    </div>
  );
}

function DeviceMock() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex h-full w-[46%] max-w-[180px] flex-col gap-2 rounded-2xl border border-border-strong bg-surface-elevated p-3">
        <span className="mx-auto block h-1 w-8 flex-none rounded-full bg-border" />
        <span className="block flex-[2] rounded-md border border-accent-border bg-accent-soft" />
        <span className="block h-2 w-[70%] flex-none rounded-sm bg-border" />
        <span className="block h-2 w-[44%] flex-none rounded-sm bg-[#1a1a1a]" />
        <span className="block flex-1 rounded-sm border border-border" />
      </div>
    </div>
  );
}

function FlowMock({ steps = [] }: { steps?: string[] }) {
  return (
    <ol className="flex h-full flex-col justify-center gap-2.5">
      {steps.map((step) => (
        <li key={step} className="flex items-center gap-3">
          <span className="block h-[5px] w-[5px] flex-none rounded-full bg-accent" aria-hidden="true" />
          <span className="flex-1 border-b border-border pb-1.5 font-mono text-[11.5px] text-foreground">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

function AbstractMock() {
  const bars = [
    { w: "48%", tone: "bg-accent/65" },
    { w: "86%", tone: "bg-[#1c1c1c]" },
    { w: "68%", tone: "bg-[#1c1c1c]" },
    { w: "58%", tone: "bg-[#2a2a2a]" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-[11px]">
      {bars.map((bar, i) => (
        <span
          key={i}
          className={cn("block rounded-sm", i === 0 ? "h-2.5" : "h-2", bar.tone)}
          style={{ width: bar.w }}
        />
      ))}
    </div>
  );
}

export default function ProjectPreview({ variant, steps, className, children }: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        "relative flex h-[168px] flex-col justify-center overflow-hidden rounded-lg border border-border bg-surface p-4",
        className
      )}
    >
      {variant === "panel" && (
        <div aria-hidden="true" className="h-full">
          <PanelMock />
        </div>
      )}
      {variant === "device" && (
        <div aria-hidden="true" className="h-full">
          <DeviceMock />
        </div>
      )}
      {variant === "flow" && <FlowMock steps={steps} />}
      {variant === "abstract" && (
        <div aria-hidden="true" className="h-full">
          <AbstractMock />
        </div>
      )}
      {children}
    </div>
  );
}
