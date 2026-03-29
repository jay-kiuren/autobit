import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { useContactModal } from "@/contexts/ContactModalContext";
import { iotProjects } from "../data";

const Panel03: React.FC = () => {
  const { openModal } = useContactModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useRef<boolean>(false);

  const fonts = {
    display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    text: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
  };

  const theme = {
    bg: "#000000",
    cardBg: "#0e0e10",
    primary: "#f5f5f7",
    secondary: "rgba(255,255,255,0.70)",
    muted: "rgba(255,255,255,0.40)",
    accentGreen: "#30d158",
    badgeBlue: "#0071e3",
  };

  // Duplicate projects for seamless loop
  const loopProjects = [...iotProjects, ...iotProjects, ...iotProjects];

  const CARD_WIDTH = 680;
  const CARD_GAP = 24;
  const STEP = CARD_WIDTH + CARD_GAP;
  const TOTAL_WIDTH = STEP * iotProjects.length;
  const SPEED = 0.6;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          posRef.current = 0;
          if (trackRef.current) trackRef.current.style.transform = `translateX(0px)`;
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animate = () => {
      if (isVisible.current && trackRef.current) {
        posRef.current -= SPEED;
        if (Math.abs(posRef.current) >= TOTAL_WIDTH) {
          posRef.current = 0;
        }
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="panel03-section"
      style={{
        position: "relative",
        background: theme.bg,
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      {/* Responsive Styles Overlay */}
      <style>{`
        .panel03-header { 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 0 48px; 
          margin-bottom: 64px; 
        }
        .iot-card {
          flex-shrink: 0;
          width: ${CARD_WIDTH}px;
          height: 540px;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          background: ${theme.cardBg};
          cursor: default;
        }
        
        @media (max-width: 768px) {
          .panel03-section { padding: 60px 0 !important; }
          .panel03-header { padding: 0 24px !important; margin-bottom: 32px !important; }
          .iot-card { 
            width: 320px !important; 
            height: 420px !important; 
            border-radius: 20px !important; 
          }
          .card-title { font-size: 22px !important; }
          .card-subtitle { font-size: 13px !important; max-width: 100% !important; }
          .card-content { bottom: 24px !important; left: 24px !important; right: 24px !important; }
          .card-badge { top: 20px !important; left: 20px !important; }
        }
      `}</style>

      {/* Header */}
      <div className="panel03-header">
        <ScrollReveal>
          <p style={{
            fontFamily: fonts.text,
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: theme.muted,
            marginBottom: "16px",
            fontWeight: 600,
          }}>
            Industrial Intelligence · IoT
          </p>
          <h2 style={{
            fontFamily: fonts.display,
            fontSize: "clamp(42px, 5vw, 56px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: theme.primary,
            margin: "0 0 16px",
          }}>
            Built in the real world.
          </h2>
          <p style={{
            fontFamily: fonts.text,
            fontSize: "19px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.5,
            maxWidth: "500px",
            margin: 0,
          }}>
            Nationally awarded hardware protocols and autonomous systems.
          </p>
        </ScrollReveal>
      </div>

      {/* Scrolling Track */}
      <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>

        {/* Left fade */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: "120px", zIndex: 10,
          background: "linear-gradient(to right, #000 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Right fade */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: "120px", zIndex: 10,
          background: "linear-gradient(to left, #000 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            willChange: "transform",
            paddingLeft: "48px",
          }}
        >
          {loopProjects.map((project, i) => (
            <div key={i} className="iot-card">
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  position: "absolute", top: 0, left: 0,
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "60%",
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                pointerEvents: "none",
              }} />

              {/* Badge */}
              <div className="card-badge" style={{ position: "absolute", top: "32px", left: "32px" }}>
                <span style={{
                  padding: "6px 14px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: project.badgeBlue ? theme.badgeBlue : "rgba(255,255,255,0.15)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                  fontFamily: fonts.text,
                }}>
                  {project.badge}
                </span>
              </div>

              {/* Bottom info */}
              <div className="card-content" style={{ position: "absolute", bottom: "40px", left: "40px", right: "40px" }}>
                <h3 className="card-title" style={{
                  fontFamily: fonts.display,
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#fff",
                  margin: "0 0 8px",
                  letterSpacing: "-0.02em",
                }}>
                  {project.title}
                </h3>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "10px" }}>
                  <p className="card-subtitle" style={{
                    fontFamily: fonts.text,
                    fontSize: "15px",
                    color: theme.secondary,
                    margin: 0,
                    maxWidth: "70%",
                  }}>
                    {project.subtitle}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: project.statusColor || theme.accentGreen,
                      boxShadow: `0 0 8px ${project.statusColor || theme.accentGreen}`,
                    }} />
                    <span style={{
                      fontFamily: fonts.text,
                      fontSize: "12px",
                      color: theme.muted,
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                    }}>
                      {project.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Start a project + Learn more */}
                <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={openModal}
                    style={{
                      padding: "10px 22px",
                      borderRadius: "980px",
                      background: "#fff",
                      color: "#000",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: fonts.text,
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "-0.01em",
                      transition: "background 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#e0e0e0"; e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Start a project
                  </button>
                  <Link
                    to="/services"
                    style={{
                      padding: "10px 22px",
                      borderRadius: "980px",
                      background: "rgba(255,255,255,0.10)",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 600,
                      fontFamily: fonts.text,
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "-0.01em",
                      backdropFilter: "blur(10px)",
                      transition: "background 0.2s ease, transform 0.2s ease",
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Panel03;