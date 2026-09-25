import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MotionProvider from "@/components/shared/motion-provider";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["500", "600", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
});

const { profile } = portfolio;

export const metadata: Metadata = {
  title: `${profile.displayName} — ${profile.positioning}`,
  description: `${profile.positioning} based in ${profile.location}. ${profile.statement}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background font-body text-foreground antialiased">
        <MotionProvider>
          <div className="dot-grid" />
          <Navbar />
          <div className="relative z-10 flex-1">{children}</div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
