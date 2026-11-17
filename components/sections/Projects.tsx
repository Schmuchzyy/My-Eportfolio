"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Images,
  SearchCheck,
} from "lucide-react";
import { projects, type Project, type ProjectIcon } from "@/data/projects";
import { closeProject, openProject, switchProject, useOpenProjectSlug } from "@/lib/hashPanel";
import DetailPanel, { Badge, PanelHeading, Screenshots, liveBadge, neutralBadge } from "@/components/DetailPanel";
import TechIcon, { hasBrandLogo } from "@/components/TechIcon";

const devBadge = "bg-amber-500/10 text-amber-500 border-amber-500/25";

/** Grid cards shown before "Show all projects" (the featured card is extra). */
const GRID_LIMIT = 6;

const icons: Record<ProjectIcon, React.ElementType> = {
  search: SearchCheck,
  globe: Globe,
  code: Code2,
};

// Page order: the featured project first, then the rest as listed in data/projects.ts.
// The panel's previous/next buttons follow the same order.
const ordered = [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

export default function Projects() {
  const openSlug = useOpenProjectSlug();
  const openProjectData = projects.find((p) => p.slug === openSlug) ?? null;
  const [showAll, setShowAll] = useState(false);

  const featured = ordered[0]?.featured ? ordered[0] : null;
  const rest = featured ? ordered.slice(1) : ordered;
  const visible = showAll ? rest : rest.slice(0, GRID_LIMIT);
  const hidden = rest.length - GRID_LIMIT;

  return (
    <section id="Projects" className="section">
      <SectionHeader title="Projects Showcase" subtitle="Web apps and software I've designed and built" />

      <div className="max-w-5xl w-full flex flex-col gap-4 sm:gap-6">
        {featured && <FeaturedCard project={featured} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {hidden > 0 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="self-center inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--surface)] text-sm font-medium text-[var(--text-primary)] hover:border-[#1e90ff]/50 hover:text-[#1e90ff] transition-colors"
          >
            {showAll ? "Show fewer projects" : `Show all projects (${rest.length + (featured ? 1 : 0)})`}
            <ChevronDown size={16} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <ProjectModal project={openProjectData} onClose={closeProject} />
    </section>
  );
}

const cardClass =
  "group relative bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden cursor-pointer hover:border-[#1e90ff]/50 hover:-translate-y-0.5 transition-[border-color,translate] has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-[#1e90ff]";

/** Wide card at the top: cover on the left, full description on the right. */
function FeaturedCard({ project }: { project: Project }) {
  const { title, description } = project;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${cardClass} grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]`}
    >
      <Cover project={project} className="md:aspect-auto md:min-h-full md:border-b-0 md:border-r" />
      <div className="flex flex-col p-5 sm:p-7">
        <Meta project={project} featured />
        <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] leading-snug mt-1 mb-2">
          <OpenButton project={project}>{title}</OpenButton>
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{description}</p>
        <TechLogos project={project} />
        <CardFooter project={project} />
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { title, tagline } = project;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className={`${cardClass} flex flex-col`}
    >
      <Cover project={project} />
      <div className="flex flex-col flex-1 p-5">
        <Meta project={project} />
        <h3 className="font-semibold text-[var(--text-primary)] leading-snug mt-1 mb-1.5">
          <OpenButton project={project}>{title}</OpenButton>
        </h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">{tagline}</p>
        <TechLogos project={project} />
        <CardFooter project={project} />
      </div>
    </motion.article>
  );
}

/** The card's title. Its ::after covers the whole card, so a tap anywhere opens the panel. */
function OpenButton({ project, children }: { project: Project; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => openProject(project.slug)}
      aria-haspopup="dialog"
      className="text-left focus:outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']"
    >
      {children}
    </button>
  );
}

/** Cover screenshot, or an icon tile when there isn't one, with the status badge on top. */
function Cover({ project, className = "" }: { project: Project; className?: string }) {
  const { icon = "globe", link, status, screenshots } = project;
  const Icon = icons[icon];
  const cover = screenshots[0];
  return (
    <div className={`relative aspect-[16/9] bg-[var(--surface-2)] overflow-hidden border-b border-[var(--border-color)] ${className}`}>
      {cover ? (
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e90ff]/5">
          <div className="w-16 h-16 rounded-2xl bg-[#1e90ff]/10 border border-[#1e90ff]/25 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Icon size={30} className="text-[#1e90ff]" />
          </div>
        </div>
      )}
      {(status === "in-development" || link) && (
        <span className="absolute top-2 left-2">
          {status === "in-development" ? (
            <Badge className="bg-black/60 text-amber-400 border-amber-500/30 backdrop-blur">In development</Badge>
          ) : (
            <Badge className="bg-black/60 text-emerald-400 border-emerald-500/30 backdrop-blur">Live</Badge>
          )}
        </span>
      )}
    </div>
  );
}

function Meta({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <p className="text-[11px] text-[var(--text-muted)]">
      {featured && <span className="font-semibold text-[#1e90ff] uppercase tracking-wide mr-1.5">Featured</span>}
      {project.kind}
      {project.period && <span className="font-mono"> · {project.period}</span>}
    </p>
  );
}

/**
 * Logos for the stack, with "+N" for tags that have no brand logo. Sits above
 * the card-wide button so the logo tooltips work; a click still opens the panel.
 */
function TechLogos({ project }: { project: Project }) {
  const withLogo = project.tags.filter(hasBrandLogo);
  const others = project.tags.filter((t) => !hasBrandLogo(t));
  return (
    <ul
      aria-label="Built with"
      onClick={() => openProject(project.slug)}
      className="relative z-10 flex flex-wrap items-center gap-x-3 gap-y-2 self-start"
    >
      {withLogo.map((tag) => (
        <li
          key={tag}
          title={tag}
          className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors"
        >
          <TechIcon name={tag} size={18} />
          <span className="sr-only">{tag}</span>
        </li>
      ))}
      {others.length > 0 && (
        <li
          title={others.join(", ")}
          className="px-1.5 py-0.5 rounded-full text-[11px] leading-none text-[var(--text-muted)] border border-[var(--border-color)]"
        >
          +{others.length}
          <span className="sr-only">: {others.join(", ")}</span>
        </li>
      )}
    </ul>
  );
}

function CardFooter({ project }: { project: Project }) {
  const { title, link, repo, screenshots } = project;
  return (
    <div className="mt-auto pt-5 flex items-center justify-between gap-3">
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
            {project.status === "in-development" ? (
              <Badge className={devBadge}>In development</Badge>
            ) : (
              project.link && <Badge className={liveBadge}>Live</Badge>
            )}
            <Badge className={neutralBadge}>
              {project.kind}
              {project.period && ` · ${project.period}`}
            </Badge>
          </>
        )
      }
      footer={project && ordered.length > 1 && <ProjectNav slug={project.slug} />}
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
              {(project.link || project.repo || project.waitlist) && (
                <div className="flex flex-col gap-2">
                  {project.waitlist && (
                    <a
                      href={project.waitlist}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1e90ff] text-white text-sm font-medium hover:bg-[#1a7ae0] transition-colors"
                    >
                      Join waitlist <ExternalLink size={14} />
                    </a>
                  )}
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

/** Previous / next project, in page order, wrapping around at the ends. */
function ProjectNav({ slug }: { slug: string }) {
  const n = ordered.length;
  const i = ordered.findIndex((p) => p.slug === slug);
  const prev = ordered[(i - 1 + n) % n];
  const next = ordered[(i + 1) % n];
  const btn =
    "flex items-center gap-2 min-w-0 max-w-[44%] px-2 py-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors";

  return (
    <nav aria-label="Other projects" className="flex items-center justify-between gap-2">
      <button type="button" onClick={() => switchProject(prev.slug)} className={`${btn} text-left`}>
        <ChevronLeft size={18} className="flex-shrink-0" />
        <span className="min-w-0">
          <span className="block text-[10px] uppercase tracking-wide">Previous</span>
          <span className="block truncate text-sm font-medium text-[var(--text-primary)]">{prev.title}</span>
        </span>
      </button>
      <span className="text-xs text-[var(--text-muted)] tabular-nums" aria-live="polite">
        {i + 1} / {n}
      </span>
      <button type="button" onClick={() => switchProject(next.slug)} className={`${btn} justify-end text-right`}>
        <span className="min-w-0">
          <span className="block text-[10px] uppercase tracking-wide">Next</span>
          <span className="block truncate text-sm font-medium text-[var(--text-primary)]">{next.title}</span>
        </span>
        <ChevronRight size={18} className="flex-shrink-0" />
      </button>
    </nav>
  );
}
