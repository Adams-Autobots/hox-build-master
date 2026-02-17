import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

import { SectionLabel } from '@/components/ui/SectionLabel';

const clients = [
  "National Geographic", "TP-Link", "Clinell", "Citizen", "Rolls-Royce",
  "Mubadala", "RTA Dubai", "DWTC", "The Industrial Group", "Dahua Technology",
  "La Ronda", "Tazzetti", "Society of Petroleum Engineers (SPE)", "Notions Group",
  "Eurofire", "Madar", "CABSAT", "Underwriters Laboratories (UL)",
  "Emirates Nuclear Energy Corporation (ENEC)", "Lukoil", "Cisco",
  "Global Light & Power LLC", "Enviromena Power Systems", "Dubai Carbon",
  "Newland", "Nahla", "Zaun", "Hochiki", "JM Posner", "Energy Pioneers",
  "Temac", "SPF Realty", "Made in Britain", "Synectics", "Tayto Group Limited",
  "Sohar Port & Freezone", "Marketing Eye", "Nawah", "Jewellery Design Awards",
  "Nissan", "Selevision", "Telenor Satellite Broadcasting",
  "Bin Ablan Food Industry", "EMI", "Karam",
];

function MarqueeRow({ items, direction = 'left', speed = 40 }: { items: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;
    const oneSetCount = items.length;
    let width = 0;
    const children = rowRef.current.children;
    for (let i = 0; i < oneSetCount && i < children.length; i++) {
      width += (children[i] as HTMLElement).offsetWidth;
      const gap = parseFloat(getComputedStyle(rowRef.current).columnGap) || 64;
      if (i < oneSetCount - 1) width += gap;
    }
    setContentWidth(width);
  }, [items]);

  const animationStyle = contentWidth > 0 ? {
    animationName: direction === 'left' ? 'marquee-left' : 'marquee-right',
    animationDuration: `${speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationPlayState: isPaused ? 'paused' : 'running',
    '--marquee-distance': `${contentWidth}px`,
  } as React.CSSProperties : {};

  return (
    <div className="overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div ref={rowRef} className="flex items-center gap-12 md:gap-16 lg:gap-20 w-max will-change-transform" style={animationStyle}>
        {[...items, ...items, ...items].map((client, index) => (
          <div key={`${client}-${index}`} className="flex-shrink-0">
            <span className="text-base md:text-lg font-medium whitespace-nowrap text-muted-foreground/40 transition-colors duration-300 hover:text-foreground/70">{client}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  const midpoint = Math.ceil(clients.length / 2);
  const row1 = clients.slice(0, midpoint);
  const row2 = clients.slice(midpoint);

  return (
    <section className="py-16 lg:py-20 bg-background overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--marquee-distance))); }
        }
        @keyframes marquee-right {
          from { transform: translateX(calc(-1 * var(--marquee-distance))); }
          to { transform: translateX(0); }
        }
      `}</style>
      <div className="container mx-auto px-6 lg:px-12 mb-8">
        <SectionLabel>Trusted by</SectionLabel>
      </div>
      <div className="relative flex flex-col gap-5">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <MarqueeRow items={row1} direction="left" speed={40} />
        <MarqueeRow items={row2} direction="right" speed={45} />
      </div>
    </section>
  );
}
