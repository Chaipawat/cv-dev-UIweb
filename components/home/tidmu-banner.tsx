import Reveal from "@/components/shared/reveal";
import ShotPlaceholder from "@/components/shared/shot-placeholder";
import { PROJECTS } from "@/data/projects";

const tidmu = PROJECTS.find((p) => p.id === "tidmu")!;

export default function TidmuBanner() {
  return (
    <Reveal as="section">
      <div className="relative flex h-[480px] items-center justify-center overflow-hidden bg-foreground md:h-[520px]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#191919_0px,#191919_10px,#1E1E1E_10px,#1E1E1E_20px)]" />
        <div className="relative flex items-center gap-5">
          <ShotPlaceholder
            label={tidmu.shot}
            dark
            className="h-[360px] w-[180px] rounded-[26px] border border-[#2E2E2E]"
          />
          <ShotPlaceholder
            label="Prediction Flow"
            dark
            className="h-[300px] w-[180px] rounded-[26px] border border-[#2E2E2E]"
          />
        </div>
        <div className="absolute bottom-9 left-6 text-cream sm:left-10">
          <div className="font-mono text-xs tracking-[0.18em] text-foreground-subtle">
            {tidmu.meta}
          </div>
          <h3 className="mt-3.5 font-display text-[clamp(30px,3.4vw,48px)] font-normal tracking-[-0.03em]">
            {tidmu.title}
          </h3>
          <p className="mt-3 max-w-[44ch] text-[#B5B0A7]">{tidmu.desc}</p>
        </div>
        <div className="absolute bottom-9 right-6 hidden font-mono text-xs tracking-[0.06em] text-foreground-subtle sm:right-10 lg:block">
          {tidmu.tech.join(" / ")}
        </div>
      </div>
    </Reveal>
  );
}
