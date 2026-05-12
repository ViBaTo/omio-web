'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Link } from '@/i18n/navigation'
import type { Material } from '@/data/materials'
import { getProjectBySlug } from '@/data/projects'
import type { Locale } from '@/i18n/routing'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const CATEGORY_GRADIENTS: Record<string, string> = {
  Maderas: 'linear-gradient(135deg, #5C4033 0%, #8B6914 50%, #3E2723 100%)',
  Metales: 'linear-gradient(135deg, #37474F 0%, #B0BEC5 50%, #263238 100%)',
  Piedras: 'linear-gradient(135deg, #BDBDBD 0%, #E0E0E0 50%, #9E9E9E 100%)',
  Textiles: 'linear-gradient(135deg, #F3ECEB 0%, #F3ECEB 50%, #B2DFDB 100%)',
  Acabados: 'linear-gradient(135deg, #8C7732 0%, #8C7732 50%, #002A3A 100%)'
}

interface Props {
  material: Material
}

export default function MaterialDetailContent({ material }: Props) {
  const locale = useLocale() as Locale
  const tPage = useTranslations('pages.materiales')
  const tCategories = useTranslations('materialCategories')
  const tProjectCategories = useTranslations('projectCategories')

  const relatedProjects = material.projects
    .map((slug) => getProjectBySlug(slug, locale))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main id='main-content'>
      <section
        className='pt-28 md:pt-36 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='max-w-7xl mx-auto'>
          <Breadcrumbs
            items={[
              { label: tPage('breadcrumb'), href: '/materiales' },
              { label: material.name }
            ]}
          />
        </div>
      </section>

      <section
        className='py-16 md:py-24 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
            <motion.div
              className='relative overflow-hidden aspect-[4/5]'
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className='w-full h-full bg-cover bg-center'
                style={{
                  background: material.image
                    ? `url(${material.image}) center/cover no-repeat`
                    : CATEGORY_GRADIENTS[material.category] ||
                      CATEGORY_GRADIENTS.Acabados
                }}
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial='hidden'
              animate='visible'
            >
              <motion.span
                className='font-ingeniero text-[10px] tracking-[0.2em] uppercase'
                style={{ color: '#8C7732' }}
                variants={fadeInUp}
              >
                {tCategories(material.category)}
              </motion.span>

              <motion.h1
                className='font-artesano italic text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] mt-2'
                style={{ color: '#002A3A' }}
                variants={fadeInUp}
              >
                {material.name}
              </motion.h1>

              <motion.p
                className='font-body text-base md:text-lg leading-relaxed mt-6'
                style={{ color: '#002A3A', opacity: 0.85 }}
                variants={fadeInUp}
              >
                {material.longDescription}
              </motion.p>

              <motion.div className='mt-10' variants={fadeInUp}>
                <h3
                  className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mb-4'
                  style={{ color: '#8C7732' }}
                >
                  {tPage('propertiesTitle')}
                </h3>
                <div className='space-y-0'>
                  {material.properties.map((prop) => (
                    <div
                      key={prop.label}
                      className='flex items-center justify-between py-3 border-t border-[#8C7732]/10'
                    >
                      <span
                        className='font-body text-sm'
                        style={{ color: '#002A3A', opacity: 0.6 }}
                      >
                        {prop.label}
                      </span>
                      <span
                        className='font-ingeniero text-sm tracking-wide'
                        style={{ color: '#002A3A' }}
                      >
                        {prop.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div className='mt-10' variants={fadeInUp}>
                <h3
                  className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mb-4'
                  style={{ color: '#8C7732' }}
                >
                  {tPage('applicationsTitle')}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {material.applications.map((app) => (
                    <span
                      key={app}
                      className='font-body text-xs px-3 py-1.5 border border-[#8C7732]/20'
                      style={{ color: '#002A3A', opacity: 0.7 }}
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {relatedProjects.length > 0 && (
            <motion.div
              className='mt-24 pt-16 border-t border-[#8C7732]/10'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className='font-artesano italic text-2xl md:text-3xl mb-8'
                style={{ color: '#002A3A' }}
              >
                {tPage('relatedProjects')}
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {relatedProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/proyectos/${project.slug}`}
                    className='group'
                  >
                    <div className='relative overflow-hidden aspect-[16/10]'>
                      <div
                        className='w-full h-full transition-transform duration-700 group-hover:scale-105 bg-cover bg-center'
                        style={{
                          backgroundImage: `url(${project.heroImage})`
                        }}
                      />
                      <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent'>
                        <p
                          className='font-ingeniero text-[10px] tracking-[0.2em] uppercase'
                          style={{ color: '#8C7732' }}
                        >
                          {tProjectCategories(project.category)}
                        </p>
                        <h3
                          className='font-fabrica uppercase text-lg'
                          style={{ color: '#F3ECEB' }}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
