import ScrollReveal from "@/components/ScrollReveal";
import { iotProjects } from "../data";
import { ScrollRow } from "../components/ScrollRow";
import { IotCard } from "../components/IotCard";

const RoboticsSection = () => (
  <section style={{
    position: "relative",
    zIndex: 1,
    background: "#0a0a0a",
    paddingTop: "100px",
    paddingBottom: "80px",
  }}>
    <div className="section-container" style={{ marginBottom: "40px" }}>
      <ScrollReveal>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.28)",
          margin: "0 0 16px",
        }}>
          IoT · Embedded AI · Hardware
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
          Built in the real world.
        </h2>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: "17px",
          color: "rgba(255,255,255,0.40)",
          lineHeight: 1.65,
          margin: 0,
          maxWidth: "480px",
        }}>
          Nationally awarded prototypes that move beyond the screen.
        </p>
      </ScrollReveal>
    </div>

    <ScrollRow label="IoT & Hardware" count={iotProjects.length}>
      {iotProjects.map(p => <IotCard key={p.id} p={p} />)}
    </ScrollRow>
  </section>
);

export default RoboticsSection;
