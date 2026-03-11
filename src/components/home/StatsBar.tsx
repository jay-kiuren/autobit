import { useEffect, useRef, useState } from "react";

const logos = [
  {
    name: "React",
    svg: (
      <svg viewBox="0 0 100 100" width="36" height="36" fill="none">
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        <ellipse cx="50" cy="50" rx="46" ry="17" stroke="currentColor" strokeWidth="4.5" fill="none" />
        <ellipse cx="50" cy="50" rx="46" ry="17" stroke="currentColor" strokeWidth="4.5" fill="none" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="46" ry="17" stroke="currentColor" strokeWidth="4.5" fill="none" transform="rotate(120 50 50)" />
      </svg>
    ),
  },
  {
    name: "Python",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <path d="M50 5C30 5 22 14 22 28v10h28v4H18C8 42 4 52 4 62c0 18 10 28 24 28h8v-14c0-8 7-14 14-14h20c8 0 14-6 14-14V28C84 14 70 5 50 5zm-8 16a5 5 0 110 10 5 5 0 010-10z" fill="currentColor" />
        <path d="M58 95c20 0 28-9 28-23V62H58v-4h32c10 0 14-10 14-20 0-18-10-28-24-28h-8v14c0 8-7 14-14 14H38c-8 0-14 6-14 14v22C24 86 38 95 58 95zm8-16a5 5 0 110-10 5 5 0 010 10z" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <path d="M91.7 40.3a24.8 24.8 0 00-2.1-20.4A25 25 0 0062.8 8.2 24.8 24.8 0 0044 2.5a25 25 0 00-23.8 17.3A24.8 24.8 0 008.3 35.7a25 25 0 003.3 29.1 24.8 24.8 0 002.1 20.3A25 25 0 0040.5 96.8 24.8 24.8 0 0056 97.5a25 25 0 0023.8-17.3 24.8 24.8 0 0011.8-16 25 25 0 00-.1-23.9zM56 90.7a18.5 18.5 0 01-11.9-4.3l.6-.3 19.8-11.4a3.2 3.2 0 001.6-2.8V47.5l8.4 4.8v23a18.5 18.5 0 01-18.5 15.4zM14.8 74.2a18.5 18.5 0 01-2.2-12.4l.6.3 19.8 11.4a3.2 3.2 0 003.2 0L57.8 61V70.5L38.1 82a18.5 18.5 0 01-23.3-7.8zM9.5 33.8a18.5 18.5 0 019.6-8.1v23.4a3.2 3.2 0 001.6 2.8l21.6 12.5-8.4 4.8L14.2 57a18.5 18.5 0 01-4.7-23.3zM78.2 53.4L56.6 40.9l8.4-4.8 19.7 11.4a18.5 18.5 0 01-2.9 33.4V57.2a3.2 3.2 0 00-1.6-3.8zm8.3-12.5l-.6-.3L66.1 29.2a3.2 3.2 0 00-3.2 0L41.3 41.7V32.2l19.7-11.4a18.5 18.5 0 0127.5 20.1zm-47.2 15.5l-8.4-4.9V29.3a18.5 18.5 0 0130.3-14.2l-.6.3-19.8 11.4a3.2 3.2 0 00-1.6 2.8l.1 27zm4.6-9.9l9.6-5.5 9.6 5.5v11l-9.6 5.5-9.6-5.5V46.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Arduino",
    svg: (
      <svg viewBox="0 0 100 100" width="36" height="36" fill="none">
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="5" fill="none" />
        <path d="M28 50h18M54 50h18" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M35 43l-7 7 7 7M65 43l7 7-7 7" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Docker",
    svg: (
      <svg viewBox="0 0 100 100" width="38" height="38" fill="none">
        <rect x="8" y="36" width="13" height="11" rx="2" fill="currentColor" />
        <rect x="25" y="36" width="13" height="11" rx="2" fill="currentColor" />
        <rect x="42" y="36" width="13" height="11" rx="2" fill="currentColor" />
        <rect x="25" y="22" width="13" height="11" rx="2" fill="currentColor" />
        <rect x="42" y="22" width="13" height="11" rx="2" fill="currentColor" />
        <rect x="42" y="8" width="13" height="11" rx="2" fill="currentColor" />
        <path d="M6 53s2 18 24 18h28c18 0 26-10 30-18H6z" fill="currentColor" opacity="0.5" />
        <circle cx="82" cy="40" r="5" fill="currentColor" />
        <path d="M87 44c5-3 6-8 6-12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <rect x="5" y="5" width="90" height="90" rx="10" fill="currentColor" opacity="0.15" />
        <rect x="5" y="5" width="90" height="90" rx="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.4" />
        <text x="11" y="74" fontSize="54" fontWeight="900" fill="currentColor" fontFamily="monospace">TS</text>
      </svg>
    ),
  },
  {
    name: "TensorFlow",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <path d="M50 4L8 28v44l42 24 42-24V28L50 4zm0 12l30 17v8L50 24 20 41v-8L50 16zm0 18l22 12.5v25L50 84 28 71.5V41L50 34z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <path d="M50 4L8 27.5v45L50 96l42-23.5v-45L50 4zm0 10l34 19v39L50 86 16 72V33L50 14z" fill="currentColor" opacity="0.5" />
        <path d="M50 28v44M34 37l16-9 16 9M34 63l16 9 16-9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <ellipse cx="50" cy="24" rx="36" ry="16" stroke="currentColor" strokeWidth="4.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M14 24v26c0 9 16 16 36 16s36-7 36-16V24" stroke="currentColor" strokeWidth="4.5" fill="none" />
        <path d="M14 50v16c0 9 16 16 36 16s36-7 36-16V50" stroke="currentColor" strokeWidth="4.5" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    svg: (
      <svg viewBox="0 0 100 100" width="32" height="32" fill="none">
        <path d="M50 8L96 92H4L50 8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M50 5a45 45 0 00-14.2 87.7c2.3.4 3.1-1 3.1-2.2v-8.5c-12.5 2.7-15.1-6-15.1-6-2-5.2-5-6.6-5-6.6-4.1-2.8.3-2.7.3-2.7 4.5.3 6.9 4.6 6.9 4.6 4 6.9 10.5 4.9 13.1 3.7.4-2.9 1.6-4.9 2.9-6-10-1.1-20.5-5-20.5-22.3 0-4.9 1.7-8.9 4.6-12.1-.5-1.1-2-5.7.4-11.9 0 0 3.8-1.2 12.4 4.6a43 43 0 0122.6 0c8.6-5.8 12.4-4.6 12.4-4.6 2.4 6.2.9 10.8.4 11.9 2.9 3.2 4.6 7.2 4.6 12.1 0 17.3-10.5 21.1-20.6 22.2 1.6 1.4 3.1 4.2 3.1 8.4v12.5c0 1.2.8 2.6 3.1 2.2A45 45 0 0050 5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Raspberry Pi",
    svg: (
      <svg viewBox="0 0 100 100" width="34" height="34" fill="none">
        <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="4.5" fill="none" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        <path d="M50 6v16M50 78v16M6 50h16M78 50h16" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="50" cy="6" r="4" fill="currentColor" />
        <circle cx="50" cy="94" r="4" fill="currentColor" />
        <circle cx="6" cy="50" r="4" fill="currentColor" />
        <circle cx="94" cy="50" r="4" fill="currentColor" />
      </svg>
    ),
  },
];

const doubled = [...logos, ...logos];

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        overflow: "hidden",
        background: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "32px 0",
        position: "relative",
        contain: "layout",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.9s cubic-bezier(0.25,0.1,0.25,1), transform 0.9s cubic-bezier(0.25,0.1,0.25,1)",
        willChange: "transform, opacity",
      }}
    >
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "200px",
        background: "linear-gradient(to right, #000000 50%, transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "200px",
        background: "linear-gradient(to left, #000000 50%, transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "max-content",
          animation: "logoScroll 60s linear infinite",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="statsbar-logo-item"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              padding: "0 52px",
              color: "rgba(255,255,255,0.32)",
              transition: "color 0.4s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.80)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.32)";
            }}
          >
            {logo.svg}
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontWeight: 500,
              color: "inherit",
              opacity: 0.6,
            }}>
              {logo.name}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes logoScroll {
          0% { transform: translateX(0) translateZ(0); }
          100% { transform: translateX(-50%) translateZ(0); }
        }
        @media (max-width: 767px) {
          .statsbar-logo-item {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StatsBar;
