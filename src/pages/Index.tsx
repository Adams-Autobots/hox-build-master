import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { WhyHoxVideoSection } from '@/components/home/WhyHoxVideoSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { ContactCTA } from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <Layout>
      <PageMeta
        title="HOX | Production Excellence Since 2008 | Dubai"
        description="Dubai's premier production powerhouse delivering precision-built exhibitions, events, retail environments, and interiors since 2008."
        keywords="exhibition stands dubai, event production uae, retail fabrication, interior fit-out"
        image="/og-home.png"
        canonicalPath="/"
      />
      <div className="scroll-snap-container">
        <section className="scroll-snap-section">
          <HeroSection />
        </section>

        <section className="scroll-snap-section-auto relative z-10">
          <AboutSection />
        </section>

        <section className="scroll-snap-section-auto relative z-10 bg-background">
          <DivisionsSection />
        </section>

        <section className="scroll-snap-section-auto relative z-10 bg-background">
          <ProjectsSection />
        </section>

        <section className="scroll-snap-section-auto relative z-10 bg-background">
          <ClientMarquee />
        </section>

        <section className="scroll-snap-section">
          <WhyHoxVideoSection />
        </section>

        <section className="scroll-snap-section-auto relative z-10">
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
