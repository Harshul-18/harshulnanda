"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../ui/Reveal";
import { skillGroups } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const R = 70;
const C = 2 * Math.PI * R;
const GAP = 5;

export default function SkillRings() {
  const { t } = useLanguage();
  const total = skillGroups.reduce((s, g) => s + g.skills.length, 0);
  const [active, setActive] = useState<string | null>(null);

  let acc = 0;
  const segments = skillGroups.map((g) => {
    const len = (g.skills.length / total) * C;
    const seg = {
      title: g.title,
      accent: g.accent,
      count: g.skills.length,
      len,
      offset: acc,
    };
    acc += len;
    return seg;
  });

  const activeGroup = skillGroups.find((g) => g.title === active);
  const allSkills = skillGroups.flatMap((g) =>
    g.skills.map((sk) => ({ sk, accent: g.accent, cat: g.title }))
  );

  return (
    <div>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* ---- Donut ---- */}
        <Reveal>
          <div className="relative mx-auto aspect-square w-full max-w-[300px]">
            <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
              <circle
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="24"
              />
              {segments.map((s) => {
                const dim = active !== null && active !== s.title;
                const len = Math.max(s.len - GAP, 0);
                return (
                  <motion.circle
                    key={s.title}
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke={s.accent}
                    strokeLinecap="butt"
                    strokeDasharray={`${len} ${C - len}`}
                    strokeDashoffset={-s.offset}
                    initial={{ opacity: 0, strokeWidth: 0 }}
                    whileInView={{ opacity: 1, strokeWidth: 23 }}
                    viewport={{ once: true }}
                    animate={{
                      opacity: dim ? 0.25 : 1,
                      strokeWidth: active === s.title ? 31 : 23,
                    }}
                    transition={{ duration: 0.3 }}
                    onPointerEnter={() => setActive(s.title)}
                    onPointerLeave={() => setActive(null)}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </svg>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <AnimatePresence mode="wait">
                {activeGroup ? (
                  <motion.div
                    key={activeGroup.title}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div
                      className="font-display text-4xl font-bold"
                      style={{ color: activeGroup.accent }}
                    >
                      {activeGroup.skills.length}
                    </div>
                    <div className="mt-1 max-w-[120px] text-xs font-medium leading-tight">
                      {t(activeGroup.title)}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="total"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div className="font-display text-4xl font-bold text-gradient">
                      {total}
                    </div>
                    <div className="mt-1 text-xs text-muted">{t("skills")}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* ---- Legend ---- */}
        <Reveal delay={0.1}>
          <div className="space-y-2.5">
            {skillGroups.map((g) => {
              const on = active === g.title;
              const dim = active !== null && !on;
              return (
                <button
                  key={g.title}
                  type="button"
                  onPointerEnter={() => setActive(g.title)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(g.title)}
                  onBlur={() => setActive(null)}
                  className="flex w-full items-center justify-between rounded-xl border bg-white/[0.03] px-4 py-3 text-left transition-all"
                  style={{
                    borderColor: on ? `${g.accent}` : "rgba(255,255,255,0.08)",
                    opacity: dim ? 0.45 : 1,
                    transform: on ? "translateX(6px)" : "none",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 flex-shrink-0 rounded-full transition-shadow"
                      style={{
                        background: g.accent,
                        boxShadow: on ? `0 0 14px ${g.accent}` : "none",
                      }}
                    />
                    <span className="font-display text-sm font-medium">
                      {t(g.title)}
                    </span>
                  </span>
                  <span
                    className="font-mono text-sm"
                    style={{ color: on ? g.accent : undefined }}
                  >
                    {String(g.skills.length).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* ---- Skill cloud (synced highlight) ---- */}
      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {allSkills.map(({ sk, accent, cat }, i) => {
            const on = active === cat;
            const dim = active !== null && !on;
            return (
              <span
                key={`${sk}-${i}`}
                className="rounded-lg border px-3 py-1.5 text-sm transition-all duration-300"
                style={{
                  borderColor: dim ? "rgba(255,255,255,0.06)" : `${accent}55`,
                  background: on ? `${accent}22` : "rgba(255,255,255,0.03)",
                  color: dim ? "rgba(150,156,186,0.45)" : "#e8eaf6",
                  transform: on ? "scale(1.06)" : "scale(1)",
                  filter: dim ? "grayscale(0.7)" : "none",
                }}
              >
                {sk}
              </span>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
