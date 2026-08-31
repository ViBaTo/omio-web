'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Breadcrumbs from '@/components/Breadcrumbs'
import CatalogDownloadLink from '@/components/CatalogDownloadLink'
import type { Catalog } from '@/data/catalogs'
import { fadeInUp } from '@/lib/animations'

const CatalogViewer = dynamic(() => import('@/components/CatalogViewer'), {
  ssr: false,
  loading: () => (
    <div
      className='min-h-[50vh]'
      style={{ backgroundColor: '#E8DEDC' }}
      aria-hidden
    />
  ),
})

interface Props {
  catalog: Catalog
}

export default function CatalogDetailContent({ catalog }: Props) {
  const tPage = useTranslations('pages.catalogos')

  return (
    <main id='main-content' className='pb-20 md:pb-0'>
      <section
        className='pt-28 md:pt-36 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='max-w-7xl mx-auto'>
          <Breadcrumbs
            items={[
              { label: tPage('breadcrumb'), href: '/catalogos' },
              { label: catalog.title },
            ]}
          />

          <motion.div
            className='mt-8 md:mt-12 pb-10 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8'
            variants={fadeInUp}
            initial='hidden'
            animate='visible'
          >
            <div className='max-w-3xl'>
              {catalog.year != null && (
                <p
                  className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mb-3'
                  style={{ color: '#8C7732' }}
                >
                  {catalog.year}
                </p>
              )}
              <h1
                className='font-artesano italic text-[clamp(2.5rem,6vw,5rem)] leading-[1.05]'
                style={{ color: '#002A3A' }}
              >
                {catalog.title}
              </h1>
              {catalog.description ? (
                <p
                  className='font-body text-base md:text-lg leading-relaxed mt-6'
                  style={{ color: '#002A3A', opacity: 0.75 }}
                >
                  {catalog.description}
                </p>
              ) : null}
            </div>
            <div className='hidden md:block shrink-0'>
              <CatalogDownloadLink catalog={catalog} label={tPage('downloadPdf')} />
            </div>
          </motion.div>
        </div>
      </section>

      <CatalogViewer catalog={catalog} />

      <div className='md:hidden fixed bottom-0 left-0 right-0 z-40'>
        <CatalogDownloadLink
          catalog={catalog}
          label={tPage('downloadPdf')}
          variant='bar'
        />
      </div>
    </main>
  )
}
