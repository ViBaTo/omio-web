'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Catalog } from '@/data/catalogs'
import CoverImage from './CoverImage'
import { IMAGE_SIZES } from '@/lib/images/sizes'

interface CatalogCardProps {
  catalog: Catalog
}

export default function CatalogCard({ catalog }: CatalogCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const tPage = useTranslations('pages.catalogos')

  return (
    <Link href={`/catalogos/${catalog.slug}`}>
      <motion.article
        className='group cursor-pointer'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        data-cursor='precision'
      >
        <div className='relative overflow-hidden aspect-[4/5]'>
          <motion.div
            className='absolute inset-0'
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <CoverImage
              src={catalog.cover}
              alt={catalog.title}
              sizes={IMAGE_SIZES.catalogCard}
            />
          </motion.div>
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            style={{ backgroundColor: 'rgba(0, 42, 58, 0.35)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className='font-ingeniero text-xs tracking-[0.3em] uppercase'
              style={{ color: '#F3ECEB' }}
            >
              {tPage('viewCatalog')}
            </span>
          </motion.div>
        </div>

        <div className='mt-4'>
          {catalog.year != null && (
            <p
              className='font-ingeniero text-[11px] tracking-[0.2em] uppercase'
              style={{ color: '#8C7732' }}
            >
              {catalog.year}
            </p>
          )}
          <h3
            className='font-artesano text-2xl mt-1'
            style={{ color: '#002A3A' }}
          >
            {catalog.title}
          </h3>
          {catalog.description ? (
            <p
              className='font-body text-base mt-2 line-clamp-2'
              style={{ color: '#002A3A', opacity: 0.7 }}
            >
              {catalog.description}
            </p>
          ) : null}
        </div>
      </motion.article>
    </Link>
  )
}
