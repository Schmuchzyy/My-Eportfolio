"use client";

import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";

const timeline = [
  {
    date: "2025 - Present",
    title: "Workflow Automation & AI",
    description: "Building self-hosted n8n workflows, MCP servers and RAG search, and working with AI coding tools day to day.",
    badges: ["n8n", "MCP", "RAG", "Claude Code", "Gemini API"],
  },
  {
    date: "2024 - Present",
    title: "Full Stack Development",
    description: "Mastering end-to-end web development with modern frameworks and cloud technologies.",
    badges: ["React", "Node.js", "PostgreSQL", "Cloud Services"],
  },
  {
    date: "2023 - 2024",
    title: "Frontend Specialization",
    description: "Deep dive into modern frontend frameworks and responsive design principles.",
    badges: ["Angular", "JavaScript ES6+", "CSS3", "Responsive Design"],
  },
  {
    date: "2022 - 2023",
    title: "Backend Development",
    description: "Building robust server-side applications and working with databases.",
    badges: ["Python", "MongoDB", "MySQL", "REST APIs"],
  },
  {
    date: "2021 - 2022",
    title: "Programming Foundations",
    description: "Started my journey with web fundamentals and core programming concepts.",
    badges: ["HTML5", "CSS3", "JavaScript", "Git"],
  },
];

export default function SkillsTimeline() {
  return (
    <section id="Skills" className="section">
      <SectionHeader title="Skills Timeline" subtitle="My journey through technology and development" />

      <div className="relative max-w-2xl w-full">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border-color)]" />

        <div className="flex flex-col gap-6 sm:gap-10">
          {timeline.map(({ date, title, description, badges }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-11 sm:pl-12"
            >
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-[#1e90ff]/10 border-2 border-[#1e90ff] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#1e90ff]" />
              </div>

              <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 hover:border-[#1e90ff]/40 transition-colors">
                <span className="text-xs text-[#1e90ff] font-mono font-medium">{date}</span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-1">{title}</h3>
                <p className="text-[var(--text-muted)] text-sm mt-1">{description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {badges.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-1 rounded-full text-xs bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
