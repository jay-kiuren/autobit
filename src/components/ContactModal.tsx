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
    background: focused === id ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.032)",
    border: "none",
    outline: focused === id ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
    borderRadius: "12px",
    color: "#ffffff",
    fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "14px",
    fontWeight: 400,
    letterSpacing: "-0.01em",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    transition: "outline-color 0.18s ease, background 0.18s ease",
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

          {/* Sheet — pure #090909, no border, no shadow line, just lifts */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.68, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "fixed", bottom: 0, left: 0, right: 0,
              zIndex: 9999,
              background: "#090909",
              borderRadius: "20px 20px 0 0",
              maxHeight: "82vh",
              overflowY: "auto",
              boxShadow: "0 -40px 80px rgba(0,0,0,0.80)",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px", paddingBottom: "0" }}>
              <div style={{ width: "32px", height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute", top: "16px", right: "18px",
                width: "30px", height: "30px", borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "none",
                color: "rgba(255,255,255,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                transition: "background 0.18s ease, color 0.18s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
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
              <div style={{ paddingRight: "52px" }}>

                {/* Eyebrow — plain text, no dot, no decoration */}
                <p style={{
                  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "11px", fontWeight: 500,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  margin: "0 0 20px 0",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}>New project</p>

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
                  color: "rgba(255,255,255,0.35)", lineHeight: 1.6,
                  letterSpacing: "-0.01em", margin: "0 0 36px 0",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}>
                  Describe your problem. We scope and price it within 24 hours.
                </p>

                {/* Trust items — no bullets, no dots, no decoration */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    ["50% deposit to start", "Balance on delivery"],
                    ["No retainers", "Pay per project"],
                    ["Response within 24h", "We keep you in the loop"],
                  ].map(([main, sub]) => (
                    <div key={main} style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                      <span style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "13px", fontWeight: 500,
                        color: "rgba(255,255,255,0.60)",
                        letterSpacing: "-0.01em",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                      }}>{main}</span>
                      <span style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px", fontWeight: 400,
                        color: "rgba(255,255,255,0.20)",
                        letterSpacing: "-0.005em",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
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
                      <CheckCircle size={28} color="rgba(255,255,255,0.60)" strokeWidth={1.5} />
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "14px", color: "rgba(255,255,255,0.40)",
                        letterSpacing: "-0.01em", margin: 0, textAlign: "center",
                        WebkitFontSmoothing: "antialiased",
                      }}>Mail app opened.</p>
                    </motion.div>
                  ) : (
                    <motion.div key="form" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

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
                          color: "rgba(255,255,255,0.25)", padding: "3px 0",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "13px", letterSpacing: "-0.01em",
                          transition: "color 0.18s ease",
                          WebkitFontSmoothing: "antialiased",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
                      >
                        <Paperclip size={12} />
                        <span>{fileName || "Attach a file (optional)"}</span>
                      </button>
                      <input ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.pptx,.xlsx" style={{ display: "none" }} onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />

                      {/* Button — always #2997ff, no disabled dim */}
                      <button
                        onClick={handleSubmit}
                        style={{
                          marginTop: "4px", width: "100%", padding: "14px",
                          borderRadius: "12px",
                          background: "#2997ff",
                          color: "#ffffff", border: "none",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "15px", fontWeight: 500,
                          letterSpacing: "-0.01em",
                          cursor: "pointer",
                          transition: "background 0.18s ease, transform 0.15s ease",
                          WebkitFontSmoothing: "antialiased",
                          MozOsxFontSmoothing: "grayscale",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.01)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        Send message
                      </button>

                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "11px", color: "rgba(255,255,255,0.16)",
                        letterSpacing: "0em", margin: "2px 0 0 0", textAlign: "center",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
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
                padding-bottom: 28px !important;
                margin-bottom: 28px !important;
                border-bottom: 1px solid rgba(255,255,255,0.04) !important;
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
