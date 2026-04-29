'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionLabel from './SectionLabel'
import AnimatedText from './AnimatedText'
import { fadeInUp, staggerContainer } from '@/lib/animations'

function renderAtelier(text: string, token: string): React.ReactNode[] {
  const parts = text.split(token)
  const result: React.ReactNode[] = []
  parts.forEach((part, i) => {
    result.push(<span key={`t-${i}`}>{part}</span>)
    if (i < parts.length - 1) {
      result.push(
        <span
          key={`a-${i}`}
          className='font-artesano italic'
          style={{ color: '#8C7732' }}
        >
          {token}
        </span>
      )
    }
  })
  return result
}

export default function SectionArtesania() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('artesania')
  const tSections = useTranslations('sections.labels')
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  const paragraphs = t.raw('paragraphs') as string[]
  const atelierToken = t('atelierToken')

  return (
    <section
      id='artesania'
      ref={sectionRef}
      className='relative min-h-screen overflow-hidden'
      style={{ backgroundColor: 'var(--artesano-bg)' }}
    >
      <motion.div
        className='relative w-full h-[80vh] overflow-hidden'
        style={{ y: imageY }}
      >
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: "url('/images/artesania/IMG_1842.jpg')"
          }}
        />
        <div className='absolute inset-0 texture-artesano opacity-30 mix-blend-overlay' />

        <div
          className='absolute inset-0'
          style={{
            background: 'linear-gradient(180deg, transparent 30%, #F3ECEB 95%)'
          }}
        />
      </motion.div>

      <div className='relative -mt-48 md:-mt-64 px-6 md:px-12 lg:px-24 pb-32 md:pb-48'>
        <div className='max-w-3xl mx-auto lg:mx-0 lg:ml-[15%]'>
          <SectionLabel
            number='03'
            label={tSections('artesania')}
            accentColor='#8C7732'
            numberColor='#8C7732'
          />

          <motion.div className='mt-8'>
            <AnimatedText
              text={t('title')}
              as='h2'
              className='font-artesano italic text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] text-[#002A3A]'
              splitBy='word'
            />
          </motion.div>

          <div className='relative mt-12'>
            <span
              className='absolute -top-16 -left-8 font-artesano text-[20vw] leading-none select-none pointer-events-none'
              style={{ color: '#8C7732', opacity: 0.05 }}
            >
              «»
            </span>

            <motion.div
              variants={staggerContainer}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-10%' }}
            >
              <motion.p
                className='font-body text-base md:text-lg leading-relaxed relative z-10'
                style={{ color: '#002A3A', opacity: 0.85 }}
                variants={fadeInUp}
              >
                {renderAtelier(paragraphs[0], atelierToken)}
              </motion.p>

              <motion.p
                className='font-body text-base md:text-lg leading-relaxed mt-6 relative z-10'
                style={{ color: '#002A3A', opacity: 0.85 }}
                variants={fadeInUp}
              >
                {renderAtelier(paragraphs[1], atelierToken)}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
