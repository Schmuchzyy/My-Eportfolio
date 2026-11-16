/**
 * Certificates, newest first. Used by the Certificates gallery and the
 * "Education & Certifications" cards in the Experience section.
 * Images live in public/. `verifyUrl` is the issuer's public verification page.
 */
export interface Certificate {
  title: string;
  issuer: string;
  /** Month and year earned, e.g. "Nov 2026" */
  date: string;
  image: string;
  verifyUrl?: string;
}

export const certificates: Certificate[] = [
  {
    title: "n8n Quickstart (QS101)",
    issuer: "n8n Academy",
    date: "Nov 2026",
    image: "/cert-n8n-quickstart.png",
    verifyUrl: "https://learn.n8n.io/certificates/c40e262475df468b9b1f5806650e39e6",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "Jun 2026",
    image: "/cert-claude-code-101.png",
    verifyUrl: "https://verify.skilljar.com/c/mmmoksgz8btn",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "Mar 2026",
    image: "/cert-claude-101.png",
    verifyUrl: "https://verify.skilljar.com/c/jtun7osx3ax6",
  },
  {
    title: "SEO II",
    issuer: "HubSpot Academy",
    date: "Nov 2023",
    image: "/seo-cert2.png",
  },
  {
    title: "SEO",
    issuer: "HubSpot Academy",
    date: "Nov 2023",
    image: "/seo-cert1.png",
  },
  {
    title: "Google Analytics",
    issuer: "Google",
    date: "Oct 2023",
    image: "/Anunciacion_Google_Cert.png",
  },
];
