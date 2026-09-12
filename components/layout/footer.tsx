import PageContainer from "@/components/layout/page-container";
import { portfolioData } from "@/data/portfolio";

const { profile } = portfolioData;

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <PageContainer className="flex flex-wrap items-center justify-between gap-4 py-[26px] font-mono text-[11px] tracking-[0.14em] text-foreground-muted">
        <span>{profile.displayName.toUpperCase()}</span>
        <span>
          {profile.title.split("/")[0].trim().toUpperCase()} — {new Date().getFullYear()}
        </span>
      </PageContainer>
    </footer>
  );
}
