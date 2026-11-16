"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, ExternalLink, X, ZoomIn } from "lucide-react";
import { certificates } from "@/data/certificates";

export default function Certificates() {
  const [selected, setSelected] = useState<number | null>(null);
  const cert = selected === null ? null : certificates[selected];

  // Close the lightbox with Escape and stop the page scrolling behind it
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="Certs" className="section">
      <SectionHeader title="Certificates" subtitle="Professional certifications and achievements" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full">
        {certificates.map(({ title, issuer, date, image, verifyUrl }, i) => (
          <motion.article
            key={image}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
            className="group flex flex-col bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[#1e90ff]/40 transition-colors"
          >
            <button
              type="button"
              onClick={() => setSelected(i)}
              aria-label={`View ${title} certificate`}
              className="relative aspect-[4/3] bg-[var(--surface-2)] overflow-hidden"
            >
              <Image
                src={image}
                alt={`${title} certificate from ${issuer}`}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn size={15} />
              </span>
            </button>

            <div className="flex items-end justify-between gap-3 p-4">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{title}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {issuer} · {date}
                </p>
              </div>
              {verifyUrl && (
                <a
                  href={verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${title} certificate`}
                  className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-[#1e90ff] bg-[#1e90ff]/10 border border-[#1e90ff]/20 hover:bg-[#1e90ff]/20 transition-colors"
                >
                  <BadgeCheck size={13} /> Verify
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {cert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${cert.title} certificate`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close certificate"
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:text-[#1e90ff] transition-colors"
              >
                <X size={24} />
              </button>
              <Image
                src={cert.image}
                alt={`${cert.title} certificate from ${cert.issuer}`}
                width={1500}
                height={1125}
                sizes="(min-width: 800px) 768px, 100vw"
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3 text-white">
                <p className="text-sm">
                  <span className="font-semibold">{cert.title}</span>
                  <span className="text-white/70"> · {cert.issuer} · {cert.date}</span>
                </p>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e90ff] text-white text-sm font-medium hover:bg-[#1a7ae0] transition-colors"
                  >
                    Verify certificate <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
