import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";
import LetsConnect from "@/components/contact/lets-connect";
import ContactDirect from "@/components/contact/contact-direct";
import ContactQuote from "@/components/contact/contact-quote";

export const metadata: Metadata = {
  title: "Contact — Chaipawat Jatuphattaranun",
  description: "Open to frontend opportunities, interesting projects, and collaborations.",
};

export default function ContactPage() {
  return (
    <main>
      <LetsConnect />
      <PageContainer className="pb-[120px]">
        <Reveal as="section">
          <div className="flex flex-col gap-6 pt-[72px]">
            <ContactDirect />
            <ContactQuote />
          </div>
        </Reveal>
      </PageContainer>
    </main>
  );
}
