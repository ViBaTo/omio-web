'use client';

import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import AnimatedText from './AnimatedText';
import { CONTACTA } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function SectionContacta() {
  return (
    <section
      id="contacta"
      className="relative min-h-screen flex items-center py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: 'var(--artesano-bg)' }}
    >
      <div className="max-w-[700px] mx-auto text-center">
        <SectionLabel
          number="06"
          label="CONTACTA"
          accentColor="#C4963A"
          numberColor="#C4963A"
        />

        <motion.div className="mt-8">
          <AnimatedText
            text={CONTACTA.title}
            as="h2"
            className="font-artesano italic text-[clamp(2.5rem,7vw,6rem)] leading-[1.05]"
            splitBy="word"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          {CONTACTA.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="font-body text-base md:text-lg leading-relaxed mt-8 first:mt-12"
              style={{ color: '#2C2218', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* CTA Button — gold fill effect */}
        <motion.div
          className="mt-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href={`mailto:${CONTACTA.contact.email}`}
            className="cta-fill inline-flex items-center justify-center px-16 py-6 font-artesano italic text-2xl md:text-3xl tracking-wide transition-colors duration-500"
            style={{ color: '#C4963A' }}
            data-cursor="precision"
          >
            {CONTACTA.cta}
          </a>
        </motion.div>

        {/* Contact details */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a
            href={`mailto:${CONTACTA.contact.email}`}
            className="font-ingeniero text-xs tracking-[0.15em] transition-opacity hover:opacity-100"
            style={{ color: '#2C2218', opacity: 0.5 }}
          >
            {CONTACTA.contact.email}
          </a>
          <span
            className="hidden md:inline font-ingeniero text-xs"
            style={{ color: '#C4963A', opacity: 0.3 }}
          >
            ·
          </span>
          <a
            href={`tel:${CONTACTA.contact.phone.replace(/\s/g, '')}`}
            className="font-ingeniero text-xs tracking-[0.15em] transition-opacity hover:opacity-100"
            style={{ color: '#2C2218', opacity: 0.5 }}
          >
            {CONTACTA.contact.phone}
          </a>
          <span
            className="hidden md:inline font-ingeniero text-xs"
            style={{ color: '#C4963A', opacity: 0.3 }}
          >
            ·
          </span>
          <span
            className="font-ingeniero text-xs tracking-[0.15em]"
            style={{ color: '#2C2218', opacity: 0.5 }}
          >
            {CONTACTA.contact.location}
          </span>
        </motion.div>

        {/* Social */}
        <div className="mt-8 flex items-center justify-center gap-8">
          <a
            href={CONTACTA.contact.social.instagram}
            className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
            style={{ color: '#2C2218', opacity: 0.4 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href={CONTACTA.contact.social.linkedin}
            className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
            style={{ color: '#2C2218', opacity: 0.4 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
