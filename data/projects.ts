/**
 * Projects Showcase content: web apps and software only. n8n builds belong in
 * the Workflow Automation section (data/automations.ts).
 *
 * - Each card opens a detail panel (#project-<slug>) with a screenshot viewer,
 *   the overview, what I built, and the tech stack.
 * - The first screenshot is the card cover. Without screenshots, the card
 *   shows `icon` on a tinted tile and the panel says "Screenshots coming soon".
 * - Screenshots go in public/projects/<slug>/ (16:10 or 16:9 PNGs look best).
 * - New projects come from other sessions via project-import/<slug>/
 *   (see project-import/PROJECT_BRIEF.md).
 */
import type { Screenshot } from "./screenshot";

export type ProjectIcon = "search" | "globe" | "code";

export interface Project {
  /** Used in the URL (#project-<slug>) — lowercase, dashes, no spaces */
  slug: string;
  title: string;
  /** e.g. "Portfolio project", "Capstone project · HAU" */
  kind: string;
  period?: string;
  /** One or two sentences shown on the card */
  description: string;
  /** Longer write-up shown in the panel, one string per paragraph */
  overview: string[];
  /** Concrete things built or solved, shown as a list in the panel */
  highlights: string[];
  tags: string[];
  /** One-line background shown at the top of the panel */
  context?: string;
  icon?: ProjectIcon;
  /** Public URL of the running app, shown as "Visit site" */
  link?: string | null;
  /** Public GitHub repo, shown as "Code" */
  repo?: string | null;
  screenshots: Screenshot[];
}

export const projects: Project[] = [
  {
    slug: "late-night-thoughts",
    title: "Late Night Thoughts",
    kind: "Personal project",
    period: "2026",
    description:
      "A privacy-first journaling app: write what's keeping you up and a calm AI friend replies, streamed live from your choice of 11 providers using your own key, which never leaves the browser. Tagged notes, search, export and offline install.",
    overview: [
      "A journaling app for the thoughts that keep you up at night. Write one down and a calm AI friend replies in a few honest sentences, streamed as it is written. Save the ones worth keeping as tagged notes, and once a week ask it to reflect on what you wrote.",
      "The app is one HTML file of plain JavaScript, with no framework and no build step. You bring your own key for one of 11 AI providers, including Anthropic, OpenAI, Google and Groq. The key stays in your browser and is sent only to the provider you picked. Notes stay in the browser's local storage.",
      "The live site runs without a server key, so it shows a clearly labelled example reply until you add your own. Google Gemini and Groq keys are free.",
    ],
    highlights: [
      "Streaming replies from 11 providers, with a model picker that can load the live model list from your account.",
      "A Test connection button that checks the key and model first; errors say what to do next.",
      "Installable PWA with an offline-first service worker, so notes open and save without a connection.",
      "Tag filters, live search, inline editing, undo, and Markdown or JSON export and import.",
      "Tests on Node's built-in runner, run by GitHub Actions on every push and pull request.",
    ],
    tags: ["JavaScript", "LLM APIs", "Streaming (SSE)", "PWA", "Vercel"],
    link: "https://latenightthoughts.vercel.app",
    repo: "https://github.com/Schmuchzyy/LateNightThoughts",
    screenshots: [
      {
        src: "/projects/late-night-thoughts/01-reply.png",
        alt: "A sample thought about choosing a career and the AI's calm reply, marked as an example",
        title: "The example reply",
        description: [
          "Until you add a key, the app shows a sample reply marked \"Example · not a live reply\", so visitors can see the tone before setting anything up. With a key, the real reply streams in here word by word.",
        ],
      },
      {
        src: "/projects/late-night-thoughts/02-notes.png",
        alt: "Notes panel with a search box, tag filters and a saved note tagged Personal",
        title: "Notes with tags and search",
        description: [
          "Thoughts worth keeping become notes. They can be tagged, filtered by tag and searched live, edited in place, and exported as Markdown or JSON. Reflect on my week sends the last 7 days of notes for a short summary.",
        ],
      },
      {
        src: "/projects/late-night-thoughts/03-light-mode.png",
        alt: "Late Night Thoughts in the light theme",
        title: "Light theme",
        description: ["Light and dark themes, switched from the button in the header."],
      },
      {
        src: "/projects/late-night-thoughts/04-phone.png",
        alt: "Late Night Thoughts at phone width",
        title: "On a phone",
        description: ["The layout works at phone width, and the app can be added to the home screen and used offline."],
      },
    ],
  },
  {
    slug: "hr-helpdesk-agent",
    title: "HR Helpdesk Agent",
    kind: "Personal project",
    period: "2026",
    description: "A chat assistant for a fictional Philippine BPO that answers employee HR questions only from the company handbook, declines off-topic requests, and hands sensitive matters and payroll disputes to HR through an LLM tool call.",
    overview: [
      "Employees of Northpoint BPO, a made-up Philippine BPO, ask the helpdesk about leave credits, payday, holiday pay, overtime, attendance and HMO coverage. Answers come only from a sample handbook and name the section they use. Questions the handbook doesn't cover, sensitive matters such as harassment or resignation, and payroll disputes go to HR instead, and HR sees those cases on a separate dashboard page.",
      "It's built with Python and Streamlit. The agent is a hand-written tool-calling loop: the model can call one function, escalate_to_hr(category, summary), and Python validates every call before saving the case to a CSV file. The same loop runs on Google Gemini's free tier or on Anthropic's Claude, depending on which API key is set.",
      "It runs locally and needs your own Gemini or Anthropic API key. The CSV storage is for the demo only and isn't meant for real employee data.",
    ],
    highlights: [
      "Wrote the tool-calling agent loop by hand for both Gemini and Claude, behind one shared interface.",
      "Python validates each escalation before saving it; invalid tool calls go back to the model as errors.",
      "Fixed replies going missing when Streamlit started a new run mid-answer, by locking input while answering.",
      "Handled Gemini overload errors with retries, a 25-second timeout and a fallback to a lighter model.",
      "Built an HR dashboard page with case counts, a chart by category and a table of escalated cases.",
    ],
    tags: ["Python", "Streamlit", "Gemini API", "Claude API", "pandas"],
    context: "Northpoint BPO and its handbook are fictional. All data in the screenshots is sample data.",
    icon: "code",
    screenshots: [
      {
        src: "/projects/hr-helpdesk-agent/01-cover.png",
        alt: "Chat window where the assistant answers a leave credits question, then replies with empathy to a complaint about a team lead and marks it as sent to HR",
        title: "The employee chat",
        description: ["A policy question answered from the handbook with its section named, followed by a sensitive complaint. The assistant doesn't try to handle it and sends it to HR as a sensitive case."],
      },
      {
        src: "/projects/hr-helpdesk-agent/02-escalations.png",
        alt: "Chat where a question about a rice subsidy and a short payslip are both forwarded to HR with their case categories",
        title: "Escalating to HR",
        description: ["A question the handbook doesn't cover and a payroll dispute. In both cases the model calls the escalate_to_hr tool instead of guessing, and the app confirms the saved case."],
      },
      {
        src: "/projects/hr-helpdesk-agent/03-guardrails.png",
        alt: "Chat where the assistant declines a coding request and an attempt to make it reveal its system prompt",
        title: "Staying on topic",
        description: ["An off-topic request and a prompt-injection attempt. Both are declined politely and no case is created."],
      },
      {
        src: "/projects/hr-helpdesk-agent/04-hr-dashboard.png",
        alt: "HR dashboard with case counts by category, a bar chart and a table of three open cases",
        title: "The HR dashboard",
        description: ["Where HR sees escalated cases: totals per category, a chart and the case list with timestamps, summaries and status."],
      },
      {
        src: "/projects/hr-helpdesk-agent/05-mobile.png",
        alt: "The chat at phone width answering a question about payday",
        title: "On a phone",
        description: ["The same chat at 390px wide, answering a payday question and naming the handbook section."],
      },
    ],
  },
  {
    slug: "missing-person-reporting-platform",
    title: "PHinder: Missing Person Reporting Platform",
    kind: "Capstone project · HAU",
    period: "Dec 2024 – Mar 2025",
    description:
      "PHinder, a responsive platform for reporting and finding missing persons, with a searchable report list, a map of last-seen locations, real-time data, user accounts and secure cloud storage.",
    overview: [
      "My capstone project at Holy Angel University. PHinder lets people search for a missing person, file a report, and follow updates on a case.",
      "Reports appear as cards that can be searched, sorted and filtered by Found or Not Found. Admins also get a map with a pin for each report and an inbox for new reports.",
      "It is built with Vue.js on Firebase, with real-time data so reports update without a refresh, user authentication and secure cloud storage. Before submission I tested it end to end for cross-browser support, mobile layouts and security.",
    ],
    highlights: [
      "Report list with search, sorting and a Found / Not Found status filter.",
      "Admin map with a pin per report and a popup with the person's details and status.",
      "Real-time data and user sign-in with Firebase.",
      "End-to-end testing across browsers and phone sizes.",
    ],
    tags: ["Vue.js", "Firebase", "Mapbox", "Authentication", "Cloud Storage", "QA Testing"],
    icon: "search",
    link: "https://missing-persons-tracker.web.app/home",
    screenshots: [
      {
        src: "/projects/missing-person-reporting-platform/01-home.webp",
        alt: "PHinder home page with a search bar for missing persons",
        title: "Home",
        description: [
          "The landing page leads with one search bar, so someone looking for a person can start right away. The top bar links to Home, Admin, Map and Reports.",
        ],
      },
      {
        src: "/projects/missing-person-reporting-platform/02-how-it-works.png",
        alt: "How PHinder works: create an account, search or report, track updates, spread awareness",
        title: "How it works",
        description: [
          "Four steps explain the flow: create an account, search or file a report, track updates on a case, and share it on social media to widen the search.",
        ],
      },
      {
        src: "/projects/missing-person-reporting-platform/03-reports.png",
        alt: "Reported missing persons as cards with age, gender, missing-since date and a Found or Not Found badge",
        title: "Reported missing persons",
        description: [
          "Each report is a card with the person's age, gender, the date they went missing and a Found or Not Found badge. The list can be searched, sorted and filtered by status.",
        ],
      },
      {
        src: "/projects/missing-person-reporting-platform/04-map.webp",
        alt: "Admin map with report pins, a popup for one report and a reports inbox",
        title: "Admin map and reports inbox",
        description: [
          "Admins see every report as a pin on a map. Clicking a pin shows the person's details and status, and new reports arrive in the inbox on the left.",
        ],
      },
    ],
  },
  {
    slug: "personal-e-portfolio",
    title: "Personal E-Portfolio",
    kind: "Personal project",
    period: "2026",
    description:
      "This site: a responsive portfolio in Next.js with dark mode, smooth animations, and focus-mode panels that walk through each workflow and project with screenshots.",
    overview: [
      "This site. It started as plain HTML, CSS and JavaScript and was rebuilt in Next.js with TypeScript, Tailwind CSS and Framer Motion.",
      "The content lives in typed data files, so the numbers in About are counted from the same data the page shows. Workflows and projects open in a detail panel with a screenshot viewer. The open panel is kept in the URL, so the phone's Back button closes it and a link can open one directly.",
      "It has light and dark themes, a phone layout, and a contact form, and Vercel redeploys it on every push to main.",
    ],
    highlights: [
      "Detail panels with a swipeable screenshot viewer, keyboard arrows and Escape to close.",
      "Panel state in the URL hash, so Back closes it and panels can be shared as links.",
      "Light and dark themes with CSS variables.",
      "Content in typed data files, so adding a project or workflow is one entry.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    icon: "code",
    link: "https://sean-anunciacion.vercel.app",
    screenshots: [
      {
        src: "/projects/personal-e-portfolio/01-home.png",
        alt: "Portfolio home page in the dark theme with the side navigation",
        title: "Home",
        description: [
          "The landing section with a typing effect for my roles and a scrolling row of the AI tools I build with. The side navigation highlights the section you are in.",
        ],
      },
      {
        src: "/projects/personal-e-portfolio/02-projects.png",
        alt: "Projects Showcase section with three project cards",
        title: "Project cards",
        description: [
          "Each card shows a cover screenshot, the stack and links to the live site and code. Clicking anywhere on a card opens it in focus mode.",
        ],
      },
      {
        src: "/projects/personal-e-portfolio/03-workflow-panel.png",
        alt: "A workflow open in the detail panel with a screenshot viewer",
        title: "Focus mode",
        description: [
          "Workflows and projects open in the same detail panel: a screenshot viewer with a description under each image, then the overview and tools. Arrow keys flip screenshots and Escape closes it.",
        ],
      },
      {
        src: "/projects/personal-e-portfolio/04-light-about.png",
        alt: "About section in the light theme with stats counted from the site's data",
        title: "Light theme",
        description: [
          "The light theme, toggled from the side navigation. The numbers under About are counted from the same data files the page uses.",
        ],
      },
      {
        src: "/projects/personal-e-portfolio/05-phone.png",
        alt: "A project detail panel at phone width",
        title: "On a phone",
        description: [
          "On a phone the panel fills the screen, screenshots can be swiped, and the Back button closes it.",
        ],
      },
    ],
  },
];
