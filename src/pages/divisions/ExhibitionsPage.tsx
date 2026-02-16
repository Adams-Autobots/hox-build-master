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
import heroExhibitionsVideo from '@/assets/hero-exhibitions-video-v2.mp4';
import { useMemo } from 'react';

const capabilityTitles = [
  { icon: Boxes, title: 'Custom Stands' },
  { icon: Hammer, title: 'International Agency Support' },
  { icon: Lightbulb, title: 'Unmanaged Regional Expertise' },
  { icon: Truck, title: 'Full Show Contracting' },
];

// Removed: hardcoded stock images. Gallery pulls from Supabase only.
const galleryImages: { src: string; alt: string; caption: string; project: string }[] = [];

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
          ogImage="/og-exhibitions.png"
          canonicalPath="/divisions/exhibitions"
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
