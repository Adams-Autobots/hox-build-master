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

      {/* Bottom Left Content */}
      <div className="absolute bottom-12 md:bottom-16 left-6 lg:left-12 z-10">
        <h1
          className={cn(
            'text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] transition-all duration-700',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <span className="block text-foreground/80">
            <SplitText text="production" delay={0.2} staggerDelay={0.04} />
          </span>
          <span className="block text-foreground/80">
            <SplitText text="excellence." delay={0.5} staggerDelay={0.04} />
          </span>
        </h1>

        {/* Animated Division Words */}
        <div
          className={cn(
            'mt-4 overflow-hidden transition-all duration-700 delay-300',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <div className="flex items-center gap-3 text-sm md:text-base text-muted-foreground">
            {heroWords.map((item, index) => (
              <span
                key={item.word}
                className={cn(
                  'transition-all duration-500',
                  index === currentWordIndex ? 'scale-105' : 'opacity-40'
                )}
                style={index === currentWordIndex ? { color: item.color } : undefined}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Right CTA */}
      <div
        className={cn(
          'absolute bottom-12 md:bottom-16 right-6 lg:right-12 z-10 transition-all duration-700 delay-500',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
      >
        <Button variant="hero" size="lg" asChild>
          <Link to="/work" className="group">
            explore work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
