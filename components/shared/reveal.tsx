"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  /**
   * Above-the-fold content: animate with the CSS `data-intro="rise"` intro
   * (gated by `html.motion`) so it starts at first paint and stays visible
   * if JavaScript never hydrates, instead of shipping at opacity 0.
   */
  hero?: boolean;
}

export default function Reveal({ children, className, delay = 0, as = "div", hero = false }: RevealProps) {
  if (hero) {
    const Tag = as;
    return (
      <Tag
        data-intro="rise"
        className={className}
        style={{ animationDelay: `${Math.round(delay * 1000) + 80}ms` } as CSSProperties}
      >
        {children}
      </Tag>
    );
  }

  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px", amount: 0.05 }}
      variants={variants}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Component>
  );
}
