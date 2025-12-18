import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const clients = [
  'Expo 2020 Dubai',
  'Emaar Properties',
  'Dubai Holding',
  'ADNOC',
  'Etihad Airways',
  'du Telecom',
  'Majid Al Futtaim',
  'Chalhoub Group',
  'Al Tayer Group',
  'Noon',
  'Carrefour',
  'VOX Cinemas',
  'National Geographic',
  'TP-Link',
  'Clinell',
  'Citizen',
  'Rolls-Royce',
  'Emirates Nuclear Energy',
  'Cisco',
  'Dubai Carbon',
  'Mubadala',
  'RTA Dubai',
  'DWTC',
];

export function ClientMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 lg:py-16 bg-card overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <span className="text-sm text-muted-foreground/60 tracking-wide">
          Selected clients
        </span>
      </div>

      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays - subtle fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-card via-card/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-card via-card/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <motion.div
          className="flex items-center gap-12 md:gap-16 lg:gap-20"
          animate={{
            x: isPaused ? undefined : [0, -50 * clients.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {/* Triple the items for seamless loop */}
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={`${client}-${index}`}
              className="flex-shrink-0"
            >
              <span
                className={cn(
                  'text-base md:text-lg font-medium whitespace-nowrap',
                  'text-muted-foreground/50',
                  'transition-colors duration-300',
                  'hover:text-foreground/80'
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
