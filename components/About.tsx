"use client";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import SkillOrbit from "./about/SkillOrbit";
import { useLanguage } from "@/lib/i18n";

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-5 py-24 md:py-32">
      <SectionHeading
        index="01"
        label={t("About")}
        title={t("An orbit of how I")}
        highlight={t("work.")}
        sub={t("No bio to skim — explore the constellation instead. Each node is a domain I build in; the core is me.")}
      />

      <Reveal className="mt-12">
        <SkillOrbit />
      </Reveal>
    </section>
  );
}
