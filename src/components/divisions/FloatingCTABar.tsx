import { useState } from 'react';
import { Phone, MessageCircle, X, Send } from 'lucide-react';
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

  const defaultWhatsappMsg = whatsappMessage || `Hi, I'm interested in HOX ${division} services`;
  const whatsappUrl = `https://wa.me/971588950056?text=${encodeURIComponent(defaultWhatsappMsg)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Get UTM params from URL
    const params = new URLSearchParams(window.location.search);
    const utm = {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
    };

    try {
      // For now, open mailto with the info. Can be upgraded to Supabase insert later.
      const subject = `HOX Quick Quote — ${division}`;
      const body = `Name: ${formState.name}\nPhone: ${formState.phone}\nDivision: ${division}\nMessage: ${formState.message}\n\nSource: ${utm.source || 'direct'} / ${utm.medium || '-'} / ${utm.campaign || '-'}`;
      window.location.href = `mailto:info@hox.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setIsSubmitted(true);
    } catch {
      // Fallback — just close
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Mobile: Fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 px-4 py-3 safe-area-pb">
          <div className="flex items-center gap-2">
            <a
              href="tel:+971588950056"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium bg-card border border-border rounded-sm hover:border-foreground/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium bg-[#25D366] text-white rounded-sm hover:bg-[#20BD5A] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-medium text-primary-foreground rounded-sm transition-colors"
              style={{ backgroundColor: `hsl(var(--${divisionColor}))` }}
            >
              <Send className="w-4 h-4" />
              Quote
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Floating side strip (right edge) */}
      <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-2">
        <a
          href="tel:+971588950056"
          className="group flex items-center gap-2 px-3 py-3 bg-background/90 backdrop-blur-xl border border-border/50 rounded-l-lg hover:pr-6 transition-all duration-300"
          title="Call HOX"
        >
          <Phone className="w-4 h-4 text-foreground" />
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Call us</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-3 py-3 bg-[#25D366] rounded-l-lg hover:pr-6 transition-all duration-300"
          title="WhatsApp HOX"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">WhatsApp</span>
        </a>
        <button
          onClick={() => setIsFormOpen(true)}
          className="group flex items-center gap-2 px-3 py-3 rounded-l-lg hover:pr-6 transition-all duration-300"
          style={{ backgroundColor: `hsl(var(--${divisionColor}))` }}
          title="Get a Quick Quote"
        >
          <Send className="w-4 h-4 text-white" />
          <span className="text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Quick Quote</span>
        </button>
      </div>

      {/* Quick Quote Slide-in Panel */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />
          
          {/* Panel */}
          <div className="relative w-full md:w-[420px] md:mr-6 bg-card border border-border rounded-t-2xl md:rounded-2xl p-6 md:p-8 animate-slide-up md:animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold">Quick Quote</h3>
                <p className="text-sm text-muted-foreground capitalize">{division} enquiry</p>
              </div>
              <button onClick={() => setIsFormOpen(false)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <p className="font-semibold mb-2">Enquiry sent!</p>
                <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Want faster? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-medium hover:underline">WhatsApp us</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp number"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Brief description — what do you need?"
                    rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: `hsl(var(--${divisionColor}))` }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Or call <a href="tel:+971588950056" className="text-foreground hover:underline">+971 58 895 0056</a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
