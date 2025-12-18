import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
import { CertificationsSection } from '@/components/home/CertificationsSection';
import { ContactCTA } from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <Layout>
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
          <ProcessSection />
        </section>

        <section className="scroll-snap-section-auto">
          <WhyHoxSection />
        </section>

        <section className="scroll-snap-section-auto">
          <CertificationsSection />
        </section>

        <section className="scroll-snap-section-auto">
          <ContactCTA />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
