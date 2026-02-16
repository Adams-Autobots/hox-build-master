# Video CDN Migration — REQUIRED

## Problem
The following video files are committed directly to the Git repo and bundled into the Vite build:

- src/assets/hero-video-v3.mp4
- src/assets/hero-events-video-v2.mp4
- src/assets/hero-exhibitions-video-v2.mp4
- src/assets/hero-interiors-video.mp4
- src/assets/hero-retail-video.mp4
- src/assets/hero-whyhox-video-v2.mp4

**Total: ~41MB**

This slows down:
- Git clone / CI/CD pipelines
- Initial page load (Vite bundles or lazy-loads these from the same origin)
- Build times

## Solution
1. Upload all videos to Supabase Storage (bucket: `site-assets`) or a dedicated CDN (Cloudflare R2, Bunny CDN)
2. Update import paths in components to use CDN URLs instead of local imports
3. Add videos to .gitignore
4. Enable CDN-level compression and adaptive bitrate if available

## Components affected
- src/components/home/HeroSection.tsx (hero-video-v3.mp4)
- src/components/home/WhyHoxVideoSection.tsx (hero-whyhox-video-v2.mp4)
- src/components/divisions/DivisionHero.tsx (all division hero videos)
- src/pages/divisions/*.tsx (video imports)

## Priority: HIGH
This should be done before or immediately after launch.
