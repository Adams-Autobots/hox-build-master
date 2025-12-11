import { Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "HOX delivers every time — even under impossible timelines. Their in-house capabilities make all the difference.",
    author: "Senior Events Manager",
    company: "Global Automotive Brand",
  },
  {
    quote: "The level of precision and attention to detail is unmatched. They've been our go-to production partner for years.",
    author: "Marketing Director",
    company: "Fortune 500 Tech Company",
  },
];

const clients = [
  'Mercedes-Benz', 'Samsung', 'Emaar', 'Dubai Holdings', 
  'Marriott', 'LVMH', 'Porsche', 'Apple'
];

export function ClientsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span
            className={cn(
              'inline-flex items-center justify-center gap-2 text-sm font-medium tracking-widest text-primary uppercase mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            trusted across the uae
            <span className="w-8 h-px bg-primary" />
          </span>

          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">our clients speak.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 lg:mb-24">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'relative p-8 lg:p-10 rounded-lg bg-background border border-border transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-6" />

              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div
          className={cn(
            'transition-all duration-700 delay-600',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8">
            trusted by leading brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {clients.map((client) => (
              <div
                key={client}
                className="text-xl lg:text-2xl font-bold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-300"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
