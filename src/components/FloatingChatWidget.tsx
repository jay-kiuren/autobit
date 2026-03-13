import { useState, useEffect } from "react";

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

// Extend window with FB SDK types
declare global {
  interface Window {
    FB?: {
      CustomerChat: {
        show: () => void;
        hide: () => void;
        showDialog: () => void;
        hideDialog: () => void;
      };
      init: (params: { xfbml: boolean; version: string }) => void;
      XFBML: { 
        parse: (node?: HTMLElement) => void;
      };
    };
    fbAsyncInit: () => void;
  }
}

export default function FloatingChatWidget() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0);

  useEffect(() => {
    if (menuOpen) setShowPulse(false);
  }, [menuOpen]);

  // Initialize Facebook SDK and Customer Chat
  useEffect(() => {
    const MAX_ATTEMPTS = 10;
    let pollInterval: NodeJS.Timeout;

    const createChatElement = () => {
      // Remove existing chat element if any
      const existingChat = document.getElementById("fb-customerchat");
      if (existingChat) {
        existingChat.remove();
      }

      // Create fresh chat element
      const chatbox = document.createElement("div");
      chatbox.id = "fb-customerchat";
      chatbox.className = "fb-customerchat";
      chatbox.setAttribute("attribution", "biz_inbox");
      chatbox.setAttribute("page_id", FB_PAGE_ID);
      chatbox.setAttribute("theme_color", "#0099FF");
      chatbox.setAttribute("logged_in_greeting", "Hi! How can we help you?");
      chatbox.setAttribute("logged_out_greeting", "Hi! How can we help you?");
      chatbox.setAttribute("minimized", "true");
      document.body.appendChild(chatbox);
      
      return chatbox;
    };

    const initFacebookSDK = () => {
      return new Promise<void>((resolve) => {
        // If SDK already loaded
        if (window.FB && window.FB.XFBML) {
          resolve();
          return;
        }

        // Set up fbAsyncInit
        window.fbAsyncInit = function() {
          if (window.FB) {
            window.FB.init({
              xfbml: true,
              version: "v18.0"
            });
            resolve();
          }
        };

        // Load SDK script if not present
        if (!document.getElementById("facebook-jssdk")) {
          const script = document.createElement("script");
          script.id = "facebook-jssdk";
          script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
          script.async = true;
          script.defer = true;
          script.crossOrigin = "anonymous";
          document.body.appendChild(script);
        } else {
          // Script exists but FB not ready yet, wait for it
          const checkFB = setInterval(() => {
            if (window.FB && window.FB.XFBML) {
              clearInterval(checkFB);
              resolve();
            }
          }, 100);
        }
      });
    };

    const initializeChat = async () => {
      try {
        // Create the chat element
        createChatElement();

        // Initialize SDK
        await initFacebookSDK();

        // Parse the XFBML to initialize the chat plugin
        if (window.FB?.XFBML) {
          window.FB.XFBML.parse();
        }

        // Poll for Customer Chat availability
        let attempts = 0;
        pollInterval = setInterval(() => {
          attempts++;
          
          // Check if Customer Chat is ready
          if (window.FB?.CustomerChat) {
            setSdkReady(true);
            clearInterval(pollInterval);
          } else if (attempts >= MAX_ATTEMPTS) {
            // Max attempts reached, still not ready
            console.warn("Facebook Customer Chat failed to initialize after multiple attempts");
            clearInterval(pollInterval);
          }
        }, 500);

      } catch (error) {
        console.error("Failed to initialize Facebook Chat:", error);
      }
    };

    initializeChat();

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  const handleMessengerClick = () => {
    setMenuOpen(false);
    
    // If SDK is ready, try to open the chat dialog
    if (sdkReady && window.FB?.CustomerChat) {
      try {
        // First make sure the chat is visible
        window.FB.CustomerChat.show();
        
        // Small delay to ensure show() completes
        setTimeout(() => {
          try {
            // Show the dialog
            window.FB.CustomerChat.showDialog();
          } catch (e) {
            console.warn("Error showing dialog, using fallback:", e);
            // Fallback to page plugin in popup
            openMessengerPopup();
          }
        }, 300);
      } catch (e) {
        console.warn("Error with FB chat:", e);
        openMessengerPopup();
      }
    } else {
      // SDK not ready, use fallback
      openMessengerPopup();
    }
  };

  const openMessengerPopup = () => {
    // Open Messenger in a popup window instead of new tab
    const width = 400;
    const height = 600;
    const left = window.innerWidth - width - 20;
    const top = window.innerHeight - height - 100;
    
    window.open(
      `https://m.me/${FB_PAGE_ID}`,
      'Messenger',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no`
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">

        {/* Sub-buttons */}
        <div
          className="flex flex-col items-end gap-3 transition-all duration-300 origin-bottom"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.92)",
            pointerEvents: menuOpen ? "auto" : "none",
          }}
        >
          {/* WhatsApp — pending */}
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

          {/* Messenger */}
          <div className="flex items-center gap-2 group">
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 select-none">
              <span>Messenger</span>
              {!sdkReady && (
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full">Loading...</span>
              )}
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

        {/* Main toggle bubble */}
        <div className="relative">
          {showPulse && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: "hsl(211 100% 58% / 0.35)" }}
            />
          )}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Chat with us"}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none"
            style={{
              background: menuOpen
                ? "hsl(240 3% 20%)"
                : "linear-gradient(135deg, hsl(211 100% 58%) 0%, hsl(220 100% 46%) 100%)",
              boxShadow: menuOpen
                ? "0 4px 24px rgba(0,0,0,0.5)"
                : "0 4px 24px hsl(211 100% 58% / 0.5)",
              border: menuOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
          >
            <div
              className="transition-transform duration-300"
              style={{ transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              {menuOpen ? (
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

      {/* Add debug info in development - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 right-5 bg-black text-white text-xs p-2 rounded opacity-50">
          FB SDK: {sdkReady ? '✅' : '⏳'}
        </div>
      )}
    </>
  );
}
