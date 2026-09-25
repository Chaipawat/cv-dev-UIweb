import Link from "next/link";
import PageContainer from "@/components/layout/page-container";
import MotionScope from "@/components/motion/motion-scope";
import { CONTACT_LINKS } from "@/data/contact";
import { portfolio } from "@/data/portfolio";

const { profile } = portfolio;

const CTA_KEYS = ["EMAIL", "LINKEDIN", "GITHUB"];
const LINKS = CONTACT_LINKS.filter((c) => CTA_KEYS.includes(c.key) && c.href);

const LINE = "block font-display uppercase leading-[0.84] tracking-[-0.01em] text-[clamp(38px,13vw,200px)]";

export default function ContactCta() {
  return (
    <section aria-labelledby="contact-cta-heading" className="border-t border-border">
      <MotionScope effect="cta">
      <PageContainer className="pb-[clamp(56px,8vw,112px)] pt-[clamp(72px,10vw,150px)]">
        <div className="font-mono text-[11px] tracking-[0.2em] text-foreground-secondary">06 — CONTACT</div>

        <h2 id="contact-cta-heading" className="m-0 mt-[clamp(20px,3vw,40px)] text-foreground">
          <span data-m="cta-line" className={LINE}>
            Let&apos;s
          </span>
          <span data-m="cta-line" className={`${LINE} pl-[clamp(24px,10vw,180px)]`}>
            Build
          </span>
          <span data-m="cta-line" data-origin="right" className={`${LINE} text-right`}>
            Something<span className="text-accent">.</span>
          </span>
        </h2>

        <div className="mt-[clamp(40px,6vw,80px)] grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="m-0 max-w-[340px] text-[15.5px] leading-[1.6] text-foreground-secondary">
              {profile.availability.text} — frontend, software development and product work.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block border-b border-border-strong pb-1 font-mono text-[11px] tracking-[0.2em] text-foreground-secondary transition-colors duration-[180ms] hover:border-accent hover:text-accent-text"
            >
              ALL CONTACT DETAILS →
            </Link>
          </div>

          <ul className="m-0 list-none border-t border-border p-0 md:col-span-7 md:col-start-6">
            {LINKS.map((c) => (
              <li key={c.key} data-reveal="fade" className="border-b border-border">
                <a
                  href={c.href}
                  {...(c.href!.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-[clamp(16px,2vw,24px)] sm:grid-cols-[120px_1fr_auto]"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-foreground-secondary">{c.key}</span>
                  <span className="col-span-2 row-start-2 min-w-0 break-all font-body text-[clamp(20px,2.4vw,32px)] font-medium tracking-[-0.03em] text-foreground transition-colors duration-[180ms] group-hover:text-accent-text sm:col-span-1 sm:row-start-auto">
                    {c.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-start-2 row-start-1 text-lg text-foreground-muted transition-[color,transform] duration-[320ms] group-hover:translate-x-1 group-hover:text-accent-text sm:col-start-auto sm:row-start-auto"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
      </MotionScope>
    </section>
  );
}
