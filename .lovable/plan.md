

# Dynamic OG Image Generation

## Overview

Create a backend function that generates custom Open Graph images dynamically for each page. These images will display professional, branded visuals with page-specific content for better social media sharing.

---

## Current State

| Issue | Status |
|-------|--------|
| Default OG image | Using generic Lovable placeholder (`lovable.dev/opengraph-image-p98pqg.png`) |
| Division pages | Use first gallery image (no branding/text overlay) |
| Other pages | No custom OG images set |

---

## Solution: Dynamic OG Image Generation

Create a backend function that generates branded OG images with:
- HOX logo/branding
- Page title text overlay
- Division-specific colors
- Professional layout (1200x630 pixels - standard OG size)

---

## How It Works

```text
Request Flow:
                                          
  Social Media     Backend Function         Response
  Crawler         /og-image?page=about     1200x630 PNG
       │                  │                      │
       └──────────────────┼──────────────────────┘
                          │
                     Generates:
                   ┌─────────────────────┐
                   │    HOX              │
                   │    ────             │
                   │    About Us         │
                   │    Production       │
                   │    Excellence       │
                   └─────────────────────┘
```

---

## Implementation Approach

### Option A: SVG-to-PNG Generation (Recommended)

Generate images using SVG templates converted to PNG. This approach:
- No external dependencies required
- Full control over branding and layout
- Fast and lightweight
- Supports all page types

### How it works:
1. Backend function receives page type and optional parameters
2. Builds an SVG with HOX branding, title, and division colors
3. Converts SVG to PNG using the `resvg-wasm` library
4. Returns the image with proper caching headers

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/og-image/index.ts` | Backend function for image generation |

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/seo/PageMeta.tsx` | Update to use dynamic OG image URLs |
| `src/components/seo/DivisionMeta.tsx` | Update to use dynamic OG image URLs |
| `index.html` | Update default OG image URL |

---

## Dynamic Image Configuration

| Page Type | Title | Accent Color |
|-----------|-------|--------------|
| Homepage | "Production Excellence Since 2008" | Primary |
| About | "Our Story & Team" | Primary |
| Contact | "Get In Touch" | Primary |
| Projects | "Our Projects" | Primary |
| Blog | "Insights & Trends" | Primary |
| Exhibitions | "Exhibition Builds" | Red (#EE2737) |
| Events | "Event Production" | Blue (#0072BC) |
| Retail | "Retail Environments" | Orange (#F58220) |
| Interiors | "Interior Fit-Out" | Green (#97D700) |

---

## Technical Details

### Backend Function Structure

The function will:
1. Accept query parameters: `page`, `title`, `division`
2. Load division colors and branding
3. Generate SVG with text and styling
4. Convert to PNG using resvg-wasm
5. Return image with cache headers (1 hour)

### SVG Template Features
- 1200x630 pixel canvas (standard OG size)
- Dark background with gradient
- HOX logo/text prominent
- Page title with division accent color
- Subtle grid or pattern background

### Usage in Components

```typescript
// In PageMeta component
const ogImageUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/og-image?page=about&title=${encodeURIComponent(title)}`;
```

### Caching Strategy
- 1-hour cache on generated images
- Social platforms will cache for longer
- Instant updates when content changes

---

## Expected Outcome

- Every page gets a unique, branded OG image
- Social shares show professional HOX branding
- Division pages use their specific brand colors
- No need to manually create images for each page
- Images are generated on-demand and cached

