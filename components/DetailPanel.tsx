"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff, Info, X } from "lucide-react";
import type { Screenshot } from "@/data/screenshot";

interface ShellProps {
  /** Unique per item, so switching items re-mounts the content */
  itemKey: string | null;
  onClose: () => void;
  /** Small pills above the title */
  badges?: React.ReactNode;
  title?: string;
  /** One-line background shown under the title */
  context?: string;
  children?: React.ReactNode;
  /** Pinned under the scrolling body, e.g. previous/next links */
  footer?: React.ReactNode;
}

/**
 * Focus-mode panel used by workflows and projects: title header, scrolling
 * body. Full-screen on phones, a centered window on larger screens.
 * Renders nothing while `itemKey` is null.
 */
export default function DetailPanel({ itemKey, onClose, badges, title, context, children, footer }: ShellProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = itemKey !== null;

  // Escape closes, the page behind doesn't scroll, focus moves in and back out.
  useEffect(() => {
    if (!open) return;
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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="detail-backdrop"
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
            aria-labelledby="detail-title"
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
                {badges && <div className="flex flex-wrap gap-1.5">{badges}</div>}
                <h2 id="detail-title" className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1.5 leading-snug">
                  {title}
                </h2>
                {context && (
                  <p className="flex items-start gap-1.5 mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                    <Info size={13} className="flex-shrink-0 mt-px" aria-hidden />
                    {context}
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

            {/* Body: keyed by item so switching items starts at the top */}
            <div
              key={itemKey}
              className={`flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pt-5 ${
                footer ? "pb-6" : "pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              }`}
            >
              {children}
            </div>

            {footer && (
              <footer className="border-t border-[var(--border-color)] bg-[var(--surface)] px-2 sm:px-4 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
                {footer}
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Small pill used in panel headers and cards. */
export function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap ${className}`}>{children}</span>
  );
}

export const neutralBadge = "bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border-color)]";
export const liveBadge = "bg-emerald-500/10 text-emerald-500 border-emerald-500/25";

/** Section heading inside the panel body. */
export function PanelHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-[var(--text-primary)]">{children}</h3>;
}

/* ─── Screenshot viewer: swipe/arrows/thumbnails + per-screenshot description ─ */

const slide = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

/** The viewer, or a "coming soon" placeholder when there are no screenshots. */
export function Screenshots({ shots }: { shots: Screenshot[] }) {
  if (shots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 aspect-video rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-muted)] text-sm">
        <ImageOff size={22} />
        Screenshots coming soon
      </div>
    );
  }
  return <ScreenshotViewer shots={shots} />;
}

function ScreenshotViewer({ shots }: { shots: Screenshot[] }) {
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
              className="w-full h-auto max-h-[65vh] object-contain select-none pointer-events-none"
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
