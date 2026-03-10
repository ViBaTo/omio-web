'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HorizontalScrollProps {
  children: ReactNode;
  itemCount: number;
}

export default function HorizontalScroll({ children, itemCount }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${((itemCount - 1) / itemCount) * 100}%`]
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${itemCount * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          className="flex"
          style={{ x, width: `${itemCount * 100}vw` }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
