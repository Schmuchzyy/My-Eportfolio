"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { aiTools } from "@/data/aiTools";

const roles = ["Agentic Engineer", "Full Stack Developer", "Workflow Automation Specialist", "AI Enthusiast"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];

    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      return () => clearTimeout(t);
    }

    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length === 0) {
      // short pause on the empty line, then start typing the next title
      const t = setTimeout(() => {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="Home"
      className="relative flex flex-col items-center justify-center text-center min-h-[100svh] px-4 sm:px-6 overflow-hidden pt-14 md:pt-0"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(600px,120vw)] h-[min(600px,120vw)] rounded-full bg-[#1e90ff]/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center gap-4 sm:gap-5 w-full"
      >
        <p className="text-[var(--text-muted)] text-sm sm:text-lg tracking-widest uppercase">Hello, I am</p>

        <h1 className="text-[2.6rem] leading-[1.1] sm:text-6xl md:text-7xl font-bold tracking-tight">
          <span className="text-[var(--text-primary)]">Sean </span>
          <span className="text-[#1e90ff]">Anunciacion</span>
        </h1>

        {/* Typing animation */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-[var(--text-muted)] h-8" aria-label={roles.join(", ")}>
          <span className="text-[#1e90ff]">{displayed}</span>
          <span className="inline-block w-0.5 h-5 bg-[#1e90ff] ml-0.5 animate-pulse align-middle" />
        </h2>

        <div className="flex flex-col min-[400px]:flex-row gap-3 sm:gap-4 mt-4 w-full max-w-xs min-[400px]:w-auto min-[400px]:max-w-none">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-full text-center bg-[#1e90ff] text-white font-medium hover:bg-[#1a7ae0] transition-colors"
          >
            About Me
          </a>
          <a
            href="#Projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-full text-center border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#1e90ff] hover:text-[#1e90ff] transition-colors"
          >
            View Work
          </a>
        </div>

        {/* AI tools strip: scrolls slowly, pauses on hover, sits still for reduced-motion users */}
        <div className="mt-8 sm:mt-10 w-full max-w-2xl">
          <p className="text-[11px] tracking-widest uppercase text-[var(--text-muted)] mb-3">Building with</p>
          <div className="marquee overflow-hidden">
            <ul className="marquee-track flex w-max" aria-label="AI and agentic tools I build with">
              {[...aiTools, ...aiTools].map((tool, i) => (
                <li
                  key={`${tool.name}-${i}`}
                  aria-hidden={i >= aiTools.length || undefined}
                  title={tool.kind}
                  className="flex-shrink-0 mr-2 sm:mr-3 px-3 sm:px-3.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-xs sm:text-sm text-[var(--text-primary)] whitespace-nowrap"
                >
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-6 sm:bottom-8 hidden min-[400px]:flex flex-col items-center gap-1 text-[var(--text-muted)]"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#1e90ff] to-transparent" />
      </motion.div>
    </section>
  );
}
