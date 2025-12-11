import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';
import { FeaturedCaseStudies } from '@/components/divisions/FeaturedCaseStudies';
import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
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

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop', alt: 'Brand design', caption: 'Brand identity system', project: 'Brand Identity' },
  { src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop', alt: 'Digital experience', caption: 'Interactive installation', project: 'Museum' },
  { src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop', alt: 'Content production', caption: 'Campaign photoshoot', project: 'Campaign' },
  { src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&auto=format&fit=crop', alt: 'Design studio', caption: 'Creative process', project: 'Studio' },
  { src: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=1200&auto=format&fit=crop', alt: 'Typography', caption: 'Custom typography', project: 'Type Design' },
  { src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop', alt: 'Video production', caption: 'Commercial shoot', project: 'Video' },
  { src: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&auto=format&fit=crop', alt: 'Motion graphics', caption: 'Motion design', project: 'Animation' },
  { src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&auto=format&fit=crop', alt: 'AR experience', caption: 'Augmented reality', project: 'AR Project' },
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

      <ProcessTimeline division="creative" />

      <FullPageGallery division="creative" images={galleryImages} />

      <DivisionFAQ division="creative" />
      
      <FeaturedCaseStudies
        division="creative"
        caseStudies={caseStudies}
      />
    </Layout>
  );
}
