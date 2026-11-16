"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { aiTools } from "@/data/aiTools";

type Category = "all" | "frontend" | "backend" | "automation" | "tools";

interface Skill {
  name: string;
  category: Exclude<Category, "all">;
  src: string | null;
}

const skills: Skill[] = [
  // Frontend
  { name: "HTML5",       category: "frontend",   src: "/html.png" },
  { name: "CSS3",        category: "frontend",   src: "/css.png" },
  { name: "JavaScript",  category: "frontend",   src: "/js.png" },
  { name: "Angular",     category: "frontend",   src: "/angular.png" },
  { name: "React",       category: "frontend",   src: "/react.png" },
  { name: "Vue.js",      category: "frontend",   src: null },
  // Backend
  { name: "Laravel",     category: "backend",    src: null },
  { name: "PHP",         category: "backend",    src: null },
  { name: "Node.js",     category: "backend",    src: "/node.png" },
  { name: "Python",      category: "backend",    src: "/python.png" },
  { name: "PostgreSQL",  category: "backend",    src: "/postgresql.png" },
  { name: "MySQL",       category: "backend",    src: "/mysql.png" },
  { name: "MongoDB",     category: "backend",    src: "/mongodb.png" },
  { name: "Firebase",    category: "backend",    src: null },
  { name: "Supabase",    category: "backend",    src: null },
  // AI & automation: the shared AI tools list (also shown in the hero), plus these
  ...[...aiTools.map((t) => t.name), "Zapier", "Make", "MCP", "RAG"].map(
    (name): Skill => ({ name, category: "automation", src: null }),
  ),
  // Tools
  { name: "Git",         category: "tools",      src: null },
  { name: "GitHub",      category: "tools",      src: null },
  { name: "Bitbucket",   category: "tools",      src: null },
  { name: "Docker",      category: "tools",      src: null },
  { name: "Vercel",      category: "tools",      src: null },
  { name: "Figma",       category: "tools",      src: null },
  { name: "WordPress",   category: "tools",      src: null },
  { name: "SEO",         category: "tools",      src: null },
];

const categoryLabel: Record<Exclude<Category, "all">, string> = {
  frontend:   "Frontend",
  backend:    "Backend",
  automation: "AI & Automation",
  tools:      "Tools",
};
const categories = Object.keys(categoryLabel) as Exclude<Category, "all">[];

const tabs: { id: Category; label: string; count: number }[] = [
  { id: "all", label: "All", count: skills.length },
  ...categories.map((id) => ({ id, label: categoryLabel[id], count: skills.filter((s) => s.category === id).length })),
];

const categoryAccent: Record<Exclude<Category, "all">, string> = {
  frontend:   "#1e90ff",
  backend:    "#10b981",
  automation: "#f59e0b",
  tools:      "#a855f7",
};

const categoryBg: Record<Exclude<Category, "all">, string> = {
  frontend:   "rgba(30,144,255,0.08)",
  backend:    "rgba(16,185,129,0.08)",
  automation: "rgba(245,158,11,0.08)",
  tools:      "rgba(168,85,247,0.08)",
};

// Letter icon fallback when no image
function LetterIcon({ name, category }: { name: string; category: Exclude<Category, "all"> }) {
  return (
    <div
      style={{ background: categoryBg[category], border: `1px solid ${categoryAccent[category]}30` }}
      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
    >
      <span style={{ color: categoryAccent[category] }}>{name.slice(0, 2)}</span>
    </div>
  );
}

export default function TechStack() {
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? skills : skills.filter(s => s.category === active);

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="flex flex-wrap items-center gap-1 mb-6">
        {tabs.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`relative flex-shrink-0 px-3 sm:px-4 py-2 sm:py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              active === id
                ? "text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            {active === id && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-[#1e90ff]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {label}
              <span className={`hidden min-[400px]:inline text-[10px] px-1.5 py-0.5 rounded-full ${
                active === id
                  ? "bg-white/20 text-white"
                  : "bg-[var(--surface-2)] text-[var(--text-muted)]"
              }`}>
                {count}
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Skill grid */}
      <motion.div layout className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.2 }}
              className="group relative bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 sm:gap-2.5 cursor-default overflow-hidden"
              style={{ "--cat-color": categoryAccent[skill.category] } as React.CSSProperties}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${categoryBg[skill.category]} 0%, transparent 70%)` }}
              />
              {/* Top accent line */}
              <div
                className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${categoryAccent[skill.category]}, transparent)` }}
              />

              {/* Logo or letter */}
              {skill.src ? (
                <div className="w-10 h-10 flex items-center justify-center relative z-10">
                  <Image src={skill.src} alt={skill.name} width={40} height={40} className="object-contain" />
                </div>
              ) : (
                <div className="relative z-10">
                  <LetterIcon name={skill.name} category={skill.category} />
                </div>
              )}

              {/* Name */}
              <p className="text-xs font-medium text-[var(--text-primary)] text-center leading-tight relative z-10">
                {skill.name}
              </p>

              {/* Category badge (visible on hover) */}
              <div
                className="absolute top-2 right-2 text-[8px] px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity capitalize font-medium"
                style={{ background: categoryBg[skill.category], color: categoryAccent[skill.category] }}
              >
                {skill.category}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
        {categories.map(cat => (
          <div key={cat} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: categoryAccent[cat] }} />
            <span className="text-[11px] text-[var(--text-muted)]">{categoryLabel[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
