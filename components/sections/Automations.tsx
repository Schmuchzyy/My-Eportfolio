"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  Images,
  Users,
  Mail,
  FileText,
  BarChart3,
  ArrowRight,
  ChevronDown,
  CircleCheck,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import WorkflowModal, { statusStyle } from "@/components/WorkflowModal";
import { closeWorkflow, openWorkflow, useOpenWorkflowSlug } from "@/lib/workflowPanel";
import {
  automations,
  automationServices,
  automationProcess,
  automationTools,
} from "@/data/automations";

const serviceIcons = {
  users: Users,
  mail: Mail,
  file: FileText,
  chart: BarChart3,
} as const;

/** "What I automate" cards (Lead capture, Inbox triage, ...). Hidden for now — set to true to bring them back. */
const SHOW_SERVICES = false;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay },
});

export default function Automations() {
  const openSlug = useOpenWorkflowSlug();
  const openWorkflowData = automations.find((a) => a.slug === openSlug) ?? null;

  return (
    <section id="Automations" className="section">
      <SectionHeader
        title="Workflow Automation"
        subtitle="I connect apps, APIs and AI models with n8n so repetitive work runs on its own — reliably, with a human in the loop where it matters."
        badge={{ label: "n8n · AI · APIs", icon: Workflow }}
      />

      <div className="max-w-5xl w-full flex flex-col gap-12 md:gap-16">
        {/* ── What I automate ── */}
        {SHOW_SERVICES && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {automationServices.map(({ title, description, icon }, i) => {
            const Icon = serviceIcons[icon];
            return (
              <motion.div
                key={title}
                {...fadeUp(i * 0.06)}
                className="flex sm:flex-col gap-4 sm:gap-3 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 hover:border-[#1e90ff]/40 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1e90ff]/10 border border-[#1e90ff]/20 flex items-center justify-center">
                  <Icon size={18} className="text-[#1e90ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[var(--text-primary)]">{title}</h3>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed mt-1">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
        )}

        {/* ── How I build ── */}
        <div>
          <SubLabel>How I build an automation</SubLabel>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-4 mt-5">
            {automationProcess.map(({ title, description }, i) => (
              <motion.li key={title} {...fadeUp(i * 0.08)} className="relative flex md:flex-col gap-4 md:gap-3 pb-6 md:pb-0">
                {/* connector: vertical on phones, horizontal on desktop */}
                {i < automationProcess.length - 1 && (
                  <>
                    <span aria-hidden className="md:hidden absolute left-4 top-9 bottom-0 w-px bg-[var(--border-color)]" />
                    <span aria-hidden className="hidden md:block absolute left-10 right-0 top-4 h-px bg-[var(--border-color)]" />
                  </>
                )}
                <span className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[var(--background)] border-2 border-[#1e90ff] text-[#1e90ff] text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="pt-1 md:pt-0 md:pr-4">
                  <h4 className="font-semibold text-sm text-[var(--text-primary)]">{title}</h4>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mt-1">{description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ── Workflows ── */}
        <div>
          <SubLabel>Workflows</SubLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-5">
            {automations.map(({ slug, title, description, flow, tools, status, tag, result, screenshots }, i) => (
              <motion.article
                key={slug}
                {...fadeUp(i * 0.1)}
                className="group relative flex flex-col bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6 cursor-pointer hover:border-[#1e90ff]/50 hover:-translate-y-0.5 transition-[border-color,translate] has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-[#1e90ff]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-semibold text-[var(--text-primary)] leading-snug">
                    {/* The ::after covers the whole card, so a tap anywhere opens the panel */}
                    <button
                      type="button"
                      onClick={() => openWorkflow(slug)}
                      aria-haspopup="dialog"
                      className="text-left focus:outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                    >
                      {title}
                    </button>
                  </h3>
                  <div className="flex-shrink-0 flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusStyle[status].className}`}>
                      {statusStyle[status].label}
                    </span>
                    {tag && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border-color)]">
                        {tag}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{description}</p>

                {/* Flow diagram: wraps on narrow screens */}
                <div className="mt-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border-color)] p-3">
                  <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2" aria-label="Workflow steps">
                    {flow.map((step, s) => (
                      <li key={step} className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-1 rounded-md text-[11px] font-medium border whitespace-nowrap ${
                            s === 0
                              ? "bg-[#1e90ff] text-white border-[#1e90ff]"
                              : "bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border-color)]"
                          }`}
                        >
                          {step}
                        </span>
                        {s < flow.length - 1 && <ArrowRight size={12} className="text-[var(--text-muted)]" aria-hidden />}
                      </li>
                    ))}
                  </ol>
                </div>

                {result && (
                  <p className="flex items-center gap-1.5 mt-3 text-sm font-medium text-emerald-500">
                    <CircleCheck size={14} /> {result}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-full text-xs bg-[var(--surface-2)] text-[var(--text-muted)] border border-[var(--border-color)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1 text-[#1e90ff] text-sm font-medium">
                    View details
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {screenshots.length > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Images size={13} /> {screenshots.length}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Tool stack + CTA ── */}
        <motion.div
          {...fadeUp()}
          className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8 bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-6"
        >
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-3">Tools I automate with</p>
            <div className="flex flex-wrap gap-1.5">
              {automationTools.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full text-xs bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <a
            href="#ContactMe"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("ContactMe")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1e90ff] text-white text-sm font-medium hover:bg-[#1a7ae0] transition-colors w-full md:w-auto whitespace-nowrap"
          >
            Automate a workflow with me <ChevronDown size={16} className="-rotate-90" />
          </a>
        </motion.div>
      </div>

      <WorkflowModal workflow={openWorkflowData} onClose={closeWorkflow} />
    </section>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">{children}</span>
      <div className="flex-1 h-px bg-[var(--border-color)]" />
    </div>
  );
}
