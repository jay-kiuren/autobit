// ─── services/data.ts ─────────────────────────────────────────────────────────
// Aggregates all panel data in display order.
// To add/remove/reorder a panel — edit this array.
// To edit a panel's content/art/frame — open its file in ./panels/

import { automationData }      from "./AutomationPanel";
import { aiAgentsData }        from "./AIAgentsPanel";
import { webAppsData }         from "./WebAppsPanel";
import { businessSystemsData } from "./BusinessSystemsPanel";
import { roboticsData }        from "./RoboticsPanel";
import { mobileData }          from "./MobilePanel";

export const services = [
  automationData,
  aiAgentsData,
  webAppsData,
  businessSystemsData,
  roboticsData,
  mobileData,
] as const;

/** Union of all service records in display order (use in maps over `services`). */
export type ServiceRecord = (typeof services)[number];
export type ServiceData = ServiceRecord;
