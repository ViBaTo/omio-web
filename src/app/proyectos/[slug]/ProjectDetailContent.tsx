'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ImageGallery from '@/components/ImageGallery';
import { type ProjectFull, getAdjacentProjects } from '@/data/projects';
import { getMaterialsForProject } from '@/data/materials';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface Props {
  project: ProjectFull;
}

export default function ProjectDetailContent({ project }: Props) {
  const { prev, next } = getAdjacentProjects(project.slug);
  const materials = getMaterialsForProject(project.slug);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end" style={{ backgroundColor: '#1c3037' }}>
        <div className="absolute inset-0">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, #263f47 0%, #94D2BD 40%, #1c3037 100%)`,
              opacity: 0.6,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c3037] via-transparent to-[#1c3037]/40" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 pb-16 md:pb-24 pt-32">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs
              items={[
                { label: 'Proyectos', href: '/proyectos' },
                { label: project.title },
              ]}
              color="#E8F5F2"
            />

            <motion.p
              className="font-ingeniero text-[11px] tracking-[0.3em] uppercase mt-8"
              style={{ color: '#94D2BD' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.category} · {project.location} · {project.year}
            </motion.p>

            <motion.h1
              className="font-artesano italic text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] mt-4"
              style={{ color: '#E8F5F2' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="font-body text-lg md:text-xl leading-relaxed mt-6 max-w-3xl"
              style={{ color: '#E8F5F2', opacity: 0.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {project.shortDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      {project.stats && (
        <section className="py-10 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#162a30' }}>
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {project.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-ingeniero text-2xl md:text-3xl font-bold" style={{ color: '#94D2BD' }}>
                  {stat.value}
                </p>
                <p className="font-ingeniero text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: '#E8F5F2', opacity: 0.4 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#E8F5F2' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              className="font-artesano italic text-3xl md:text-4xl leading-[1.1] mb-8"
              style={{ color: '#263f47' }}
              variants={fadeInUp}
            >
              La Historia
            </motion.h2>

            <motion.p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: '#263f47', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {project.longDescription}
            </motion.p>

            {/* Challenge */}
            <motion.div className="mt-12" variants={fadeInUp}>
              <h3 className="font-ingeniero text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: '#077275' }}>
                El Desafío
              </h3>
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: '#263f47', opacity: 0.8 }}>
                {project.challenge}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div className="mt-12" variants={fadeInUp}>
              <h3 className="font-ingeniero text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: '#077275' }}>
                La Solución
              </h3>
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: '#263f47', opacity: 0.8 }}>
                {project.solution}
              </p>
            </motion.div>

            {/* Result */}
            <motion.div className="mt-12" variants={fadeInUp}>
              <h3 className="font-ingeniero text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: '#077275' }}>
                El Resultado
              </h3>
              <p className="font-body text-base md:text-lg leading-relaxed" style={{ color: '#263f47', opacity: 0.8 }}>
                {project.result}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Phases */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#D4EAE4' }}>
        <div className="absolute inset-0 texture-ingeniero pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.h2
            className="font-artesano italic text-3xl md:text-4xl leading-[1.1] mb-16"
            style={{ color: '#35606e' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Fases del Proyecto
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {project.phases.map((phase, i) => (
              <motion.div
                key={phase.title}
                className="p-6 border border-[#35606e]/15"
                variants={fadeInUp}
              >
                <span className="font-ingeniero text-3xl font-bold" style={{ color: '#35606e', opacity: 0.2 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-artesano text-xl mt-4" style={{ color: '#35606e' }}>
                  {phase.title}
                </h3>
                <p className="font-body text-sm leading-relaxed mt-3" style={{ color: '#35606e', opacity: 0.7 }}>
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#E8F5F2' }}>
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-artesano italic text-3xl md:text-4xl leading-[1.1] mb-12"
            style={{ color: '#263f47' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Galería
          </motion.h2>
          <ImageGallery images={project.images} />
        </div>
      </section>

      {/* Materials Used */}
      {materials.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#E8F5F2' }}>
          <div className="max-w-7xl mx-auto border-t border-[#077275]/10 pt-16">
            <motion.h2
              className="font-artesano italic text-2xl md:text-3xl mb-8"
              style={{ color: '#263f47' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Materiales Utilizados
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {materials.map((mat) => (
                <Link key={mat.slug} href={`/materiales/${mat.slug}`} className="group">
                  <div className="relative overflow-hidden aspect-square">
                    <div
                      className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                      style={{
                        background:
                          mat.category === 'Maderas'
                            ? 'linear-gradient(135deg, #5C4033 0%, #8B6914 50%, #3E2723 100%)'
                            : mat.category === 'Metales'
                            ? 'linear-gradient(135deg, #37474F 0%, #B0BEC5 50%, #263238 100%)'
                            : mat.category === 'Piedras'
                            ? 'linear-gradient(135deg, #BDBDBD 0%, #E0E0E0 50%, #9E9E9E 100%)'
                            : 'linear-gradient(135deg, #E8F5F2 0%, #D4EAE4 50%, #B2DFDB 100%)',
                      }}
                    />
                  </div>
                  <p className="font-artesano text-base mt-2" style={{ color: '#263f47' }}>{mat.name}</p>
                  <p className="font-ingeniero text-[10px] tracking-[0.2em] uppercase" style={{ color: '#077275' }}>
                    {mat.category}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#1c3037' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {prev ? (
            <Link href={`/proyectos/${prev.slug}`} className="group flex items-center gap-4">
              <span className="font-ingeniero text-2xl transition-transform group-hover:-translate-x-2" style={{ color: '#94D2BD' }}>
                ←
              </span>
              <div>
                <p className="font-ingeniero text-[10px] tracking-[0.2em] uppercase" style={{ color: '#E8F5F2', opacity: 0.4 }}>
                  Anterior
                </p>
                <p className="font-artesano italic text-lg md:text-xl" style={{ color: '#E8F5F2' }}>
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/proyectos"
            className="font-ingeniero text-[11px] tracking-[0.2em] uppercase hidden md:block"
            style={{ color: '#E8F5F2', opacity: 0.4 }}
          >
            Ver todos
          </Link>

          {next ? (
            <Link href={`/proyectos/${next.slug}`} className="group flex items-center gap-4 text-right">
              <div>
                <p className="font-ingeniero text-[10px] tracking-[0.2em] uppercase" style={{ color: '#E8F5F2', opacity: 0.4 }}>
                  Siguiente
                </p>
                <p className="font-artesano italic text-lg md:text-xl" style={{ color: '#E8F5F2' }}>
                  {next.title}
                </p>
              </div>
              <span className="font-ingeniero text-2xl transition-transform group-hover:translate-x-2" style={{ color: '#94D2BD' }}>
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </main>
  );
}
