import { Linkedin, Instagram, Facebook, Music2, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Apple footer font style — applied to everything
const appleFont: React.CSSProperties = {
  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const footerColumns = [
  {
    heading: "Services",
    links: [
      { text: "Workflow Automation", href: "/services#automation" },
      { text: "AI Agents", href: "/services#ai-agents" },
      { text: "Web Applications", href: "/services#web-apps" },
      { text: "Business Systems", href: "/services#systems" },
      { text: "Robotics & Physical AI", href: "/services#robotics" },
      { text: "Mobile Apps", href: "/services#mobile" },
    ],
  },
  {
    heading: "Projects",
    links: [
      { text: "AXONIS Platform", href: "/projects#axonis" },
      { text: "MineSafe AI", href: "/projects#minesafe" },
      { text: "EARLYNX", href: "/projects#earlynx" },
      { text: "School Systems", href: "/projects#school" },
      { text: "Dashboards", href: "/projects#dashboards" },
    ],
  },
  {
    heading: "Company",
    links: [
      { text: "About", href: "/about" },
      { text: "News", href: "/news" },
      { text: "Process", href: "/process" },
      { text: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Open Source",
    links: [
      { text: "AXONIS on GitHub", href: "https://github.com/gnobob/AXONIS-Platform", external: true },
      { text: "Documentation", href: "/docs" },
      { text: "Apache 2.0 License", href: "https://github.com/gnobob/AXONIS-Platform/blob/main/LICENSE", external: true },
    ],
  },
];

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/autobit-company", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/autobitofficial/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/AutoBitOfficial", label: "Facebook" },
  { icon: Music2, href: "https://www.tiktok.com/@autobitofficial", label: "TikTok" },
  { icon: XIcon, href: "https://x.com/autobitofficial", label: "X" },
];

const Footer = () => (
  <footer style={{
    ...appleFont,
    background: "var(--ab-tertiary, #111)",
    borderTop: "1px solid rgba(255,255,255,0.07)",
  }}>
    <div className="section-container" style={{ paddingTop: "52px", paddingBottom: "24px" }}>
      <div className="footer-columns" style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "32px 24px",
      }}
        className="footer-columns-grid"
      >
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h6 style={{
              ...appleFont,
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "rgba(255,255,255,0.50)",
              marginBottom: "12px",
              textTransform: "none" as const,
            }}>
              {col.heading}
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {col.links.map((l) =>
                l.external ? (
                  <li key={l.text}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...appleFont,
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.40)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                    >
                      {l.text}
                    </a>
                  </li>
                ) : (
                  <li key={l.text}>
                    <Link
                      to={l.href}
                      style={{
                        ...appleFont,
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.40)",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
                    >
                      {l.text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}

        {/* Connect column */}
        <div>
          <h6 style={{
            ...appleFont,
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.01em",
            color: "rgba(255,255,255,0.50)",
            marginBottom: "12px",
          }}>
            Connect
          </h6>
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" as const }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.40)",
                  transition: "background 0.2s ease, color 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.90)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                }}
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            style={{
              ...appleFont,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.40)",
              textDecoration: "none",
              transition: "color 0.15s ease",
              paddingBottom: "6px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
          >
            <Mail size={12} />
            autobitofficial.ph@gmail.com
          </a>
          <a
            href="tel:+639811375620"
            style={{
              ...appleFont,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.40)",
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
          >
            <Phone size={12} />
            +63 981 137 5620
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        marginTop: "40px",
        paddingTop: "20px",
        display: "flex",
        flexDirection: "row" as const,
        justifyContent: "space-between",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap" as const,
      }}>
        <span style={{
          ...appleFont,
          fontSize: "12px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.28)",
        }}>
          Copyright 2025 AUTOBIT. All rights reserved.
        </span>
        <span style={{
          ...appleFont,
          fontSize: "12px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.28)",
        }}>
          Start Something™
        </span>
      </div>
    </div>

    <style>{`
      .footer-columns-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 768px) {
        .footer-columns-grid {
          grid-template-columns: repeat(5, 1fr) !important;
        }
      }
    `}</style>
  </footer>
);

export default Footer;
