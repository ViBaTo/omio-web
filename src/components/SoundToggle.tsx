'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Locate the hero video on mount (and observe DOM changes in case it mounts later)
  useEffect(() => {
    function findVideo() {
      const el = document.querySelector<HTMLVideoElement>('[data-hero-video]');
      if (el && el !== videoRef.current) {
        videoRef.current = el;
        setHasVideo(true);
        // Reflect the current mute state in the button
        setIsPlaying(!el.muted);
      } else if (!el && videoRef.current) {
        videoRef.current = null;
        setHasVideo(false);
        setIsPlaying(false);
      }
    }

    findVideo();

    const observer = new MutationObserver(findVideo);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Auto-mute when the hero video is no longer visible to avoid sound bleeding through the rest of the page
  useEffect(() => {
    if (!hasVideo || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.muted) {
          video.muted = true;
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [hasVideo]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1;
      // Some browsers (notably Safari) do not pick up the audio track on a
      // video that is already playing muted. Pausing and re-playing inside the
      // user gesture forces the audio pipeline to attach.
      try {
        video.pause();
      } catch {
        // ignore
      }
      video.play().catch((err) => {
        console.warn('[SoundToggle] play() rejected', err);
        video.muted = true;
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      video.muted = true;
      setIsPlaying(false);
    }
  }, []);

  if (!hasVideo) return null;

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center"
      onClick={toggle}
      aria-label={isPlaying ? 'Silenciar sonido' : 'Activar sonido'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      whileHover={{ opacity: 1 }}
      transition={{ delay: 4 }}
      data-cursor="precision"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M2 7h3l4-4v12l-4-4H2V7z"
          stroke="var(--current-text, #F3ECEB)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {isPlaying ? (
          <>
            <path
              d="M12 6.5a3.5 3.5 0 0 1 0 5"
              stroke="var(--current-text, #F3ECEB)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M14 4.5a6 6 0 0 1 0 9"
              stroke="var(--current-text, #F3ECEB)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path
            d="M12 6l4 6M16 6l-4 6"
            stroke="var(--current-text, #F3ECEB)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        )}
      </svg>
    </motion.button>
  );
}
