import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, Expand, Grid3X3 } from 'lucide-react';

type Division = 'exhibitions' | 'events' | 'retail' | 'interiors';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  project?: string;
}

interface FullPageGalleryProps {
  division: Division;
  images: GalleryImage[];
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

export function FullPageGallery({ division, images }: FullPageGalleryProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(false);

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

  // Keyboard navigation
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

  // Masonry-style layout classes
  const getGridClass = (index: number) => {
    const patterns = [
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2', // Tall
      'col-span-1 row-span-1', // Small
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Small
    ];
    return patterns[index % patterns.length];
  };

  return (
    <>
      <section ref={ref} className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
                See our work in action.
              </h2>
            </div>

            {/* View Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setIsGridView(!isGridView)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-primary/50 transition-colors self-start md:self-auto"
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="text-sm">{isGridView ? 'Masonry View' : 'Grid View'}</span>
            </motion.button>
          </div>

          {/* Gallery Grid */}
          <div
            className={cn(
              'transition-all duration-500',
              isGridView
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                : 'grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4'
            )}
          >
            {images.map((image, index) => (
              <motion.div
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
                className={cn(
                  'group relative overflow-hidden rounded-lg cursor-pointer',
                  !isGridView && getGridClass(index)
                )}
                onClick={() => openLightbox(index)}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {image.project && (
                    <span className={cn('text-xs uppercase tracking-wider mb-1', divisionColors[division])}>
                      {image.project}
                    </span>
                  )}
                  {image.caption && (
                    <p className="text-sm md:text-base font-medium text-foreground line-clamp-2">
                      {image.caption}
                    </p>
                  )}
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <Expand className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
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
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div 
              className="absolute inset-0 flex items-center justify-center p-16 md:p-24"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-full max-h-full"
                >
                  <img
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                  />
                  
                  {/* Caption */}
                  {(images[selectedIndex].caption || images[selectedIndex].project) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute -bottom-16 left-0 right-0 text-center"
                    >
                      {images[selectedIndex].project && (
                        <span className={cn('text-sm uppercase tracking-wider', divisionColors[division])}>
                          {images[selectedIndex].project}
                        </span>
                      )}
                      {images[selectedIndex].caption && (
                        <p className="text-lg text-muted-foreground mt-1">
                          {images[selectedIndex].caption}
                        </p>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-border max-w-[90vw] overflow-x-auto">
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
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{selectedIndex + 1}</span>
              <span> / {images.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
