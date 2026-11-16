"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award, Briefcase, ArrowDown } from "lucide-react";
import TechStack from "@/components/sections/TechStack";
import SectionHeader from "@/components/SectionHeader";
import { certificates } from "@/data/certificates";

/* ─── Work Experience ─────────────────────────────────── */
const jobs = [
  {
    role: "Jr. Software Engineer",
    company: "CRM Online Australia Pty",
    period: "Sep 2025 – Jan 2026",
    type: "Full-time",
    logo: "/CrmAus.jpg",
    bullets: [
      "Contributed to FieldMagic, a field service management SaaS platform, building features for job scheduling, asset management, and client workflow optimization using Angular, Laravel, and PostgreSQL.",
      "Developed Angular-based UIs with responsive design across web and mobile, and managed a Docker Compose monorepo environment for service dependencies and staging deployments.",
      "Used Git via Bitbucket in an Agile startup environment: feature branches, peer code reviews, merge conflict resolution, and structured pull request workflows.",
      "Leveraged AI-assisted development tools to troubleshoot complex issues under tight deadlines.",
    ],
    tags: ["Angular", "TypeScript", "Laravel", "PostgreSQL", "Docker", "Bitbucket", "Agile"],
  },
  {
    role: "Intern Full-Stack Developer",
    company: "IT Squarehub",
    period: "Jul 2024 – Oct 2024",
    type: "Internship",
    logo: "/squarehub.png",
    link: "https://www.itsquarehub.com/",
    bullets: [
      "Revamped the UI of the company's Inventory System into a user-friendly, polished design aligned with brand guidelines.",
      "Owned the design structure and aesthetic, delivering a visually cohesive and intuitive application.",
      "Assumed QA responsibilities — testing the app, detecting bugs, and ensuring stable functionality before rollout.",
    ],
    tags: ["Vue.js", "HTML", "CSS", "Firebase", "QA Testing"],
  },
];


/* ─── Education ──────────────────────────────────────── */
const education = [
  {
    icon: GraduationCap,
    institution: "Holy Angel University",
    detail: "BS Information Technology, Web Development Specialization · GWA 1.86",
    period: "Jul 2021 – Apr 2025",
    logo: "/Hau.png",
    link: "https://www.hau.edu.ph/",
  },
];

// Certificates are shown in full in the Certificates section; here we only point to it
const certIssuers = Array.from(new Set(certificates.map((c) => c.issuer)));

export default function Experience() {
  return (
    <section id="Experience" className="section">
      {/* Header */}
      <SectionHeader title="Experience" subtitle="Where I've worked, what I've built, and what I know" />

      <div className="max-w-4xl w-full flex flex-col gap-10">

        {/* ── Professional Experience ── */}
        <div>
          <SectionLabel icon={Briefcase} label="Professional Experience" />
          <div className="flex flex-col gap-5 mt-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.company + job.period}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-6 hover:border-[#1e90ff]/40 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Company logo */}
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--surface-2)] border border-[var(--border-color)] flex items-center justify-center overflow-hidden p-1.5">
                    <Image src={job.logo} alt={job.company} width={40} height={40} className="object-contain" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Role + meta */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] leading-snug">{job.role}</h3>
                        {job.link ? (
                          <a href={job.link} target="_blank" rel="noopener noreferrer"
                            className="text-[#1e90ff] text-sm hover:underline">
                            {job.company}
                          </a>
                        ) : (
                          <p className="text-[#1e90ff] text-sm">{job.company}</p>
                        )}
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-shrink-0">
                        <span className="text-xs font-mono text-[var(--text-muted)]">{job.period}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="mt-3 flex flex-col gap-2 sm:gap-1.5 -ml-[52px] sm:ml-0">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-sm text-[var(--text-muted)] leading-relaxed">
                          <span className="text-[#1e90ff] mt-1 flex-shrink-0">▸</span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3 -ml-[52px] sm:ml-0">
                      {job.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border-color)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel icon={Briefcase} label="Tech Stack" />
          <div className="mt-4">
            <TechStack />
          </div>
        </motion.div>

        {/* ── Education (certificates live in their own section further down) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionLabel icon={GraduationCap} label="Education" />
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-3 sm:gap-4 mt-4">
            {education.map((e) => (
              <div
                key={e.institution}
                className="bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-[#1e90ff]/40 transition-colors"
              >
                <Image src={e.logo} alt={e.institution} width={56} height={56} className="object-contain w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0" />
                <div className="min-w-0">
                  <a href={e.link} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#1e90ff] hover:underline">
                    {e.institution}
                  </a>
                  <p className="text-xs text-[var(--text-primary)] mt-0.5">{e.detail}</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-mono mt-1">{e.period}</p>
                </div>
              </div>
            ))}

            {/* Pointer to the Certificates section */}
            <a
              href="#Certs"
              onClick={(ev) => {
                ev.preventDefault();
                document.getElementById("Certs")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 flex items-center gap-4 hover:border-[#1e90ff]/40 transition-colors"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-xl bg-[#1e90ff]/10 border border-[#1e90ff]/20 flex items-center justify-center">
                <Award size={24} className="text-[#1e90ff]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {certificates.length} certifications
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{certIssuers.join(" · ")}</p>
                <p className="inline-flex items-center gap-1 text-xs font-medium text-[#1e90ff] mt-1.5">
                  See certificates
                  <ArrowDown size={12} className="transition-transform group-hover:translate-y-0.5" />
                </p>
              </div>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

/* Small reusable section label */
function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <Icon size={15} className="text-[#1e90ff]" />
      <span className="text-sm font-semibold text-[var(--text-primary)]">{label}</span>
      <div className="flex-1 h-px bg-[var(--border-color)]" />
    </div>
  );
}
