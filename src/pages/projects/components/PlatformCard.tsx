import { useState } from "react";

interface PlatformProject {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  dot: string;
  accentRgb: string;
  desc: string;
  cta: string;
  image: string;
}

export function PlatformCard({ p }: { p: PlatformProject }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: "300px",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(160deg, rgba(${p.accentRgb},0.06) 0%, #0d0d0f 55%)`,
        border: `1px solid ${hov ? `rgba(${p.accentRgb},0.20)` : "rgba(255,255,255,0.07)"}`,
        boxShadow: hov ? `0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(${p.accentRgb},0.10)` : "none",
        transition: "transform 0.4s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.4s ease, border-color 0.3s ease",
        transform: hov ? "translateY(-7px)" : "translateY(0)",
      }}
    >
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={p.image} alt={p.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.48) saturate(0.65)",
            transition: "transform 0.7s cubic-bezier(0.25,0.1,0.25,1)",
            transform: hov ? "scale(1.07)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "70px",
          background: "linear-gradient(to bottom, transparent, #0d0d0f)",
        }} />
        <div style={{
          position: "absolute", top: "14px", left: "14px",
          display: "flex", alignItems: "center", gap: "6px",
          background: "rgba(0,0,0,0.60)", backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          padding: "5px 12px", borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.10)",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: p.dot, flexShrink: 0,
            boxShadow: p.dot !== "rgba(255,255,255,0.30)" ? `0 0 7px ${p.dot}` : "none",
          }} />
          <span style={{ fontSize: "11px", fontWeight: 600, color: p.tagColor, letterSpacing: "0.01em" }}>
            {p.tag}
          </span>
        </div>
      </div>

      <div style={{ padding: "18px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h4 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 4px",
        }}>
          {p.title}
        </h4>
        <p style={{
          fontSize: "12px", color: "rgba(255,255,255,0.36)",
          margin: "0 0 12px", letterSpacing: "-0.01em",
        }}>
          {p.subtitle}
        </p>
        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.52)",
          lineHeight: 1.6, margin: "0", flex: 1,
        }}>
          {p.desc}
        </p>

        <div style={{
          marginTop: "18px", paddingTop: "14px",
          borderTop: `1px solid rgba(${p.accentRgb}, 0.09)`,
          display: "flex", alignItems: "center", gap: "16px",
        }}>
          <span style={{
            fontSize: "13px", fontWeight: 600, color: "#2997ff",
            cursor: "pointer", letterSpacing: "-0.01em",
          }}>
            {p.cta}
          </span>
          <span style={{
            fontSize: "13px",
            color: hov ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.28)",
            cursor: "pointer", transition: "color 0.2s",
          }}>
            View details ›
          </span>
        </div>
      </div>
    </div>
  );
}
