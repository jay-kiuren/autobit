import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// ── Data ──────────────────────────────────────────────────────────────────────

const iotProjects = [
  {
    id: "earlynx",
    title: "Earlynx",
    subtitle: "AI Cancer Screening",
    badge: "🏆 Champion 2026",
    badgeBlue: true,
    tags: ["Embedded AI", "Sensor Fusion", "CNN Model"],
    desc: "Non-invasive diagnostic prototype using sensor fusion to analyze saliva samples for early cancer detection. Evaluated by DOST.",
    statusLabel: "Life & Science Category",
    statusColor: "#30d158",
    accentRgb: "48, 209, 88",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    id: "air-filtration",
    title: "Air Filtration",
    subtitle: "Piggery IoT System",
    badge: "🏆 Champion 2026",
    badgeBlue: true,
    tags: ["Arduino Uno", "MQ137 Sensor", "DOST Verified"],
    desc: "Smart air quality filtration device for piggery environments. Congress Innovation Category champion.",
    statusLabel: "Innovation Category",
    statusColor: "#30d158",
    accentRgb: "48, 209, 88",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    id: "gridsonar",
    title: "GridSonar",
    subtitle: "Power Grid Management",
    badge: "Patent Pending",
    badgeBlue: false,
    tags: ["Mesh Architecture", "Predictive AI", "Fault Detection"],
    desc: "Self-healing mesh submetering system with real-time fault detection and predictive AI for power grid management.",
    statusLabel: "In Market",
    statusColor: "#2997ff",
    accentRgb: "41, 151, 255",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
];

const platformProjects = [
  {
    id: "axonis",
    title: "AXONIS Platform",
    subtitle: "AI Safety OS",
    tag: "Active Dev",
    tagColor: "#2997ff",
    dot: "#2997ff",
    accentRgb: "41, 151, 255",
    desc: "Open-core AI safety OS for critical infrastructure. Decentralized, built for the real world.",
    cta: "Learn more",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "minesafe",
    title: "MineSafe AI",
    subtitle: "Mining Hazard Detection",
    tag: "Stage 0",
    tagColor: "rgba(255,255,255,0.45)",
    dot: "rgba(255,255,255,0.30)",
    accentRgb: "255,255,255",
    desc: "Mining hazard detection engine using computer vision and environmental sensors.",
    cta: "Learn more",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
  {
    id: "school",
    title: "School Systems",
    subtitle: "Education Management",
    tag: "Live",
    tagColor: "#30d158",
    dot: "#30d158",
    accentRgb: "48, 209, 88",
    desc: "Enrollment, grading, and management systems deployed in educational institutions.",
    cta: "Learn more",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
  },
  {
    id: "dashboards",
    title: "Business Dashboards",
    subtitle: "Analytics & Operations",
    tag: "Deployed",
    tagColor: "#30d158",
    dot: "#30d158",
    accentRgb: "48, 209, 88",
    desc: "Custom analytics and operations dashboards for businesses.",
    cta: "Learn more",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

// ── Scroll Row ────────────────────────────────────────────────────────────────

function ScrollRow({ label, count, children }: {
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir: "left" | "right") => {
    rowRef.current?.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <div style={{ marginBottom: "72px" }}>
      {/* Row header */}
      <div className="section-container" style={{ marginBottom: "24px" }}>
        <ScrollReveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <h2 style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 700,
                letterSpacing: "-0.025em", color: "#fff", margin: 0,
              }}>
                {label}
              </h2>
              <span style={{
                fontSize: "12px", color: "rgba(255,255,255,0.25)",
                fontVariantNumeric: "tabular-nums",
              }}>
                {count}
              </span>
            </div>
            {/* Arrow pair */}
            <div style={{ display: "flex", gap: "8px" }}>
              {(["left", "right"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    background: (dir === "left" ? canLeft : canRight)
                      ? "rgba(255,255,255,0.09)"
                      : "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: (dir === "left" ? canLeft : canRight)
                      ? "rgba(255,255,255,0.75)"
                      : "rgba(255,255,255,0.18)",
                    fontSize: "15px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.22s ease", outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if ((dir === "left" && canLeft) || (dir === "right" && canRight)) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = (dir === "left" ? canLeft : canRight)
                      ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.03)";
                    e.currentTarget.style.color = (dir === "left" ? canLeft : canRight)
                      ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)";
                  }}
                >
                  {dir === "left" ? "‹" : "›"}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Track */}
      <div
        ref={rowRef}
        className="scrollbar-hidden"
        onScroll={updateArrows}
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          overflowY: "visible",
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "16px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── IoT Card (Apple-style: image top, content bottom, always-visible CTA) ─────

function IotCard({ p }: { p: typeof iotProjects[0] }) {
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
      {/* ── Image block ── */}
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
        {/* Gradient fade into card body */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: `linear-gradient(to bottom, transparent, #0e0e10)`,
        }} />
        {/* Badge */}
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

      {/* ── Content block ── */}
      <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Title + subtitle */}
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

        {/* Tags */}
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

        {/* Desc */}
        <p style={{
          fontSize: "13px", color: "rgba(255,255,255,0.52)",
          lineHeight: 1.6, margin: "0", flex: 1,
        }}>
          {p.desc}
        </p>

        {/* ── CTA row — always visible, Apple style ── */}
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

// ── Platform Card ─────────────────────────────────────────────────────────────

function PlatformCard({ p }: { p: typeof platformProjects[0] }) {
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
      {/* Image */}
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
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "70px",
          background: "linear-gradient(to bottom, transparent, #0d0d0f)",
        }} />
        {/* Status pill */}
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

      {/* Content */}
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

        {/* CTA — always visible */}
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

// ── Page ──────────────────────────────────────────────────────────────────────

const Projects = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main
        style={{
          filter: navDropdownActive ? "blur(8px)" : "none",
          opacity: navDropdownActive ? 0.45 : 1,
          transition: "filter 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)",
          background: "#000",
        }}
      >
        {/* ── Page header ──────────────────────────────── */}
        <section style={{ paddingTop: "112px", paddingBottom: "56px" }}>
          <div className="section-container">
            <ScrollReveal>
              <div style={{
                display: "flex", alignItems: "flex-end",
                justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
              }}>
                <div>
                  <span style={{
                    fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)", display: "block", marginBottom: "12px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                  }}>
                    What we've built
                  </span>
                  <h1 style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: "clamp(40px,5.5vw,60px)", fontWeight: 700,
                    letterSpacing: "-0.04em", lineHeight: 1.02,
                    color: "#fff", margin: 0,
                  }}>
                    Projects
                  </h1>
                </div>
                <p style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                  fontSize: "15px", color: "rgba(255,255,255,0.38)",
                  maxWidth: "280px", lineHeight: 1.65, margin: 0, textAlign: "right",
                }}>
                  Real systems. Deployed, patented, and nationally awarded.
                </p>
              </div>
            </ScrollReveal>
            <div style={{
              height: "1px",
              background: "linear-gradient(to right, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
              marginTop: "40px",
            }} />
          </div>
        </section>

        {/* ── Row 1: IoT & Hardware ─────────────────────── */}
        <ScrollRow label="IoT & Hardware" count={iotProjects.length}>
          {iotProjects.map((p) => <IotCard key={p.id} p={p} />)}
        </ScrollRow>

        {/* ── Row 2: Platforms & Software ───────────────── */}
        <ScrollRow label="Platforms & Software" count={platformProjects.length}>
          {platformProjects.map((p) => <PlatformCard key={p.id} p={p} />)}
        </ScrollRow>

        {/* ── Credibility stats bar ───────────────────── */}
        <section style={{ paddingBottom: "72px" }}>
          <div className="section-container">
            <ScrollReveal>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(255,255,255,0.02)",
              }}>
                {[
                  { value: "3", label: "National awards", sub: "DOST · Congress 2026" },
                  { value: "1", label: "Patent pending", sub: "GridSonar mesh system" },
                  { value: "7+", label: "Projects shipped", sub: "Deployed & in market" },
                  { value: "2026", label: "Champion", sub: "Life & Innovation categories" },
                ].map((stat, i) => (
                  <div key={i} style={{
                    padding: "32px 24px",
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    textAlign: "center",
                  }}>
                    <div style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                      fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 700,
                      letterSpacing: "-0.04em", color: "#fff",
                      lineHeight: 1,
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: "13px", fontWeight: 600,
                      color: "rgba(255,255,255,0.75)",
                      marginTop: "8px", letterSpacing: "-0.01em",
                    }}>
                      {stat.label}
                    </div>
                    <div style={{
                      fontSize: "11px", color: "rgba(255,255,255,0.28)",
                      marginTop: "4px", letterSpacing: "0.01em",
                    }}>
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Why it matters section ─────────────────── */}
        <section style={{ paddingBottom: "100px" }}>
          <div className="section-container">
            <ScrollReveal>
              <div style={{
                display: "flex", alignItems: "flex-end",
                justifyContent: "space-between", flexWrap: "wrap",
                gap: "16px", marginBottom: "32px",
              }}>
                <h2 style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                  fontSize: "clamp(28px,4vw,42px)", fontWeight: 700,
                  letterSpacing: "-0.035em", lineHeight: 1.08,
                  color: "#fff", margin: 0, maxWidth: "480px",
                }}>
                  Why work with Autobit.
                </h2>
                <a href="/services" style={{
                  fontSize: "14px", fontWeight: 600, color: "#2997ff",
                  textDecoration: "none", letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}>
                  See all services ›
                </a>
              </div>
            </ScrollReveal>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
            }}>
              {[
                {
                  eyebrow: "Proven track record",
                  headline: "We build things that actually work.",
                  body: "Not mockups. Real deployed systems, nationally awarded prototypes, and patent-pending IP. Every project on this page shipped.",
                  accent: "48, 209, 88",
                  cta: false,
                },
                {
                  eyebrow: "Fast delivery",
                  headline: "From idea to live system in days.",
                  body: "Tier 1 projects ship in 2–5 days. No bloated agency timelines, no waiting months for a working product.",
                  accent: "41, 151, 255",
                  cta: false,
                },
                {
                  eyebrow: "Start a project",
                  headline: "Ready when you are.",
                  body: "50% deposit to start, balance on delivery. No retainers, no lock-in. If we don't deliver, you don't pay the rest.",
                  accent: "255, 159, 10",
                  cta: true,
                },
              ].map((card, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div style={{
                    background: `linear-gradient(150deg, rgba(${card.accent},0.07) 0%, #0e0e10 60%)`,
                    border: `1px solid rgba(${card.accent},0.13)`,
                    borderRadius: "20px",
                    padding: "28px 28px 32px",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "280px",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: "-40px", right: "-40px",
                      width: "160px", height: "160px", borderRadius: "50%",
                      background: `rgba(${card.accent}, 0.06)`,
                      filter: "blur(40px)", pointerEvents: "none",
                    }} />
                    <span style={{
                      fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
                      color: `rgba(${card.accent}, 0.85)`,
                      marginBottom: "14px", display: "block", fontWeight: 600,
                    }}>
                      {card.eyebrow}
                    </span>
                    <h3 style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                      fontSize: "clamp(18px,2vw,22px)", fontWeight: 700,
                      letterSpacing: "-0.022em", lineHeight: 1.2,
                      color: "#fff", margin: "0 0 12px",
                    }}>
                      {card.headline}
                    </h3>
                    <p style={{
                      fontSize: "14px", color: "rgba(255,255,255,0.50)",
                      lineHeight: 1.65, margin: "0", flex: 1,
                    }}>
                      {card.body}
                    </p>
                    {card.cta ? (
                      <a href="mailto:autobitofficial.ph@gmail.com" style={{
                        marginTop: "24px",
                        display: "inline-flex", alignItems: "center",
                        background: "#2997ff",
                        borderRadius: "9999px", padding: "11px 24px",
                        fontSize: "14px", fontWeight: 600, color: "#fff",
                        textDecoration: "none", width: "fit-content",
                        boxShadow: "0 0 24px rgba(41,151,255,0.28)",
                      }}>
                        Start a project
                      </a>
                    ) : (
                      <div style={{
                        marginTop: "24px", height: "1px",
                        background: `linear-gradient(to right, rgba(${card.accent},0.20), transparent)`,
                      }} />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Projects;
