

# Header Navigation -- Premium UI Overhaul

## What Changes

Aesthetic-only upgrade to the desktop nav links, divisions dropdown, and mobile menu. All routing, logic, scroll behavior, and state management remain untouched.

---

## Desktop Navigation

### Typography
- Nav links change from generic `text-sm` to `text-[13px] uppercase tracking-[0.2em] font-medium` -- matches the architectural, engineered typographic language used across the rest of the site (Porsche Design / Rimowa reference)
- Increase link spacing from `gap-8` to `gap-10`

### Active and Hover States
- Replace the red underline-on-hover with a centered red dot (`w-1 h-1 rounded-full bg-primary`) beneath the active link, matching the division dot language already used in the dropdown and mobile menu
- On hover (non-active): dot appears at `scale-0 -> scale-100` with a smooth 300ms transition

### Scrolled Header
- Swap `glass py-4` for `bg-background/90 backdrop-blur-xl border-b border-white/[0.06] py-3`
- Add a 1px red gradient accent line across the top edge when scrolled (via a `::before` pseudo-element in CSS)

### Logo
- Add `hover:scale-110 transition-transform duration-300` for subtle presence on hover

---

## Divisions Dropdown

### Panel Styling
- Replace `rounded-lg` with `rounded-none` (sharp edges, consistent with the site's `--radius: 0.25rem` minimal approach)
- Add `border-t-2 border-primary` as a red accent line at the top of the panel
- Increase item padding from `px-3 py-2` to `px-4 py-3` for generous touch targets
- Replace `hover:bg-muted/50` with a left-border accent on hover: `border-l-2 border-transparent hover:border-l-2 hover:border-[currentColor]` so the division color appears as a side accent
- Each dropdown item gets a staggered entry delay (50ms per item) via inline `transition-delay`

### Division Color Dots
- Increase from `w-2 h-2` to `w-2.5 h-2.5` for slightly more visual weight

---

## Mobile Menu

### Hamburger
- Thin lines from `h-0.5` to `h-px` for more refined elegance

### Overlay
- Add a 1px red gradient line at the top of the mobile overlay (same accent as desktop scrolled state)
- Division sub-items: increase from `text-xl` to `text-2xl` for better hierarchy contrast against the `text-4xl` parent links

---

## CSS Addition (index.css)

A single utility class for the red gradient accent line:

```text
.header-accent-line::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, hsl(var(--hox-red)), transparent);
  pointer-events: none;
}
```

---

## Files Modified
- **src/components/layout/Header.tsx** -- all styling class changes (no logic changes)
- **src/index.css** -- add `.header-accent-line` utility

## What Does NOT Change
- All routing and Link destinations
- Scroll detection logic
- Dropdown open/close state management
- Mobile menu open/close and body scroll lock
- Location-based active state detection
- All division data arrays

