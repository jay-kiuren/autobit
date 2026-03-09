import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// ── Data ─────────────────────────────────────────────

const iotProjects = [
  {
    id: "earlynx",
    title: "Earlynx",
    subtitle: "AI Cancer Screening",
    badge: "🏆 Champion 2026",
    badgeBlue: true,
    tags: ["Embedded AI", "Sensor Fusion", "CNN Model"],
    desc: "Non-invasive diagnostic prototype using sensor fusion to analyze saliva samples for early cancer detection. Evaluated by DOST.",
    price: "Champion",
    priceLabel: "Life & Science Category",
    status: "Awarded",
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
    price: "Champion",
    priceLabel: "Innovation Category",
    status: "Awarded",
    statusColor: "#30d158",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
];

const gridsonarProject = {
  id: "gridsonar",
  title: "GridSonar",
  subtitle: "Power Grid Management System",
  badge: "Patent Pending",
  badgeBlue: false,
  tags: ["Real-World 3D Software", "Mesh Architecture", "Predictive AI", "Fault Detection"],
  desc: "Self-healing mesh submetering system with real-time fault detection and predictive AI. First-of-its-kind architecture for power grid management.",
  price: "Patent Pending",
  priceLabel: "Real-world deployed",
  status: "In Market",
  statusColor: "#2997ff",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
};

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

// ── Reusable card components ────────────────────────

const cardBase: React.CSSProperties = {
  background: "#111113",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "18px",
  overflow: "hidden",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.38s cubic-bezier(0.25,0.1,0.25,1), border-color 0.3s ease",
};

function IotCard({ p, hovered, setHovered }: { p: typeof iotProjects[0]; hovered: string | null; setHovered: (id: string | null) => void }) {
  const isHov = hovered === p.id;
  return (
    <div
      id={p.id}
      onMouseEnter={() => setHovered(p.id)}
      onMouseLeave={() => setHovered(null)}
      style={{
        ...cardBase,
        flex: "1 1 0",
        minWidth: "260px",
        maxWidth: "420px",
        transform: isHov ? "translateY(-6px)" : "translateY(0)",
        borderColor: isHov ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img
          src={p.image} alt={p.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.58) saturate(0.72)",
            transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
            transform: isHov ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Gift icon equivalent — badge */}
        <div style={{
          position: "absolute", bottom: "14px", right: "14px",
          background: p.badgeBlue ? "rgba(41,151,255,0.18)" : "rgba(255,255,255,0.08)",
          border: `1px solid ${p.badgeBlue ? "rgba(41,151,255,0.30)" : "rgba(255,255,255,0.12)"}`,
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
      <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 4px",
        }}>
          {p.title}
        </h3>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.36)", margin: "0 0 10px" }}>
          {p.subtitle}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              fontSize: "10px", padding: "3px 9px", borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.46)", letterSpacing: "0.03em",
            }}>{tag}</span>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.52)", lineHeight: 1.55, margin: "0 0 auto", flex: 1 }}>
          {p.desc}
        </p>

        {/* Bottom — like Huawei's price + buy */}
        <div style={{
          marginTop: "20px", paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontSize: "18px", fontWeight: 700, color: p.statusColor, letterSpacing: "-0.02em",
            }}>
              {p.price}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>
              {p.priceLabel}
            </div>
          </div>
          <div style={{
            background: isHov ? "#2997ff" : "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "9999px", padding: "8px 18px",
            fontSize: "12px", fontWeight: 600,
            color: isHov ? "#fff" : "rgba(255,255,255,0.55)",
            transition: "all 0.25s ease",
            letterSpacing: "0.01em",
          }}>
            View Project
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ p, hovered, setHovered }: { p: typeof platformProjects[0]; hovered: string | null; setHovered: (id: string | null) => void }) {
  const isHov = hovered === p.id;
  return (
    <div
      id={p.id}
      onMouseEnter={() => setHovered(p.id)}
      onMouseLeave={() => setHovered(null)}
      style={{
        ...cardBase,
        flex: "1 1 0",
        minWidth: "200px",
        transform: isHov ? "translateY(-5px)" : "translateY(0)",
        borderColor: isHov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
        <img
          src={p.image} alt={p.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "brightness(0.45) saturate(0.60)",
            transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
            transform: isHov ? "scale(1.07)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          display: "flex", alignItems: "center", gap: "5px",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: p.dot,
            boxShadow: p.dot !== "rgba(255,255,255,0.22)" ? `0 0 8px ${p.dot}` : "none",
          }} />
          <span style={{
            fontSize: "10px", fontWeight: 600, color: p.tagColor,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)",
            padding: "3px 9px", borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
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
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)", margin: "0 0 10px" }}>
          {p.subtitle}
        </p>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.48)", lineHeight: 1.55, margin: 0 }}>
          {p.desc}
        </p>
      </div>
    </div>
  );
}

// ── Section label ───────────────────────────────────

function RowLabel({ label, count }: { label: string; count: number }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <h2 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "clamp(17px,2vw,22px)", fontWeight: 600,
          letterSpacing: "-0.02em", color: "#fff", margin: 0,
        }}>
          {label}
        </h2>
        <span style={{
          fontSize: "11px", color: "rgba(255,255,255,0.22)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "9999px", padding: "3px 10px",
        }}>
          {count} {count === 1 ? "project" : "projects"}
        </span>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────

const Projects = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
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
        {/* ── Header ─────────────────────────────── */}
        <section style={{ paddingTop: "112px" }}>
          <div className="section-container">
            <ScrollReveal>
              <div style={{
                display: "flex", alignItems: "flex-end",
                justifyContent: "space-between", flexWrap: "wrap",
                gap: "16px", paddingBottom: "40px",
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
            <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />
          </div>
        </section>

        {/* ── ROW 1: IoT & Hardware ───────────────── */}
        <section style={{ paddingTop: "52px" }}>
          <div className="section-container">
            <ScrollReveal>
              <RowLabel label="IoT & Hardware" count={iotProjects.length} />
            </ScrollReveal>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {iotProjects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.08}>
                  <IotCard p={p} hovered={hovered} setHovered={setHovered} />
                </ScrollReveal>
              ))}
              {/* Filler CTA card */}
              <ScrollReveal delay={0.16}>
                <div style={{
                  ...cardBase,
                  flex: "1 1 0",
                  minWidth: "220px",
                  maxWidth: "320px",
                  minHeight: "360px",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px dashed rgba(255,255,255,0.09)",
                  padding: "40px 28px",
                  textAlign: "center",
                }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "rgba(41,151,255,0.12)",
                    border: "1px solid rgba(41,151,255,0.22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", marginBottom: "16px",
                  }}>
                    +
                  </div>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.30)", lineHeight: 1.6, margin: "0 0 16px" }}>
                    Have an IoT or hardware project in mind?
                  </p>
                  <a href="mailto:autobitofficial.ph@gmail.com" style={{
                    fontSize: "12px", color: "#2997ff", textDecoration: "none",
                    fontWeight: 600, letterSpacing: "0.01em",
                  }}>
                    Start a project →
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── ROW 2: GridSonar (standalone) ──────── */}
        <section style={{ paddingTop: "56px" }}>
          <div className="section-container">
            <ScrollReveal>
              <RowLabel label="GridSonar" count={1} />
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <div
                id={gridsonarProject.id}
                onMouseEnter={() => setHovered(gridsonarProject.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  ...cardBase,
                  flexDirection: "row",
                  minHeight: "260px",
                  transform: hovered === gridsonarProject.id ? "translateY(-5px)" : "translateY(0)",
                  borderColor: hovered === gridsonarProject.id ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.07)",
                }}
              >
                {/* Left: image */}
                <div style={{ position: "relative", width: "45%", minWidth: "240px", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={gridsonarProject.image} alt={gridsonarProject.title}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      filter: "brightness(0.52) saturate(0.68)",
                      transition: "transform 0.6s cubic-bezier(0.25,0.1,0.25,1)",
                      transform: hovered === gridsonarProject.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  {/* Patent badge on image */}
                  <div style={{
                    position: "absolute", bottom: "16px", left: "16px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "9999px", padding: "6px 14px",
                    fontSize: "11px", fontWeight: 600,
                    color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em",
                  }}>
                    {gridsonarProject.badge}
                  </div>
                </div>

                {/* Right: content */}
                <div style={{ padding: "32px 36px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {gridsonarProject.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: "10px", padding: "3px 10px", borderRadius: "9999px",
                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.46)", letterSpacing: "0.03em",
                      }}>{tag}</span>
                    ))}
                  </div>
                  <h3 style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                    fontSize: "clamp(24px,3vw,36px)", fontWeight: 700,
                    letterSpacing: "-0.03em", color: "#fff", margin: "0 0 6px",
                  }}>
                    {gridsonarProject.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.36)", margin: "0 0 14px" }}>
                    {gridsonarProject.subtitle}
                  </p>
                  <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.60)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: "480px" }}>
                    {gridsonarProject.desc}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div>
                      <div style={{
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                        fontSize: "18px", fontWeight: 700, color: gridsonarProject.statusColor, letterSpacing: "-0.02em",
                      }}>
                        {gridsonarProject.status}
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginTop: "2px" }}>
                        {gridsonarProject.priceLabel}
                      </div>
                    </div>
                    <div style={{
                      background: hovered === gridsonarProject.id ? "#2997ff" : "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "9999px", padding: "9px 22px",
                      fontSize: "13px", fontWeight: 600,
                      color: hovered === gridsonarProject.id ? "#fff" : "rgba(255,255,255,0.55)",
                      transition: "all 0.25s ease", cursor: "pointer",
                    }}>
                      View Project
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── ROW 3: Platforms & Software ────────── */}
        <section style={{ paddingTop: "56px", paddingBottom: "80px" }}>
          <div className="section-container">
            <ScrollReveal>
              <RowLabel label="Platforms & Software" count={platformProjects.length} />
            </ScrollReveal>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {platformProjects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.07}>
                  <PlatformCard p={p} hovered={hovered} setHovered={setHovered} />
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
