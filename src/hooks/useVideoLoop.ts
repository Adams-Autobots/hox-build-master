import { useRef, useCallback } from 'react';

interface UseVideoLoopOptions {
  playbackRate?: number;
}

export function useVideoLoop(options: UseVideoLoopOptions = {}) {
  const { playbackRate = 1 } = options;
  const isReversingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const handleLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.dataset.direction = 'forward';
    isReversingRef.current = false;
  }, []);

  const handleTimeUpdate = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const direction = video.dataset.direction || 'forward';
    
    // Only trigger reverse when going forward and near the end
    // Use a larger threshold to catch it earlier and prevent any pause
    if (direction === 'forward' && video.currentTime >= video.duration - 0.1 && !isReversingRef.current) {
      isReversingRef.current = true;
      video.dataset.direction = 'reverse';
      
      // Don't pause - immediately start reversing
      let lastTime = performance.now();
      
      const reversePlay = (currentTime: number) => {
        const deltaTime = ((currentTime - lastTime) / 1000) * playbackRate;
        lastTime = currentTime;
        const newTime = video.currentTime - deltaTime;
        
        if (newTime > 0.05) {
          video.currentTime = newTime;
          animationFrameRef.current = requestAnimationFrame(reversePlay);
        } else {
          // Reached the beginning - switch back to forward
          video.currentTime = 0.05;
          video.dataset.direction = 'forward';
          isReversingRef.current = false;
          animationFrameRef.current = null;
          // Resume forward playback
          video.play();
        }
      };
      
      animationFrameRef.current = requestAnimationFrame(reversePlay);
    }
  }, [playbackRate]);

  return {
    onLoadedMetadata: handleLoadedMetadata,
    onTimeUpdate: handleTimeUpdate,
  };
}
