
# Verify and Standardize Heading Sizes

## Current State Analysis

After reviewing all pages and components, I found **inconsistencies** in heading sizes across the site. Here's the breakdown:

---

## Hero Banner Headings (h1)

| Page/Component | Current Size | Status |
|----------------|--------------|--------|
| **Home (HeroSection)** | `text-5xl md:text-6xl lg:text-7xl` | Standard |
| **Division pages (DivisionHero)** | `text-5xl md:text-6xl lg:text-7xl` | Standard |
| **About page** | `text-5xl md:text-6xl lg:text-7xl` | Standard |
| **Work page** | `text-5xl md:text-6xl lg:text-7xl` | Standard |
| **Blog page** | `text-5xl md:text-6xl lg:text-7xl` | Standard |
| **Blog post page** | `text-4xl md:text-5xl lg:text-6xl` | **Smaller** |
| **Contact page** | `text-5xl md:text-6xl` (missing lg:text-7xl) | **Missing lg size** |
| **WhyHoxVideoSection** | `text-4xl md:text-6xl lg:text-7xl` | **Inconsistent mobile** |
| **404 page** | `text-4xl md:text-5xl` | **Smaller** (intentional) |

---

## Section Headings (h2)

| Component | Current Size | Status |
|-----------|--------------|--------|
| **About page "Our Story"** | `text-4xl md:text-5xl` | **Missing lg size** |
| **ResourcesSection** | `text-3xl md:text-4xl lg:text-5xl` | Standard |
| **TestimonialsSection** | `text-3xl md:text-4xl lg:text-5xl` | Standard |
| **CapabilitiesGrid** | `text-3xl md:text-4xl lg:text-5xl` | Standard |
| **ProcessTimeline** | `text-3xl md:text-4xl lg:text-5xl` | Standard |
| **FullPageGallery** | `text-3xl md:text-4xl lg:text-5xl` | Standard |
| **DivisionFAQ** | `text-3xl md:text-4xl lg:text-5xl` | Standard |

---

## Issues to Fix

### 1. Contact Page Hero (h1)
**Current:** `text-5xl md:text-6xl`  
**Should be:** `text-5xl md:text-6xl lg:text-7xl`

### 2. Blog Post Page Hero (h1)
**Current:** `text-4xl md:text-5xl lg:text-6xl`  
**Should be:** `text-5xl md:text-6xl lg:text-7xl`

### 3. WhyHoxVideoSection (h2)
**Current:** `text-4xl md:text-6xl lg:text-7xl`  
**Should be:** `text-5xl md:text-6xl lg:text-7xl` (to match hero headings)

### 4. About Page "Our Story" (h2)
**Current:** `text-4xl md:text-5xl`  
**Should be:** `text-3xl md:text-4xl lg:text-5xl` (to match other section headings)

---

## Heading Size Standards

After standardization:

| Type | Size Classes |
|------|--------------|
| **Hero headings (h1)** | `text-5xl md:text-6xl lg:text-7xl` |
| **Section headings (h2)** | `text-3xl md:text-4xl lg:text-5xl` |

**Exception:** 404 page heading remains smaller (`text-4xl md:text-5xl`) as this is intentional for that context.

---

## Files to Update

1. `src/pages/ContactPage.tsx` - Add `lg:text-7xl` to h1
2. `src/pages/BlogPostPage.tsx` - Change h1 to standard hero size
3. `src/components/home/WhyHoxVideoSection.tsx` - Change h2 to standard hero size
4. `src/pages/AboutPage.tsx` - Change "Our Story" h2 to standard section size

---

## Summary

- **4 files** need updates
- All hero banners will use `text-5xl md:text-6xl lg:text-7xl`
- All section headings will use `text-3xl md:text-4xl lg:text-5xl`
- Creates consistent typography hierarchy across the entire site
