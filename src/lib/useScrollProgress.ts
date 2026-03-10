'use client';

import { useScroll, type MotionValue } from 'framer-motion';
import { type RefObject } from 'react';

export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}

export function useSectionProgress(
  ref: RefObject<HTMLElement | null>
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return scrollYProgress;
}
