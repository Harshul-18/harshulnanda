import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const dynamic = "force-static";
export const alt = `${profile.name} — ML & Data Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#05060c",
          backgroundImage:
            "radial-gradient(900px 500px at 12% 0%, rgba(124,139,255,0.35), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(34,211,238,0.25), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #7c8bff, #a78bfa)",
              color: "#fff",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            HN
          </div>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "6px",
              color: "#969cba",
            }}
          >
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "112px",
              fontWeight: 700,
              color: "#e8eaf6",
              lineHeight: 1,
            }}
          >
            Harshul Nanda
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "24px",
              fontSize: "36px",
              color: "#22d3ee",
            }}
          >
            ML &amp; Data Engineer · Reinforcement Learning
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["M.Sc. CS @ KIT", "Python", "PyTorch", "Springer-published"].map(
            (t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: "24px",
                  color: "#e8eaf6",
                  padding: "10px 22px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
