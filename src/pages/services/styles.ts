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

  /* ═══════════════════════════════════════════════════════════════════════════
     RESPONSIVE — media queries only, no component code touched
     Targets existing class names + panel IDs with !important to override
     inline styles set directly on elements inside each panel component.
     ═══════════════════════════════════════════════════════════════════════════ */

  /* ── Tablet (≤ 1024px) ─────────────────────────────────────────────────── */
  @media (max-width: 1024px) {

    /* ServiceSections default 2-col card grid → single column */
    .svc-grid,
    .svc-grid-rev {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
    }

    /* Art card height reduction */
    .svc-glass-inner {
      height: clamp(180px, 45vw, 300px) !important;
    }

    /* Frame padding tighten */
    .svc-frame {
      padding: clamp(20px, 3vw, 32px) clamp(16px, 2.5vw, 28px) !important;
    }

    /* ── Automation panel — collapse 1fr 1fr grid ── */
    #automation > div > div:first-child {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
    }

    /* ── AI Agents panel — collapse 1fr 1fr grid ── */
    #ai-agents > div > div:first-child {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
      margin-bottom: 28px !important;
    }

    /* ── Business Systems panel — collapse 1.1fr 0.9fr grid ── */
    #systems > div > div:first-child {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
      margin-bottom: 28px !important;
    }

    /* ── Mobile panel — collapse 1fr auto 1fr phone layout ── */
    #mobile > div > div:first-child {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
    }

    /* ── Robotics panel — the grid is nested inside a motion.div wrapper ── */
    #robotics > div > div:first-child > div {
      grid-template-columns: 1fr !important;
      gap: 28px !important;
    }

    /* ── Web Apps panel — keep 3-col stat row, just tighten ── */
    #web-apps > div > div:nth-child(2) {
      gap: 1px !important;
    }
  }

  /* ── Mobile (≤ 767px) ──────────────────────────────────────────────────── */
  @media (max-width: 767px) {

    /* Container horizontal padding */
    .svc-c {
      padding: 0 16px !important;
    }

    /* Headings — allow wrapping */
    .svc-heading {
      white-space: normal !important;
      font-size: clamp(22px, 6vw, 36px) !important;
    }

    /* Description full width */
    .svc-desc {
      max-width: 100% !important;
    }

    /* Art card height on mobile */
    .svc-glass-inner {
      height: clamp(160px, 55vw, 240px) !important;
    }

    /* ── All full panels — reduce vertical padding ── */
    #automation,
    #ai-agents,
    #web-apps,
    #systems,
    #mobile,
    #robotics {
      min-height: auto !important;
      padding-top: 56px !important;
      padding-bottom: 48px !important;
    }

    /* ── Automation stat strip — 4 cols → 2 cols ── */
    #automation > div > div:last-child {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* ── AI Agents stat strip — keep 3 cols, they fit ── */
    #ai-agents > div > div:last-child {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 1px !important;
    }

    /* ── Web Apps big stat row — 3 cols → 1 col ── */
    #web-apps > div > div:nth-child(2) {
      grid-template-columns: 1fr !important;
    }

    /* ── Business Systems stat strip — 4 cols → 2 cols ── */
    #systems > div > div:last-child {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* ── Mobile panel stat strip — already 3 cols, stays ── */
    #mobile > div > div:last-child {
      grid-template-columns: repeat(3, 1fr) !important;
    }

    /* ── Mobile panel: hide center phone column on very small screens ── */
    #mobile > div > div:first-child > *:nth-child(2) {
      display: none !important;
    }

    /* ── Robotics stat cards — reduce padding ── */
    #robotics > div > div:first-child > div > div:last-child > div {
      padding: 12px 14px !important;
    }

    /* ── CTA section padding ── */
    .svc-cta {
      padding: 12px 24px !important;
      font-size: 14px !important;
    }
  }

  /* ── Small mobile (≤ 480px) ────────────────────────────────────────────── */
  @media (max-width: 480px) {

    /* AI Agents stat strip → 1 col */
    #ai-agents > div > div:last-child {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* Mobile panel stat strip → 1 col */
    #mobile > div > div:last-child {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    /* Business Systems + Automation stat → 1 col */
    #automation > div > div:last-child,
    #systems > div > div:last-child {
      grid-template-columns: 1fr !important;
    }
  }
`;