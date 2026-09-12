import type { Metadata } from "next";
import PageContainer from "@/components/layout/page-container";
import Reveal from "@/components/shared/reveal";
import LetsConnect from "@/components/contact/lets-connect";
import ContactDirect from "@/components/contact/contact-direct";
import ContactForm from "@/components/contact/contact-form";

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
          <div className="grid grid-cols-1 items-start gap-[clamp(32px,6vw,80px)] pt-[72px] lg:grid-cols-2">
            <ContactDirect />
            <ContactForm />
          </div>
        </Reveal>
      </PageContainer>
    </main>
  );
}
