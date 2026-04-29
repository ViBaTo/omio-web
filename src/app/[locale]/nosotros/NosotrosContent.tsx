'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import PageHero from '@/components/PageHero'
import CounterAnimation from '@/components/CounterAnimation'
import { STATS } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Value {
  title: string
  description: string
}

interface TeamRole {
  name: string
  count: string
}

export default function NosotrosContent() {
  const t = useTranslations('nosotros')
  const tStats = useTranslations('stats')
  const tPage = useTranslations('pages.nosotros')

  const paragraphs = t.raw('paragraphs') as string[]
  const values = t.raw('values') as Value[]
  const teamRoles = t.raw('teamRoles') as TeamRole[]

  return (
    <main id='main-content'>
      <PageHero
        number={tPage('heroNumber')}
        label={tPage('heroLabel')}
        title={t('title')}
        subtitle={paragraphs[0]}
        world='artesano'
      />

      <section
        className='py-24 md:py-32 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <motion.div
            className='relative overflow-hidden'
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className='aspect-[4/5] w-full bg-cover bg-center'
              style={{
                backgroundImage: "url('/images/artesania/IMG_1695.jpg')"
              }}
            />
            <div className='absolute inset-0 texture-artesano opacity-20 mix-blend-overlay' />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            <motion.p
              className='font-body text-base md:text-lg leading-relaxed'
              style={{ color: '#002A3A', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {paragraphs[1]}
            </motion.p>

            <motion.p
              className='font-body text-base md:text-lg leading-relaxed mt-6'
              style={{ color: '#002A3A', opacity: 0.85 }}
              variants={fadeInUp}
            >
              {t('additionalParagraph')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section
        className='py-20 md:py-28 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#002A3A' }}
      >
        <div className='max-w-5xl mx-auto grid grid-cols-3 gap-8 md:gap-16'>
          {STATS.map((stat) => (
            <div key={stat.labelKey} className='text-center'>
              <CounterAnimation
                value={stat.value}
                suffix={stat.suffix}
                className='font-ingeniero text-[clamp(2.5rem,6vw,5rem)] font-bold'
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
      </section>

      <section
        className='py-24 md:py-32 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='max-w-7xl mx-auto'>
          <motion.h2
            className='font-artesano italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-16'
            style={{ color: '#002A3A' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('valuesTitle')}
          </motion.h2>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-8'
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                className='p-8 md:p-10 border border-[#8C7732]/15'
                variants={fadeInUp}
              >
                <h3
                  className='font-artesano italic text-xl md:text-2xl'
                  style={{ color: '#8C7732' }}
                >
                  {value.title}
                </h3>
                <p
                  className='font-body text-base leading-relaxed mt-4'
                  style={{ color: '#002A3A', opacity: 0.7 }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className='py-24 md:py-32 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='absolute inset-0 texture-ingeniero pointer-events-none' />
        <div className='max-w-7xl mx-auto relative z-10'>
          <motion.h2
            className='font-artesano italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-6'
            style={{ color: '#002A3A' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('teamTitle')}
          </motion.h2>

          <motion.p
            className='font-body text-base md:text-lg leading-relaxed mb-16 max-w-3xl'
            style={{ color: '#002A3A', opacity: 0.7 }}
            variants={fadeInUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            {t('teamIntro')}
          </motion.p>

          <motion.div
            className='space-y-0'
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
          >
            {teamRoles.map((role) => (
              <motion.div
                key={role.name}
                className='flex items-center justify-between py-6 border-t border-[#002A3A]/15'
                variants={fadeInUp}
              >
                <h3
                  className='font-artesano text-lg md:text-xl'
                  style={{ color: '#002A3A' }}
                >
                  {role.name}
                </h3>
                <span
                  className='font-ingeniero text-sm tracking-[0.15em]'
                  style={{ color: '#002A3A', opacity: 0.5 }}
                >
                  {role.count}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
