'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/constants';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectCard({ project, index, total }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4 md:px-16">
      <div className="relative w-full max-w-[85vw] md:max-w-[75vw]">
        {/* Counter between projects */}
        <div className="absolute -top-16 left-0">
          <span
            className="font-ingeniero text-sm tracking-[0.3em]"
            style={{ color: '#E8F5F2', opacity: 0.3 }}
          >
            {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Image container with organic mask */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          style={{
            clipPath: 'polygon(3% 0%, 100% 2%, 97% 100%, 0% 97%)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor="precision"
        >
          <motion.div
            className="aspect-[16/10] w-full"
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* PLACEHOLDER: Project image */}
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(${135 + index * 30}deg, #003845 0%, #94D2BD 40%, #00252D 100%)`,
                filter: isHovered ? 'grayscale(0.7)' : 'grayscale(0)',
                transition: 'filter 0.5s ease',
              }}
            />
          </motion.div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="font-ingeniero text-sm tracking-[0.3em] uppercase"
              style={{ color: '#E8F5F2' }}
            >
              Descubrir →
            </span>
          </motion.div>

          {/* Project info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            />
            <div className="relative z-10">
              <p
                className="font-ingeniero text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: '#94D2BD' }}
              >
                {project.category}
              </p>
              <h3
                className="font-fabrica uppercase text-2xl md:text-4xl lg:text-5xl tracking-[0.03em]"
                style={{ color: '#E8F5F2' }}
              >
                {project.title}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
