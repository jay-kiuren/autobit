import { useState } from "react";

interface IotProject {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeBlue: boolean;
  tags: string[];
  desc: string;
  statusLabel: string;
  statusColor: string;
  accentRgb: string;
  image: string;
}

export function IotCard({ p }: { p: IotProject }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: "320px",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(160deg, rgba(${p.accentRgb},0.07) 0%, #0e0e10 60%)`,
        border: `1px solid ${hov ? `rgba(${p.accentRgb},0.22)` : "rgba(255,255,255,0.07)"}`,
        boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(${p.accentRgb},0.12)` : "none",
        transition: "transform 0.4s cubic-bezier(0.25,0.1,0.25,1), box-shadow 0.4s ease, border-color 0.3s ease",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
        <img
          src={p.image} alt={p.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.60) saturate(0.75)",
            transition: "transform 0.7s cubic-bezier(0.25,0.1,0.25,1)",
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: `linear-gradient(to bottom, transparent, #0e0e10)`,
        }} />
        <div style={{
          position: "absolute", top: "14px", left: "14px",
          background: p.badgeBlue ? "rgba(41,151,255,0.20)" : "rgba(255,255,255,0.10)",
          border: `1px solid ${p.badgeBlue ? "rgba(41,151,255,0.35)" : "rgba(255,255,255,0.15)"}`,
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          borderRadius: "9999px", padding: "5px 13px",
          fontSize: "11px", fontWeight: 600,
          color: p.badgeBlue ? "#2997ff" : "rgba(255,255,255,0.60)",
          letterSpacing: "0.02em",
        }}>
          {p.badge}
        </div>
      </div>

      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "20px", fontWeight: 700, letterSpacing: "-0.022em",
          color: "#fff", margin: "0 0 4px",
        }}>
          {p.title}
        </h3>
        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.40)",
          margin: "0 0 14px", letterSpacing: "-0.01em",
        }}>
          {p.subtitle}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              fontSize: "10px", padding: "3px 10px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.45)", letterSpacing: "0.03em",
            }}>{tag}</span>
          ))}
        </div>

        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.52)",
          lineHeight: 1.6, margin: "0", flex: 1,
        }}>
          {p.desc}
        </p>

        <div style={{
          marginTop: "20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "16px",
          borderTop: `1px solid rgba(${p.accentRgb}, 0.10)`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: p.statusColor,
              boxShadow: `0 0 8px ${p.statusColor}88`,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: "12px", fontWeight: 600,
              color: p.statusColor, letterSpacing: "-0.01em",
            }}>
              {p.statusLabel}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{
              fontSize: "13px", fontWeight: 600,
              color: "#2997ff",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}>
              Learn more
            </span>
            <span style={{
              fontSize: "13px",
              color: hov ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
              cursor: "pointer", transition: "color 0.2s",
            }}>
              View details ›
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
