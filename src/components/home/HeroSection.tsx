import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ColorBends from "@/components/ColorBends";

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  const words = useMemo(() => ["next.", "possible.", "real.", "yours.", "coming."], []);

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), 2000);
    return () => clearTimeout(t);
  }, [index, words]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 40px 80px",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <ColorBends
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
        colors={["#1a1a1a", "#222222", "#0d0d0d"]}
        speed={0.15}
        rotation={45}
        transparent={true}
        warpStrength={0.8}
        frequency={0.9}
        mouseInfluence={0.4}
        parallax={0.3}
        noise={0.04}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Glass pill badge */}
        <a
        href="mailto:autobitofficial.ph@gmail.com"
        style={{
          marginBottom: "24px",
          display: "flex",
          width: "fit-content",
          alignItems: "center",
          gap: "8px",
          borderRadius: "9999px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          padding: "6px 16px",
          fontSize: "12px",
          color: "rgba(255,255,255,0.6)",
          transition: "all 0.3s ease",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        }}
      >
        <span
          style={{
            height: "6px",
            width: "6px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)",
          }}
          className="animate-pulse"
        />
        Start Something™
      </a>

      {/* Animated headline */}
      <h1
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "clamp(42px, 6vw, 76px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.06,
          color: "#ffffff",
          textAlign: "center",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        AI systems engineered for what's{" "}
        <span
          style={{
            display: "inline-block",
            position: "relative",
            minWidth: "200px",
            verticalAlign: "bottom",
            overflow: "hidden",
            height: "1.1em",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ position: "absolute", left: 0, right: 0, display: "block", textAlign: "left", color: "#ffffff" }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>

      {/* Subheading */}
      <p
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "19px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.55)",
          textAlign: "center",
          maxWidth: "520px",
          margin: "20px auto 0",
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
        }}
      >
        AI agents, automation, web applications, and intelligent robotics — built and deployed in days.
      </p>

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "32px" }}>
        <a
          href="mailto:autobitofficial.ph@gmail.com"
          style={{
            background: "#2997ff",
            color: "#ffffff",
            padding: "12px 28px",
            borderRadius: "980px",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s ease",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          Start a project
        </a>
        <a
          href="/projects"
          style={{
            background: "transparent",
            color: "#2997ff",
            padding: "12px 28px",
            borderRadius: "980px",
            fontSize: "15px",
            fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.2s ease",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(41,151,255,0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#2997ff";
          }}
        >
          See our work →
        </a>
      </div>

      {/* Trust line */}
      <p
        style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.25)",
          textAlign: "center",
          marginTop: "20px",
          letterSpacing: "0.01em",
        }}
      >
        50% deposit to start · Balance on delivery · No retainers
      </p>
      </div>
    </section>
  );
};

export default HeroSection;
