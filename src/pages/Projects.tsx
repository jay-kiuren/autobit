import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

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
    desc: "Open-core AI safety OS for critical infrastructure. Decentralized, built for the real world.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: "minesafe",
    title: "MineSafe AI",
    subtitle: "Mining Hazard Detection",
    tag: "Stage 0",
    tagColor: "rgba(255,255,255,0.38)",
    dot: "rgba(255,255,255,0.22)",
    desc: "Mining hazard detection engine using computer vision and environmental sensors.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
  },
  {
    id: "school",
    title: "School Systems",
    subtitle: "Education Management",
    tag: "Live",
    tagColor: "#30d158",
    dot: "#30d158",
    desc: "Enrollment, grading, and management systems deployed in educational institutions.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
  },
  {
    id: "dashboards",
    title: "Business Dashboards",
    subtitle: "Analytics & Operations",
    tag: "Deployed",
    tagColor: "#30d158",
    dot: "#30d158",
    desc: "Custom analytics and operations dashboards for businesses.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

// ── Horizontal scroll row ────────────────────────────

function ScrollRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <div style={{ marginBottom: "56px" }}>
      {/* Row header */}
      <div className="section-container" style={{ marginBottom: "20px" }}>
        <ScrollReveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontSize: "clamp(18px,2.2vw,24px)", fontWeight: 600,
              letterSpacing: "-0.02em", color: "#fff", margin: 0,
            }}>
              {label}
            </h2>
            {/* Arrow buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {(["left", "right"] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "14px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  {dir === "left" ? "←" : "→"}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Scrollable track */}
      <div
        ref={rowRef}
        className="scrollbar-hidden"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          overflowY: "visible",
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "12px",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── IoT card ─────────────────────────────────────────

function IotCard({ p }: { p: typeof iotProjects[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: "300px",
        background: "#111113",
        border: `1px solid ${hov ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.38s cubic-bezier(0.25,0.1,0.25,1), border-color 0.3s ease",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={p.image} alt={p.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.55) saturate(0.70)",
            transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
            transform: hov ? "scale(1.07)" : "scale(1)",
          }}
        />
        {/* Badge */}
        <div style={{
          position: "absolute", bottom: "12px", right: "12px",
          background: p.badgeBlue ? "rgba(41,151,255,0.18)" : "rgba(255,255,255,0.09)",
          border: `1px solid ${p.badgeBlue ? "rgba(41,151,255,0.30)" : "rgba(255,255,255,0.13)"}`,
          backdropFilter: "blur(12px)",
          borderRadius: "9999px", padding: "5px 12px",
          fontSize: "10px", fontWeight: 600,
          color: p.badgeBlue ? "#2997ff" : "rgba(255,255,255,0.50)",
          letterSpacing: "0.02em",
        }}>
          {p.badge}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 3px",
        }}>
          {p.title}
        </h3>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.34)", margin: "0 0 10px" }}>
          {p.subtitle}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              fontSize: "10px", padding: "3px 9px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.44)", letterSpacing: "0.03em",
            }}>{tag}</span>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.50)", lineHeight: 1.55, margin: "0 0 auto", flex: 1 }}>
          {p.desc}
        </p>

        {/* Bottom */}
        <div style={{
          marginTop: "18px", paddingTop: "14px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: p.statusColor, letterSpacing: "-0.01em" }}>
              {p.statusLabel}
            </div>
          </div>
          <div style={{
            background: hov ? "#2997ff" : "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "9999px", padding: "7px 16px",
            fontSize: "11px", fontWeight: 600,
            color: hov ? "#fff" : "rgba(255,255,255,0.50)",
            transition: "all 0.25s ease",
          }}>
            View
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Platform card ─────────────────────────────────────

function PlatformCard({ p }: { p: typeof platformProjects[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        width: "280px",
        background: "#111113",
        border: `1px solid ${hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.38s cubic-bezier(0.25,0.1,0.25,1), border-color 0.3s ease",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
      }}
    >
      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img
          src={p.image} alt={p.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.45) saturate(0.60)",
            transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
            transform: hov ? "scale(1.07)" : "scale(1)",
          }}
        />
        {/* Status badge */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          display: "flex", alignItems: "center", gap: "5px",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)",
          padding: "4px 10px", borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}>
          <span style={{
            width: "5px", height: "5px", borderRadius: "50%",
            background: p.dot,
            boxShadow: p.dot !== "rgba(255,255,255,0.22)" ? `0 0 6px ${p.dot}` : "none",
            flexShrink: 0,
          }} />
          <span style={{ fontSize: "10px", fontWeight: 600, color: p.tagColor, letterSpacing: "0.02em" }}>
            {p.tag}
          </span>
        </div>
      </div>

      <div style={{ padding: "16px 18px 20px" }}>
        <h4 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "16px", fontWeight: 700, letterSpacing: "-0.018em",
          color: "#fff", margin: "0 0 3px",
        }}>
          {p.title}
        </h4>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.30)", margin: "0 0 10px" }}>
          {p.subtitle}
        </p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.46)", lineHeight: 1.55, margin: 0 }}>
          {p.desc}
        </p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────

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

        {/* Header */}
        <section style={{ paddingTop: "112px", paddingBottom: "52px" }}>
          <div className="section-container">
            <ScrollReveal>
              <div style={{
                display: "flex", alignItems: "flex-end",
                justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
              }}>
                <div>
                  <span style={{
                    fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)", display: "block", marginBottom: "10px",
                  }}>
                    What we've built
                  </span>
                  <h1 style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: "clamp(36px,5vw,54px)", fontWeight: 700,
                    letterSpacing: "-0.035em", lineHeight: 1.05,
                    color: "#fff", margin: 0,
                  }}>
                    Projects
                  </h1>
                </div>
                <p style={{
                  fontSize: "15px", color: "rgba(255,255,255,0.35)",
                  maxWidth: "300px", lineHeight: 1.6, margin: 0, textAlign: "right",
                }}>
                  Real systems. Deployed, patented, and nationally awarded.
                </p>
              </div>
            </ScrollReveal>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginTop: "40px" }} />
          </div>
        </section>

        {/* Row 1 — IoT & Hardware */}
        <ScrollRow label="IoT & Hardware">
          {iotProjects.map((p) => <IotCard key={p.id} p={p} />)}
        </ScrollRow>

        {/* Row 2 — Platforms & Software */}
        <ScrollRow label="Platforms & Software">
          {platformProjects.map((p) => <PlatformCard key={p.id} p={p} />)}
        </ScrollRow>

        <div style={{ paddingBottom: "60px" }} />
      </main>
      <Footer />
    </>
  );
};

export default Projects;
