'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useIsMobile } from '@/lib/useMediaQuery'

const SLIDES = [
  '/images/Recurso%201%404x.png',
  '/images/Recurso%202%404x.png',
  '/images/Recurso%203%404x.png'
]

export default function HomeServicios() {
  const tHome = useTranslations('home.servicios')
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.6667%'])

  if (isMobile) {
    return (
      <section className='relative w-full' style={{ backgroundColor: '#001A26' }} aria-roledescription='carousel'>
        <div className='flex flex-col'>
          {SLIDES.map((src) => (
            <div key={src} className='relative aspect-[3/4] w-full'>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${src})`, filter: 'grayscale(100%) contrast(1.05)' }}
              />
              <div className='absolute inset-0 texture-artesano opacity-30' />
            </div>
          ))}
        </div>
        <div className='py-10 flex justify-center px-6'>
          <Link
            href='/servicios'
            className='inline-flex items-center gap-3 font-ingeniero text-xs tracking-[0.25em] uppercase group min-h-11'
            style={{ color: '#F3ECEB' }}
          >
            <span>{tHome('ctaExplore')}</span>
            <span className='inline-block transition-transform group-hover:translate-x-2' style={{ color: '#8C7732' }}>→</span>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className='relative w-full'
      style={{ height: `${SLIDES.length * 100}vh`, backgroundColor: '#001A26' }}
      aria-roledescription='carousel'
    >
      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        <motion.div className='flex h-full will-change-transform' style={{ x, width: `${SLIDES.length * 100}%` }}>
          {SLIDES.map((src) => (
            <div key={src} className='relative h-full shrink-0' style={{ width: `${100 / SLIDES.length}%` }}>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${src})`, filter: 'grayscale(100%) contrast(1.05)' }}
              />
              <div className='absolute inset-0 texture-artesano opacity-30' />
            </div>
          ))}
        </motion.div>
        <div className='absolute bottom-10 left-0 right-0 z-20 flex justify-center px-6'>
          <Link
            href='/servicios'
            className='inline-flex items-center gap-3 font-ingeniero text-xs tracking-[0.25em] uppercase group'
            style={{ color: '#F3ECEB' }}
          >
            <span>{tHome('ctaExplore')}</span>
            <span className='inline-block transition-transform group-hover:translate-x-2' style={{ color: '#8C7732' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
