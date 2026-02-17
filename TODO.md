# HOX — Master To-Do List
_Last updated: 17 Feb 2026_

---

## 🔴 DO BEFORE AD SPEND

- [ ] **Set up prerender.io** — serves static HTML to bots/crawlers. Fixes social sharing previews, Google Ads quality scores, and OG tags on all pages. ~$20/month. One-click on Netlify.
- [ ] **Verify hosting SPA fallback is working** — netlify.toml / vercel.json added but needs testing on live domain. Direct URL access (hox.ae/about) must NOT 404.
- [ ] **Test all OG tags with Facebook Debugger** — https://developers.facebook.com/tools/debug/ — check every key URL once prerendering is live.
- [ ] **Set up Facebook Pixel / GTM / LinkedIn Insight Tag** — SPA-aware configuration, test with Tag Assistant before launching campaigns.

---

## 🟡 CONTENT NEEDED (from Adam)

- [ ] **3 best project names, clients, descriptions** for FeaturedProjects homepage section
- [ ] **Hi-res photos** (1920px+ wide) for featured projects
- [ ] **Higher-resolution showreel video** (1080p+) — current source is 848×478, upscaled to 720p. AI upscaling via Topaz Video AI recommended, or re-export from original footage.
- [ ] **Replace placeholder skill images** in ResourcesSection (skill-design-concept.jpg and skill-project-execution.jpg used for all 4 cards)

---

## 🟡 TECHNICAL — MEDIUM PRIORITY

- [ ] **Migrate to Vite SSG or Next.js** — the SPA architecture is the single biggest SEO constraint. Prerendering is a bandaid. Static generation (SSG) is the proper fix for a branding site with infrequent content changes.
- [ ] **Google Search Console** — submit sitemap, monitor indexing, check for crawl errors.
- [ ] **Google Business Profile** — ensure hox.ae is linked, NAP (name/address/phone) matches structured data.
- [ ] **SSL / HTTPS** — verify on live domain. Should be automatic on Netlify/Vercel.
- [ ] **Core Web Vitals** — run Lighthouse on live site after deployment, target 90+ on Performance.
- [ ] **Contact form backend** — currently uses mailto: link (opens email client). Consider Supabase function, Formspree, or Netlify Forms for proper server-side submission.

---

## 🟢 NICE TO HAVE / PHASE 2

- [ ] **Blog / insights section** — massive SEO value. "Exhibition stand design trends 2026", "How to plan a Gulfood stand", etc. Drives organic traffic for long-tail keywords.
- [ ] **Case study pages** — individual project pages with full imagery, client name, challenge/solution/result. Huge for credibility and SEO.
- [ ] **Google Reviews / Trust signals** — embed or link to Google reviews. Add client logos with permission.
- [ ] **WhatsApp Business API** — replace wa.me link with proper Business API for tracking, auto-replies, and CRM integration.
- [ ] **Performance monitoring** — set up Sentry or similar for production error tracking.
- [ ] **Analytics** — Google Analytics 4, connected to Google Ads for conversion tracking.
- [ ] **Backlink strategy** — get listed on Dubai business directories, DWTC partner pages, industry association sites.
- [ ] **Image CDN** — consider Cloudinary or imgix for automatic responsive image sizing and WebP conversion. Current images are served as-is.

---

## ✅ COMPLETED (this session)

- [x] Hero vitrine — video-through-text effect with full coverage text block
- [x] Video upscaled 848×478 → 1280×720 (lanczos + sharpen)
- [x] Dim video wash at 25% behind text
- [x] Bottom fade on hero (no hard crop)
- [x] Mobile header: "h." → full "hoxcreative."
- [x] Hero fills to bottom on mobile (7 repeats, 52px min font)
- [x] Footer rebuilt for mobile (4-column grid, contact with icons)
- [x] Testimonials: broken auto-scroll → proper carousel with swipe
- [x] Typography system standardised across all sections (10 inconsistencies fixed)
- [x] Floating contact widget (phone/WhatsApp/quote) on every page
- [x] Contact details verified sitewide (office +971 4 3477519, WhatsApp +971 58 8950056, info@hox.ae)
- [x] Hosting configs: netlify.toml, vercel.json, _redirects
- [x] Sitemap: added lastmod dates, added privacy/terms pages
- [x] OG images generated for About and Contact pages
- [x] Security headers in hosting config

## ✅ COMPLETED (previous sessions)

- [x] Hero video optimisation: 19MB → 2.4MB (87% reduction)
- [x] Full 7-section homepage flow
- [x] SEO/tech debt audit + fixes
- [x] Security hardening
- [x] Mobile performance fixes
- [x] Brand elevation + nav redesign
- [x] Template detox + UX polish
