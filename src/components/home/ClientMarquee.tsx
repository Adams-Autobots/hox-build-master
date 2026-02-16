import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { HoverText } from "@/components/ui/HoverText";

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
  "Independent Diabetes Trust", "Nissan", "Selevision",
  "Telenor Satellite Broadcasting", "Bin Ablan Food Industry", "EMI", "Karam",
];

function MarqueeRow({ items, direction = 'left', speed = 40 }: { items: string[]; direction?: 'left' | 'right'; speed?: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!rowRef.current) return;
    const children = rowRef.current.children;
    const oneSetCount = items.length;
    let width = 0;
    for (let i = 0; i < oneSetCount && i < children.length; i++) {
      width += (children[i] as HTMLElement).offsetWidth;
      const style = getComputedStyle(rowRef.current);
      const gap = parseFloat(style.columnGap) || 64;
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
            <span className={cn("text-base md:text-lg font-medium whitespace-nowrap text-muted-foreground/50 transition-colors duration-300 hover:text-foreground/80")}>{client}</span>
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
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background via-card/50 to-card overflow-hidden">
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
      <div className="container mx-auto px-6 lg:px-12 mb-10">
        <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-4">
          <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
          Our Clients
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <HoverText>Beyond completion. Into</HoverText> <span className="text-primary"><HoverText>partnership.</HoverText></span>
        </h2>
      </div>
      <div className="relative flex flex-col gap-6">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background via-card/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-card via-card/50 to-transparent z-10 pointer-events-none" />
        <MarqueeRow items={row1} direction="left" speed={40} />
        <MarqueeRow items={row2} direction="right" speed={45} />
      </div>
    </section>
  );
}
