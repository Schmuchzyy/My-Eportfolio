"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Facebook, Linkedin, Github, MapPin, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { certificates } from "@/data/certificates";
import { projects } from "@/data/projects";
import { automations } from "@/data/automations";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/timothy.sean.463987/", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sean-anunciacion-353765329", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/Schmuchzyy", icon: Github },
];

// Counted from the data files, so the numbers always match what the page shows
const stats = [
  { label: "Years Learning", value: "4+" },
  { label: "Projects", value: String(projects.length) },
  { label: "n8n Workflows", value: String(automations.length) },
  { label: "Certifications", value: String(certificates.length) },
];

const highlights = [
  { icon: MapPin, text: "Angeles City, Pampanga, Philippines" },
  { icon: GraduationCap, text: "BS Information Technology (Web Development) — Holy Angel University" },
  { icon: Briefcase, text: "Full Stack Developer · SaaS experience" },
  { icon: Sparkles, text: "Open to opportunities" },
];

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeader title="About Me" subtitle="Get to know more about me" />

      <div className="max-w-4xl w-full flex flex-col gap-4 sm:gap-6">
        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-6 md:gap-8 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-8"
        >
          {/* Photo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[#1e90ff]/40 shadow-lg shadow-[#1e90ff]/10">
              <Image
                src="/Grad_Me.jpg"
                alt="Sean Anunciacion"
                width={176}
                height={176}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Social icons under photo */}
            <div className="flex gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#1e90ff] hover:text-[#1e90ff] transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@snzgaoan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#1e90ff] hover:text-[#1e90ff] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-4 flex-1">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Sean Anunciacion</h2>
              <p className="text-[#1e90ff] font-medium text-sm mt-0.5">Agentic Engineer · Full Stack Developer · Workflow Automation Specialist</p>
            </div>

            <p className="text-[var(--text-muted)] leading-relaxed text-sm">
              I&apos;m a full-stack developer based in Angeles City, Philippines, with professional SaaS
              experience. As a Jr. Software Engineer at CRM Online Australia I built features for FieldMagic,
              a field service management platform, using Angular, Laravel and PostgreSQL. I studied
              BS Information Technology, specializing in Web Development, at Holy Angel University.
            </p>

            <p className="text-[var(--text-muted)] leading-relaxed text-sm">
              My focus now is workflow automation and AI-assisted development. I build n8n workflows,
              integrate APIs and language models, run my own self-hosted tools, and build MCP servers and
              RAG search so AI assistants can work safely with real business data.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Icon size={13} className="text-[#1e90ff] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <a
              href="/Sean-Anunciacion-Resume-v9.5.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center w-full sm:w-fit px-5 py-3 sm:py-2.5 rounded-full bg-[#1e90ff] text-white font-medium hover:bg-[#1a7ae0] transition-colors text-sm mt-1"
            >
              View My Resume
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {stats.map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 text-center hover:border-[#1e90ff]/40 transition-colors"
            >
              <p className="text-2xl font-bold text-[#1e90ff]">{value}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
