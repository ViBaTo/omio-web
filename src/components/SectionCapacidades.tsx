'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import AnimatedText from './AnimatedText';
import CounterAnimation from './CounterAnimation';
import { CAPACIDADES, STATS } from '@/lib/constants';
import { fadeInUp, staggerContainer, letterReveal, letterChild } from '@/lib/animations';

export default function SectionCapacidades() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="capacidades"
      ref={sectionRef}
      className="relative min-h-screen py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: '#1c3037' }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionLabel
          number="02"
          label="CAPACIDADES INDUSTRIALES"
          accentColor="#94D2BD"
          numberColor="#48CAE4"
        />

        {/* Title — Letters fall with gravity */}
        <motion.h2
          className="font-fabrica uppercase text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-[0.05em] mt-8"
          style={{ color: '#E8F5F2' }}
          variants={letterReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          {CAPACIDADES.title.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={letterChild}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Intro text */}
        <motion.p
          className="font-body text-base md:text-lg leading-relaxed mt-12 max-w-3xl"
          style={{ color: '#E8F5F2', opacity: 0.7 }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CAPACIDADES.intro}
        </motion.p>

        {/* Industrial Blocks */}
        <motion.div
          className="mt-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CAPACIDADES.blocks.map((block) => (
            <CapabilityBlock key={block.number} {...block} />
          ))}
        </motion.div>

        {/* Stats Counter Row */}
        <div className="mt-24 grid grid-cols-3 gap-8 md:gap-16 max-w-3xl">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <CounterAnimation
                value={stat.value}
                suffix={stat.suffix}
                className="font-ingeniero text-[clamp(2rem,5vw,4rem)] font-bold"
              />
              <p
                className="font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-2"
                style={{ color: '#94D2BD' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityBlock({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative border-t border-[#48CAE4]/20 py-8 md:py-12 group"
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="precision"
    >
      {/* Hover background image */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.08 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(90deg, #162a30 0%, #263f47 50%, #1c3037 100%)',
        }}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-8 items-start">
        {/* Number */}
        <div className="col-span-2 md:col-span-1">
          <span
            className="font-ingeniero text-2xl md:text-4xl"
            style={{ color: '#94D2BD' }}
          >
            {number}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-10 md:col-span-4">
          <h3
            className="font-fabrica uppercase text-xl md:text-3xl tracking-[0.05em]"
            style={{ color: '#E8F5F2' }}
          >
            {title}
          </h3>
        </div>

        {/* Description */}
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <p
            className="font-body text-base leading-relaxed"
            style={{ color: '#E8F5F2', opacity: 0.6 }}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
