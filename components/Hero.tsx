"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowDown,
  MapPin,
  Github,
  Linkedin,
  Youtube,
  Mail,
  FileDown,
} from "lucide-react";
import ParticleField from "./canvas/ParticleField";
import MagneticButton from "./ui/MagneticButton";
import { profile } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const SOCIALS = [
  { icon: Github, url: profile.socials.github, label: "GitHub" },
  { icon: Linkedin, url: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Youtube, url: profile.socials.youtube, label: "YouTube" },
  { icon: Mail, url: profile.socials.email, label: "Email" },
];

export default function Hero() {
  const lenis = useLenis();
  const { t } = useLanguage();
  const [roleIdx, setRoleIdx] = useState(0);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const t = setInterval(
      () => setRoleIdx((i) => (i + 1) % profile.roles.length),
      2600
    );
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) =>
    lenis?.scrollTo(id, { offset: -80, duration: 1.3 });

  const first = profile.firstName.split("");
  const last = profile.lastName.split("");

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pt-24"
    >
      <ParticleField className="absolute inset-0 -z-10 opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <motion.div
        style={{ y: yText, opacity }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-4 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-4" />
          </span>
          {t(profile.status)}
        </motion.div>

        <h1 className="font-display text-[clamp(2.8rem,11vw,7rem)] font-bold leading-[0.95] tracking-tight">
          <span className="block">
            {first.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.1 + i * 0.045,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
          </span>
          <span className="block text-gradient">
            {last.map((c, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.4 + i * 0.045,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Rotating role */}
        <div className="mt-6 flex h-8 items-center justify-center font-mono text-sm text-brand-2 sm:text-base">
          <span className="text-muted">&gt;_ </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="ml-2"
            >
              {t(profile.roles[roleIdx])}
            </motion.span>
          </AnimatePresence>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-1 inline-block h-4 w-2 bg-brand-2"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mt-7 max-w-xl text-balance text-base text-muted sm:text-lg"
        >
          {t(profile.tagline)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton onClick={() => scrollTo("#projects")}>
            <span className="glow-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-3 px-6 py-3 text-sm font-semibold text-white">
              {t("View my work")}
            </span>
          </MagneticButton>
          <MagneticButton href={profile.resumeUrl} download>
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:bg-white/10">
              <FileDown size={16} /> {t("Résumé")}
            </span>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <MapPin size={13} className="text-brand-2" /> {t(profile.location)}
          </span>
          <span className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted transition-colors hover:text-fg"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label={t("Scroll to about")}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-muted"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">{t("Scroll")}</span>
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
