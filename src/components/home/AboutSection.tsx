import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AnimatedStatsCounter } from './AnimatedStatsCounter';
import { HoverText } from '@/components/ui/HoverText';
import { SectionLabel } from '@/components/ui/SectionLabel';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });
  const rawOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [0, 0.15, 1]);
  const backgroundOpacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 relative overflow-hidden">
      <motion.div className="absolute inset-0 bg-card" style={{ opacity: backgroundOpacity }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <SectionLabel>Who we are</SectionLabel>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <HoverText>Delivery</HoverText>{' '}
              <span className="text-primary"><HoverText>experts.</HoverText></span>
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              For 17+ years, HOX has partnered with leading developers, global brands,
              and ambitious creatives to deliver complex builds with speed, precision, and reliability.
            </motion.p>
          </div>

          <AnimatedStatsCounter />
        </div>
      </div>
    </section>
  );
}
