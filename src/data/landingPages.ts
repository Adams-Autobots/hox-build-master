export interface LandingPage {
  slug: string;
  division: 'exhibitions' | 'events' | 'retail' | 'interiors';
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  headline: string;
  highlightText: string;
  intro: string;
  heroImage: string;
  galleryImages: string[];
  services: { title: string; description: string }[];
  stats: { value: string; label: string }[];
  ctaHeadline: string;
  ctaDescription: string;
}

const G = 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/gallery-photos';

export const landingPages: LandingPage[] = [
  {
    slug: 'exhibition-stands-dubai',
    division: 'exhibitions',
    metaTitle: 'Exhibition Stands Dubai | Custom Stand Design & Build | HOX Creative',
    metaDescription: 'Custom exhibition stand design and build in Dubai. From 9sqm kiosks to 300sqm pavilions. In-house workshop, CNC fabrication, full project management. Since 2008.',
    keywords: 'exhibition stands dubai, custom exhibition stand, trade show booth dubai, exhibition stand builder uae, DWTC stand contractor',
    headline: 'Exhibition Stands',
    highlightText: 'Dubai',
    heroImage: `${G}/exhibitions/1766404973821-1.webp`,
    galleryImages: [
      `${G}/exhibitions/1766404975454-2.webp`,
      `${G}/exhibitions/1766404977088-3.webp`,
      `${G}/exhibitions/1766404981014-6.webp`,
      `${G}/exhibitions/1766405000655-18.webp`,
    ],
    intro: 'We design, fabricate, and install exhibition stands across the UAE. From compact kiosks to multi-storey pavilions, every build is engineered in our Al Quoz workshop and delivered by our own crew. No subcontracting. No surprises.',
    services: [
      { title: 'Custom Stand Design & Build', description: 'Purpose-built exhibition environments from concept through 3D visualisation to on-site installation.' },
      { title: 'International Agency Support', description: 'Production partner for overseas exhibition companies needing a reliable UAE workshop and crew.' },
      { title: 'Shell Scheme Upgrades', description: 'Transform standard shell scheme packages into branded experiences with walls, graphics, and lighting.' },
      { title: 'Show Contracting', description: 'Full show management including logistics, utilities, crew, and on-site technical support.' },
    ],
    stats: [
      { value: '1,000+', label: 'Stands built' },
      { value: '18+', label: 'Years in Dubai' },
      { value: '50+', label: 'Shows per year' },
      { value: '100%', label: 'In-house fabrication' },
    ],
    ctaHeadline: 'Get a quote for your next exhibition',
    ctaDescription: 'Send us your brief, floor plan, or even a napkin sketch. We\'ll come back with a detailed proposal within 48 hours.',
  },
  {
    slug: 'event-production-dubai',
    division: 'events',
    metaTitle: 'Event Production Dubai | Stage Design & Build | HOX Events',
    metaDescription: 'Event production and stage design in Dubai. Custom scenic fabrication, AV integration, and full technical production for corporate events, galas, and launches.',
    keywords: 'event production dubai, event stage design, corporate event production uae, gala production dubai, event fabrication',
    headline: 'Event Production',
    highlightText: 'Dubai',
    heroImage: `${G}/events/1766407761536-1.webp`,
    galleryImages: [
      `${G}/events/1766407759541-0.webp`,
      `${G}/events/1766407765429-2.webp`,
      `${G}/events/1766407767438-3.webp`,
      `${G}/events/1766407782637-11.webp`,
    ],
    intro: 'We build the physical environments that make events memorable. Stage structures, scenic fabrication, branded set pieces, and immersive installations — all fabricated in-house and installed by our crew.',
    services: [
      { title: 'Stage Design & Construction', description: 'Custom stages engineered for your venue, audience size, and technical requirements.' },
      { title: 'Scenic Fabrication', description: 'Themed environments, backdrops, props, and set pieces built in our workshop to exact specifications.' },
      { title: 'Corporate Events', description: 'Product launches, conferences, award ceremonies, and brand activations with full production support.' },
      { title: 'Wedding & Gala Production', description: 'Large-scale social events with custom scenic, lighting integration, and premium finishing.' },
    ],
    stats: [
      { value: '500+', label: 'Events produced' },
      { value: '18+', label: 'Years experience' },
      { value: 'CNC', label: 'In-house fabrication' },
      { value: '24/7', label: 'On-site support' },
    ],
    ctaHeadline: 'Let\'s build something extraordinary',
    ctaDescription: 'Tell us about your event — date, venue, vision. We\'ll show you what\'s possible within your budget.',
  },
  {
    slug: 'interior-fit-out-dubai',
    division: 'interiors',
    metaTitle: 'Interior Fit-Out Dubai | Office & Commercial Design & Build | HOX Interiors',
    metaDescription: 'Commercial interior fit-out in Dubai. Offices, restaurants, retail spaces, and hospitality. Design, approvals, construction, and handover. Joinery-first approach.',
    keywords: 'interior fit out dubai, office fit out dubai, commercial interior dubai, restaurant fit out uae, joinery dubai',
    headline: 'Interior Fit-Out',
    highlightText: 'Dubai',
    heroImage: `${G}/interiors/1766407431653-18.webp`,
    galleryImages: [
      `${G}/interiors/1766407392543-0.webp`,
      `${G}/interiors/1766407411099-8.webp`,
      `${G}/interiors/1766407404512-5.webp`,
      `${G}/interiors/1766407396577-2.webp`,
    ],
    intro: 'We design and build commercial interiors across Dubai — offices, restaurants, retail spaces, and hospitality environments. Our joinery-first approach means precision fabrication from our own workshop, not generic contractor work.',
    services: [
      { title: 'Office Fit-Out', description: 'From open plan to executive suites. Space planning, joinery, MEP coordination, and full project management.' },
      { title: 'Restaurant & F&B', description: 'Kitchen planning, dining area design, bar fabrication, and compliance with Dubai Municipality requirements.' },
      { title: 'Retail Spaces', description: 'Shopfitting, display systems, and brand environment creation for malls and standalone locations.' },
      { title: 'Bespoke Joinery', description: 'CNC-cut panels, custom furniture, reception desks, and architectural features made in our workshop.' },
    ],
    stats: [
      { value: '200+', label: 'Interiors delivered' },
      { value: 'Own', label: 'Workshop & CNC' },
      { value: 'Full', label: 'Permit management' },
      { value: 'DLP', label: 'Defects warranty' },
    ],
    ctaHeadline: 'Ready to transform your space?',
    ctaDescription: 'Share your floor plan and vision. We\'ll provide a detailed estimate and timeline within a week.',
  },
  {
    slug: 'retail-display-dubai',
    division: 'retail',
    metaTitle: 'Retail Display Dubai | Shop Fit-Out & Pop-Up Design | HOX Creative',
    metaDescription: 'Retail display design and fabrication in Dubai. Mall kiosks, pop-up stores, seasonal displays, and permanent shopfitting. In-house CNC and spray booth.',
    keywords: 'retail display dubai, pop up store dubai, mall kiosk design, shop fit out dubai, retail fabrication uae',
    headline: 'Retail Display',
    highlightText: 'Dubai',
    heroImage: `${G}/retail/1766408061889-0.webp`,
    galleryImages: [
      `${G}/retail/1766408065206-2.webp`,
      `${G}/retail/1766408090979-16.webp`,
      `${G}/retail/1766408087711-14.webp`,
      `${G}/retail/1766408355559-2.webp`,
    ],
    intro: 'We design and fabricate retail environments for Dubai\'s most demanding spaces — from seasonal mall activations to permanent shopfitting. Every piece is built in our workshop with CNC precision and spray-booth finishing.',
    services: [
      { title: 'Mall Kiosks & Pop-Ups', description: 'Freestanding retail units designed to meet mall regulations and maximise footfall conversion.' },
      { title: 'Seasonal Displays', description: 'Ramadan, Christmas, National Day, and campaign-specific activations with rapid turnaround.' },
      { title: 'Permanent Shopfitting', description: 'Full retail fit-out from design through fabrication to installation and snagging.' },
      { title: 'Display Systems', description: 'Modular and custom display units, product pedestals, and branded environments.' },
    ],
    stats: [
      { value: '300+', label: 'Retail projects' },
      { value: 'Night', label: 'Mall installations' },
      { value: 'CNC', label: 'Precision fabrication' },
      { value: 'Fast', label: 'Turnaround' },
    ],
    ctaHeadline: 'Need a retail display that works?',
    ctaDescription: 'Whether it\'s a weekend pop-up or a flagship shopfit, we\'ll give you a quote within 48 hours.',
  },
  {
    slug: 'get-a-quote',
    division: 'exhibitions',
    metaTitle: 'Get a Quote | Exhibition Stands, Events & Interiors | HOX Dubai',
    metaDescription: 'Request a free quote from HOX Creative Productions. Exhibition stands, event production, interior fit-outs, and retail displays in Dubai. Response within 48 hours.',
    keywords: 'exhibition stand quote dubai, event production quote, interior fit out quote dubai, free quote exhibition',
    headline: 'Get a',
    highlightText: 'Quote',
    heroImage: `${G}/exhibitions/1766404973821-1.webp`,
    galleryImages: [
      `${G}/events/1766407761536-1.webp`,
      `${G}/interiors/1766407431653-18.webp`,
      `${G}/retail/1766408061889-0.webp`,
      `${G}/exhibitions/1766405000655-18.webp`,
    ],
    intro: 'Tell us what you need. We\'ll come back with a detailed, transparent proposal — broken down by category so you can see exactly where your budget goes. No hidden costs. No surprises.',
    services: [
      { title: 'Exhibitions', description: 'Custom stands, shell scheme upgrades, international show support. Any size, any venue.' },
      { title: 'Events', description: 'Stage builds, scenic fabrication, brand activations. From intimate to epic.' },
      { title: 'Interiors', description: 'Office, restaurant, and retail fit-outs. Design through to handover.' },
      { title: 'Retail', description: 'Mall kiosks, pop-ups, seasonal displays, and permanent shopfitting.' },
    ],
    stats: [
      { value: '48hr', label: 'Quote turnaround' },
      { value: '0', label: 'Hidden fees' },
      { value: 'Full', label: 'Cost breakdown' },
      { value: '50/50', label: 'Payment terms' },
    ],
    ctaHeadline: 'Send us your brief',
    ctaDescription: 'Floor plan, reference images, budget range — whatever you have. The more detail, the more accurate our quote.',
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}
