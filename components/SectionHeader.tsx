"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  badge?: { label: string; icon?: React.ElementType };
}

/** Shared section heading: sized down on phones, centered, fades in once. */
export default function SectionHeader({ title, subtitle, badge }: Props) {
  const BadgeIcon = badge?.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-10 md:mb-12 max-w-xl mx-auto"
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e90ff]/10 border border-[#1e90ff]/20 text-[#1e90ff] text-xs font-medium mb-4">
          {BadgeIcon && <BadgeIcon size={12} />}
          {badge.label}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-muted)] mt-2 text-sm sm:text-base text-pretty">{subtitle}</p>
      )}
    </motion.div>
  );
}
