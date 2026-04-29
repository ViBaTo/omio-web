'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

interface SimpleProject {
  slug: string
  title: string
  category: string
  image: string
}

interface ProjectCardProps {
  project: SimpleProject
  index: number
  total: number
}

export default function ProjectCard({
  project,
  index,
  total
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const tCommon = useTranslations('common')
  const tCategories = useTranslations('projectCategories')

  let categoryLabel = project.category
  try {
    categoryLabel = tCategories(project.category)
  } catch {
    // fall back to raw category string
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center px-4 md:px-16'>
      <div className='relative w-full max-w-[85vw] md:max-w-[75vw]'>
        <div className='absolute -top-16 left-0'>
          <span
            className='font-ingeniero text-sm tracking-[0.3em]'
            style={{ color: '#F3ECEB', opacity: 0.3 }}
          >
            {String(index + 1).padStart(2, '0')}/
            {String(total).padStart(2, '0')}
          </span>
        </div>

        <motion.div
          className='relative overflow-hidden cursor-pointer'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor='precision'
        >
          <motion.div
            className='aspect-[16/10] w-full'
            animate={{ scale: isHovered ? 1.03 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className='w-full h-full bg-cover bg-center'
              style={{
                backgroundImage: `url(${project.image})`,
                filter: isHovered ? 'grayscale(0.7)' : 'grayscale(0)',
                transition: 'filter 0.5s ease'
              }}
            />
          </motion.div>

          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className='font-ingeniero text-sm tracking-[0.3em] uppercase'
              style={{ color: '#F3ECEB' }}
            >
              {tCommon('discover')}
            </span>
          </motion.div>

          <div className='absolute bottom-0 left-0 right-0 p-6 md:p-10'>
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent' />
            <div className='relative z-10'>
              <p
                className='font-ingeniero text-[10px] tracking-[0.3em] uppercase mb-2'
                style={{ color: '#8C7732' }}
              >
                {categoryLabel}
              </p>
              <h3
                className='font-fabrica uppercase text-2xl md:text-4xl lg:text-5xl tracking-[0.03em]'
                style={{ color: '#F3ECEB' }}
              >
                {project.title}
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
