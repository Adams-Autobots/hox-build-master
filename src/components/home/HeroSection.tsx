import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import heroVideo from '@/assets/hero-showreel.mp4';
import { FloatingShapes } from './FloatingShapes';

const heroWords = [
  { word: 'exhibitions', color: 'hsl(var(--hox-red))' },
  { word: 'events', color: 'hsl(var(--hox-blue))' },
  { word: 'retail', color: 'hsl(var(--hox-orange))' },
  { word: 'interiors', color: 'hsl(var(--hox-green))' },
];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-muted/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* 3D Floating Shapes */}
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.95] mb-6">
              <span className="block text-foreground">production</span>
              <span className="block text-foreground">excellence.</span>
            </h1>

            {/* Animated Division Words */}
            <div className="flex items-center gap-3 md:gap-4 text-base md:text-lg lg:text-xl font-medium mb-8">
              {heroWords.map((item, index) => (
                <span
                  key={item.word}
                  className={cn(
                    'transition-all duration-500',
                    index === currentWordIndex ? 'scale-110' : 'opacity-30'
                  )}
                  style={index === currentWordIndex ? { color: item.color } : undefined}
                >
                  {item.word}
                </span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg mb-10"
            >
              Dubai's premier production powerhouse delivering world-class exhibitions, events, retail environments, and interior solutions with precision engineering.
            </motion.p>

          </motion.div>

          {/* Right Video Container */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2"
          >
            <div
              className={cn(
                'relative rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500',
                'bg-muted/10 backdrop-blur-sm border border-foreground/10',
                'shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.3)]',
                isHovered && 'scale-[1.02] shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.4)]'
              )}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Glassmorphism border glow */}
              <div className="absolute inset-0 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-50 pointer-events-none" />
              
              {/* Video */}
              <div className="relative aspect-[4/3] lg:aspect-[16/10]">
                <video
                  src={heroVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
