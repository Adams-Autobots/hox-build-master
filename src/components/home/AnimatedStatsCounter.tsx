import { useEffect, useState, useRef } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface StatItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 3000, suffix: '+', label: 'projects delivered' },
  { value: 15, suffix: '+', label: 'years in dubai' },
  { value: 100, suffix: '%', label: 'in-house production' },
  { value: 5, label: 'divisions' },
];

function useCountUp(end: number, isVisible: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * end);
      
      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTime.current = null;
    };
  }, [end, isVisible, duration]);

  return count;
}

function StatCard({ stat, index, isVisible }: { stat: StatItem; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible, 2000 + index * 200);

  return (
    <div
      className={cn(
        'group relative p-8 rounded-lg bg-background border border-border hover:border-primary/30 transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${600 + index * 100}ms` }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <span className="block text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-500 tabular-nums">
          {stat.prefix}{count}{stat.suffix}
        </span>
        <span className="text-sm text-muted-foreground uppercase tracking-wider">
          {stat.label}
        </span>
      </div>
    </div>
  );
}

export function AnimatedStatsCounter() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-8"
    >
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          stat={stat}
          index={index}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}
