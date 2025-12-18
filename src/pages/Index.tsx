import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';

import { ContactCTA } from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <Layout>
      <div className="scroll-snap-container">
        <section className="scroll-snap-section">
          <HeroSection />
        </section>

        <section className="scroll-snap-section-auto relative z-10">
          <AboutSection />
        </section>

        <section className="scroll-snap-section-auto">
          <DivisionsSection />
        </section>

        <section className="scroll-snap-section-auto">
          <ProjectsSection />
        </section>

        <section className="scroll-snap-section-auto">
          <ProcessSection />
        </section>

        <section className="scroll-snap-section-auto">
          <WhyHoxSection />
        </section>

        <section className="scroll-snap-section-auto">
          <ContactCTA />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
