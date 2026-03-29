import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "10+", label: "Dashboards deployed" },
  { value: "99.9%", label: "Uptime guaranteed" },
  { value: "2–5", label: "Days to deliver" },
];

const features = [
  "Real-time analytics pipeline",
  "Custom KPI tracking",
  "Role-based access control",
  "Mobile-ready interface",
];

const DashboardSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const fonts = {
    display: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    text: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        height: isMobile ? "auto" : "100vh",
        minHeight: isMobile ? "800px" : "700px",
        overflow: "hidden",
        background: "#000",
        padding: isMobile ? "100px 0" : "0",
      }}
    >
      {/* Full-screen background image */}
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: visible ? 1 : 1.06 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=85"
          alt="Business Dashboard"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: isMobile ? "70% center" : "center",
            filter: "brightness(0.55) saturate(0.8)",
          }}
        />
      </motion.div>

      {/* Vertical fade — responsive shading */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: isMobile 
          ? "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.9) 100%)"
          : "linear-gradient(to right, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.88) 30%, rgba(0,0,0,0.50) 55%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Content Container */}
      <div style={{
        position: isMobile ? "relative" : "absolute",
        inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: isMobile ? "center" : "flex-start",
        padding: isMobile ? "0 24px" : "0 6%",
        textAlign: isMobile ? "center" : "left",
      }}>
        <div style={{ maxWidth: "660px", width: "100%" }}>
          <ScrollReveal>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: fonts.text,
                fontSize: isMobile ? "10px" : "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.38)",
                marginBottom: "20px",
                fontWeight: 600,
              }}
            >
              Business Dashboard · Analytics & Operations
            </motion.p>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              style={{
                fontFamily: fonts.display,
                fontSize: "clamp(34px, 8vw, 62px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#f5f5f7",
                margin: "0 0 20px",
              }}
            >
              Your data,<br />fully visible.
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
              transition={{ duration: 0.6, delay: 0.26 }}
              style={{
                fontFamily: fonts.text,
                fontSize: isMobile ? "16px" : "17px",
                color: "rgba(255,255,255,0.50)",
                lineHeight: 1.65,
                maxWidth: isMobile ? "100%" : "420px",
                margin: isMobile ? "0 auto 36px" : "0 0 36px",
              }}
            >
              Custom analytics and operations dashboards built for how your business actually works — not the other way around.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              style={{ 
                marginBottom: "44px",
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start"
              }}
            >
              {features.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -10 }}
                  transition={{ duration: 0.45, delay: 0.36 + i * 0.07 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div style={{
                    width: "5px", height: "5px",
                    borderRadius: "50%",
                    background: "#30d158",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: fonts.text,
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.60)",
                    letterSpacing: "-0.01em",
                  }}>
                    {f}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - UPDATED COLORS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              style={{ 
                display: "flex", 
                gap: "12px", 
                flexWrap: "wrap" as const,
                justifyContent: isMobile ? "center" : "flex-start"
              }}
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
                style={{
                  padding: "13px 32px",
                  borderRadius: "980px",
                  background: "#2D96FF", // Blue theme adjusted per image reference
                  color: "#fff",
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  fontFamily: fonts.text,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 15px rgba(45, 150, 255, 0.3)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#1a85f0";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#2D96FF";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Start a project
              </button>

              <Link
                to="/services"
                style={{
                  padding: "13px 32px",
                  borderRadius: "980px",
                  background: "transparent",
                  color: "#2D96FF", // Blue text per image reference
                  border: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  fontFamily: fonts.text,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                Learn more →
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Stats — Responsive Positioning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "auto" : "52px",
          right: isMobile ? "auto" : "6%",
          marginTop: isMobile ? "60px" : "0",
          zIndex: 2,
          display: "flex",
          gap: isMobile ? "24px" : "48px",
          alignItems: isMobile ? "center" : "flex-end",
          justifyContent: isMobile ? "center" : "flex-end",
          width: isMobile ? "100%" : "auto",
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
            transition={{ duration: 0.45, delay: 0.72 + i * 0.08 }}
            style={{ textAlign: isMobile ? "center" : "right" }}
          >
            <div style={{
              fontFamily: fonts.display,
              fontSize: "clamp(24px, 4vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#f5f5f7",
              lineHeight: 1,
              marginBottom: "4px",
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: fonts.text,
              fontSize: "11px",
              color: "rgba(255,255,255,0.38)",
              letterSpacing: "0.01em",
              maxWidth: "80px"
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Status badge — Responsive Positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          position: "absolute",
          top: isMobile ? "20px" : "40px",
          right: isMobile ? "20px" : "6%",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(12px)",
          padding: "7px 16px",
          borderRadius: "999px",
        }}
      >
        <div style={{
          width: "7px", height: "7px", borderRadius: "50%",
          background: "#30d158",
          boxShadow: "0 0 8px #30d158",
        }} />
        <span style={{
          fontFamily: fonts.text,
          fontSize: "11px",
          fontWeight: 600,
          color: "#30d158",
          letterSpacing: "0.04em",
          textTransform: "uppercase" as const,
        }}>
          Deployed
        </span>
      </motion.div>
    </section>
  );
};

export default DashboardSection;