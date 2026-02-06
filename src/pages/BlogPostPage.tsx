import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { HoverText } from '@/components/ui/HoverText';

const blogPosts: Record<string, {
  title: string;
  date: string;
  category: string;
  content: string[];
  image: string;
}> = {
  'exhibition-design-trends-2024': {
    title: 'Exhibition Design Trends Shaping 2024',
    date: '15 Dec 2024',
    category: 'Exhibitions',
    content: [
      'The exhibition industry continues to evolve at a rapid pace, with new technologies and design philosophies reshaping how brands connect with their audiences. As we move through 2024, several key trends are defining the landscape of exhibition design.',
      'Sustainability has moved from a nice-to-have to a must-have. Leading brands are now demanding eco-friendly materials, modular designs that can be reused across multiple events, and carbon-neutral production processes. At HOX, we\'ve invested heavily in sustainable fabrication methods, from recycled metals to biodegradable finishing materials.',
      'Immersive technology integration is another major trend. AR and VR experiences are becoming standard features, allowing visitors to interact with products and brands in entirely new ways. The key is seamless integration—technology should enhance the experience, not distract from it.',
      'Finally, we\'re seeing a return to craftsmanship. In an age of digital everything, there\'s a growing appreciation for precision engineering, quality materials, and attention to detail. Visitors can feel the difference between mass-produced elements and custom-fabricated pieces.',
    ],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  },
  'sustainable-event-production': {
    title: 'Sustainable Event Production: A Complete Guide',
    date: '8 Dec 2024',
    category: 'Events',
    content: [
      'Event production is undergoing a sustainability revolution. With climate change at the forefront of global concerns, brands and event organizers are rethinking every aspect of their productions to minimize environmental impact.',
      'The first step is material selection. Traditional event builds often rely on single-use materials that end up in landfills. By switching to modular, reusable systems and sustainable materials, we can dramatically reduce waste without compromising on quality or impact.',
      'Energy efficiency is equally important. LED lighting, solar-powered installations, and smart energy management systems can cut power consumption by up to 60%. These aren\'t just good for the planet—they often reduce costs too.',
      'Transportation and logistics present another opportunity. By fabricating locally and planning efficient logistics, we can reduce the carbon footprint of getting everything to the venue. At HOX, our Dubai-based facilities allow us to serve the entire Gulf region with minimal transportation impact.',
    ],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  },
  'retail-interior-psychology': {
    title: 'The Psychology of Retail Interior Design',
    date: '28 Nov 2024',
    category: 'Retail',
    content: [
      'Great retail design isn\'t just about aesthetics—it\'s about understanding human psychology and creating spaces that guide customer behavior while delivering memorable experiences.',
      'The journey begins at the entrance. The transition zone, or "decompression area," gives customers time to adjust from the outside environment. This is where they form their first impressions, so lighting, materials, and spatial design must work together to set the right tone.',
      'Flow and layout are critical. Research shows that customers naturally turn right when entering a store, so premium products and key displays should be positioned accordingly. Sightlines, aisle widths, and product placement all influence how customers navigate and what they discover.',
      'Finally, sensory design ties everything together. The right lighting can make products look more desirable. Acoustic design affects how long customers stay. Even the tactile quality of fixtures and surfaces influences perception of brand quality.',
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  },
  'custom-fabrication-excellence': {
    title: 'Custom Fabrication: From Concept to Reality',
    date: '15 Nov 2024',
    category: 'Fabrication',
    content: [
      'Behind every stunning exhibition stand, every premium retail environment, and every memorable event installation lies a story of precision engineering and master craftsmanship. At HOX, custom fabrication is at the heart of everything we do.',
      'Our process begins with understanding the vision. Working closely with designers and clients, we translate concepts into detailed technical drawings. This is where engineering meets creativity—figuring out how to make the impossible possible while maintaining quality and meeting deadlines.',
      'Our in-house capabilities span metal fabrication, CNC routing, joinery, and finishing. Having everything under one roof means we can control quality at every stage and respond quickly to changes. When a client needs a last-minute modification, we can make it happen.',
      'The final step is installation. Our teams are trained to handle complex builds with precision and efficiency. Whether it\'s a 3-day exhibition install or a 3-month retail fit-out, we approach every project with the same commitment to excellence.',
    ],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80',
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts[slug || 'exhibition-design-trends-2024'] || blogPosts['exhibition-design-trends-2024'];

  return (
    <Layout>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <span className="text-sm font-medium text-primary uppercase tracking-wider block mb-4">{post.category}</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 hox-brand">
            <HoverText>{post.title}</HoverText>
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="aspect-video overflow-hidden rounded-lg mb-16">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-border text-center">
              <h3 className="text-2xl font-bold mb-6 hox-brand">ready to start your project?</h3>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  request a proposal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}