'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionLabel from './SectionLabel'
import CounterAnimation from './CounterAnimation'
import { STATS } from '@/lib/constants'
import {
  fadeInUp,
  staggerContainer,
  letterReveal,
  letterChild
} from '@/lib/animations'

interface Block {
  number: string
  title: string
  description: string
}

export default function SectionCapacidades() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('capacidades')
  const tStats = useTranslations('stats')
  const tSections = useTranslations('sections.labels')

  const blocks = t.raw('blocks') as Block[]

  return (
    <section
      id='capacidades'
      ref={sectionRef}
      className='relative min-h-screen py-32 md:py-48 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: '#002A3A' }}
    >
      <div className='max-w-7xl mx-auto'>
        <SectionLabel
          number='02'
          label={tSections('capacidades')}
          accentColor='#8C7732'
          numberColor='#8C7732'
        />

        <motion.h2
          className='font-fabrica uppercase text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-[0.05em] mt-8'
          style={{ color: '#F3ECEB' }}
          variants={letterReveal}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-10%' }}
        >
          {t('title').split('').map((char, i) => (
            <motion.span
              key={i}
              className='inline-block'
              variants={letterChild}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          className='font-body text-base md:text-lg leading-relaxed mt-12 max-w-3xl'
          style={{ color: '#F3ECEB', opacity: 0.7 }}
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {t('intro')}
        </motion.p>

        <motion.div
          className='mt-20'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {blocks.map((block) => (
            <CapabilityBlock key={block.number} {...block} />
          ))}
        </motion.div>

        <div className='mt-24 grid grid-cols-3 gap-8 md:gap-16 max-w-3xl'>
          {STATS.map((stat) => (
            <div key={stat.labelKey} className='text-center md:text-left'>
              <CounterAnimation
                value={stat.value}
                suffix={stat.suffix}
                className='font-ingeniero text-[clamp(2rem,5vw,4rem)] font-bold'
              />
              <p
                className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-2'
                style={{ color: '#8C7732' }}
              >
                {tStats(stat.labelKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityBlock({
  number,
  title,
  description
}: Block) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className='relative border-t border-[#8C7732]/20 py-8 md:py-12 group'
      variants={fadeInUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor='precision'
    >
      <motion.div
        className='absolute inset-0 -z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.08 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            'linear-gradient(90deg, #001F2C 0%, #002A3A 50%, #002A3A 100%)'
        }}
      />

      <div className='grid grid-cols-12 gap-4 md:gap-8 items-start'>
        <div className='col-span-2 md:col-span-1'>
          <span
            className='font-ingeniero text-2xl md:text-4xl'
            style={{ color: '#8C7732' }}
          >
            {number}
          </span>
        </div>

        <div className='col-span-10 md:col-span-4'>
          <h3
            className='font-fabrica uppercase text-xl md:text-3xl tracking-[0.05em]'
            style={{ color: '#F3ECEB' }}
          >
            {title}
          </h3>
        </div>

        <div className='col-span-12 md:col-span-7 md:col-start-6'>
          <p
            className='font-body text-base leading-relaxed'
            style={{ color: '#F3ECEB', opacity: 0.6 }}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
