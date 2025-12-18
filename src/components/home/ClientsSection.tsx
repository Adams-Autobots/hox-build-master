import { motion } from "framer-motion";
import { Award, Shield, Leaf, BadgeCheck, Star, Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const certifications = [
  {
    icon: Shield,
    title: "ISO 9001:2015",
    category: "Quality Management",
    description: "Certified quality management systems ensuring consistent delivery standards.",
  },
  {
    icon: Leaf,
    title: "ISO 14001:2015",
    category: "Environmental",
    description: "Committed to sustainable practices and environmental responsibility.",
  },
  {
    icon: BadgeCheck,
    title: "OHSAS 18001",
    category: "Health & Safety",
    description: "Industry-leading occupational health and safety management.",
  },
];

const achievements = [
  { value: "50+", label: "Awards Won", icon: Award },
  { value: "15+", label: "Countries Served", icon: Globe },
  { value: "98%", label: "Client Retention", icon: Star },
];

const trustedBy = [
  "Expo 2020 Dubai",
  "Dubai Holding",
  "Emaar Properties",
  "RTA Dubai",
  "Mubadala",
  "Tayto Group",
  "Sohar Freezone",
  "Marketing Eye",
  "Nawah",
  "Jewellery Design Awards",
  "Independent Diabetes Trust",
  "National Geographic",
  "TP-Link",
  "Clinell",
  "Citizen",
  "Rolls-Royce",
  "Emirates Nuclear Energy",
  "Lukoil",
  "Cisco",
  "Global Light & Power",
  "Enviromena",
  "Dubai Carbon",
  "Gama Aviation",
  "The Industrial Group",
  "Dahua Technology",
  "La Ronda",
  "Tazzetti",
  "SPE International",
  "Jetour",
  "Madame Tussauds Dubai",
  "Bath and Body Works",
  "Notions Group",
  "Newland",
  "Eurofiere",
  "Madar",
  "Cabsat",
];

export function ClientsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-card relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary mb-6 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            <span className="w-8 h-px bg-primary" />
            Trust & excellence
            <span className="w-8 h-px bg-primary" />
          </span>

          <h2
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 delay-150",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <span className="hox-brand">Certified. recognized. </span>
            <span className="text-primary">Trusted.</span>
          </h2>

          <p
            className={cn(
              "text-lg text-muted-foreground transition-all duration-700 delay-300",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            Industry-leading certifications and a track record of excellence that gives our clients confidence in every
            project.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-3 gap-6 lg:gap-12 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  {achievement.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{achievement.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                className="group relative p-8 rounded-lg bg-background border border-border hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{cert.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 hox-brand group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trusted By Grid */}
        <div className="relative">
          <div className="text-center mb-12">
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Trusted by industry leaders</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-8">
            {trustedBy.map((client, index) => (
              <motion.div
                key={client}
                className="flex items-center justify-center p-4 rounded-lg border border-border/50 bg-background/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <span className="text-sm font-medium text-muted-foreground text-center leading-tight">{client}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
