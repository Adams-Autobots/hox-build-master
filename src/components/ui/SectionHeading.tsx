import { motion } from 'framer-motion';

interface SectionHeadingProps {
  children: React.ReactNode;
  /** 'page' for page hero headings (larger), 'section' for body sections */
  size?: 'page' | 'section';
  className?: string;
}

/**
 * DESIGN SYSTEM — Section Heading
 * 
 * Consistent heading used across all sections.
 * 
 * Two sizes:
 * - 'page':    text-4xl/5xl/6xl — used for page heroes (About, Contact, etc)
 * - 'section': text-3xl/4xl/5xl — used for body sections
 * 
 * Both use: font-bold leading-[1.1] mb-8
 * Animate: fade up on scroll
 */
export function SectionHeading({ children, size = 'section', className = '' }: SectionHeadingProps) {
  const sizeClass = size === 'page'
    ? 'text-4xl md:text-5xl lg:text-6xl'
    : 'text-3xl md:text-4xl lg:text-5xl';

  return (
    <motion.h2
      className={`${sizeClass} font-bold leading-[1.1] mb-8 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.h2>
  );
}
