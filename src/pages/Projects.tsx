import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const cardElevation: React.CSSProperties = {
  background: '#1c1c1e',
  border: '1px solid rgba(255,255,255,0.00)',
  borderTop: '1px solid rgba(255,255,255,0.10)',
  boxShadow: '0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
  transform: 'translateZ(0)',
  transition: 'all 0.38s cubic-bezier(0.25,0.1,0.25,1)',
};

const hoverIn = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.18)';
  e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.12)';
  e.currentTarget.style.transform = 'translateY(-4px)';
};
const hoverOut = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.borderTop = '1px solid rgba(255,255,255,0.10)';
  e.currentTarget.style.boxShadow = cardElevation.boxShadow as string;
  e.currentTarget.style.transform = 'translateZ(0)';
};

const featuredProjects = [
  {
    id: "gridsonar",
    title: "GRIDSONAR",
    badge: null,
    tags: ["Patent Pending", "Real-World 3D Software", "Mesh Architecture"],
    desc: "Self-healing mesh submetering system with real-time fault detection and predictive AI for power grid management.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  },
  {
    id: "earlynx",
    title: "EARLYNX — AI Cancer Screening",
    badge: "Champion 2026",
    tags: ["Embedded AI", "Sensor Fusion", "Medical Grade", "CNN Model"],
    desc: "Non-invasive AI diagnostic prototype using sensor fusion to analyze saliva samples for early cancer detection. Evaluated by DOST. Champion at 2026 Congress Life and Science Category.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
  },
  {
    id: "air-filtration",
    title: "AIR FILTRATION — Piggery IoT",
    badge: "Champion 2026",
    tags: ["Arduino Uno", "MQ137", "I2C LCD", "DOST Verified"],
    desc: "Smart air quality filtration device for piggery environments. Champion in Congress Innovation Category 2026.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80",
  },
];

const secondaryProjects = [
  { id: "axonis", title: "AXONIS Platform", desc: "Open-core AI safety OS for critical infrastructure. Decentralized, built for the real world.", tag: "Active Development" },
  { id: "minesafe", title: "MineSafe AI", desc: "Mining hazard detection engine using computer vision and environmental sensors.", tag: "Stage 0" },
  { id: "school", title: "School Systems", desc: "Enrollment, grading, and management systems deployed in educational institutions.", tag: "Live" },
  { id: "dashboards", title: "Business Dashboards", desc: "Custom analytics and operations dashboards for businesses.", tag: "Deployed" },
];

const Projects = () => {
  const [navDropdownActive, setNavDropdownActive] = useState(false);
  const handleDropdownChange = useCallback((active: boolean) => setNavDropdownActive(active), []);

  return (
    <>
      <Navbar onDropdownChange={handleDropdownChange} />
      <main
        style={{
          filter: navDropdownActive ? 'blur(8px)' : 'none',
          opacity: navDropdownActive ? 0.45 : 1,
          transition: 'filter 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <section className="bg-background pt-28 pb-20">
          <div className="section-container">
            <ScrollReveal>
              <span className="text-eyebrow block mb-2">What we've built</span>
              <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground">
                Projects
              </h1>
              <p className="text-body mt-3 max-w-[600px]">
                Real systems. Deployed, patented, and nationally awarded.
              </p>
            </ScrollReveal>

            {/* Featured projects */}
            <div className="grid grid-cols-1 gap-6 mt-12">
              {featuredProjects.map((project, i) => (
                <ScrollReveal key={project.id} delay={i * 0.08}>
                  <div
                    id={project.id}
                    className="rounded-lg overflow-hidden cursor-pointer group grid md:grid-cols-2"
                    style={cardElevation}
                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    <div className="relative min-h-[260px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: 'brightness(0.72) saturate(0.85)' }}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-[clamp(21px,3vw,28px)] font-semibold text-foreground tracking-[-0.3px]">
                          {project.title}
                        </h3>
                        {project.badge && (
                          <span className="text-[11px] bg-[rgba(255,255,255,0.08)] text-foreground px-2.5 py-0.5 rounded-full">
                            {project.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-body">{project.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Secondary projects */}
            <div className="mt-16">
              <ScrollReveal>
                <h2 className="text-[clamp(21px,3vw,28px)] font-semibold text-foreground mb-6">More projects</h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {secondaryProjects.map((p, i) => (
                  <ScrollReveal key={p.id} delay={i * 0.08}>
                    <div
                      id={p.id}
                      className="rounded-lg p-8 cursor-pointer"
                      style={cardElevation}
                      onMouseEnter={hoverIn}
                      onMouseLeave={hoverOut}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-[17px] font-semibold text-foreground">{p.title}</h4>
                        <span className="text-[10px] bg-[rgba(255,255,255,0.08)] text-foreground px-2 py-0.5 rounded-full">{p.tag}</span>
                      </div>
                      <p className="text-body text-sm">{p.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Projects;
