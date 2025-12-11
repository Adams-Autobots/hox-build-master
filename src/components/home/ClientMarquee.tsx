import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const clients = [
  'expo 2020 dubai',
  'emaar',
  'dubai holding',
  'adnoc',
  'etihad airways',
  'du telecom',
  'majid al futtaim',
  'chalhoub group',
  'al tayer group',
  'noon',
  'carrefour',
  'vox cinemas',
];

export function ClientMarquee() {
  return (
    <section className="py-16 lg:py-24 bg-card overflow-hidden border-y border-border">
      <div className="container mx-auto px-6 lg:px-12 mb-12">
        <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-muted-foreground uppercase">
          <span className="w-8 h-px bg-muted-foreground" />
          trusted by industry leaders
        </span>
      </div>

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <motion.div
          className="flex gap-16"
          animate={{
            x: [0, -50 * clients.length * 16],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {/* Double the items for seamless loop */}
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={`${client}-${index}`}
              className={cn(
                'flex-shrink-0 group cursor-default',
                'transition-all duration-500'
              )}
            >
              <span
                className={cn(
                  'text-2xl md:text-3xl font-bold hox-brand whitespace-nowrap',
                  'text-muted-foreground/40 grayscale',
                  'group-hover:text-foreground group-hover:grayscale-0',
                  'transition-all duration-500'
                )}
              >
                {client}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
