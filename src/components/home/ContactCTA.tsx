import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

export function ContactCTA() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span
            className={cn(
              'inline-flex items-center justify-center gap-2 text-sm font-medium tracking-widest text-primary uppercase mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            start your project
            <span className="w-8 h-px bg-primary" />
          </span>

          <h2
            className={cn(
              'text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">ready to build something</span>
            <br />
            <span className="text-primary">exceptional?</span>
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
                request a proposal
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a
                href="https://wa.me/97143456789"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <MessageCircle className="w-4 h-4" />
                whatsapp us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
