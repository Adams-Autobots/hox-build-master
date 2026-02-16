

# Full Pre-Launch Review -- hox.ae

## Status: Almost Ready -- Issues Found Below

---

## 1. CRITICAL -- Contact Form is Non-Functional

The contact form on `/contact` does NOT actually send data anywhere. It simulates a submission with a `setTimeout` and shows a success toast, but no data is captured or emailed.

**Fix:** Create a backend function to receive form submissions and either store them in the database or forward via email. Add server-side validation with zod.

---

## 2. CRITICAL -- Sitemap Default URL is Wrong

The sitemap edge function at `supabase/functions/sitemap/index.ts` defaults to `https://hox-build-master.lovable.app` instead of `https://hox.ae`. Additionally, the `baseUrl` parameter accepts any arbitrary domain (security warning).

**Fix:**
- Change default URL to `https://hox.ae`
- Whitelist allowed domains: `https://hox.ae`, `https://www.hox.ae`, `https://hox-build-master.lovable.app`
- Reject any other baseUrl value

---

## 3. MODERATE -- Admin Page Lacks Role Check on Client Side

The `/admin/gallery` page only checks if a user is authenticated (`!user`), not whether they have the `admin` role. While the RLS policies now block non-admin writes at the database level, any authenticated user can still see the admin UI.

**Fix:** Add a client-side role check in `GalleryAdminPage.tsx` using the `has_role` function or querying `user_roles` to redirect non-admins.

---

## 4. MODERATE -- Privacy/Terms Pages Missing from Sitemap

The sitemap does not include `/privacy` or `/terms` routes.

**Fix:** Add both routes to the `staticRoutes` array in the sitemap edge function.

---

## 5. MINOR -- Blog Footer Link Points to Placeholder Content

The blog page exists at `/blog` and is linked from the footer. Confirm blog posts are real content and not placeholder/hardcoded dummy entries before launch.

---

## 6. VISUAL -- No Console Errors

No JavaScript errors detected. Only benign postMessage warnings from the Lovable preview environment (will not appear in production).

---

## 7. VISUAL -- Header and Dropdown Look Good

The desktop nav with the cinematic dropdown, red gradient accent line, and staggered division items all render correctly. Active states and hover interactions work as expected.

---

## 8. SEO Checklist

| Item | Status |
|------|--------|
| index.html meta tags | OK -- title, description, OG, Twitter all set |
| Canonical domain | OK -- `https://hox.ae` |
| PageMeta on all pages | OK -- each page sets unique title/description |
| robots.txt | OK -- blocks /auth and /admin/ |
| Sitemap | NEEDS FIX -- wrong default domain |
| Favicon | OK -- PNG favicon configured |
| Structured data (JSON-LD) | OK -- StructuredData component renders globally |

---

## 9. Security Summary

| Issue | Level | Status |
|-------|-------|--------|
| Gallery RLS (admin-only writes) | error | FIXED in last session |
| Storage RLS (admin-only uploads) | error | FIXED in last session |
| Admin page client-side check | warn | Needs fix |
| Sitemap baseUrl validation | warn | Needs fix |
| Contact form no backend | warn | Needs fix |
| Leaked password protection | warn | Enable in auth settings |

---

## Recommended Fix Priority for Launch

1. **Contact form** -- make it functional (edge function + database table)
2. **Sitemap default URL** -- change to `https://hox.ae` and add domain whitelist
3. **Admin role check** -- add client-side `user_roles` verification
4. **Sitemap routes** -- add `/privacy` and `/terms`
5. **Leaked password protection** -- enable via auth configuration

---

## Technical Implementation Details

### Contact Form (edge function approach)
- Create `contact_submissions` table with fields: name, company, email, phone, division, message, created_at
- Enable RLS with public INSERT (anon) and admin-only SELECT
- Create `submit-contact` edge function with zod validation, rate limiting, and optional email forwarding
- Update `ContactPage.tsx` to call the edge function

### Sitemap Fix
- Update line 42 of `supabase/functions/sitemap/index.ts` to default to `https://hox.ae`
- Add domain whitelist validation
- Add `/privacy` and `/terms` to staticRoutes

### Admin Role Check
- In `GalleryAdminPage.tsx`, after auth check, query `user_roles` table to verify admin role
- Redirect non-admins to home page with a toast message

### Files to Modify
- `supabase/functions/sitemap/index.ts`
- `src/pages/ContactPage.tsx`
- `src/pages/admin/GalleryAdminPage.tsx`

### Files to Create
- `supabase/functions/submit-contact/index.ts`
- Database migration for `contact_submissions` table

