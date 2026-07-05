"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import LinkPill from "./ui/LinkPill";
import TiltCard from "./ui/TiltCard";
import ProjectGraphic from "./graphics/ProjectGraphic";
import { projects } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Projects() {
  const { t } = useLanguage();
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-6xl px-5 py-24 md:py-32"
    >
      <SectionHeading
        index="03"
        label={t("Selected Work")}
        title={t("Research &")}
        highlight={t("projects.")}
        sub={t("A selection of projects in embedded systems, autonomous robotics, data engineering and applied machine learning.")}
      />

      <div className="mt-16 space-y-20 md:space-y-28">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={p.id}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
            >
              {/* graphic */}
              <Reveal
                delay={0.05}
                className={flip ? "md:order-2" : ""}
              >
                <TiltCard
                  accent={p.accent}
                  className="group relative aspect-[16/11] overflow-hidden rounded-3xl p-6"
                >
                  <div
                    className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      background: `radial-gradient(120% 100% at ${
                        flip ? "100% 0%" : "0% 0%"
                      }, ${p.accent}, transparent 60%)`,
                    }}
                  />
                  <span
                    className="pointer-events-none absolute -bottom-6 right-2 font-display text-[8rem] font-bold leading-none opacity-[0.07]"
                    style={{ color: p.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ProjectGraphic
                    graphic={p.graphic}
                    accent={p.accent}
                    className="relative h-full w-full"
                  />
                  {p.metric && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-bg/60 px-4 py-2 backdrop-blur-md"
                    >
                      <div
                        className="font-display text-2xl font-bold"
                        style={{ color: p.accent }}
                      >
                        {p.metric.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted">
                        {t(p.metric.label)}
                      </div>
                    </motion.div>
                  )}
                </TiltCard>
              </Reveal>

              {/* details */}
              <Reveal delay={0.12} className={flip ? "md:order-1" : ""}>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {t(tag)}
                    </span>
                  ))}
                </div>
                <p className="mt-4 font-mono text-xs text-muted">{t(p.period)}</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {t(p.title)}
                </h3>
                <p
                  className="mt-2 text-base font-medium"
                  style={{ color: p.accent }}
                >
                  {t(p.short)}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-fg/85">
                      <span
                        className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: p.accent }}
                      />
                      <span>{t(b)}</span>
                    </li>
                  ))}
                </ul>

                {p.published && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.03] p-3">
                    <BookOpen
                      size={15}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: p.accent }}
                    />
                    <p className="text-xs italic text-fg/80">{t(p.published)}</p>
                  </div>
                )}

                {p.links && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.links.map((l) => (
                      <LinkPill key={l.url} link={l} />
                    ))}
                  </div>
                )}
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
