'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import AnimatedText from './AnimatedText';
import ProcessTimeline from './ProcessTimeline';
import { INGENIERIA } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

function SVGCheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mb-4">
      <motion.path
        d="M4 16 L14 26 L28 6"
        stroke="#005F73"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </svg>
  );
}

export default function SectionIngenieria() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="ingenieria"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: '#D4EAE4' }}
    >
      {/* Blueprint dot grid overlay */}
      <div className="absolute inset-0 texture-ingeniero pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionLabel
          number="04"
          label="INGENIERÍA"
          accentColor="#005F73"
          numberColor="#005F73"
        />

        <motion.div className="mt-8">
          <AnimatedText
            text={INGENIERIA.title}
            as="h2"
            className="font-artesano italic text-[clamp(2rem,5vw,4.5rem)] leading-[1.05]"
            splitBy="word"
          />
        </motion.div>

        <motion.p
          className="font-body text-base md:text-lg leading-relaxed mt-10 max-w-3xl"
          style={{ color: '#005F73', opacity: 0.8 }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {INGENIERIA.intro}
        </motion.p>

        {/* Process Timeline */}
        <div className="mt-20">
          <ProcessTimeline />
        </div>

        {/* Two detail blocks */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {INGENIERIA.blocks.map((block) => (
            <motion.div
              key={block.title}
              className="p-8 md:p-10 border border-[#005F73]/15"
              variants={fadeInUp}
            >
              <SVGCheckIcon />
              <h3
                className="font-artesano text-xl md:text-2xl"
                style={{ color: '#005F73' }}
              >
                {block.title}
              </h3>
              <p
                className="font-body text-base leading-relaxed mt-4"
                style={{ color: '#005F73', opacity: 0.7 }}
              >
                {block.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
