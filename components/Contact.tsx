"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  Github,
  Linkedin,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  FileDown,
  ArrowUpRight,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";
import { profile } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const CHANNELS = [
  { icon: Github, label: "GitHub", handle: "Harshul-18", url: profile.socials.github, accent: "#e8eaf6" },
  { icon: Linkedin, label: "LinkedIn", handle: "harshulnanda", url: profile.socials.linkedin, accent: "#38bdf8" },
  { icon: Youtube, label: "YouTube", handle: "@CocoGlare", url: profile.socials.youtube, accent: "#fb7185" },
  { icon: Twitter, label: "X / Twitter", handle: "@daylightCrawler", url: profile.socials.twitter, accent: "#a78bfa" },
];

export default function Contact() {
  const lenis = useLenis();
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-5 pb-12 pt-24 md:pt-32"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-8 backdrop-blur-xl sm:p-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand/20 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-brand-2/15 blur-[90px]" />

        <div className="relative">
          <Reveal>
            <span className="section-label">06&nbsp;&nbsp; {t("Contact")}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t("Let’s build something")}{" "}
              <span className="text-gradient">{t("worth shipping.")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-muted">
              {t("Open to research and engineering roles, collaborations and a good technical conversation. The fastest way to reach me is email.")}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href={profile.socials.email}>
                <span className="glow-ring flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-3 px-6 py-3.5 text-sm font-semibold text-white">
                  <Mail size={16} /> {profile.email}
                </span>
              </MagneticButton>
              <MagneticButton href={profile.resumeUrl} download>
                <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/10">
                  <FileDown size={16} /> {t("Download résumé")}
                </span>
              </MagneticButton>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={0.1 + i * 0.06}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl bg-white/5"
                      style={{ color: c.accent }}
                    >
                      <c.icon size={18} />
                    </span>
                    <div>
                      <div className="text-sm font-medium">{c.label}</div>
                      <div className="text-xs text-muted">{c.handle}</div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-brand-2" /> {t(profile.location)}
              </span>
              {profile.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-fg"
                >
                  <Phone size={14} className="text-brand-2" /> {p}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* footer */}
      <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs text-muted/60 sm:block">
            ↑↑↓↓←→←→ B A
          </span>
          <button
            onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white/10"
          >
            {t("Back to top")}
            <ArrowUp
              size={14}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </footer>
    </section>
  );
}
