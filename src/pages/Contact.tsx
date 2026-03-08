import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Mail, Phone, Linkedin, Instagram, Facebook, Music2, Github } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/autobit-company", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/autobitofficial/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/AutoBitOfficial", label: "Facebook" },
  { icon: Music2, href: "https://www.tiktok.com/@autobitofficial", label: "TikTok" },
  { icon: Github, href: "https://github.com/gnobob/AXONIS-Platform", label: "GitHub" },
];

const Contact = () => {
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
        <section className="bg-background pt-28 pb-20 min-h-screen">
          <div className="section-container max-w-[600px] mx-auto text-center">
            <ScrollReveal>
              <span className="text-eyebrow block mb-2">Get in touch</span>
              <h1 className="text-[clamp(32px,5vw,48px)] font-bold tracking-[-1px] leading-[1.1] text-foreground">
                Contact
              </h1>
              <p className="text-body mt-3">
                Ready to build something? Reach out directly.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-12 space-y-6">
                <a
                  href="mailto:autobitofficial.ph@gmail.com"
                  className="flex items-center justify-center gap-3 text-foreground hover:text-primary transition-colors text-[17px]"
                >
                  <Mail size={20} />
                  autobitofficial.ph@gmail.com
                </a>
                <a
                  href="tel:+639811375620"
                  className="flex items-center justify-center gap-3 text-foreground hover:text-primary transition-colors text-[17px]"
                >
                  <Phone size={20} />
                  +63 981 137 5620
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex justify-center gap-4 mt-12">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-muted-foreground hover:bg-[rgba(255,255,255,0.10)] hover:text-foreground transition-all duration-200"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
