const IconGear = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
  </svg>
);
const IconBot = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="8" width="18" height="12" rx="3" stroke={color} strokeWidth={1.6}/>
    <path d="M8 8V6a4 4 0 018 0v2" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <circle cx="9" cy="14" r="1.5" fill={color}/>
    <circle cx="15" cy="14" r="1.5" fill={color}/>
    <path d="M10 18h4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
  </svg>
);
const IconMonitor = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth={1.6}/>
    <path d="M8 21h8M12 17v4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <path d="M6 8h4M6 11h6" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeOpacity={0.5}/>
    <rect x="14" y="7" width="4" height="5" rx="1" stroke={color} strokeWidth={1.4} strokeOpacity={0.6}/>
  </svg>
);
const IconLink = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
  </svg>
);
const IconCpu = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="7" y="7" width="10" height="10" rx="1" stroke={color} strokeWidth={1.6}/>
    <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" fill={color} opacity={0.4}/>
  </svg>
);
const IconSmartphone = ({ size=20, color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="3" stroke={color} strokeWidth={1.6}/>
    <path d="M10 6h4" stroke={color} strokeWidth={1.6} strokeLinecap="round"/>
    <circle cx="12" cy="18" r="1" fill={color}/>
    <path d="M9 10h4M9 13h6" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeOpacity={0.5}/>
  </svg>
);

export { IconGear, IconBot, IconMonitor, IconLink, IconCpu, IconSmartphone };
