import { useState, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export function ScrollRow({ label, count, children }: {
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
