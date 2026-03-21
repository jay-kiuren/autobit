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

const FeaturedCard = ({ p }: { p: PlatformProject }) => {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        height: "460px",
        border: `1px solid ${hov ? "rgba(41,151,255,0.20)" : "rgba(255,255,255,0.07)"}`,
        background: "#0e0e10",
        transition: "transform 0.4s ease, border-color 0.3s ease, box-shadow 0.4s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {/* Background image */}
      <img
        src={p.image}
        alt={p.title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.35) saturate(0.6)",
          transition: "transform 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          transform: hov ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "70%",
        background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 40%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        padding: "36px 40px",
      }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          padding: "5px 12px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.10)",
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: p.dot,
            flexShrink: 0,
            boxShadow: p.dot !== "rgba(255,255,255,0.30)" ? `0 0 7px ${p.dot}` : "none",
          }} />
          <span style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: p.tagColor,
            letterSpacing: "0.01em",
          }}>
            {p.tag}
          </span>
        </div>

        <h2 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "clamp(28px,3.5vw,42px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#f5f5f7",
          margin: "12px 0 8px",
        }}>
          {p.title}
        </h2>

        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "14px",
          color: "rgba(255,255,255,0.45)",
          margin: "0 0 20px",
        }}>
          {p.subtitle}
        </p>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <button style={{
            background: "#2997ff",
            color: "#fff",
            padding: "11px 24px",
            borderRadius: "980px",
            fontSize: "14px",
            fontWeight: 500,
            border: "none",
            cursor: "pointer",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          }}>
            Explore AXONIS →
          </button>
          <button style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.65)",
            padding: "11px 24px",
            borderRadius: "980px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          }}>
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
