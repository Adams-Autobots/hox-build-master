import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import whyHoxVideo from '@/assets/hero-whyhox-video.mp4';

export function WhyHoxVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Fade out video as user scrolls past
  const videoOpacity = useTransform(scrollYProgress, [0.6, 1.2], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Fixed Video Background */}
      <motion.div 
        className="fixed inset-0 w-full h-full z-0"
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

      {/* Spacer content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.span 
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="w-8 h-px bg-primary" />
            Why hox
            <span className="w-8 h-px bg-primary" />
          </motion.span>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="hox-brand">in-house </span>
            <span className="text-primary">Production.</span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
