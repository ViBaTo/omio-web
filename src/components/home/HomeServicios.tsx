'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SERVICES } from '@/data/services';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const WORLD_COLORS = {
  artesano: { bg: '#E8F5F2', accent: '#077275' },
  ingeniero: { bg: '#D4EAE4', accent: '#35606e' },
  fabrica: { bg: '#1c3037', accent: '#94D2BD' },
} as const;

export default function HomeServicios() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#1c3037' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-ingeniero text-sm tracking-[0.3em]" style={{ color: '#94D2BD' }}>02</span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: '#94D2BD', opacity: 0.4 }} />
          <span className="font-ingeniero text-[11px] tracking-[0.2em] uppercase" style={{ color: '#94D2BD' }}>
            TRES MUNDOS
          </span>
        </motion.div>

        <motion.h2
          className="font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1] mb-16"
          style={{ color: '#E8F5F2' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Un Artesano, un Ingeniero y una Fábrica
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {SERVICES.map((service) => {
            const colors = WORLD_COLORS[service.world];
            return (
              <motion.div
                key={service.slug}
                className="p-8 md:p-10 border border-white/10 group"
                variants={fadeInUp}
              >
                <span
                  className="font-ingeniero text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: colors.accent }}
                >
                  {service.world}
                </span>
                <h3 className="font-artesano italic text-2xl md:text-3xl mt-3" style={{ color: '#E8F5F2' }}>
                  {service.tagline}
                </h3>
                <p className="font-body text-sm leading-relaxed mt-4" style={{ color: '#E8F5F2', opacity: 0.6 }}>
                  {service.description.slice(0, 150)}...
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-3 font-ingeniero text-[11px] tracking-[0.2em] uppercase group"
            style={{ color: '#94D2BD' }}
          >
            <span>Explorar servicios</span>
            <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
