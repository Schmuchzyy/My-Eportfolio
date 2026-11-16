/**
 * AI and agentic tools I build with. One list, used in two places:
 *  - the "Building with" strip in the hero
 *  - the "AI & Automation" tab of the tech stack
 * Add or remove a tool here and both update.
 */
export interface AiTool {
  name: string;
  /** Short description, shown as a tooltip */
  kind: string;
}

export const aiTools: AiTool[] = [
  { name: "Claude Code", kind: "AI coding agent" },
  { name: "OpenAI Codex", kind: "AI coding agent" },
  { name: "GitHub Copilot", kind: "AI pair programmer" },
  { name: "Cursor", kind: "AI code editor" },
  { name: "Lovable", kind: "AI app builder" },
  { name: "Replit", kind: "AI app builder" },
  { name: "n8n", kind: "Workflow automation" },
  { name: "Nod", kind: "Open-source personal agent" },
  { name: "Ollama", kind: "Local LLM runtime" },
  { name: "Hermes", kind: "Open-weight LLM" },
];
