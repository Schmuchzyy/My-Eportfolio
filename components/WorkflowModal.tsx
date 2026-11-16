"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CircleCheck, ExternalLink, ImageOff, Info, X } from "lucide-react";
import type { Automation, AutomationStatus, WorkflowScreenshot } from "@/data/automations";

export const statusStyle: Record<AutomationStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/25" },
  "in-progress": { label: "In progress", className: "bg-amber-500/10 text-amber-500 border-amber-500/25" },
  concept: { label: "Concept", className: "bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border-color)]" },
};

interface Props {
  workflow: Automation | null;
  onClose: () => void;
}

/**
 * Detail panel for one workflow: title header, screenshot viewer with a
 * description of each screenshot, then the overview, steps and tools. Full-screen on phones,
 * a centered window on larger screens.
 */
export default function WorkflowModal({ workflow, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes, the page behind doesn't scroll, focus moves in and back out.
  useEffect(() => {
    if (!workflow) return;
    const returnFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocus?.focus({ preventScroll: true });
    };
  }, [workflow, onClose]);

  return (
    <AnimatePresence>
      {workflow && (
        <motion.div
          key="workflow-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="workflow-title"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 48, opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-4xl h-[100svh] sm:h-auto sm:max-h-[90vh] flex flex-col bg-[var(--background)] sm:border border-[var(--border-color)] sm:rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <header className="flex items-start justify-between gap-3 px-4 sm:px-6 pb-3 sm:pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-4 border-b border-[var(--border-color)] bg-[var(--surface)]">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusStyle[workflow.status].className}`}>
                    {statusStyle[workflow.status].label}
                  </span>
                  {workflow.tag && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border-color)]">
                      {workflow.tag}
                    </span>
                  )}
                </div>
                <h2 id="workflow-title" className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1.5 leading-snug">
                  {workflow.title}
                </h2>
                {workflow.context && (
                  <p className="flex items-start gap-1.5 mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                    <Info size={13} className="flex-shrink-0 mt-px" aria-hidden />
                    {workflow.context}
                  </p>
                )}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-colors"
              >
                <X size={20} />
              </button>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {workflow.screenshots.length > 0 ? (
                <ScreenshotViewer key={workflow.slug} shots={workflow.screenshots} />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 aspect-video rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-muted)] text-sm">
                  <ImageOff size={22} />
                  Screenshots coming soon
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_220px] gap-6 md:gap-8 mt-6 pt-6 border-t border-[var(--border-color)]">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Overview</h3>
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
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Steps</h3>
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
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">Tools</h3>
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Screenshot viewer: swipe/arrows/thumbnails + per-screenshot description ─ */

const slide = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

function ScreenshotViewer({ shots }: { shots: WorkflowScreenshot[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const shot = shots[index];
  const many = shots.length > 1;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + shots.length) % shots.length);
    },
    [shots.length],
  );

  const goTo = (i: number) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Left/right arrow keys flip screenshots while the panel is open
  useEffect(() => {
    if (!many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, many]);

  return (
    <div>
      <div className="relative rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--surface-2)]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 || info.velocity.x < -400) go(1);
              else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
            }}
            className="relative touch-pan-y"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1600}
              height={900}
              sizes="(min-width: 896px) 832px, 100vw"
              unoptimized={shot.src.endsWith(".svg")}
              draggable={false}
              className="w-full h-auto select-none pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {many && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 text-white backdrop-blur flex items-center justify-center hover:bg-black/75 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 text-white backdrop-blur flex items-center justify-center hover:bg-black/75 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full bg-black/55 text-white text-[11px] backdrop-blur" aria-live="polite">
              {index + 1} / {shots.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 [scrollbar-width:none]">
          {shots.map((s, i) => (
            <button
              key={s.src + i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative flex-shrink-0 w-20 sm:w-24 aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                i === index ? "border-[#1e90ff]" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={s.src} alt="" fill sizes="96px" unoptimized={s.src.endsWith(".svg")} className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* What this screenshot shows */}
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-4"
      >
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          {many && <span className="text-[#1e90ff] mr-1.5">{index + 1}.</span>}
          {shot.title}
        </h3>
        <div className="mt-1.5 flex flex-col gap-2">
          {shot.description.map((p) => (
            <p key={p} className="text-sm leading-relaxed text-[var(--text-muted)]">{p}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
