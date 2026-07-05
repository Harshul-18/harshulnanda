"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Target,
  Binary,
  BrainCircuit,
  BarChart3,
  Brain,
  Cpu,
  Smartphone,
  Database,
  Sigma,
  Flame,
  ClipboardList,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { certifications, type CertIcon } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const ICONS: Record<CertIcon, LucideIcon> = {
  target: Target,
  binary: Binary,
  braincircuit: BrainCircuit,
  barchart: BarChart3,
  brain: Brain,
  cpu: Cpu,
  smartphone: Smartphone,
  database: Database,
  sigma: Sigma,
  flame: Flame,
  clipboard: ClipboardList,
};

export default function CertWall() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    setHoverable(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);

  return (
    <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-10 px-2 py-6 sm:gap-x-10">
      {certifications.map((c, i) => {
        const Icon = ICONS[c.icon];
        const show = hover === i || open === i;
        return (
          <div
            key={c.title}
            className="relative"
            style={{ marginTop: i % 2 === 1 ? 26 : 0 }}
          >
            {/* tooltip */}
            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.92 }}
                  transition={{ duration: 0.22 }}
                  className="glass absolute bottom-[118px] left-1/2 z-[68] w-56 -translate-x-1/2 rounded-2xl p-4 text-center"
                  style={{ ["--accent" as string]: c.accent }}
                >
                  <p className="text-sm font-medium leading-snug">{t(c.title)}</p>
                  <p className="mt-1.5 text-xs text-muted">{c.issuer}</p>
                  <p
                    className="mt-1 font-mono text-[11px]"
                    style={{ color: c.accent }}
                  >
                    {t(c.date)}
                  </p>
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:bg-white/10"
                      style={{ borderColor: `${c.accent}66`, color: c.accent }}
                    >
                      {t("View credential")} <ArrowUpRight size={12} />
                    </a>
                  )}
                  <span
                    className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
                      borderColor: "rgba(255,255,255,0.1)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ribbon tails */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[70px] -z-0 h-12 w-5 -translate-x-[18px] rotate-[20deg] rounded-b-sm opacity-80"
              style={{
                background: `linear-gradient(${c.accent}, ${c.accent}00)`,
              }}
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-[70px] -z-0 h-12 w-5 translate-x-[1px] -rotate-[20deg] rounded-b-sm opacity-80"
              style={{
                background: `linear-gradient(${c.accent}, ${c.accent}00)`,
              }}
            />

            {/* medal coin */}
            <motion.button
              type="button"
              aria-label={
                c.url
                  ? `${t(c.title)}, ${c.issuer}, ${t(c.date)}. ${t("View credential")}`
                  : `${t(c.title)}, ${c.issuer}, ${t(c.date)}`
              }
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => {
                if (c.url && hoverable) {
                  window.open(c.url, "_blank", "noopener,noreferrer");
                } else {
                  setOpen((v) => (v === i ? null : i));
                }
              }}
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.35,
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="relative z-10 grid place-items-center rounded-full"
              style={{
                width: 104,
                height: 104,
                background: `conic-gradient(from 140deg, ${c.accent}, ${c.accent}22 55%, ${c.accent})`,
                boxShadow: show
                  ? `0 0 36px -4px ${c.accent}, inset 0 0 0 1px rgba(255,255,255,0.1)`
                  : `0 10px 30px -12px ${c.accent}99, inset 0 0 0 1px rgba(255,255,255,0.08)`,
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* rotating dashed ring */}
              <motion.span
                aria-hidden
                className="absolute rounded-full border border-dashed"
                style={{
                  width: 118,
                  height: 118,
                  borderColor: `${c.accent}66`,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
              {/* coin face */}
              <span
                className="relative grid place-items-center rounded-full"
                style={{
                  width: 88,
                  height: 88,
                  background:
                    "radial-gradient(circle at 50% 35%, #11131f, #07080f)",
                }}
              >
                <span
                  className="absolute h-12 w-12 rounded-full blur-xl"
                  style={{ background: `${c.accent}55` }}
                />
                <Icon
                  size={34}
                  style={{ color: c.accent }}
                  className="relative"
                />
              </span>

              {/* clickable indicator */}
              {c.url && (
                <span
                  aria-hidden
                  className="absolute right-0 top-0 z-20 grid h-6 w-6 place-items-center rounded-full border border-white/15 backdrop-blur-sm transition-transform"
                  style={{
                    background: "rgba(5,6,12,0.75)",
                    color: c.accent,
                    transform: show ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  <ArrowUpRight size={13} />
                </span>
              )}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}
