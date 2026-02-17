import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { HoverText } from '@/components/ui/HoverText';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function ContactCTA() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-3xl">
          <SectionLabel>Start your project</SectionLabel>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HoverText>Ready to build something</HoverText>{' '}
            <span className="text-primary"><HoverText>exceptional?</HoverText></span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Tell us what you need. We'll respond within 24 hours with a proposal, 3D concepts, and transparent pricing.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
