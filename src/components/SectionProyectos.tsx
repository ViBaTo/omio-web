'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import SectionLabel from './SectionLabel'
import AnimatedText from './AnimatedText'
import HorizontalScroll from './HorizontalScroll'
import ProjectCard from './ProjectCard'
import { fadeInUp } from '@/lib/animations'
import { useIsMobile } from '@/lib/useMediaQuery'
import { getProjects } from '@/data/projects'
import type { Locale } from '@/i18n/routing'

export default function SectionProyectos() {
  const isMobile = useIsMobile()
  const locale = useLocale() as Locale
  const t = useTranslations('proyectosSection')
  const tSections = useTranslations('sections.labels')
  const projects = getProjects(locale).map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    image: p.heroImage
  }))

  return (
    <section id='proyectos' style={{ backgroundColor: '#002A3A' }}>
      <div className='px-6 md:px-12 lg:px-24 pt-32 md:pt-48 pb-16'>
        <div className='max-w-7xl mx-auto'>
          <SectionLabel
            number='05'
            label={tSections('proyectos')}
            accentColor='#8C7732'
            numberColor='#8C7732'
          />

          <motion.div className='mt-8'>
            <AnimatedText
              text={t('title')}
              as='h2'
              className='font-artesano italic text-[clamp(2rem,5vw,4.5rem)] leading-[1.05]'
              splitBy='word'
            />
          </motion.div>

          <motion.p
            className='font-body text-base md:text-lg leading-relaxed mt-10 max-w-3xl'
            style={{ color: '#F3ECEB', opacity: 0.7 }}
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            {t('intro')}
          </motion.p>

          <motion.p
            className='font-artesano italic text-lg md:text-xl leading-relaxed mt-6 max-w-2xl'
            style={{ color: '#8C7732' }}
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            {t('phrase')}
          </motion.p>
        </div>
      </div>

      {isMobile ? (
        <div className='flex flex-col gap-8 mt-16'>
          {projects.map((project, i) => (
            <div key={project.slug} className='snap-start'>
              <ProjectCard project={project} index={i} total={projects.length} />
            </div>
          ))}
        </div>
      ) : (
        <HorizontalScroll itemCount={projects.length}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </HorizontalScroll>
      )}
    </section>
  )
}
