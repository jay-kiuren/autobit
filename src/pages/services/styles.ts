export const servicesStyles = `
  /* ── Base container ── */
  .svc-c { max-width:1320px; margin:0 auto; padding:0 clamp(16px,4vw,48px); font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif; }

  /* ── Grid layouts ── */
  .svc-grid       { display:grid; grid-template-columns:1fr 1.15fr; gap:clamp(24px,4vw,56px); align-items:center; }
  .svc-grid-rev   { display:grid; grid-template-columns:1.15fr 1fr; gap:clamp(24px,4vw,56px); align-items:center; }

  /* ── Heading ── */
  .svc-heading {
    font-size:clamp(22px,2.8vw,44px);
    font-weight:700; letter-spacing:-0.8px; line-height:1.04;
    color:#f5f5f7; margin:0 0 16px; white-space:pre-line;
    font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
  }

  /* ── Frame card — transparent, no ghost ── */
  .svc-frame {
    border-radius:clamp(16px,2vw,24px);
    background:transparent;
    padding:clamp(22px,3.2vw,44px) clamp(22px,3.2vw,44px) clamp(18px,2.4vw,32px);
    position:relative; overflow:hidden;
  }

  /* ── Glass art card ── */
  .svc-glass {
    border-radius:20px;
    padding:1px;
    background:linear-gradient(145deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0.02) 50%,rgba(255,255,255,0.06) 100%);
  }
  .svc-glass-inner {
    border-radius:19px;
    background:linear-gradient(145deg,rgba(18,18,28,0.95) 0%,rgba(10,10,16,0.98) 60%,rgba(14,14,22,0.96) 100%);
    backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
    height:clamp(200px,28vw,360px);
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
    padding:clamp(12px,2vw,22px);
  }
  .svc-glass-inner::before {
    content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
  }
  .svc-glass-inner::after {
    content:''; position:absolute; inset:0; border-radius:19px;
    background:radial-gradient(ellipse at 25% 15%,rgba(255,255,255,0.04) 0%,transparent 55%);
    pointer-events:none;
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

  /* ── CTA ── */
  .svc-cta {
    background:#2997ff; color:#fff;
    padding:12px 26px; border-radius:980px; font-size:15px; font-weight:500;
    text-decoration:none; display:inline-block; cursor:pointer; border:none;
    transition:background 0.2s ease, transform 0.2s ease;
    font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
    white-space:nowrap; letter-spacing:-0.01em;
  }
  .svc-cta:hover { transform:scale(1.02); background:#0077ed; }

  /* ── Description ── */
  .svc-desc { font-size:clamp(12px,0.95vw,14px); line-height:1.68; color:rgba(255,255,255,0.38); margin:0 0 18px; max-width:420px; font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif; }

  /* ── Stat pill ── */
  .cta-stat-pill {
    display:inline-flex; align-items:center; gap:7px;
    background:rgba(255,255,255,0.05); border-radius:980px; padding:6px 16px;
    font-size:clamp(11px,0.9vw,13px); color:rgba(255,255,255,0.55); font-weight:500; white-space:nowrap;
  }
  .cta-stat-dot { width:6px; height:6px; border-radius:50%; background:#30d158; display:inline-block; }
`;