
# Fix Mobile Menu Page Overlap Issue

## Problem Analysis

When clicking the mobile menu, page content shows through/overlaps the menu overlay. This happens because:

1. **Semi-transparent background**: The overlay uses `bg-background/98` (98% opacity), allowing slight content bleed-through
2. **Z-index issues**: The overlay uses `z-40`, but some page content may have competing z-indexes
3. **Missing body scroll lock**: The page remains scrollable when the menu is open, causing content to move behind the overlay

---

## Solution

### File: `src/components/layout/Header.tsx`

**Changes to the MobileNav component:**

1. **Change overlay background to fully opaque**
   - From: `bg-background/98 backdrop-blur-xl`
   - To: `bg-background` (100% opacity, removes transparency)

2. **Increase z-index of overlay**
   - From: `z-40`
   - To: `z-[60]` (higher than the header's z-50 to ensure it covers everything)

3. **Add body scroll lock when menu is open**
   - Add a `useEffect` hook that sets `overflow: hidden` on the body when the menu is open
   - This prevents page content from scrolling behind the overlay

---

## Technical Changes

```text
Location: MobileNav function in Header.tsx

1. Add useEffect for body scroll lock:
   useEffect(() => {
     if (isOpen) {
       document.body.style.overflow = 'hidden';
     } else {
       document.body.style.overflow = '';
     }
     return () => {
       document.body.style.overflow = '';
     };
   }, [isOpen]);

2. Update overlay div classes:
   - Change: 'fixed inset-0 top-0 bg-background/98 backdrop-blur-xl transition-all duration-500 z-40'
   - To: 'fixed inset-0 bg-background transition-all duration-500 z-[60]'
```

---

## Summary

| Change | Before | After |
|--------|--------|-------|
| Background | `bg-background/98` (semi-transparent) | `bg-background` (fully opaque) |
| Z-index | `z-40` | `z-[60]` |
| Body scroll | Not locked | Locked when menu open |
| Backdrop blur | `backdrop-blur-xl` | Removed (not needed with opaque bg) |

These changes will ensure the mobile menu completely covers the page content without any overlap or bleed-through.
