import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip, CheckCircle } from "lucide-react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const sf: React.CSSProperties = {
  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const ContactModal = ({ open, onClose }: ContactModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const reset = () => {
    setName(""); setEmail(""); setMessage(""); setFile(null); setSent(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}${file ? `\n\nAttached file: ${file.name}` : ""}`
    );
    window.open(`mailto:autobitofficial.ph@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={handleClose}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              backdropFilter: "blur(22px) brightness(0.30)",
              WebkitBackdropFilter: "blur(22px) brightness(0.30)",
              background: "rgba(0,0,0,0.60)",
            }}
          />

          <motion.div
            key="sheet"
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.70, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "fixed",
              bottom: 0, left: 0, right: 0,
              zIndex: 51,
              maxHeight: "82vh",
              borderRadius: "20px 20px 0 0",
              background: "rgba(13,13,13,0.97)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", flexShrink: 0 }}>
              <div style={{ width: "36px", height: "4px", borderRadius: "9999px", background: "rgba(255,255,255,0.14)" }} />
            </div>

            <button
              onClick={handleClose}
              style={{
                position: "absolute", top: "16px", right: "20px",
                width: "28px", height: "28px", borderRadius: "9999px",
                background: "rgba(255,255,255,0.07)", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", color: "rgba(255,255,255,0.50)",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.50)"; }}
            >
              <X size={13} />
            </button>

            <div style={{ flex: 1, overflowY: "auto", padding: "24px 0 48px" }}>
              <div
                className="contact-modal-inner"
                style={{
                  maxWidth: "1040px",
                  margin: "0 auto",
                  padding: "0 clamp(24px, 5vw, 80px)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(32px, 6vw, 96px)",
                  alignItems: "start",
                }}
              >
                {/* Left */}
                <div style={{ paddingTop: "12px" }}>
                  <p style={{ ...sf, fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.28)", margin: "0 0 18px 0" }}>
                    New project
                  </p>
                  <h2 style={{
                    ...sf,
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "clamp(30px, 4vw, 54px)",
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.06,
                    color: "#ffffff",
                    margin: "0 0 18px 0",
                  }}>
                    Let's build<br />something.
                  </h2>
                  <p style={{ ...sf, fontSize: "15px", color: "rgba(255,255,255,0.44)", lineHeight: 1.65, margin: "0 0 36px 0", maxWidth: "300px" }}>
                    Describe your problem. We'll scope and price it within 24 hours.
                  </p>
                  {["No retainers", "50% deposit to start", "Reply within 24h"].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.22)", flexShrink: 0 }} />
                      <span style={{ ...sf, fontSize: "13px", color: "rgba(255,255,255,0.32)" }}>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Right */}
                <div>
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 0", textAlign: "center" as const, gap: "14px" }}
                      >
                        <CheckCircle size={38} color="rgba(255,255,255,0.65)" strokeWidth={1.4} />
                        <p style={{ ...sf, fontSize: "18px", fontWeight: 600, color: "#fff", margin: 0 }}>Your mail app opened.</p>
                        <p style={{ ...sf, fontSize: "13px", color: "rgba(255,255,255,0.40)", margin: 0, maxWidth: "260px" }}>
                          Hit send there. We'll reply within 24 hours.
                        </p>
                        <button onClick={reset} style={{ ...sf, marginTop: "6px", fontSize: "12px", color: "rgba(255,255,255,0.30)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                          Start over
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", flexDirection: "column", gap: "11px" }}
                      >
                        {[
                          { value: name, setter: setName, placeholder: "Name", type: "text" },
                          { value: email, setter: setEmail, placeholder: "Email", type: "email" },
                        ].map(({ value, setter, placeholder, type }) => (
                          <input
                            key={placeholder}
                            type={type}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            placeholder={placeholder}
                            required
                            style={{
                              ...sf, fontSize: "14px",
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              borderRadius: "10px", color: "#fff",
                              padding: "13px 15px", outline: "none",
                              width: "100%", boxSizing: "border-box" as const,
                              transition: "border-color 0.2s ease",
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.26)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                          />
                        ))}

                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="What are you building?"
                          rows={5}
                          required
                          style={{
                            ...sf, fontSize: "14px",
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "10px", color: "#fff",
                            padding: "13px 15px", outline: "none",
                            resize: "vertical" as const,
                            width: "100%", boxSizing: "border-box" as const,
                            transition: "border-color 0.2s ease",
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.26)"}
                          onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                        />

                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*,.pdf,.doc,.docx,.pptx,.xlsx"
                          style={{ display: "none" }}
                          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          style={{
                            ...sf,
                            display: "flex", alignItems: "center", gap: "7px",
                            fontSize: "12px",
                            color: file ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.30)",
                            background: "none", border: "none", cursor: "pointer",
                            padding: "2px 0", width: "fit-content",
                            transition: "color 0.2s ease",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.70)"}
                          onMouseLeave={(e) => e.currentTarget.style.color = file ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.30)"}
                        >
                          <Paperclip size={12} />
                          {file ? file.name : "Attach a file (optional)"}
                        </button>

                        <button
                          type="submit"
                          style={{
                            ...sf, marginTop: "6px",
                            background: "#2997ff", color: "#fff",
                            border: "none", borderRadius: "980px",
                            fontSize: "15px", fontWeight: 500,
                            padding: "13px", width: "100%",
                            cursor: "pointer",
                            transition: "background 0.2s ease",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#0077ed"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "#2997ff"}
                        >
                          Send message
                        </button>

                        <p style={{ ...sf, fontSize: "11px", color: "rgba(255,255,255,0.20)", textAlign: "center" as const, margin: 0 }}>
                          We reply within 24 hours.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          <style>{`
            @media (max-width: 680px) {
              .contact-modal-inner { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
