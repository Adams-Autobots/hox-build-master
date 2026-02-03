import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type Division = 'exhibitions' | 'events' | 'retail' | 'interiors';

interface FAQ {
  question: string;
  answer: string;
}

const divisionFAQs: Record<Division, FAQ[]> = {
  exhibitions: [
    { question: 'What is your typical lead time for exhibition stands?', answer: 'Standard builds require 4-6 weeks from design approval. Rush projects can be completed in 2-3 weeks depending on complexity. We recommend engaging us 8-12 weeks before your event for optimal results.' },
    { question: 'Do you deliver projects across the UAE?', answer: 'Yes, we deliver exhibition stands and builds across all emirates in the UAE. Our team handles logistics, installation, and on-site support throughout the country. We are also currently expanding our operations to KSA.' },
    { question: 'What is the maximum stand size you can build?', answer: 'We regularly deliver stands from 20sqm to 2,000sqm+. Our facility and team are equipped to handle double-decker structures, pavilions, and complex multi-level builds.' },
    { question: 'Do you provide stand storage between events?', answer: 'Yes, we offer climate-controlled storage for reusable stand components. We also provide refurbishment services to keep your stand looking fresh for each event.' },
    { question: 'Can you handle all permits and venue requirements?', answer: 'Absolutely. We manage structural calculations, fire safety compliance, electrical certifications, and all venue-specific requirements as part of our service.' },
  ],
  events: [
    { question: 'How far in advance should we book for a large event?', answer: 'For events over 500 attendees, we recommend 3-6 months lead time. Smaller activations can be delivered in 4-8 weeks. Festival and concert builds typically require 6+ months planning.' },
    { question: 'Do you provide technical production (AV, lighting)?', answer: 'Yes, we offer full technical production including audio, video, lighting, LED walls, projection mapping, and rigging. All equipment is sourced and operated by our in-house team.' },
    { question: 'Can you manage outdoor and beach events?', answer: 'We specialize in outdoor builds including temporary structures, staging, flooring, and weather protection. We have extensive experience with beach events, desert setups, and rooftop venues.' },
    { question: 'What safety certifications do you hold?', answer: 'We are ISO 9001 certified with full public liability insurance. All our riggers are IPAF/PASMA certified, and we comply with Dubai Municipality and Civil Defence requirements.' },
    { question: 'Do you offer event staffing and management?', answer: 'While our core focus is production and build, we partner with trusted event management companies and can recommend staffing solutions as part of a complete package.' },
  ],
  retail: [
    { question: 'What is the typical timeline for a store fit-out?', answer: 'A standard 100-200sqm retail fit-out takes 6-10 weeks from design to handover. Mall kiosks and pop-ups can be delivered in 2-4 weeks. Flagship stores may require 12-16 weeks.' },
    { question: 'Do you work with mall management on approvals?', answer: 'Yes, we handle all landlord and mall management submissions including design approvals, MEP coordination, and authority permits. We have established relationships with major malls across the UAE.' },
    { question: 'Can you replicate brand guidelines from international HQ?', answer: 'Absolutely. We work closely with global brand teams to ensure local execution matches international standards. We can work from brand books, technical drawings, or existing store references.' },
    { question: 'Do you provide fixtures and furniture?', answer: 'Yes, we manufacture custom fixtures, display units, signage, and furniture in-house. We also source and install FF&E (furniture, fixtures & equipment) from specified suppliers.' },
    { question: 'What warranty do you provide on retail fit-outs?', answer: 'We provide a 12-month defects liability period on all workmanship. Extended warranties are available for specific items. We also offer ongoing maintenance contracts.' },
  ],
  interiors: [
    { question: 'Do you handle full turnkey interior projects?', answer: 'Yes, we deliver complete turnkey solutions from design through to furniture installation. This includes MEP coordination, joinery, flooring, ceilings, and all finishing works.' },
    { question: 'Can you work with our existing architect or designer?', answer: 'Absolutely. We regularly collaborate with external design firms, providing value engineering, production expertise, and seamless execution of their vision.' },
    { question: 'What types of interiors do you specialize in?', answer: 'We specialize in commercial offices, F&B venues, hospitality spaces, and luxury residential. Our in-house joinery workshop allows us to deliver bespoke millwork to the highest standards.' },
    { question: 'Do you source premium materials?', answer: 'Yes, we have access to rare stones, specialty veneers, metals, and artisan finishes from around the world. We can source to specification or recommend materials based on your design intent.' },
    { question: 'How do you handle projects in occupied buildings?', answer: 'We have extensive experience with phased fit-outs and night works in occupied buildings. We implement strict noise control, dust management, and security protocols.' },
  ],
};

const divisionColors: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))]',
  events: 'text-[hsl(var(--hox-blue))]',
  retail: 'text-[hsl(var(--hox-orange))]',
  interiors: 'text-[hsl(var(--hox-green))]',
};

const divisionBg: Record<Division, string> = {
  exhibitions: 'bg-[hsl(var(--hox-red))]',
  events: 'bg-[hsl(var(--hox-blue))]',
  retail: 'bg-[hsl(var(--hox-orange))]',
  interiors: 'bg-[hsl(var(--hox-green))]',
};

interface DivisionFAQProps {
  division: Division;
}

export function DivisionFAQ({ division }: DivisionFAQProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const faqs = divisionFAQs[division];

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span
              className={cn(
                'inline-flex items-center gap-2 text-sm font-medium tracking-widest mb-6 transition-all duration-700',
                divisionColors[division],
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className={cn('w-8 h-px', divisionBg[division])} />
              Common questions
              <span className={cn('w-8 h-px', divisionBg[division])} />
            </span>
            
            <h2
              className={cn(
                'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700 delay-150',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <span className="hox-brand">Frequently asked </span>
              <span className={divisionColors[division]}>Questions.</span>
            </h2>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  'border border-border rounded-lg px-6 bg-card transition-all duration-500 data-[state=open]:border-primary/30',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline group">
                  <span className="flex items-start gap-4 text-lg font-medium">
                    <span className={cn('text-sm font-bold mt-1', divisionColors[division])}>
                      0{index + 1}
                    </span>
                    <span className="group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-10 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
