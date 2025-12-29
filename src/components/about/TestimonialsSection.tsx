import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "HOX delivered our exhibition pavilion with precision and creativity that exceeded our expectations. Their attention to detail is unmatched in the region.",
    author: "Marketing Director",
    company: "Global Luxury Brand",
    division: "Exhibitions"
  },
  {
    quote: "From concept to installation, the team handled our flagship store with professionalism and craftsmanship. A true partner for premium retail environments.",
    author: "Regional Head of Retail",
    company: "International Fashion House",
    division: "Retail"
  },
  {
    quote: "Their ability to manage complex timelines while maintaining quality made our corporate event a resounding success. We continue to work with HOX on all our activations.",
    author: "Events Manager",
    company: "Fortune 500 Company",
    division: "Events"
  }
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className={cn(
            'inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <span className="w-8 h-px bg-primary" />
            Client Voices
          </span>
          
          <h2 className={cn(
            'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <span className="hox-brand">What our clients </span>
            <span className="text-primary">Say.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'relative p-8 rounded-xl bg-card border border-border transition-all duration-500 group hover:border-primary/30',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6 transition-colors duration-300 group-hover:text-primary/40" />
              
              <blockquote className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-border pt-6">
                <p className="font-bold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                <span className="inline-block mt-2 text-xs uppercase tracking-wider text-primary">
                  {testimonial.division}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
