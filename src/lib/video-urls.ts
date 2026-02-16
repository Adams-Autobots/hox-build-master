// Video assets
// Hero video served from /public (2.4MB optimised) — others from Supabase CDN
const STORAGE_BASE = 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/site-assets/videos';

export const VIDEO_URLS = {
  heroMain: '/hero-video.mp4',
  heroEvents: `${STORAGE_BASE}/hero-events-video-v2.mp4`,
  heroExhibitions: `${STORAGE_BASE}/hero-exhibitions-video-v2.mp4`,
  heroInteriors: `${STORAGE_BASE}/hero-interiors-video.mp4`,
  heroRetail: `${STORAGE_BASE}/hero-retail-video.mp4`,
  heroWhyHox: `${STORAGE_BASE}/hero-whyhox-video-v2.mp4`,
} as const;
