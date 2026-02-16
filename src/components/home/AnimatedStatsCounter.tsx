import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 3000, suffix: "+", label: "Projects delivered" },
  { value: 17, suffix: "+", label: "Years in Dubai" },
  { value: 50, suffix: "+", label: "Team members" },
  { value: 4, label: "Divisions" },
];

function useCountUp(end: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(eased * end);
      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => { startTime.current = null; };
  }, [end, isVisible, duration]);

  return count;
}

function StatCard({ stat, index, isVisible }: { stat: StatItem; index: number; isVisible: boolean }) {
  const count = useCountUp(stat.value, isVisible, 2000 + index * 200);

  return (
    <div
      className={cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
      style={{ transitionDelay: `${400 + index * 100}ms` }}
    >
      <span className="block text-5xl md:text-6xl font-bold text-foreground tabular-nums leading-none">
        {count}{stat.suffix}
      </span>
      <span className="block text-sm text-muted-foreground mt-3 tracking-wide">
        {stat.label}
      </span>
    </div>
  );
}

export function AnimatedStatsCounter() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-16 gap-y-14">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
      ))}
    </div>
  );
}
