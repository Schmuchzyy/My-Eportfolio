"use client";

import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ExternalLink, Globe, SearchCheck, Workflow } from "lucide-react";
import { projects, type ProjectIcon } from "@/data/projects";
import { openWorkflow, workflowHref } from "@/lib/workflowPanel";

const icons: Record<ProjectIcon, React.ElementType> = {
  workflow: Workflow,
  search: SearchCheck,
  globe: Globe,
};

export default function Projects() {
  return (
    <section id="Projects" className="section">
      <SectionHeader title="Projects Showcase" subtitle="A selection of my recent work and personal projects" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full">
        {projects.map(({ title, kind, period, description, tags, image, imageFit = "contain", icon = "globe", workflow, link }, i) => {
          const Icon = icons[icon];
          return (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group flex flex-col bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[#1e90ff]/40 transition-colors"
            >
              {/* Image, or an icon tile when there's no screenshot */}
              <div className="relative h-36 sm:h-44 bg-[var(--surface-2)] overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className={`transition-transform duration-300 group-hover:scale-105 ${
                      imageFit === "cover" ? "object-cover" : "object-contain p-6"
                    }`}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1e90ff]/5">
                    <div className="w-16 h-16 rounded-2xl bg-[#1e90ff]/10 border border-[#1e90ff]/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <Icon size={30} className="text-[#1e90ff]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-5">
                <p className="text-[11px] text-[var(--text-muted)]">
                  {kind}
                  {period && <span className="font-mono"> · {period}</span>}
                </p>
                <h3 className="font-semibold text-[var(--text-primary)] leading-snug mt-1 mb-1.5">{title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-3">{description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {(workflow || link) && (
                  <div className="mt-auto pt-4">
                    {workflow ? (
                      <a
                        href={workflowHref(workflow)}
                        onClick={(e) => {
                          e.preventDefault();
                          openWorkflow(workflow);
                        }}
                        className="inline-flex items-center gap-1 py-1 text-[#1e90ff] text-sm font-medium hover:underline"
                      >
                        See the workflow <ArrowRight size={14} />
                      </a>
                    ) : (
                      <a
                        href={link!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 py-1 text-[#1e90ff] text-sm font-medium hover:underline"
                      >
                        View project <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
