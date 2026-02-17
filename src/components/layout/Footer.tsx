import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const divisions = [
  { name: 'Exhibitions', path: '/divisions/exhibitions' },
  { name: 'Events', path: '/divisions/events' },
  { name: 'Retail', path: '/divisions/retail' },
  { name: 'Interiors', path: '/divisions/interiors' },
];

const links = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/10">
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Mobile: stacked layout. Desktop: row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-primary">hox</span>
                <span className="text-foreground">creative</span>
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Dubai-born production company. World-class exhibitions, events, retail and interiors since 2008.
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://www.instagram.com/hox_creativeproductions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/40 hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/house-of-exhibitions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/40 hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/50 mb-4">Divisions</h4>
            <ul className="space-y-2.5">
              {divisions.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/50 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {links.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — prominent on mobile */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/50 mb-4">Get in touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+97143477519" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                  +971 4 3477519
                </a>
              </li>
              <li>
                <a href="tel:+971588950056" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                  +971 58 8950056
                </a>
              </li>
              <li>
                <a href="mailto:info@hox.ae" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  info@hox.ae
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  Ras Al Khor Industrial 2, Dubai
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/10">
          <p className="text-xs text-muted-foreground/40">
            © {new Date().getFullYear()} HOX Creative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
