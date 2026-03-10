'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 150);

    // Minimum display time + window load
    const minTime = new Promise((resolve) => setTimeout(resolve, 2000));
    const windowLoad = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', () => resolve(true), { once: true });
      }
    });

    Promise.all([minTime, windowLoad]).then(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    });

    // Lock scroll while loading
    document.body.style.overflow = 'hidden';
    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#0A0908' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Pulsing OMIO logo */}
          <motion.div
            className="font-fabrica text-[clamp(3rem,10vw,7rem)] tracking-[0.05em]"
            style={{ color: '#F5F0EB' }}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            OMIO
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="font-artesano italic text-sm tracking-[0.4em] mt-2"
            style={{ color: '#C4963A' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 }}
          >
            ATELIER & DESIGN
          </motion.div>

          {/* Progress bar */}
          <div className="mt-12 w-48 h-[1px] bg-[#2C2218] overflow-hidden">
            <motion.div
              className="h-full origin-left"
              style={{ backgroundColor: '#C4963A' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.min(progress / 100, 1) }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
