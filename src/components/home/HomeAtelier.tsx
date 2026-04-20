'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const GALLERY = [
  { src: '/images/artesania/IMG_1647.jpg', aspect: 'aspect-[4/5]' },
  { src: '/images/artesania/IMG_1823.jpg', aspect: 'aspect-[4/5]' },
  { src: '/images/artesania/colada.jpg', aspect: 'aspect-[4/5]' },
  { src: '/images/artesania/IMG_1410.jpg', aspect: 'aspect-[4/5]' },
  { src: '/images/artesania/IMG_1458.jpg', aspect: 'aspect-[4/5]' },
  { src: '/images/artesania/IMG_2146.jpg', aspect: 'aspect-[4/5]' },
  { src: '/images/artesania/IMG_1853.jpg', aspect: 'aspect-[4/5]' },
  { src: '/images/artesania/IMG_1865.jpg', aspect: 'aspect-[4/5]' },
];

export default function HomeAtelier() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#F3ECEB' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-ingeniero text-sm tracking-[0.3em]" style={{ color: '#8C7732' }}>
            —
          </span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: '#8C7732', opacity: 0.4 }} />
          <span className="font-ingeniero text-[11px] tracking-[0.2em] uppercase" style={{ color: '#8C7732' }}>
            ATELIER
          </span>
        </motion.div>

        <motion.h2
          className="font-artesano italic text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.1] mb-16 max-w-3xl"
          style={{ color: '#002A3A' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Donde la mano del maestro todavía decide.
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          {GALLERY.map((img, i) => (
            <motion.div
              key={img.src}
              variants={fadeInUp}
              className={`relative overflow-hidden ${img.aspect} ${
                i % 5 === 0 ? 'md:translate-y-8' : ''
              } ${i % 4 === 3 ? 'md:-translate-y-4' : ''}`}
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-[1.2s] hover:scale-[1.04]"
                style={{ backgroundImage: `url(${img.src})` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
