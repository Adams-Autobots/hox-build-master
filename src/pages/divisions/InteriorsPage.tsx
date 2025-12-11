import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';
import { FeaturedCaseStudies } from '@/components/divisions/FeaturedCaseStudies';
import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
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

export default function InteriorsPage() {
  return (
    <Layout>
      <DivisionHero
        division="interiors"
        tagline="hoxinteriors."
        headline="interiors crafted"
        highlightText="with precision."
        description="We transform spaces into experiences. From corporate offices to luxury residences, every interior reflects meticulous craftsmanship and design excellence."
        ctaText="request interiors proposal"
      />
      
      <CapabilitiesGrid
        division="interiors"
        capabilities={capabilities}
      />
      
      <FeaturedCaseStudies
        division="interiors"
        caseStudies={caseStudies}
      />
    </Layout>
  );
}
