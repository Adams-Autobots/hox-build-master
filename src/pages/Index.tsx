import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { ContactCTA } from '@/components/home/ContactCTA';
import { MagneticCursor } from '@/components/ui/MagneticCursor';

const Index = () => {
  return (
    <Layout>
      <MagneticCursor />
      
      {/* Smooth Scroll Snap Container */}
      <div className="scroll-snap-container">
        <section className="scroll-snap-section">
          <HeroSection />
        </section>
        <section className="scroll-snap-section-auto">
          <AboutSection />
        </section>
        <section className="scroll-snap-section-auto">
          <DivisionsSection />
        </section>
        <section className="scroll-snap-section-auto">
          <ProjectsSection />
        </section>
        <section className="scroll-snap-section-auto">
          <WhyHoxSection />
        </section>
        <section className="scroll-snap-section-auto">
          <ClientMarquee />
        </section>
        <section className="scroll-snap-section-auto">
          <ContactCTA />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
