 import { useRef } from 'react';
 import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
 import { cn } from '@/lib/utils';
 import { HoverText } from '@/components/ui/HoverText';
 
 const headingAnimation = {
   initial: { opacity: 0, y: 30 },
   whileInView: { opacity: 1, y: 0 },
   viewport: { once: true },
   transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
 };
 
 const features = [
   'In-house production',
   'Value Engineering',
   'Since 2008',
   '4 specialised divisions',
 ];
 
 export function WhyHoxSection() {
   const sectionRef = useRef<HTMLElement>(null);
 
   // Track scroll progress relative to this section
   const { scrollYProgress } = useScroll({
     target: sectionRef,
     offset: ["start end", "start start"]
   });
 
   // Background opacity: stays fully transparent until 70%, then solidifies
   const rawOpacity = useTransform(scrollYProgress, [0, 0.7, 0.85, 1], [0, 0, 0.5, 1]);
   const backgroundOpacity = useSpring(rawOpacity, {
     stiffness: 100,
     damping: 30
   });
 
   return (
     <section ref={sectionRef} className="py-16 lg:py-20 relative overflow-hidden">
       {/* Scroll-responsive background that solidifies */}
       <motion.div 
         className="absolute inset-0 bg-card" 
         style={{ opacity: backgroundOpacity }} 
       />
       
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-[0.02] z-[1]">
         <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/20 to-transparent" />
       </div>
 
       <div className="container mx-auto px-6 lg:px-12 relative z-10">
         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
           {/* Content */}
           <div>
             <motion.span 
               className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-6"
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
               <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
               Why hox
             </motion.span>
             <motion.h2 
               className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
               {...headingAnimation}
             >
               <span className="hox-brand"><HoverText>Experience, expertise</HoverText> </span>
               <span className="text-primary"><HoverText>and</HoverText></span>
               <br />
               <span className="text-muted-foreground/60"><HoverText>Trust.</HoverText></span>
             </motion.h2>
 
             <motion.div 
               className="space-y-6"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
             >
               <p className="text-lg text-muted-foreground leading-relaxed">
                 When you control every stage of production, you control quality, 
                 timing, and outcomes. That's the HOX difference.
               </p>
             </motion.div>
           </div>
 
           {/* Stats Grid */}
           <div className="grid grid-cols-2 gap-8">
             {features.map((feature, index) => (
               <motion.div
                 key={feature}
                 className="group relative p-8 rounded-lg bg-background border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden flex items-center justify-center"
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
               >
                 {/* Background Glow Effect */}
                 <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 <p className="relative text-sm md:text-base font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-500 text-center leading-relaxed">
                   {feature}
                 </p>
               </motion.div>
             ))}
           </div>
         </div>
       </div>
     </section>
   );
 }