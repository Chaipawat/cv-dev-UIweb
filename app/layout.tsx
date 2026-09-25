import type { Metadata } from "next";
import {
  Anton,
  Geist,
  IBM_Plex_Sans_Thai,
  Instrument_Serif,
  JetBrains_Mono,
  Shippori_Mincho,
} from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import MotionProvider from "@/components/shared/motion-provider";
import SmoothScroll from "@/components/motion/smooth-scroll";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

// Display — condensed, kinetic. Single weight.
const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

// UI / body. Variable font covers every weight in use.
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

// Thai glyph fallback for the body stack; unicode-range keeps it off the
// wire until Thai text renders, so it is not preloaded.
const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-plex-thai",
  subsets: ["thai"],
  weight: ["400", "500", "600"],
  preload: false,
});

// Upright serif + kanji (the vertical 龍). Japanese ships as unicode-range
// slices, so skip preload and let the browser fetch only what renders.
const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "600"],
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
      className={`${anton.variable} ${geist.variable} ${plexThai.variable} ${instrumentSerif.variable} ${shippori.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-background font-body text-foreground antialiased">
        <MotionProvider>
          <SmoothScroll>
            <div className="paper-grain" aria-hidden="true" />
            <Navbar />
            <div className="relative z-10 flex-1">{children}</div>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
