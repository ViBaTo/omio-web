'use client';

import { motion } from 'framer-motion';
import PageHero from '@/components/PageHero';
import { INGENIERIA } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const PROCESS_DETAILED = [
  {
    number: '01',
    title: 'Diseño',
    subtitle: 'Interpretación Creativa',
    description:
      'Todo comienza con la escucha. Nos sumergimos en la visión del diseñador para comprenderla a fondo. Analizamos cada plano, cada render, cada referencia, buscando no solo el «qué» sino el «porqué» detrás de cada decisión creativa.',
    details: [
      'Reuniones de briefing con el estudio de diseño',
      'Análisis de viabilidad técnica preliminar',
      'Selección de materiales y muestras iniciales',
      'Propuesta de soluciones constructivas',
    ],
    world: 'artesano' as const,
  },
  {
    number: '02',
    title: 'Ingeniería',
    subtitle: 'Precisión Técnica',
    description:
      'Nuestro equipo de ingeniería traduce la visión creativa en documentación técnica detallada. Cada pieza se modela en 3D, se simula estructuralmente y se planifica hasta el último tornillo. Es aquí donde anticipamos y resolvemos los problemas antes de que aparezcan.',
    details: [
      'Modelado 3D paramétrico de cada pieza',
      'Simulación estructural (FEA)',
      'Definición de tolerancias y especificaciones',
      'Planificación de producción y logística',
    ],
    world: 'ingeniero' as const,
  },
  {
    number: '03',
    title: 'Prototipo',
    subtitle: 'Validación Real',
    description:
      'Fabricamos prototipos a escala real que permiten al cliente tocar, sentir y validar el resultado antes de comprometerse con la producción completa. Es nuestro seguro contra sorpresas: lo que apruebas es exactamente lo que recibes.',
    details: [
      'Fabricación de prototipos a escala 1:1',
      'Presentación y validación con el cliente',
      'Ajustes y refinamientos según feedback',
      'Aprobación final para producción',
    ],
    world: 'artesano' as const,
  },
  {
    number: '04',
    title: 'Producción',
    subtitle: 'Fabricación a Escala',
    description:
      'Con el prototipo aprobado, nuestro taller cobra vida. CNC de 5 ejes, líneas de lacado robotizadas y las manos de nuestros maestros artesanos trabajan en sintonía para producir cada pieza con la misma calidad que el prototipo, multiplicada por cientos si es necesario.',
    details: [
      'Fresado CNC de alta precisión',
      'Acabados artesanales manuales',
      'Control de calidad unitario',
      'Embalaje especializado para transporte',
    ],
    world: 'fabrica' as const,
  },
  {
    number: '05',
    title: 'Logística',
    subtitle: 'Alcance Global',
    description:
      'Nuestro departamento de logística gestiona el transporte puerta a puerta a cualquier rincón del mundo. Cada pieza se embala individualmente con materiales que garantizan su protección durante viajes de miles de kilómetros.',
    details: [
      'Embalaje individual personalizado',
      'Transporte internacional certificado',
      'Seguimiento en tiempo real',
      'Seguro integral de transporte',
    ],
    world: 'fabrica' as const,
  },
  {
    number: '06',
    title: 'Instalación',
    subtitle: 'El Momento de la Verdad',
    description:
      'Nuestro equipo de instalación viaja al destino final para montar cada pieza con la misma precisión con la que fue fabricada. No delegamos este paso crítico: quien fabricó la pieza es quien la instala.',
    details: [
      'Equipo de instalación propio',
      'Ajuste fino in situ',
      'Limpieza y entrega final',
      'Garantía y soporte post-instalación',
    ],
    world: 'artesano' as const,
  },
];

const WORLD_STYLES = {
  artesano: { bg: '#E8F5F2', text: '#263f47', accent: '#077275', border: '#077275' },
  ingeniero: { bg: '#D4EAE4', text: '#35606e', accent: '#35606e', border: '#35606e' },
  fabrica: { bg: '#1c3037', text: '#E8F5F2', accent: '#94D2BD', border: '#94D2BD' },
};

export default function ProcesoContent() {
  return (
    <main id="main-content">
      <PageHero
        number="05"
        label="PROCESO"
        title="Del Concepto a la Instalación"
        subtitle="Un sistema probado de seis fases que minimiza riesgos y maximiza la calidad. Cada fase es un compromiso de transparencia con nuestro cliente."
        world="ingeniero"
      />

      {PROCESS_DETAILED.map((step, i) => {
        const styles = WORLD_STYLES[step.world];
        return (
          <section
            key={step.number}
            className="py-24 md:py-32 px-6 md:px-12 lg:px-24 relative"
            style={{ backgroundColor: styles.bg }}
          >
            {step.world === 'ingeniero' && (
              <div className="absolute inset-0 texture-ingeniero pointer-events-none" />
            )}
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Number + Title */}
                <div className="lg:col-span-4">
                  <motion.span
                    className="font-ingeniero text-[8rem] md:text-[10rem] font-bold leading-none block"
                    style={{ color: styles.accent, opacity: 0.1 }}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 0.1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    {step.number}
                  </motion.span>
                  <motion.h2
                    className="font-artesano italic text-3xl md:text-4xl -mt-12 relative z-10"
                    style={{ color: styles.text }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.title}
                  </motion.h2>
                  <motion.p
                    className="font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-2"
                    style={{ color: styles.accent }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {step.subtitle}
                  </motion.p>
                </div>

                {/* Content */}
                <motion.div
                  className="lg:col-span-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="font-body text-base md:text-lg leading-relaxed"
                    style={{ color: styles.text, opacity: 0.85 }}
                    variants={fadeInUp}
                  >
                    {step.description}
                  </motion.p>

                  <motion.div className="mt-8 space-y-0" variants={fadeInUp}>
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-center gap-4 py-3 border-t"
                        style={{ borderColor: `${styles.border}20` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: styles.accent }} />
                        <span className="font-body text-sm" style={{ color: styles.text, opacity: 0.7 }}>
                          {detail}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#D4EAE4' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-artesano italic text-3xl md:text-4xl leading-[1.1]"
            style={{ color: '#35606e' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ¿Tienes un proyecto en mente?
          </motion.h2>
          <motion.p
            className="font-body text-base md:text-lg leading-relaxed mt-6"
            style={{ color: '#35606e', opacity: 0.7 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cuéntanos tu idea y diseñaremos juntos el camino para hacerla realidad.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="/contacto"
              className="cta-fill inline-flex items-center justify-center px-16 py-6 font-artesano italic text-2xl tracking-wide transition-colors duration-500"
              style={{ color: '#35606e' }}
              data-cursor="precision"
            >
              Hablemos
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
