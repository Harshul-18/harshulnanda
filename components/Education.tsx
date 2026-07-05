"use client";

import { GraduationCap, ArrowUpRight, BadgeCheck, Trophy } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import CertWall from "./CertWall";
import AchievementTimeline from "./AchievementTimeline";
import { education } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Education() {
  const { t } = useLanguage();
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl px-5 py-24 md:py-32"
    >
      <SectionHeading
        index="05"
        label={t("Background")}
        title={t("Education &")}
        highlight={t("achievements.")}
      />

      {/* Education */}
      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 0.08}>
            <TiltCard tilt={false} accent="#7c8bff" className="glass-card h-full">
              <div className="flex items-start justify-between">
                <GraduationCap className="text-brand-2" size={22} />
                {e.current && (
                  <span className="chip !text-brand-4" style={{ borderColor: "#34d39955" }}>
                    {t("Ongoing")}
                  </span>
                )}
              </div>
              <p className="mt-4 font-mono text-xs text-muted">{t(e.period)}</p>
              <h3 className="mt-1 font-display text-lg font-semibold leading-snug">
                {t(e.degree)}
              </h3>
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-1 inline-flex items-center gap-1 text-sm text-brand-2"
              >
                {e.school}
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              {e.detail && (
                <p className="mt-2 text-sm text-muted">{t(e.detail)}</p>
              )}
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {/* Certifications — interactive medal wall */}
      <Reveal>
        <h3 className="mt-16 mb-1 flex items-center gap-2 font-display text-xl font-semibold">
          <BadgeCheck size={20} className="text-brand-4" /> {t("Certifications")}
        </h3>
        <p className="mb-2 text-sm text-muted">
          {t("Move over a medal to preview it. Select the arrow to open the credential.")}
        </p>
      </Reveal>
      <Reveal>
        <CertWall />
      </Reveal>

      {/* Achievements — chronological timeline */}
      <Reveal>
        <h3 className="mt-16 mb-1 flex items-center gap-2 font-display text-xl font-semibold">
          <Trophy size={20} className="text-amber-300" /> {t("Achievements & Activities")}
        </h3>
        <p className="mb-2 text-sm text-muted">
          {t("A few milestones from olympiads, workshops and a hackathon win.")}
        </p>
      </Reveal>
      <AchievementTimeline />
    </section>
  );
}
