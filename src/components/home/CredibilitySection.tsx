import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const stats = [
  { value: '3,000+', label: 'Projects' },
  { value: '17+', label: 'Years' },
  { value: '50+', label: 'Team' },
  { value: '4', label: 'Divisions' },
];

const clients = [
  "National Geographic", "TP-Link", "Clinell", "Citizen", "Rolls-Royce",
  "Mubadala", "RTA Dubai", "DWTC", "Dahua Technology",
  "Society of Petroleum Engineers", "Underwriters Laboratories",
  "Emirates Nuclear Energy Corporation", "Lukoil", "Cisco",
  "Hochiki", "Nissan", "Karam", "Nawah", "Sohar Port & Freezone",
];

function MarqueeRow({ items, speed = 35 }: { items: string[]; speed?: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (!rowRef.current) return;
    const children = rowRef.current.children;
    const oneSetCount = items.length;
    let width = 0;
    for (let i = 0; i < oneSetCount && i < children.length; i++) {
      width += (children[i] as HTMLElement).offsetWidth;
      const style = getComputedStyle(rowRef.current);
      const gap = parseFloat(style.columnGap) || 48;
      if (i < oneSetCount - 1) width += gap;
    }
    setContentWidth(width);
  }, [items]);

  const animationStyle = contentWidth > 0 ? {
    animationName: 'marquee-left',
    animationDuration: `${speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    '--marquee-distance': `${contentWidth}px`,
  } as React.CSSProperties : {};

  return (
    <div className="overflow-hidden">
      <div ref={rowRef} className="flex items-center gap-10 md:gap-12 w-max will-change-transform" style={animationStyle}>
        {[...items, ...items, ...items].map((client, index) => (
          <span key={`${client}-${index}`} className="flex-shrink-0 text-sm md:text-base text-muted-foreground/40 whitespace-nowrap">
            {client}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CredibilitySection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-card overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-1 * var(--marquee-distance))); }
        }
      `}</style>

      {/* Stats row */}
      <div className="container mx-auto px-6 lg:px-12 mb-16 lg:mb-20">
        <div className="flex flex-wrap justify-between gap-8 max-w-3xl">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-none">
                {stat.value}
              </span>
              <span className="block text-xs text-muted-foreground/60 mt-2 tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Client marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
        <MarqueeRow items={clients} speed={35} />
      </div>
    </section>
  );
}
