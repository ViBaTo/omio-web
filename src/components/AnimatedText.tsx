'use client';

import { motion } from 'framer-motion';
import { staggerContainer, lineReveal } from '@/lib/animations';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  splitBy?: 'word' | 'char';
  once?: boolean;
}

export default function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  splitBy = 'word',
  once = true,
}: AnimatedTextProps) {
  const MotionTag = motion.create(Tag);
  const items = splitBy === 'char' ? text.split('') : text.split(' ');

  return (
    <MotionTag
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
    >
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={lineReveal}>
            {item}
            {splitBy === 'word' && i < items.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
