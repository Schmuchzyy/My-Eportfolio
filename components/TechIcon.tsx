/*
 * One-colour logos for the tech stack. Brand logos come from Simple Icons
 * (CC0). Tools it doesn't have get a plain Lucide icon, and Nod a hand-drawn
 * ring and dot. Everything draws in `currentColor`, so it follows the theme.
 */
import {
  siAngular, siBitbucket, siClaude, siCss, siCursor, siDocker, siFigma, siFirebase, siGit,
  siGithub, siGithubcopilot, siHtml5, siJavascript, siLaravel, siMake, siModelcontextprotocol,
  siMongodb, siMysql, siN8n, siNodedotjs, siOllama, siPhp, siPostgresql, siPython, siReact,
  siReplit, siSupabase, siVercel, siVuedotjs, siWordpress, siZapier,
  siElectron, siGooglegemini, siMapbox, siNextdotjs, siPandas, siPwa, siStreamlit, siTailwindcss,
  siTypescript, siVite,
} from "simple-icons";
import { Brain, DatabaseZap, Heart, SearchCheck, SquareTerminal, type LucideIcon } from "lucide-react";

type Icon = { path: string } | LucideIcon | "nod";

const icons: Record<string, Icon> = {
  // Frontend
  HTML5: siHtml5,
  CSS3: siCss,
  JavaScript: siJavascript,
  Angular: siAngular,
  React: siReact,
  "Vue.js": siVuedotjs,
  // Backend
  Laravel: siLaravel,
  PHP: siPhp,
  "Node.js": siNodedotjs,
  Python: siPython,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  Supabase: siSupabase,
  // AI & automation
  "Claude Code": siClaude,
  "OpenAI Codex": SquareTerminal,
  "GitHub Copilot": siGithubcopilot,
  Cursor: siCursor,
  Lovable: Heart,
  Replit: siReplit,
  n8n: siN8n,
  Nod: "nod",
  Ollama: siOllama,
  Hermes: Brain,
  Zapier: siZapier,
  Make: siMake,
  MCP: siModelcontextprotocol,
  RAG: DatabaseZap,
  // Tools
  Git: siGit,
  GitHub: siGithub,
  Bitbucket: siBitbucket,
  Docker: siDocker,
  Vercel: siVercel,
  Figma: siFigma,
  WordPress: siWordpress,
  SEO: SearchCheck,
  // Extra names used in project tags
  TypeScript: siTypescript,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  Vite: siVite,
  Electron: siElectron,
  Streamlit: siStreamlit,
  pandas: siPandas,
  "Gemini API": siGooglegemini,
  "Claude API": siClaude,
  Mapbox: siMapbox,
  PWA: siPwa,
};

/** True when `name` has a real brand logo (not a generic icon or letters). */
export const hasBrandLogo = (name: string) => {
  const icon = icons[name];
  return icon === "nod" || (typeof icon === "object" && "path" in icon);
};

export default function TechIcon({ name, size = 28 }: { name: string; size?: number }) {
  const icon = icons[name];

  if (!icon) {
    return (
      <span style={{ width: size, height: size }} className="flex items-center justify-center text-sm font-bold">
        {name.slice(0, 2)}
      </span>
    );
  }
  if (icon === "nod") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="13" r="7.5" stroke="currentColor" strokeWidth="3" />
        <circle cx="18" cy="5.5" r="3" fill="currentColor" />
      </svg>
    );
  }
  if ("path" in icon) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d={icon.path} />
      </svg>
    );
  }
  const Lucide = icon;
  return <Lucide size={size} strokeWidth={1.75} aria-hidden />;
}
