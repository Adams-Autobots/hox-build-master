
# Fix: Restore Mouse Cursor on Auth/Sign-In Page

## Problem Identified
The mouse cursor disappears on the `/auth` (sign-in) page because:

1. The global CSS hides the native browser cursor on non-touch devices (`cursor: none`)
2. The AuthPage doesn't use the `Layout` component (which renders the `CustomCursor`)
3. The AuthPage is missing the `cursor-visible` CSS class that restores native cursors

This means the native cursor is hidden but no custom cursor is being rendered, causing the cursor to "disappear."

## Solution
Add the `cursor-visible` class to the AuthPage's root container, matching the pattern already used in the GalleryAdminPage.

## Changes Required

### File: `src/pages/AuthPage.tsx`

**Current code (line 91):**
```tsx
<div className="min-h-screen flex items-center justify-center bg-background p-4">
```

**Updated code:**
```tsx
<div className="min-h-screen flex items-center justify-center bg-background p-4 cursor-visible">
```

This same change should also be applied to the loading state container (line 84):
```tsx
<div className="min-h-screen flex items-center justify-center bg-background cursor-visible">
```

---

## Technical Details

The `cursor-visible` class is defined in `src/index.css` (lines 98-107) and:
- Overrides `cursor: none` with `cursor: auto !important` on all elements
- Sets `cursor: pointer !important` on interactive elements (links, buttons)

This approach maintains consistency with the existing admin page pattern and ensures users can see their cursor when filling out the login form.
