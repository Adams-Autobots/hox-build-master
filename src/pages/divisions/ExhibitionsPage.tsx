import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';
import { FeaturedCaseStudies } from '@/components/divisions/FeaturedCaseStudies';
import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { Boxes, Hammer, Lightbulb, Truck } from 'lucide-react';

const caseStudies = [
  {
    id: 'expo-2020-pavilion',
    title: 'expo 2020 country pavilion',
    location: 'dubai, uae',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
  },
  {
    id: 'gitex-technology',
    title: 'gitex technology stand',
    location: 'dubai world trade centre',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop',
  },
  {
    id: 'automotive-launch',
    title: 'automotive brand launch',
    location: 'abu dhabi, uae',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
  },
];

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

export default function ExhibitionsPage() {
  return (
    <Layout>
      <DivisionHero
        division="exhibitions"
        tagline="hoxexhibitions."
        headline="exhibition builds"
        highlightText="engineered to perform."
        description="We design and fabricate exhibition stands that capture attention and deliver measurable impact. Structural engineering meets brand storytelling."
        ctaText="request exhibition proposal"
      />
      
      <CapabilitiesGrid
        division="exhibitions"
        capabilities={capabilities}
      />

      <ProcessTimeline division="exhibitions" />
      
      <FeaturedCaseStudies
        division="exhibitions"
        caseStudies={caseStudies}
      />
    </Layout>
  );
}
