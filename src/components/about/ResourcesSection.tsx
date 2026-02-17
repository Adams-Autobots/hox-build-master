import { motion } from 'framer-motion';
import { HoverText } from '@/components/ui/HoverText';
import { SectionLabel } from '@/components/ui/SectionLabel';
import skillDesignConcept from '@/assets/skill-design-concept.jpg';
import skillProjectExecution from '@/assets/skill-project-execution.jpg';

const skills = [
  {
    title: 'Project Management',
    description: 'Decades of experience in planning, scheduling, and supplier coordination. We make complex simple.',
    image: skillDesignConcept
  },
  {
    title: 'Technical Planning & Drawing',
    description: 'Helping turn great ideas into budget workable deliveries.',
    image: skillDesignConcept
  },
  {
    title: 'Value Engineering',
    description: 'Maximizing impact while optimizing costs. Smart solutions without compromise.',
    image: skillProjectExecution
  },
  {
    title: 'Project Execution',
    description: 'What matters most is getting it done, right on time and to the standard you expect.',
    image: skillProjectExecution
  }
];

export function ResourcesSection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <SectionLabel>What we do best</SectionLabel>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="hox-brand"><HoverText>Our</HoverText> </span>
            <span className="text-primary"><HoverText>Skills.</HoverText></span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We have a team diverse in skills, knowledge and backgrounds. We are based in the UAE, and have completed projects across the GCC. We have been lucky to have executed over 3000+ projects, large and small for some of the biggest names on the globe.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="group relative overflow-hidden rounded-xl bg-card border border-border"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={skill.image}
                  alt={`${skill.title} - HOX core capability`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg lg:text-xl font-bold mb-3 hox-brand">{skill.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
