
# Add Hero-Style Framer Motion Animations to All Big Headings

## Overview
Update all main section headings across the site to use the same Framer Motion animation pattern as the home page hero section, providing a consistent and polished entrance animation.

## Current vs Target Animation

**Current (CSS-based):**
- Uses `useScrollReveal` hook with CSS classes
- `transition-all duration-700`
- `opacity-0 translate-y-8` → `opacity-100 translate-y-0`

**Target (Framer Motion, like Hero):**
- Uses `motion.h1` / `motion.h2`
- `initial={{ opacity: 0, y: 30 }}`
- `animate={{ opacity: 1, y: 0 }}`
- `transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}`
- `viewport={{ once: true }}` for scroll-triggered animation

## Files to Update

### Page Headings (Main H1s)
1. **`src/pages/AboutPage.tsx`** - "Production Excellence since 2008." and "Our Story."
2. **`src/pages/ContactPage.tsx`** - "Let's Build together."
3. **`src/pages/WorkPage.tsx`** - "Our Projects."
4. **`src/components/divisions/DivisionHero.tsx`** - Already uses motion, verify consistency

### Section Headings (H2s)
5. **`src/components/about/ResourcesSection.tsx`** - "Our Skills."
6. **`src/components/about/TestimonialsSection.tsx`** - "What our clients Say."
7. **`src/components/home/WhyHoxSection.tsx`** - "Experience, expertise and Trust."
8. **`src/components/home/DivisionsSection.tsx`** - "Four areas of expertise."
9. **`src/components/home/ProjectsSection.tsx`** - "Projects that Define us."
10. **`src/components/home/ContactCTA.tsx`** - "Ready to build Something exceptional?"
11. **`src/components/divisions/ProcessTimeline.tsx`** - "From concept to Completion."
12. **`src/components/divisions/CapabilitiesGrid.tsx`** - "What we Deliver."
13. **`src/components/divisions/FullPageGallery.tsx`** - "See our work in Action."
14. **`src/components/divisions/DivisionFAQ.tsx`** - "Frequently asked Questions."

## Implementation Pattern

For each heading, replace the CSS-based animation with Framer Motion:

```tsx
// Before (CSS-based)
<h2 className={cn(
  'text-4xl md:text-5xl font-bold transition-all duration-700',
  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
)}>
  <HoverText>Heading Text</HoverText>
</h2>

// After (Framer Motion)
<motion.h2
  className="text-4xl md:text-5xl font-bold"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  <HoverText>Heading Text</HoverText>
</motion.h2>
```

## Technical Details

### Animation Configuration (matching Hero)
- Duration: 0.7s (slightly longer than hero's 0.6s for section reveals)
- Easing: `[0.25, 0.46, 0.45, 0.94]` (smooth cubic-bezier)
- Y offset: 30px (same as hero)
- Viewport trigger: `{ once: true }` (animates once when scrolled into view)

### Required Imports
Each file will need to import `motion` from Framer Motion:
```tsx
import { motion } from 'framer-motion';
```

### Stagger Pattern for Multi-line Headings
For headings with multiple lines/colors, apply increasing delays:
```tsx
<motion.h2 ...>
  <motion.span transition={{ delay: 0 }}>First line</motion.span>
  <motion.span transition={{ delay: 0.1 }}>Second line</motion.span>
</motion.h2>
```

## Summary
- 14 files will be updated
- All big headings will animate with the same smooth motion as the hero
- Maintains existing HoverText letter-scale effect
- Uses viewport-triggered animations for scroll-based reveals
- Consistent easing curve across the entire site
