import { Layout } from '@/components/layout/Layout';
import { motion } from 'framer-motion';

import { ResourcesSection } from '@/components/about/ResourcesSection';
import { TestimonialsSection } from '@/components/about/TestimonialsSection';
import { HoverText } from '@/components/ui/HoverText';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

export default function AboutPage() {
  return <Layout>
      <section className="pt-32 pb-12 lg:pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.span 
              className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-primary" />
              About hox
            </motion.span>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              {...headingAnimation}
            >
              <HoverText className="hox-brand">Production </HoverText>
              <span className="text-primary"><HoverText>Excellence</HoverText></span>
              <br />
              <span className="text-muted-foreground/60"><HoverText>since 2008.</HoverText></span>
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              We are a Dubai-born production powerhouse that has grown from a small fabrication workshop into a multi-division company serving the most demanding clients.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold leading-tight mb-8"
              {...headingAnimation}
            >
              <HoverText className="hox-brand">Our </HoverText>
              <span className="text-primary"><HoverText>Story.</HoverText></span>
            </motion.h2>

            <motion.div 
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p>
                Established in 2008, hox has been around. We have a team diverse in skills, knowledge 
                and backgrounds. We are based in the UAE, and have completed projects across the GCC. 
                We have been lucky to have executed over 3000 projects, large and small for some of 
                the biggest names on the globe.
              </p>
              <p>
                Years of planning, investment, and commitment to accomplishing what others can't has 
                made us efficient, effective and given us a base of resources, equipment and capabilities 
                that few are able to match. Our office is a fun place to be, and we would love to meet 
                you - give you a tour, and show you what we are about, and what making the difference 
                means to us.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ResourcesSection />
      
      <TestimonialsSection />
    </Layout>;
}