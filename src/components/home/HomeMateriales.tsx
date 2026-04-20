'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const FEATURED_ITEMS = [
  { label: 'METAL', image: '/images/materials/laton-envejecido.jpg', slug: 'laton-envejecido' },
  { label: 'METAL', image: '/images/materials/acero-negro.jpg', slug: 'acero-negro' },
  { label: 'MADERA', image: '/images/materials/nogal-americano.jpg', slug: 'nogal-americano' },
  { label: 'ALABASTRO', image: '/images/materials/marmol-calacatta.jpg', slug: 'marmol-calacatta' },
];

export default function HomeMateriales() {

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
          <span className="font-ingeniero text-sm tracking-[0.3em]" style={{ color: '#8C7732' }}>03</span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: '#8C7732', opacity: 0.4 }} />
          <span className="font-ingeniero text-[11px] tracking-[0.2em] uppercase" style={{ color: '#8C7732' }}>
            MATERIALES
          </span>
        </motion.div>

        <motion.h2
          className="font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1] mb-6"
          style={{ color: '#002A3A' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          La Materia Prima de lo Extraordinario
        </motion.h2>

        <motion.p
          className="font-body text-base md:text-lg leading-relaxed mb-16 max-w-3xl"
          style={{ color: '#002A3A', opacity: 0.7 }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Seleccionamos cada material con la misma exigencia que aplicamos a cada pieza.
          Maderas nobles, metales trabajados, piedras naturales y textiles de la más alta calidad.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FEATURED_ITEMS.map((item, idx) => (
            <motion.div key={`${item.slug}-${idx}`} variants={fadeInUp}>
              <Link href={`/materiales/${item.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <div
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                </div>
                <p className="font-ingeniero text-[10px] tracking-[0.2em] uppercase mt-3" style={{ color: '#8C7732' }}>
                  {item.label}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            href="/materiales"
            className="inline-flex items-center gap-3 font-ingeniero text-[11px] tracking-[0.2em] uppercase group"
            style={{ color: '#8C7732' }}
          >
            <span>Ver todos los materiales</span>
            <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
