'use client';

import { motion } from 'framer-motion';
import PageHero from '@/components/PageHero';
import CounterAnimation from '@/components/CounterAnimation';
import { NOSOTROS, STATS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const VALUES = [
  {
    title: 'Confianza',
    description: 'Nos definimos como una asociación estratégica que trasciende la simple competencia funcional. La confianza de nuestros clientes es nuestro mayor activo.',
  },
  {
    title: 'Excelencia',
    description: 'Cada pieza que sale de nuestro taller lleva la promesa de una calidad que supera las expectativas. No hay atajos en la búsqueda de la perfección.',
  },
  {
    title: 'Compromiso',
    description: 'Nuestra promesa «¡Ahí estaremos!» no es un eslogan. Es un compromiso real de acompañamiento a largo plazo con cada cliente y cada proyecto.',
  },
  {
    title: 'Innovación',
    description: 'Combinamos técnicas artesanales centenarias con la tecnología más avanzada para resolver desafíos que otros consideran imposibles.',
  },
];

const TEAM_ROLES = [
  { name: 'Dirección Creativa', count: '3 personas' },
  { name: 'Ingeniería y Diseño Técnico', count: '8 personas' },
  { name: 'Maestros Artesanos', count: '15 personas' },
  { name: 'Producción y CNC', count: '22 personas' },
  { name: 'Logística e Instalación', count: '12 personas' },
  { name: 'Gestión de Proyectos', count: '5 personas' },
];

export default function NosotrosContent() {
  return (
    <main id="main-content">
      <PageHero
        number="01"
        label="NOSOTROS"
        title={NOSOTROS.title}
        subtitle={NOSOTROS.paragraphs[0]}
        world="artesano"
      />

      {/* Second paragraph + image */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#E8F5F2' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative overflow-hidden"
            style={{ clipPath: 'polygon(5% 0%, 100% 3%, 96% 100%, 0% 96%)' }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="aspect-[4/5] w-full"
              style={{ background: 'linear-gradient(135deg, #263f47 0%, #077275 50%, #162a30 100%)' }}
            />
            <div className="absolute inset-0 texture-artesano opacity-20 mix-blend-overlay" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: '#263f47', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {NOSOTROS.paragraphs[1]}
            </motion.p>

            <motion.p
              className="font-body text-base md:text-lg leading-relaxed mt-6"
              style={{ color: '#263f47', opacity: 0.85 }}
              variants={fadeInUp}
            >
              Con más de 15 años de trayectoria, hemos sido el socio inestimable de firmas como{' '}
              {NOSOTROS.highlightedFirms.map((firm, i) => (
                <span key={firm}>
                  <span className="gold-underline is-visible font-artesano italic">{firm}</span>
                  {i < NOSOTROS.highlightedFirms.length - 1 ? ', ' : ''}
                </span>
              ))}
              , entre muchas otras.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#1c3037' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 md:gap-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <CounterAnimation
                value={stat.value}
                suffix={stat.suffix}
                className="font-ingeniero text-[clamp(2.5rem,6vw,5rem)] font-bold"
              />
              <p className="font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-2" style={{ color: '#94D2BD' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#E8F5F2' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-artesano italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-16"
            style={{ color: '#263f47' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nuestros Valores
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                className="p-8 md:p-10 border border-[#077275]/15"
                variants={fadeInUp}
              >
                <h3 className="font-artesano italic text-xl md:text-2xl" style={{ color: '#077275' }}>
                  {value.title}
                </h3>
                <p className="font-body text-base leading-relaxed mt-4" style={{ color: '#263f47', opacity: 0.7 }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#D4EAE4' }}>
        <div className="absolute inset-0 texture-ingeniero pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className="font-artesano italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-6"
            style={{ color: '#35606e' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nuestro Equipo
          </motion.h2>

          <motion.p
            className="font-body text-base md:text-lg leading-relaxed mb-16 max-w-3xl"
            style={{ color: '#35606e', opacity: 0.7 }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Más de 65 profesionales que combinan tradición artesanal, precisión ingenieril y capacidad industrial.
          </motion.p>

          <motion.div
            className="space-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {TEAM_ROLES.map((role) => (
              <motion.div
                key={role.name}
                className="flex items-center justify-between py-6 border-t border-[#35606e]/15"
                variants={fadeInUp}
              >
                <h3 className="font-artesano text-lg md:text-xl" style={{ color: '#35606e' }}>
                  {role.name}
                </h3>
                <span className="font-ingeniero text-sm tracking-[0.15em]" style={{ color: '#35606e', opacity: 0.5 }}>
                  {role.count}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
