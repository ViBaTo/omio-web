'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './SectionLabel';
import AnimatedText from './AnimatedText';
import { NOSOTROS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

function highlightFirms(text: string, firms: string[]): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  firms.forEach((firm) => {
    const idx = remaining.indexOf(firm);
    if (idx !== -1) {
      if (idx > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
      }
      parts.push(
        <span key={key++} className="gold-underline is-visible font-artesano italic">
          {firm}
        </span>
      );
      remaining = remaining.slice(idx + firm.length);
    }
  });

  if (remaining) {
    parts.push(<span key={key++}>{remaining}</span>);
  }

  return parts;
}

export default function SectionNosotros() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: 'var(--artesano-bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Text Column */}
          <motion.div
            className="lg:col-span-6 xl:col-span-5 max-w-[600px]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
          >
            <SectionLabel
              number="01"
              label="NOSOTROS"
              accentColor="#C4963A"
              numberColor="#C4963A"
            />

            <motion.div className="mt-8" variants={fadeInUp}>
              <AnimatedText
                text={NOSOTROS.title}
                as="h2"
                className="font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1]"
                splitBy="word"
              />
            </motion.div>

            <motion.p
              className="font-body text-base md:text-lg leading-relaxed mt-10"
              style={{ color: '#2C2218', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {highlightFirms(NOSOTROS.paragraphs[0], NOSOTROS.highlightedFirms)}
            </motion.p>

            <motion.p
              className="font-body text-base md:text-lg leading-relaxed mt-6"
              style={{ color: '#2C2218', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {NOSOTROS.paragraphs[1]}
            </motion.p>
          </motion.div>

          {/* Image Column */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <motion.div
              className="relative overflow-hidden"
              style={{
                clipPath: 'polygon(8% 0%, 100% 3%, 95% 100%, 0% 97%)',
                y: imageY,
              }}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="aspect-[4/5] w-full"
                style={{ scale: imageScale }}
              >
                {/* PLACEHOLDER: Artisan workshop image */}
                <div
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, #2C2218 0%, #C4963A 50%, #1a1208 100%)',
                  }}
                />
              </motion.div>
              {/* Grain overlay on image */}
              <div className="absolute inset-0 texture-artesano opacity-20 mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
