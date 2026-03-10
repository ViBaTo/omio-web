'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

interface SectionLabelProps {
  number: string;
  label: string;
  accentColor?: string;
  numberColor?: string;
}

export default function SectionLabel({
  number,
  label,
  accentColor,
  numberColor,
}: SectionLabelProps) {
  return (
    <div className="relative">
      {/* Giant background number */}
      <motion.span
        className="absolute -top-[8vw] -left-[2vw] font-ingeniero text-[30vw] leading-none select-none pointer-events-none"
        style={{ color: numberColor || 'var(--current-accent)', opacity: 0.05 }}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {number}
      </motion.span>

      {/* Small label */}
      <motion.span
        className="font-ingeniero text-[11px] tracking-[0.3em] uppercase"
        style={{ color: accentColor || 'var(--current-accent)' }}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {label}
      </motion.span>
    </div>
  );
}
