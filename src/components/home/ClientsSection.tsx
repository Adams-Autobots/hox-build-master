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
  'Expo 2020 Dubai', 'Dubai Holding', 'Emaar Properties', 'DWTC', 'RTA Dubai', 'Mubadala',
  'Tayto Group', 'Sohar Freezone', 'Marketing Eye', 'Nawah', 'Jewellery Design Awards', 'Independent Diabetes Trust',
  'National Geographic', 'TP-Link', 'Clinell', 'Citizen', 'Rolls-Royce', 'Emirates Nuclear Energy',
  'Lukoil', 'Cisco', 'Global Light & Power', 'Enviromena', 'Dubai Carbon', 'Gama Aviation',
  'The Industrial Group', 'Dahua Technology', 'La Ronda', 'Tazzetti', 'SPE International', 'Jetour'
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
              'inline-flex items-center justify-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="w-8 h-px bg-primary" />
            Trusted across the UAE
            <span className="w-8 h-px bg-primary" />
          </span>

          <h2
            className={cn(
              'text-4xl md:text-5xl font-bold transition-all duration-700 delay-150',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <span className="hox-brand">Our clients </span>
            <span className="text-primary">Speak.</span>
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

        {/* Client Logos Marquee */}
        <div
          className={cn(
            'transition-all duration-700 delay-600',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <p className="text-center text-sm text-muted-foreground tracking-wider mb-8">
            Trusted by leading brands
          </p>
          <div className="relative overflow-hidden group">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card to-transparent z-10" />
            
            {/* Marquee */}
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client}-${index}`}
                  className="flex-shrink-0 px-6 lg:px-10 text-base lg:text-lg font-medium text-muted-foreground/50 whitespace-nowrap"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
