import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";

export default function ContactCta() {
  return (
    <PageContainer className="pb-[140px]">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-12 border-t border-border pt-20">
          <h2 className="m-0 max-w-[12ch] font-display text-[clamp(42px,6.4vw,92px)] font-normal leading-[0.98] tracking-[-0.04em]">
            Have a product worth building?
          </h2>
          <div className="flex flex-col items-start gap-[22px]">
            <div className="font-mono text-xs uppercase leading-[2] tracking-[0.16em] text-foreground-subtle">
              Available for
              <br />
              Frontend · Mobile · Full-stack
            </div>
            <Link
              href="/contact"
              className="group flex items-center gap-2.5 rounded-full bg-accent px-[30px] py-[17px] text-base font-medium text-white transition-[background,gap] duration-[250ms] hover:gap-4 hover:bg-accent-hover"
            >
              <span>Let&apos;s Talk</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
