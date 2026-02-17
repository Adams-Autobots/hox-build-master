import { motion } from 'framer-motion';

interface SectionLabelProps {
  children: React.ReactNode;
}

/**
 * DESIGN SYSTEM — Section Label
 * 
 * The red accent line + label text used at the top of every section.
 * ALL sections must use this component. No inline alternatives.
 * 
 * Specs:
 * - w-10 h-px red gradient line
 * - gap-3 between line and text
 * - text-sm font-medium tracking-wider text-primary
 * - mb-6 below (heading follows immediately)
 * - Slide-in animation from left
 */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <motion.span
      className="inline-flex items-center gap-3 text-sm font-medium tracking-wider text-primary mb-6 block"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="w-10 h-px bg-gradient-to-r from-primary to-transparent" />
      {children}
    </motion.span>
  );
}
