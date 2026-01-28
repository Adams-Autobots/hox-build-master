import { Layout } from '@/components/layout/Layout';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { LeadershipSection } from '@/components/about/LeadershipSection';
import { ResourcesSection } from '@/components/about/ResourcesSection';
import { TestimonialsSection } from '@/components/about/TestimonialsSection';
import { HoverText } from '@/components/ui/HoverText';
export default function AboutPage() {
  const {
    ref,
    isVisible
  } = useScrollReveal<HTMLElement>();
  return <Layout>
      <section className="pt-32 pb-12 lg:pb-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6">
              <span className="w-8 h-px bg-primary" />
              About hox
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <HoverText className="hox-brand">Production </HoverText>
              <span className="text-primary"><HoverText>Excellence</HoverText></span>
              <br />
              <span className="text-muted-foreground/60"><HoverText>since 2008.</HoverText></span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">We are a Dubai-born production powerhouse that has grown from a small fabrication workshop into a multi-division company serving the most demanding clients.</p>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
            <h2 className={cn('text-4xl md:text-5xl font-bold leading-tight mb-8 transition-all duration-700', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
              <HoverText className="hox-brand">Our </HoverText>
              <span className="text-primary"><HoverText>Story.</HoverText></span>
            </h2>

            <div className={cn('space-y-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-150', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <p>
                HOX was founded with a simple belief: that great production requires complete control 
                over every stage of the process. From day one, we invested in building in-house 
                capabilities that would allow us to deliver without compromise.
              </p>
              <p>
                Today, we operate a state-of-the-art facility in Al Quoz with dedicated workshops 
                for metal fabrication, carpentry, CNC machining, and finishing. Our team of 200+ 
                specialists handles everything from design to installation.
              </p>
              <p>
                We've partnered with global brands, leading developers, and creative agencies to 
                deliver some of the region's most memorable builds — from Expo 2020 pavilions to 
                luxury retail environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ResourcesSection />
      <LeadershipSection />
      <TestimonialsSection />
    </Layout>;
}