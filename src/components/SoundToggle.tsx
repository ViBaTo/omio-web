'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function toggle() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked — ignore silently
      });
    }
    setIsPlaying(!isPlaying);
  }

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
      {/* Speaker icon — SVG lines only */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path
          d="M2 7h3l4-4v12l-4-4H2V7z"
          stroke="var(--current-text, #F5F0EB)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {isPlaying ? (
          <>
            <path
              d="M12 6.5a3.5 3.5 0 0 1 0 5"
              stroke="var(--current-text, #F5F0EB)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M14 4.5a6 6 0 0 1 0 9"
              stroke="var(--current-text, #F5F0EB)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path
            d="M12 6l4 6M16 6l-4 6"
            stroke="var(--current-text, #F5F0EB)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        )}
      </svg>
    </motion.button>
  );
}
