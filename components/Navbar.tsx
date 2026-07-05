"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Menu, X, FileDown } from "lucide-react";
import { navItems, profile } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function Navbar() {
  const lenis = useLenis();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    lenis?.scrollTo(`#${id}`, { offset: -90, duration: 1.4 });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[65] flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 ${
            scrolled ? "glass" : "border border-transparent"
          }`}
        >
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2 pl-2"
            aria-label={t("Home")}
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-3 font-display text-sm font-bold text-white shadow-lg">
              HN
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
              {profile.firstName}
              <span className="text-muted">.dev</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative ${
                      active === item.id ? "text-fg" : ""
                    }`}
                  >
                    {t(item.label)}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-white/10 bg-white/5 p-0.5" aria-label="Language">
              {(["de", "en"] as const).map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setLocale(language)}
                  aria-pressed={locale === language}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${locale === language ? "bg-white/15 text-fg" : "text-muted hover:text-fg"}`}
                >
                  {language.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href={profile.resumeUrl}
              download
              className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-fg transition-all hover:bg-white/16 sm:flex"
            >
              <FileDown size={15} />
              {t("Résumé")}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full bg-white/8 md:hidden"
              aria-label={t("Toggle menu")}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[64] flex flex-col items-center justify-center gap-2 bg-bg/80 backdrop-blur-xl md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => go(item.id)}
                className="font-display text-2xl font-medium text-fg/90"
              >
                {t(item.label)}
              </motion.button>
            ))}
            <a
              href={profile.resumeUrl}
              download
              className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm"
            >
              <FileDown size={16} /> {t("Download Résumé")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
