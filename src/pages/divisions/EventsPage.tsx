import { Layout } from '@/components/layout/Layout';
import { DivisionHero } from '@/components/divisions/DivisionHero';
import { FeaturedCaseStudies } from '@/components/divisions/FeaturedCaseStudies';
import { CapabilitiesGrid } from '@/components/divisions/CapabilitiesGrid';
import { ProcessTimeline } from '@/components/divisions/ProcessTimeline';
import { Calendar, Users, Sparkles, Settings } from 'lucide-react';

const caseStudies = [
  {
    id: 'corporate-gala',
    title: 'annual corporate gala',
    location: 'atlantis, dubai',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
  },
  {
    id: 'product-launch',
    title: 'luxury product launch',
    location: 'downtown dubai',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&auto=format&fit=crop',
  },
  {
    id: 'conference-setup',
    title: 'tech conference setup',
    location: 'madinat jumeirah',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
  },
];

const capabilities = [
  {
    icon: Calendar,
    title: 'event production',
    description: 'End-to-end event builds from concept to execution for corporate and public events.',
  },
  {
    icon: Sparkles,
    title: 'stage & set design',
    description: 'Custom stage builds, scenic elements, and immersive environments that wow.',
  },
  {
    icon: Users,
    title: 'large-scale venues',
    description: 'From intimate gatherings to 10,000+ attendee events—we scale seamlessly.',
  },
  {
    icon: Settings,
    title: 'technical production',
    description: 'Audio, video, lighting, and rigging expertise for flawless technical delivery.',
  },
];

export default function EventsPage() {
  return (
    <Layout>
      <DivisionHero
        division="events"
        tagline="hoxevents."
        headline="events built"
        highlightText="to be remembered."
        description="From corporate galas to product launches, we create immersive event experiences that leave lasting impressions. Precision production meets creative excellence."
        ctaText="request event proposal"
      />
      
      <CapabilitiesGrid
        division="events"
        capabilities={capabilities}
      />

      <ProcessTimeline division="events" />
      
      <FeaturedCaseStudies
        division="events"
        caseStudies={caseStudies}
      />
    </Layout>
  );
}
