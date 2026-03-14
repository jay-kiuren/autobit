import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip, CheckCircle } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

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

  const field = (id: string): React.CSSProperties => ({
    width: "100%",
    // Same hue as sheet but +2% lighter — feels like one material, not a box on a box
    background: focused === id ? "rgba(255,255,255,0.058)" : "rgba(255,255,255,0.034)",
    border: "none",
    // Single pixel hairline only on focus — invisible at rest
    outline: focused === id ? "1px solid rgba(255,255,255,0.11)" : "1px solid transparent",
    borderRadius: "10px",
    color: "#ffffff",
    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    transition: "outline-color 0.15s ease, background 0.15s ease",
    boxSizing: "border-box",
  });

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onClick={closeModal}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(0,0,0,0.78)",
              backdropFilter: "blur(28px) brightness(0.25)",
              WebkitBackdropFilter: "blur(28px) brightness(0.25)",
            }}
          />

          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ duration: 0.68, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
              background: "#0a0a0a",
              borderRadius: "20px 20px 0 0",
              maxHeight: "82vh", overflowY: "auto",
              // No border. No top line. Just a deep shadow lift.
              boxShadow: "0 -48px 100px rgba(0,0,0,0.90)",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
              <div style={{ width: "32px", height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute", top: "16px", right: "18px",
                width: "28px", height: "28px", borderRadius: "50%",
                background: "rgba(255,255,255,0.05)", border: "none",
                color: "rgba(255,255,255,0.32)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.32)"; }}
            >
              <X size={12} strokeWidth={2.2} />
            </button>

            <div className="modal-grid" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              padding: "28px 44px 52px 44px",
            }}>

              {/* LEFT */}
              <div style={{ paddingRight: "52px" }}>

                {/* Eyebrow — plain, no decoration */}
                <p style={{
                  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)", margin: "0 0 20px 0",
                  WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                }}>New project</p>

                <h2 style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "clamp(30px, 3.8vw, 46px)", fontWeight: 700,
                  letterSpacing: "-0.042em", lineHeight: 0.95,
                  color: "#ffffff", margin: "0 0 16px 0",
                  WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                }}>
                  Let's build<br />something.
                </h2>

                <p style={{
                  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px", fontWeight: 400,
                  color: "rgba(255,255,255,0.32)", lineHeight: 1.6,
                  letterSpacing: "-0.01em", margin: "0 0 36px 0",
                  WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                }}>
                  Describe your problem. We scope and price it within 24 hours.
                </p>

                {/* Facts only. No explanation. No em-dash copy. */}
                <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                  {[
                    "50% deposit to start.",
                    "No retainers.",
                    "Reply within 24 hours.",
                  ].map((line) => (
                    <p key={line} style={{
                      fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: "13px", fontWeight: 400,
                      color: "rgba(255,255,255,0.38)",
                      letterSpacing: "-0.01em", margin: 0,
                      WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                    }}>{line}</p>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ paddingLeft: "52px" }}>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{
                        height: "100%", minHeight: "300px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "12px",
                      }}
                    >
                      <CheckCircle size={26} color="rgba(255,255,255,0.50)" strokeWidth={1.6} />
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "14px", color: "rgba(255,255,255,0.35)",
                        letterSpacing: "-0.01em", margin: 0,
                        WebkitFontSmoothing: "antialiased",
                      }}>Sent.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                      <input type="text" placeholder="Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={{ ...field("name"), padding: "13px 14px" }}
                      />
                      <input type="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        style={{ ...field("email"), padding: "13px 14px" }}
                      />
                      <textarea placeholder="What are you building?"
                        value={message} onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                        rows={5}
                        style={{ ...field("msg"), padding: "13px 14px", resize: "none", lineHeight: 1.55 }}
                      />

                      <button onClick={() => fileRef.current?.click()} style={{
                        display: "flex", alignItems: "center", gap: "7px",
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(255,255,255,0.22)", padding: "3px 0",
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px", letterSpacing: "-0.01em",
                        transition: "color 0.15s ease", WebkitFontSmoothing: "antialiased",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.52)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.22)"; }}
                      >
                        <Paperclip size={12} />
                        <span>{fileName || "Attach a file"}</span>
                      </button>
                      <input ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.pptx,.xlsx"
                        style={{ display: "none" }} onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />

                      <button onClick={handleSubmit} style={{
                        marginTop: "4px", width: "100%", padding: "14px",
                        borderRadius: "10px",
                        background: "#2997ff",
                        color: "#ffffff", border: "none",
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em",
                        cursor: "pointer",
                        transition: "background 0.15s ease, transform 0.12s ease",
                        WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.01)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        Send message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <style>{`
            @media (max-width: 700px) {
              .modal-grid {
                grid-template-columns: 1fr !important;
                padding: 24px 24px 44px 24px !important;
              }
              .modal-grid > div:first-child {
                padding-right: 0 !important;
                padding-bottom: 28px !important;
                margin-bottom: 28px !important;
              }
              .modal-grid > div:last-child { padding-left: 0 !important; }
            }
            input::placeholder, textarea::placeholder {
              color: rgba(255,255,255,0.18);
              font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
            }
            input, textarea {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
