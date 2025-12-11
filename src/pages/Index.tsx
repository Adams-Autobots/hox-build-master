import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
import { ClientsSection } from '@/components/home/ClientsSection';
import { ContactCTA } from '@/components/home/ContactCTA';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <DivisionsSection />
      <ProjectsSection />
      <WhyHoxSection />
      <ClientsSection />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
