
# Add Meta Tags to All Pages

## Overview

Create a reusable `PageMeta` component and implement SEO meta tags across all pages that currently lack them. The existing `DivisionMeta` component provides a solid pattern to follow.

---

## Current State

| Page | Has Meta Tags |
|------|---------------|
| Homepage (`/`) | Partial (via index.html only) |
| About (`/about`) | No |
| Contact (`/contact`) | No |
| Work/Projects (`/projects`) | No |
| Blog (`/blog`) | No |
| Blog Post (`/blog/:slug`) | No |
| Division Pages (4) | Yes (via DivisionMeta) |
| Gallery Pages (4) | No |
| Auth (`/auth`) | No |
| 404 | No |

---

## Solution

### 1. Create Reusable PageMeta Component

**File: `src/components/seo/PageMeta.tsx`**

A flexible component that sets:
- Page title
- Meta description
- Keywords
- Canonical URL
- Open Graph tags (title, description, type, url, image)
- Twitter Card tags

```text
interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;  // For pages like /auth, /admin
}
```

### 2. Add PageMeta to Each Page

#### Homepage (`src/pages/Index.tsx`)
- Title: "HOX | Production Excellence Since 2008 | Dubai"
- Description: "Dubai's premier production powerhouse delivering precision-built exhibitions, events, retail environments, and interiors since 2008."
- Keywords: "exhibition stands dubai, event production uae, retail fabrication, interior fit-out"

#### About Page (`src/pages/AboutPage.tsx`)
- Title: "About HOX | Our Story & Team | Dubai Production Company"
- Description: "Learn about HOX - Dubai's production powerhouse since 2008. Discover our story, capabilities, and commitment to design & build excellence."
- Keywords: "about hox, dubai production company, exhibition company uae, event production team"

#### Contact Page (`src/pages/ContactPage.tsx`)
- Title: "Contact HOX | Get a Quote | Dubai Production Experts"
- Description: "Contact HOX for exhibition stands, event production, retail fit-outs, and interior design. Request a proposal from Dubai's leading production company."
- Keywords: "contact hox, exhibition quote dubai, event production enquiry, retail fit-out quote"

#### Work/Projects Page (`src/pages/WorkPage.tsx`)
- Title: "Our Projects | HOX Portfolio | Exhibition, Events, Retail, Interiors"
- Description: "Explore HOX's portfolio of completed projects across exhibitions, events, retail, and interiors. See our work for leading brands across the UAE."
- Keywords: "hox projects, exhibition portfolio dubai, event production work, retail fit-out portfolio"

#### Blog Page (`src/pages/BlogPage.tsx`)
- Title: "Blog | HOX Insights | Production & Design Trends"
- Description: "Insights, trends, and stories from HOX. Read about exhibition design, event production, retail interiors, and fabrication excellence."
- Keywords: "hox blog, exhibition design trends, event production tips, retail design insights"

#### Blog Post Page (`src/pages/BlogPostPage.tsx`)
- Title: Dynamic from post data
- Description: First paragraph truncated
- Type: "article"
- Keywords: Dynamic from category

#### Gallery Pages (`src/pages/gallery/DivisionGalleryPage.tsx`)
- Title: "[Division] Gallery | HOX Projects"
- Description: "Browse HOX's complete collection of [division] projects. High-quality photography showcasing our design and build excellence."
- Keywords: Division-specific terms

#### Auth Page (`src/pages/AuthPage.tsx`)
- Title: "Admin Login | HOX"
- noIndex: true (prevent search indexing)

#### 404 Page (`src/pages/NotFound.tsx`)
- Title: "Page Not Found | HOX"
- noIndex: true

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/seo/PageMeta.tsx` | Reusable SEO meta component |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Add PageMeta |
| `src/pages/AboutPage.tsx` | Add PageMeta |
| `src/pages/ContactPage.tsx` | Add PageMeta |
| `src/pages/WorkPage.tsx` | Add PageMeta |
| `src/pages/BlogPage.tsx` | Add PageMeta |
| `src/pages/BlogPostPage.tsx` | Add PageMeta with article type |
| `src/pages/gallery/DivisionGalleryPage.tsx` | Add PageMeta |
| `src/pages/AuthPage.tsx` | Add PageMeta with noIndex |
| `src/pages/NotFound.tsx` | Add PageMeta with noIndex |

---

## Technical Details

### PageMeta Component Implementation

```typescript
// Core functionality
export function PageMeta({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  noIndex = false 
}: PageMetaProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set meta tags
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Standard meta
    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    if (noIndex) setMeta('robots', 'noindex, nofollow');

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', window.location.href, true);
    if (image) setMeta('og:image', image, true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);

    // Cleanup
    return () => {
      document.title = 'HOX - Design & Build Excellence';
    };
  }, [title, description, keywords, image, type, noIndex]);

  return null;
}
```

---

## Expected Outcome

- All pages will have proper SEO meta tags
- Search engines will display correct titles and descriptions
- Social sharing will show proper preview cards
- Admin/error pages will be excluded from search indexing
- Consistent SEO implementation across the entire site
