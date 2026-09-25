import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MotionProvider from "@/components/shared/motion-provider";
import SmoothScroll from "@/components/motion/smooth-scroll";
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

// Runs before first paint: opt into kinetic pre-states only when motion is
// allowed, and back out if the motion runtime never reports ready (JS error,
// blocked bundle) so content can never stay hidden.
const MOTION_BOOT = `(function(){try{if(!matchMedia('(prefers-reduced-motion: no-preference)').matches)return;var d=document.documentElement;d.classList.add('motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion')},4000)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The boot script adds `motion` / Lenis adds `lenis` before hydration.
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background font-body text-foreground antialiased">
        <MotionProvider>
          <SmoothScroll>
            <div className="dot-grid" />
            <Navbar />
            <div className="relative z-10 flex-1">{children}</div>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
