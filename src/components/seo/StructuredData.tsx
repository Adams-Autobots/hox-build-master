import { useEffect } from 'react';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "HOX",
  "alternateName": "House of Exhibitions",
  "url": "https://hox-build-master.lovable.app",
  "logo": "https://hox-build-master.lovable.app/favicon.ico",
  "description": "Dubai's premier production powerhouse delivering precision-built exhibitions, events, retail environments, and interiors since 2008.",
  "foundingDate": "2008",
  "sameAs": [
    "https://www.instagram.com/hox_creativeproductions/",
    "https://www.linkedin.com/company/house-of-exhibitions/",
    "https://www.facebook.com/hoxuae"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971-4-345-6789",
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
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://hox-build-master.lovable.app/#localbusiness",
  "name": "HOX - House of Exhibitions",
  "image": "https://hox-build-master.lovable.app/favicon.ico",
  "description": "Exhibition stand design, event production, retail fit-outs, and interior design services in Dubai, UAE.",
  "url": "https://hox-build-master.lovable.app",
  "telephone": "+971-4-345-6789",
  "email": "info@hox.ae",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Galadari Group of Warehouses #2, Ras Al Khor Industrial Area 2",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "",
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
      "dayOfWeek": "Friday",
      "opens": "08:00",
      "closes": "12:00"
    }
  ],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 25.1868,
      "longitude": 55.3632
    },
    "geoRadius": "500"
  },
  "serviceArea": {
    "@type": "Place",
    "name": "Gulf Cooperation Council (GCC)"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Production Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Exhibition Stand Design & Build",
          "description": "Custom exhibition stands for trade shows and expos across the UAE and GCC."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Event Production",
          "description": "Full-service event production including stage design, fabrication, and installation."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Retail Fit-Out",
          "description": "Complete retail interior design and fit-out services for shops and commercial spaces."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Interior Design & Fit-Out",
          "description": "Commercial and office interior design with full construction and fit-out capabilities."
        }
      }
    ]
  }
};

export function StructuredData() {
  useEffect(() => {
    // Add Organization schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.id = 'organization-schema';
    orgScript.textContent = JSON.stringify(organizationSchema);
    
    // Add LocalBusiness schema
    const localScript = document.createElement('script');
    localScript.type = 'application/ld+json';
    localScript.id = 'localbusiness-schema';
    localScript.textContent = JSON.stringify(localBusinessSchema);
    
    // Remove existing scripts if they exist
    const existingOrg = document.getElementById('organization-schema');
    const existingLocal = document.getElementById('localbusiness-schema');
    if (existingOrg) existingOrg.remove();
    if (existingLocal) existingLocal.remove();
    
    // Add new scripts to head
    document.head.appendChild(orgScript);
    document.head.appendChild(localScript);
    
    return () => {
      orgScript.remove();
      localScript.remove();
    };
  }, []);

  return null;
}
