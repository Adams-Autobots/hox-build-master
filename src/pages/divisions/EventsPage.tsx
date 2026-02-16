import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';

import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { DivisionMeta } from '@/components/seo/DivisionMeta';
import { useGalleryImages, useCapabilityImages } from '@/hooks/useGalleryImages';
import { Heart, Users, Theater, Palette } from 'lucide-react';
import heroEvents from '@/assets/hero-events.jpg';
import heroEventsVideo from '@/assets/hero-events-video-v2.mp4';
import { useMemo } from 'react';

const capabilityTitles = [
  { icon: Heart, title: 'Wedding Production' },
  { icon: Users, title: 'Corporate Events' },
  { icon: Theater, title: 'Thematic Production' },
  { icon: Palette, title: 'Branding and Décor' },
];

// Removed: hardcoded stock images. Gallery pulls from Supabase only.
const galleryImages: { src: string; alt: string; caption: string; project: string }[] = [];

export default function EventsPage() {
  const { data: galleryImagesData } = useGalleryImages('events');
  const { data: capabilityImagesData } = useCapabilityImages('events');
  
  const capabilities = useMemo(() => {
    return capabilityTitles.map((cap, index) => ({
      ...cap,
      backgroundImage: capabilityImagesData?.[index]?.src || '',
    }));
  }, [capabilityImagesData]);
  
  return (
    <Layout>
      <div data-division="events">
        <DivisionMeta
          division="events"
          title="Event Production & Stage Design | HOX Dubai"
          description="End-to-end event production from corporate galas to large-scale festivals. Stage design, technical production, and immersive experiences in UAE."
          images={galleryImagesData}
          ogImage="/og-events.png"
          canonicalPath="/divisions/events"
        />
        <DivisionHero
          division="events"
          tagline="hoxevents."
          headline="Events built"
          highlightText="To be remembered."
          description="From corporate galas to product launches, we create immersive event experiences that leave lasting impressions. Precision production meets creative excellence."
          ctaText="Get in touch"
          heroImage={heroEvents}
          heroVideo={heroEventsVideo}
        />
        
        <CapabilitiesGrid
          division="events"
          capabilities={capabilities}
        />

        <ProcessTimeline division="events" />

        <FullPageGallery division="events" images={galleryImages} maxImages={16} showViewAll />

        <DivisionFAQ division="events" />
      </div>
    </Layout>
  );
}
