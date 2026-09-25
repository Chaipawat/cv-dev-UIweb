import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Screenshots are large PNG/JPG sources; AVIF roughly halves them again
    // over WebP for browsers that support it.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
