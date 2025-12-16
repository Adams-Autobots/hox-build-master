import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const divisions = [
  { name: 'hoxexhibitions.', path: '/divisions/exhibitions' },
  { name: 'hoxevents.', path: '/divisions/events' },
  { name: 'hoxretail.', path: '/divisions/retail' },
  { name: 'hoxinteriors.', path: '/divisions/interiors' },
];

const quickLinks = [
  { name: 'work', path: '/work' },
  { name: 'about', path: '/about' },
  { name: 'case studies', path: '/case-studies' },
  { name: 'contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-bold tracking-tight text-foreground hox-brand">
                hox<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Dubai-born production powerhouse delivering precision-built environments and immersive experiences since 2008.
            </p>
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

          {/* Divisions Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
              divisions
            </h4>
            <ul className="space-y-3">
              {divisions.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hox-brand"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
              company
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hox-brand"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">
              contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+97143477519"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +971 4 3477519
                </a>
              </li>
              <li>
                <a
                  href="tel:+971588950056"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +971 58 895 0056
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hox.ae"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  info@hox.ae
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <span>
                    Galadari Group of Warehouses #2<br />
                    Ras Al Khor Industrial Area 2<br />
                    Dubai, UAE
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HOX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
