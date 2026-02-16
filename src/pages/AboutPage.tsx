import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { motion } from 'framer-motion';

import { ResourcesSection } from '@/components/about/ResourcesSection';
import { TestimonialsSection } from '@/components/about/TestimonialsSection';
import { HoverText } from '@/components/ui/HoverText';
import founderPhoto from '@/assets/founder-adam-nicholson.png';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

export default function AboutPage() {
  return <Layout>
      <PageMeta
        title="About HOX | Our Story & Team | Dubai Production Company"
        description="Learn about HOX - Dubai's production powerhouse since 2008. Discover our story, capabilities, and commitment to design & build excellence."
        keywords="about hox, dubai production company, exhibition company uae, event production team"
        image="/favicon.png"
        canonicalPath="/about"
      />
      <section className="pt-32 pb-12 lg:pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.span 
              className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
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

      {/* Founder Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-[320px_1fr] lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
            {/* Photo */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted border border-border/30 relative">
                <img
                  src={founderPhoto}
                  alt="Adam Nicholson — Founder, HOX Creative"
                loading="lazy"
                  loading="lazy"
                    className="w-full h-full object-cover object-top grayscale brightness-75 contrast-110"
                />
                {/* Subtle dark overlay — keeps it understated */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-background/20" />
              </div>
              {/* Accent line */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-primary/30 rounded-br-lg" />
            </motion.div>

            {/* Bio */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-6">
                <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                Founder
              </span>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-2">
                <HoverText>Adam Nicholson</HoverText>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Owner &amp; Managing Director
              </p>

              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Born and raised in the UAE, Adam founded HOX in 2008 to bring the reliability and 
                  quality of international production standards to a market that rewards ambition. 
                  What started as a small exhibition workshop in Al Quoz has grown into a multi-division 
                  production company with 50+ staff across four specialised divisions.
                </p>
                <p>
                  With an MBA in marketing and a background in property design and development, Adam 
                  leads from the front — on the workshop floor, on client sites, and at the sharp end 
                  of every deadline. 17 years, 3,000+ projects, and a commitment to doing it better 
                  every time.
                </p>
              </div>

              <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-border/30">
                <div>
                  <span className="text-3xl font-bold text-primary">17+</span>
                  <p className="text-sm text-muted-foreground mt-1">Years in UAE</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">3,000+</span>
                  <p className="text-sm text-muted-foreground mt-1">Projects Delivered</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <p className="text-sm text-muted-foreground mt-1">Team Members</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ResourcesSection />
      
      <TestimonialsSection />
    </Layout>;
}