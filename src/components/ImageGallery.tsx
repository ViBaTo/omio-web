'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectImage } from '@/data/projects';

interface ImageGalleryProps {
  images: ProjectImage[];
  accentColor?: string;
}

export default function ImageGallery({ images, accentColor = '#8C7732' }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) return null;

  return (
    <div>
      {/* Main image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          className="relative w-full aspect-[16/10] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[selected].src})`,
            }}
          />
          {images[selected].caption && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <p className="font-body text-sm" style={{ color: '#F3ECEB', opacity: 0.9 }}>
                {images[selected].caption}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="relative w-20 h-14 md:w-28 md:h-20 overflow-hidden transition-opacity duration-300"
              style={{
                opacity: selected === i ? 1 : 0.4,
                outline: selected === i ? `2px solid ${accentColor}` : '2px solid transparent',
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${img.src})`,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
