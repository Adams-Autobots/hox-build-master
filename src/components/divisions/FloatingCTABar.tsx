import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingCTABarProps {
  division: string;
  divisionColor: string;
  whatsappMessage?: string;
}

export function FloatingCTABar({ division, divisionColor, whatsappMessage }: FloatingCTABarProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const defaultWhatsappMsg = whatsappMessage || `Hi, I'm interested in HOX ${division} services`;
  const whatsappUrl = `https://wa.me/971588950056?text=${encodeURIComponent(defaultWhatsappMsg)}`;

  // Only show after scrolling past the hero
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const params = new URLSearchParams(window.location.search);
    const utm = {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
    };
    try {
      const subject = `HOX Quick Quote — ${division}`;
      const body = `Name: ${formState.name}\nPhone: ${formState.phone}\nDivision: ${division}\nMessage: ${formState.message}\n\nSource: ${utm.source || 'direct'} / ${utm.medium || '-'} / ${utm.campaign || '-'}`;
      window.location.href = `mailto:info@hox.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setIsSubmitted(true);
    } catch {
      // Fallback
    }
    setIsSubmitting(false);
  };

  const accentColor = `hsl(var(--${divisionColor}))`;

  return (
    <>
      {/* ===== DESKTOP: Minimal pill strip, bottom-right ===== */}
      <div className={cn(
        'hidden md:flex fixed right-6 bottom-8 z-40 flex-col items-center transition-all duration-500',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      )}>
        <div className="flex flex-col items-center gap-0.5 bg-background/80 backdrop-blur-xl border border-border/30 rounded-full p-1.5 shadow-2xl">
          <a
            href="tel:+97143477519"
            className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-200"
            title="Call +971 4 3477519"
          >
            <Phone className="w-[18px] h-[18px]" />
          </a>
          <div className="w-5 h-px bg-border/20" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/10 transition-all duration-200"
            title="WhatsApp"
          >
            <MessageCircle className="w-[18px] h-[18px]" />
          </a>
          <div className="w-5 h-px bg-border/20" />
          <button
            onClick={() => setIsFormOpen(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ color: accentColor }}
            title="Quick Quote"
          >
            <Send className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* ===== MOBILE: Slim bottom bar ===== */}
      <div className={cn(
        'md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-500',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}>
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/20 safe-area-pb">
          <div className="flex items-center h-14 px-4 gap-2">
            <a
              href="tel:+97143477519"
              className="flex items-center justify-center w-11 h-10 rounded-lg border border-border/30 text-muted-foreground"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-11 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366]"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-white"
              style={{ backgroundColor: accentColor }}
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ===== QUICK QUOTE PANEL ===== */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center">
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          <div className="relative w-full md:w-[400px] bg-card border border-border/40 rounded-t-2xl md:rounded-2xl p-6 md:p-8 animate-slide-up md:animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Quick Quote</h3>
                <p className="text-sm text-muted-foreground capitalize">{division}</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `hsl(var(--${divisionColor}) / 0.1)` }}>
                  <Send className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <p className="font-semibold mb-2">Enquiry sent</p>
                <p className="text-sm text-muted-foreground">We'll be in touch within 24 hours.</p>
                <p className="text-sm text-muted-foreground mt-3">
                  Faster? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-medium hover:underline">WhatsApp us</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" placeholder="Your name" required value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))} className="w-full px-4 py-3 bg-background border border-border/40 rounded-lg text-sm focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/40" />
                <input type="tel" placeholder="Phone / WhatsApp number" required value={formState.phone} onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))} className="w-full px-4 py-3 bg-background border border-border/40 rounded-lg text-sm focus:outline-none focus:border-primary/30 transition-colors placeholder:text-muted-foreground/40" />
                <textarea placeholder="Tell us about your project" rows={3} value={formState.message} onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))} className="w-full px-4 py-3 bg-background border border-border/40 rounded-lg text-sm focus:outline-none focus:border-primary/30 transition-colors resize-none placeholder:text-muted-foreground/40" />
                <button type="submit" disabled={isSubmitting} className="w-full py-3 text-sm font-medium text-white rounded-lg transition-opacity hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: accentColor }}>
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
                <p className="text-xs text-muted-foreground/50 text-center pt-1">
                  Or call <a href="tel:+97143477519" className="text-muted-foreground hover:text-foreground">+971 4 3477519</a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
