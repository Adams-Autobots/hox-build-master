import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { DivisionsSection } from '@/components/home/DivisionsSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyHoxSection } from '@/components/home/WhyHoxSection';
import { CertificationsSection } from '@/components/home/CertificationsSection';
import { ClientMarquee } from '@/components/home/ClientMarquee';
import { ContactCTA } from '@/components/home/ContactCTA';
import { CinematicReveal } from '@/components/motion/CinematicReveal';
import { WorkerSilhouettes } from '@/components/motion/WorkerSilhouettes';

const Index = () => {
  return (
    <Layout>
      <WorkerSilhouettes />
      {/* Smooth Scroll Snap Container */}
      <div className="scroll-snap-container">
        <section className="scroll-snap-section">
          <HeroSection />
        </section>

        <CinematicReveal glowColor="red" maskDirection="up" parallaxIntensity={40} enableSpray sprayDirection="left" sprayIntensity="medium">
          <section className="scroll-snap-section-auto cinematic-section">
            <AboutSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="blue" maskDirection="left" parallaxIntensity={50} enableSpray sprayDirection="right" sprayIntensity="medium">
          <section className="scroll-snap-section-auto cinematic-section">
            <DivisionsSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="orange" maskDirection="up" parallaxIntensity={60} enableSpray sprayDirection="left" sprayIntensity="subtle">
          <section className="scroll-snap-section-auto cinematic-section">
            <ProjectsSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="white" maskDirection="right" parallaxIntensity={35} enableSpray sprayDirection="right" sprayIntensity="subtle">
          <section className="scroll-snap-section-auto cinematic-section">
            <ProcessSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="green" maskDirection="up" parallaxIntensity={45} enableSpray sprayDirection="left" sprayIntensity="medium">
          <section className="scroll-snap-section-auto cinematic-section">
            <WhyHoxSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="red" maskDirection="left" parallaxIntensity={30} enableSpray sprayDirection="right" sprayIntensity="subtle">
          <section className="scroll-snap-section-auto cinematic-section">
            <CertificationsSection />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="white" maskDirection="up" parallaxIntensity={25}>
          <section className="scroll-snap-section-auto cinematic-section">
            <ClientMarquee />
          </section>
        </CinematicReveal>

        <CinematicReveal glowColor="red" maskDirection="up" parallaxIntensity={40} enableSpray sprayDirection="both" sprayIntensity="intense">
          <section className="scroll-snap-section-auto cinematic-section">
            <ContactCTA />
          </section>
        </CinematicReveal>
      </div>
    </Layout>
  );
};

export default Index;
