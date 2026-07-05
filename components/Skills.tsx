"use client";

import SectionHeading from "./ui/SectionHeading";
import SkillRings from "./skills/SkillRings";
import { useLanguage } from "@/lib/i18n";

const MARQUEE = [
  "Python", "PyTorch", "Reinforcement Learning", "TensorFlow", "Pandas",
  "NumPy", "Scikit-learn", "NLP", "OpenCV", "ROS", "Docker", "CI/CD",
  "Streamlit", "Flask", "ReactJS", "LangChain", "MATLAB", "Blender",
];

const SOFT = [
  "Communication", "Critical Thinking", "Problem-Solving", "Attention to Detail",
  "Adaptability", "Collaboration", "Leadership", "Public Speaking", "Creativity",
];

export default function Skills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="04"
          label={t("Toolkit")}
          title={t("Skills &")}
          highlight={t("technologies.")}
          sub={t("Hover a slice of the ring — or its label — to light up everything I use in that domain.")}
        />
      </div>

      {/* tech marquee */}
      <div className="group relative mt-12 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 font-display text-lg font-medium text-fg/80"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* interactive ring chart */}
      <div className="mx-auto mt-14 max-w-5xl px-5">
        <SkillRings />
      </div>

      {/* soft-skills reverse marquee */}
      <div className="group relative mt-16 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]"
          style={{ animationDirection: "reverse" }}
        >
          {[...SOFT, ...SOFT].map((s, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-dashed border-white/10 px-4 py-1.5 text-sm text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
