'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionLabel from './SectionLabel';
import AnimatedText from './AnimatedText';
import { ARTESANIA } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

function renderAtelier(text: string): React.ReactNode[] {
  const parts = text.split('Atelier');
  const result: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    result.push(<span key={`t-${i}`}>{part}</span>);
    if (i < parts.length - 1) {
      result.push(
        <span key={`a-${i}`} className="font-artesano italic" style={{ color: '#C4963A' }}>
          Atelier
        </span>
      );
    }
  });
  return result;
}

export default function SectionArtesania() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section
      id="artesania"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--artesano-bg)' }}
    >
      {/* Full-bleed image */}
      <motion.div
        className="relative w-full h-[80vh] overflow-hidden"
        style={{ y: imageY }}
      >
        {/* PLACEHOLDER: Craftsman hands working */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #2C2218 0%, #C4963A 40%, #1a1208 100%)',
          }}
        />
        <div className="absolute inset-0 texture-artesano opacity-30 mix-blend-overlay" />

        {/* Gradient overlay fading to cream at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 30%, #F5F0EB 95%)',
          }}
        />
      </motion.div>

      {/* Content over the gradient */}
      <div className="relative -mt-48 md:-mt-64 px-6 md:px-12 lg:px-24 pb-32 md:pb-48">
        <div className="max-w-3xl mx-auto lg:mx-0 lg:ml-[15%]">
          <SectionLabel
            number="03"
            label="ARTESANÍA"
            accentColor="#C4963A"
            numberColor="#C4963A"
          />

          <motion.div className="mt-8">
            <AnimatedText
              text={ARTESANIA.title}
              as="h2"
              className="font-artesano italic text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-[#2C2218]"
              splitBy="word"
            />
          </motion.div>

          {/* Giant decorative guillemets */}
          <div className="relative mt-12">
            <span
              className="absolute -top-16 -left-8 font-artesano text-[20vw] leading-none select-none pointer-events-none"
              style={{ color: '#C4963A', opacity: 0.05 }}
            >
              «»
            </span>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
            >
              <motion.p
                className="font-body text-base md:text-lg leading-relaxed relative z-10"
                style={{ color: '#2C2218', opacity: 0.85 }}
                variants={fadeInUp}
              >
                {renderAtelier(ARTESANIA.paragraphs[0])}
              </motion.p>

              <motion.p
                className="font-body text-base md:text-lg leading-relaxed mt-6 relative z-10"
                style={{ color: '#2C2218', opacity: 0.85 }}
                variants={fadeInUp}
              >
                {renderAtelier(ARTESANIA.paragraphs[1])}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
