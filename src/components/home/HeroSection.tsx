import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-exhibition.jpg';
import { SplitText } from './SplitTextHero';
import { VideoShowreel } from './VideoShowreel';

const heroWords = [
  { word: 'exhibitions', color: 'hsl(var(--hox-red))' },
  { word: 'events', color: 'hsl(var(--hox-blue))' },
  { word: 'retail', color: 'hsl(var(--hox-orange))' },
  { word: 'interiors', color: 'hsl(var(--hox-green))' },
];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Video Showreel Background */}
      <VideoShowreel posterImage={heroImage} />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)/0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl">
          {/* Overline */}
          <div
            className={cn(
              'mb-8 transition-all duration-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-muted-foreground uppercase">
              <span className="w-8 h-px bg-primary" />
              production excellence since 2008
            </span>
          </div>

          {/* Main Headline with Split Text Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8">
            <span className="block overflow-hidden">
              <span className="text-muted-foreground/60">
                <SplitText text="production" delay={0.2} staggerDelay={0.04} />
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="text-muted-foreground/60">
                <SplitText text="excellence." delay={0.5} staggerDelay={0.04} />
              </span>
            </span>
          </h1>

          {/* Animated Division Words */}
          <div
            className={cn(
              'h-10 mb-8 overflow-hidden transition-all duration-700 delay-300',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="flex items-center gap-3 text-lg md:text-xl text-muted-foreground">
              {heroWords.map((item, index) => (
                <span
                  key={item.word}
                  className={cn(
                    'transition-all duration-500 hox-brand',
                    index === currentWordIndex
                      ? 'scale-110'
                      : 'opacity-40'
                  )}
                  style={index === currentWordIndex ? { color: item.color } : undefined}
                >
                  {item.word}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p
            className={cn(
              'text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed transition-all duration-700 delay-500',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            We are a Dubai-born production powerhouse delivering precision-built environments, 
            immersive experiences, and end-to-end fabrication for brands, developers, 
            and agencies across the UAE.
          </p>

          {/* CTAs */}
          <div
            className={cn(
              'flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-700',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/work" className="group">
                explore our work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/contact">
                request a proposal
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={cn(
            'absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-1000',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-foreground/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
