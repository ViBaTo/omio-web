'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SECTIONS } from '@/lib/constants';
import { useIsDesktop } from '@/lib/useMediaQuery';

export default function ScrollIndicator() {
  const isDesktop = useIsDesktop();
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();

  const trackHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.label.split(' ')[0]);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="scroll-indicator" aria-hidden="true">
      {/* Progress track */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-[var(--current-accent)] opacity-10">
        <motion.div
          className="w-full bg-[var(--current-accent)] origin-top"
          style={{ height: trackHeight }}
        />
      </div>

      {/* Section name */}
      <span className="fixed right-10 top-1/2 -translate-y-1/2">
        {activeSection}
      </span>
    </div>
  );
}
