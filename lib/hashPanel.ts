/*
 * The open detail panel lives in the URL hash (#workflow-<slug>,
 * #project-<slug>), so the phone's Back button closes it and a link can open
 * a panel directly. Shared by the Workflow Automation and Projects sections.
 */
import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
};
const readHash = () => window.location.hash;
const readServerHash = () => "";

/** Slug of the panel open under `prefix` (e.g. "#project-"), or null. */
export function useHashSlug(prefix: string): string | null {
  const hash = useSyncExternalStore(subscribe, readHash, readServerHash);
  return hash.startsWith(prefix) ? decodeURIComponent(hash.slice(prefix.length)) : null;
}

export function openPanel(prefix: string, slug: string) {
  // Mark the entry as ours (keeping Next.js's own history state) so closing knows it can step back
  window.history.pushState({ ...window.history.state, detailPanel: true }, "", `${prefix}${slug}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function closePanel() {
  if (window.history.state?.detailPanel) {
    window.history.back();
  } else {
    // Arrived through a shared link: drop the hash without leaving the page
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

/* ── Workflows ── */
const WORKFLOW = "#workflow-";
export const useOpenWorkflowSlug = () => useHashSlug(WORKFLOW);
export const openWorkflow = (slug: string) => openPanel(WORKFLOW, slug);
export const closeWorkflow = closePanel;

/* ── Projects ── */
const PROJECT = "#project-";
export const useOpenProjectSlug = () => useHashSlug(PROJECT);
export const projectHref = (slug: string) => `${PROJECT}${slug}`;
export const openProject = (slug: string) => openPanel(PROJECT, slug);
export const closeProject = closePanel;
