import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <section className="pt-32 pb-24 lg:pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Info */}
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium tracking-widest text-primary uppercase mb-6">
                <span className="w-8 h-px bg-primary" />
                get in touch
              </span>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
                <span className="hox-brand">let's build</span>
                <br />
                <span className="text-primary">together.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                Ready to start your next project? Our team is here to discuss your requirements 
                and provide a tailored proposal.
              </p>

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
                    <p className="font-medium">+971 58 895 0056</p>
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

              <Button variant="outline" size="lg" asChild>
                <a href="https://wa.me/971588950056" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            {/* Right Column - Form */}
            <div className="bg-card border border-border rounded-lg p-8 lg:p-10">
              <h2 className="text-2xl font-bold mb-6 hox-brand">request a proposal</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    <option value="creative">Creative</option>
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
        </div>
      </section>
    </Layout>
  );
}
