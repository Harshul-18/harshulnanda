"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, ArrowUpRight, MapPin } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import LinkPill from "./ui/LinkPill";
import ProjectGraphic from "./graphics/ProjectGraphic";
import { experiences } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Experience() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-6xl px-5 py-24 md:py-32"
    >
      <SectionHeading
        index="02"
        label={t("Experience")}
        title={t("Where I've")}
        highlight={t("worked.")}
        sub={t("My work has taken me from battery analytics and software engineering to reinforcement learning research at KIT.")}
      />

      <div ref={ref} className="relative mt-16 pl-8 sm:pl-10">
        {/* spine */}
        <div className="absolute left-[7px] top-2 h-full w-px bg-white/10 sm:left-[11px]" />
        <motion.div
          style={{ scaleY: fill }}
          className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-brand-2 via-brand to-brand-3 sm:left-[11px]"
        />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <Reveal key={exp.id} delay={0.05}>
              <div className="relative">
                {/* node */}
                <span
                  className="absolute -left-8 top-1.5 grid h-4 w-4 place-items-center sm:-left-10"
                  style={{ color: exp.accent }}
                >
                  <span className="h-3 w-3 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                  {exp.current && (
                    <span className="absolute h-4 w-4 animate-ping rounded-full bg-current opacity-60" />
                  )}
                </span>

                <div
                  className="spotlight glass overflow-hidden rounded-2xl"
                  style={{ ["--accent" as string]: exp.accent }}
                >
                  <div className="grid gap-0 md:grid-cols-[1fr_200px]">
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span
                          className="chip"
                          style={{
                            color: exp.accent,
                            borderColor: `${exp.accent}55`,
                          }}
                        >
                          {t(exp.period)}
                        </span>
                        <span className="chip">
                          <MapPin size={11} /> {t(exp.location)}
                        </span>
                        <span className="chip">{t(exp.mode)}</span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-semibold">
                        {t(exp.role)}
                      </h3>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-sm font-medium"
                        style={{ color: exp.accent }}
                      >
                        {exp.company}
                        <ArrowUpRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>

                      <p className="mt-3 text-sm text-muted">{t(exp.summary)}</p>

                      <ul className="mt-4 space-y-2.5">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2.5 text-sm text-fg/85">
                            <span
                              className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ background: exp.accent }}
                            />
                            <span>{t(b)}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.links && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {exp.links.map((l) => (
                            <LinkPill key={l.url} link={l} />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* themed graphic */}
                    <div className="relative hidden items-center justify-center border-l border-white/8 bg-white/[0.02] p-4 md:flex">
                      <div
                        className="absolute inset-0 opacity-[0.12]"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${exp.accent}, transparent 70%)`,
                        }}
                      />
                      <ProjectGraphic
                        graphic={exp.graphic}
                        accent={exp.accent}
                        className="relative h-28 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
