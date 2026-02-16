import { useEffect } from 'react';

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "HOX Creative",
    "alternateName": "House of Exhibitions",
    "url": "https://hox.ae",
    "logo": "https://hox.ae/favicon-512.png",
    "description": "Dubai's premier production company delivering world-class exhibitions, events, retail environments, and interiors since 2008.",
    "foundingDate": "2008",
    "founder": {
      "@type": "Person",
      "name": "Adam Nicholson",
      "jobTitle": "Founder & Managing Director"
    },
    "sameAs": [
      "https://www.instagram.com/hox_creativeproductions/",
      "https://www.linkedin.com/company/house-of-exhibitions/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971-4-3477519",
      "contactType": "customer service",
      "areaServed": ["AE", "SA", "QA", "KW", "BH", "OM"],
      "availableLanguage": ["English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Galadari Group of Warehouses #2, Ras Al Khor Industrial Area 2",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://hox.ae/#localbusiness",
    "name": "HOX Creative",
    "image": "https://hox.ae/favicon-512.png",
    "description": "Exhibition stand design, event production, retail fit-outs, and interior design services in Dubai, UAE.",
    "url": "https://hox.ae",
    "telephone": "+971-4-3477519",
    "email": "info@hox.ae",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Galadari Group of Warehouses #2, Ras Al Khor Industrial Area 2",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.1868,
      "longitude": 55.3632
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Production Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Exhibition Stand Design & Build" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Event Production" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Retail Fit-Out & Fabrication" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interior Design & Fit-Out" } }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "HOX Creative",
    "url": "https://hox.ae",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hox.ae/projects?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
];

export function StructuredData() {
  useEffect(() => {
    const scriptId = 'hox-structured-data';
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => { script.remove(); };
  }, []);

  return null;
}
