import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';
import { FeaturedCaseStudies } from '@/components/divisions/FeaturedCaseStudies';
import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { FullPageGallery } from '@/components/divisions/FullPageGallery';
import { DivisionFAQ } from '@/components/divisions/DivisionFAQ';
import { Building2, Sofa, Ruler, Gem } from 'lucide-react';

const caseStudies = [
  {
    id: 'corporate-hq',
    title: 'corporate headquarters',
    location: 'difc, dubai',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
  },
  {
    id: 'restaurant-fitout',
    title: 'signature restaurant',
    location: 'palm jumeirah',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop',
  },
  {
    id: 'luxury-villa',
    title: 'private villa interior',
    location: 'emirates hills',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
  },
];

const capabilities = [
  {
    icon: Building2,
    title: 'commercial interiors',
    description: 'Offices, F&B venues, and hospitality spaces built to brand specifications.',
  },
  {
    icon: Sofa,
    title: 'residential fit-outs',
    description: 'Luxury home interiors with bespoke joinery and premium finishes.',
  },
  {
    icon: Ruler,
    title: 'custom millwork',
    description: 'Precision-crafted furniture, cabinetry, and architectural elements.',
  },
  {
    icon: Gem,
    title: 'premium materials',
    description: 'Access to rare materials, artisan finishes, and exclusive surfaces.',
  },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop', alt: 'Modern office', caption: 'Executive boardroom', project: 'Corporate HQ' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop', alt: 'Restaurant interior', caption: 'Fine dining ambiance', project: 'Restaurant' },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop', alt: 'Luxury villa', caption: 'Private residence', project: 'Villa' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop', alt: 'Living space', caption: 'Open plan living', project: 'Penthouse' },
  { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop', alt: 'Kitchen design', caption: 'Bespoke kitchen', project: 'Residence' },
  { src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&auto=format&fit=crop', alt: 'Bedroom suite', caption: 'Master suite', project: 'Private Home' },
  { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop', alt: 'Office space', caption: 'Collaborative workspace', project: 'Tech Office' },
  { src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop', alt: 'Interior details', caption: 'Custom millwork details', project: 'Boutique Hotel' },
];

export default function InteriorsPage() {
  return (
    <Layout>
      <DivisionHero
        division="interiors"
        tagline="hoxinteriors."
        headline="interiors crafted"
        highlightText="with precision."
        description="We transform spaces into experiences. From corporate offices to luxury residences, every interior reflects meticulous craftsmanship and design excellence."
        ctaText="Request interiors proposal"
      />
      
      <CapabilitiesGrid
        division="interiors"
        capabilities={capabilities}
      />

      <ProcessTimeline division="interiors" />

      <FullPageGallery division="interiors" images={galleryImages} />

      <DivisionFAQ division="interiors" />
      
      <FeaturedCaseStudies
        division="interiors"
        caseStudies={caseStudies}
      />
    </Layout>
  );
}
