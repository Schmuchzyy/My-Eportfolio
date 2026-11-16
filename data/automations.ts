/**
 * Workflow Automation section content.
 *
 * Adding a workflow:
 *  1. Put its screenshots in  public/workflows/<slug>/  (PNG/JPG/SVG, any size;
 *     wide n8n canvas shots look best).
 *  2. Copy one entry below and fill it in. Set `status` to "live" once it runs.
 *
 * New workflows come from the orchestrator export in workflow-import/<slug>/
 * (see workflow-import/ORCHESTRATOR_BRIEF.md).
 *
 * Explaining a screenshot:
 *  - `title` is a short heading for what the screenshot shows.
 *  - `description` is shown under it, one string per paragraph. Say what the
 *    viewer is looking at and why that part of the workflow matters.
 */

import type { Screenshot } from "./screenshot";

export type AutomationStatus = "live" | "in-progress" | "concept";

export type WorkflowScreenshot = Screenshot;

export interface Automation {
  /** Used in the URL (#workflow-<slug>) — lowercase, dashes, no spaces */
  slug: string;
  title: string;
  /** One or two sentences shown on the card */
  description: string;
  /** Longer write-up shown in the panel, one string per paragraph */
  overview: string[];
  /** Short node names, in order, e.g. ["Gmail trigger", "OpenAI", "Slack"] */
  flow: string[];
  tools: string[];
  status: AutomationStatus;
  /** Short label on the card and panel, e.g. "Practice client" */
  tag?: string;
  /** One-line background shown at the top of the panel (who it was for, how it was built) */
  context?: string;
  /** Optional measurable outcome, e.g. "Saves ~6 hrs/week". Shown on the card and in the panel. */
  result?: string;
  /** Card cover image. Defaults to the first screenshot. */
  cover?: string;
  link?: string | null;
  screenshots: WorkflowScreenshot[];
}

const PRACTICE_CLIENT =
  "Hale Cycles is a role-played practice client, and all customer data is test data. Built with Claude Code as my AI coding assistant.";

export const automations: Automation[] = [
  {
    slug: "ask-your-shop-mcp-rag",
    title: "Ask Your Shop: MCP and RAG Assistant",
    description:
      "An MCP server in n8n that lets a shop owner ask Claude or a Gemini chat about customer enquiries and product manuals, with checks before any data changes.",
    overview: [
      "n8n's MCP Server Trigger offers three tools to any AI assistant: find enquiries in the shop's log, search the product manuals, and mark an enquiry as replied. Each tool is a small sub-workflow, so the AI never touches the sheet or the database directly. Claude Desktop and an n8n AI Agent running Gemini both use the same tools.",
      "The manual search is retrieval-augmented generation (RAG). The manuals are split into passages, embedded with Gemini and stored in Postgres with pgvector. If even the best passage is a weak match, the tool reports that the manuals do not cover the question, so the assistant says so instead of guessing. The limit was set from measured scores.",
      "The tool that changes data refuses unless the owner has confirmed, the row exists and the name matches the row, and it logs every change. The endpoint needs a bearer token. A 20-case test script checks all of this and passes 20 of 20."
    ],
    flow: ["MCP Server", "Tool sub-workflows", "Google Sheets", "pgvector search", "Claude or Gemini"],
    result: "Passes 20 of 20 test cases",
    cover: "/workflows/ask-your-shop-mcp-rag/02-mcp-server.png",
    tools: ["n8n", "Model Context Protocol", "Claude Desktop", "Google Gemini", "PostgreSQL", "pgvector", "Google Sheets", "Docker"],
    status: "live",
    tag: "Practice client",
    context: `${PRACTICE_CLIENT} The product manuals are sample documents about made-up products.`,
    link: null,
    screenshots: [
      {
        "src": "/workflows/ask-your-shop-mcp-rag/01-claude-desktop.png",
        "alt": "Claude Desktop answering a question using the shop tool from the n8n MCP server",
        "title": "Claude Desktop using the shop tools",
        "description": [
          "The owner asks who is still waiting for a call back. Claude calls the find enquiries tool on the n8n MCP server and answers from the shop log. The names and phone numbers are made-up test data."
        ]
      },
      {
        "src": "/workflows/ask-your-shop-mcp-rag/02-mcp-server.png",
        "alt": "n8n canvas for the MCP Server Trigger with three tools",
        "title": "The MCP server in n8n",
        "description": [
          "One MCP Server Trigger with three tools attached. Each tool is a separate sub-workflow: find enquiries, search manuals and mark replied."
        ]
      },
      {
        "src": "/workflows/ask-your-shop-mcp-rag/03-chat-agent.png",
        "alt": "n8n canvas for the Gemini chat agent",
        "title": "The Gemini chat assistant",
        "description": [
          "A second client for the same tools: a chat trigger, an AI Agent with a Gemini model and chat memory, and an MCP Client tool that connects to the server above."
        ]
      }
    ],
  },
  {
    slug: "ai-enquiry-triage",
    title: "AI Enquiry Triage and Reply",
    description:
      "Gemini reads each bike-shop enquiry: urgent ones alert the owner's phone at once, and price questions get answers copied from the shop's own price sheet.",
    overview: [
      "A customer fills in the enquiry form. A rule sends messages with links to a spam tab, so spam never reaches the AI. Gemini reads each real message and answers with one word: urgent, unsure, question or other. Every enquiry is logged to Google Sheets with its route before any email is sent.",
      "Urgent and unsure enquiries email the owner a short subject line written for a phone lock screen, plus the customer's number. The customer is told when the shop will ring, based on opening hours. For a question, the AI only chooses which line of the price sheet answers it, and the customer gets that line word for word, so the AI cannot invent a price.",
      "The AI steps live in a sub-workflow, so a separate test set runs the same prompts against 12 tricky enquiries, including one that tries to trick the AI. All 12 pass. If Gemini fails, the enquiry is treated as unsure and the owner is still alerted."
    ],
    flow: ["Form", "Spam rule", "Gemini classify", "Log to sheet", "Router", "Gmail"],
    result: "Passes all 12 tricky test enquiries",
    tools: ["n8n", "Google Gemini", "Google Sheets", "Gmail"],
    status: "live",
    tag: "Practice client",
    context: PRACTICE_CLIENT,
    link: null,
    screenshots: [
      {
        "src": "/workflows/ai-enquiry-triage/01-canvas.png",
        "alt": "n8n canvas for the AI Enquiry Triage workflow",
        "title": "The full workflow in n8n",
        "description": [
          "The live workflow: form, spam rule, the AI step, the log, then a router that sends each enquiry to an alert, a sheet answer or the standard reply. The lower branches show the fallbacks when the AI or the sheet fails."
        ]
      },
      {
        "src": "/workflows/ai-enquiry-triage/02-ai-steps.png",
        "alt": "n8n canvas for the AI sub-workflow with three Gemini nodes",
        "title": "The AI steps",
        "description": [
          "The AI sub-workflow. Gemini chooses a route, a Code node checks the answer is one of four allowed words, and a router sends it on. Urgent enquiries get a short summary for the owner. Questions get a line chosen from the price sheet."
        ]
      },
      {
        "src": "/workflows/ai-enquiry-triage/03-route-prompt.png",
        "alt": "Gemini node settings showing the routing prompt",
        "title": "How the AI chooses a route",
        "description": [
          "The system message gives Gemini one job: answer with exactly one of four words, each with a meaning. The customer message is passed in quote marks, and Gemini is told never to follow instructions inside it. Temperature is 0, so the same message gets the same answer."
        ]
      },
      {
        "src": "/workflows/ai-enquiry-triage/04-test-set.png",
        "alt": "n8n test set workflow after a successful run of 12 cases",
        "title": "The test set",
        "description": [
          "A separate workflow runs 12 tricky enquiries through the same AI sub-workflow, one at a time with a pause for the free Gemini rate limit, and scores the results. All 12 pass."
        ]
      }
    ],
  },
  {
    slug: "hale-cycles-enquiry-intake",
    title: "Enquiry Intake and Auto-Reply",
    description:
      "Website enquiries for a small bike shop: every enquiry is saved to a sheet and answered by email within seconds, with spam kept apart and alerts on failure.",
    overview: [
      "A customer fills in the shop's enquiry form. An If node checks the message for a link, because bots post links. Messages with a link go to a separate Check pile tab in Google Sheets, so nothing is deleted. Real enquiries are saved to the Enquiries tab, and then Gmail sends the customer a reply that names what they asked about.",
      "The sheet row is written before the email is sent, so a customer is never told \"we've got it\" when the shop has no record. If any live run fails, a separate error workflow emails the owner with a link to the failed run."
    ],
    flow: ["Form", "Spam check", "Google Sheets", "Gmail reply", "Error alert"],
    result: "Every enquiry is saved before the reply goes out",
    tools: ["n8n", "Google Sheets", "Gmail"],
    status: "live",
    tag: "Practice client",
    context: PRACTICE_CLIENT,
    link: null,
    screenshots: [
      {
        "src": "/workflows/hale-cycles-enquiry-intake/01-canvas.png",
        "alt": "n8n canvas for the Enquiry Intake and Auto-Reply workflow",
        "title": "The full workflow in n8n",
        "description": [
          "Left to right: the enquiry form, the spam check, then two Google Sheets branches. Messages with a link go to the Check pile tab. Real enquiries are saved and then answered by Gmail."
        ]
      },
      {
        "src": "/workflows/hale-cycles-enquiry-intake/02-error-alert.png",
        "alt": "n8n canvas for the error alert workflow",
        "title": "The error alert",
        "description": [
          "A separate two-node workflow. When any live run of the main workflow fails, the Error Trigger starts it and Gmail emails the shop owner a link to the failed run."
        ]
      }
    ],
  },
];

/** What kinds of work I automate — shown as the top row of the section. */
export const automationServices = [
  {
    title: "Lead capture & CRM sync",
    description: "Forms, scrapers and inboxes feeding one clean list, deduplicated and enriched.",
    icon: "users",
  },
  {
    title: "Inbox & support triage",
    description: "AI sorts, tags and drafts replies so people only touch what needs a human.",
    icon: "mail",
  },
  {
    title: "Content pipelines",
    description: "Draft, review and publish loops with an approval step before anything goes live.",
    icon: "file",
  },
  {
    title: "Reports & data sync",
    description: "Scheduled jobs that move data between apps and send the summary where the team reads it.",
    icon: "chart",
  },
] as const;

/** How I build an automation, start to finish. */
export const automationProcess = [
  { title: "Map the process", description: "Write down the manual steps, inputs, and who owns each one." },
  { title: "Pick the trigger", description: "Webhook, schedule, new email or form — whatever starts the work." },
  { title: "Add AI & logic", description: "LLM steps for messy text, plus branches, retries and error alerts." },
  { title: "Test & hand off", description: "Run real samples, monitor the first week, document how it works." },
];

export const automationTools = [
  "n8n (self-hosted)",
  "Google Gemini",
  "Claude",
  "MCP",
  "RAG / pgvector",
  "Google Sheets",
  "Gmail",
  "Telegram",
  "Webhooks",
  "REST APIs",
  "OAuth 2.0",
  "Zapier",
  "Make",
];
