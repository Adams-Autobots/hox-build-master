import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

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
    <footer className="bg-card">
      {/* Main footer */}
      <div className="container mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-12">
        {/* Top: Wordmark + Nav */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          <div className="max-w-sm">
            <Link to="/" className="inline-block mb-5">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary">hox</span>
                <span className="text-foreground">creative</span>
                <span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dubai-born production company delivering world-class exhibitions, events, retail and interior environments since 2008.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/60 mb-4">Divisions</h4>
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

            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/60 mb-4">Company</h4>
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

            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/60 mb-4">Contact</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="tel:+97143477519" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    +971 4 347 7519
                  </a>
                </li>
                <li>
                  <a href="tel:+971588950056" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    +971 58 895 0056
                  </a>
                </li>
                <li>
                  <a href="mailto:info@hox.ae" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    info@hox.ae
                  </a>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    Ras Al Khor Industrial 2, Dubai
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} HOX Creative. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
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
      </div>
    </footer>
  );
}
