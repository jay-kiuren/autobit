import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip, CheckCircle } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

// ─── DESIGN PRINCIPLES ────────────────────────────────────────────────────────
// Black diamond = #090909, NOT dark gray
// Inputs: nearly invisible border at rest → brightens on focus
//         no harsh rectangle edges — 14px radius, barely-there bg
// Left column: editorial, not a form description
// No bullet points. Three inline micro-stats instead.
// Top edge: 1px highlight line → material edge, like a physical object
// Typography: tight, confident, Apple-level tracking
// ─────────────────────────────────────────────────────────────────────────────

const ContactModal = () => {
  const { open, closeModal } = useContactModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:autobitofficial.ph@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName(""); setEmail(""); setMessage(""); setFileName("");
      closeModal();
    }, 2600);
  };

  const fieldStyle = (id: string): React.CSSProperties => ({
    width: "100%",
    background: focused === id ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.032)",
    border: `1px solid ${focused === id ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
    borderRadius: "14px",
    color: "#ffffff",
    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    WebkitFontSmoothing: "antialiased",
    outline: "none",
    transition: "border-color 0.2s ease, background 0.2s ease",
    boxSizing: "border-box",
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onClick={closeModal}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(20px) brightness(0.30)",
              WebkitBackdropFilter: "blur(20px) brightness(0.30)",
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.68, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0,
              zIndex: 9999,
              background: "#090909",
              borderRadius: "24px 24px 0 0",
              maxHeight: "82vh",
              overflowY: "auto",
              // The edge: single 1px top line that gives material depth
              borderTop: "1px solid rgba(255,255,255,0.09)",
              // Subtle specular highlight at top — makes it feel like a physical object
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 -24px 80px rgba(0,0,0,0.60)",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", paddingBottom: "4px" }}>
              <div style={{ width: "36px", height: "4px", borderRadius: "9999px", background: "rgba(255,255,255,0.10)" }} />
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute", top: "18px", right: "20px",
                width: "32px", height: "32px", borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.50)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.50)"; }}
            >
              <X size={14} />
            </button>

            {/* Content grid */}
            <div className="modal-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
              padding: "32px 40px 48px 40px",
            }}>

              {/* ── LEFT — editorial, not descriptive ─────────────────────── */}
              <div style={{ paddingRight: "48px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>

                {/* Eyebrow */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2997ff" }} />
                  <span style={{
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "10px", fontWeight: 500,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.35)",
                    WebkitFontSmoothing: "antialiased",
                  }}>New project</span>
                </div>

                {/* Heading */}
                <h2 style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700,
                  letterSpacing: "-0.040em", lineHeight: 0.95,
                  color: "#ffffff", margin: "0 0 20px 0",
                  WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                }}>
                  Let's build<br />something.
                </h2>

                {/* Sub */}
                <p style={{
                  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px", fontWeight: 400,
                  color: "rgba(255,255,255,0.40)", lineHeight: 1.6,
                  letterSpacing: "-0.01em", margin: "0 0 36px 0",
                  WebkitFontSmoothing: "antialiased",
                }}>
                  Describe your problem. We scope and price it within 24 hours.
                </p>

                {/* Three inline trust items — no bullets, no list feel */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    ["50% deposit", "Balance on delivery"],
                    ["No retainers", "Pay per project"],
                    ["Reply within 24h", "We don't ghost"],
                  ].map(([main, sub]) => (
                    <div key={main} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                      <span style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "13px", fontWeight: 500,
                        color: "rgba(255,255,255,0.70)",
                        letterSpacing: "-0.01em",
                        WebkitFontSmoothing: "antialiased",
                      }}>{main}</span>
                      <span style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px", fontWeight: 400,
                        color: "rgba(255,255,255,0.25)",
                        letterSpacing: "-0.005em",
                        WebkitFontSmoothing: "antialiased",
                      }}>— {sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT — form ───────────────────────────────────────────── */}
              <div style={{ paddingLeft: "48px" }}>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        height: "100%", minHeight: "280px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "16px",
                      }}
                    >
                      <div style={{
                        width: "52px", height: "52px", borderRadius: "50%",
                        background: "rgba(41,151,255,0.10)",
                        border: "1px solid rgba(41,151,255,0.20)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <CheckCircle size={22} color="#2997ff" />
                      </div>
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "14px", color: "rgba(255,255,255,0.55)",
                        letterSpacing: "-0.01em", margin: 0, textAlign: "center",
                        WebkitFontSmoothing: "antialiased",
                      }}>Mail app opened.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                      {/* Name */}
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={{ ...fieldStyle("name"), padding: "13px 16px" }}
                      />

                      {/* Email */}
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={{ ...fieldStyle("email"), padding: "13px 16px" }}
                      />

                      {/* Message */}
                      <textarea
                        placeholder="What are you building?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocused("msg")}
                        onBlur={() => setFocused(null)}
                        rows={5}
                        style={{
                          ...fieldStyle("msg"),
                          padding: "13px 16px",
                          resize: "none",
                          lineHeight: 1.55,
                        }}
                      />

                      {/* File attach */}
                      <button
                        onClick={() => fileRef.current?.click()}
                        style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          background: "none", border: "none", cursor: "pointer",
                          color: "rgba(255,255,255,0.30)", padding: "4px 0",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "13px", letterSpacing: "-0.01em",
                          transition: "color 0.2s ease",
                          WebkitFontSmoothing: "antialiased",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.30)"; }}
                      >
                        <Paperclip size={13} />
                        <span>{fileName || "Attach a file (optional)"}</span>
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*,.pdf,.doc,.docx,.pptx,.xlsx"
                        style={{ display: "none" }}
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                      />

                      {/* Submit */}
                      <button
                        onClick={handleSubmit}
                        disabled={!name || !email || !message}
                        style={{
                          marginTop: "4px",
                          width: "100%", padding: "14px",
                          borderRadius: "14px",
                          background: (!name || !email || !message) ? "rgba(41,151,255,0.35)" : "#2997ff",
                          color: "#ffffff", border: "none",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "15px", fontWeight: 500,
                          letterSpacing: "-0.01em",
                          cursor: (!name || !email || !message) ? "not-allowed" : "pointer",
                          transition: "background 0.2s ease, transform 0.15s ease",
                          WebkitFontSmoothing: "antialiased",
                        }}
                        onMouseEnter={(e) => {
                          if (name && email && message) {
                            e.currentTarget.style.background = "#0077ed";
                            e.currentTarget.style.transform = "scale(1.01)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = (!name || !email || !message) ? "rgba(41,151,255,0.35)" : "#2997ff";
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        Send message
                      </button>

                      {/* Footer note */}
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "11px", color: "rgba(255,255,255,0.20)",
                        letterSpacing: "0em", margin: "2px 0 0 0", textAlign: "center",
                        WebkitFontSmoothing: "antialiased",
                      }}>
                        We reply within 24 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Mobile responsive */}
          <style>{`
            @media (max-width: 700px) {
              .modal-grid {
                grid-template-columns: 1fr !important;
                padding: 24px 24px 40px 24px !important;
              }
              .modal-grid > div:first-child {
                padding-right: 0 !important;
                border-right: none !important;
                border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                padding-bottom: 28px !important;
                margin-bottom: 28px !important;
              }
              .modal-grid > div:last-child {
                padding-left: 0 !important;
              }
            }
            input::placeholder, textarea::placeholder {
              color: rgba(255,255,255,0.22);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
