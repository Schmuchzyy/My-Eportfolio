"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xpwaeepd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="ContactMe" className="section">
      <SectionHeader title="Contact Me" subtitle="Let's work together — drop me a message" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border-color)] rounded-2xl p-5 sm:p-8 flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-[var(--text-primary)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#1e90ff] transition-colors text-base sm:text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-[var(--text-primary)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#1e90ff] transition-colors text-base sm:text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-[var(--text-primary)]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Special Message ♡"
            className="w-full px-4 py-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#1e90ff] transition-colors text-base sm:text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1e90ff] text-white font-medium hover:bg-[#1a7ae0] disabled:opacity-60 transition-colors"
        >
          {status === "sending" ? (
            "Sending..."
          ) : status === "sent" ? (
            "Message Sent!"
          ) : (
            <>
              Send Message <Send size={16} />
            </>
          )}
        </button>

        {status === "error" && (
          <p className="text-red-400 text-sm text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </motion.form>
    </section>
  );
}
