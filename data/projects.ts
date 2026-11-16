/**
 * Projects Showcase content, in the same order as the resume.
 *
 * - `image` is optional. Without one, the card shows `icon` on a tinted tile.
 * - `imageFit`: "contain" for logos, "cover" for screenshots.
 * - `workflow` links the card to a workflow panel in the Workflow Automation
 *   section (use its slug from data/automations.ts) instead of an outside link.
 * - New projects come from other sessions via project-import/<slug>/
 *   (see project-import/PROJECT_BRIEF.md).
 */
export type ProjectIcon = "workflow" | "search" | "globe";

export interface Project {
  title: string;
  /** e.g. "Portfolio project", "Capstone project · HAU" */
  kind: string;
  period?: string;
  description: string;
  tags: string[];
  image?: string;
  imageFit?: "contain" | "cover";
  icon?: ProjectIcon;
  workflow?: string;
  /** Live site, shown as "Live demo" */
  link?: string | null;
  /** Public GitHub repo, shown as "Code" */
  repo?: string | null;
}

export const projects: Project[] = [
  {
    title: "Ask Your Shop: Agentic AI Assistant (MCP + RAG)",
    kind: "Portfolio project",
    period: "2026",
    description:
      "An MCP server in n8n that lets a shop owner query enquiry records in plain language from Claude Desktop or an n8n Gemini agent, plus a document search over product manuals that flags when the manuals don't cover a question.",
    tags: ["n8n", "MCP", "RAG", "pgvector", "Claude", "Gemini"],
    image: "/workflows/ask-your-shop-mcp-rag/02-mcp-server.png",
    imageFit: "cover",
    workflow: "ask-your-shop-mcp-rag",
  },
  {
    title: "AI Enquiry Triage & Reply Assistant",
    kind: "Portfolio project",
    period: "2026",
    description:
      "A triage workflow that classifies enquiries with Gemini, sends urgent ones straight to the owner, and limits price answers to the shop's own price sheet. A test set of tricky enquiries runs after each prompt change.",
    tags: ["n8n", "Google Gemini", "Google Sheets", "Gmail"],
    image: "/workflows/ai-enquiry-triage/01-canvas.png",
    imageFit: "cover",
    workflow: "ai-enquiry-triage",
  },
  {
    title: "Late Night Thoughts",
    kind: "Personal project",
    period: "2026",
    description:
      "A privacy-first journaling app: write what's keeping you up and a calm AI friend replies, streamed live from your choice of 11 providers using your own key, which never leaves the browser. Tagged notes, search, export and offline install.",
    tags: ["JavaScript", "LLM APIs", "Streaming (SSE)", "PWA", "Vercel"],
    image: "/projects/late-night-thoughts.png",
    imageFit: "cover",
    link: "https://latenightthoughts.vercel.app",
    repo: "https://github.com/Schmuchzyy/LateNightThoughts",
  },
  {
    title: "n8n Workflow Automation Suite",
    kind: "Personal project · Self-hosted",
    period: "2025 – Present",
    description:
      "A Job Application Tracker (Webhook → Google Sheets → Telegram) and Telegram alert bots with IF-node branching on a self-hosted n8n instance. Set up Google OAuth 2.0 from scratch and integrated 4+ REST APIs.",
    tags: ["n8n", "Webhooks", "Google Sheets API", "Telegram", "OAuth 2.0", "REST APIs"],
    icon: "workflow",
  },
  {
    title: "Missing Person Reporting Platform",
    kind: "Capstone project · HAU",
    period: "Dec 2024 – Mar 2025",
    description:
      "A responsive platform for reporting missing persons, with real-time data, user authentication and secure cloud storage. Tested end to end for cross-browser support, mobile layouts and security before submission.",
    tags: ["Vue.js", "Firebase", "Authentication", "Cloud Storage", "QA Testing"],
    icon: "search",
  },
  {
    title: "Personal E-Portfolio",
    kind: "Personal project",
    description:
      "This site: a responsive portfolio with dark mode, smooth animations, and a workflow showcase with screenshot walkthroughs.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/sean-logo.png",
    imageFit: "contain",
  },
];
