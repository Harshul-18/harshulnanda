"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const set = () => {
      const r = ref.current as unknown as { lenis?: unknown } | null;
      (window as unknown as { __lenis?: unknown }).__lenis =
        (r && "lenis" in r ? r.lenis : r) ?? undefined;
    };
    set();
    const id = window.setTimeout(set, 400);
    return () => window.clearTimeout(id);
  });

  return (
    <ReactLenis
      ref={ref}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
