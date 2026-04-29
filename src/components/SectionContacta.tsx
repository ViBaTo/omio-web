'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionLabel from './SectionLabel'
import AnimatedText from './AnimatedText'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function SectionContacta() {
  const t = useTranslations('contacta')
  const tSections = useTranslations('sections.labels')
  const paragraphs = t.raw('paragraphs') as string[]
  const email = t('email')
  const phone = t('phone')
  const location = t('location')

  return (
    <section
      id='contacta'
      className='relative min-h-screen flex items-center py-32 md:py-48 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: 'var(--artesano-bg)' }}
    >
      <div className='max-w-[700px] mx-auto text-center'>
        <SectionLabel
          number='06'
          label={tSections('contacta')}
          accentColor='#8C7732'
          numberColor='#8C7732'
        />

        <motion.div className='mt-8'>
          <AnimatedText
            text={t('title')}
            as='h2'
            className='font-artesano italic text-[clamp(2.5rem,7vw,6rem)] leading-[1.05]'
            splitBy='word'
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-10%' }}
        >
          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className='font-body text-base md:text-lg leading-relaxed mt-8 first:mt-12'
              style={{ color: '#002A3A', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          className='mt-16'
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <a
            href={`mailto:${email}`}
            className='cta-fill inline-flex items-center justify-center px-16 py-6 font-artesano italic text-2xl md:text-3xl tracking-wide transition-colors duration-500'
            style={{ color: '#8C7732' }}
            data-cursor='precision'
          >
            {t('cta')}
          </a>
        </motion.div>

        <motion.div
          className='mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12'
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <a
            href={`mailto:${email}`}
            className='font-ingeniero text-xs tracking-[0.15em] transition-opacity hover:opacity-100'
            style={{ color: '#002A3A', opacity: 0.5 }}
          >
            {email}
          </a>
          <span
            className='hidden md:inline font-ingeniero text-xs'
            style={{ color: '#8C7732', opacity: 0.3 }}
          >
            ·
          </span>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className='font-ingeniero text-xs tracking-[0.15em] transition-opacity hover:opacity-100'
            style={{ color: '#002A3A', opacity: 0.5 }}
          >
            {phone}
          </a>
          <span
            className='hidden md:inline font-ingeniero text-xs'
            style={{ color: '#8C7732', opacity: 0.3 }}
          >
            ·
          </span>
          <span
            className='font-ingeniero text-xs tracking-[0.15em]'
            style={{ color: '#002A3A', opacity: 0.5 }}
          >
            {location}
          </span>
        </motion.div>

        <div className='mt-8 flex items-center justify-center gap-8'>
          <a
            href='#'
            className='font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100'
            style={{ color: '#002A3A', opacity: 0.4 }}
            target='_blank'
            rel='noopener noreferrer'
          >
            Instagram
          </a>
          <a
            href='#'
            className='font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100'
            style={{ color: '#002A3A', opacity: 0.4 }}
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
