import { useState, useRef, useEffect, useCallback } from "react";
import { Search, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import autobitIcon from "@/assets/autobit-icon.png";

const sfProDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
const sfProText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif";

const dropdownLinkStyle: React.CSSProperties = {
  fontFamily: sfProDisplay,
  fontSize: '28px',
  fontWeight: 600,
  letterSpacing: '-0.3px',
  color: '#f5f5f7',
  lineHeight: 1.2,
  transition: 'color 0.2s',
};

const subLabelStyle: React.CSSProperties = {
  fontFamily: sfProText,
  fontSize: '12px',
  fontWeight: 400,
  color: '#6e6e73',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  marginBottom: '16px',
  display: 'block',
};

const navItemStyle: React.CSSProperties = {
  fontFamily: sfProText,
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '-0.01em',
  color: 'rgba(255,255,255,0.85)',
};

const servicesLinks = [
  { label: "Workflow Automation", desc: "Zapier, Make, n8n pipelines", href: "/services#automation" },
  { label: "AI Agents", desc: "Custom AI for your operation", href: "/services#ai-agents" },
  { label: "Web Applications", desc: "React, Firebase, Vercel", href: "/services#web-apps" },
  { label: "Business Systems", desc: "End-to-end operational software", href: "/services#systems" },
];

const specializedLinks = [
  { label: "Robotics & Physical AI", desc: "Edge AI, PLC, industrial systems", href: "/services#robotics" },
  { label: "Mobile Applications", desc: "iOS + Android, React Native", href: "/services#mobile" },
];

const projectLinks = [
  { label: "AXONIS Platform", desc: "Industrial AI safety OS", href: "/projects#axonis", badge: "Active" },
  { label: "MineSafe AI", desc: "Mining hazard detection engine", href: "/projects#minesafe", badge: "Stage 0" },
  { label: "EARLYNX", desc: "AI cancer screening device", href: "/projects#earlynx", badge: "Patented" },
  { label: "School Systems", desc: "Deployed in institutions", href: "/projects#school", badge: "Live" },
  { label: "Business Dashboards", desc: "Custom operations tools", href: "/projects#dashboards" },
];

const navItems = [
  { label: "Services", href: "/services", type: "mega" },
  { label: "Projects", href: "/projects", type: "mega" },
  { label: "Team", href: "/team", type: "link" },
  { label: "Contact", href: "/contact", type: "link" },
  { label: "Platform", href: "/platform", type: "link", badge: "Coming soon" },
  { label: "Pricing", href: "/pricing", type: "link", badge: "Coming soon" },
];

export const useNavDropdownActive = () => {
  const [active, setActive] = useState(false);
  return { active, setActive };
};

const Navbar = ({ onDropdownChange }: { onDropdownChange?: (active: boolean) => void }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const openDropdown = useCallback((label: string) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  }, []);

  const closeDropdown = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  useEffect(() => {
    onDropdownChange?.(!!activeDropdown);
  }, [activeDropdown, onDropdownChange]);

  const isDropdownOpen = !!activeDropdown;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] nav-blur h-11 flex items-center transition-[border] duration-300 ${isDropdownOpen ? 'border-b border-transparent' : 'border-b border-border'}`}>
        <div className="section-container flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" style={{ background: 'none', border: 'none', outline: 'none', boxShadow: 'none' }}>
            <img src={autobitIcon} alt="" width={20} height={20} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', display: 'block', background: 'none', border: 'none', padding: 0 }} />
            <span style={{ fontFamily: sfProDisplay, fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', color: '#ffffff', textTransform: 'uppercase' }}>AUTOBIT</span>
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => item.type === "mega" ? openDropdown(item.label) : undefined}
                onMouseLeave={item.type === "mega" ? closeDropdown : undefined}
              >
                <Link
                  to={item.href}
                  className="nav-link-item rounded px-2 py-1 flex items-center gap-1.5"
                  style={navItemStyle}
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] font-normal" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.badge}</span>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Right icons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-foreground hover:text-foreground/60 transition-colors">
              <Search size={16} />
            </button>
            <a
              href="mailto:autobitofficial.ph@gmail.com"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
              style={navItemStyle}
            >
              Start a project <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mega dropdown overlay */}
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.48)] z-[998] pointer-events-none"
        style={{
          top: 44,
          opacity: isDropdownOpen ? 1 : 0,
          transition: 'opacity 0.38s cubic-bezier(0.25,0.1,0.25,1)',
        }}
      />

      {/* Services mega dropdown */}
      <div
        className="fixed top-11 left-0 right-0 z-[999] mega-blur border-b border-border"
        onMouseEnter={() => openDropdown("Services")}
        onMouseLeave={closeDropdown}
        style={{
          borderRadius: 0,
          borderTop: 'none',
          opacity: activeDropdown === "Services" ? 1 : 0,
          transform: activeDropdown === "Services" ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.38s cubic-bezier(0.25,0.1,0.25,1), transform 0.38s cubic-bezier(0.25,0.1,0.25,1)',
          pointerEvents: activeDropdown === "Services" ? 'auto' : 'none',
        }}
      >
        <div className="section-container py-10 grid grid-cols-3 gap-12">
          <div>
            <span style={subLabelStyle}>What we build</span>
            {servicesLinks.map((l) => (
              <Link key={l.label} to={l.href} className="block py-3 group">
                <span
                  className="inline-block"
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#f5f5f7')}
                >
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
          <div>
            <span style={subLabelStyle}>Specialized</span>
            {specializedLinks.map((l) => (
              <Link key={l.label} to={l.href} className="block py-3 group">
                <span
                  className="inline-block"
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#f5f5f7')}
                >
                  {l.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="bg-ab-card rounded-md p-5">
            <span className="text-xs" style={{ color: '#6e6e73' }}>Latest build</span>
            <h5 className="text-foreground font-semibold mt-1">AXONIS Platform</h5>
            <p className="text-xs mt-1" style={{ color: '#6e6e73' }}>Open-core AI safety OS for critical infrastructure.</p>
            <span className="inline-block mt-3 text-xs bg-[rgba(255,255,255,0.08)] text-foreground px-2 py-0.5 rounded-full">Active Development</span>
          </div>
        </div>
      </div>

      {/* Projects mega dropdown */}
      <div
        className="fixed top-11 left-0 right-0 z-[999] mega-blur border-b border-border"
        onMouseEnter={() => openDropdown("Projects")}
        onMouseLeave={closeDropdown}
        style={{
          borderRadius: 0,
          borderTop: 'none',
          opacity: activeDropdown === "Projects" ? 1 : 0,
          transform: activeDropdown === "Projects" ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'opacity 0.38s cubic-bezier(0.25,0.1,0.25,1), transform 0.38s cubic-bezier(0.25,0.1,0.25,1)',
          pointerEvents: activeDropdown === "Projects" ? 'auto' : 'none',
        }}
      >
        <div className="section-container py-10 grid grid-cols-2 gap-16">
          <div>
            <span style={subLabelStyle}>All projects</span>
            {projectLinks.map((l) => (
              <Link key={l.label} to={l.href} className="flex items-center justify-between py-3 group">
                <span
                  className="inline-block"
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#f5f5f7')}
                >
                  {l.label}
                </span>
                {l.badge && <span className="text-[10px] bg-[rgba(255,255,255,0.08)] text-foreground px-2 py-0.5 rounded-full">{l.badge}</span>}
              </Link>
            ))}
          </div>
          <div className="bg-ab-card rounded-md p-5">
            <span className="text-xs" style={{ color: '#6e6e73' }}>Flagship</span>
            <h5 className="text-foreground font-semibold mt-1">EARLYNX</h5>
            <p className="text-xs mt-2" style={{ color: '#6e6e73' }}>Nationally awarded AI diagnostic prototype. Patent held. National competition winner.</p>
            <span className="inline-block mt-3 text-xs bg-[rgba(255,255,255,0.08)] text-foreground px-2 py-0.5 rounded-full">National Winner</span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.97)] backdrop-blur-[24px] md:hidden flex flex-col pt-14 px-8">
          <button className="absolute top-3 right-6 text-foreground" onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-2"
              style={{ ...dropdownLinkStyle }}
            >
              {item.label}
              {item.badge && <span className="text-xs font-normal" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.badge}</span>}
            </Link>
          ))}
          <a
            href="mailto:autobitofficial.ph@gmail.com"
            className="mt-auto mb-10 bg-foreground text-background rounded-full py-3 text-center text-[17px] font-semibold"
          >
            Start a project
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
