"use client";

import { CircleCheck, ExternalLink } from "lucide-react";
import type { Automation, AutomationStatus } from "@/data/automations";
import DetailPanel, { Badge, PanelHeading, Screenshots, neutralBadge, liveBadge } from "@/components/DetailPanel";

export const statusStyle: Record<AutomationStatus, { label: string; className: string }> = {
  live: { label: "Live", className: liveBadge },
  "in-progress": { label: "In progress", className: "bg-amber-500/10 text-amber-500 border-amber-500/25" },
  concept: { label: "Concept", className: neutralBadge },
};

interface Props {
  workflow: Automation | null;
  onClose: () => void;
}

/** Detail panel for one workflow: screenshots, then the overview, steps and tools. */
export default function WorkflowModal({ workflow, onClose }: Props) {
  return (
    <DetailPanel
      itemKey={workflow?.slug ?? null}
      onClose={onClose}
      title={workflow?.title}
      context={workflow?.context}
      badges={
        workflow && (
          <>
            <Badge className={statusStyle[workflow.status].className}>{statusStyle[workflow.status].label}</Badge>
            {workflow.tag && <Badge className={neutralBadge}>{workflow.tag}</Badge>}
          </>
        )
      }
    >
      {workflow && (
        <>
          <Screenshots key={workflow.slug} shots={workflow.screenshots} />

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px] gap-6 md:gap-8 mt-6 pt-6 border-t border-[var(--border-color)]">
            <div>
              <PanelHeading>Overview</PanelHeading>
              <div className="mt-2 flex flex-col gap-3">
                {workflow.overview.map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-[var(--text-muted)]">{p}</p>
                ))}
              </div>
              {workflow.result && (
                <p className="flex items-center gap-1.5 mt-4 text-sm font-medium text-emerald-500">
                  <CircleCheck size={15} /> {workflow.result}
                </p>
              )}
            </div>

            <aside className="flex flex-col gap-5">
              <div>
                <PanelHeading>Steps</PanelHeading>
                <ol className="mt-2 flex flex-col gap-1.5">
                  {workflow.flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                      <span className="flex-shrink-0 w-5 h-5 rounded-md bg-[var(--surface-2)] border border-[var(--border-color)] text-[10px] font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <PanelHeading>Tools</PanelHeading>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {workflow.tools.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {workflow.link && (
                <a
                  href={workflow.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1e90ff] text-white text-sm font-medium hover:bg-[#1a7ae0] transition-colors"
                >
                  View workflow <ExternalLink size={14} />
                </a>
              )}
            </aside>
          </div>
        </>
      )}
    </DetailPanel>
  );
}
