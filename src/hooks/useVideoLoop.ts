import { useRef, useCallback, useEffect } from 'react';

interface UseVideoLoopOptions {
  forwardRate?: number;
  reverseRate?: number;
  endBuffer?: number;
  startBuffer?: number;

  /** Throttle reverse stepping to reduce seek pressure on the decoder */
  reverseFps?: number;
  /** Minimum delta between currentTime and targetTime before seeking */
  seekEpsilon?: number;
  /** Consider reverse stalled if currentTime doesn't change for this long */
  stallMs?: number;
  /** Consider seeking stuck if video.seeking stays true for this long */
  maxSeekingMs?: number;
  /** Extra jump (seconds) applied during stall recovery */
  recoveryJump?: number;
}

export function useVideoLoop(options: UseVideoLoopOptions = {}) {
  const {
    forwardRate = 1,
    reverseRate = 1,
    endBuffer = 0.15,
    startBuffer = 0.05,
    reverseFps = 30,
    seekEpsilon = 0.01,
    stallMs = 800,
    maxSeekingMs = 1200,
    recoveryJump = 0.2,
  } = options;
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const directionRef = useRef<'forward' | 'reverse'>('forward');
  const animationFrameRef = useRef<number | null>(null);

  // Reverse playback control (seek-safe)
  const reverseTargetTimeRef = useRef<number | null>(null);
  const reverseLastTickRef = useRef<number>(0);
  const reverseLastProgressAtRef = useRef<number>(0);
  const reverseLastCurrentTimeRef = useRef<number>(0);
  const reverseSeekingSinceRef = useRef<number | null>(null);

  const cancelAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    reverseTargetTimeRef.current = null;
    reverseSeekingSinceRef.current = null;
  }, []);

  const startReversePlayback = useCallback(
    (video: HTMLVideoElement) => {
      if (directionRef.current === 'reverse') return;

      cancelAnimation();
      directionRef.current = 'reverse';

      const safeStart = Number.isFinite(video.duration)
        ? Math.min(video.currentTime, Math.max(startBuffer, video.duration - endBuffer))
        : video.currentTime;

      video.pause();
      reverseTargetTimeRef.current = safeStart;
      reverseLastTickRef.current = performance.now();
      reverseLastProgressAtRef.current = reverseLastTickRef.current;
      reverseLastCurrentTimeRef.current = video.currentTime;
      reverseSeekingSinceRef.current = null;

      const reverseStep = (now: number) => {
        if (directionRef.current !== 'reverse') return;

        const frameMs = 1000 / reverseFps;
        const elapsedMs = now - reverseLastTickRef.current;

        if (elapsedMs < frameMs) {
          animationFrameRef.current = requestAnimationFrame(reverseStep);
          return;
        }

        const deltaSeconds = (elapsedMs / 1000) * reverseRate;
        reverseLastTickRef.current = now;

        const currentTarget = reverseTargetTimeRef.current ?? video.currentTime;
        const nextTarget = Math.max(startBuffer, currentTarget - deltaSeconds);
        reverseTargetTimeRef.current = nextTarget;

        // Track seeking duration
        if (video.seeking) {
          if (reverseSeekingSinceRef.current === null) reverseSeekingSinceRef.current = now;
        } else {
          reverseSeekingSinceRef.current = null;
        }

        // Detect progress
        const currentTime = video.currentTime;
        const progressed = Math.abs(currentTime - reverseLastCurrentTimeRef.current) > 0.001;
        if (progressed) {
          reverseLastCurrentTimeRef.current = currentTime;
          reverseLastProgressAtRef.current = now;
        }

        const seekingTooLong =
          reverseSeekingSinceRef.current !== null && now - reverseSeekingSinceRef.current > maxSeekingMs;
        const stalledTooLong = now - reverseLastProgressAtRef.current > stallMs;

        // Seek only when the browser isn't already seeking
        if (!video.seeking && Math.abs(currentTime - nextTarget) > seekEpsilon) {
          try {
            video.currentTime = nextTarget;
          } catch {
            // ignore
          }
        }

        // Recovery: jump further back to encourage landing on a keyframe
        if ((seekingTooLong || stalledTooLong) && nextTarget > startBuffer + recoveryJump) {
          const jumpTarget = Math.max(startBuffer, nextTarget - recoveryJump);
          reverseTargetTimeRef.current = jumpTarget;

          if (!video.seeking) {
            try {
              video.currentTime = jumpTarget;
            } catch {
              // ignore
            }
          }

          reverseLastProgressAtRef.current = now;
          reverseSeekingSinceRef.current = null;
        }

        if (nextTarget <= startBuffer + seekEpsilon) {
          try {
            video.currentTime = startBuffer;
          } catch {
            // ignore
          }

          reverseTargetTimeRef.current = null;
          reverseSeekingSinceRef.current = null;

          // Reached start - switch to forward
          directionRef.current = 'forward';
          animationFrameRef.current = null;
          video.playbackRate = forwardRate;
          video.play().catch(() => {});
          return;
        }

        animationFrameRef.current = requestAnimationFrame(reverseStep);
      };

      animationFrameRef.current = requestAnimationFrame(reverseStep);
    },
    [
      cancelAnimation,
      endBuffer,
      forwardRate,
      maxSeekingMs,
      recoveryJump,
      reverseFps,
      reverseRate,
      seekEpsilon,
      stallMs,
      startBuffer,
    ]
  );

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
