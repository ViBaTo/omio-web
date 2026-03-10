'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function CounterAnimation({
  value,
  suffix = '',
  className = '',
  duration = 2,
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = Math.round(v) + suffix;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      0{suffix}
    </motion.span>
  );
}
