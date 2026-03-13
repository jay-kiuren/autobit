import { useState, useEffect } from "react";

// Extend Window to include FB SDK types
declare global {
  interface Window {
    FB?: {
      CustomerChat?: {
        show: () => void;
        hide: () => void;
        showDialog: () => void;
        hideDialog: () => void;
      };
    };
    fbAsyncInit?: () => void;
  }
}

const FB_PAGE_ID = "701374596384613";

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

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [fbReady, setFbReady] = useState(false);

  // Wait for FB SDK to load, then inject the hidden customer chat plugin
  useEffect(() => {
    const initFB = () => {
      if (!window.FB) return;

      // Inject the fb-customerchat div if not already present
      if (!document.getElementById("fb-customerchat")) {
        const chatbox = document.createElement("div");
        chatbox.id = "fb-customerchat";
        chatbox.setAttribute("class", "fb-customerchat");
        chatbox.setAttribute("page_id", FB_PAGE_ID);
        chatbox.setAttribute("theme_color", "#0099FF");
        // Start hidden — we control it ourselves
        chatbox.setAttribute("minimized", "true");
        document.body.appendChild(chatbox);

        window.FB.CustomerChat?.hide();
      }

      setFbReady(true);
    };

    // FB SDK may already be ready, or we wait for fbAsyncInit
    if (window.FB) {
      initFB();
    } else {
      const originalInit = window.fbAsyncInit;
      window.fbAsyncInit = () => {
        originalInit?.();
        initFB();
      };
    }

    // Poll fallback in case fbAsyncInit already fired before this component mounted
    const poll = setInterval(() => {
      if (window.FB) {
        initFB();
        clearInterval(poll);
      }
    }, 300);

    return () => clearInterval(poll);
  }, []);

  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const handleMessengerClick = () => {
    setIsOpen(false);
    if (fbReady && window.FB?.CustomerChat) {
      // Show the chat dialog inline on the page
      window.FB.CustomerChat.show();
      window.FB.CustomerChat.showDialog();
    } else {
      // Graceful fallback if SDK hasn't loaded yet
      window.open(`https://m.me/${FB_PAGE_ID}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">

        {/* Sub-buttons */}
        <div
          className="flex flex-col items-end gap-3 transition-all duration-300 origin-bottom"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.92)",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {/* WhatsApp — pending Meta approval */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 text-white/40 text-xs font-medium px-3 py-1.5 rounded-full shadow-md select-none">
              <span>WhatsApp</span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">Soon</span>
            </div>
            <button
              disabled
              aria-label="WhatsApp (coming soon)"
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-not-allowed opacity-40"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <WhatsAppIcon />
            </button>
          </div>

          {/* Messenger — active, opens in-page chat */}
          <div className="flex items-center gap-2 group">
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
              <span>Messenger</span>
            </div>
            <button
              onClick={handleMessengerClick}
              aria-label="Chat on Facebook Messenger"
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

        {/* Main toggle bubble */}
        <div className="relative">
          {showPulse && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "hsl(211 100% 58% / 0.35)" }}
            />
          )}
          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "Close chat" : "Chat with us"}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            style={{
              background: isOpen
                ? "hsl(240 3% 20%)"
                : "linear-gradient(135deg, hsl(211 100% 58%) 0%, hsl(220 100% 46%) 100%)",
              boxShadow: isOpen
                ? "0 4px 24px rgba(0,0,0,0.5)"
                : "0 4px 24px hsl(211 100% 58% / 0.5)",
              border: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
          >
            <div
              className="transition-transform duration-300"
              style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              {isOpen ? (
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
