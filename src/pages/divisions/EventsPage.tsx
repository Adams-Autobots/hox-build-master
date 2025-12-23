import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';

import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { DivisionMeta } from '@/components/seo/DivisionMeta';
import { useGalleryImages } from '@/hooks/useGalleryImages';
import { Heart, Users, Theater, Palette } from 'lucide-react';
import heroEvents from '@/assets/hero-events.jpg';


const capabilities = [
  {
    icon: Heart,
    title: 'Wedding Production',
    description: 'Complete wedding planning and production services',
    backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
  },
  {
    icon: Users,
    title: 'Corporate Events',
    description: 'Conferences, galas, product launches and team events',
    backgroundImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
  },
  {
    icon: Theater,
    title: 'Stage and Set',
    description: 'Custom stage builds and scenic design',
    backgroundImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop',
  },
  {
    icon: Palette,
    title: 'Branding and Décor',
    description: 'Event styling, theming and branded environments',
    backgroundImage: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop',
  },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop', alt: 'Corporate gala', caption: 'Grand ballroom setup', project: 'Annual Gala' },
  { src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&auto=format&fit=crop', alt: 'Product launch', caption: 'Luxury unveiling moment', project: 'Product Launch' },
  { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop', alt: 'Conference hall', caption: 'Main stage lighting', project: 'Tech Conference' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop', alt: 'Concert setup', caption: 'Festival stage build', project: 'Music Festival' },
  { src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&auto=format&fit=crop', alt: 'Award ceremony', caption: 'Award show production', project: 'Awards Night' },
  { src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&auto=format&fit=crop', alt: 'Outdoor event', caption: 'Beach event installation', project: 'Beach Party' },
  { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop', alt: 'Concert lights', caption: 'Dynamic lighting design', project: 'Live Concert' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&auto=format&fit=crop', alt: 'Stage setup', caption: 'Immersive stage experience', project: 'Brand Event' },
];

export default function EventsPage() {
  const { data: galleryImagesData } = useGalleryImages('events');
  
  return (
    <Layout>
      <DivisionMeta
        division="events"
        title="Event Production & Stage Design | HOX Dubai"
        description="End-to-end event production from corporate galas to large-scale festivals. Stage design, technical production, and immersive experiences in UAE."
        images={galleryImagesData}
      />
      <DivisionHero
        division="events"
        tagline="hoxevents."
        headline="Events built"
        highlightText="To be remembered."
        description="From corporate galas to product launches, we create immersive event experiences that leave lasting impressions. Precision production meets creative excellence."
        ctaText="Request event proposal"
        heroImage={heroEvents}
      />
      
      <CapabilitiesGrid
        division="events"
        capabilities={capabilities}
      />

      <ProcessTimeline division="events" />

      <FullPageGallery division="events" images={galleryImages} maxImages={16} showViewAll />

      <DivisionFAQ division="events" />
      
    </Layout>
  );
}
