'use client';

import { motion } from 'framer-motion';
import { SECTIONS, FOOTER } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function Footer() {
  return (
    <footer
      className="relative py-24 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: '#001219' }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span
            className="font-fabrica text-4xl md:text-5xl tracking-[0.05em]"
            style={{ color: '#E8F5F2' }}
          >
            OMIO
          </span>
          <p
            className="font-artesano italic text-sm tracking-[0.3em] mt-2"
            style={{ color: '#0A9396' }}
          >
            Atelier & Design
          </p>
        </motion.div>

        {/* Gold line */}
        <div
          className="w-24 h-[1px] mx-auto my-10"
          style={{ backgroundColor: '#0A9396', opacity: 0.3 }}
        />

        {/* Nav links */}
        <motion.nav
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SECTIONS.map((section) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
              style={{ color: '#E8F5F2', opacity: 0.4 }}
              variants={fadeInUp}
            >
              {section.label.split(' ')[0]}
            </motion.a>
          ))}
        </motion.nav>

        {/* Copyright */}
        <p
          className="font-ingeniero text-[10px] tracking-[0.15em] mt-16"
          style={{ color: '#E8F5F2', opacity: 0.2 }}
        >
          {FOOTER.copyright}
        </p>

        {/* Easter egg */}
        <p
          className="font-body text-[10px] italic mt-4"
          style={{ color: '#0A9396', opacity: 0.15 }}
        >
          {FOOTER.easter_egg}
        </p>
      </div>
    </footer>
  );
}
