import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HoverText } from '@/components/ui/HoverText';
import heroVideo from '@/assets/hero-video.mp4';

const divisions = [
  { name: 'Exhibitions', color: 'hsl(var(--hox-red))', path: '/divisions/exhibitions' },
  { name: 'Events', color: 'hsl(var(--hox-blue))', path: '/divisions/events' },
  { name: 'Retail', color: 'hsl(var(--hox-orange))', path: '/divisions/retail' },
  { name: 'Interiors', color: 'hsl(var(--hox-green))', path: '/divisions/interiors' },
];
export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollY } = useScroll();

  // Video fades out as user scrolls (starts at 60% of viewport, fully faded at 120%)
  const videoOpacity = useTransform(scrollY, [0, window.innerHeight * 0.6, window.innerHeight * 1.2], [1, 1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % divisions.length);
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
        <video src={heroVideo} autoPlay muted loop playsInline className="w-full h-full object-cover scale-x-[-1]" />
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
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <HoverText className="text-[hsl(var(--hox-red))]">hox</HoverText>
              <HoverText className="text-foreground">creative</HoverText>
              <HoverText className="text-[hsl(var(--hox-red))]">.</HoverText>
            </span>
          </motion.div>

          {/* Division Names */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-6 mb-8 max-w-xs md:max-w-none"
          >
            {divisions.map((division, index) => (
              <Link
                key={division.name}
                to={division.path}
                className="relative group"
              >
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-lg md:text-2xl lg:text-3xl font-semibold transition-all duration-300 cursor-pointer inline-block"
                  style={{
                    color: activeIndex === index ? division.color : 'hsl(var(--foreground))',
                    textShadow: activeIndex === index ? `0 0 20px ${division.color}` : 'none',
                  }}
                  whileHover={{ 
                    scale: 1.15,
                    color: division.color,
                    textShadow: `0 0 25px ${division.color}`,
                  }}
                >
                  {division.name}
                </motion.span>
              </Link>
            ))}
          </motion.div>

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
            <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300">
              Explore our work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}