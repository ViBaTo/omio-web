'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import PageHero from '@/components/PageHero'
import CategoryFilter from '@/components/CategoryFilter'
import { Link } from '@/i18n/navigation'
import { getProjects, PROJECT_WORLDS, type ProjectFull } from '@/data/projects'
import type { World } from '@/lib/constants'
import type { Locale } from '@/i18n/routing'
import { fadeInUp } from '@/lib/animations'

export default function ProyectosContent() {
  const locale = useLocale() as Locale
  const tPage = useTranslations('pages.proyectos')
  const tWorlds = useTranslations('projectWorlds')

  const [activeWorld, setActiveWorld] = useState<World | null>(null)

  const allProjects = getProjects(locale)
  const filtered = activeWorld
    ? allProjects.filter((p) => p.world === activeWorld)
    : allProjects

  return (
    <main id='main-content'>
      <PageHero
        number={tPage('heroNumber')}
        label={tPage('heroLabel')}
        title={tPage('heroTitle')}
        subtitle={tPage('heroSubtitle')}
        world='fabrica'
      />

      <section
        className='py-16 md:py-24 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#002A3A' }}
      >
        <div className='max-w-7xl mx-auto'>
          <div className='mb-12'>
            <CategoryFilter
              categories={PROJECT_WORLDS}
              active={activeWorld}
              onSelect={(w) => setActiveWorld(w as World | null)}
              labelFor={(w) => tWorlds(w)}
              allLabel={tPage('filterAll')}
              accentColor='#8C7732'
              textColor='#F3ECEB'
            />
          </div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'
            layout
          >
            <AnimatePresence mode='popLayout'>
              {filtered.map((project, i) => (
                <ProjectListCard
                  key={project.slug}
                  project={project}
                  index={i}
                  worldLabel={tWorlds(project.world)}
                  discoverLabel={tPage('discoverStory')}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

function ProjectListCard({
  project,
  index,
  worldLabel,
  discoverLabel,
}: {
  project: ProjectFull
  index: number
  worldLabel: string
  discoverLabel: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      variants={fadeInUp}
    >
      <Link href={`/proyectos/${project.slug}`}>
        <article
          className='group cursor-pointer'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor='precision'
        >
          <div className='relative overflow-hidden aspect-[16/10]'>
            <motion.div
              className='w-full h-full bg-cover bg-center'
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              style={{
                backgroundImage: `url(${project.heroImage})`
              }}
            />

            <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent'>
              <p
                className='font-ingeniero text-[10px] tracking-[0.3em] uppercase mb-2'
                style={{ color: '#8C7732' }}
              >
                {worldLabel} · {project.location} · {project.year}
              </p>
              <h3
                className='font-fabrica uppercase text-2xl md:text-3xl tracking-[0.03em]'
                style={{ color: '#F3ECEB' }}
              >
                {project.title}
              </h3>
              {project.creativeDirector && (
                <p
                  className='font-artesano italic text-sm mt-1'
                  style={{ color: '#F3ECEB', opacity: 0.7 }}
                >
                  {project.creativeDirector}
                </p>
              )}
            </div>

            <motion.div
              className='absolute inset-0 flex items-center justify-center bg-black/20'
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className='font-ingeniero text-sm tracking-[0.3em] uppercase'
                style={{ color: '#F3ECEB' }}
              >
                {discoverLabel}
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
