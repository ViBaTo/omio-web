'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

const SLIDES = [
  '/images/Recurso%201%404x.png',
  '/images/Recurso%202%404x.png',
  '/images/Recurso%203%404x.png'
]

export default function HomeServicios() {
  const tHome = useTranslations('home.servicios')
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // The track is 300% wide (3 panels × 100vw). Translating it by -66.6667%
  // of its own width = -200vw, which leaves the third panel fully on screen.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.6667%'])

  return (
    <section
      ref={containerRef}
      className='relative w-full'
      style={{
        height: `${SLIDES.length * 100}vh`,
        backgroundColor: '#001A26'
      }}
      aria-roledescription='carousel'
    >
      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        <motion.div
          className='flex h-full will-change-transform'
          style={{ x, width: `${SLIDES.length * 100}%` }}
        >
          {SLIDES.map((src) => (
            <div
              key={src}
              className='relative h-full shrink-0'
              style={{ width: `${100 / SLIDES.length}%` }}
            >
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{
                  backgroundImage: `url(${src})`,
                  filter: 'grayscale(100%) contrast(1.05)'
                }}
              />
              <div className='absolute inset-0 texture-artesano opacity-30' />
            </div>
          ))}
        </motion.div>

        <div className='absolute bottom-10 left-0 right-0 z-20 flex justify-center px-6'>
          <Link
            href='/servicios'
            className='inline-flex items-center gap-3 font-ingeniero text-[11px] tracking-[0.25em] uppercase group'
            style={{ color: '#F3ECEB' }}
          >
            <span>{tHome('ctaExplore')}</span>
            <span
              className='inline-block transition-transform group-hover:translate-x-2'
              style={{ color: '#8C7732' }}
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
