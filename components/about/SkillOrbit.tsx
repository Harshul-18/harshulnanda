"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Workflow,
  Database,
  MessagesSquare,
  Bot,
  BatteryCharging,
  Languages as LangIcon,
  GraduationCap,
  MousePointer2,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type OrbitNode = {
  id: string;
  label: string;
  Icon: LucideIcon;
  accent: string;
  ring: number;
  angle: number;
  desc: string;
  tags: string[];
};

const NODES: OrbitNode[] = [
  {
    id: "ml",
    label: "Machine Learning",
    Icon: Brain,
    accent: "#a78bfa",
    ring: 0,
    angle: 0,
    desc: "I design, train and evaluate models from start to finish.",
    tags: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "OpenCV"],
  },
  {
    id: "rl",
    label: "Reinforcement Learning",
    Icon: Workflow,
    accent: "#34d399",
    ring: 0,
    angle: 180,
    desc: "I use multi-agent reinforcement learning to simulate energy markets at KIT.",
    tags: ["MAPPO", "ASSUME framework", "Policy Optimization"],
  },
  {
    id: "data",
    label: "Data Engineering",
    Icon: Database,
    accent: "#22d3ee",
    ring: 1,
    angle: 35,
    desc: "I build reliable pipelines that clean, harmonize and validate data.",
    tags: ["Pipelines", "Validation", "CI/CD", "Pandas"],
  },
  {
    id: "nlp",
    label: "Natural Language Processing",
    Icon: MessagesSquare,
    accent: "#818cf8",
    ring: 1,
    angle: 155,
    desc: "I fine-tune language models for practical text classification tasks.",
    tags: ["BERT", "98% accuracy", "LangChain"],
  },
  {
    id: "robotics",
    label: "Robotics & Control",
    Icon: Bot,
    accent: "#38bdf8",
    ring: 1,
    angle: 275,
    desc: "I work on trajectory tracking and obstacle avoidance with TurtleBot 3.",
    tags: ["ROS", "Fractional PID", "Path-finding"],
  },
  {
    id: "energy",
    label: "Energy & Batteries",
    Icon: BatteryCharging,
    accent: "#fbbf24",
    ring: 2,
    angle: 20,
    desc: "I turn battery measurements and simulations into useful engineering data.",
    tags: ["SOC", "SOH", "RUL", "ECM simulation"],
  },
  {
    id: "lang",
    label: "Languages",
    Icon: LangIcon,
    accent: "#fb7185",
    ring: 2,
    angle: 140,
    desc: "I enjoy working and communicating across languages and cultures.",
    tags: ["Hindi · native", "English · C2", "German · B1"],
  },
  {
    id: "edu",
    label: "Education",
    Icon: GraduationCap,
    accent: "#7c8bff",
    ring: 2,
    angle: 260,
    desc: "I study Computer Science at KIT in Karlsruhe.",
    tags: ["KIT", "B.Tech · 9.35 CGPA", "Springer-published"],
  },
];

const RADII = [0.4, 0.63, 0.84];
const SPEEDS = [7, -5, 3.6]; // deg/sec per ring

export default function SkillOrbit() {
  const { t } = useLanguage();
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const planetRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const phase = useRef([0, 0, 0]);
  const paused = useRef(false);
  const last = useRef<number | null>(null);

  const [size, setSize] = useState(0);
  const [active, setActive] = useState<OrbitNode | null>(null);
  const [identity, setIdentity] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize(Math.round(e.contentRect.width))
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!size) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = size / 2;
    let raf = 0;

    const place = () => {
      for (let i = 0; i < NODES.length; i++) {
        const el = planetRefs.current[i];
        if (!el) continue;
        const n = NODES[i];
        const a = ((n.angle + phase.current[n.ring]) * Math.PI) / 180;
        const r = RADII[n.ring] * half;
        const x = half + r * Math.cos(a);
        const y = half + r * Math.sin(a);
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };

    const loop = (t: number) => {
      if (last.current == null) last.current = t;
      const dt = (t - last.current) / 1000;
      last.current = t;
      if (!paused.current && !reduce) {
        for (let r = 0; r < 3; r++) phase.current[r] += dt * SPEEDS[r];
      }
      place();
      raf = requestAnimationFrame(loop);
    };

    place();
    raf = requestAnimationFrame(loop);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        last.current = null;
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      last.current = null;
    };
  }, [size]);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = stageRef.current;
    const tilt = tiltRef.current;
    if (!el || !tilt) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    tilt.style.transform = `rotateX(${(-dy * 7).toFixed(2)}deg) rotateY(${(
      dx * 7
    ).toFixed(2)}deg)`;
  };

  const resetTilt = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  const enter = (n: OrbitNode) => {
    paused.current = true;
    setIdentity(false);
    setActive(n);
  };
  const leave = () => {
    paused.current = false;
    setActive(null);
  };
  const toggle = (n: OrbitNode) =>
    active?.id === n.id ? leave() : enter(n);

  const ps = Math.max(40, Math.min(56, size * 0.11));
  const iconSize = Math.round(ps * 0.42);

  return (
    <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-4">
      {/* ---------------- Orbit stage ---------------- */}
      <div className="lg:col-span-3">
        <div
          ref={stageRef}
          onPointerMove={onPointerMove}
          onPointerLeave={() => {
            resetTilt();
            leave();
            setIdentity(false);
          }}
          className="relative mx-auto aspect-square w-full max-w-[520px]"
          style={{ perspective: "1100px" }}
        >
          <div
            ref={tiltRef}
            className="absolute inset-0 transition-transform duration-100 ease-out"
          >
            {/* orbit rings */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7c8bff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#7c8bff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="46" fill="url(#core-glow)" />
              {RADII.map((rf, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={rf * 50}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.25"
                />
              ))}
              <motion.circle
                cx="50"
                cy="50"
                r={RADII[1] * 50}
                fill="none"
                stroke="rgba(124,139,255,0.5)"
                strokeWidth="0.4"
                strokeDasharray="1 5"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50% 50%" }}
              />
            </svg>

            {/* center core */}
            <button
              type="button"
              onPointerEnter={() => {
                paused.current = true;
                setActive(null);
                setIdentity(true);
              }}
              onPointerLeave={() => {
                paused.current = false;
                setIdentity(false);
              }}
              onClick={() => {
                setIdentity((v) => !v);
                setActive(null);
                paused.current = !identity;
              }}
              aria-label="Harshul Nanda"
              className="group absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/20" />
              <span
                className={`grid place-items-center rounded-full bg-gradient-to-br from-brand to-brand-3 font-display font-bold text-white shadow-[0_0_40px_-4px_rgba(124,139,255,0.8)] transition-transform duration-300 ${
                  identity ? "scale-110" : "group-hover:scale-105"
                }`}
                style={{ width: ps * 1.55, height: ps * 1.55, fontSize: ps * 0.5 }}
              >
                HN
              </span>
            </button>

            {/* planets */}
            {NODES.map((n, i) => {
              const isActive = active?.id === n.id;
              return (
                <button
                  key={n.id}
                  type="button"
                  ref={(el) => {
                    planetRefs.current[i] = el;
                  }}
                  onPointerEnter={() => enter(n)}
                  onPointerLeave={leave}
                  onFocus={() => enter(n)}
                  onBlur={leave}
                  onClick={() => toggle(n)}
                  aria-label={t(n.label)}
                  className="absolute left-0 top-0 z-10 cursor-none"
                  style={{
                    width: ps,
                    height: ps,
                    opacity: size ? 1 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  <span
                    className="grid h-full w-full place-items-center rounded-full border backdrop-blur-md transition-all duration-300"
                    style={{
                      borderColor: isActive ? n.accent : "rgba(255,255,255,0.14)",
                      background: isActive
                        ? `${n.accent}26`
                        : "rgba(255,255,255,0.05)",
                      boxShadow: isActive
                        ? `0 0 28px -2px ${n.accent}`
                        : `0 0 0 0 transparent`,
                      transform: isActive ? "scale(1.18)" : "scale(1)",
                      color: n.accent,
                    }}
                  >
                    <n.Icon size={iconSize} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---------------- Reveal panel ---------------- */}
      <div className="lg:col-span-2">
        <div className="glass-card relative min-h-[230px] overflow-hidden">
          <AnimatePresence mode="wait">
            {active ? (
              <Panel key={active.id} accent={active.accent}>
                <div
                  className="mb-4 grid h-12 w-12 place-items-center rounded-xl"
                  style={{ background: `${active.accent}26`, color: active.accent }}
                >
                  <active.Icon size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold">
                  {t(active.label)}
                </h3>
                <p className="mt-2 text-sm text-muted">{t(active.desc)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border px-2.5 py-1 text-xs"
                      style={{
                        borderColor: `${active.accent}40`,
                        color: "rgba(232,234,246,0.9)",
                      }}
                    >
                      {t(tag)}
                    </span>
                  ))}
                </div>
              </Panel>
            ) : identity ? (
              <Panel key="identity" accent="#7c8bff">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-3 font-display font-bold text-white">
                  HN
                </div>
                <h3 className="font-display text-xl font-semibold">
                  Harshul Nanda
                </h3>
                <p className="mt-1 text-sm text-brand-2">
                  {t("ML & Data Engineer and RL Researcher")}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} className="text-brand-2" /> {t("Karlsruhe, Germany")}
                </p>
              </Panel>
            ) : (
              <Panel key="hint" accent="#7c8bff" muted>
                <motion.div
                  animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                  className="mb-4 text-brand-2"
                >
                  <MousePointer2 size={26} />
                </motion.div>
                <h3 className="font-display text-lg font-medium text-fg/80">
                  {t("Explore the orbit")}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {t("Move over a node or tap it to learn more. Select the centre to see who I am.")}
                </p>
                <div className="mt-4 flex gap-1.5">
                  {NODES.map((n) => (
                    <span
                      key={n.id}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: n.accent, opacity: 0.6 }}
                    />
                  ))}
                </div>
              </Panel>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Panel({
  children,
  accent,
  muted,
}: {
  children: React.ReactNode;
  accent: string;
  muted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.3 }}
      style={{ ["--accent" as string]: accent }}
    >
      {!muted && (
        <span
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
          style={{ background: `${accent}22` }}
        />
      )}
      <div className="relative">{children}</div>
    </motion.div>
  );
}
