import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import CursorTag from "@/components/shared/cursor-tag";
import "./globals.css";

// TODO: Replace with the Adobe Fonts kit for Bricolage Grotesque / Schibsted
// Grotesk / JetBrains Mono once credentials are available. These Google Fonts
// match the approved design's typefaces and serve as the production fallback.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Chaipawat Jatuphattaranun — Software Developer",
  description:
    "Front-end / mobile-focused software developer based in Chonburi, Thailand. Building interfaces for real products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${schibsted.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background font-body text-foreground antialiased">
        <CursorTag />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
