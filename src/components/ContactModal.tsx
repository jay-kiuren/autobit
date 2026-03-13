import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip, CheckCircle } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

const sf: React.CSSProperties = {
  fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const fieldBase: React.CSSProperties = {
  ...sf,
  fontSize: "14px",
  fontWeight: 400,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  color: "#ffffff",
  padding: "14px 16px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s ease, background 0.2s ease",
};

const ContactModal = () => {
  const { open, closeModal } = useContactModal();
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
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [closeModal]);

  const reset = () => { setName(""); setEmail(""); setMessage(""); setFile(null); setSent(false); };
  const handleClose = () => { reset(); closeModal(); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`New project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}${file ? `\n\nAttached: ${file.name}` : ""}`);
    window.open(`mailto:autobitofficial.ph@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            onClick={handleClose}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(24px) brightness(0.28)",
              WebkitBackdropFilter: "blur(24px) brightness(0.28)",
            }}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: "fixed",
              bottom: 0, left: 0, right: 0,
              zIndex: 9999,
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "24px 24px 0 0",
              background: "rgb(10,10,10)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", flexShrink: 0 }}>
              <div style={{ width: "40px", height: "4px", borderRadius: "9999px", background: "rgba(255,255,255,0.12)" }} />
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute", top: "18px", right: "24px",
                width: "30px", height: "30px", borderRadius: "9999px",
                background: "rgba(255,255,255,0.07)", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", color: "rgba(255,255,255,0.45)",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              <X size={13} />
            </button>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "28px 0 56px" }}>
              <div className="cm-grid" style={{
                maxWidth: "1100px", margin: "0 auto",
                padding: "0 clamp(28px, 6vw, 96px)",
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: "clamp(40px, 7vw, 110px)", alignItems: "start",
              }}>

                {/* Left */}
                <div style={{ paddingTop: "16px" }}>
                  <p style={{ ...sf, fontSize: "11px", fontWeight: 500, letterSpacing: "0.09em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", margin: "0 0 20px 0" }}>
                    New project
                  </p>
                  <h2 style={{
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    WebkitFontSmoothing: "antialiased",
                    fontSize: "clamp(32px, 4.5vw, 58px)",
                    fontWeight: 700, letterSpacing: "-0.038em",
                    lineHeight: 1.05, color: "#ffffff", margin: "0 0 20px 0",
                  }}>
                    Let's build<br />something.
                  </h2>
                  <p style={{ ...sf, fontSize: "15px", lineHeight: 1.65, color: "rgba(255,255,255,0.42)", margin: "0 0 40px 0", maxWidth: "280px" }}>
                    Describe your problem. We'll scope and price it within 24 hours.
                  </p>
                  {["No retainers", "50% deposit to start", "Reply within 24h"].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.20)", flexShrink: 0 }} />
                      <span style={{ ...sf, fontSize: "13px", color: "rgba(255,255,255,0.30)" }}>{t}</span>
                    </div>
                  ))}
                </div>

                {/* Right */}
                <div style={{ paddingTop: "8px" }}>
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="ok"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 0", textAlign: "center" as const, gap: "16px" }}
                      >
                        <CheckCircle size={42} color="rgba(255,255,255,0.60)" strokeWidth={1.3} />
                        <p style={{ ...sf, fontSize: "19px", fontWeight: 600, color: "#fff", margin: 0 }}>Mail app opened.</p>
                        <p style={{ ...sf, fontSize: "13px", color: "rgba(255,255,255,0.38)", margin: 0, maxWidth: "240px", lineHeight: 1.6 }}>
                          Hit send there. We'll reply within 24 hours.
                        </p>
                        <button onClick={reset} style={{ ...sf, marginTop: "8px", fontSize: "12px", color: "rgba(255,255,255,0.28)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                          Send another
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                      >
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" required style={fieldBase}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                        />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required style={fieldBase}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                        />
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you building?" rows={5} required
                          style={{ ...fieldBase, resize: "vertical" as const }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                        />

                        <input ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.pptx,.xlsx" style={{ display: "none" }} onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                        <button type="button" onClick={() => fileRef.current?.click()}
                          style={{ ...sf, display: "flex", alignItems: "center", gap: "7px", fontSize: "12px", color: file ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.28)", background: "none", border: "none", cursor: "pointer", padding: "2px 0", width: "fit-content", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                          onMouseLeave={(e) => e.currentTarget.style.color = file ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.28)"}
                        >
                          <Paperclip size={12} />
                          {file ? file.name : "Attach a file (optional)"}
                        </button>

                        <button type="submit"
                          style={{ ...sf, marginTop: "8px", background: "#2997ff", color: "#fff", border: "none", borderRadius: "980px", fontSize: "15px", fontWeight: 500, padding: "14px", width: "100%", cursor: "pointer", transition: "background 0.2s ease, transform 0.15s ease" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.01)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; }}
                        >
                          Send message
                        </button>

                        <p style={{ ...sf, fontSize: "11px", color: "rgba(255,255,255,0.18)", textAlign: "center" as const, margin: 0 }}>
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
            .cm-grid { grid-template-columns: 1fr 1fr; }
            @media (max-width: 700px) { .cm-grid { grid-template-columns: 1fr !important; } }
            input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25) !important; }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
