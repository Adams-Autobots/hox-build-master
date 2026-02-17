import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { HoverText } from '@/components/ui/HoverText';

const testimonials = [
  {
    quote: "Working with House of Exhibitions really does relieve the stress of exhibition planning and preparation. From designing, fabricating and installing shopping mall promotional kiosks to creating impactful but practical state-of-the-art exhibition stands, they go the extra mile to provide hands-on professional services which meet our individual requirements.",
    author: "C.F Group Marketing and PR Manager",
    company: "Kleindienst Group",
  },
  {
    quote: "We came to HOX seeking total refurbishment of the interiors of our centre and they certainly delivered. Despite the structure limitations, the numerous requirements of DHA and the budget constraints, they managed to transform this dark worn-down space into a bright, modern diagnostic centre. We would not hesitate to recommend them to anyone seeking contemporary interior solutions.",
    author: "Dr. H.A",
    company: "Megascan Clinic",
  },
  {
    quote: "We have been working with HOX for 7 years as our build partner of choice in Dubai. They have provided us with an excellent build service for multiple projects of all scales. Our exacting standards and specifications are always delivered on time and on budget for even our most complex designs. Our excellent business relationship is based on trust, integrity and honesty.",
    author: "W.D — Managing Director",
    company: "Design Original",
  },
  {
    quote: "\"Relax… go home and enjoy your weekend… we still have a lot of time\" — that was what HOX told me when we had just signed a contract for a gigantic stand at Gulfood 2016, with less than 15 days left. We ended up to be the first company in the concourse to have its stand ready. We at Bin Ablan will never forget the favor HOX did for us.",
    author: "A.C.O — Marketing & Sales Manager",
    company: "Bin Ablan Foods Industry",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const count = testimonials.length;

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setActive((prev) => (prev + dir + count) % count);
  }, [count]);

  // Auto-advance every 8s — pauses if user interacted recently
  const [userInteracted, setUserInteracted] = useState(false);
  useEffect(() => {
    if (userInteracted) {
      const timeout = setTimeout(() => setUserInteracted(false), 12000);
      return () => clearTimeout(timeout);
    }
    timerRef.current = setInterval(() => go(1), 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [userInteracted, go]);

  const handleNav = useCallback((dir: number) => {
    setUserInteracted(true);
    go(dir);
  }, [go]);

  // Swipe support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      handleNav(dx < 0 ? 1 : -1);
    }
  }, [handleNav]);

  const t = testimonials[active];

  return (
    <section className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <motion.span
              className="inline-flex items-center gap-3 text-sm font-medium tracking-wider text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
              Client Voices
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <HoverText>What our clients</HoverText>{' '}
              <span className="text-primary"><HoverText>say.</HoverText></span>
            </motion.h2>
          </div>

          {/* Desktop nav arrows */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav(-1)}
              className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNav(1)}
              className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonial card */}
        <div
          className="relative min-h-[280px] md:min-h-[240px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-start"
            >
              {/* Quote */}
              <div>
                <Quote className="w-8 h-8 text-primary/25 mb-5" />
                <blockquote className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/80 font-light">
                  {t.quote}
                </blockquote>
              </div>

              {/* Attribution — right side on desktop, below on mobile */}
              <div className="lg:w-48 lg:pt-14">
                <div className="w-10 h-px bg-primary/30 mb-4" />
                <p className="font-semibold text-foreground text-sm">{t.author}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.company}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots + mobile nav */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-border/10">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setUserInteracted(true); setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Mobile nav arrows */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNav(-1)}
              className="w-9 h-9 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNav(1)}
              className="w-9 h-9 rounded-full border border-border/30 flex items-center justify-center text-muted-foreground"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Counter */}
          <span className="text-xs text-muted-foreground/40 tabular-nums">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
