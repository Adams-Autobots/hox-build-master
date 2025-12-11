import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const caseStudies: Record<string, {
  title: string;
  location: string;
  category: string;
  overview: string;
  challenge: string;
  solution: string;
  execution: string;
  images: string[];
}> = {
  '1': {
    title: 'Mercedes-Benz Pavilion',
    location: 'Dubai',
    category: 'Exhibition',
    overview: 'A premium exhibition pavilion designed to showcase the Mercedes-Benz brand at a major automotive event in Dubai. The 500sqm space featured integrated lighting systems, premium materials, and interactive zones.',
    challenge: 'The client required a striking architectural presence that would stand out among dozens of competing brands, while maintaining the elegance and precision synonymous with Mercedes-Benz. The build had to be completed in just 3 weeks.',
    solution: 'We designed a double-height structure with dramatic cantilevers and a flowing ceiling installation that drew visitors in. Custom metal fabrication created the precise lines required, while integrated LED systems allowed for dynamic brand storytelling.',
    execution: 'Our in-house metal workshop fabricated all structural elements, while our carpentry team handled premium finishing. CNC-cut panels ensured millimeter precision. The installation was completed in 4 days with a team of 30.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    ],
  },
  '2': {
    title: 'Samsung Experience Booth',
    location: 'GITEX Dubai',
    category: 'Exhibition',
    overview: 'An interactive technology showcase for Samsung at GITEX, featuring product displays, demo stations, and immersive brand experiences across 300sqm.',
    challenge: 'Samsung needed a space that could handle high visitor traffic while creating memorable product interactions. The technology integration had to be seamless and reliable throughout the 5-day event.',
    solution: 'We created distinct zones for different product categories, each with custom fixtures designed for the specific devices. Interactive elements and AV systems were built into the architecture.',
    execution: 'Pre-fabricated modules allowed for rapid assembly. All electrical and AV systems were pre-tested in our workshop. On-site assembly took just 3 days.',
    images: [
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    ],
  },
};

export default function CaseStudyDetailPage() {
  const { id } = useParams();
  const study = caseStudies[id || '1'] || caseStudies['1'];

  return (
    <Layout>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          <span className="text-sm font-medium text-primary uppercase tracking-wider block mb-4">{study.category}</span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 hox-brand">{study.title}</h1>
          <p className="text-xl text-muted-foreground">{study.location}</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="aspect-video overflow-hidden rounded-lg mb-16">
            <img src={study.images[0]} alt={study.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 hox-brand">overview</h2>
              <p className="text-muted-foreground leading-relaxed">{study.overview}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 hox-brand">challenge</h2>
              <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4 hox-brand">solution</h2>
              <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 hox-brand">execution</h2>
              <p className="text-muted-foreground leading-relaxed">{study.execution}</p>
            </div>
          </div>

          {study.images.length > 1 && (
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {study.images.slice(1).map((img, i) => (
                <div key={i} className="aspect-video overflow-hidden rounded-lg">
                  <img src={img} alt={`${study.title} ${i + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 hox-brand">ready to start your project?</h3>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                request a proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
