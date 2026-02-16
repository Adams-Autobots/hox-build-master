import { Layout } from '@/components/layout/Layout';
import { FloatingCTABar } from '@/components/divisions/FloatingCTABar';
import { DivisionHero } from '@/components/divisions/DivisionHero';

import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { DivisionMeta } from '@/components/seo/DivisionMeta';
import { useGalleryImages, useCapabilityImages } from '@/hooks/useGalleryImages';
import { Home, Store, Building2, Hammer } from 'lucide-react';
import heroInteriors from '@/assets/hero-interiors.jpg';
import { VIDEO_URLS } from '@/lib/video-urls';
import { useMemo } from 'react';

const capabilityTitles = [
  { icon: Home, title: 'Residential Fit-outs' },
  { icon: Building2, title: 'Commercial Projects' },
  { icon: Store, title: 'Retail Turnkey' },
  { icon: Hammer, title: 'Bespoke Joinery' },
];

// Removed: hardcoded stock images. Gallery pulls from Supabase only.
const galleryImages: { src: string; alt: string; caption: string; project: string }[] = [];

export default function InteriorsPage() {
  const { data: galleryImagesData } = useGalleryImages('interiors');
  const { data: capabilityImagesData } = useCapabilityImages('interiors');
  
  const capabilities = useMemo(() => {
    return capabilityTitles.map((cap, index) => ({
      ...cap,
      backgroundImage: capabilityImagesData?.[index]?.src || '',
    }));
  }, [capabilityImagesData]);
  
  return (
    <Layout>
      <div data-division="interiors">
        <DivisionMeta
          division="interiors"
          title="Interior Design & Fit-out | HOX Dubai"
          description="Commercial and residential interior fit-outs with bespoke joinery and premium finishes. Offices, restaurants, and luxury homes in UAE."
          images={galleryImagesData}
          ogImage="/og-interiors.png"
          canonicalPath="/divisions/interiors"
        />
        <DivisionHero
          division="interiors"
          tagline="hoxinteriors."
          headline="Interiors crafted"
          highlightText="With precision."
          description="We transform spaces into experiences. From corporate offices to luxury residences, every interior reflects meticulous craftsmanship and design excellence."
          ctaText="Get a Quote"
          heroImage={heroInteriors}
          heroVideo={VIDEO_URLS.heroInteriors}
          cropLeft
        />
        
        <CapabilitiesGrid
          division="interiors"
          capabilities={capabilities}
        />

        <ProcessTimeline division="interiors" />

        <FullPageGallery division="interiors" images={galleryImages} maxImages={16} showViewAll />

        <DivisionFAQ division="interiors" />
      </div>
            <FloatingCTABar division="interiors" divisionColor="hox-green" />
      </Layout>
  );
}
