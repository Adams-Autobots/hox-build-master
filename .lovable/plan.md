

# Fix Blue Tint on White/Grey Text Hover

## Problem

The custom cursor uses `mix-blend-mode: difference` which inverts colors when the cursor glow passes over text. This creates an unintended **blue tint** on white and grey text because:
- The cursor has a red glow (`hsla(357, 85%, 52%)`)
- The `difference` blend mode inverts red → cyan/blue when blended with white

## Solution

Remove the `difference` blend mode entirely and use `normal` blend mode for all cases. This keeps the red cursor glow visible without color distortion on any text.

## Technical Changes

**File:** `src/components/ui/CustomCursor.tsx`

Update line 81 to always use `normal` blend mode:

```text
Before:  mixBlendMode: cursorColor ? 'normal' : (isOverHoverText ? 'normal' : 'difference')
After:   mixBlendMode: 'normal'
```

This is a minimal change that:
- Eliminates the blue tint on white/grey text in the footer, header, and everywhere else
- Maintains the red glow effect
- Keeps division-specific cursor colors working correctly

## Impact

- Footer text (description, links, copyright) - no more blue tint
- Header navigation links - no more blue tint  
- All body text across the site - no more blue tint
- The cursor ring and glow remain fully visible as intended

