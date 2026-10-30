import type { Metadata } from "next";
import Link from "next/link";
import { Button, Eyebrow, Glow } from "@/components/site/primitives";
import { NAV_ITEMS } from "@/data/nav";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "This page left early for happy hour.",
};

export default function NotFound() {
  return (
    <section className="nf">
      <Glow tone="accent" />
      <div className="wrap">
        <Eyebrow className="reveal">Error 404 — Not found</Eyebrow>
        <div className="reveal" style={{ marginTop: 28 }}>
          <h1 className="nf__num" aria-label="404 — Page not found">
            4<span className="clay clay--sphere nf__zero float" aria-hidden="true" />4
          </h1>
        </div>
        <p className="display nf__title reveal">
          This page left early — <span className="serif-it">for happy hour.</span>
        </p>
        <p className="lead reveal">
          The link may be broken, or the page moved somewhere else. Ask the shell for directions, or pick a directory that actually exists.
        </p>
        <div className="hero__ctas reveal" style={{ justifyContent: "center" }}>
          <Button href="/">Back home</Button>
          <Button href="/showcase" variant="ghost">
            See showcase
          </Button>
        </div>
        <div className="win nf__term reveal">
          <div className="win__bar">
            <i />
            <i />
            <i />
            <span className="win__url">zsh — lost-and-found</span>
          </div>
          <div className="win__body">
            <div>
              <span className="p">guest@ryu ~</span> cd /_not-found
            </div>
            <div>zsh: no such file or directory: /_not-found</div>
            <div>
              <span className="p">guest@ryu ~</span> ls ~
            </div>
            <div className="nf__dirs">
              {NAV_ITEMS.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label.toLowerCase()}
                </Link>
              ))}
            </div>
            <div>Type “help”, or click a directory.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
