import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import whyHoxVideo from '@/assets/hero-whyhox-video.mp4';

const values = [
  { name: 'Reliable', color: 'text-[#00AEEF]' },
  { name: 'Ethical', color: 'text-[#F4A545]' },
  { name: 'Dedicated', color: 'text-[#8DC63F]' },
  { name: 'Transparent', color: 'text-primary' },
];

export function WhyHoxVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Only show video when section is in view, fade out as user scrolls past
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Cycle through values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Fixed Video Background - only visible when this section is in view */}
      <motion.div 
        className="fixed inset-0 w-full h-full z-[5] pointer-events-none"
        style={{ opacity: videoOpacity }}
      >
        <video
          key="whyhox-video"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={whyHoxVideo} type="video/mp4" />
        </video>
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.span 
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="w-8 h-px bg-primary" />
            Why hox
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We deliver <span className="text-primary">unforgettable.</span>
          </motion.h2>

          {/* Value words - similar to hero division names */}
          <motion.div 
            className="flex flex-col gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {values.map((value, index) => (
              <motion.span
                key={value.name}
                className={`text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide transition-all duration-500 ${
                  index === activeIndex 
                    ? `${value.color} scale-105 origin-left` 
                    : 'text-foreground/40'
                }`}
                whileHover={{ scale: 1.05, x: 10 }}
              >
                {value.name}
              </motion.span>
            ))}
          </motion.div>

          {/* Description text */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Years of planning, investment, and commitment to accomplishing what others can't has made us efficient, effective and given us a base of resources, equipment and capabilities that few are able to match.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
