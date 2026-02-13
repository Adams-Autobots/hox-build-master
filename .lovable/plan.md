

# Page-Specific Canonical URLs with hox.ae Domain

## Overview

Add canonical URLs to all public pages using `https://hox.ae` as the base domain, and update `og:url` to match.

## Technical Changes

### 1. Create a shared constant file

**New file: `src/lib/constants.ts`**
```typescript
export const CANONICAL_DOMAIN = 'https://hox.ae';
```

### 2. Update `src/components/seo/PageMeta.tsx`

- Add optional `canonicalPath` prop
- Import `CANONICAL_DOMAIN`
- In `useEffect`, create/update `<link rel="canonical">` in `<head>` using `CANONICAL_DOMAIN + canonicalPath`
- Set `og:url` to the canonical URL instead of `window.location.href`
- Clean up link element on unmount

### 3. Update `src/components/seo/DivisionMeta.tsx`

- Add optional `canonicalPath` prop
- Same canonical link logic as PageMeta
- Update `og:url` to use canonical URL

### 4. Update `index.html`

- Change `<link rel="canonical" href="https://hox.ae" />` (already set correctly)
- Update `og:url` to `https://hox.ae` (already set correctly)

### 5. Pass `canonicalPath` from every page

| Page | File | canonicalPath |
|------|------|---------------|
| Home | `Index.tsx` | `/` |
| Projects | `WorkPage.tsx` | `/projects` |
| About | `AboutPage.tsx` | `/about` |
| Contact | `ContactPage.tsx` | `/contact` |
| Blog | `BlogPage.tsx` | `/blog` |
| Blog Post | `BlogPostPage.tsx` | `/blog/{slug}` (dynamic) |
| Exhibitions | `ExhibitionsPage.tsx` | `/divisions/exhibitions` |
| Events | `EventsPage.tsx` | `/divisions/events` |
| Retail | `RetailPage.tsx` | `/divisions/retail` |
| Interiors | `InteriorsPage.tsx` | `/divisions/interiors` |
| Exhibitions Gallery | `ExhibitionsGalleryPage.tsx` | `/gallery/exhibitions` |
| Events Gallery | `EventsGalleryPage.tsx` | `/gallery/events` |
| Retail Gallery | `RetailGalleryPage.tsx` | `/gallery/retail` |
| Interiors Gallery | `InteriorsGalleryPage.tsx` | `/gallery/interiors` |

Pages like `/auth`, `/admin/gallery`, and `NotFound` will be skipped (not indexed).

## Custom Domain Setup

To connect `hox.ae` to this project:
1. Go to Project Settings then Domains
2. Click Connect Domain and enter `hox.ae`
3. Add DNS records at your domain registrar:
   - **A Record** for `@` pointing to `185.158.133.1`
   - **A Record** for `www` pointing to `185.158.133.1`
   - **TXT Record** as provided by the setup flow
4. Add both `hox.ae` and `www.hox.ae` in the domain settings
5. Set `hox.ae` as the Primary domain
6. SSL will be provisioned automatically

