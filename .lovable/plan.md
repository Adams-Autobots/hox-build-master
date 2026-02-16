

# Pre-Launch Fixes: SEO, Legal Pages, Phone Consistency, and Alt Tags

## Overview
Four fixes to finalize the site before publishing on hox.ae.

---

## 1. Update All Domain References to hox.ae

**StructuredData.tsx** -- Replace all `hox-build-master.lovable.app` URLs with `https://hox.ae`:
- Line 8: Organization `url`
- Line 9: Organization `logo` (change to `https://hox.ae/favicon.ico`)
- Line 35: LocalBusiness `@id`
- Line 37: LocalBusiness `image`
- Line 39: LocalBusiness `url`

**robots.txt** -- Update sitemap URL from `hox-build-master.lovable.app` to `hox.ae`.

**index.html** -- Replace the placeholder Lovable OG/Twitter images (`lovable.dev/opengraph-image-p98pqg.png`) with `https://hox.ae/og-home.png` (lines 16 and 21).

---

## 2. Fix Phone Number in Structured Data

The footer's landline (`+971 4 3477519`) is the correct number. Revert the structured data phone back:
- **StructuredData.tsx line 19**: Change `"+971-4-345-6789"` to `"+971-4-3477519"`
- **StructuredData.tsx line 40**: Change `"+971-4-345-6789"` to `"+971-4-3477519"`

---

## 3. Create Privacy Policy and Terms of Service Pages

- Create `src/pages/PrivacyPolicyPage.tsx` with standard privacy policy content tailored to HOX (data collection, cookies, contact info).
- Create `src/pages/TermsPage.tsx` with standard terms of service content.
- Add routes in `src/App.tsx` for `/privacy` and `/terms`.
- Update `src/components/layout/Footer.tsx` to link the existing "Privacy Policy" and "Terms of Service" anchors to `/privacy` and `/terms` instead of `#`.

---

## 4. Add Descriptive Alt Text for All Media

Auto-generate contextual alt text for the 18 identified items:

**Videos (aria-label additions):**
- HeroSection.tsx: `"HOX showreel featuring exhibitions, events, retail and interiors projects in Dubai"`
- WhyHoxVideoSection.tsx: `"Behind the scenes of HOX production and fabrication capabilities"`
- DivisionHero.tsx: Dynamic label using division prop, e.g. `"HOX ${division} division showcase video"`
- CapabilitiesGrid.tsx: Dynamic label using capability title, e.g. `"${capability.title} capability demonstration"`

**Images (alt text updates):**
- DivisionsSection.tsx: Already uses `division.headline` -- adequate, no change needed.
- DivisionHero.tsx: Change from `"${division} hero"` to `"HOX ${division} project showcase"`
- CapabilitiesGrid.tsx: Already uses `capability.title` -- adequate, no change needed.
- LeadershipSection.tsx: Already uses `member.name` -- enhance to `"${member.name}, ${member.role} at HOX"`
- ResourcesSection.tsx: Already uses `skill.title` -- enhance to `"${skill.title} - HOX core capability"`

---

## Files Modified
- `src/components/seo/StructuredData.tsx` -- domain URLs and phone number
- `public/robots.txt` -- sitemap URL
- `index.html` -- OG/Twitter image URLs
- `src/pages/PrivacyPolicyPage.tsx` -- new file
- `src/pages/TermsPage.tsx` -- new file
- `src/App.tsx` -- add routes
- `src/components/layout/Footer.tsx` -- update links
- `src/components/home/HeroSection.tsx` -- video aria-label
- `src/components/home/WhyHoxVideoSection.tsx` -- video aria-label
- `src/components/divisions/DivisionHero.tsx` -- video aria-label, image alt
- `src/components/divisions/CapabilitiesGrid.tsx` -- video aria-label
- `src/components/about/LeadershipSection.tsx` -- enhanced alt text
- `src/components/about/ResourcesSection.tsx` -- enhanced alt text
