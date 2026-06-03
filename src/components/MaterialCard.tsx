'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { Material } from '@/data/materials'

interface MaterialCardProps {
  material: Material
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  Maderas: 'linear-gradient(135deg, #5C4033 0%, #8B6914 50%, #3E2723 100%)',
  Metales: 'linear-gradient(135deg, #37474F 0%, #B0BEC5 50%, #263238 100%)',
  Piedras: 'linear-gradient(135deg, #BDBDBD 0%, #E0E0E0 50%, #9E9E9E 100%)',
  Textiles: 'linear-gradient(135deg, #F3ECEB 0%, #F3ECEB 50%, #B2DFDB 100%)',
  Acabados: 'linear-gradient(135deg, #8C7732 0%, #8C7732 50%, #002A3A 100%)'
}

export default function MaterialCard({ material }: MaterialCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const tCommon = useTranslations('common')
  const tCategories = useTranslations('materialCategories')

  return (
    <Link href={`/materiales/${material.slug}`}>
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
            className='w-full h-full bg-cover bg-center'
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
            style={{
              backgroundImage: `url(${material.image})`,
              background: material.image
                ? `url(${material.image}) center/cover no-repeat`
                : CATEGORY_GRADIENTS[material.category] ||
                  CATEGORY_GRADIENTS.Acabados
            }}
          />
          <motion.div
            className='absolute inset-0 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className='font-ingeniero text-xs tracking-[0.3em] uppercase'
              style={{ color: '#F3ECEB' }}
            >
              {tCommon('seeDetail')}
            </span>
          </motion.div>
        </div>

        <div className='mt-4'>
          <p
            className='font-ingeniero text-[11px] tracking-[0.2em] uppercase'
            style={{ color: '#8C7732' }}
          >
            {tCategories(material.category)}
          </p>
          <h3
            className='font-artesano text-2xl mt-1'
            style={{ color: '#002A3A' }}
          >
            {material.name}
          </h3>
          <p
            className='font-body text-base mt-2 line-clamp-2'
            style={{ color: '#002A3A', opacity: 0.7 }}
          >
            {material.description}
          </p>
        </div>
      </motion.article>
    </Link>
  )
}
