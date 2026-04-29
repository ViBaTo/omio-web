'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { getFeaturedProjects, type ProjectFull } from '@/data/projects'
import type { Locale } from '@/i18n/routing'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function HomeProyectos() {
  const locale = useLocale() as Locale
  const t = useTranslations('home.proyectos')
  const tCategories = useTranslations('projectCategories')
  const projects = getFeaturedProjects(locale)

  return (
    <section
      className='relative py-32 md:py-48 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: '#002A3A' }}
    >
      <div className='max-w-7xl mx-auto'>
        <motion.div
          className='flex items-center gap-4 mb-6'
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className='font-ingeniero text-sm tracking-[0.3em]'
            style={{ color: '#8C7732' }}
          >
            04
          </span>
          <div
            className='w-12 h-[1px]'
            style={{ backgroundColor: '#8C7732', opacity: 0.4 }}
          />
          <span
            className='font-ingeniero text-[11px] tracking-[0.2em] uppercase'
            style={{ color: '#8C7732' }}
          >
            {t('label')}
          </span>
        </motion.div>

        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16'>
          <motion.h2
            className='font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1]'
            style={{ color: '#F3ECEB' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('title')}
          </motion.h2>

          <motion.div
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <Link
              href='/proyectos'
              className='inline-flex items-center gap-3 font-ingeniero text-[11px] tracking-[0.2em] uppercase group whitespace-nowrap'
              style={{ color: '#8C7732' }}
            >
              <span>{t('viewAll')}</span>
              <span className='inline-block transition-transform group-hover:translate-x-2'>
                →
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-8'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {projects.map((project, i) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              index={i}
              categoryLabel={tCategories(project.category)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturedProjectCard({
  project,
  categoryLabel,
}: {
  project: ProjectFull
  index: number
  categoryLabel: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const tCommon = useTranslations('common')

  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/proyectos/${project.slug}`}>
        <article
          className='group cursor-pointer'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor='precision'
        >
          <div className='relative overflow-hidden aspect-[4/5]'>
            <motion.div
              className='w-full h-full bg-cover bg-center'
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundImage: `url(${project.heroImage})`
              }}
            />
            <div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent'>
              <p
                className='font-ingeniero text-[10px] tracking-[0.3em] uppercase mb-2'
                style={{ color: '#8C7732' }}
              >
                {categoryLabel}
              </p>
              <h3
                className='font-fabrica uppercase text-xl md:text-2xl tracking-[0.03em]'
                style={{ color: '#F3ECEB' }}
              >
                {project.title}
              </h3>
            </div>

            <motion.div
              className='absolute inset-0 flex items-center justify-center bg-black/20'
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className='font-ingeniero text-xs tracking-[0.3em] uppercase'
                style={{ color: '#F3ECEB' }}
              >
                {tCommon('discover')}
              </span>
            </motion.div>
          </div>

          <p
            className='font-body text-sm mt-4 line-clamp-2'
            style={{ color: '#F3ECEB', opacity: 0.6 }}
          >
            {project.shortDescription}
          </p>
        </article>
      </Link>
    </motion.div>
  )
}
