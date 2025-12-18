import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
import { CertificationsSection } from '@/components/home/CertificationsSection';

import { ContactCTA } from '@/components/home/ContactCTA';
import { CinematicReveal } from '@/components/motion/CinematicReveal';

const Index = () => {
  return (
    <Layout>
      {/* Smooth Scroll Snap Container */}
      <div className="scroll-snap-container">
        <section className="scroll-snap-section">
          <HeroSection />
        </section>

        <CinematicReveal glowColor="red" maskDirection="up" parallaxIntensity={40}>
          <section className="scroll-snap-section-auto cinematic-section relative z-10">
            <AboutSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="blue" maskDirection="left" parallaxIntensity={50}>
          <section className="scroll-snap-section-auto cinematic-section">
            <DivisionsSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="orange" maskDirection="up" parallaxIntensity={60}>
          <section className="scroll-snap-section-auto cinematic-section">
            <ProjectsSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="white" maskDirection="right" parallaxIntensity={35}>
          <section className="scroll-snap-section-auto cinematic-section">
            <ProcessSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="green" maskDirection="up" parallaxIntensity={45}>
          <section className="scroll-snap-section-auto cinematic-section">
            <WhyHoxSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="red" maskDirection="left" parallaxIntensity={30}>
          <section className="scroll-snap-section-auto cinematic-section">
            <CertificationsSection />
          </section>
        </CinematicReveal>


        <CinematicReveal glowColor="red" maskDirection="up" parallaxIntensity={40}>
          <section className="scroll-snap-section-auto cinematic-section">
            <ContactCTA />
          </section>
        </CinematicReveal>
      </div>
    </Layout>
  );
};

export default Index;
