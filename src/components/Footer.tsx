import { Linkedin, Instagram, Facebook, Music2, Github, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

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
      { text: "Team", href: "/team" },
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
  { icon: Github, href: "https://github.com/gnobob/AXONIS-Platform", label: "GitHub" },
];

const Footer = () => (
  <footer className="bg-ab-tertiary border-t border-border">
    <div className="section-container pt-[52px] pb-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
        {footerColumns.map((col) => (
          <div key={col.heading}>
            <h6 className="text-xs font-semibold text-ab-text-muted mb-3">{col.heading}</h6>
            <ul className="space-y-2">
              {col.links.map((l) =>
                l.external ? (
                  <li key={l.text}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-xs text-ab-text-muted hover:text-foreground hover:underline transition-colors">
                      {l.text}
                    </a>
                  </li>
                ) : (
                  <li key={l.text}>
                    <Link to={l.href} className="text-xs text-ab-text-muted hover:text-foreground hover:underline transition-colors">
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
          <h6 className="text-xs font-semibold text-ab-text-muted mb-3">Connect</h6>
          <div className="flex gap-2 mb-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-ab-text-muted hover:bg-[rgba(255,255,255,0.10)] hover:text-foreground transition-all duration-200"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
          <a href="mailto:autobitofficial.ph@gmail.com" className="flex items-center gap-2 text-xs text-ab-text-muted hover:text-foreground transition-colors py-1">
            <Mail size={12} /> autobitofficial.ph@gmail.com
          </a>
          <a href="tel:+639811375620" className="flex items-center gap-2 text-xs text-ab-text-muted hover:text-foreground transition-colors py-1">
            <Phone size={12} /> +63 981 137 5620
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border mt-10 pt-5 flex justify-between items-center">
        <span className="text-xs text-ab-text-muted">© 2025 AUTOBIT. All rights reserved.</span>
        <span className="text-xs text-ab-text-muted">Start Something™</span>
      </div>
    </div>
  </footer>
);

export default Footer;
