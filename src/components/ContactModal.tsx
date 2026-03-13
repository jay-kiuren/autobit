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
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const reset = () => {
    setName(""); setEmail(""); setMessage("");
    setFile(null); setSent(false); setError("");
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { setError("Please fill in all fields."); return; }
    setSending(true); setError("");
    try {
      // EmailJS — replace with your actual service/template/public key
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        { from_name: name, from_email: email, message, file_name: file?.name ?? "none" },
        "YOUR_PUBLIC_KEY"
      );
      setSent(true);
    } catch {
      setError("Something went wrong. Email us directly at autobitofficial.ph@gmail.com");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — blurred, click to close */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onClick={handleClose}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              backdropFilter: "blur(20px) brightness(0.35)",
              WebkitBackdropFilter: "blur(20px) brightness(0.35)",
              background: "rgba(0,0,0,0.55)",
            }}
          />

          {/* Sheet — slides up from bottom, full width */}
          <motion.div
            key="sheet"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.32, 0.72, 0, 1], // iOS sheet easing
            }}
            style={{
              position: "fixed",
              bottom: 0, left: 0, right: 0,
              zIndex: 51,
              // Full width, not full height
              maxHeight: "82vh",
              borderRadius: "20px 20px 0 0",
              background: "rgba(14,14,14,0.96)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Drag handle */}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", paddingBottom: "4px", flexShrink: 0 }}>
              <div style={{
                width: "36px", height: "4px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.15)",
              }} />
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute", top: "18px", right: "24px",
                width: "30px", height: "30px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.08)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.55)",
                transition: "background 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
            >
              <X size={14} />
            </button>

            {/* Scrollable content */}
            <div style={{ overflowY: "auto", flex: 1, padding: "20px 0 40px" }}>
              <div style={{
                maxWidth: "1000px",
                margin: "0 auto",
                padding: "0 clamp(24px, 5vw, 72px)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(32px, 5vw, 80px)",
                alignItems: "start",
              }}
                className="contact-modal-grid"
              >
                {/* Left — copy */}
                <div style={{ paddingTop: "8px" }}>
                  <p style={{ ...sf, fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", marginBottom: "16px", margin: "0 0 16px 0" }}>
                    New project
                  </p>
                  <h2 style={{
                    ...sf,
                    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.06,
                    color: "#ffffff",
                    margin: "0 0 20px 0",
                  }}>
                    Let's build<br />something.
                  </h2>
                  <p style={{ ...sf, fontSize: "15px", fontWeight: 400, color: "rgba(255,255,255,0.48)", lineHeight: 1.6, margin: "0 0 32px 0", maxWidth: "320px" }}>
                    Describe your problem. We'll scope and price it within 24 hours.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {["No retainers", "50% deposit to start", "Reply within 24h"].map((t) => (
                      <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", flexShrink: 0 }} />
                        <span style={{ ...sf, fontSize: "13px", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — form */}
                <div>
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "60px 20px", textAlign: "center" }}
                      >
                        <CheckCircle size={40} color="rgba(255,255,255,0.70)" strokeWidth={1.5} />
                        <p style={{ ...sf, fontSize: "18px", fontWeight: 600, color: "#ffffff", margin: 0 }}>Message sent.</p>
                        <p style={{ ...sf, fontSize: "14px", color: "rgba(255,255,255,0.45)", margin: 0 }}>We'll be in touch within 24 hours.</p>
                        <button
                          onClick={reset}
                          style={{ ...sf, marginTop: "8px", fontSize: "13px", color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                        >
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
                        transition={{ duration: 0.3 }}
                        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
                      >
                        {/* Name */}
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          style={{
                            ...sf,
                            fontSize: "14px", fontWeight: 400,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderRadius: "10px",
                            color: "#ffffff",
                            padding: "13px 16px",
                            outline: "none",
                            transition: "border-color 0.2s ease",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                          onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"}
                        />

                        {/* Email */}
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          style={{
                            ...sf,
                            fontSize: "14px", fontWeight: 400,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderRadius: "10px",
                            color: "#ffffff",
                            padding: "13px 16px",
                            outline: "none",
                            transition: "border-color 0.2s ease",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                          onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"}
                        />

                        {/* Message */}
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="What are you building?"
                          rows={5}
                          style={{
                            ...sf,
                            fontSize: "14px", fontWeight: 400,
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.09)",
                            borderRadius: "10px",
                            color: "#ffffff",
                            padding: "13px 16px",
                            outline: "none",
                            resize: "vertical",
                            transition: "border-color 0.2s ease",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"}
                          onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"}
                        />

                        {/* File attach */}
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
                            display: "flex", alignItems: "center", gap: "8px",
                            fontSize: "13px", fontWeight: 400,
                            color: file ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
                            background: "none", border: "none", cursor: "pointer",
                            padding: "4px 0",
                            transition: "color 0.2s ease",
                            width: "fit-content",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
                          onMouseLeave={(e) => e.currentTarget.style.color = file ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)"}
                        >
                          <Paperclip size={13} />
                          {file ? file.name : "Attach a file (optional)"}
                        </button>

                        {/* Error */}
                        {error && (
                          <p style={{ ...sf, fontSize: "12px", color: "rgba(255,80,80,0.90)", margin: 0 }}>{error}</p>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={sending}
                          style={{
                            ...sf,
                            marginTop: "4px",
                            background: sending ? "rgba(41,151,255,0.55)" : "#2997ff",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "980px",
                            fontSize: "15px",
                            fontWeight: 500,
                            padding: "13px",
                            width: "100%",
                            cursor: sending ? "not-allowed" : "pointer",
                            transition: "background 0.2s ease, transform 0.2s ease",
                          }}
                          onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = "#0077ed"; }}
                          onMouseLeave={(e) => { if (!sending) e.currentTarget.style.background = "#2997ff"; }}
                        >
                          {sending ? "Sending…" : "Send message"}
                        </button>

                        <p style={{ ...sf, fontSize: "11px", color: "rgba(255,255,255,0.22)", textAlign: "center", margin: 0 }}>
                          We reply within 24 hours.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
