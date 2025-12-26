import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import { useGalleryImages, type Division, type GalleryImage } from '@/hooks/useGalleryImages';
import { GalleryStructuredData } from '@/components/seo/GalleryStructuredData';
import { DivisionNav } from './DivisionNav';
import { LazyImage } from '@/components/ui/LazyImage';
interface StaticGalleryImage {
  src: string;
  alt: string;
  caption?: string;
  project?: string;
}

interface FullPageGalleryProps {
  division: Division;
  images?: StaticGalleryImage[];
  maxImages?: number;
  showViewAll?: boolean;
}

const divisionColors: Record<Division, string> = {
  exhibitions: 'text-[hsl(var(--hox-red))]',
  events: 'text-[hsl(var(--hox-blue))]',
  retail: 'text-[hsl(var(--hox-orange))]',
  interiors: 'text-[hsl(var(--hox-green))]',
};

const divisionBg: Record<Division, string> = {
  exhibitions: 'bg-[hsl(var(--hox-red))]',
  events: 'bg-[hsl(var(--hox-blue))]',
  retail: 'bg-[hsl(var(--hox-orange))]',
  interiors: 'bg-[hsl(var(--hox-green))]',
};

const divisionRoutes: Record<Division, string> = {
  exhibitions: '/gallery/exhibitions',
  events: '/gallery/events',
  retail: '/gallery/retail',
  interiors: '/gallery/interiors',
};

export function FullPageGallery({ division, images: fallbackImages, maxImages, showViewAll = false }: FullPageGalleryProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  
  const { data: dbImages, isLoading } = useGalleryImages(division);
  const allImages = dbImages && dbImages.length > 0 ? dbImages : (fallbackImages || []);
  const images = maxImages ? allImages.slice(0, maxImages) : allImages;
  const hasMoreImages = maxImages && allImages.length > maxImages;

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
  }, [selectedIndex, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, goToPrevious, goToNext]);


  // Convert to GalleryImage type for structured data
  const galleryImages = images.map((img, i) => ({
    id: 'id' in img ? (img as GalleryImage).id : `static-${i}`,
    src: img.src,
    alt: img.alt,
    caption: img.caption,
    project: img.project,
    division: division,
    display_order: 'display_order' in img ? (img as GalleryImage).display_order : i,
    title: 'title' in img ? (img as GalleryImage).title : undefined,
    seo_description: 'seo_description' in img ? (img as GalleryImage).seo_description : undefined,
    keywords: 'keywords' in img ? (img as GalleryImage).keywords : undefined,
  })) as GalleryImage[];

  return (
    <>
      {/* Division Navigation */}
      <DivisionNav currentDivision={division} />

      {/* Schema.org Structured Data */}
      <GalleryStructuredData 
        division={division} 
        images={galleryImages}
        pageUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />

      <section ref={ref} className="py-16 lg:py-20 bg-card" aria-label={`${division} project gallery`}>
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span
                className={cn(
                  'inline-flex items-center gap-2 text-sm font-medium tracking-widest mb-6 transition-all duration-700',
                  divisionColors[division],
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <span className={cn('w-8 h-px', divisionBg[division])} />
                Project gallery
              </span>
              
              <h2
                className={cn(
                  'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-all duration-700 delay-150',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
              >
                <span className="hox-brand">See our work in </span>
                <span className={divisionColors[division]}>Action.</span>
              </h2>
            </div>

          </header>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-20" role="status" aria-label="Loading gallery">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Gallery Grid with Semantic HTML */}
          {!isLoading && images.length > 0 && (
            <>
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                role="list"
                aria-label={`${division} gallery images`}
              >
                {images.map((image, index) => (
                  <motion.figure
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      y: isVisible ? 0 : 20 
                    }}
                    transition={{ 
                      delay: 0.1 * (index % 6),
                      duration: 0.5 
                    }}
                    className="group relative overflow-hidden rounded-lg cursor-pointer m-0 aspect-square"
                    onClick={() => openLightbox(index)}
                    role="listitem"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                    aria-label={`View ${image.alt} - ${image.project || division} project`}
                  >
                    <LazyImage
                      src={image.src}
                      alt={image.alt}
                      title={('title' in image && (image as GalleryImage).title) || image.alt}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                  </motion.figure>
                ))}
              </div>

              {/* View All Link */}
              {showViewAll && hasMoreImages && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center mt-12"
                >
                  <Link
                    to={divisionRoutes[division]}
                    className={cn(
                      'group inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-muted-foreground transition-colors duration-300',
                      division === 'exhibitions' && 'hover:text-[hsl(var(--hox-red))]',
                      division === 'events' && 'hover:text-[hsl(var(--hox-blue))]',
                      division === 'retail' && 'hover:text-[hsl(var(--hox-orange))]',
                      division === 'interiors' && 'hover:text-[hsl(var(--hox-green))]'
                    )}
                  >
                    View all photos
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              className="absolute inset-0 flex items-center justify-center p-16 md:p-24"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.figure
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-full max-h-full m-0"
                >
                  <img
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    title={('title' in images[selectedIndex] && (images[selectedIndex] as GalleryImage).title) || images[selectedIndex].alt}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                  />
                  
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Thumbnail Strip */}
            <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border max-w-[90vw] overflow-x-auto" aria-label="Gallery thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                  className={cn(
                    'relative w-16 h-12 md:w-20 md:h-14 rounded overflow-hidden flex-shrink-0 transition-all duration-300',
                    index === selectedIndex 
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                      : 'opacity-50 hover:opacity-100'
                  )}
                  aria-label={`Go to image ${index + 1}: ${image.alt}`}
                  aria-current={index === selectedIndex ? 'true' : undefined}
                >
                  <img
                    src={image.src}
                    alt=""
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </nav>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-sm text-muted-foreground" aria-live="polite">
              <span className="text-foreground font-medium">{selectedIndex + 1}</span>
              <span> / {images.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
