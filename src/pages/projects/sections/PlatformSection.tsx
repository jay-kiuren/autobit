import ScrollReveal from "@/components/ScrollReveal";
import { platformProjects } from "../data";
import { ScrollRow } from "../components/ScrollRow";
import { PlatformCard } from "../components/PlatformCard";
import FeaturedCard from "../components/FeaturedCard";

const axonis = platformProjects.find(p => p.id === "axonis")!;
const rest = platformProjects.filter(p => p.id !== "axonis");

const PlatformSection = () => (
  <section style={{
    position: "relative",
    zIndex: 1,
    background: "#000",
    paddingTop: "100px",
    paddingBottom: "80px",
  }}>
    <div className="section-container">
      <ScrollReveal>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.28)",
          margin: "0 0 16px",
        }}>
          Platforms & AI
        </p>
        <h2 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          fontSize: "clamp(40px, 6vw, 64px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.02,
          color: "#f5f5f7",
          margin: "0 0 12px",
        }}>
          Built to last.
        </h2>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.40)",
          lineHeight: 1.65,
          margin: "0 0 48px",
          maxWidth: "480px",
        }}>
          Production-grade AI systems designed for the real world.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <FeaturedCard p={axonis} />
      </ScrollReveal>
    </div>

    <div style={{ marginTop: "48px" }}>
      <ScrollRow label="More platforms" count={rest.length}>
        {rest.map(p => <PlatformCard key={p.id} p={p} />)}
      </ScrollRow>
    </div>
  </section>
);

export default PlatformSection;
