import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { HoverText } from '@/components/ui/HoverText';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

const testimonials = [
  {
    quote: "Working with House of Exhibitions really does relieve the stress of exhibition planning and preparation.\n\nFrom designing, fabricating and installing shopping mall promotional kiosks to creating impactful but practical state-of-the-art exhibition stands, House of Exhibitions go the extra mile to provide hands-on professional services which meet our individual requirements.",
    author: "C.F Group Marketing and PR Manager",
    company: "Kleindienst Group"
  },
  {
    quote: "We came to HOX seeking total refurbishment of the interiors of our centre (particularly the reception area) and they certainly delivered.\n\nDespite the structure limitations of the leaded walls, the numerous requirements of DHA and the budget constraints, they managed to transform this dark worn-down space into a bright, modern diagnostic centre.\n\nThey are a great team to work with who responded immediately to all requests and continuously kept updated us with progress. We would not hesitate to recommend them to anyone seeking contemporary interior solutions.",
    author: "Dr. H.A",
    company: "Megascan Clinic"
  },
  {
    quote: "We have been working with HOX for 7 years as our build partner of choice in Dubai. They have provided us with an excellent build service for a multiple of projects of all scales.\n\nHOX are fully supportive on site and their 'nothing is too much trouble' attitude ensures that we constantly return to work with them. Our exacting standards and specifications are always delivered on time and on budget for even our most complex designs.\n\nOur excellent business relationship has grown over the years and is based on trust, integrity and honesty. Values that align perfectly with Design Original. We look forward to our next project together.",
    author: "W.D – Managing Director",
    company: "Design Original"
  },
  {
    quote: "\"Relax… go home and enjoy your weekend… we still have a lot of time\" — that was what HOX told me when we finished our first meeting.\n\nThat morning we had just signed a contract for a gigantic stand at Gulfood 2016, with less than 15 days left to the opening of the show.\n\nWe actually ended up to be the first company in the concourse to have its stand ready! And boy was it a wicked stand! We at Bin Ablan will never forget the favor HOX did for us.",
    author: "A.C.O – Marketing & Sales Manager",
    company: "Bin Ablan Foods Industry"
  }
];

export function TestimonialsSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Card width estimation: ~450px on desktop, ~350px on mobile + 24px gap
  const cardWidth = 470; // approximate card width + gap
  const totalWidth = cardWidth * testimonials.length;

  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.span 
              className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-primary" />
              Client Voices
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              {...headingAnimation}
            >
              <span className="hox-brand"><HoverText>What our clients</HoverText> </span>
              <span className="text-primary"><HoverText>Say.</HoverText></span>
            </motion.h2>
          </div>

        </div>

        {/* Continuous Scroll Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="overflow-hidden"
        >
          <motion.div
            className="flex gap-6"
            animate={{
              x: isPaused ? undefined : [0, -totalWidth],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-[340px] md:w-[450px] p-8 rounded-xl bg-card border border-border transition-all duration-500 group hover:border-primary/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % testimonials.length) * 0.1 }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6 transition-colors duration-300 group-hover:text-primary/40" />
              
              <blockquote className="text-muted-foreground italic leading-loose mb-6 text-xs md:text-sm whitespace-pre-line">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t border-border pt-6">
                <p className="font-bold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
