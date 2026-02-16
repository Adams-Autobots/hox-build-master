// Video assets served from Lovable Cloud Storage (site-assets bucket)
const STORAGE_BASE = 'https://ptsofbnopjrbgtlmvrbk.supabase.co/storage/v1/object/public/site-assets/videos';

export const VIDEO_URLS = {
  heroMain: `${STORAGE_BASE}/hero-video-v3.mp4`,
  heroEvents: `${STORAGE_BASE}/hero-events-video-v2.mp4`,
  heroExhibitions: `${STORAGE_BASE}/hero-exhibitions-video-v2.mp4`,
  heroInteriors: `${STORAGE_BASE}/hero-interiors-video.mp4`,
  heroRetail: `${STORAGE_BASE}/hero-retail-video.mp4`,
  heroWhyHox: `${STORAGE_BASE}/hero-whyhox-video-v2.mp4`,
} as const;
