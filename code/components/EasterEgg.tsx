"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const COLORS = ["#7c8bff", "#22d3ee", "#a78bfa", "#34d399", "#fb7185", "#fbbf24"];

export default function EasterEgg() {
  const { t } = useLanguage();
  const [toast, setToast] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const blast = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; rot: number; vr: number };
    const parts: P[] = Array.from({ length: 180 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 18,
      r: Math.random() * 7 + 3,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
    }));

    let frame = 0;
    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach((p) => {
        p.vy += 0.35;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = Math.max(0, 1 - frame / 130);
        ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.5);
        ctx.restore();
      });
      if (frame < 130) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    tick();
  }, []);

  useEffect(() => {
    // A friendly note for the curious who open DevTools.
    // eslint-disable-next-line no-console
    console.log(
      "%c👋 Hi there, fellow builder.",
      "font-size:18px;font-weight:700;color:#7c8bff"
    );
    // eslint-disable-next-line no-console
    console.log(
      "%cYou clearly know your way around. Psst — try the Konami code (↑↑↓↓←→←→ B A).\nLet's build something: harshulnanda0@gmail.com",
      "color:#22d3ee"
    );

    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          idx = 0;
          blast();
          setToast(true);
          window.setTimeout(() => setToast(false), 4200);
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [blast]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90]"
      />
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="glass fixed bottom-6 left-1/2 z-[91] flex -translate-x-1/2 items-center gap-3 rounded-2xl px-5 py-3"
          >
            <Sparkles size={18} className="text-brand-2" />
            <p className="text-sm">
              <span className="font-semibold">{t("Achievement unlocked.")}</span>{" "}
              <span className="text-muted">
                {t("You found the secret — thanks for exploring!")}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
