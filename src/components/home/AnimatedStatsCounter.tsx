import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
  { value: 4, label: 'divisions' },
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
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (count === stat.value && isVisible) {
      const timer = setTimeout(() => setHasCompleted(true), 100);
      return () => clearTimeout(timer);
    }
  }, [count, stat.value, isVisible]);

  return (
    <motion.div
      className={cn(
        'group relative p-8 rounded-lg bg-background border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${600 + index * 100}ms` }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Animated Glow Ring on Completion */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        animate={hasCompleted ? {
          opacity: [0, 0.8, 0],
          boxShadow: [
            '0 0 0 0 hsl(var(--primary) / 0)',
            '0 0 30px 10px hsl(var(--primary) / 0.4)',
            '0 0 0 0 hsl(var(--primary) / 0)',
          ],
        } : {}}
        transition={{ duration: 0.8 }}
      />
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Particle Effects on Completion */}
      {hasCompleted && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary"
              initial={{
                x: '50%',
                y: '50%',
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
      
      <div className="relative">
        <motion.span
          className="block text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-500 tabular-nums"
          animate={hasCompleted ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {stat.prefix}{count}{stat.suffix}
        </motion.span>
        <span className="text-sm text-muted-foreground uppercase tracking-wider">
          {stat.label}
        </span>
      </div>
    </motion.div>
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
