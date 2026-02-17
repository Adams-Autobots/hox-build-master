import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { HoverText } from '@/components/ui/HoverText';

const headingAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
};

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Honeypot check — if this hidden field is filled, it's a bot
    if (formData.get('website_url')) {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      return;
    }

    // Basic client-side rate limiting (30 second cooldown)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      toast({
        title: "Please wait",
        description: "You can submit another request in a few seconds.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            division: formData.get('division'),
            message: formData.get('message'),
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Submission failed');
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setLastSubmitTime(Date.now());
      form.reset();
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <PageMeta
        title="Contact HOX | Get a Quote | Dubai Production Experts"
        description="Contact HOX for exhibition stands, event production, retail fit-outs, and interior design. Request a proposal from Dubai's leading production company."
        keywords="contact hox, exhibition quote dubai, event production enquiry, retail fit-out quote"
        image="/og-contact.png"
        canonicalPath="/contact"
      />
      <section className="pt-32 pb-24 lg:pb-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Info */}
            <div>
              <motion.span 
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wider text-primary mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                Get in touch
              </motion.span>

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
                {...headingAnimation}
              >
                <HoverText className="hox-brand">Let's </HoverText>
                <span className="text-primary"><HoverText>Build</HoverText></span>
                <br />
                <span className="text-muted-foreground/60"><HoverText>together.</HoverText></span>
              </motion.h1>

              <motion.p 
                className="text-xl text-muted-foreground mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Ready to start your next project? Our team is here to discuss your requirements 
                and provide a tailored proposal.
              </motion.p>

              <div className="space-y-6 mb-12">
                <a href="tel:+97143477519" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Landline</p>
                    <p className="font-medium">+971 4 3477519</p>
                  </div>
                </a>

                <a href="tel:+971588950056" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile / WhatsApp</p>
                    <p className="font-medium">+971 58 8950056</p>
                  </div>
                </a>

                <a href="mailto:info@hox.ae" className="flex items-center gap-4 text-foreground hover:text-primary transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">info@hox.ae</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Galadari Group of Warehouses #2<br />Ras Al Khor Industrial Area 2<br />Dubai, UAE</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/hox_creativeproductions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/house-of-exhibitions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/hoxuae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
              <h2 className="text-2xl font-bold mb-6 hox-brand">Request a proposal</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field — hidden from humans, catches bots */}
                <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="website_url">Do not fill this</label>
                  <input type="text" id="website_url" name="website_url" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Input id="name" name="name" placeholder="Your name" required className="bg-background" />
                  </div>
                  <div>
                    <label htmlFor="company" className="text-sm font-medium text-foreground mb-2 block">Company</label>
                    <Input id="company" name="company" placeholder="Company name" className="bg-background" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-background" />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                  <Input id="phone" name="phone" placeholder="+971..." className="bg-background" />
                </div>

                <div>
                  <label htmlFor="division" className="text-sm font-medium text-foreground mb-2 block">Division of Interest</label>
                  <select id="division" name="division" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select a division</option>
                    <option value="exhibitions">Exhibitions</option>
                    <option value="events">Events</option>
                    <option value="retail">Retail</option>
                    <option value="interiors">Interiors</option>
                    <option value="multiple">Multiple Divisions</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium text-foreground mb-2 block">Project Details</label>
                  <Textarea id="message" name="message" placeholder="Tell us about your project..." rows={4} required className="bg-background" />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 lg:mt-24">
          <h2 className="text-2xl font-bold mb-6 hox-brand">Find us</h2>
          <div className="rounded-lg overflow-hidden border border-border aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1!2d55.3632!3d25.1868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d46f95cfc7%3A0x5e3d49c3eae31a92!2sHOUSE%20OF%20EXHIBITIONS!5e0!3m2!1sen!2sae!4v1702657200000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HOUSE OF EXHIBITIONS - Ras Al Khor Industrial Area 2, Dubai"
            />
          </div>
        </div>
      </div>
    </section>
    </Layout>
  );
}
