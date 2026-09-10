import Reveal from "@/components/shared/reveal";
import ShotPlaceholder from "@/components/shared/shot-placeholder";

export default function TidmuBanner() {
  return (
    <Reveal as="section" className="pt-10">
      <div className="relative flex h-[520px] items-center justify-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#191919_0px,#191919_10px,#1E1E1E_10px,#1E1E1E_20px)]" />
        <div className="relative flex items-center gap-5">
          <ShotPlaceholder
            label="TIDMU Mobile UI"
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
            03 / 2025 — 2026 / MOBILE · AI
          </div>
          <h3 className="mt-3.5 font-display text-[clamp(30px,3.4vw,48px)] font-normal tracking-[-0.03em]">
            TIDMU
          </h3>
          <p className="mt-3 max-w-[44ch] text-[#B5B0A7]">
            AI-powered fortune application with Android and iOS interfaces and personalized
            prediction flows.
          </p>
        </div>
        <div className="absolute bottom-9 right-6 hidden font-mono text-xs tracking-[0.06em] text-foreground-subtle sm:right-10 lg:block">
          React Native / TypeScript / AI Integration
        </div>
      </div>
    </Reveal>
  );
}
