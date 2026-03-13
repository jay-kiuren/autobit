import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useContactModal } from "@/contexts/ContactModalContext";
import { Check } from "lucide-react";
import emailjs from "emailjs-com";

const font = "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "10px",
  color: "#fff",
  fontSize: "14px",
  padding: "12px 14px",
  fontFamily: font,
  outline: "none",
  transition: "border-color 0.2s ease",
  WebkitFontSmoothing: "antialiased",
};

const ContactModal = () => {
  const { isOpen, openModal, closeModal } = useContactModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Listen for custom event from buttons that can't use context directly
  useEffect(() => {
    const handler = () => openModal();
    window.addEventListener('open-contact-modal', handler);
    return () => window.removeEventListener('open-contact-modal', handler);
  }, [openModal]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setMessage("");
      setStatus("idle");
      setErrorMsg("");
    }
  }, [isOpen]);

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, closeModal]);

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await emailjs.send(
        "service_autobit",
        "template_autobit",
        { from_name: name, from_email: email, message },
        "YOUR_EMAILJS_PUBLIC_KEY"
      );
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            background: "rgba(0,0,0,0.65)",
          }}
        >
          <motion.div
            key="contact-sheet"
            initial={{ y: "40%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "30%", opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.32, 0.72, 0, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "960px",
              maxHeight: "70vh",
              margin: "0 16px",
              background: "rgba(18,18,18,0.92)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderRadius: "20px",
              borderTop: "1px solid rgba(255,255,255,0.10)",
              padding: "32px 28px 36px",
              overflowY: "auto",
              position: "relative",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {/* Drag handle */}
            <div style={{
              width: "36px",
              height: "4px",
              background: "rgba(255,255,255,0.18)",
              borderRadius: "9999px",
              margin: "0 auto 28px",
            }} />

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "60px 20px",
                  textAlign: "center",
                }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(41,151,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 20,
                }}>
                  <Check size={28} color="#2997ff" />
                </div>
                <h3 style={{
                  fontFamily: font, fontSize: "22px", fontWeight: 700,
                  color: "#fff", margin: "0 0 8px", letterSpacing: "-0.02em",
                }}>
                  Message sent.
                </h3>
                <p style={{
                  fontFamily: font, fontSize: "15px",
                  color: "rgba(255,255,255,0.55)", margin: 0,
                }}>
                  We'll be in touch.
                </p>
              </motion.div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
              }} className="contact-modal-grid">
                {/* Left */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h2 style={{
                    fontFamily: `'SF Pro Display', ${font}`,
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.06,
                    color: "#fff",
                    margin: 0,
                  }}>
                    Let's build something.
                  </h2>
                  <p style={{
                    fontFamily: font,
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.55)",
                    marginTop: "14px",
                    lineHeight: 1.55,
                  }}>
                    Describe your problem. We'll scope and price it within 24 hours.
                  </p>
                </div>

                {/* Right — Form */}
                <form ref={formRef} onSubmit={handleSubmit} style={{
                  display: "flex", flexDirection: "column", gap: "14px",
                }}>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={fieldStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={fieldStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
                  />
                  <textarea
                    placeholder="What are you building?"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ ...fieldStyle, resize: "none" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)")}
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      background: "#2997ff",
                      color: "#fff",
                      borderRadius: "980px",
                      fontSize: "15px",
                      fontWeight: 500,
                      padding: "13px",
                      border: "none",
                      cursor: status === "sending" ? "wait" : "pointer",
                      fontFamily: font,
                      transition: "background 0.2s ease",
                      opacity: status === "sending" ? 0.7 : 1,
                      WebkitFontSmoothing: "antialiased",
                    }}
                    onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.background = "#0077ed"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#2997ff"; }}
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                  </button>

                  {status === "error" && (
                    <p style={{
                      fontFamily: font, fontSize: "12px",
                      color: "#ff453a", textAlign: "center", margin: 0,
                    }}>
                      {errorMsg}
                    </p>
                  )}

                  <p style={{
                    fontFamily: font, fontSize: "11px",
                    color: "rgba(255,255,255,0.28)",
                    textAlign: "center", margin: 0,
                  }}>
                    We reply within 24 hours.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .contact-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default ContactModal;
