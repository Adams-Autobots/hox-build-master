import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HoverText } from '@/components/ui/HoverText';

export function WhyHoxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [0, 0, 0.5, 1]);
  const backgroundOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="py-24 lg:py-36 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-card" style={{ opacity: backgroundOpacity }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          <motion.span
            className="inline-flex items-center gap-3 text-sm font-medium tracking-wider text-primary mb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
            Why hox
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <HoverText>We own the process.</HoverText>{' '}
            <span className="text-muted-foreground/50"><HoverText>Design. Fabrication. Logistics. Installation. When everything is under one roof, nothing falls through the cracks.</HoverText></span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-12 mt-16 pt-12 border-t border-border/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-foreground mb-3">In-house</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                25,000 sq ft workshop, CNC routing, large-format print, spray booth, carpentry, metalwork. We don't outsource the things that matter.
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
