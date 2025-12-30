import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HoverText } from '@/components/ui/HoverText';
import heroVideo from '@/assets/hero-video.mp4';

const heroWords = [
  { word: 'Exhibitions', color: 'hsl(var(--hox-red))' },
  { word: 'Events', color: 'hsl(var(--hox-blue))' },
  { word: 'Retail', color: 'hsl(var(--hox-orange))' },
  { word: 'Interiors', color: 'hsl(var(--hox-green))' },
];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { scrollY } = useScroll();
  
  // Video fades out as user scrolls (starts at 60% of viewport, fully faded at 120%)
  const videoOpacity = useTransform(scrollY, [0, window.innerHeight * 0.6, window.innerHeight * 1.2], [1, 1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-visible">
      {/* Fixed Background Video - stays constant while content scrolls */}
      <motion.div 
        className="fixed inset-0 w-full h-screen pointer-events-none"
        style={{ opacity: videoOpacity, zIndex: 0 }}
      >
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
        {/* Bottom fade gradient for smooth bleed transition */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-background via-background/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 whitespace-nowrap">
            <span className="text-foreground"><HoverText>Hox</HoverText> </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block"
                style={{ color: heroWords[currentWordIndex].color }}
              >
                <HoverText>{heroWords[currentWordIndex].word}</HoverText>.
              </motion.span>
            </AnimatePresence>
          </h1>

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
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Explore our work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
