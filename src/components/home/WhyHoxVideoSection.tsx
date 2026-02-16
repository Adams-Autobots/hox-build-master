import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import whyHoxVideo from '@/assets/hero-whyhox-video-v2.mp4';
import { HoverText } from '@/components/ui/HoverText';

const values = [
  { name: 'Reliable', color: 'hsl(var(--hox-red))' },
  { name: 'Ethical', color: 'hsl(var(--hox-blue))' },
  { name: 'Dedicated', color: 'hsl(var(--hox-orange))' },
  { name: 'Transparent', color: 'hsl(var(--hox-green))' },
];

export function WhyHoxVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Fade video in/out based on scroll position — but NOT fixed, uses sticky approach
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Only mount video when section is near viewport (saves GPU/memory)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        // Pause/play video based on visibility
        if (entry.isIntersecting) {
          videoRef.current?.play();
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: '200px 0px' } // Start loading slightly before visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Cycle through values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % values.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Video Background — uses absolute (not fixed) to avoid dual-fixed-layer perf hit */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
        style={{ opacity: videoOpacity }}
      >
        {isInView && (
          <video
            ref={videoRef}
            key="whyhox-video-v2"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label="Behind the scenes of HOX production and fabrication capabilities"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={whyHoxVideo} type="video/mp4" />
          </video>
        )}
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/50" />
      </motion.div>

      {/* Content — uses sticky positioning for parallax-like effect */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <HoverText>We deliver</HoverText> <span className="text-primary"><HoverText>unforgettable.</HoverText></span>
          </motion.h2>

          {/* Value words */}
          <motion.div 
            className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-6 mb-8 max-w-xs md:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {values.map((value, index) => (
              <motion.span
                key={value.name}
                className="text-lg md:text-2xl lg:text-3xl font-semibold transition-all duration-300 cursor-pointer"
                style={{
                  color: activeIndex === index ? value.color : 'hsl(var(--foreground))',
                  textShadow: activeIndex === index ? `0 0 20px ${value.color}` : 'none',
                }}
                animate={activeIndex === index ? {
                  scale: [1, 1.08, 1],
                } : {}}
                transition={activeIndex === index ? {
                  duration: 0.6,
                  ease: "easeInOut",
                } : { duration: 0.2 }}
                whileHover={{ 
                  scale: 1.15,
                  color: value.color,
                  textShadow: `0 0 25px ${value.color}`,
                }}
              >
                {value.name}
              </motion.span>
            ))}
          </motion.div>

          {/* Description text */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Years of planning, investment, and commitment to accomplishing what others can't has made us efficient, effective and given us a base of resources, equipment and capabilities that few are able to match.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
