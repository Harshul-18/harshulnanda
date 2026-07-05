"use client";

import { motion, type Variants } from "framer-motion";
import type { GraphicKey } from "@/lib/data";

/**
 * Themed, animated SVG illustrations — one per project / experience.
 * Each scales to its container and tints itself with the `accent` colour.
 */
export default function ProjectGraphic({
  graphic,
  accent,
  className = "",
}: {
  graphic: GraphicKey;
  accent: string;
  className?: string;
}) {
  const Comp = MAP[graphic] ?? Energy;
  return (
    <div className={className} style={{ color: accent }} aria-hidden>
      <Comp accent={accent} />
    </div>
  );
}

type GProps = { accent: string };
const VB = "0 0 320 200";
const base = "h-full w-full";

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.4, delay: i * 0.15, ease: "easeInOut" }, opacity: { duration: 0.3, delay: i * 0.15 } },
  }),
};

/* ───────────────── energy — multi-agent grid / RL market ───────────────── */
function Energy({ accent }: GProps) {
  const nodes = [
    [60, 60], [160, 40], [260, 70], [90, 140], [200, 150], [270, 140],
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5]];
  return (
    <svg viewBox={VB} className={base} fill="none">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"
          variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
        />
      ))}
      {edges.map(([a, b], i) => (
        <motion.circle
          key={`p${i}`} r="2.6" fill="currentColor"
          initial={{ offsetDistance: "0%" }}
          animate={{ cx: [nodes[a][0], nodes[b][0]], cy: [nodes[a][1], nodes[b][1]] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={`n${i}`}>
          <motion.circle
            cx={x} cy={y} r="9" fill="currentColor" fillOpacity="0.12"
            animate={{ r: [9, 13, 9], fillOpacity: [0.12, 0.04, 0.12] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
          <circle cx={x} cy={y} r="4.5" fill="currentColor" />
        </g>
      ))}
      <motion.path
        d="M20 185 Q 80 150 140 178 T 300 168" stroke="currentColor" strokeWidth="1.5"
        strokeDasharray="3 4" fill="none" strokeOpacity="0.5"
        animate={{ strokeDashoffset: [0, -28] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

/* ───────────────── battery — SOC / SOH cells ───────────────── */
function Battery({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      {[40, 120, 200].map((x, i) => (
        <g key={i}>
          <rect x={x} y="50" width="60" height="100" rx="8" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
          <rect x={x + 22} y="42" width="16" height="8" rx="2" fill="currentColor" fillOpacity="0.6" />
          <motion.rect
            x={x + 5} width="50" rx="4" fill="currentColor"
            initial={{ height: 0, y: 145 }}
            whileInView={{ height: [0, 90 - i * 18], y: [145, 55 + i * 18] }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: i * 0.25, ease: "easeOut" }}
            fillOpacity="0.85"
          />
          <motion.rect
            x={x + 5} width="50" rx="4" fill="#fff"
            animate={{ opacity: [0, 0.25, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            height={90 - i * 18} y={55 + i * 18}
          />
        </g>
      ))}
      {/* SOH gauge arc */}
      <motion.path
        d="M286 150 A 28 28 0 1 1 286 149.9" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" strokeOpacity="0.18"
      />
      <motion.path
        d="M286 150 A 28 28 0 1 1 286 149.9" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"
        variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }}
      />
    </svg>
  );
}

/* ───────────────── timeseries — forecast curve ───────────────── */
function TimeSeries({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="20" y1={y} x2="300" y2={y} stroke="currentColor" strokeOpacity="0.08" />
      ))}
      <motion.path
        d="M20 150 L60 130 L100 138 L140 96 L170 110"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }}
      />
      <motion.path
        d="M170 110 L210 70 L250 84 L290 46"
        stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 5" fill="none"
        variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
      />
      <motion.path
        d="M170 110 L210 70 L250 84 L290 46 L290 96 L250 120 L210 104 L170 110 Z"
        fill="currentColor" fillOpacity="0.08"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.6 }}
      />
      {[[60, 130], [140, 96], [210, 70], [290, 46]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="3.5" fill="currentColor"
          animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }} />
      ))}
    </svg>
  );
}

/* ───────────────── mobile — iOS banking ───────────────── */
function Mobile({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      <rect x="118" y="24" width="84" height="152" rx="16" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" />
      <rect x="146" y="30" width="28" height="5" rx="2.5" fill="currentColor" fillOpacity="0.5" />
      <motion.rect
        x="128" y="48" width="64" height="40" rx="8" fill="currentColor" fillOpacity="0.85"
        initial={{ y: 60, opacity: 0 }} whileInView={{ y: 48, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      />
      <rect x="135" y="56" width="24" height="4" rx="2" fill="#fff" fillOpacity="0.7" />
      <rect x="135" y="66" width="40" height="6" rx="3" fill="#fff" fillOpacity="0.9" />
      {[100, 116, 132].map((y, i) => (
        <motion.g key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.15 }}>
          <circle cx="134" cy={y + 4} r="5" fill="currentColor" fillOpacity="0.25" />
          <rect x="146" y={y} width="40" height="8" rx="4" fill="currentColor" fillOpacity="0.2" />
        </motion.g>
      ))}
      <motion.circle cx="160" cy="160" r="9" stroke="currentColor" strokeWidth="2" fill="none"
        animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      <path d="M156 160 l3 3 l6 -6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────────── video-class — film + edu/non-edu ───────────────── */
function VideoClass({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      <rect x="40" y="56" width="240" height="88" rx="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5" />
      {[52, 268].map((x) =>
        [66, 90, 114].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="10" height="14" rx="2" fill="currentColor" fillOpacity="0.4" />)
      )}
      <motion.path
        d="M150 84 L150 116 L178 100 Z" fill="currentColor"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}
        style={{ transformOrigin: "160px 100px" }}
      />
      <motion.g initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <rect x="40" y="158" width="64" height="22" rx="11" fill="currentColor" fillOpacity="0.18" />
        <text x="72" y="173" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="monospace">EDU 87%</text>
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
        <rect x="116" y="158" width="74" height="22" rx="11" stroke="currentColor" strokeOpacity="0.3" />
        <text x="153" y="173" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.6" fontFamily="monospace">NON-EDU</text>
      </motion.g>
    </svg>
  );
}

/* ───────────────── writing — algorithms / articles ───────────────── */
function Writing({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      <rect x="60" y="34" width="160" height="132" rx="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.45" />
      {[54, 70, 86, 102, 118, 134].map((y, i) => (
        <motion.rect key={y} x={i % 2 ? 92 : 76} y={y} width={i % 3 === 0 ? 110 : 78} height="6" rx="3"
          fill="currentColor" fillOpacity={i === 0 ? 0.8 : 0.22}
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12 }} style={{ transformOrigin: "left" }} />
      ))}
      <motion.rect x="76" y="150" width="2" height="12" fill="currentColor"
        animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      {/* binary tree accent */}
      <g stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5">
        <line x1="250" y1="50" x2="232" y2="84" /><line x1="250" y1="50" x2="282" y2="84" />
        <line x1="232" y1="84" x2="222" y2="120" /><line x1="282" y1="84" x2="292" y2="120" />
      </g>
      {[[250, 50], [232, 84], [282, 84], [222, 120], [292, 120]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="6" fill="currentColor"
          animate={{ fillOpacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} />
      ))}
    </svg>
  );
}

/* ───────────────── ble — radio waves + lock ───────────────── */
function Ble({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      <circle cx="110" cy="100" r="7" fill="currentColor" />
      {[24, 44, 64, 84].map((r, i) => (
        <motion.circle key={r} cx="110" cy="100" r={r} stroke="currentColor" strokeWidth="2" fill="none"
          animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1, 1.05] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }} style={{ transformOrigin: "110px 100px" }} />
      ))}
      {/* lock */}
      <motion.g initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ transformOrigin: "240px 110px" }}>
        <rect x="218" y="98" width="44" height="36" rx="6" fill="currentColor" fillOpacity="0.85" />
        <path d="M226 98 v-8 a14 14 0 0 1 28 0 v8" stroke="currentColor" strokeWidth="3.5" fill="none" />
        <circle cx="240" cy="113" r="4" fill="#0a0c18" />
        <rect x="238.5" y="113" width="3" height="9" rx="1.5" fill="#0a0c18" />
      </motion.g>
      <motion.text x="240" y="160" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="currentColor"
        animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.6, repeat: Infinity }}>RSSI −62 dBm</motion.text>
    </svg>
  );
}

/* ───────────────── robot — trajectory + obstacle ───────────────── */
function Robot({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      {[40, 80, 120, 160].map((y) => <line key={`h${y}`} x1="20" y1={y} x2="300" y2={y} stroke="currentColor" strokeOpacity="0.06" />)}
      {[60, 120, 180, 240].map((x) => <line key={`v${x}`} x1={x} y1="20" x2={x} y2="180" stroke="currentColor" strokeOpacity="0.06" />)}
      <motion.path id="traj" d="M30 160 C 90 160 90 60 150 60 S 230 150 300 60"
        stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" fill="none" strokeOpacity="0.6"
        variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} />
      <circle cx="190" cy="118" r="14" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeDasharray="3 3" />
      <text x="190" y="122" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" fillOpacity="0.7">obs</text>
      <motion.g animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ offsetPath: "path('M30 160 C 90 160 90 60 150 60 S 230 150 300 60')", offsetRotate: "auto" }}>
        <rect x="-9" y="-7" width="18" height="14" rx="3" fill="currentColor" />
        <circle cx="11" cy="0" r="2.5" fill="#0a0c18" />
      </motion.g>
    </svg>
  );
}

/* ───────────────── health — ECG + risk gauge ───────────────── */
function Health({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      <rect x="24" y="40" width="170" height="120" rx="10" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
      <motion.path
        d="M30 110 H70 l10 -34 l14 60 l12 -40 l10 14 H188"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        variants={draw} initial="hidden" whileInView="show" viewport={{ once: true }} />
      <motion.circle r="3.5" fill="currentColor"
        animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ offsetPath: "path('M30 110 H70 l10 -34 l14 60 l12 -40 l10 14 H188')" }} />
      {/* risk gauge */}
      <path d="M214 150 A 56 56 0 0 1 306 150" stroke="currentColor" strokeOpacity="0.15" strokeWidth="8" strokeLinecap="round" fill="none" />
      <motion.path d="M214 150 A 56 56 0 0 1 306 150" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none"
        strokeDasharray="180" initial={{ strokeDashoffset: 180 }} whileInView={{ strokeDashoffset: 110 }} viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }} />
      <text x="260" y="138" textAnchor="middle" fontSize="16" fontFamily="monospace" fill="currentColor">38%</text>
      <text x="260" y="154" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" fillOpacity="0.6">RISK</text>
    </svg>
  );
}

/* ───────────────── cctv — camera + scan + bbox ───────────────── */
function Cctv({ accent }: GProps) {
  return (
    <svg viewBox={VB} className={base} fill="none">
      <g>
        <rect x="36" y="44" width="52" height="26" rx="5" fill="currentColor" fillOpacity="0.85" transform="rotate(12 60 56)" />
        <circle cx="44" cy="52" r="6" fill="#0a0c18" />
        <rect x="78" y="60" width="20" height="8" rx="3" fill="currentColor" transform="rotate(12 60 56)" />
      </g>
      <motion.path d="M58 64 L300 40 L300 170 L58 64 Z" fill="currentColor" fillOpacity="0.06" />
      <motion.line x1="58" y1="64" x2="300" y2="40" stroke="currentColor" strokeOpacity="0.3" />
      <motion.line x1="58" y1="64" x2="300" y2="170" stroke="currentColor" strokeOpacity="0.3" />
      <motion.line x1="58" y1="64" x2="300" y2="100"
        stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"
        animate={{ x2: [300, 300], y2: [44, 168, 44] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <motion.rect x="210" y="86" width="50" height="56" rx="4" stroke="currentColor" strokeWidth="2" fill="none"
        animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.8, 1] }} />
      <motion.text x="210" y="80" fontSize="9" fontFamily="monospace" fill="currentColor"
        animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.8, 1] }}>flagged 0.94</motion.text>
    </svg>
  );
}

/* ───────────────── nlp — chat bubbles + attention ───────────────── */
function Nlp({ accent }: GProps) {
  const tokens = [54, 92, 130, 168, 206];
  return (
    <svg viewBox={VB} className={base} fill="none">
      <motion.g initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <rect x="36" y="40" width="120" height="30" rx="14" fill="currentColor" fillOpacity="0.16" />
        <rect x="48" y="52" width="70" height="6" rx="3" fill="currentColor" fillOpacity="0.5" />
      </motion.g>
      <motion.g initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <rect x="170" y="80" width="114" height="30" rx="14" fill="currentColor" fillOpacity="0.28" />
        <rect x="182" y="92" width="80" height="6" rx="3" fill="#fff" fillOpacity="0.6" />
      </motion.g>
      {/* BERT token row + attention */}
      {tokens.map((x, i) => (
        <motion.rect key={x} x={x} y="150" width="28" height="28" rx="6"
          fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeOpacity="0.4"
          animate={{ fillOpacity: [0.15, i === 2 ? 0.9 : 0.3, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }} />
      ))}
      {tokens.map((x, i) => i < tokens.length - 1 && (
        <motion.path key={`a${i}`} d={`M${x + 14} 150 Q ${(x + tokens[i + 1]) / 2 + 14} 120 ${tokens[i + 1] + 14} 150`}
          stroke="currentColor" strokeWidth="1" fill="none"
          animate={{ strokeOpacity: [0.1, 0.6, 0.1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
      ))}
      <text x="200" y="140" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor" fillOpacity="0.6">BERT · self-attention</text>
    </svg>
  );
}

/* ───────────────── sentiment — word cloud + distribution ───────────────── */
function Sentiment({ accent }: GProps) {
  const POS = "#34d399";
  const NEG = "#fb7185";
  const NEU = "#fbbf24";
  const MUT = "#969cba";
  const words: [string, string, number, number, number][] = [
    ["delay", NEG, 27, 188, 60],
    ["great", POS, 25, 78, 70],
    ["price", NEU, 18, 252, 90],
    ["Flex", POS, 18, 128, 96],
    ["late", NEG, 16, 56, 112],
    ["seat", MUT, 16, 182, 118],
    ["value", POS, 15, 256, 130],
    ["crew", MUT, 14, 110, 136],
    ["refund", NEG, 15, 210, 150],
  ];
  return (
    <svg viewBox={VB} className={base} fill="none">
      {/* comment-bubble frame */}
      <path
        d="M30 28 H290 a12 12 0 0 1 12 12 V120 a12 12 0 0 1 -12 12 H74 l-18 18 v-18 H30 a12 12 0 0 1 -12 -12 V40 a12 12 0 0 1 12 -12 Z"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1.5"
      />
      {/* word cloud */}
      {words.map(([t, c, s, x, y], i) => (
        <motion.text
          key={t}
          x={x}
          y={y}
          fontSize={s}
          fontFamily="var(--font-display), sans-serif"
          fontWeight={s > 20 ? 700 : 500}
          textAnchor="middle"
          fill={c}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: c === MUT ? 0.5 : 0.95, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "backOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {t}
        </motion.text>
      ))}
      {/* sentiment distribution bar */}
      <rect x="40" y="170" width="240" height="10" rx="5" fill="currentColor" fillOpacity="0.08" />
      <motion.rect
        x="40" y="170" height="10" rx="5" fill={POS}
        initial={{ width: 0 }} whileInView={{ width: 132 }} viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      />
      <motion.rect
        x="176" y="170" height="10" rx="5" fill={NEU}
        initial={{ width: 0 }} whileInView={{ width: 50 }} viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      />
      <motion.rect
        x="230" y="170" height="10" rx="5" fill={NEG}
        initial={{ width: 0 }} whileInView={{ width: 50 }} viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}

const MAP: Record<GraphicKey, (p: GProps) => React.ReactElement> = {
  energy: Energy,
  battery: Battery,
  timeseries: TimeSeries,
  mobile: Mobile,
  "video-class": VideoClass,
  writing: Writing,
  ble: Ble,
  robot: Robot,
  health: Health,
  cctv: Cctv,
  nlp: Nlp,
  sentiment: Sentiment,
};
