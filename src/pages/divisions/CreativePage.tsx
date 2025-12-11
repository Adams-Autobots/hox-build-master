import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';
import { FeaturedCaseStudies } from '@/components/divisions/FeaturedCaseStudies';
import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { Pen, Monitor, Film, Zap } from 'lucide-react';

const caseStudies = [
  {
    id: 'brand-identity',
    title: 'complete brand identity',
    location: 'regional campaign',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
  },
  {
    id: 'digital-experience',
    title: 'interactive digital experience',
    location: 'museum of the future',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop',
  },
  {
    id: 'campaign-content',
    title: 'campaign content production',
    location: 'multi-platform launch',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop',
  },
];

const capabilities = [
  {
    icon: Pen,
    title: 'brand strategy',
    description: 'Visual identity, messaging, and brand guidelines that resonate with audiences.',
  },
  {
    icon: Monitor,
    title: 'digital design',
    description: 'UI/UX, web experiences, and digital touchpoints that engage and convert.',
  },
  {
    icon: Film,
    title: 'content production',
    description: 'Photo, video, and motion graphics content for campaigns and brand storytelling.',
  },
  {
    icon: Zap,
    title: 'interactive experiences',
    description: 'AR, VR, and interactive installations that create memorable moments.',
  },
];

export default function CreativePage() {
  return (
    <Layout>
      <DivisionHero
        division="creative"
        tagline="hoxcreative."
        headline="creative that"
        highlightText="moves people."
        description="We blend strategy, design, and technology to create brand experiences that connect. From identity systems to immersive digital experiences."
        ctaText="request creative proposal"
      />
      
      <CapabilitiesGrid
        division="creative"
        capabilities={capabilities}
      />
      
      <FeaturedCaseStudies
        division="creative"
        caseStudies={caseStudies}
      />
    </Layout>
  );
}
