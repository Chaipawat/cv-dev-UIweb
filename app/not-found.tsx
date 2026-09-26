import type { Metadata } from "next";
import type { CSSProperties } from "react";
import PageContainer from "@/components/layout/page-container";
import ColaZero from "@/components/not-found/cola-zero";
import LostShell from "@/components/not-found/lost-shell";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "This page left early for happy hour.",
};

export default function NotFound() {
  return (
    <main>
      <PageContainer className="pb-[clamp(96px,12vw,160px)] pt-[132px]">
        <section aria-labelledby="not-found-heading">
          <div
            data-intro="rise"
            className="flex flex-wrap items-baseline justify-between gap-5 border-b border-border pb-[26px] font-mono text-[11px] tracking-[0.2em] text-foreground-secondary"
          >
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              ERROR 404 — NOT FOUND
            </span>
            <span>EXIT CODE 127</span>
          </div>

          <h1 id="not-found-heading" className="sr-only">
            404 — Page not found
          </h1>

          <div className="mt-[clamp(28px,5vw,64px)] flex items-end justify-between gap-10">
            <div
              aria-hidden="true"
              className="flex select-none items-baseline font-display text-[clamp(150px,34vw,460px)] uppercase leading-[0.8] tracking-[-0.02em] text-foreground"
            >
              <span data-intro="clip" style={{ "--i": 0 } as CSSProperties} className="block">
                4
              </span>
              <ColaZero />
              <span data-intro="clip" style={{ "--i": 2 } as CSSProperties} className="block">
                4
              </span>
            </div>

            {/* Order ticket for the missing page; fills the space beside the digits on wide screens. */}
            <dl
              data-intro="rise"
              style={{ "--i": 3 } as CSSProperties}
              className="m-0 hidden w-[240px] shrink-0 font-mono text-[11px] tracking-[0.16em] text-foreground-secondary lg:block"
            >
              {[
                ["STATUS", "404"],
                ["WHEREABOUTS", "HAPPY HOUR"],
                ["SERVED AT", "4°C"],
                ["BACK IN", "ONE ROUND"],
              ].map(([term, detail]) => (
                <div key={term} className="flex justify-between gap-4 border-b border-border py-3 first:border-t">
                  <dt>{term}</dt>
                  <dd className="m-0 text-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-[clamp(32px,5vw,64px)] grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <div data-intro="rise" style={{ "--i": 1 } as CSSProperties} className="md:col-span-5">
              <p className="m-0 font-serif text-[clamp(30px,3.8vw,54px)] italic leading-[1.04] tracking-[-0.018em] text-foreground">
                This page left early —
                <br />
                <span className="text-accent">for happy hour.</span>
              </p>
              <p className="m-0 mt-6 max-w-[420px] text-base leading-[1.6] text-foreground-secondary">
                The link may be broken, or the page moved somewhere else. Ask the shell for directions, or pick a
                directory that actually exists.
              </p>
            </div>
            <div data-intro="rise" style={{ "--i": 2 } as CSSProperties} className="md:col-span-7">
              <LostShell />
            </div>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
