import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
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
      <div className="relative z-10 bg-background">
        {/* 1. Intro — who we are, stats */}
        <AboutSection />
        {/* 2. Case studies — the work, named and featured */}
        <FeaturedProjects />
        {/* 3. Divisions — the four areas */}
        <DivisionsSection />
        {/* 4. Social proof — client names */}
        <ClientMarquee />
        {/* 5. Philosophy — why choose HOX */}
        <WhyHoxSection />
        {/* 6. Call to action */}
        <ContactCTA />
      </div>
    </Layout>
  );
};

export default Index;
