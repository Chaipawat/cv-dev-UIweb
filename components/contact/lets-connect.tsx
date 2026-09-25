import PageContainer from "@/components/layout/page-container";
import ContactList from "@/components/shared/contact-list";
import Reveal from "@/components/shared/reveal";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

export default function LetsConnect() {
  return (
    <PageContainer className="pt-[132px]">
      <Reveal as="section" className="flex flex-col">
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">
          <span>PAGE 05 — CONTACT</span>
          <span>{profile.location.toUpperCase()}</span>
        </div>

        <h1 className="m-0 mt-12 font-display text-[clamp(50px,9.6vw,142px)] uppercase leading-[0.9] tracking-[-0.01em] text-foreground">
          Let&apos;s{" "}
          <span className="font-serif font-normal normal-case italic tracking-[-0.02em] text-accent">Connect</span>
        </h1>

        <div className="mt-[clamp(40px,6vw,80px)] grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="m-0 max-w-[380px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-foreground-secondary">
              Open to frontend opportunities, interesting projects, and collaborations.
            </p>
            {profile.availability.openToWork ? (
              <p className="m-0 mt-6 border-t border-border pt-4 font-mono text-[12px] leading-[1.7] tracking-[0.02em] text-foreground-secondary">
                <span aria-hidden="true">
                  <span className="text-terminal">~/{profile.nickname.toLowerCase()}</span>
                  <span className="mx-[0.6em]">$</span>
                  <span className="text-foreground">status</span>
                  <br />
                </span>
                <span className="inline-flex items-center gap-2 text-terminal">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-terminal" />
                  {profile.availability.text.toLowerCase()}
                </span>
              </p>
            ) : null}
          </div>

          <ContactList className="md:col-span-7 md:col-start-6" />
        </div>
      </Reveal>
    </PageContainer>
  );
}
