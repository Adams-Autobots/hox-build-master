import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { ContactCTA } from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <Layout>
      <PageMeta
        title="HOX | Production Excellence Since 2008 | Dubai"
        description="HOX is Dubai's premier production powerhouse delivering precision-built exhibitions, events, retail environments, and interiors since 2008."
        keywords="exhibition stands dubai, event production uae, retail fabrication, interior fit-out, production company dubai"
        image="/og-home.png"
        canonicalPath="/"
      />
      <HeroSection />
      <div className="relative z-10">
        <AboutSection />
        <DivisionsSection />
        <ProjectsSection />
        <ClientMarquee />
        <WhyHoxSection />
        <ContactCTA />
      </div>
    </Layout>
  );
};

export default Index;
