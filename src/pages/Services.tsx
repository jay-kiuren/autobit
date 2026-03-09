import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

// ─── Terminal content per service ────────────────────────────────────────────

const services = [
  {
    id: "automation",
    eyebrow: "Workflow Automation",
    heading: "Eliminate manual work.",
    desc: "Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.",
    price: "From $800",
    timeline: "2–5 days",
    accent: "#2997ff",
    terminalTitle: "autobit-workflow",
    terminalLines: [
      { text: "$ autobit deploy --workflow=invoice-sync", type: "cmd" },
      { text: "Connecting to Zapier...", type: "muted" },
      { text: "✓ Trigger: New invoice received [12ms]", type: "success" },
      { text: "✓ Action: Update CRM record [8ms]", type: "success" },
      { text: "✓ Action: Send Slack notification [5ms]", type: "success" },
      { text: "✓ Action: Generate PDF report [18ms]", type: "success" },
      { text: "⚡ Workflow active — 0 manual steps", type: "highlight" },
      { text: "→ Runs automatically, 24/7", type: "info" },
    ],
  },
  {
    id: "ai-agents",
    eyebrow: "AI Agents",
    heading: "Custom AI that works 24/7.",
    desc: "Purpose-built AI agents for customer support, lead qualification, and internal operations.",
    price: "From $1,200",
    timeline: "5–10 days",
    accent: "#30d158",
    terminalTitle: "autobit-agent",
    terminalLines: [
      { text: "$ autobit agent --name=support-bot --deploy", type: "cmd" },
      { text: "Loading model: gpt-4o-mini...", type: "muted" },
      { text: "✓ Knowledge base indexed [234 docs]", type: "success" },
      { text: "✓ Escalation rules configured", type: "success" },
      { text: "✓ CRM integration active", type: "success" },
      { text: "⚡ Agent online — handling queries", type: "highlight" },
      { text: "→ Response time: avg 1.2s", type: "info" },
      { text: "→ Resolution rate: 87% automated", type: "info" },
    ],
  },
  {
    id: "web-apps",
    eyebrow: "Web Applications",
    heading: "Dashboards, CRMs, and SaaS tools.",
    desc: "React, Firebase, Vercel. Full-stack web applications built for speed, scale, and clean UX.",
    price: "From $1,500",
    timeline: "7–14 days",
    accent: "#bf5af2",
    terminalTitle: "autobit-deploy",
    terminalLines: [
      { text: "$ autobit build --stack=react-firebase", type: "cmd" },
      { text: "Building production bundle...", type: "muted" },
      { text: "✓ React 18 compiled [2.1s]", type: "success" },
      { text: "✓ Firebase rules deployed", type: "success" },
      { text: "✓ Auth + Firestore connected", type: "success" },
      { text: "✓ Deployed to Vercel Edge", type: "success" },
      { text: "⚡ Live at your-app.vercel.app", type: "highlight" },
      { text: "→ Lighthouse score: 98/100", type: "info" },
    ],
  },
  {
    id: "systems",
    eyebrow: "Business Systems",
    heading: "One system. Your entire operation.",
    desc: "Inventory, HR, finance, scheduling — unified in one platform.",
    price: "From $3,000",
    timeline: "14–30 days",
    accent: "#ff9f0a",
    terminalTitle: "autobit-system",
    terminalLines: [
      { text: "$ autobit init --type=business-os", type: "cmd" },
      { text: "Scaffolding modules...", type: "muted" },
      { text: "✓ Inventory module loaded", type: "success" },
      { text: "✓ HR & payroll connected", type: "success" },
      { text: "✓ Finance dashboard active", type: "success" },
      { text: "✓ Scheduling engine online", type: "success" },
      { text: "⚡ All systems unified — 1 platform", type: "highlight" },
      { text: "→ Replace 6 tools with 1", type: "info" },
    ],
  },
  {
    id: "robotics",
    eyebrow: "Robotics & Physical AI",
    heading: "Edge AI. Industrial-grade.",
    desc: "PLC integration, computer vision, and embedded AI for physical environments.",
    price: "From $3,000",
    timeline: "14–30 days",
    accent: "#ff375f",
    terminalTitle: "axonis-edge",
    terminalLines: [
      { text: "$ axonis init --mode=safe --env=production", type: "cmd" },
      { text: "Initializing AXONIS v2.1.0...", type: "muted" },
      { text: "✓ Edge node registered [12ms]", type: "success" },
      { text: "✓ Cryptographic proof verified [34ms]", type: "success" },
      { text: "✓ Privacy layer active [8ms]", type: "success" },
      { text: "✓ Sensor array connected [21ms]", type: "success" },
      { text: "⚡ Monitoring 4 sensors live", type: "highlight" },
      { text: "→ System status: SECURE", type: "info" },
    ],
  },
  {
    id: "mobile",
    eyebrow: "Mobile Applications",
    heading: "iOS + Android. Shipped fast.",
    desc: "React Native mobile apps — cross-platform, performant, and production-ready.",
    price: "From $2,000",
    timeline: "10–21 days",
    accent: "#64d2ff",
    terminalTitle: "autobit-mobile",
    terminalLines: [
      { text: "$ autobit build --platform=ios,android", type: "cmd" },
      { text: "Compiling React Native bundle...", type: "muted" },
      { text: "✓ iOS build passed [Xcode 15]", type: "success" },
      { text: "✓ Android build passed [SDK 34]", type: "success" },
      { text: "✓ Push notifications configured", type: "success" },
      { text: "✓ App Store assets generated", type: "success" },
      { text: "⚡ Ready for submission", type: "highlight" },
      { text: "→ 1 codebase, 2 platforms", type: "info" },
    ],
  },
];

// ─── Animated Terminal ────────────────────────────────────────────────────────

const Terminal = ({ lines, title, accent, active }: {
  lines: typeof services[0]["terminalLines"];
  title: string;
  accent: string;
  active: boolean;
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    setVisibleCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= lines.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, [active, lines.length]);

  const colorMap: Record<string, string> = {
    cmd: '#f5f5f7',
    muted: 'rgba(255,255,255,0.35)',
    success: '#30d158',
    highlight: accent,
    info: 'rgba(255,255,255,0.5)',
    warn: '#ff9f0a',
  };

  return (
    <div style={{
      background: '#0d1117',
      borderRadius: '10px',
      overflow: 'hidden',
      fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
      fontSize: '12px',
      lineHeight: 1.7,
      flex: 1,
      minHeight: 0,
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '10px 14px',
        background: '#161b22',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>{title}</span>
      </div>
      {/* Lines */}
      <div style={{ padding: '14px 16px' }}>
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} style={{
            color: colorMap[line.type] || '#f5f5f7',
            opacity: active ? 1 : 0,
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {line.text}
          </div>
        ))}
        {/* Blinking cursor */}
        {visibleCount < lines.length && active && (
          <span style={{ display: 'inline-block', width: 7, height: 14, background: accent, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
        )}
      </div>
    </div>
  );
};

// ─── Service Card ─────────────────────────────────────────────────────────────

const ServiceCard = ({ s }: { s: typeof services[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={s.id}
      style={{
        display: 'flex', flexDirection: 'column',
        background: '#1c1c1e',
        borderRadius: '18px', overflow: 'hidden',
        flexShrink: 0, width: '300px', height: '480px',
        transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease',
        transform: hovered ? 'scale(1.025)' : 'scale(1)',
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${s.accent}33` : '0 4px 16px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.07)',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top: text */}
      <div style={{ padding: '22px 22px 16px', flexShrink: 0 }}>
        <span style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: s.accent, marginBottom: '8px' }}>{s.eyebrow}</span>
        <h3 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.4px', lineHeight: 1.2, color: '#f5f5f7', margin: '0 0 6px' }}>{s.heading}</h3>
        <p style={{ fontSize: '12px', lineHeight: 1.55, color: 'rgba(255,255,255,0.4)', margin: 0 }}>{s.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f5f5f7' }}>{s.price}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}>· {s.timeline}</span>
          </div>
          <a href="mailto:autobitofficial.ph@gmail.com" style={{ fontSize: '12px', fontWeight: 500, color: s.accent, textDecoration: 'none' }}>
            Get a quote →
          </a>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', flexShrink: 0 }} />

      {/* Terminal */}
      <div style={{ flex: 1, padding: '12px', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Terminal lines={s.terminalLines} title={s.terminalTitle} accent={s.accent} active={hovered} />
      </div>
    </div>
  );
};

// ─── Scroll Row ────────────────────────────────────────────────────────────────

const ScrollRow = ({ items }: { items: typeof services }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  const scroll = (dir: 'left' | 'right') => {
    rowRef.current?.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Left arrow */}
      {canScrollLeft && (
        <button onClick={() => scroll('left')} style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, padding: 0, lineHeight: 1 }}>‹</button>
      )}

      <div ref={rowRef} onScroll={updateArrows} style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
        {items.map(s => <ServiceCard key={s.id} s={s} />)}
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button onClick={() => scroll('right')} style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, padding: 0, lineHeight: 1 }}>›</button>
      )}

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const Services = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main style={{ filter: navDropdownActive ? 'blur(8px)' : 'none', opacity: navDropdownActive ? 0.45 : 1, transition: 'filter 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)' }}>
        <section style={{ background: '#000', paddingTop: '112px', paddingBottom: '96px' }}>
          <div className="section-container">

            {/* Header */}
            <ScrollReveal>
              <div style={{ marginBottom: '40px' }}>
                <p style={{ fontSize: 'clamp(26px,3.5vw,34px)', fontWeight: 700, letterSpacing: '-0.6px', lineHeight: 1.25, color: '#f5f5f7', margin: 0 }}>
                  What we build.{' '}
                  <span style={{ color: 'rgba(255,255,255,0.32)', fontWeight: 500 }}>
                    Engineering services from automation to full-stack systems.
                  </span>
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '10px', margin: '10px 0 0' }}>Hover a card to see it in action.</p>
              </div>
            </ScrollReveal>

            {/* Scroll row */}
            <ScrollReveal delay={0.08}>
              <ScrollRow items={services} />
            </ScrollReveal>

            {/* The Autobit difference */}
            <ScrollReveal delay={0.14}>
              <div style={{ marginTop: '80px' }}>
                <p style={{ fontSize: 'clamp(22px,2.8vw,28px)', fontWeight: 700, letterSpacing: '-0.4px', color: '#f5f5f7', margin: '0 0 24px' }}>
                  The Autobit difference.{' '}
                  <span style={{ color: 'rgba(255,255,255,0.32)', fontWeight: 500 }}>More reasons to work with us.</span>
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  {[
                    { icon: '⚡', title: 'Fixed pricing.', sub: "No surprises. You know exactly what you pay before we start." },
                    { icon: '🚀', title: 'Fast delivery.', sub: "From 2 days. Most agencies take weeks. We ship in days." },
                    { icon: '🔧', title: '50% to start.', sub: "Pay half upfront. The rest only when it's done and you're happy." },
                    { icon: '🤝', title: 'Direct access.', sub: "You talk to the builder. No account managers. No middlemen." },
                  ].map((item, i) => (
                    <div key={i} style={{ background: '#1c1c1e', borderRadius: '16px', padding: '24px', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div style={{ fontSize: '22px', marginBottom: '12px' }}>{item.icon}</div>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: '#f5f5f7', margin: 0, letterSpacing: '-0.2px' }}>
                        {item.title}{' '}
                        <span style={{ fontWeight: 400, color: 'rgba(255,255,255,0.42)' }}>{item.sub}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.2}>
              <div style={{ marginTop: '56px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <a href="mailto:autobitofficial.ph@gmail.com"
                  style={{ background: '#2997ff', color: '#fff', padding: '14px 32px', borderRadius: '980px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', transition: 'all 0.25s ease', boxShadow: '0 0 28px rgba(41,151,255,0.22)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 48px rgba(41,151,255,0.45)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.025)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 28px rgba(41,151,255,0.22)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; }}>
                  Start a project
                </a>
                <a href="/pricing"
                  style={{ color: '#2997ff', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}>
                  See pricing →
                </a>
              </div>
            </ScrollReveal>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Services;
