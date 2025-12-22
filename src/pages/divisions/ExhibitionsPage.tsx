import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';

import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { DivisionMeta } from '@/components/seo/DivisionMeta';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { Boxes, Hammer, Lightbulb, Truck } from 'lucide-react';
import heroExhibitions from '@/assets/hero-exhibitions.jpg';


const capabilities = [
  {
    icon: Boxes,
    title: 'custom structures',
    description: 'Double-decker builds, pavilions, and bespoke exhibition architecture engineered for impact.',
  },
  {
    icon: Hammer,
    title: 'in-house fabrication',
    description: 'Metal, carpentry, acrylic, and composite materials all manufactured under one roof.',
  },
  {
    icon: Lightbulb,
    title: 'integrated AV & lighting',
    description: 'Complete technical solutions including LED walls, projection mapping, and smart lighting.',
  },
  {
    icon: Truck,
    title: 'full logistics',
    description: 'From transport to installation and dismantle—seamless project delivery every time.',
  },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop', alt: 'Exhibition hall', caption: 'Grand pavilion entrance', project: 'Expo 2020' },
  { src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&auto=format&fit=crop', alt: 'Tech exhibition', caption: 'Interactive display zone', project: 'GITEX' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop', alt: 'Automotive display', caption: 'Premium vehicle showcase', project: 'Auto Launch' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop', alt: 'Modern booth', caption: 'Corporate exhibition stand', project: 'Corporate' },
  { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop', alt: 'Trade show', caption: 'Multi-level structure', project: 'Trade Fair' },
  { src: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&auto=format&fit=crop', alt: 'Exhibition lighting', caption: 'Dynamic LED installation', project: 'Tech Summit' },
  { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop', alt: 'Conference setup', caption: 'Main stage construction', project: 'Conference' },
  { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop', alt: 'Event space', caption: 'Immersive brand experience', project: 'Brand Activation' },
];

export default function ExhibitionsPage() {
  const { data: galleryImagesData } = useGalleryImages('exhibitions');
  
  return (
    <Layout>
      <DivisionMeta
        division="exhibitions"
        title="Exhibition Stand Design & Build | HOX Dubai"
        description="Custom exhibition stands engineered for impact. Double-decker builds, pavilions, and bespoke architecture for trade shows and expos in UAE."
        images={galleryImagesData}
      />
      <DivisionHero
        division="exhibitions"
        tagline="hoxexhibitions."
        headline="Exhibition builds"
        highlightText="Engineered to perform."
        description="We design and fabricate exhibition stands that capture attention and deliver measurable impact. Structural engineering meets brand storytelling."
        ctaText="Request exhibition proposal"
        heroImage={heroExhibitions}
      />
      
      <CapabilitiesGrid
        division="exhibitions"
        capabilities={capabilities}
      />

      <ProcessTimeline division="exhibitions" />

      <FullPageGallery division="exhibitions" images={galleryImages} maxImages={16} showViewAll />

      <DivisionFAQ division="exhibitions" />
      
    </Layout>
  );
}
