import { useEffect, useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HoverText } from '@/components/ui/HoverText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { VIDEO_URLS } from '@/lib/video-urls';

const divisions = [
  { name: 'Exhibitions', color: 'hsl(var(--hox-red))', path: '/divisions/exhibitions' },
  { name: 'Events', color: 'hsl(var(--hox-blue))', path: '/divisions/events' },
  { name: 'Retail', color: 'hsl(var(--hox-orange))', path: '/divisions/retail' },
  { name: 'Interiors', color: 'hsl(var(--hox-green))', path: '/divisions/interiors' },
];

function useWindowHeight() {
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const update = () => setHeight(window.innerHeight);
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return height;
}

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { scrollY } = useScroll();
  const windowHeight = useWindowHeight();
  const prefersReducedMotion = useReducedMotion();

  const fadeStart = useMemo(() => windowHeight * 0.6, [windowHeight]);
  const fadeEnd = useMemo(() => windowHeight * 1.2, [windowHeight]);
  const videoOpacity = useTransform(
    scrollY,
    [0, fadeStart, fadeEnd],
    prefersReducedMotion ? [1, 1, 1] : [1, 1, 0]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let interval: NodeJS.Timeout;

    const startCycle = () => {
      setActiveIndex(0);
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % divisions.length);
      }, 4000);
    };

    const handlePlay = () => startCycle();
    const handleSeeked = () => {
      if (video.currentTime < 0.1) startCycle();
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('seeked', handleSeeked);
    if (!video.paused) startCycle();

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('seeked', handleSeeked);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-visible">
      {/* Fixed Background Video */}
      <motion.div 
        className="fixed inset-0 w-full h-screen pointer-events-none" 
        style={{ opacity: videoOpacity, zIndex: 0 }}
      >
        <div className="absolute inset-0 bg-background" />
        
        <video
          ref={videoRef}
          src={VIDEO_URLS.heroMain}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          aria-label="HOX showreel featuring exhibitions, events, retail and interiors projects in Dubai"
        />
        <div className="absolute inset-0 bg-background/30" />
        <div className="absolute inset-0 bg-[hsl(var(--hox-red)/0.04)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/15" />
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} 
          className="max-w-3xl"
        >
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-6 mb-8 max-w-xs md:max-w-none"
          >
            {divisions.map((division, index) => (
              <Link key={division.name} to={division.path} className="relative group">
                <motion.span
                  className="text-lg md:text-2xl lg:text-3xl font-semibold transition-all duration-300"
                  style={{
                    color: activeIndex === index ? division.color : 'hsl(var(--foreground))',
                    textShadow: activeIndex === index ? `0 0 20px ${division.color}` : 'none',
                  }}
                  animate={activeIndex === index ? { scale: [1, 1.08, 1] } : {}}
                  transition={activeIndex === index ? { duration: 0.6, ease: "easeInOut" } : { duration: 0.2 }}
                  whileHover={{ scale: 1.15, color: division.color, textShadow: `0 0 25px ${division.color}` }}
                >
                  {division.name.split('').map((char, charIndex) => (
                    <span key={charIndex} className="hover-letter">{char}</span>
                  ))}
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
            Dubai based production, design and technical planning delivering world class exhibitions, events, retail and interior environments.
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
