'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import { CONTACTA } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function HomeContacto() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: '#E8F5F2' }}
    >
      <div className="max-w-[700px] mx-auto text-center">
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-ingeniero text-sm tracking-[0.3em]" style={{ color: '#077275' }}>05</span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: '#077275', opacity: 0.4 }} />
          <span className="font-ingeniero text-[11px] tracking-[0.2em] uppercase" style={{ color: '#077275' }}>
            CONTACTO
          </span>
        </motion.div>

        <AnimatedText
          text={CONTACTA.title}
          as="h2"
          className="font-artesano italic text-[clamp(2.5rem,7vw,5rem)] leading-[1.05]"
          splitBy="word"
        />

        <motion.p
          className="font-body text-base md:text-lg leading-relaxed mt-8"
          style={{ color: '#263f47', opacity: 0.85 }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CONTACTA.paragraphs[0]}
        </motion.p>

        <motion.div
          className="mt-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="/contacto"
            className="cta-fill inline-flex items-center justify-center px-16 py-6 font-artesano italic text-2xl md:text-3xl tracking-wide transition-colors duration-500"
            style={{ color: '#077275' }}
            data-cursor="precision"
          >
            {CONTACTA.cta}
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="font-ingeniero text-xs tracking-[0.15em]" style={{ color: '#263f47', opacity: 0.5 }}>
            {CONTACTA.contact.email}
          </span>
          <span className="hidden md:inline font-ingeniero text-xs" style={{ color: '#077275', opacity: 0.3 }}>·</span>
          <span className="font-ingeniero text-xs tracking-[0.15em]" style={{ color: '#263f47', opacity: 0.5 }}>
            {CONTACTA.contact.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
