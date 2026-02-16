import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
    <section ref={sectionRef} className="py-28 lg:py-40 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-card" style={{ opacity: backgroundOpacity }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* Why HOX header */}
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

          {/* Capabilities columns */}
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

          {/* CTA — integrated, not a separate section */}
          <motion.div
            className="mt-24 lg:mt-32 pt-16 border-t border-border/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6">
              <HoverText>Ready to build something</HoverText>{' '}
              <span className="text-primary"><HoverText>exceptional?</HoverText></span>
            </h3>
            <p className="text-base text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Tell us what you need. We'll respond within 24 hours with a proposal, 3D concepts, and transparent pricing.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide text-white bg-primary rounded-sm hover:opacity-90 transition-opacity"
              >
                Talk to our team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://wa.me/971588950056?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20HOX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                or WhatsApp us →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
