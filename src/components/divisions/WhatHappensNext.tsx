import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, FileText, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhatHappensNextProps {
  division: 'exhibitions' | 'events' | 'retail' | 'interiors';
}

const divisionColors = {
  exhibitions: 'hox-red',
  events: 'hox-blue',
  retail: 'hox-orange',
  interiors: 'hox-green',
};

const steps = [
  {
    icon: Phone,
    number: '01',
    title: 'You tell us what you need',
    description: 'Share your brief, timeline, and budget. Even a rough idea is a great starting point.',
  },
  {
    icon: FileText,
    number: '02',
    title: 'We send a proposal',
    description: 'Within 48 hours you receive 3D concepts, a detailed scope, and transparent pricing.',
  },
  {
    icon: Eye,
    number: '03',
    title: 'We bring it to life',
    description: 'In-house fabrication, on-site installation, and ongoing support until handover.',
  },
];

export function WhatHappensNext({ division }: WhatHappensNextProps) {
  const color = divisionColors[division];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
      {/* Subtle division colour glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-[0.04]"
        style={{ backgroundColor: `hsl(var(--${color}))` }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wider mb-4"
            style={{ color: `hsl(var(--${color}))` }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-12 h-px bg-gradient-to-r from-current to-transparent" />
            How it works
            <span className="w-12 h-px bg-gradient-to-r from-current to-transparent" />
          </motion.span>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What happens{' '}
            <span style={{ color: `hsl(var(--${color}))` }}>next?</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="text-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
              >
                {/* Connecting line between steps (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border/50" />
                )}

                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-border/50"
                  style={{ backgroundColor: `hsl(var(--${color}) / 0.08)` }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: `hsl(var(--${color}))` }}
                  />
                </div>
                <span
                  className="text-xs font-bold tracking-wider uppercase mb-2 block"
                  style={{ color: `hsl(var(--${color}) / 0.5)` }}
                >
                  Step {step.number}
                </span>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: `hsl(var(--${color}))` }}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            No commitment. Free consultation &amp; proposal.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
