import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import heroVideo from '@/assets/hero-video.mp4';

const heroWords = [
  { word: 'exhibitions', color: 'hsl(var(--hox-red))' },
  { word: 'events', color: 'hsl(var(--hox-blue))' },
  { word: 'retail', color: 'hsl(var(--hox-orange))' },
  { word: 'interiors', color: 'hsl(var(--hox-green))' },
];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-screen Background Video */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-x-[-1]"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/50" />
        {/* Subtle red brand tint */}
        <div className="absolute inset-0 bg-[hsl(var(--hox-red)/0.06)]" />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/25" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link 
              to="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 text-foreground font-medium transition-all duration-300 hover:bg-foreground hover:text-background hover:font-bold"
            >
              Explore our work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
