import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';

import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { DivisionMeta } from '@/components/seo/DivisionMeta';
import { useGalleryImages, useCapabilityImages } from '@/hooks/useGalleryImages';
import { Store, Palette, Package, Wrench } from 'lucide-react';
import heroRetail from '@/assets/hero-retail.jpg';
import heroRetailVideo from '@/assets/hero-retail-video.mp4';
import retailDisplaysCard from '@/assets/retail-displays-card.png';
import { useMemo } from 'react';

const capabilityTitles = [
  { icon: Store, title: 'Mall Activations' },
  { icon: Package, title: 'Retail Displays' },
  { icon: Palette, title: 'Signage and Branding' },
  { icon: Wrench, title: 'Retail Interiors' },
];

// Removed: hardcoded stock images. Gallery pulls from Supabase only.
const galleryImages: { src: string; alt: string; caption: string; project: string }[] = [];

export default function RetailPage() {
  const { data: galleryImagesData } = useGalleryImages('retail');
  const { data: capabilityImagesData } = useCapabilityImages('retail');
  
  const capabilities = useMemo(() => {
    return capabilityTitles.map((cap, index) => ({
      ...cap,
      backgroundImage: index === 1 ? retailDisplaysCard : (capabilityImagesData?.[index]?.src || ''),
    }));
  }, [capabilityImagesData]);
  
  return (
    <Layout>
      <div data-division="retail">
        <DivisionMeta
          division="retail"
          title="Retail Store Design & Fit-out | HOX Dubai"
          description="Turnkey retail builds from flagship stores to pop-up kiosks. Visual merchandising, custom fixtures, and multi-location rollouts in UAE."
          images={galleryImagesData}
          ogImage="/og-retail.png"
          canonicalPath="/divisions/retail"
        />
        <DivisionHero
          division="retail"
          tagline="hoxretail."
          headline="Retail spaces"
          highlightText="That convert."
          description="We build retail environments that drive foot traffic and conversions. From flagship stores to pop-up activations, every detail is designed to sell."
          ctaText="Get in touch"
          heroImage={heroRetail}
          heroVideo={heroRetailVideo}
        />
        
        <CapabilitiesGrid
          division="retail"
          capabilities={capabilities}
        />

        <ProcessTimeline division="retail" />

        <FullPageGallery division="retail" images={galleryImages} maxImages={16} showViewAll />

        <DivisionFAQ division="retail" />
      </div>
    </Layout>
  );
}
