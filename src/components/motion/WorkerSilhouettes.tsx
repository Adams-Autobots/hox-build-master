import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

const LadderWorker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 200" className={className} fill="currentColor">
    {/* Ladder */}
    <rect x="20" y="40" width="4" height="150" />
    <rect x="56" y="40" width="4" height="150" />
    <rect x="20" y="60" width="40" height="3" />
    <rect x="20" y="90" width="40" height="3" />
    <rect x="20" y="120" width="40" height="3" />
    <rect x="20" y="150" width="40" height="3" />
    {/* Worker */}
    <ellipse cx="50" cy="25" rx="12" ry="10" /> {/* Hard hat */}
    <ellipse cx="50" cy="38" rx="8" ry="6" /> {/* Head */}
    <rect x="42" y="44" width="16" height="25" rx="3" /> {/* Body */}
    <rect x="35" y="46" width="8" height="4" rx="2" /> {/* Left arm reaching */}
    <rect x="57" y="50" width="12" height="4" rx="2" /> {/* Right arm */}
    <rect x="44" y="68" width="5" height="20" /> {/* Left leg */}
    <rect x="51" y="68" width="5" height="18" /> {/* Right leg */}
  </svg>
);

const WelderWorker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 180" className={className} fill="currentColor">
    {/* Worker body */}
    <ellipse cx="50" cy="20" rx="14" ry="12" /> {/* Welding mask */}
    <rect x="38" y="32" width="24" height="35" rx="4" /> {/* Body */}
    {/* Welding arm extended */}
    <rect x="60" y="40" width="30" height="6" rx="2" transform="rotate(-20 60 40)" />
    {/* Welding torch */}
    <rect x="85" y="30" width="15" height="8" rx="2" transform="rotate(-20 85 30)" />
    {/* Sparks */}
    <circle cx="100" cy="45" r="2" opacity="0.8" />
    <circle cx="105" cy="50" r="1.5" opacity="0.6" />
    <circle cx="98" cy="52" r="1" opacity="0.5" />
    {/* Left arm */}
    <rect x="25" y="38" width="15" height="5" rx="2" />
    {/* Legs */}
    <rect x="40" y="66" width="8" height="40" />
    <rect x="52" y="66" width="8" height="40" />
    {/* Feet */}
    <rect x="38" y="104" width="12" height="6" rx="2" />
    <rect x="50" y="104" width="12" height="6" rx="2" />
  </svg>
);

const EngineerWorker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 180" className={className} fill="currentColor">
    {/* Hard hat */}
    <ellipse cx="40" cy="18" rx="16" ry="10" />
    <rect x="24" y="16" width="32" height="6" />
    {/* Head */}
    <ellipse cx="40" cy="32" rx="10" ry="8" />
    {/* Body */}
    <rect x="28" y="40" width="24" height="40" rx="4" />
    {/* Clipboard */}
    <rect x="52" y="50" width="18" height="24" rx="2" />
    <rect x="55" y="54" width="12" height="2" opacity="0.5" />
    <rect x="55" y="58" width="10" height="2" opacity="0.5" />
    <rect x="55" y="62" width="12" height="2" opacity="0.5" />
    {/* Arms */}
    <rect x="52" y="45" width="8" height="5" rx="2" />
    <rect x="20" y="45" width="10" height="5" rx="2" />
    {/* Legs */}
    <rect x="30" y="78" width="8" height="50" />
    <rect x="42" y="78" width="8" height="50" />
    {/* Feet */}
    <rect x="28" y="126" width="12" height="6" rx="2" />
    <rect x="40" y="126" width="12" height="6" rx="2" />
  </svg>
);

const CarryingWorker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 140 180" className={className} fill="currentColor">
    {/* Beam being carried */}
    <rect x="10" y="35" width="120" height="8" rx="1" opacity="0.8" />
    {/* Hard hat */}
    <ellipse cx="70" cy="18" rx="14" ry="10" />
    {/* Head */}
    <ellipse cx="70" cy="30" rx="9" ry="7" />
    {/* Body - leaning slightly */}
    <rect x="58" y="42" width="24" height="35" rx="4" transform="rotate(-5 70 55)" />
    {/* Arms reaching up */}
    <rect x="48" y="35" width="8" height="20" rx="2" transform="rotate(15 52 45)" />
    <rect x="84" y="35" width="8" height="20" rx="2" transform="rotate(-15 88 45)" />
    {/* Legs */}
    <rect x="58" y="76" width="8" height="48" transform="rotate(5 62 100)" />
    <rect x="74" y="76" width="8" height="48" transform="rotate(-5 78 100)" />
    {/* Feet */}
    <rect x="52" y="122" width="14" height="6" rx="2" />
    <rect x="74" y="122" width="14" height="6" rx="2" />
  </svg>
);

const SupervisorWorker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 180" className={className} fill="currentColor">
    {/* Hard hat */}
    <ellipse cx="45" cy="18" rx="15" ry="11" />
    <rect x="30" y="16" width="30" height="6" />
    {/* Head */}
    <ellipse cx="45" cy="34" rx="10" ry="8" />
    {/* Body */}
    <rect x="33" y="42" width="24" height="38" rx="4" />
    {/* Pointing arm */}
    <rect x="55" y="48" width="35" height="5" rx="2" transform="rotate(-30 55 50)" />
    {/* Pointing finger */}
    <circle cx="88" cy="35" r="3" />
    {/* Other arm on hip */}
    <rect x="20" y="55" width="15" height="5" rx="2" transform="rotate(20 28 58)" />
    {/* Legs */}
    <rect x="35" y="78" width="8" height="50" />
    <rect x="47" y="78" width="8" height="50" />
    {/* Feet */}
    <rect x="33" y="126" width="12" height="6" rx="2" />
    <rect x="45" y="126" width="12" height="6" rx="2" />
  </svg>
);

const CraneWorker = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 60 200" className={className} fill="currentColor">
    {/* Crane hook and cable */}
    <rect x="28" y="0" width="4" height="60" />
    <path d="M20 60 Q30 80 40 60" fill="none" stroke="currentColor" strokeWidth="4" />
    <rect x="25" y="75" width="10" height="20" rx="2" />
    {/* Hard hat */}
    <ellipse cx="30" cy="110" rx="12" ry="9" />
    {/* Head */}
    <ellipse cx="30" cy="122" rx="8" ry="6" />
    {/* Body */}
    <rect x="22" y="128" width="16" height="28" rx="3" />
    {/* Arms up guiding */}
    <rect x="12" y="120" width="12" height="4" rx="2" transform="rotate(-45 18 122)" />
    <rect x="36" y="120" width="12" height="4" rx="2" transform="rotate(45 42 122)" />
    {/* Legs */}
    <rect x="24" y="154" width="5" height="30" />
    <rect x="31" y="154" width="5" height="30" />
    {/* Feet */}
    <rect x="22" y="182" width="8" height="5" rx="2" />
    <rect x="30" y="182" width="8" height="5" rx="2" />
  </svg>
);

interface SilhouetteConfig {
  Component: React.FC<{ className?: string }>;
  position: 'left' | 'right';
  top: string;
  parallaxSpeed: number;
  size: string;
  opacity: number;
  horizontalOffset: string;
}

const silhouettes: SilhouetteConfig[] = [
  { Component: LadderWorker, position: 'left', top: '15%', parallaxSpeed: 0.3, size: 'h-32', opacity: 0.08, horizontalOffset: '-2rem' },
  { Component: WelderWorker, position: 'right', top: '35%', parallaxSpeed: 0.5, size: 'h-28', opacity: 0.06, horizontalOffset: '-1rem' },
  { Component: EngineerWorker, position: 'left', top: '55%', parallaxSpeed: 0.4, size: 'h-36', opacity: 0.07, horizontalOffset: '0rem' },
  { Component: CarryingWorker, position: 'right', top: '20%', parallaxSpeed: 0.6, size: 'h-24', opacity: 0.05, horizontalOffset: '-3rem' },
  { Component: SupervisorWorker, position: 'right', top: '70%', parallaxSpeed: 0.35, size: 'h-32', opacity: 0.08, horizontalOffset: '-1rem' },
  { Component: CraneWorker, position: 'left', top: '80%', parallaxSpeed: 0.45, size: 'h-40', opacity: 0.06, horizontalOffset: '1rem' },
];

export function WorkerSilhouettes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Create transforms for each parallax speed
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -400]);

  const springY1 = useSpring(y1, { stiffness: 50, damping: 20 });
  const springY2 = useSpring(y2, { stiffness: 50, damping: 20 });
  const springY3 = useSpring(y3, { stiffness: 50, damping: 20 });
  const springY4 = useSpring(y4, { stiffness: 50, damping: 20 });

  const getParallaxY = (speed: number) => {
    if (speed >= 0.5) return springY1;
    if (speed >= 0.4) return springY2;
    if (speed >= 0.35) return springY3;
    return springY4;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 hidden xl:block overflow-hidden"
    >
      {silhouettes.map((silhouette, index) => {
        const { Component, position, top, parallaxSpeed, size, opacity, horizontalOffset } = silhouette;
        const y = getParallaxY(parallaxSpeed);

        return (
          <motion.div
            key={index}
            className={`absolute ${position === 'left' ? 'left-4 2xl:left-12' : 'right-4 2xl:right-12'}`}
            style={{
              top,
              y,
              x: horizontalOffset,
              opacity,
            }}
          >
            <Component
              className={`${size} text-foreground transition-opacity duration-500`}
            />
          </motion.div>
        );
      })}

      {/* Subtle red glow accent on one worker */}
      <motion.div
        className="absolute left-8 2xl:left-16"
        style={{
          top: '55%',
          y: springY2,
        }}
      >
        <div 
          className="absolute inset-0 blur-xl bg-primary/10 -z-10 scale-150"
          style={{ opacity: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
