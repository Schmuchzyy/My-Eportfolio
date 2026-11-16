"use client";

import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Code2, ExternalLink, Github, Globe, Images, SearchCheck } from "lucide-react";
import { projects, type Project, type ProjectIcon } from "@/data/projects";
import { closeProject, openProject, useOpenProjectSlug } from "@/lib/hashPanel";
import DetailPanel, { Badge, PanelHeading, Screenshots, liveBadge, neutralBadge } from "@/components/DetailPanel";

const icons: Record<ProjectIcon, React.ElementType> = {
  search: SearchCheck,
  globe: Globe,
  code: Code2,
};

export default function Projects() {
  const openSlug = useOpenProjectSlug();
  const openProjectData = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="Projects" className="section">
      <SectionHeader title="Projects Showcase" subtitle="Web apps and software I've designed and built" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <ProjectModal project={openProjectData} onClose={closeProject} />
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { slug, title, kind, period, description, tags, icon = "globe", link, repo, screenshots } = project;
  const Icon = icons[icon];
  const cover = screenshots[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden cursor-pointer hover:border-[#1e90ff]/50 hover:-translate-y-0.5 transition-[border-color,translate] has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-[#1e90ff]"
    >
      {/* Cover screenshot, or an icon tile when there isn't one */}
      <div className="relative aspect-[16/10] bg-[var(--surface-2)] overflow-hidden border-b border-[var(--border-color)]">
        {cover ? (
          <Image
            src={cover.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e90ff]/5">
            <div className="w-16 h-16 rounded-2xl bg-[#1e90ff]/10 border border-[#1e90ff]/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Icon size={30} className="text-[#1e90ff]" />
            </div>
          </div>
        )}
        {link && (
          <span className="absolute top-2 left-2">
            <Badge className="bg-black/60 text-emerald-400 border-emerald-500/30 backdrop-blur">Live</Badge>
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-[11px] text-[var(--text-muted)]">
          {kind}
          {period && <span className="font-mono"> · {period}</span>}
        </p>
        <h3 className="font-semibold text-[var(--text-primary)] leading-snug mt-1 mb-1.5">
          {/* The ::after covers the whole card, so a tap anywhere opens the panel */}
          <button
            type="button"
            onClick={() => openProject(slug)}
            aria-haspopup="dialog"
            className="text-left focus:outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          >
            {title}
          </button>
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-3">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-[#1e90ff] text-sm font-medium">
            View details
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="flex items-center gap-3">
            {/* Above the card-wide button, so these stay their own links */}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit the ${title} site`}
                className="relative z-10 p-1 -m-1 text-[var(--text-muted)] hover:text-[#1e90ff] transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source code on GitHub`}
                className="relative z-10 p-1 -m-1 text-[var(--text-muted)] hover:text-[#1e90ff] transition-colors"
              >
                <Github size={15} />
              </a>
            )}
            {screenshots.length > 0 && (
              <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Images size={13} /> {screenshots.length}
              </span>
            )}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/** Detail panel for one project: screenshots, overview, what I built, stack and links. */
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <DetailPanel
      itemKey={project?.slug ?? null}
      onClose={onClose}
      title={project?.title}
      context={project?.context}
      badges={
        project && (
          <>
            {project.link && <Badge className={liveBadge}>Live</Badge>}
            <Badge className={neutralBadge}>
              {project.kind}
              {project.period && ` · ${project.period}`}
            </Badge>
          </>
        )
      }
    >
      {project && (
        <>
          <Screenshots key={project.slug} shots={project.screenshots} />

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px] gap-6 md:gap-8 mt-6 pt-6 border-t border-[var(--border-color)]">
            <div className="flex flex-col gap-6">
              <div>
                <PanelHeading>Overview</PanelHeading>
                <div className="mt-2 flex flex-col gap-3">
                  {project.overview.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-[var(--text-muted)]">{p}</p>
                  ))}
                </div>
              </div>
              {project.highlights.length > 0 && (
                <div>
                  <PanelHeading>What I built</PanelHeading>
                  <ul className="mt-2 flex flex-col gap-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-muted)]">
                        <span aria-hidden className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-[#1e90ff]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="flex flex-col gap-5">
              <div>
                <PanelHeading>Tech stack</PanelHeading>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-[#1e90ff]/10 text-[#1e90ff] border border-[#1e90ff]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {(project.link || project.repo) && (
                <div className="flex flex-col gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1e90ff] text-white text-sm font-medium hover:bg-[#1a7ae0] transition-colors"
                    >
                      Visit site <ExternalLink size={14} />
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium hover:border-[#1e90ff]/50 hover:text-[#1e90ff] transition-colors"
                    >
                      <Github size={14} /> View code
                    </a>
                  )}
                </div>
              )}
            </aside>
          </div>
        </>
      )}
    </DetailPanel>
  );
}
