import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";
import LetsConnect from "@/components/contact/lets-connect";
import ContactQuote from "@/components/contact/contact-quote";

export const metadata: Metadata = {
  title: "Contact — Chaipawat Jatuphattaranun",
  description: "Open to frontend opportunities, interesting projects, and collaborations.",
};

export default function ContactPage() {
  return (
    <main>
      <LetsConnect />
      <PageContainer className="pb-[clamp(96px,12vw,160px)] pt-[clamp(72px,10vw,140px)]">
        <Reveal>
          <ContactQuote />
        </Reveal>
      </PageContainer>
    </main>
  );
}
