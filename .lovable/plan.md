

# Fix Duplicate Structured Data in index.html

## What's wrong
There are two Organization schemas -- one hardcoded in `index.html` and one dynamically injected by `StructuredData.tsx`. They have conflicting address and phone data.

## Resolution

### 1. Remove the Organization schema from `index.html`
Delete the entire `<script type="application/ld+json">` block (lines 30-49) from `index.html`. The `StructuredData.tsx` component already injects both Organization and LocalBusiness schemas dynamically, so this is redundant.

### 2. Update phone number in `StructuredData.tsx`
Change the `contactPoint.telephone` in the Organization schema from `"+971-4-3477519"` to `"+971-4-345-6789"` (line 19).

Also update the `telephone` field in the LocalBusiness schema (line 43) from `"+971-4-3477519"` to `"+971-4-345-6789"` to keep them consistent.

The address stays as-is: **"Galadari Group of Warehouses #2, Ras Al Khor Industrial Area 2"**.

### Files changed
- `index.html` -- remove duplicate structured data block
- `src/components/seo/StructuredData.tsx` -- update phone number in both schemas

