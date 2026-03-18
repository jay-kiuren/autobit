// ─── services/data.ts ─────────────────────────────────────────────────────────
// Aggregates all panel data in display order.
// To add/remove/reorder a panel — edit this array.
// To edit a panel's content/art/frame — open its file in ./panels/

import { automationData }      from "./panels/AutomationPanel";
import { aiAgentsData }        from "./panels/AIAgentsPanel";
import { webAppsData }         from "./panels/WebAppsPanel";
import { businessSystemsData } from "./panels/BusinessSystemsPanel";
import { roboticsData }        from "./panels/RoboticsPanel";
import { mobileData }          from "./panels/MobilePanel";

export const services = [
  automationData,
  aiAgentsData,
  webAppsData,
  businessSystemsData,
  roboticsData,
  mobileData,
];

export type ServiceData = typeof services[0];
