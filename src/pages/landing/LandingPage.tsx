import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageMeta } from '@/components/seo/PageMeta';
import { getLandingPage } from '@/data/landingPages';
import { useEffect } from 'react';
import { CANONICAL_DOMAIN } from '@/lib/constants';

const divisionColors: Record<string, string> = {
  exhibitions: 'text-red-500',
  events: 'text-sky-500',
  retail: 'text-orange-400',
  interiors: 'text-green-500',
};

const divisionBg: Record<string, string> = {
  exhibitions: 'bg-red-500/10',
  events: 'bg-sky-500/10',
  retail: 'bg-orange-400/10',
  interiors: 'bg-green-500/10',
};

export default function LandingPage() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');
  const page = getLandingPage(slug);

  useEffect(() => {
    if (!page) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `${page.headline} ${page.highlightText}`,
      description: page.metaDescription,
      provider: {
        '@type': 'Organization',
        name: 'HOX Creative Productions',
        url: CANONICAL_DOMAIN,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
      },
      areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [page]);

  if (!page) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Page not found</h1>
          <Link to="/" className="text-primary hover:underline">Go home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageMeta
        title={page.metaTitle}
        description={page.metaDescription}
        keywords={page.keywords}
        canonicalPath={`/${page.slug}`}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {page.headline}{' '}
              <span className={divisionColors[page.division]}>{page.highlightText}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              {page.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Get a quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+97143477519"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm font-medium rounded-md hover:bg-card transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-12 border-y border-border/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {page.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-10"
          >
            What we deliver
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {page.services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`p-6 lg:p-8 rounded-lg ${divisionBg[page.division]} border border-border/5`}
              >
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-card border-t border-border/10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{page.ctaHeadline}</h2>
            <p className="text-muted-foreground mb-8">{page.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:info@hox.ae"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@hox.ae
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
