import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export function ContactCTA() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className={cn(
              'inline-flex items-center justify-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            Start your project
            <span className="w-8 h-px bg-primary" />
          </span>

          <h2
            className={cn(
              'text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">Ready to build </span>
            <span className="text-primary">Something</span>
            <br />
            <span className="text-muted-foreground/60">exceptional?</span>
          </h2>

          <p
            className={cn(
              'text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            Let's discuss your next project. Our team is ready to bring your vision to life 
            with precision, speed, and uncompromising quality.
          </p>

          <div
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact" className="group">
                Talk to our team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
