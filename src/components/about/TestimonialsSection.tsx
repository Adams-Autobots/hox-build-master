import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const testimonials = [
  {
    quote: "Working with House of Exhibitions really does relieve the stress of exhibition planning and preparation. From designing, fabricating and installing shopping mall promotional kiosks to creating impactful but practical state-of-the-art exhibition stands, House of Exhibitions go the extra mile to provide hands-on professional services which meet our individual requirements.",
    author: "C.F Group Marketing and PR Manager",
    company: "Kleindienst Group"
  },
  {
    quote: "We came to HOX seeking total refurbishment of the interiors of our centre (particularly the reception area) and they certainly delivered. Despite the structure limitations of the leaded walls, the numerous requirements of DHA and the budget constraints, they managed to transform this dark worn-down space into a bright, modern diagnostic centre. They are a great team to work with who responded immediately to all requests and continuously kept updated us with progress. We would not hesitate to recommend them to anyone seeking contemporary interior solutions.",
    author: "Dr. H.A",
    company: "Megascan Clinic"
  },
  {
    quote: "We have been working with HOX for 7 years as our build partner of choice in Dubai. They have provided us with an excellent build service for a multiple of projects of all scales. HOX are fully supportive on site and their 'nothing is too much trouble' attitude ensures that we constantly return to work with them. Our exacting standards and specifications are always delivered on time and on budget for even our most complex designs. Our excellent business relationship has grown over the years and is based on trust, integrity and honesty. Values that align perfectly with Design Original. We look forward to our next project together.",
    author: "W.D – Managing Director",
    company: "Design Original"
  },
  {
    quote: "\"Relax… go home and enjoy your weekend… we still have a lot of time\" — that was what HOX told me when we finished our first meeting. That morning we had just signed a contract for a gigantic stand at Gulfood 2016, with less than 15 days left to the opening of the show. We actually ended up to be the first company in the concourse to have its stand ready! And boy was it a wicked stand! We at Bin Ablan will never forget the favor HOX did for us.",
    author: "A.C.O – Marketing & Sales Manager",
    company: "Bin Ablan Foods Industry"
  }
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / 2;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <section ref={ref} className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
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

          {/* Navigation Arrows */}
          <div className={cn(
            'hidden md:flex gap-2 transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                'w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-300',
                canScrollLeft 
                  ? 'hover:bg-primary hover:border-primary hover:text-primary-foreground' 
                  : 'opacity-30 cursor-not-allowed'
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                'w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-300',
                canScrollRight 
                  ? 'hover:bg-primary hover:border-primary hover:text-primary-foreground' 
                  : 'opacity-30 cursor-not-allowed'
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={checkScrollability}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'relative flex-shrink-0 w-[calc(100%-24px)] md:w-[calc(50%-12px)] p-8 rounded-xl bg-card border border-border transition-all duration-500 group hover:border-primary/30 snap-start overflow-hidden',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Subtle diagonal lines pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    currentColor 10px,
                    currentColor 11px
                  )`
                }}
              />
              <Quote className="w-10 h-10 text-primary/20 mb-6 transition-colors duration-300 group-hover:text-primary/40" />
              
              <blockquote className="text-muted-foreground italic leading-relaxed mb-6 text-sm md:text-base">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-border pt-6">
                <p className="font-bold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
