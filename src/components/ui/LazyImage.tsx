import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  containerClassName?: string;
}

export function LazyImage({ src, alt, title, className, containerClassName }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px', threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', containerClassName)}>
      {/* Blur placeholder */}
      <div
        className={cn(
          'absolute inset-0 bg-muted/50 transition-opacity duration-500',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/30 via-muted/60 to-muted/30" />
      </div>

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          title={title}
          className={cn(
            'transition-all duration-700 ease-out',
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm',
            className
          )}
          onLoad={() => setIsLoaded(true)}
          decoding="async"
        />
      )}
    </div>
  );
}
