import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';
import { FeaturedCaseStudies } from '@/components/divisions/FeaturedCaseStudies';
import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { Store, Palette, Package, Wrench } from 'lucide-react';

const caseStudies = [
  {
    id: 'luxury-flagship',
    title: 'luxury brand flagship',
    location: 'mall of the emirates',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop',
  },
  {
    id: 'pop-up-retail',
    title: 'seasonal pop-up store',
    location: 'dubai mall',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&auto=format&fit=crop',
  },
  {
    id: 'brand-kiosk',
    title: 'brand activation kiosk',
    location: 'city centre mirdif',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&auto=format&fit=crop',
  },
];

const capabilities = [
  {
    icon: Store,
    title: 'store fit-outs',
    description: 'Complete retail builds from shell to fully operational stores, delivered turnkey.',
  },
  {
    icon: Palette,
    title: 'visual merchandising',
    description: 'Display systems, signage, and fixtures that elevate brand presence in-store.',
  },
  {
    icon: Package,
    title: 'pop-up & kiosks',
    description: 'Fast-deploy retail solutions for seasonal campaigns and brand activations.',
  },
  {
    icon: Wrench,
    title: 'rollout programs',
    description: 'Multi-location retail rollouts with consistent quality and tight timelines.',
  },
];

export default function RetailPage() {
  return (
    <Layout>
      <DivisionHero
        division="retail"
        tagline="hoxretail."
        headline="retail spaces"
        highlightText="that convert."
        description="We build retail environments that drive foot traffic and conversions. From flagship stores to pop-up activations, every detail is designed to sell."
        ctaText="request retail proposal"
      />
      
      <CapabilitiesGrid
        division="retail"
        capabilities={capabilities}
      />

      <ProcessTimeline division="retail" />
      
      <FeaturedCaseStudies
        division="retail"
        caseStudies={caseStudies}
      />
    </Layout>
  );
}
