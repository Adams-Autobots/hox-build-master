import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { HoverText } from "@/components/ui/HoverText";

const clients = [
  "National Geographic",
  "TP-Link",
  "Clinell",
  "Citizen",
  "Rolls-Royce",
  "Mubadala",
  "RTA Dubai",
  "DWTC",
  "The Industrial Group",
  "Dahua Technology",
  "La Ronda",
  "Tazzetti",
  "Society of Petroleum Engineers (SPE)",
  "Notions Group",
  "Eurofire",
  "Madar",
  "CABSAT",
  "Underwriters Laboratories (UL)",
  "Emirates Nuclear Energy Corporation (ENEC)",
  "Lukoil",
  "Cisco",
  "Global Light & Power LLC",
  "Enviromena Power Systems",
  "Dubai Carbon",
  "Newland",
  "Nahla",
  "Zaun",
  "Hochiki",
  "JM Posner",
  "Energy Pioneers",
  "Temac",
  "SPF Realty",
  "Made in Britain",
  "Synectics",
  "Tayto Group Limited",
  "Sohar Port & Freezone",
  "Marketing Eye",
  "Nawah",
  "Jewellery Design Awards",
  "Independent Diabetes Trust",
  "Nissan",
  "Selevision",
  "Telenor Satellite Broadcasting",
  "Bin Ablan Food Industry",
  "EMI",
  "Karam",
];

export function ClientMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  
  // Split clients into two rows
  const midpoint = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, midpoint);
  const row2 = clients.slice(midpoint);

  return (
    <section className="py-16 lg:py-20 bg-card overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 mb-10">
        <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-4">
          <span className="w-8 h-px bg-primary" />
          Our Clients
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          <HoverText>Beyond completion. Into</HoverText> <span className="text-primary"><HoverText>partnership.</HoverText></span>
        </h2>
      </div>

      <div 
        className="relative flex flex-col gap-6" 
        onMouseEnter={() => setIsPaused(true)} 
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient Overlays - subtle fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-card via-card/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-card via-card/80 to-transparent z-10 pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <motion.div
          className="flex items-center gap-12 md:gap-16 lg:gap-20"
          animate={{
            x: isPaused ? undefined : [0, -80 * row1.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...row1, ...row1, ...row1].map((client, index) => (
            <div key={`row1-${client}-${index}`} className="flex-shrink-0">
              <span
                className={cn(
                  "text-base md:text-lg font-medium whitespace-nowrap",
                  "text-muted-foreground/50",
                  "transition-colors duration-300",
                  "hover:text-foreground/80",
                )}
              >
                {client}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Row 2 - scrolls right (opposite direction) */}
        <motion.div
          className="flex items-center gap-12 md:gap-16 lg:gap-20"
          animate={{
            x: isPaused ? undefined : [-80 * row2.length, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45,
              ease: "linear",
            },
          }}
        >
          {[...row2, ...row2, ...row2].map((client, index) => (
            <div key={`row2-${client}-${index}`} className="flex-shrink-0">
              <span
                className={cn(
                  "text-base md:text-lg font-medium whitespace-nowrap",
                  "text-muted-foreground/50",
                  "transition-colors duration-300",
                  "hover:text-foreground/80",
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
