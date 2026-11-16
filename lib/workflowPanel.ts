/*
 * The open workflow panel lives in the URL hash (#workflow-<slug>), so the
 * phone's Back button closes it and a link can open a workflow directly.
 * Shared by the Workflow Automation section and the Projects cards.
 */
import { useSyncExternalStore } from "react";

const HASH_PREFIX = "#workflow-";

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

/** Slug of the workflow whose panel is open, or null. */
export function useOpenWorkflowSlug(): string | null {
  const hash = useSyncExternalStore(subscribe, readHash, readServerHash);
  return hash.startsWith(HASH_PREFIX) ? decodeURIComponent(hash.slice(HASH_PREFIX.length)) : null;
}

export const workflowHref = (slug: string) => `${HASH_PREFIX}${slug}`;

export function openWorkflow(slug: string) {
  // Mark the entry as ours (keeping Next.js's own history state) so closing knows it can step back
  window.history.pushState({ ...window.history.state, workflowPanel: true }, "", workflowHref(slug));
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function closeWorkflow() {
  if (window.history.state?.workflowPanel) {
    window.history.back();
  } else {
    // Arrived through a shared link: drop the hash without leaving the page
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}
