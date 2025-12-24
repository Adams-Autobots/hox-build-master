import { useRef, useCallback, useEffect } from 'react';

interface UseVideoLoopOptions {
  forwardRate?: number;
  reverseRate?: number;
  endBuffer?: number;
  startBuffer?: number;
}

export function useVideoLoop(options: UseVideoLoopOptions = {}) {
  const { 
    forwardRate = 1, 
    reverseRate = 1, 
    endBuffer = 0.15, 
    startBuffer = 0.05 
  } = options;
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const directionRef = useRef<'forward' | 'reverse'>('forward');
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const cancelAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startReversePlayback = useCallback((video: HTMLVideoElement) => {
    if (directionRef.current === 'reverse') return;
    
    directionRef.current = 'reverse';
    video.pause();
    lastTimeRef.current = performance.now();
    
    const reverseStep = (currentTime: number) => {
      const deltaTime = ((currentTime - lastTimeRef.current) / 1000) * reverseRate;
      lastTimeRef.current = currentTime;
      
      const newTime = video.currentTime - deltaTime;
      
      if (newTime > startBuffer) {
        video.currentTime = newTime;
        animationFrameRef.current = requestAnimationFrame(reverseStep);
      } else {
        // Reached start - switch to forward
        video.currentTime = startBuffer;
        directionRef.current = 'forward';
        animationFrameRef.current = null;
        video.playbackRate = forwardRate;
        video.play().catch(() => {});
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(reverseStep);
  }, [reverseRate, startBuffer, forwardRate]);

  const startForwardWatcher = useCallback((video: HTMLVideoElement) => {
    cancelAnimation();
    
    const watchForward = () => {
      if (directionRef.current === 'forward' && video.currentTime >= video.duration - endBuffer) {
        startReversePlayback(video);
        return;
      }
      
      if (directionRef.current === 'forward') {
        animationFrameRef.current = requestAnimationFrame(watchForward);
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(watchForward);
  }, [cancelAnimation, endBuffer, startReversePlayback]);

  const handleLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    videoRef.current = video;
    directionRef.current = 'forward';
    video.playbackRate = forwardRate;
  }, [forwardRate]);

  const handlePlay = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (directionRef.current === 'forward') {
      startForwardWatcher(video);
    }
  }, [startForwardWatcher]);

  const handleEnded = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    // Fallback if watcher missed it
    const video = e.currentTarget;
    if (directionRef.current === 'forward') {
      video.currentTime = video.duration - endBuffer;
      startReversePlayback(video);
    }
  }, [endBuffer, startReversePlayback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return {
    onLoadedMetadata: handleLoadedMetadata,
    onPlay: handlePlay,
    onEnded: handleEnded,
  };
}
