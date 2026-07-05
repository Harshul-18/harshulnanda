"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "de";

const STORAGE_KEY = "portfolio-language";

const de: Record<string, string> = {
  Home: "Start",
  About: "Über mich",
  Experience: "Erfahrung",
  Projects: "Projekte",
  Skills: "Kenntnisse",
  Education: "Ausbildung",
  Contact: "Kontakt",
  "Selected Work": "Ausgewählte Arbeiten",
  Toolkit: "Werkzeugkasten",
  Background: "Werdegang",
  "View my work": "Meine Arbeiten ansehen",
  Résumé: "Lebenslauf",
  "Download Résumé": "Lebenslauf herunterladen",
  "Download résumé": "Lebenslauf herunterladen",
  Scroll: "Scrollen",
  "Scroll to about": "Zu Über mich scrollen",
  "Toggle menu": "Menü öffnen oder schließen",
  "Currently @ KIT — Energy-Market RL": "Aktuell am KIT — Reinforcement Learning für Energiemärkte",
  "M.Sc. Computer Science @ KIT": "M.Sc. Informatik @ KIT",
  "Machine Learning & Data Engineer": "Machine-Learning- & Data-Engineer",
  "Reinforcement Learning Researcher": "Forscher für Reinforcement Learning",
  "Builder of end-to-end data pipelines": "Entwickler durchgängiger Datenpipelines",
  "I build end-to-end, data-driven systems — from automated measurement pipelines to reinforcement-learning agents that simulate energy markets.": "Ich entwickle durchgängige, datengetriebene Systeme — von automatisierten Messpipelines bis zu Reinforcement-Learning-Agenten, die Energiemärkte simulieren.",
  "An orbit of how I": "Ein Orbit meiner",
  "work.": "Arbeit.",
  "No bio to skim — explore the constellation instead. Each node is a domain I build in; the core is me.": "Keine Biografie zum Überfliegen — erkunde stattdessen die Konstellation. Jeder Knoten steht für ein Gebiet, in dem ich arbeite; im Zentrum stehe ich.",
  "Where I've": "Wo ich",
  "worked.": "gearbeitet habe.",
  "Six roles across research labs and industry — from battery analytics to reinforcement learning at KIT.": "Sechs Stationen in Forschung und Industrie — von Batterieanalytik bis Reinforcement Learning am KIT.",
  "Research &": "Forschung &",
  "projects.": "Projekte.",
  "From embedded intrusion detection and autonomous robotics to deep-learning systems published with Springer.": "Von eingebetteter Einbruchserkennung und autonomer Robotik bis zu bei Springer veröffentlichten Deep-Learning-Systemen.",
  "Skills &": "Kenntnisse &",
  "technologies.": "Technologien.",
  "Hover a slice of the ring — or its label — to light up everything I use in that domain.": "Fahre über ein Ringsegment oder seine Beschriftung, um alle Werkzeuge dieses Bereichs hervorzuheben.",
  "Education &": "Ausbildung &",
  "achievements.": "Erfolge.",
  Ongoing: "Laufend",
  Certifications: "Zertifikate",
  "Achievements & Activities": "Erfolge & Aktivitäten",
  "Hover a medal to preview it — click any marked ↗ to open the credential.": "Fahre über eine Medaille für eine Vorschau — klicke auf ↗, um den Nachweis zu öffnen.",
  "A five-year journey — from olympiads to a hackathon win and beyond.": "Eine fünfjährige Reise — von Olympiaden über einen Hackathon-Sieg bis heute.",
  "Let’s build something": "Lass uns etwas entwickeln,",
  "worth shipping.": "das sich zu veröffentlichen lohnt.",
  "Open to research and engineering roles, collaborations and a good technical conversation. The fastest way to reach me is email.": "Offen für Forschungs- und Engineering-Rollen, Kooperationen und gute technische Gespräche. Am schnellsten erreichst du mich per E-Mail.",
  "Back to top": "Nach oben",
  "Built with Next.js, Tailwind & Framer Motion.": "Erstellt mit Next.js, Tailwind & Framer Motion.",
  "Achievement unlocked.": "Erfolg freigeschaltet.",
  "You found the secret — thanks for exploring!": "Du hast das Geheimnis gefunden — danke fürs Erkunden!",
  Remote: "Remote",
  "On-site": "Vor Ort",
  Hybrid: "Hybrid",
};

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (text: string) => string;
  ready: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function fallbackLocale(): Locale {
  const germanLocale = navigator.languages.some((value) => /^de(?:-|$)/i.test(value));
  const germanTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone === "Europe/Berlin";
  return germanLocale || germanTimezone ? "de" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "de") {
      setLocaleState(saved);
      setReady(true);
      return;
    }

    const detect = async () => {
      let detected = fallbackLocale();
      try {
        const response = await fetch("/api/locale", { cache: "no-store" });
        if (response.ok) {
          const data = (await response.json()) as { country?: string };
          detected = data.country === "DE" ? "de" : "en";
        }
      } catch {
        // Local development and non-Netlify hosts use browser signals.
      }
      setLocaleState(detected);
      setReady(true);
    };
    void detect();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => ({
    locale,
    ready,
    setLocale: (next) => {
      localStorage.setItem(STORAGE_KEY, next);
      setLocaleState(next);
    },
    t: (text) => locale === "de" ? de[text] ?? text : text,
  }), [locale, ready]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
