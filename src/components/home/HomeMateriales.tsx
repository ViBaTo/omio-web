'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import type { Locale } from '@/i18n/routing'
import { getMaterialBySlug } from '@/data/materials'

interface FeaturedItem {
  slug: string
}

export default function HomeMateriales() {
  const t = useTranslations('home.materiales')
  const locale = useLocale() as Locale
  const featured = t.raw('featured') as FeaturedItem[]

  return (
    <section
      className='relative py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: '#F3ECEB' }}
    >
      <div className='max-w-7xl mx-auto'>
        <motion.div
          className='flex items-center gap-4 mb-6'
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className='font-ingeniero text-sm tracking-[0.3em]'
            style={{ color: '#8C7732' }}
          >
            03
          </span>
          <div
            className='w-12 h-[1px]'
            style={{ backgroundColor: '#8C7732', opacity: 0.4 }}
          />
          <span
            className='font-ingeniero text-xs tracking-[0.2em] uppercase'
            style={{ color: '#8C7732' }}
          >
            {t('label')}
          </span>
        </motion.div>

        <motion.h2
          className='font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.1] mb-6'
          style={{ color: '#002A3A' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          className='font-body text-lg md:text-xl leading-relaxed mb-16 max-w-3xl'
          style={{ color: '#002A3A', opacity: 0.7 }}
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {t('intro')}
        </motion.p>

        <motion.div
          className='grid grid-cols-2 md:grid-cols-4 gap-6'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {featured.map((item, idx) => {
            const material = getMaterialBySlug(item.slug, locale)
            if (!material) return null
            return (
              <motion.div key={`${item.slug}-${idx}`} variants={fadeInUp}>
                <Link href={`/materiales/${item.slug}`} className='group block'>
                  <div className='relative overflow-hidden aspect-[3/4]'>
                    <div
                      className='w-full h-full transition-transform duration-700 group-hover:scale-105 bg-cover bg-center'
                      style={{ backgroundImage: `url(${material.image})` }}
                    />
                  </div>
                  <p
                    className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-3'
                    style={{ color: '#8C7732' }}
                  >
                    {material.name}
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className='mt-12 text-center'
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <Link
            href='/materiales'
            className='inline-flex items-center gap-3 font-ingeniero text-xs tracking-[0.2em] uppercase group min-h-11'
            style={{ color: '#8C7732' }}
          >
            <span>{t('cta')}</span>
            <span className='inline-block transition-transform group-hover:translate-x-2'>
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
