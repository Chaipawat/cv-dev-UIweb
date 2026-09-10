import PageContainer from "@/components/layout/page-container";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <PageContainer className="flex flex-wrap justify-between gap-10 py-[60px]">
        <div>
          <div className="font-display text-2xl tracking-[-0.02em]">
            Chaipawat Jatuphattaranun
          </div>
          <div className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-foreground-subtle">
            Software Developer · Thailand
          </div>
        </div>

        <div className="flex flex-wrap gap-8 text-[15px]">
          <a
            href="https://github.com/Chaipawat"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/chaipawat-jatuphattaranun-151429434/"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-accent"
          >
            LinkedIn
          </a>
          <a href="mailto:chaipawat22247@gmail.com" className="text-foreground hover:text-accent">
            Email
          </a>
        </div>

        <div className="font-mono text-xs leading-[1.9] text-foreground-subtle">
          <div>C[J] © {new Date().getFullYear()}</div>
          <div>Built with Next.js and a reasonable amount of coffee.</div>
        </div>
      </PageContainer>
    </footer>
  );
}
