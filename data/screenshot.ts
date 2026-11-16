/** One slide in a detail panel's screenshot viewer (workflows and projects). */
export interface Screenshot {
  src: string;
  alt: string;
  /** Short heading shown under the image, e.g. "The full workflow in n8n" */
  title: string;
  /** What this screenshot shows — one string per paragraph */
  description: string[];
}
