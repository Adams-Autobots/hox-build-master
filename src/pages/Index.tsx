import { Layout } from '@/components/layout/Layout';
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
      <HeroSection />
      <AboutSection />
      <DivisionsSection />
      <ProjectsSection />
      <WhyHoxSection />
      <ClientMarquee />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
