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

const members = [
  { name: "Member One", role: "Founder & Lead Engineer" },
  { name: "Member Two", role: "AI / ML Engineer" },
  { name: "Member Three", role: "Full-Stack Developer" },
  { name: "Member Four", role: "Hardware & Robotics" },
];

const Team = () => {
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
              <span className="text-eyebrow block mb-2">Who we are</span>
              <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground">
                Team
              </h1>
              <p className="text-body mt-3 max-w-[600px]">
                A lean team of engineers and builders. No layers — just people who build.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-12">
              {members.map((m, i) => (
                <ScrollReveal key={m.name} delay={i * 0.08}>
                  <div className="rounded-lg p-8 text-center" style={cardElevation}>
                    <div className="w-20 h-20 rounded-full bg-[rgba(255,255,255,0.06)] mx-auto mb-5" />
                    <h3 className="text-[17px] font-semibold text-foreground">{m.name}</h3>
                    <p className="text-caption mt-1">{m.role}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Team;
