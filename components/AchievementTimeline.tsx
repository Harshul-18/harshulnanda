"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Code2,
  Sigma,
  Trophy,
  Boxes,
  Zap,
  Crown,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import { achievements, type AchievementIcon } from "@/lib/data";

const ICONS: Record<AchievementIcon, LucideIcon> = {
  code: Code2,
  sigma: Sigma,
  trophy: Trophy,
  boxes: Boxes,
  zap: Zap,
};

export default function AchievementTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 62%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <div ref={ref} className="relative mt-10">
      {/* spine */}
      <div className="absolute left-6 top-1 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        style={{ scaleY: fill }}
        className="absolute left-6 top-1 h-full w-px origin-top bg-gradient-to-b from-brand-2 via-brand-3 to-brand-4 md:left-1/2 md:-translate-x-1/2"
      />

      <div className="space-y-7 md:space-y-3">
        {achievements.map((a, i) => {
          const Icon = ICONS[a.icon];
          const left = i % 2 === 0;
          const size = a.highlight ? 64 : 52;
          return (
            <Reveal key={a.title}>
              <div className="relative md:grid md:min-h-[112px] md:grid-cols-2 md:items-center">
                {/* medallion node */}
                <span
                  className="absolute left-6 top-2 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  style={{ color: a.accent }}
                >
                  {a.highlight && (
                    <>
                      <Crown
                        size={20}
                        className="absolute -top-5 left-1/2 -translate-x-1/2 text-amber-300"
                        fill="currentColor"
                      />
                      <span
                        className="absolute inset-0 animate-ping rounded-full"
                        style={{ background: `${a.accent}55` }}
                      />
                    </>
                  )}
                  <span
                    className="relative grid place-items-center rounded-full border-2 backdrop-blur-md"
                    style={{
                      width: size,
                      height: size,
                      borderColor: a.accent,
                      background: a.highlight
                        ? `linear-gradient(135deg, ${a.accent}, #f59e0b)`
                        : `${a.accent}1f`,
                      color: a.highlight ? "#1a1206" : a.accent,
                      boxShadow: `0 0 26px -4px ${a.accent}`,
                    }}
                  >
                    <Icon size={a.highlight ? 28 : 22} />
                  </span>
                </span>

                {/* card */}
                <div
                  className={
                    left
                      ? "md:col-start-1 md:pr-20 md:text-right"
                      : "md:col-start-2 md:pl-20"
                  }
                >
                  <div
                    className={`spotlight glass ml-16 rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-1 md:ml-0 ${
                      a.highlight ? "glow-ring" : ""
                    }`}
                    style={{ ["--accent" as string]: a.accent }}
                  >
                    <div
                      className={`flex flex-wrap items-center gap-2 ${
                        left ? "md:justify-end" : ""
                      }`}
                    >
                      <span
                        className="chip"
                        style={{
                          color: a.accent,
                          borderColor: `${a.accent}55`,
                        }}
                      >
                        {a.highlight && <Trophy size={11} />}
                        {a.tag}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {a.date}
                      </span>
                    </div>
                    <h4 className="mt-2.5 font-display text-lg font-semibold leading-snug">
                      {a.title}
                    </h4>
                    <p
                      className="text-sm font-medium"
                      style={{ color: a.accent }}
                    >
                      {a.org}
                    </p>
                    <p className="mt-2 text-sm text-muted">{a.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
