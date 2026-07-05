"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";

export default function TiltCard({
  children,
  className = "",
  accent,
  tilt = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  accent?: string;
  tilt?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt) {
      const rx = (py - 0.5) * -6;
      const ry = (px - 0.5) * 6;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (tilt) el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`spotlight glass transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ ...(accent ? ({ ["--accent" as string]: accent } as CSSProperties) : {}), ...style }}
    >
      {children}
    </div>
  );
}
