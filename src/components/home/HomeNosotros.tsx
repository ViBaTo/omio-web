'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import { NOSOTROS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function HomeNosotros() {
  return (
    <section
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: '#F3ECEB' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
          >
            <motion.div className="flex items-center gap-4 mb-6" variants={fadeInUp}>
              <span className="font-ingeniero text-sm tracking-[0.3em]" style={{ color: '#8C7732' }}>
                01
              </span>
              <div className="w-12 h-[1px]" style={{ backgroundColor: '#8C7732', opacity: 0.4 }} />
              <span className="font-ingeniero text-[11px] tracking-[0.2em] uppercase" style={{ color: '#8C7732' }}>
                NOSOTROS
              </span>
            </motion.div>

            <AnimatedText
              text={NOSOTROS.title}
              as="h2"
              className="font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1]"
              splitBy="word"
            />

            <motion.p
              className="font-body text-base md:text-lg leading-relaxed mt-8"
              style={{ color: '#002A3A', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {NOSOTROS.paragraphs[0].slice(0, 200)}...
            </motion.p>

            <motion.div className="mt-10" variants={fadeInUp}>
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-3 font-ingeniero text-[11px] tracking-[0.2em] uppercase group"
                style={{ color: '#8C7732' }}
              >
                <span>Descubrir más</span>
                <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="aspect-[4/5] w-full bg-cover bg-center"
              style={{ backgroundImage: "url('/images/artesania/IMG_1712.jpg')" }}
            />
            <div className="absolute inset-0 texture-artesano opacity-20 mix-blend-overlay" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
