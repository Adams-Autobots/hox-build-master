import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HoverText } from '@/components/ui/HoverText';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function WhyHoxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [0, 0, 0.5, 1]);
  const backgroundOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-card" style={{ opacity: backgroundOpacity }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <SectionLabel>Why hox</SectionLabel>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HoverText>We own the process.</HoverText>{' '}
            <span className="text-muted-foreground/50"><HoverText>Design. Fabrication. Logistics. Installation. When everything is under one roof, nothing falls through the cracks.</HoverText></span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-10 mt-12 pt-10 border-t border-border/20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-3">In-house</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                CNC routing, large-format print, spray booth, carpentry, metalwork — all under one roof. We don't outsource the things that matter.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-3">Accountable</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                One point of contact, one team, one set of standards. No finger-pointing between subcontractors. If it's on site, we built it.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-3">Proven</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                3,000+ projects across 17 years. National Geographic, Rolls-Royce, Mubadala, RTA. The work speaks for itself.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
