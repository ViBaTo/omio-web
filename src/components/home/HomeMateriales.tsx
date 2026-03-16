'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getFeaturedMaterials } from '@/data/materials';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const CATEGORY_GRADIENTS: Record<string, string> = {
  Maderas: 'linear-gradient(135deg, #5C4033 0%, #8B6914 50%, #3E2723 100%)',
  Metales: 'linear-gradient(135deg, #37474F 0%, #B0BEC5 50%, #263238 100%)',
  Piedras: 'linear-gradient(135deg, #BDBDBD 0%, #E0E0E0 50%, #9E9E9E 100%)',
  Textiles: 'linear-gradient(135deg, #E8F5F2 0%, #D4EAE4 50%, #B2DFDB 100%)',
};

export default function HomeMateriales() {
  const featured = getFeaturedMaterials().slice(0, 4);

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#E8F5F2' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-ingeniero text-sm tracking-[0.3em]" style={{ color: '#077275' }}>03</span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: '#077275', opacity: 0.4 }} />
          <span className="font-ingeniero text-[11px] tracking-[0.2em] uppercase" style={{ color: '#077275' }}>
            MATERIALES
          </span>
        </motion.div>

        <motion.h2
          className="font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1] mb-6"
          style={{ color: '#263f47' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          La Materia Prima de lo Extraordinario
        </motion.h2>

        <motion.p
          className="font-body text-base md:text-lg leading-relaxed mb-16 max-w-3xl"
          style={{ color: '#263f47', opacity: 0.7 }}
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
          {featured.map((material) => (
            <motion.div key={material.slug} variants={fadeInUp}>
              <Link href={`/materiales/${material.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <div
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    style={{ background: CATEGORY_GRADIENTS[material.category] || CATEGORY_GRADIENTS.Maderas }}
                  />
                </div>
                <p className="font-ingeniero text-[10px] tracking-[0.2em] uppercase mt-3" style={{ color: '#077275' }}>
                  {material.category}
                </p>
                <h3 className="font-artesano text-lg mt-1" style={{ color: '#263f47' }}>
                  {material.name}
                </h3>
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
            style={{ color: '#077275' }}
          >
            <span>Ver todos los materiales</span>
            <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
