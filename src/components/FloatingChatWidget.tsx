import { useState, useEffect, useRef } from "react";

const FB_PAGE_ID = "701374596384613";
const WA_PHONE = "639382861265"; // +63 format, no +

const MessengerIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <defs>
      <radialGradient id="msgGrad" cx="19.25%" cy="99.46%" r="108.96%">
        <stop offset="0%" stopColor="#09F" />
        <stop offset="60.975%" stopColor="#A033FF" />
        <stop offset="93.482%" stopColor="#FF5280" />
        <stop offset="100%" stopColor="#FF7061" />
      </radialGradient>
    </defs>
    <path
      d="M24 4C12.954 4 4 12.507 4 23.021c0 5.689 2.386 10.818 6.245 14.51.326.295.525.713.532 1.156l.108 3.612a1.27 1.27 0 0 0 1.783 1.12l4.028-1.778a1.27 1.27 0 0 1 .847-.062A21.39 21.39 0 0 0 24 42.042c11.046 0 20-8.507 20-19.021C44 12.507 35.046 4 24 4Z"
      fill="url(#msgGrad)"
    />
    <path
      d="m11.343 27.566 5.874-9.316a3 3 0 0 1 4.333-.8l4.671 3.503a1.2 1.2 0 0 0 1.445-.003l6.306-4.784c.84-.638 1.938.37 1.381 1.266l-5.874 9.316a3 3 0 0 1-4.333.8l-4.671-3.503a1.2 1.2 0 0 0-1.445.003l-6.306 4.784c-.84.638-1.938-.37-1.381-1.266Z"
      fill="white"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
    <path
      d="M24 4C12.954 4 4 12.954 4 24c0 3.777 1.02 7.31 2.8 10.342L4 44l9.896-2.756A19.918 19.918 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4Z"
      fill="#25D366"
    />
    <path
      d="M34.518 29.21c-.49-.246-2.908-1.434-3.358-1.597-.45-.163-.777-.245-1.104.245-.327.49-1.267 1.597-1.553 1.924-.286.327-.572.368-1.062.123-.49-.245-2.07-.763-3.942-2.431-1.457-1.299-2.44-2.902-2.727-3.392-.286-.49-.03-.755.215-1 .22-.217.49-.572.735-.858.245-.286.327-.49.49-.817.164-.327.082-.613-.04-.858-.123-.245-1.105-2.665-1.514-3.646-.398-.958-.803-.829-1.104-.844a19.9 19.9 0 0 0-.94-.018c-.326 0-.857.123-1.307.613-.449.49-1.716 1.678-1.716 4.093 0 2.416 1.757 4.75 2.002 5.077.245.326 3.46 5.283 8.384 7.408 1.17.505 2.083.807 2.796 1.033 1.175.373 2.245.32 3.088.194.942-.14 2.908-1.189 3.317-2.337.41-1.148.41-2.132.287-2.337-.122-.204-.449-.327-.94-.572Z"
      fill="white"
    />
  </svg>
);

// WhatsApp in-page chat panel
function WhatsAppPanel({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [iframeError, setIframeError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input when panel opens
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const sendMessage = () => {
    const text = message.trim() || "Hello! I'd like to know more about AUTOBIT.";
    const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickMessages = [
    "Hi! I'd like to learn more about your services.",
    "Can I get a project quote?",
    "I'm interested in AI automation.",
  ];

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden shadow-2xl"
      style={{
        width: "320px",
        height: "420px",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,211,102,0.15)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #075E54 0%, #128C7E 100%)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5">
            <path d="M24 4C12.954 4 4 12.954 4 24c0 3.777 1.02 7.31 2.8 10.342L4 44l9.896-2.756A19.918 19.918 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4Z" fill="#25D366"/>
            <path d="M34.518 29.21c-.49-.246-2.908-1.434-3.358-1.597-.45-.163-.777-.245-1.104.245-.327.49-1.267 1.597-1.553 1.924-.286.327-.572.368-1.062.123-.49-.245-2.07-.763-3.942-2.431-1.457-1.299-2.44-2.902-2.727-3.392-.286-.49-.03-.755.215-1 .22-.217.49-.572.735-.858.245-.286.327-.49.49-.817.164-.327.082-.613-.04-.858-.123-.245-1.105-2.665-1.514-3.646-.398-.958-.803-.829-1.104-.844a19.9 19.9 0 0 0-.94-.018c-.326 0-.857.123-1.307.613-.449.49-1.716 1.678-1.716 4.093 0 2.416 1.757 4.75 2.002 5.077.245.326 3.46 5.283 8.384 7.408 1.17.505 2.083.807 2.796 1.033 1.175.373 2.245.32 3.088.194.942-.14 2.908-1.189 3.317-2.337.41-1.148.41-2.132.287-2.337-.122-.204-.449-.327-.94-.572Z" fill="white"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-tight">AUTOBIT</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <p className="text-green-300 text-xs">Typically replies quickly</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label="Close WhatsApp chat"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Chat body */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2"
        style={{
          background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\") #0e1a17",
        }}
      >
        {/* Greeting bubble */}
        <div className="flex justify-start">
          <div
            className="text-xs text-white/80 px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%] leading-relaxed"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            👋 Hi! How can we help you today?
            <span className="block text-right text-white/30 text-[10px] mt-1">AUTOBIT</span>
          </div>
        </div>

        {/* Quick reply chips */}
        <div className="flex flex-col gap-1.5 mt-1">
          {quickMessages.map((msg) => (
            <button
              key={msg}
              onClick={() => setMessage(msg)}
              className="text-left text-xs px-3 py-2 rounded-xl transition-all duration-150 hover:scale-[1.02] active:scale-95"
              style={{
                background: message === msg ? "rgba(37,211,102,0.2)" : "rgba(37,211,102,0.07)",
                border: `1px solid ${message === msg ? "rgba(37,211,102,0.5)" : "rgba(37,211,102,0.2)"}`,
                color: "#7ee8a2",
              }}
            >
              {msg}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
        style={{ background: "#1a1a1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 text-xs text-white placeholder-white/30 bg-transparent outline-none min-w-0"
        />
        <button
          onClick={sendMessage}
          aria-label="Send on WhatsApp"
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150 hover:scale-110 active:scale-95"
          style={{
            background: message.trim()
              ? "linear-gradient(135deg, #25D366 0%, #128C7E 100%)"
              : "rgba(255,255,255,0.08)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" style={{ transform: "rotate(45deg)" }}>
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-center gap-1.5 py-1.5 flex-shrink-0"
        style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-3 h-3">
          <path d="M24 4C12.954 4 4 12.954 4 24c0 3.777 1.02 7.31 2.8 10.342L4 44l9.896-2.756A19.918 19.918 0 0 0 24 44c11.046 0 20-8.954 20-20S35.046 4 24 4Z" fill="#25D366"/>
        </svg>
        <span className="text-white/20 text-[10px]">Powered by WhatsApp</span>
      </div>
    </div>
  );
}

// Simple popup opener for Messenger
const openMessengerPopup = () => {
  const width = 400;
  const height = 600;
  const left = window.screen.width - width - 20;
  const top = window.screen.height - height - 80;
  window.open(
    `https://m.me/${FB_PAGE_ID}`,
    "Messenger",
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no,scrollbars=yes`
  );
};

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [isMessengerHovered, setIsMessengerHovered] = useState(false);
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);

  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setWhatsappOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleMessengerClick = () => {
    setIsOpen(false);
    setWhatsappOpen(false);
    openMessengerPopup();
  };

  const handleWhatsAppClick = () => {
    setIsOpen(false);
    setWhatsappOpen((o) => !o);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {(isOpen || whatsappOpen) && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => { setIsOpen(false); setWhatsappOpen(false); }}
        />
      )}

      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">

        {/* WhatsApp in-page panel */}
        <div
          style={{
            opacity: whatsappOpen ? 1 : 0,
            transform: whatsappOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            transition: "opacity 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            pointerEvents: whatsappOpen ? "auto" : "none",
            transformOrigin: "bottom right",
          }}
        >
          <WhatsAppPanel onClose={() => setWhatsappOpen(false)} />
        </div>

        {/* Sub-buttons (only when FAB is open and WhatsApp panel is closed) */}
        <div
          className="flex flex-col items-end gap-3"
          style={{
            opacity: isOpen && !whatsappOpen ? 1 : 0,
            transform: isOpen && !whatsappOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
            transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            pointerEvents: isOpen && !whatsappOpen ? "auto" : "none",
          }}
        >
          {/* WhatsApp button */}
          <div
            className="flex items-center gap-2 group"
            onMouseEnter={() => setIsWhatsappHovered(true)}
            onMouseLeave={() => setIsWhatsappHovered(false)}
          >
            <div
              className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-opacity duration-200 select-none"
              style={{ opacity: isWhatsappHovered ? 1 : 0 }}
            >
              WhatsApp
            </div>
            <button
              onClick={handleWhatsAppClick}
              aria-label="Chat on WhatsApp"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-150"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
              }}
            >
              <WhatsAppIcon />
            </button>
          </div>

          {/* Messenger button */}
          <div
            className="flex items-center gap-2 group"
            onMouseEnter={() => setIsMessengerHovered(true)}
            onMouseLeave={() => setIsMessengerHovered(false)}
          >
            <div
              className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full shadow-md transition-opacity duration-200 select-none"
              style={{ opacity: isMessengerHovered ? 1 : 0 }}
            >
              Messenger
            </div>
            <button
              onClick={handleMessengerClick}
              aria-label="Chat on Messenger"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-150"
              style={{
                background: "radial-gradient(circle at 20% 100%, #09F 0%, #A033FF 61%, #FF5280 93%, #FF7061 100%)",
                boxShadow: "0 4px 20px rgba(160, 51, 255, 0.4)",
              }}
            >
              <MessengerIcon />
            </button>
          </div>
        </div>

        {/* Main FAB */}
        <div className="relative">
          {showPulse && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "hsl(211 100% 58% / 0.35)" }}
            />
          )}
          <button
            onClick={() => {
              if (whatsappOpen) {
                setWhatsappOpen(false);
              } else {
                setIsOpen((o) => !o);
              }
            }}
            aria-label={isOpen || whatsappOpen ? "Close" : "Chat with us"}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
            style={{
              background: isOpen || whatsappOpen
                ? "hsl(240 3% 20%)"
                : "linear-gradient(135deg, hsl(211 100% 58%) 0%, hsl(220 100% 46%) 100%)",
              boxShadow: isOpen || whatsappOpen
                ? "0 4px 24px rgba(0,0,0,0.5)"
                : "0 4px 24px hsl(211 100% 58% / 0.5)",
              border: isOpen || whatsappOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
          >
            <div
              style={{
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                transform: isOpen || whatsappOpen ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              {isOpen || whatsappOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="w-6 h-6">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-3H6V7h12v2z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
