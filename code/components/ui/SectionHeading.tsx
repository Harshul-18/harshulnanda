"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  label,
  title,
  highlight,
  sub,
  align = "left",
}: {
  index: string;
  label: string;
  title: string;
  highlight?: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="section-label">{index}</span>
          <span className="h-px w-10 bg-brand-2/50" />
          <span className="section-label !text-muted">{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}{" "}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p
            className={`mt-4 max-w-2xl text-muted ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {sub}
          </p>
        </Reveal>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-6 h-px origin-left bg-gradient-to-r from-brand-2/60 to-transparent ${
          align === "center" ? "mx-auto w-24" : "w-full max-w-xs"
        }`}
      />
    </div>
  );
}
