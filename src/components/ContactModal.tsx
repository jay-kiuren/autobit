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

  const fieldStyle = (id: string): React.CSSProperties => ({
    width: "100%",
    background: focused === id ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)",
    // No border at rest — only a hairline appears on focus
    border: `1px solid ${focused === id ? "rgba(255,255,255,0.14)" : "transparent"}`,
    borderRadius: "12px",
    color: "#ffffff",
    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    outline: "none",
    transition: "border-color 0.18s ease, background 0.18s ease",
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
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(24px) brightness(0.28)",
              WebkitBackdropFilter: "blur(24px) brightness(0.28)",
            }}
          />

          {/* Sheet — #090909, NO colored top border */}
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
              // No colored edge — just a physical lift shadow
              boxShadow: "0 -1px 0 rgba(255,255,255,0.06), 0 -32px 80px rgba(0,0,0,0.70)",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", paddingBottom: "4px" }}>
              <div style={{ width: "36px", height: "4px", borderRadius: "9999px", background: "rgba(255,255,255,0.09)" }} />
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute", top: "18px", right: "20px",
                width: "32px", height: "32px", borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "none",
                color: "rgba(255,255,255,0.40)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.18s ease, color 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.40)"; }}
            >
              <X size={13} strokeWidth={2} />
            </button>

            {/* Grid */}
            <div className="modal-grid" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              padding: "32px 44px 52px 44px",
            }}>

              {/* LEFT */}
              <div style={{ paddingRight: "52px", borderRight: "1px solid rgba(255,255,255,0.04)" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "22px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2997ff", flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "10px", fontWeight: 500,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.30)",
                    WebkitFontSmoothing: "antialiased",
                  }}>New project</span>
                </div>

                <h2 style={{
                  fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "clamp(30px, 3.8vw, 46px)", fontWeight: 700,
                  letterSpacing: "-0.040em", lineHeight: 0.96,
                  color: "#ffffff", margin: "0 0 18px 0",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}>
                  Let's build<br />something.
                </h2>

                <p style={{
                  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px", fontWeight: 400,
                  color: "rgba(255,255,255,0.36)", lineHeight: 1.6,
                  letterSpacing: "-0.01em", margin: "0 0 36px 0",
                  WebkitFontSmoothing: "antialiased",
                }}>
                  Describe your problem. We scope and price it within 24 hours.
                </p>

                {/* Trust items — professional, no flavor copy */}
                <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
                  {[
                    ["50% deposit to start", "Balance on delivery"],
                    ["No retainers", "Pay per project"],
                    ["Response within 24h", "We keep you updated"],
                  ].map(([main, sub]) => (
                    <div key={main} style={{ display: "flex", alignItems: "baseline", gap: "9px" }}>
                      <span style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "13px", fontWeight: 500,
                        color: "rgba(255,255,255,0.65)",
                        letterSpacing: "-0.01em",
                        WebkitFontSmoothing: "antialiased",
                      }}>{main}</span>
                      <span style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px", fontWeight: 400,
                        color: "rgba(255,255,255,0.22)",
                        letterSpacing: "-0.005em",
                        WebkitFontSmoothing: "antialiased",
                      }}>— {sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ paddingLeft: "52px" }}>
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        height: "100%", minHeight: "300px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "14px",
                      }}
                    >
                      <div style={{
                        width: "50px", height: "50px", borderRadius: "50%",
                        background: "rgba(41,151,255,0.08)",
                        border: "1px solid rgba(41,151,255,0.16)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <CheckCircle size={20} color="#2997ff" strokeWidth={1.8} />
                      </div>
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "14px", color: "rgba(255,255,255,0.45)",
                        letterSpacing: "-0.01em", margin: 0, textAlign: "center",
                        WebkitFontSmoothing: "antialiased",
                      }}>Mail app opened.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" style={{ display: "flex", flexDirection: "column", gap: "9px" }}>

                      <input
                        type="text" placeholder="Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={{ ...fieldStyle("name"), padding: "13px 15px" }}
                      />
                      <input
                        type="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        style={{ ...fieldStyle("email"), padding: "13px 15px" }}
                      />
                      <textarea
                        placeholder="What are you building?"
                        value={message} onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                        rows={5}
                        style={{ ...fieldStyle("msg"), padding: "13px 15px", resize: "none", lineHeight: 1.55 }}
                      />

                      <button
                        onClick={() => fileRef.current?.click()}
                        style={{
                          display: "flex", alignItems: "center", gap: "7px",
                          background: "none", border: "none", cursor: "pointer",
                          color: "rgba(255,255,255,0.28)", padding: "3px 0",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "13px", letterSpacing: "-0.01em",
                          transition: "color 0.18s ease",
                          WebkitFontSmoothing: "antialiased",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.60)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; }}
                      >
                        <Paperclip size={12} />
                        <span>{fileName || "Attach a file (optional)"}</span>
                      </button>
                      <input ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.pptx,.xlsx" style={{ display: "none" }} onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />

                      <button
                        onClick={handleSubmit}
                        disabled={!name || !email || !message}
                        style={{
                          marginTop: "4px", width: "100%", padding: "14px",
                          borderRadius: "12px",
                          background: (!name || !email || !message) ? "rgba(41,151,255,0.30)" : "#2997ff",
                          color: "#ffffff", border: "none",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "15px", fontWeight: 500,
                          letterSpacing: "-0.01em",
                          cursor: (!name || !email || !message) ? "not-allowed" : "pointer",
                          transition: "background 0.18s ease, transform 0.15s ease",
                          WebkitFontSmoothing: "antialiased",
                        }}
                        onMouseEnter={(e) => { if (name && email && message) { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.01)"; } }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = (!name || !email || !message) ? "rgba(41,151,255,0.30)" : "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        Send message
                      </button>

                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "11px", color: "rgba(255,255,255,0.18)",
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

          <style>{`
            @media (max-width: 700px) {
              .modal-grid {
                grid-template-columns: 1fr !important;
                padding: 24px 24px 44px 24px !important;
              }
              .modal-grid > div:first-child {
                padding-right: 0 !important;
                border-right: none !important;
                border-bottom: 1px solid rgba(255,255,255,0.04) !important;
                padding-bottom: 28px !important;
                margin-bottom: 28px !important;
              }
              .modal-grid > div:last-child { padding-left: 0 !important; }
            }
            input::placeholder, textarea::placeholder {
              color: rgba(255,255,255,0.20);
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
