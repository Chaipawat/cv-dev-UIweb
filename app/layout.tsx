import type { Metadata } from "next";
import {
  Anton,
  Caveat,
  Geist,
  IBM_Plex_Sans_Thai,
  Instrument_Serif,
  JetBrains_Mono,
  Shippori_Mincho,
} from "next/font/google";
import Footer from "@/components/site/footer";
import Nav from "@/components/site/nav";
import SiteMotion from "@/components/site/site-motion";
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

// Handwritten annotations ("shipped to real users!").
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: "600",
  preload: false,
});

const { profile } = portfolio;

// Absolute base for Open Graph image URLs. Set NEXT_PUBLIC_SITE_URL for a
// custom domain; on Vercel the production domain is picked up automatically.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.displayName} — ${profile.positioning}`,
  description: `${profile.positioning} based in ${profile.location}. ${profile.statement}`,
  // No title/description here: pages inherit this object as-is, and share
  // crawlers fall back to each page's own <title> and description.
  openGraph: {
    type: "website",
    siteName: profile.fullName,
  },
};

// Runs before first paint: opt into reveal pre-states (`js`), and back out
// if the client runtime never reports ready (JS error, blocked bundle) so
// content can never stay hidden.
const REVEAL_BOOT = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__revealReady)d.classList.remove('js')},4000)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The boot script adds `js` before hydration.
      suppressHydrationWarning
      className={`${anton.variable} ${geist.variable} ${plexThai.variable} ${instrumentSerif.variable} ${shippori.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <head>
        <meta name="theme-color" content="#f4f0e8" />
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />
      </head>
      <body>
        <a className="sr-only" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <SiteMotion />
      </body>
    </html>
  );
}
