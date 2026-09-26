"use client";

import dynamic from "next/dynamic";
import { Beer, Laptop } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ContactDeskScene = dynamic(() => import("@/components/contact/contact-desk-scene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** A progressive, unboxed WebGL vignette that disappears into the page surface. */
export default function ContactDesk({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)");
    const sync = () => setCompact(mobile.matches);
    const frame = requestAnimationFrame(() => {
      sync();
      setEnabled(supportsWebGL());
    });
    mobile.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      mobile.removeEventListener("change", sync);
    };
  }, []);

  return (
    <motion.div
      className={cn("relative m-0 overflow-visible", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 1.25 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      aria-label="Interactive miniature developer desk with a laptop and beer"
    >
      <div className={cn("absolute inset-0", !reduceMotion && "contact-desk-float")}>
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-5 text-foreground-secondary/25 transition-opacity duration-700",
            ready && "opacity-0",
          )}
        >
          <Laptop className="h-28 w-28" strokeWidth={0.8} />
          <Beer className="h-24 w-24 text-accent/25" strokeWidth={0.8} />
        </div>
        {enabled ? (
          <ContactDeskScene
            compact={compact}
            reducedMotion={Boolean(reduceMotion)}
            onReady={() => setReady(true)}
            onFail={() => setEnabled(false)}
          />
        ) : null}
      </div>
    </motion.div>
  );
}
