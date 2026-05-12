'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import PageHero from '@/components/PageHero'
import { Link } from '@/i18n/navigation'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { World } from '@/lib/constants'

interface Step {
  number: string
  title: string
  subtitle: string
  description: string
  details: string[]
}

const STEP_WORLDS: World[] = [
  'artesano',
  'ingeniero',
  'fabrica',
  'fabrica',
  'artesano',
]

const WORLD_STYLES = {
  artesano: {
    bg: '#F3ECEB',
    text: '#002A3A',
    accent: '#8C7732',
    border: '#8C7732',
  },
  ingeniero: {
    bg: '#F3ECEB',
    text: '#002A3A',
    accent: '#002A3A',
    border: '#002A3A',
  },
  fabrica: {
    bg: '#002A3A',
    text: '#F3ECEB',
    accent: '#8C7732',
    border: '#8C7732',
  },
}

export default function ProcesoContent() {
  const t = useTranslations('pages.proceso')
  const steps = t.raw('steps') as Step[]

  return (
    <main id='main-content'>
      <PageHero
        number={t('heroNumber')}
        label={t('heroLabel')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        world='ingeniero'
      />

      {steps.map((step, i) => {
        const world = STEP_WORLDS[i] ?? 'artesano'
        const styles = WORLD_STYLES[world]
        return (
          <section
            key={step.number}
            className='py-24 md:py-32 px-6 md:px-12 lg:px-24 relative'
            style={{ backgroundColor: styles.bg }}
          >
            {world === 'ingeniero' && (
              <div className='absolute inset-0 texture-ingeniero pointer-events-none' />
            )}
            <div className='max-w-7xl mx-auto relative z-10'>
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start'>
                <div className='lg:col-span-4'>
                  <motion.span
                    className='font-ingeniero text-[8rem] md:text-[10rem] font-bold leading-none block'
                    style={{ color: styles.accent, opacity: 0.1 }}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 0.1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    {step.number}
                  </motion.span>
                  <motion.h2
                    className='font-artesano italic text-3xl md:text-4xl -mt-12 relative z-10'
                    style={{ color: styles.text }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.title}
                  </motion.h2>
                  <motion.p
                    className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-2'
                    style={{ color: styles.accent }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {step.subtitle}
                  </motion.p>
                </div>

                <motion.div
                  className='lg:col-span-8'
                  variants={staggerContainer}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                >
                  <motion.p
                    className='font-body text-base md:text-lg leading-relaxed'
                    style={{ color: styles.text, opacity: 0.85 }}
                    variants={fadeInUp}
                  >
                    {step.description}
                  </motion.p>

                  <motion.div className='mt-8 space-y-0' variants={fadeInUp}>
                    {step.details.map((detail) => (
                      <div
                        key={detail}
                        className='flex items-center gap-4 py-3 border-t'
                        style={{ borderColor: `${styles.border}20` }}
                      >
                        <div
                          className='w-1.5 h-1.5 rounded-full flex-shrink-0'
                          style={{ backgroundColor: styles.accent }}
                        />
                        <span
                          className='font-body text-sm'
                          style={{ color: styles.text, opacity: 0.7 }}
                        >
                          {detail}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

      <section
        className='py-24 md:py-32 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='max-w-3xl mx-auto text-center'>
          <motion.h2
            className='font-artesano italic text-3xl md:text-4xl leading-[1.1]'
            style={{ color: '#002A3A' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('ctaTitle')}
          </motion.h2>
          <motion.p
            className='font-body text-base md:text-lg leading-relaxed mt-6'
            style={{ color: '#002A3A', opacity: 0.7 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('ctaText')}
          </motion.p>
          <motion.div
            className='mt-10'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href='/contacto'
              className='cta-fill inline-flex items-center justify-center px-16 py-6 font-artesano italic text-2xl tracking-wide transition-colors duration-500'
              style={{ color: '#002A3A' }}
              data-cursor='precision'
            >
              {t('ctaButton')}
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
