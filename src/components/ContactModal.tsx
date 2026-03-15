import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Paperclip, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useContactModal } from "@/contexts/ContactModalContext";

const FORMSPREE_ENDPOINTS = [
  "https://formspree.io/f/xjgabyvr",
  "https://formspree.io/f/xvzwbrog",
];

type SendStatus = "idle" | "sending" | "success" | "error";

const ContactModal = () => {
  const { open, closeModal } = useContactModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<SendStatus>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [contactPref, setContactPref] = useState<"email" | "whatsapp" | "both">("email");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", message);
      if (contactPref === "email" || contactPref === "both") formData.append("email", email);
      if (contactPref === "whatsapp" || contactPref === "both") formData.append("whatsapp", whatsapp);
      if (file) formData.append("attachment", file);

      // Send to both endpoints in parallel
      const results = await Promise.allSettled(
        FORMSPREE_ENDPOINTS.map((url) =>
          fetch(url, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
          }).then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
        )
      );

      const anySuccess = results.some((r) => r.status === "fulfilled");

      if (anySuccess) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setName(""); setEmail(""); setWhatsapp(""); setMessage("");
          setFileName(""); setFile(null);
          setContactPref("email");
          closeModal();
        }, 3200);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const canSubmit =
    status === "idle" &&
    name &&
    message &&
    (contactPref === "email" ? email : contactPref === "whatsapp" ? whatsapp : email && whatsapp);

  const field = (id: string): React.CSSProperties => ({
    width: "100%",
    background: focused === id ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.032)",
    border: "none",
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

  const prefBtn = (val: typeof contactPref, label: string) => (
    <button
      key={val}
      onClick={() => setContactPref(val)}
      style={{
        flex: 1,
        padding: "8px 0",
        borderRadius: "8px",
        background: contactPref === val ? "rgba(255,255,255,0.14)" : "transparent",
        border: "none",
        color: contactPref === val ? "#ffffff" : "rgba(255,255,255,0.30)",
        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
        fontSize: "13px",
        fontWeight: contactPref === val ? 500 : 400,
        letterSpacing: "-0.01em",
        cursor: "pointer",
        transition: "background 0.15s ease, color 0.15s ease",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {label}
    </button>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            onClick={status === "sending" ? undefined : closeModal}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "rgba(0,0,0,0.78)",
              backdropFilter: "blur(28px) brightness(0.25)",
              WebkitBackdropFilter: "blur(28px) brightness(0.25)",
              cursor: status === "sending" ? "default" : "pointer",
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
              boxShadow: "0 -48px 100px rgba(0,0,0,0.90)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "12px" }}>
              <div style={{ width: "32px", height: "3px", borderRadius: "9999px", background: "rgba(255,255,255,0.07)" }} />
            </div>

            {status !== "sending" && (
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
            )}

            <div className="modal-grid" style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              padding: "28px 44px 52px 44px",
            }}>

              {/* LEFT */}
              <div style={{ paddingRight: "52px" }}>
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

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["50% deposit to start.", "No retainers.", "Balance on delivery."].map((line) => (
                    <p key={line} style={{
                      fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontSize: "13px", fontWeight: 400,
                      color: "rgba(255,255,255,0.36)",
                      letterSpacing: "-0.01em", margin: 0,
                      WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                    }}>{line}</p>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ paddingLeft: "52px" }}>
                <AnimatePresence mode="wait">

                  {/* SENDING STATE */}
                  {status === "sending" && (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{
                        height: "100%", minHeight: "300px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "16px",
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Loader size={24} color="rgba(255,255,255,0.35)" strokeWidth={1.8} />
                      </motion.div>
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "14px", color: "rgba(255,255,255,0.32)",
                        letterSpacing: "-0.01em", margin: 0,
                        WebkitFontSmoothing: "antialiased",
                      }}>Sending your message…</p>
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px", color: "rgba(255,255,255,0.16)",
                        letterSpacing: "-0.01em", margin: 0,
                        WebkitFontSmoothing: "antialiased",
                      }}>Please wait, this only takes a moment.</p>
                    </motion.div>
                  )}

                  {/* SUCCESS STATE */}
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{
                        height: "100%", minHeight: "300px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "12px",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                      >
                        <CheckCircle size={32} color="rgba(255,255,255,0.50)" strokeWidth={1.5} />
                      </motion.div>
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "15px", fontWeight: 500,
                        color: "rgba(255,255,255,0.75)",
                        letterSpacing: "-0.01em", margin: 0,
                        WebkitFontSmoothing: "antialiased",
                      }}>Message sent!</p>
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "13px", color: "rgba(255,255,255,0.28)",
                        letterSpacing: "-0.01em", margin: 0, textAlign: "center",
                        WebkitFontSmoothing: "antialiased",
                      }}>We'll get back to you within 24 hours.<br />Closing shortly…</p>
                    </motion.div>
                  )}

                  {/* ERROR STATE */}
                  {status === "error" && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{
                        height: "100%", minHeight: "300px",
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", gap: "14px",
                      }}
                    >
                      <AlertCircle size={28} color="rgba(255,80,80,0.65)" strokeWidth={1.6} />
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "14px", fontWeight: 500,
                        color: "rgba(255,255,255,0.55)",
                        letterSpacing: "-0.01em", margin: 0,
                        WebkitFontSmoothing: "antialiased",
                      }}>Something went wrong.</p>
                      <p style={{
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px", color: "rgba(255,255,255,0.22)",
                        letterSpacing: "-0.01em", margin: 0, textAlign: "center",
                        WebkitFontSmoothing: "antialiased",
                      }}>Please check your connection and try again.</p>
                      <button
                        onClick={() => setStatus("idle")}
                        style={{
                          marginTop: "4px", padding: "10px 24px",
                          borderRadius: "8px", background: "rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.55)", border: "none",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "13px", fontWeight: 500, letterSpacing: "-0.01em",
                          cursor: "pointer",
                          transition: "background 0.15s ease",
                          WebkitFontSmoothing: "antialiased",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                      >
                        Try again
                      </button>
                    </motion.div>
                  )}

                  {/* FORM */}
                  {status === "idle" && (
                    <motion.div key="form" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                      <input type="text" placeholder="Name"
                        value={name} onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={{ ...field("name"), padding: "13px 14px" }}
                      />

                      {/* Contact preference selector */}
                      <div style={{
                        display: "flex", gap: "4px",
                        background: "rgba(255,255,255,0.07)",
                        borderRadius: "10px", padding: "4px",
                      }}>
                        {prefBtn("email", "Email")}
                        {prefBtn("whatsapp", "WhatsApp")}
                        {prefBtn("both", "Both")}
                      </div>

                      {/* Conditional contact fields */}
                      <AnimatePresence mode="wait">
                        {(contactPref === "email" || contactPref === "both") && (
                          <motion.div key="email-field"
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            style={{ overflow: "hidden" }}
                          >
                            <input type="email" placeholder="Email address"
                              value={email} onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                              style={{ ...field("email"), padding: "13px 14px" }}
                            />
                          </motion.div>
                        )}
                        {(contactPref === "whatsapp" || contactPref === "both") && (
                          <motion.div key="wa-field"
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            style={{ overflow: "hidden" }}
                          >
                            <input type="tel" placeholder="WhatsApp number"
                              value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                              onFocus={() => setFocused("wa")} onBlur={() => setFocused(null)}
                              style={{ ...field("wa"), padding: "13px 14px" }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <textarea placeholder="What are you building?"
                        value={message} onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                        rows={4}
                        style={{ ...field("msg"), padding: "13px 14px", resize: "none", lineHeight: 1.55 }}
                      />

                      <button onClick={() => fileRef.current?.click()} style={{
                        display: "flex", alignItems: "center", gap: "7px",
                        background: "none", border: "none", cursor: "pointer",
                        color: "rgba(255,255,255,0.20)", padding: "3px 0",
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontSize: "12px", letterSpacing: "-0.01em",
                        transition: "color 0.15s ease", WebkitFontSmoothing: "antialiased",
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.50)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.20)"; }}
                      >
                        <Paperclip size={12} />
                        <span>{fileName || "Attach a file"}</span>
                      </button>
                      <input
                        ref={fileRef} type="file"
                        accept="image/*,.pdf,.doc,.docx,.pptx,.xlsx"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const f = e.target.files?.[0] ?? null;
                          setFile(f);
                          setFileName(f?.name || "");
                        }}
                      />

                      <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        style={{
                          marginTop: "4px", width: "100%", padding: "14px",
                          borderRadius: "10px",
                          background: canSubmit ? "#2997ff" : "rgba(255,255,255,0.07)",
                          color: canSubmit ? "#ffffff" : "rgba(255,255,255,0.22)",
                          border: "none",
                          fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                          fontSize: "15px", fontWeight: 500, letterSpacing: "-0.01em",
                          cursor: canSubmit ? "pointer" : "default",
                          transition: "background 0.15s ease, transform 0.12s ease, color 0.15s ease",
                          WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale",
                        }}
                        onMouseEnter={(e) => { if (canSubmit) { e.currentTarget.style.background = "#0077ed"; e.currentTarget.style.transform = "scale(1.01)"; } }}
                        onMouseLeave={(e) => { if (canSubmit) { e.currentTarget.style.background = "#2997ff"; e.currentTarget.style.transform = "scale(1)"; } }}
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
