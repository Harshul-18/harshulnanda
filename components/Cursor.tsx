"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 700, damping: 42, mass: 0.25 });
  const ringY = useSpring(y, { stiffness: 700, damping: 42, mass: 0.25 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(
        !!el?.closest("a, button, [data-cursor='hover'], input, textarea")
      );
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border border-brand-2/70 mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: 38,
          height: 38,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: down ? 0.7 : hovering ? 1.7 : 1,
          opacity: hovering ? 0.9 : 0.55,
          backgroundColor: hovering
            ? "rgba(124,139,255,0.14)"
            : "rgba(124,139,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-brand-2 mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering ? 0 : 1 }}
      />
    </>
  );
}
