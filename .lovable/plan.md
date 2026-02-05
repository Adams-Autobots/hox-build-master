
# Fix Missing HoverText on 6 Headings

## Problem Identified
Six section headings have the Framer Motion entrance animation but are **missing the `<HoverText>` wrapper**, which means letters don't scale on cursor hover.

## Files to Fix

### 1. `src/components/about/ResourcesSection.tsx`
**Current (line 54-55):**
```tsx
<span className="hox-brand">Our </span>
<span className="text-primary">Skills.</span>
```
**Fix:**
```tsx
<span className="hox-brand"><HoverText>Our</HoverText> </span>
<span className="text-primary"><HoverText>Skills.</HoverText></span>
```

### 2. `src/components/about/TestimonialsSection.tsx`
**Current (line 62-63):**
```tsx
<span className="hox-brand">What our clients </span>
<span className="text-primary">Say.</span>
```
**Fix:**
```tsx
<span className="hox-brand"><HoverText>What our clients</HoverText> </span>
<span className="text-primary"><HoverText>Say.</HoverText></span>
```

### 3. `src/components/divisions/ProcessTimeline.tsx`
**Current (line 91-92):**
```tsx
<span className="hox-brand">From concept to </span>
<span className={divisionColors[division]}>Completion.</span>
```
**Fix:**
```tsx
<span className="hox-brand"><HoverText>From concept to</HoverText> </span>
<span className={divisionColors[division]}><HoverText>Completion.</HoverText></span>
```

### 4. `src/components/divisions/CapabilitiesGrid.tsx`
**Current (line 62-63):**
```tsx
<span className="hox-brand">What we </span>
<span className={iconColor}>Deliver.</span>
```
**Fix:**
```tsx
<span className="hox-brand"><HoverText>What we</HoverText> </span>
<span className={iconColor}><HoverText>Deliver.</HoverText></span>
```

### 5. `src/components/divisions/FullPageGallery.tsx`
**Current (line 153-154):**
```tsx
<span className="hox-brand">See our work in </span>
<span className={divisionColors[division]}>Action.</span>
```
**Fix:**
```tsx
<span className="hox-brand"><HoverText>See our work in</HoverText> </span>
<span className={divisionColors[division]}><HoverText>Action.</HoverText></span>
```

### 6. `src/components/divisions/DivisionFAQ.tsx`
**Current (line 101-102):**
```tsx
<span className="hox-brand">Frequently asked </span>
<span className={divisionColors[division]}>Questions.</span>
```
**Fix:**
```tsx
<span className="hox-brand"><HoverText>Frequently asked</HoverText> </span>
<span className={divisionColors[division]}><HoverText>Questions.</HoverText></span>
```

---

## Technical Details

Each file will need the `HoverText` import added:
```tsx
import { HoverText } from '@/components/ui/HoverText';
```

## Summary
- **6 files** will be updated
- All headings will have the letter-scale hover effect matching the rest of the site
- No changes to the Framer Motion entrance animations (already working)
- Maintains consistency with the established typography interaction pattern
