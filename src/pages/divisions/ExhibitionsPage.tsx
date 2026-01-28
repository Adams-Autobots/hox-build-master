import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';

import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { DivisionMeta } from '@/components/seo/DivisionMeta';
import { useGalleryImages, useCapabilityImages } from '@/hooks/useGalleryImages';
import { Boxes, Hammer, Lightbulb, Truck } from 'lucide-react';
import heroExhibitions from '@/assets/hero-exhibitions.jpg';
import heroExhibitionsVideo from '@/assets/hero-exhibitions-video.mp4';
import { useMemo } from 'react';

const capabilityTitles = [
  { icon: Boxes, title: 'Custom Stands' },
  { icon: Hammer, title: 'International Agency Support' },
  { icon: Lightbulb, title: 'Unmanaged Regional Expertise' },
  { icon: Truck, title: 'Full Show Contracting' },
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
  const { data: capabilityImagesData } = useCapabilityImages('exhibitions');
  
  const capabilities = useMemo(() => {
    return capabilityTitles.map((cap, index) => ({
      ...cap,
      backgroundImage: capabilityImagesData?.[index]?.src || '',
    }));
  }, [capabilityImagesData]);
  
  return (
    <Layout>
      <div data-division="exhibitions">
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
          ctaText="Get in touch"
          heroImage={heroExhibitions}
          heroVideo={heroExhibitionsVideo}
        />
        
        <CapabilitiesGrid
          division="exhibitions"
          capabilities={capabilities}
        />

        <ProcessTimeline division="exhibitions" />

        <FullPageGallery division="exhibitions" images={galleryImages} maxImages={16} showViewAll />

        <DivisionFAQ division="exhibitions" />
      </div>
    </Layout>
  );
}
