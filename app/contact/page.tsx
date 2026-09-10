import type { Metadata } from "next";
import ContactHero from "@/components/contact/contact-hero";
import ContactLinks from "@/components/contact/contact-links";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact — Chaipawat Jatuphattaranun",
  description: "Open to Front-end, Mobile and Full-stack opportunities. Based in Chonburi, Thailand.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactLinks />
      <ContactForm />
    </main>
  );
}
