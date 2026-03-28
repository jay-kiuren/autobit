export const servicesStyles = `
  /* ── Base container — fluid at all sizes ── */
  .svc-c { max-width:1320px; margin:0 auto; padding:0 clamp(16px,4vw,48px); font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif; }

  /* ── Grid layouts ── */
  .svc-grid       { display:grid; grid-template-columns:1fr 1.15fr; gap:clamp(24px,4vw,56px); align-items:center; }
  .svc-grid-rev   { display:grid; grid-template-columns:1.15fr 1fr; gap:clamp(24px,4vw,56px); align-items:center; }

  /* ── Heading — fluid typography ── */
  .svc-heading {
    font-size:clamp(22px,2.8vw,44px);
    font-weight:700; letter-spacing:-0.8px; line-height:1.04;
    color:#f5f5f7; margin:0 0 16px; white-space:pre-line; font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
  }

  /* ── Frame card — base ── */
  .svc-frame {
    border-radius:clamp(16px,2vw,24px);
    background:rgba(255,255,255,0.016);
    padding:clamp(22px,3.2vw,44px) clamp(22px,3.2vw,44px) clamp(18px,2.4vw,32px);
    position:relative; overflow:hidden;
  }

  /* ── Glass art card ── */
  .svc-glass { border-radius:20px; padding:1px; }
  .svc-glass-inner {
    border-radius:19px;
    background:linear-gradient(145deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.01) 55%,rgba(255,255,255,0.03) 100%);
    backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
    height:clamp(200px,28vw,360px);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
    padding:clamp(12px,2vw,22px);
  }
  .svc-glass-inner::before {
    content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent);
  }

  /* ── Overlap fade ── */
  .svc-fade { position:absolute; bottom:0; left:0; right:0; height:90px;
    background:linear-gradient(to bottom,transparent,#000); pointer-events:none; z-index:5; }

  /* ── Tech tag ── */
  .svc-tag {
    display:inline-block; font-size:clamp(8px,0.8vw,10px); font-weight:500; letter-spacing:0.05em;
    padding:3px 9px; border-radius:6px;
    background:rgba(255,255,255,0.05);
    color:rgba(255,255,255,0.4); font-family:'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
    margin-bottom:clamp(10px,1.5vw,18px);
  }

  /* ── Badge pill ── */
  .svc-badge {
    display:inline-block; font-size:clamp(7px,0.7vw,9px); font-weight:700; letter-spacing:0.1em;
    padding:3px 9px; border-radius:20px; margin-bottom:clamp(8px,1vw,12px);
  }

  /* ── CTA buttons ── */
  .svc-cta {
    background:#2997ff; color:#fff;
    padding:12px 26px;
    border-radius:980px; font-size:15px; font-weight:500;
    text-decoration:none; display:inline-block; transition:background 0.2s ease, transform 0.2s ease; font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    white-space:nowrap; letter-spacing:-0.01em;
  }
  .svc-cta:hover { transform:scale(1.02); background:#0077ed; }

  /* ── Description text ── */
  .svc-desc { font-size:clamp(12px,0.95vw,14px); line-height:1.68; color:rgba(255,255,255,0.38); margin:0 0 18px; max-width:420px; font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif; }

  /* ── Responsive breakpoints ── */
  .cta-stat-pill {
    display:inline-flex; align-items:center; gap:7px;
    background:rgba(255,255,255,0.05);
    border-radius:980px; padding:6px 16px;
    font-size:clamp(11px,0.9vw,13px); color:rgba(255,255,255,0.55); font-weight:500;
    white-space:nowrap;
  }
  .cta-stat-dot { width:6px; height:6px; border-radius:50%; background:#30d158; display:inline-block; }
`;