import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HoverText } from '@/components/ui/HoverText';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

export function ContactCTA() {
  return (
    <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wider text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
            Start your project
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
          </motion.span>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
            {...headingAnimation}
          >
            <span className="hox-brand"><HoverText>Ready to build</HoverText> </span>
            <span className="text-primary"><HoverText>Something</HoverText></span>
            <br />
            <span className="text-muted-foreground/60"><HoverText>exceptional?</HoverText></span>
          </motion.h2>

          <motion.p
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Let's discuss your next project. Our team is ready to listen and bring your vision to life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Button 
              variant="outline" 
              size="xl" 
              asChild
              className="bg-transparent border-2 text-primary border-primary/50 hover:border-primary hover:bg-transparent hover:shadow-[0_0_30px_hsl(357_85%_52%/0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link to="/contact" className="group">
                Talk to our team
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
