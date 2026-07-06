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
  "Currently studying at KIT": "Ich studiere derzeit am KIT",
  "M.Sc. Computer Science @ KIT": "M.Sc. Informatik @ KIT",
  "Machine Learning & Data Engineer": "Machine Learning und Data Engineer",
  "Reinforcement Learning Researcher": "Forscher für Reinforcement Learning",
  "Builder of complete data pipelines": "Entwickler vollständiger Datenpipelines",
  "I build practical, data-driven systems. My work ranges from automated measurement pipelines to reinforcement learning agents for energy market simulations.": "Ich entwickle praktische, datengetriebene Systeme. Meine Arbeit reicht von automatisierten Messpipelines bis zu Reinforcement Learning Agents für Energiemarktsimulationen.",
  "An orbit of how I": "Ein Orbit meiner",
  "work.": "Arbeit.",
  "I work across several connected fields. Explore the orbit to see what I build and how the pieces fit together.": "Ich arbeite in mehreren eng verbundenen Bereichen. Erkunde den Orbit und entdecke, was ich entwickle und wie die einzelnen Themen zusammenpassen.",
  "Where I've": "Wo ich",
  "worked.": "gearbeitet habe.",
  "My work has taken me from battery analytics and software engineering to reinforcement learning research at KIT.": "Mein Weg führte mich von Batterieanalytik und Softwareentwicklung bis zur Forschung an Reinforcement Learning am KIT.",
  "Research &": "Forschung &",
  "projects.": "Projekte.",
  "A selection of projects in embedded systems, autonomous robotics, data engineering and applied machine learning.": "Eine Auswahl meiner Projekte aus Embedded Systems, autonomer Robotik, Data Engineering und angewandtem Machine Learning.",
  "Skills &": "Kenntnisse &",
  "technologies.": "Technologien.",
  "Move over a segment or its label to see the tools I use in that area.": "Bewege den Mauszeiger über ein Segment oder seine Beschriftung, um meine Werkzeuge in diesem Bereich zu sehen.",
  "Education &": "Ausbildung &",
  "achievements.": "Erfolge.",
  Ongoing: "Laufend",
  Certifications: "Zertifikate",
  "Achievements & Activities": "Erfolge & Aktivitäten",
  "Move over a medal to preview it. Select the arrow to open the credential.": "Bewege den Mauszeiger über eine Medaille, um eine Vorschau zu sehen. Über den Pfeil öffnest du den Nachweis.",
  "A few milestones from olympiads, workshops and a hackathon win.": "Einige Meilensteine aus Olympiaden, Workshops und einem Hackathon Sieg.",
  "Let’s build something": "Lass uns etwas entwickeln,",
  "worth shipping.": "das sich zu veröffentlichen lohnt.",
  "Open to research and engineering roles, collaborations and a good technical conversation. The fastest way to reach me is email.": "Ich freue mich über Forschungsstellen, Engineering Rollen, Kooperationen und gute technische Gespräche. Am schnellsten erreichst du mich per E Mail.",
  "Back to top": "Nach oben",
  // "Built with Next.js, Tailwind & Framer Motion.": "Erstellt mit Next.js, Tailwind & Framer Motion.",
  "Achievement unlocked.": "Erfolg freigeschaltet.",
  "You found the secret. Thanks for exploring!": "Du hast das Geheimnis gefunden. Danke fürs Erkunden!",
  "Explore the orbit": "Erkunde den Orbit",
  "Move over a node or tap it to learn more. Select the centre to see who I am.": "Bewege den Mauszeiger über einen Knoten oder tippe darauf, um mehr zu erfahren. Wähle die Mitte aus, um mehr über mich zu sehen.",
  "ML & Data Engineer and RL Researcher": "Machine Learning und Data Engineer, Forscher für Reinforcement Learning",
  "Karlsruhe, Germany": "Karlsruhe, Deutschland",
  "Turkey": "Türkei",
  "India": "Indien",
  "Tokyo (Remote)": "Tokio (Remote)",
  "View credential": "Nachweis öffnen",
  "Internship Completion Certificate": "Praktikumsbescheinigung",
  "Project Files": "Projektdateien",
  "Video Explanation": "Videoerklärung",
  "Test-Case Videos": "Testvideos",
  "Author Page": "Autorenseite",
  "Springer Publication": "Springer Publikation",
  "Jan 2026 to present": "Jan. 2026 bis heute",
  "Jun 2024 to Jul 2025": "Juni 2024 bis Juli 2025",
  "Jun 2023 to Aug 2023": "Juni 2023 bis Aug. 2023",
  "Jan 2023 to May 2023": "Jan. 2023 bis Mai 2023",
  "Jun 2022 to Nov 2022": "Juni 2022 bis Nov. 2022",
  "Apr 2022 to Jun 2022": "Apr. 2022 bis Juni 2022",
  "Jan 2026 to Feb 2026": "Jan. 2026 bis Feb. 2026",
  "Dec 2024 to Jun 2025": "Dez. 2024 bis Juni 2025",
  "Nov 2024 to Dec 2024": "Nov. 2024 bis Dez. 2024",
  "Nov 2023 to Dec 2023": "Nov. 2023 bis Dez. 2023",
  "Feb 2023 to Apr 2023": "Feb. 2023 bis Apr. 2023",
  "Oct 2025 to present": "Okt. 2025 bis heute",
  "Nov 2021 to Jun 2025": "Nov. 2021 bis Juni 2025",
  "Apr 2020 to Jun 2021": "Apr. 2020 bis Juni 2021",
  "Student Research Assistant": "Studentische Hilfskraft in der Forschung",
  "Battery Data Engineer": "Battery Data Engineer",
  "Machine Learning Intern": "Praktikant im Bereich Machine Learning",
  "Software Engineer": "Software Engineer",
  "Computer Science Technical Writer": "Technischer Autor für Informatik",
  "I work on reinforcement learning for energy market simulations within the open source ASSUME framework.": "Ich arbeite im Open Source Framework ASSUME an Reinforcement Learning für Energiemarktsimulationen.",
  "I develop and integrate a Multi-Agent Proximal Policy Optimization algorithm in ASSUME to model complex energy market behaviour.": "Ich entwickle und integriere einen Multi-Agent Proximal Policy Optimization Algorithmus in ASSUME, um komplexes Verhalten auf Energiemärkten zu modellieren.",
  "I owned the machine learning pipelines for industrial battery analytics and helped a small team deliver models consistently.": "Ich verantwortete die Machine Learning Pipelines für industrielle Batterieanalysen und half einem kleinen Team dabei, Modelle zuverlässig bereitzustellen.",
  "I built Python pipelines for cell level SOC, SOH, RUL and anomaly detection. Each model shipped as a reusable package with automated GitHub Actions workflows.": "Ich entwickelte Python Pipelines für SOC, SOH, RUL und Anomalieerkennung auf Zellebene. Jedes Modell wurde als wiederverwendbares Paket mit automatisierten GitHub Actions Workflows bereitgestellt.",
  "I generated synthetic battery data with Equivalent Circuit Model simulations, then built the cleaning, feature engineering and validation steps around it.": "Ich erzeugte synthetische Batteriedaten mit Equivalent Circuit Model Simulationen und entwickelte dafür die Datenbereinigung, das Feature Engineering und die Validierung.",
  "I designed a Streamlit dashboard for responsive cell metric analysis and documented the full system with clear UML diagrams.": "Ich entwarf ein Streamlit Dashboard für die schnelle Analyse von Zellmetriken und dokumentierte das gesamte System mit übersichtlichen UML Diagrammen.",
  "I introduced shared templates for documentation, reports and GitHub packages so the growing team could keep its work traceable.": "Ich führte gemeinsame Vorlagen für Dokumentation, Berichte und GitHub Pakete ein, damit die Arbeit des wachsenden Teams nachvollziehbar blieb.",
  "I forecast sales across several product lines using statistical models and neural networks.": "Ich prognostizierte Verkaufszahlen für mehrere Produktlinien mit statistischen Modellen und neuronalen Netzen.",
  "I helped build a secure and approachable iOS banking application.": "Ich half bei der Entwicklung einer sicheren und leicht verständlichen iOS Banking App.",
  "I collected a large YouTube dataset and trained a classifier for educational content.": "Ich sammelte einen großen YouTube Datensatz und trainierte einen Klassifikator für Bildungsinhalte.",
  "I wrote practical, detailed articles about algorithms and data structures.": "Ich schrieb praxisnahe und ausführliche Artikel über Algorithmen und Datenstrukturen.",
  "Researching reinforcement learning for energy market simulations within the open source ASSUME framework.": "Forschung zu Reinforcement Learning für Energiemarktsimulationen im Open Source Framework ASSUME.",
  "Developing and integrating a Multi-Agent Proximal Policy Optimization algorithm in ASSUME to model complex energy market behaviour.": "Entwicklung und Integration eines Multi-Agent Proximal Policy Optimization Algorithmus in ASSUME zur Modellierung komplexer Energiemärkte.",
  "Developing and integrating parameter sharing functionality for reinforcement learning algorithms within the ASSUME framework.": "Entwicklung und Integration einer Parameter Sharing Funktion für Reinforcement Learning Algorithmen im ASSUME Framework.",
  "Developed machine learning pipelines for industrial battery analytics and enabled a small team to deliver models consistently.": "Entwicklung von Machine Learning Pipelines für industrielle Batterieanalysen und Unterstützung eines kleinen Teams bei der zuverlässigen Bereitstellung von Modellen.",
  "Built Python pipelines for cell level SOC, SOH, RUL and anomaly detection. Shipped each model as a reusable package with automated GitHub Actions workflows.": "Entwicklung von Python Pipelines für SOC, SOH, RUL und Anomalieerkennung auf Zellebene. Bereitstellung jedes Modells als wiederverwendbares Paket mit automatisierten GitHub Actions Workflows.",
  "Produced synthetic battery data with Equivalent Circuit Model simulations and built the supporting cleaning, feature engineering and validation steps.": "Erzeugung synthetischer Batteriedaten mit Equivalent Circuit Model Simulationen sowie Entwicklung der Datenbereinigung, des Feature Engineerings und der Validierung.",
  "Designed a Streamlit dashboard for responsive cell metric analysis and documented the full system with clear UML diagrams.": "Entwicklung eines Streamlit Dashboards zur schnellen Analyse von Zellmetriken und Dokumentation des gesamten Systems mit übersichtlichen UML Diagrammen.",
  "Introduced shared templates for documentation, reports and GitHub packages to keep the growing team's work traceable.": "Einführung gemeinsamer Vorlagen für Dokumentation, Berichte und GitHub Pakete, damit die Arbeit des wachsenden Teams nachvollziehbar bleibt.",
  "Forecast sales across several product lines using statistical models and neural networks.": "Prognose von Verkaufszahlen für mehrere Produktlinien mit statistischen Modellen und neuronalen Netzen.",
  "Developed a secure and approachable iOS banking application.": "Entwicklung einer sicheren und leicht verständlichen iOS Banking App.",
  "Collected a large YouTube dataset and trained a classifier for educational content.": "Aufbau eines großen YouTube Datensatzes und Training eines Klassifikators für Bildungsinhalte.",
  "Wrote practical, detailed articles about algorithms and data structures.": "Verfassen praxisnaher und ausführlicher Artikel über Algorithmen und Datenstrukturen.",
  "Combined BLE proximity, live authentication through custom GATT characteristics and a dynamic password with a secure reset flow.": "Kombination aus BLE Nähe, Live Authentifizierung über eigene GATT Merkmale und einem dynamischen Passwort mit sicherem Reset Ablauf.",
  "Compared standard, fractional, adaptive fractional and nonlinear fractional PID controllers for trajectory tracking.": "Vergleich klassischer, fraktionaler, adaptiver fraktionaler und nichtlinearer fraktionaler PID Regler für die Trajektorienverfolgung.",
  "Applied time-series forecasting with 10+ statistical models (ARIMA family) and LSTM neural networks to predict future sales across diverse product lines.": "Ich setzte mehr als zehn statistische Modelle aus der ARIMA Familie sowie LSTM Netze ein, um Verkaufszahlen verschiedener Produktlinien vorherzusagen.",
  "Contributed to a 45%+ improvement in error rate compared to traditional predictive models.": "Im Vergleich zu klassischen Prognosemodellen verbesserte sich die Fehlerrate um mehr als 45 Prozent.",
  "Helped develop a secure digital-banking iOS application using UIKit and SwiftUI.": "Ich half bei der Entwicklung einer sicheren iOS Banking App mit UIKit und SwiftUI.",
  "Built user-friendly interfaces with intricate designs and logic.": "Ich setzte anspruchsvolle Abläufe in verständliche und benutzerfreundliche Oberflächen um.",
  "Scraped 10,000+ YouTube videos into channel-specific and video-specific intensive datasets.": "Ich erfasste mehr als 10.000 YouTube Videos und strukturierte die Daten nach Kanälen und einzelnen Videos.",
  "Built an innovative model architecture for categorical classification of YouTube videos (educational vs. non-educational).": "Ich entwickelte eine Modellarchitektur, die YouTube Videos als Bildungsinhalt oder sonstigen Inhalt klassifiziert.",
  "Published articles explaining algorithms and data structures with practical implementation, diverse methods and mathematical rigor.": "Ich veröffentlichte Artikel, die Algorithmen und Datenstrukturen mit praktischen Implementierungen, verschiedenen Lösungswegen und mathematischer Sorgfalt erklären.",
  "Sentiment Analysis for Digital Marketing": "Sentimentanalyse für digitales Marketing",
  "A RoBERTa sentiment pipeline that examines Ryanair Flex Plus customer comments.": "Eine RoBERTa Pipeline zur Sentimentanalyse von Kundenkommentaren zu Ryanair Flex Plus.",
  "Built an R-based sentiment-analysis pipeline for Ryanair Flex Plus customer comments using a RoBERTa transformer model through Python integration.": "Ich entwickelte in R eine Pipeline zur Sentimentanalyse von Kundenkommentaren zu Ryanair Flex Plus und band dafür ein RoBERTa Modell über Python ein.",
  "Conducted visual analysis across sentiment-distribution charts, word clouds, n-gram analysis, engagement comparisons and aspect-based sentiment trends.": "Ich analysierte die Ergebnisse mit Sentimentverteilungen, Wortwolken, N Grammen, Engagement Vergleichen und aspektbezogenen Trends.",
  "Smart Intrusion Detection with BLE": "Intelligente Einbruchserkennung mit BLE",
  "A portable intrusion detector with password protection and multi-factor BLE verification.": "Ein tragbarer Einbruchsmelder mit Passwortschutz und mehrstufiger BLE Verifizierung.",
  "Designed a portable, password-protected intrusion-detection system on a Seeed XIAO nRF52840, fusing an IR flame sensor (light-change detection) with an LSM6DS3 IMU (tamper / movement detection).": "Ich entwickelte auf einem Seeed XIAO nRF52840 ein tragbares, passwortgeschütztes Erkennungssystem. Es verbindet einen IR Sensor für Lichtveränderungen mit einer LSM6DS3 IMU für Manipulations- und Bewegungserkennung.",
  "I combined BLE proximity, live authentication through custom GATT characteristics and a dynamic password with a secure reset flow.": "Ich kombinierte BLE Nähe, Live Authentifizierung über eigene GATT Merkmale und ein dynamisches Passwort mit einem sicheren Reset Ablauf.",
  "Built a firmware architecture with distinct audible feedback patterns for authentication, intrusion and error states.": "Ich entwickelte eine Firmware Architektur mit klar unterscheidbaren Tonsignalen für Authentifizierung, Eindringen und Fehlerzustände.",
  "Autonomous Trajectory Tracking in Mobile Robotics": "Autonome Trajektorienverfolgung in der mobilen Robotik",
  "Fractional PID control and obstacle avoidance on a TurtleBot 3, tested in simulation and on real hardware.": "Fraktionale PID Regelung und Hindernisvermeidung auf einem TurtleBot 3, getestet in der Simulation und auf echter Hardware.",
  "I compared standard, fractional, adaptive fractional and nonlinear fractional PID controllers for trajectory tracking.": "Ich verglich klassische, fraktionale, adaptive fraktionale und nichtlineare fraktionale PID Regler für die Trajektorienverfolgung.",
  "Proposed a general PID control mechanism, validated both in simulation and on a physical TurtleBot-3.": "Ich entwickelte einen allgemeinen PID Regelungsansatz und validierte ihn in der Simulation sowie auf einem echten TurtleBot 3.",
  "Implemented and improved four pathfinding algorithms (PSO-Heuristic A*, Dijkstra, BFS, Greedy Best-First), integrating them with PID for static obstacle avoidance.": "Ich implementierte und verbesserte vier Algorithmen zur Pfadsuche und verband sie mit der PID Regelung zur Vermeidung statischer Hindernisse.",
  "Predictive Health Management System": "Prädiktives Gesundheitsmanagementsystem",
  "Patient & admin dashboards predicting hospital-readmission risk in real time.": "Dashboards für Patienten und Verwaltung, die das Risiko einer erneuten Krankenhauseinweisung in Echtzeit vorhersagen.",
  "Developed integrated patient and admin dashboards for real-time readmission-risk tracking.": "Ich entwickelte verbundene Dashboards für Patienten und Verwaltung, die das Wiedereinweisungsrisiko in Echtzeit darstellen.",
  "Implemented predictive models (Random Forests, Gaussian Process Classification) with an easy re-training platform for adaptive risk estimation.": "Ich implementierte Random Forests und Gaussian Process Classification sowie eine einfache Plattform zum erneuten Trainieren der Modelle.",
  "Predicting Unethical Activity in Videos": "Erkennung unethischer Aktivitäten in Videos",
  "Deep-learning video classification separating criminal from safe content.": "Eine Deep Learning Videoklassifikation, die kriminelle von unbedenklichen Inhalten unterscheidet.",
  "Curated a dataset of CCTV footage and videos containing unethical activity, then analysed four video-classification model architectures.": "Ich stellte einen Datensatz aus CCTV Aufnahmen und Videos mit problematischen Aktivitäten zusammen und untersuchte vier Architekturen zur Videoklassifikation.",
  "Achieved over 94% accuracy classifying criminal vs. safe content.": "Das Modell unterschied kriminelle und unbedenkliche Inhalte mit mehr als 94 Prozent Genauigkeit.",
  "Crime Prediction in Conversations": "Erkennung krimineller Absichten in Gesprächen",
  "A fine-tuned BERT model flagging unethical intent across everyday dialogue.": "Ein fein abgestimmtes BERT Modell, das problematische Absichten in Alltagsgesprächen erkennt.",
  "Built a dataset of 1,000+ daily life conversations with 7 to 10 exchanges each, annotated across six categories from unethical to neutral.": "Ich erstellte einen Datensatz mit mehr als 1.000 Alltagsgesprächen und jeweils 7 bis 10 Gesprächswechseln. Die Inhalte ordnete ich sechs Kategorien von problematisch bis neutral zu.",
  "Studied and compared 50+ crime-predicting text-classification architectures.": "Ich untersuchte und verglich mehr als 50 Architekturen zur Textklassifikation.",
  "Proposed a state-of-the-art fine-tuned BERT architecture for public-safety NLP, reaching 98% accuracy on the created dataset.": "Ich entwickelte eine fein abgestimmte BERT Architektur für Anwendungen der öffentlichen Sicherheit, die auf dem erstellten Datensatz 98 Prozent Genauigkeit erreichte.",
  "May 2026": "Mai 2026",
  "Apr 2026": "Apr. 2026",
  "Dec 2025": "Dez. 2025",
  "Nov 2025": "Nov. 2025",
  "Oct 2025": "Okt. 2025",
  "Jun 2023": "Juni 2023",
  "Nov 2022": "Nov. 2022",
  "Dec 2020": "Dez. 2020",
  "Apr 2021": "Apr. 2021",
  "Nov 2023": "Nov. 2023",
  "Aug 2025": "Aug. 2025",
  "classification accuracy": "Klassifikationsgenauigkeit",
  "BERT accuracy": "BERT Genauigkeit",
  "Published in the Springer proceedings of the International Conference on Generative AI, Cryptography and Predictive Analytics.": "Veröffentlicht im Springer Tagungsband der International Conference on Generative AI, Cryptography and Predictive Analytics.",
  "M.Sc. in Computer Science": "M.Sc. Informatik",
  "B.Tech. in Information Technology & Mathematical Innovation": "B.Tech. Informationstechnologie und Mathematische Innovation",
  "Higher Secondary (Class XII)": "Höhere Sekundarstufe (Klasse XII)",
  "Final grade: 9.35 CGPA, approximately 1.3 to 1.5 in the German system": "Abschlussnote: 9,35 CGPA, etwa 1,3 bis 1,5 im deutschen System",
  "Final grade: 91.2%": "Abschlussnote: 91,2 %",
  "Languages": "Sprachen",
  "ML & Data": "ML & Daten",
  "Web & UI": "Web & UI",
  "Tools & Systems": "Werkzeuge & Systeme",
  "CS Foundations": "Informatik Grundlagen",
  "skills": "Kenntnisse",
  "Communication": "Kommunikation",
  "Critical Thinking": "Kritisches Denken",
  "Problem-Solving": "Problemlösung",
  "Attention to Detail": "Sorgfalt",
  "Adaptability": "Anpassungsfähigkeit",
  "Collaboration": "Zusammenarbeit",
  "Leadership": "Führung",
  "Public Speaking": "Präsentation",
  "Creativity": "Kreativität",
  "Machine Learning": "Machine Learning",
  "Data Engineering": "Data Engineering",
  "Natural Language Processing": "Verarbeitung natürlicher Sprache",
  "Robotics & Control": "Robotik & Regelung",
  "Energy & Batteries": "Energie & Batterien",
  "I design, train and evaluate models from start to finish.": "Ich konzipiere, trainiere und evaluiere Modelle vom ersten Entwurf bis zum fertigen Ergebnis.",
  "I use multi-agent reinforcement learning to simulate energy markets at KIT.": "Am KIT simuliere ich Energiemärkte mit Multi-Agent Reinforcement Learning.",
  "I build reliable pipelines that clean, harmonize and validate data.": "Ich entwickle zuverlässige Pipelines, die Daten bereinigen, harmonisieren und validieren.",
  "I fine-tune language models for practical text classification tasks.": "Ich passe Sprachmodelle an praktische Aufgaben der Textklassifikation an.",
  "I work on trajectory tracking and obstacle avoidance with TurtleBot 3.": "Ich arbeite mit TurtleBot 3 an Trajektorienverfolgung und Hindernisvermeidung.",
  "I turn battery measurements and simulations into useful engineering data.": "Ich verwandle Batteriemessungen und Simulationen in nützliche technische Daten.",
  "I enjoy working and communicating across languages and cultures.": "Ich arbeite und kommuniziere gerne über Sprach- und Kulturgrenzen hinweg.",
  "I study Computer Science at KIT in Karlsruhe.": "Ich studiere Informatik am KIT in Karlsruhe.",
  "Designing, training and evaluating models from start to finish.": "Konzeption, Training und Evaluation von Modellen vom ersten Entwurf bis zum fertigen Ergebnis.",
  "Using multi-agent reinforcement learning to simulate energy markets at KIT.": "Simulation von Energiemärkten am KIT mit Multi-Agent Reinforcement Learning.",
  "Building reliable pipelines that clean, harmonize and validate data.": "Entwicklung zuverlässiger Pipelines zur Bereinigung, Harmonisierung und Validierung von Daten.",
  "Fine-tuning language models for practical text classification tasks.": "Anpassung von Sprachmodellen für praktische Aufgaben der Textklassifikation.",
  "Developing trajectory tracking and obstacle avoidance with TurtleBot 3.": "Entwicklung von Trajektorienverfolgung und Hindernisvermeidung mit TurtleBot 3.",
  "Turning battery measurements and simulations into useful engineering data.": "Aufbereitung von Batteriemessungen und Simulationen zu nutzbaren technischen Daten.",
  "Working and communicating across languages and cultures.": "Arbeiten und Kommunizieren über Sprach- und Kulturgrenzen hinweg.",
  "Studying Computer Science at KIT in Karlsruhe.": "Informatikstudium am KIT in Karlsruhe.",
  "Hindi · native": "Hindi · Muttersprache",
  "English · C2": "Englisch · C2",
  "German · B1": "Deutsch · B1",
  "98% accuracy": "98 % Genauigkeit",
  "ASSUME framework": "ASSUME Framework",
  "ECM simulation": "ECM Simulation",
  "Indian Computing Olympiad, Zonal Round": "Indian Computing Olympiad, Regionalrunde",
  "International Mathematics Olympiad": "Internationale Mathematik Olympiade",
  "Hackathon Winner at Think Beyond Exams": "Hackathon Sieger bei Think Beyond Exams",
  "Facilitator for the Faculty Development Program": "Leiter eines Faculty Development Programms",
  "EV Technology & Public Charging Station Workshop": "Workshop zu E Mobilität und öffentlichen Ladestationen",
  "1st Place": "1. Platz",
  "Workshop": "Workshop",
  "Olympiad": "Olympiade",
  "Competed in the Zonal Informatics Olympiad 2021 (Indian Association for Research in Computing Science).": "Teilnahme an der Zonal Informatics Olympiad 2021 der Indian Association for Research in Computing Science.",
  "Participated in the International Mathematics Olympiad conducted by SOF.": "Teilnahme an der von SOF organisierten International Mathematics Olympiad.",
  "Led my team to 1st place, turning educational-classification models into a web app that predicts a YouTube video or playlist's educational percentage from just a URL.": "Ich führte mein Team zum ersten Platz. Unsere Web App schätzt allein anhand einer URL, wie hoch der Bildungsanteil eines YouTube Videos oder einer Playlist ist.",
  "Hosted a two-day Blender 3D workshop, animating scientific phenomena (electron transmission, wave propagation) to help teachers communicate complex science.": "Ich leitete einen zweitägigen Blender 3D Workshop. Mit Animationen zu Elektronenübertragung und Wellenausbreitung halfen wir Lehrkräften, komplexe Naturwissenschaft verständlich zu vermitteln.",
  "A five day workshop on EV technology covering battery dynamics, motors, power electronics and charging.": "Ein fünftägiger Workshop über E Mobilität mit Batteriedynamik, Motoren, Leistungselektronik und Ladetechnik.",
  "Noida, India": "Noida, Indien",
  "Embedded Systems": "Embedded Systems",
  "Sensor Fusion": "Sensorfusion",
  "Control Theory": "Regelungstechnik",
  "Web Development": "Webentwicklung",
  "Video Classification": "Videoklassifikation",
  "Data Science": "Data Science",
  "Marketing Analytics": "Marketinganalyse",
  "Reinforcement Learning Specialization": "Spezialisierung Reinforcement Learning",
  "Practical Deep Learning with PyTorch": "Praxisorientiertes Deep Learning mit PyTorch",
  "Asana Project Management": "Projektmanagement mit Asana",
  "Getting Started with TensorFlow 2": "Einstieg in TensorFlow 2",
  "Analyse Data (CertNexus)": "Datenanalyse (CertNexus)",
  "Machine Learning Algorithms: Supervised Learning": "Machine Learning Algorithmen: Überwachtes Lernen",
  "Introduction to iOS Mobile Application Development": "Einführung in die Entwicklung mobiler iOS Apps",
  "100 Data Structures & Algorithms Problems": "100 Aufgaben zu Datenstrukturen und Algorithmen",
  "SupaBase with Python": "Supabase mit Python",
  "R for Statistics and Data Science": "R für Statistik und Data Science",
  "Machine Learning Algorithms": "Machine Learning Algorithmen",
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
