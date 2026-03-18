import { IconGear, IconBot, IconMonitor, IconLink, IconCpu, IconSmartphone } from "./components/Icons";
import { AutomationArt, AIAgentsArt, WebAppsArt, BusinessSystemsArt, RoboticsArt, MobileArt } from "./components/Illustrations";

export const services = [
  { id:"automation", eyebrow:"Workflow Automation",    Icon:IconGear,       heading:"Eliminate\nmanual work.",           desc:"Zapier, Make, n8n pipelines that remove repetitive tasks from your operation.", price:"From $800",   timeline:"2–5 days",   accent:"#2997ff", Art:AutomationArt,
    uniqueTag:"n8n · Zapier · Make", badge:"Automation" },
  { id:"ai-agents",  eyebrow:"AI Agents",              Icon:IconBot,        heading:"Custom AI\nthat works 24/7.",        desc:"Purpose-built agents for support, lead qualification, and internal operations.",  price:"From $1,200", timeline:"5–10 days",  accent:"#30d158", Art:AIAgentsArt,
    uniqueTag:"GPT-4 · Claude · Custom LLM", badge:"AI/ML" },
  { id:"web-apps",   eyebrow:"Web Applications",       Icon:IconMonitor,    heading:"Dashboards,\nCRMs, and SaaS.",       desc:"React, Firebase, Vercel. Full-stack web apps built for speed and clean UX.",    price:"From $1,500", timeline:"7–14 days",  accent:"#bf5af2", Art:WebAppsArt,
    uniqueTag:"React · Firebase · Vercel", badge:"Full-Stack" },
  { id:"systems",    eyebrow:"Business Systems",       Icon:IconLink,       heading:"One system.\nYour entire operation.", desc:"Inventory, HR, finance, scheduling — unified in one platform.",                  price:"From $3,000", timeline:"14–30 days", accent:"#ff9f0a", Art:BusinessSystemsArt,
    uniqueTag:"ERP · POS · Operations", badge:"Enterprise" },
  { id:"robotics",   eyebrow:"Robotics & Physical AI", Icon:IconCpu,        heading:"Edge AI.\nIndustrial-grade.",        desc:"PLC integration, computer vision, and embedded AI for industrial environments.", price:"From $3,000", timeline:"14–30 days", accent:"#ff375f", Art:RoboticsArt,
    uniqueTag:"YOLO · PLC · Edge Inference", badge:"Hardware" },
  { id:"mobile",     eyebrow:"Mobile Applications",   Icon:IconSmartphone, heading:"iOS + Android.\nShipped fast.",       desc:"React Native mobile apps — cross-platform, performant, production-ready.",       price:"From $2,000", timeline:"10–21 days", accent:"#64d2ff", Art:MobileArt,
    uniqueTag:"React Native · Expo · Play Store", badge:"Mobile" },
];
