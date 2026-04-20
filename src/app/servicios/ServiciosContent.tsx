'use client';

import { motion } from 'framer-motion';
import PageHero from '@/components/PageHero';
import { SERVICES } from '@/data/services';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import type { World } from '@/lib/constants';

const WORLD_STYLES: Record<World, { bg: string; text: string; accent: string; border: string }> = {
  artesano: { bg: '#F3ECEB', text: '#002A3A', accent: '#8C7732', border: '#8C7732' },
  ingeniero: { bg: '#F3ECEB', text: '#002A3A', accent: '#002A3A', border: '#002A3A' },
  fabrica: { bg: '#002A3A', text: '#F3ECEB', accent: '#8C7732', border: '#8C7732' },
};

export default function ServiciosContent() {
  return (
    <main id="main-content">
      <PageHero
        number="02"
        label="SERVICIOS"
        title="Tres Mundos, Una Pieza"
        subtitle="Fusionamos la sensibilidad artesanal, la precisión ingenieril y la potencia industrial para hacer realidad lo que otros consideran imposible."
        world="fabrica"
      />

      {SERVICES.map((service, i) => {
        const styles = WORLD_STYLES[service.world];
        const isEven = i % 2 === 0;

        return (
          <section
            key={service.slug}
            className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
            style={{ backgroundColor: styles.bg }}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${isEven ? '' : 'lg:direction-rtl'}`}>
                {/* Content */}
                <motion.div
                  className={isEven ? '' : 'lg:order-2'}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10%' }}
                >
                  <motion.div className="flex items-center gap-4 mb-6" variants={fadeInUp}>
                    <span
                      className="font-ingeniero text-sm tracking-[0.3em]"
                      style={{ color: styles.accent }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-12 h-[1px]" style={{ backgroundColor: styles.accent, opacity: 0.4 }} />
                    <span
                      className="font-ingeniero text-[11px] tracking-[0.2em] uppercase"
                      style={{ color: styles.accent }}
                    >
                      {service.world}
                    </span>
                  </motion.div>

                  <motion.h2
                    className="font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1]"
                    style={{ color: styles.text }}
                    variants={fadeInUp}
                  >
                    {service.tagline}
                  </motion.h2>

                  <motion.p
                    className="font-body text-base md:text-lg leading-relaxed mt-8"
                    style={{ color: styles.text, opacity: 0.8 }}
                    variants={fadeInUp}
                  >
                    {service.description}
                  </motion.p>

                  {service.details.map((detail, j) => (
                    <motion.p
                      key={j}
                      className="font-body text-base leading-relaxed mt-4"
                      style={{ color: styles.text, opacity: 0.7 }}
                      variants={fadeInUp}
                    >
                      {detail}
                    </motion.p>
                  ))}
                </motion.div>

                {/* Capabilities */}
                <motion.div
                  className={isEven ? '' : 'lg:order-1'}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.h3
                    className="font-ingeniero text-[11px] tracking-[0.2em] uppercase mb-8"
                    style={{ color: styles.accent }}
                    variants={fadeInUp}
                  >
                    Capacidades
                  </motion.h3>

                  {service.capabilities.map((cap) => (
                    <motion.div
                      key={cap}
                      className="flex items-center gap-4 py-4 border-t"
                      style={{ borderColor: `${styles.border}20` }}
                      variants={fadeInUp}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: styles.accent }} />
                      <span className="font-body text-base" style={{ color: styles.text, opacity: 0.8 }}>
                        {cap}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
