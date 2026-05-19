'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Breadcrumbs from '@/components/Breadcrumbs'
import ImageGallery from '@/components/ImageGallery'
import { Link } from '@/i18n/navigation'
import {
  type ProjectAct,
  type ProjectFull,
  getAdjacentProjects,
} from '@/data/projects'
import { getMaterialsForProject } from '@/data/materials'
import type { Locale } from '@/i18n/routing'
import type { World } from '@/lib/constants'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Props {
  project: ProjectFull
}

type WorldStyle = {
  bg: string
  text: string
  accent: string
  /** Optional decorative background overlay (e.g. blueprint grid for ingeniero) */
  overlay?: string
}

const WORLD_STYLES: Record<World, WorldStyle> = {
  artesano: {
    bg: '#F3ECEB',
    text: '#002A3A',
    accent: '#8C7732',
  },
  ingeniero: {
    bg: '#F3ECEB',
    text: '#002A3A',
    accent: '#8C7732',
    overlay:
      'linear-gradient(rgba(0,42,58,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,42,58,0.05) 1px, transparent 1px)',
  },
  fabrica: {
    bg: '#002A3A',
    text: '#F3ECEB',
    accent: '#8C7732',
  },
}

export default function ProjectDetailContent({ project }: Props) {
  const locale = useLocale() as Locale
  const tPage = useTranslations('pages.proyectos')
  const tWorlds = useTranslations('projectWorlds')
  const tActs = useTranslations('projectActs')
  const tMaterialCategories = useTranslations('materialCategories')
  const { prev, next } = getAdjacentProjects(project.slug, locale)
  const materials = getMaterialsForProject(project.slug, locale)
  const worldLabel = tWorlds(project.world)

  return (
    <main id='main-content'>
      {/* ─────────── ACT 0: HERO ─────────── */}
      <section
        className='relative min-h-[80vh] flex items-end'
        style={{ backgroundColor: '#002A3A' }}
      >
        <div className='absolute inset-0'>
          <div
            className='w-full h-full bg-cover bg-center'
            style={{
              backgroundImage: `url(${project.heroImage})`,
              opacity: 0.7,
            }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-[#002A3A] via-[#002A3A]/40 to-[#002A3A]/30' />
        </div>

        <div className='relative z-10 w-full px-6 md:px-12 lg:px-24 pb-16 md:pb-24 pt-32'>
          <div className='max-w-7xl mx-auto'>
            <Breadcrumbs
              items={[
                { label: tPage('breadcrumb'), href: '/proyectos' },
                { label: project.title },
              ]}
              color='#F3ECEB'
            />

            <motion.p
              className='font-ingeniero text-[11px] tracking-[0.3em] uppercase mt-8'
              style={{ color: '#8C7732' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {worldLabel} · {project.location} · {project.year}
            </motion.p>

            <motion.h1
              className='font-artesano italic text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] mt-4'
              style={{ color: '#F3ECEB' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {project.title}
            </motion.h1>

            {project.creativeDirector && (
              <motion.p
                className='font-artesano italic text-lg md:text-xl mt-2'
                style={{ color: '#F3ECEB', opacity: 0.7 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {project.creativeDirector} · {project.client}
              </motion.p>
            )}

            <motion.p
              className='font-body text-lg md:text-xl leading-relaxed mt-8 max-w-3xl'
              style={{ color: '#F3ECEB', opacity: 0.75 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {project.shortDescription}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─────────── STATS BAR ─────────── */}
      {project.stats && (
        <section
          className='py-10 px-6 md:px-12 lg:px-24'
          style={{ backgroundColor: '#001F2C' }}
        >
          <div className='max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-12 md:gap-20'>
            {project.stats.map((stat) => (
              <div key={stat.label} className='text-center'>
                <p
                  className='font-ingeniero text-2xl md:text-3xl font-bold'
                  style={{ color: '#8C7732' }}
                >
                  {stat.value}
                </p>
                <p
                  className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mt-1'
                  style={{ color: '#F3ECEB', opacity: 0.4 }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────── LONG DESCRIPTION (transición) ─────────── */}
      <section
        className='py-20 md:py-28 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <div className='max-w-3xl mx-auto'>
          <motion.p
            className='font-artesano italic text-2xl md:text-3xl leading-[1.3]'
            style={{ color: '#002A3A' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {project.longDescription}
          </motion.p>
        </div>
      </section>

      {/* ─────────── ACTOS 1–4 ─────────── */}
      {project.acts.map((act, idx) => (
        <ActSection
          key={act.id}
          act={act}
          number={tActs(`${act.id}.number`)}
          label={tActs(`${act.id}.label`)}
          worldLabel={tWorlds(act.world)}
          reverse={idx % 2 === 1}
        />
      ))}

      {/* ─────────── MATERIALES (si hay) ─────────── */}
      {materials.length > 0 && (
        <section
          className='py-24 md:py-32 px-6 md:px-12 lg:px-24'
          style={{ backgroundColor: '#F3ECEB' }}
        >
          <div className='max-w-7xl mx-auto border-t border-[#8C7732]/10 pt-16'>
            <motion.h2
              className='font-artesano italic text-2xl md:text-3xl mb-8'
              style={{ color: '#002A3A' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {tPage('materialsUsedTitle')}
            </motion.h2>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {materials.map((mat) => (
                <Link
                  key={mat.slug}
                  href={`/materiales/${mat.slug}`}
                  className='group'
                >
                  <div className='relative overflow-hidden aspect-square'>
                    <div
                      className='w-full h-full transition-transform duration-700 group-hover:scale-105'
                      style={{
                        background:
                          mat.category === 'Maderas'
                            ? 'linear-gradient(135deg, #5C4033 0%, #8B6914 50%, #3E2723 100%)'
                            : mat.category === 'Metales'
                              ? 'linear-gradient(135deg, #37474F 0%, #B0BEC5 50%, #263238 100%)'
                              : mat.category === 'Piedras'
                                ? 'linear-gradient(135deg, #BDBDBD 0%, #E0E0E0 50%, #9E9E9E 100%)'
                                : 'linear-gradient(135deg, #F3ECEB 0%, #F3ECEB 50%, #B2DFDB 100%)',
                      }}
                    />
                  </div>
                  <p
                    className='font-artesano text-base mt-2'
                    style={{ color: '#002A3A' }}
                  >
                    {mat.name}
                  </p>
                  <p
                    className='font-ingeniero text-[10px] tracking-[0.2em] uppercase'
                    style={{ color: '#8C7732' }}
                  >
                    {tMaterialCategories(mat.category)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── PREV / NEXT ─────────── */}
      <section
        className='py-16 px-6 md:px-12 lg:px-24'
        style={{ backgroundColor: '#002A3A' }}
      >
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          {prev ? (
            <Link
              href={`/proyectos/${prev.slug}`}
              className='group flex items-center gap-4'
            >
              <span
                className='font-ingeniero text-2xl transition-transform group-hover:-translate-x-2'
                style={{ color: '#8C7732' }}
              >
                ←
              </span>
              <div>
                <p
                  className='font-ingeniero text-[10px] tracking-[0.2em] uppercase'
                  style={{ color: '#F3ECEB', opacity: 0.4 }}
                >
                  {tPage('previous')}
                </p>
                <p
                  className='font-artesano italic text-lg md:text-xl'
                  style={{ color: '#F3ECEB' }}
                >
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href='/proyectos'
            className='font-ingeniero text-[11px] tracking-[0.2em] uppercase hidden md:block'
            style={{ color: '#F3ECEB', opacity: 0.4 }}
          >
            {tPage('viewAll')}
          </Link>

          {next ? (
            <Link
              href={`/proyectos/${next.slug}`}
              className='group flex items-center gap-4 text-right'
            >
              <div>
                <p
                  className='font-ingeniero text-[10px] tracking-[0.2em] uppercase'
                  style={{ color: '#F3ECEB', opacity: 0.4 }}
                >
                  {tPage('next')}
                </p>
                <p
                  className='font-artesano italic text-lg md:text-xl'
                  style={{ color: '#F3ECEB' }}
                >
                  {next.title}
                </p>
              </div>
              <span
                className='font-ingeniero text-2xl transition-transform group-hover:translate-x-2'
                style={{ color: '#8C7732' }}
              >
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </main>
  )
}

// ────────────────────────────────────────────────────────────────────
// ActSection — un acto editorial completo con paleta por mundo
// ────────────────────────────────────────────────────────────────────
interface ActSectionProps {
  act: ProjectAct
  number: string
  label: string
  worldLabel: string
  reverse?: boolean
}

function ActSection({ act, number, label, worldLabel, reverse }: ActSectionProps) {
  const style = WORLD_STYLES[act.world]
  const isResult = act.id === 'result'

  return (
    <section
      className='relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden'
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.overlay && (
        <div
          className='absolute inset-0 pointer-events-none'
          style={{
            backgroundImage: style.overlay,
            backgroundSize: '48px 48px',
          }}
          aria-hidden
        />
      )}

      <div className='relative max-w-7xl mx-auto'>
        {/* Header del acto */}
        <motion.div
          className='grid grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-16'
          variants={staggerContainer}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className='col-span-12 md:col-span-3' variants={fadeInUp}>
            <p
              className='font-ingeniero text-[10px] tracking-[0.3em] uppercase mb-3'
              style={{ color: style.accent }}
            >
              {worldLabel}
            </p>
            <p
              className='font-ingeniero text-[clamp(4rem,10vw,8rem)] leading-none font-light'
              style={{ color: style.accent, opacity: 0.85 }}
            >
              {number}
            </p>
            <p
              className='font-ingeniero text-xs md:text-sm tracking-[0.3em] uppercase mt-2'
              style={{ color: style.text, opacity: 0.6 }}
            >
              {label}
            </p>
          </motion.div>

          <motion.div className='col-span-12 md:col-span-9' variants={fadeInUp}>
            <h2
              className='font-artesano italic text-[clamp(2rem,5vw,4rem)] leading-[1.05] mb-8'
              style={{ color: style.text }}
            >
              {act.title}
            </h2>
            <p
              className='font-body text-base md:text-lg leading-relaxed max-w-2xl'
              style={{ color: style.text, opacity: 0.8 }}
            >
              {act.body}
            </p>
          </motion.div>
        </motion.div>

        {/* Imágenes del acto */}
        {isResult ? (
          <ImageGallery images={act.images} accentColor={style.accent} />
        ) : (
          <ActImageGrid images={act.images} reverse={reverse} accent={style.accent} />
        )}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────
// ActImageGrid — layout asimétrico según el número de imágenes
// ────────────────────────────────────────────────────────────────────
function ActImageGrid({
  images,
  reverse,
  accent,
}: {
  images: ProjectAct['images']
  reverse?: boolean
  accent: string
}) {
  if (images.length === 0) return null

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  if (images.length === 1) {
    return (
      <motion.figure
        className='relative w-full aspect-[16/9] overflow-hidden'
        variants={variants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className='w-full h-full bg-cover bg-center'
          style={{ backgroundImage: `url(${images[0].src})` }}
          role='img'
          aria-label={images[0].alt}
        />
        {images[0].caption && (
          <figcaption
            className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mt-3'
            style={{ color: accent }}
          >
            {images[0].caption}
          </figcaption>
        )}
      </motion.figure>
    )
  }

  if (images.length === 2) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        {images.map((img, i) => (
          <motion.div
            key={i}
            className='relative w-full aspect-[4/3] overflow-hidden'
            variants={variants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className='w-full h-full bg-cover bg-center'
              style={{ backgroundImage: `url(${img.src})` }}
              role='img'
              aria-label={img.alt}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  if (images.length === 3) {
    // 1 grande + 2 pequeñas apiladas (alternable con `reverse`)
    const [big, ...rest] = images
    const Big = (
      <motion.div
        className='relative aspect-[4/5] md:aspect-[3/4] overflow-hidden'
        variants={variants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className='w-full h-full bg-cover bg-center'
          style={{ backgroundImage: `url(${big.src})` }}
          role='img'
          aria-label={big.alt}
        />
      </motion.div>
    )
    const Small = (
      <div className='grid grid-rows-2 gap-4 md:gap-6'>
        {rest.map((img, i) => (
          <motion.div
            key={i}
            className='relative aspect-[4/3] overflow-hidden'
            variants={variants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <div
              className='w-full h-full bg-cover bg-center'
              style={{ backgroundImage: `url(${img.src})` }}
              role='img'
              aria-label={img.alt}
            />
          </motion.div>
        ))}
      </div>
    )
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
        {reverse ? Small : Big}
        {reverse ? Big : Small}
      </div>
    )
  }

  // 4+ imágenes → grid 2x2 (las primeras 4)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6'>
      {images.slice(0, 4).map((img, i) => (
        <motion.div
          key={i}
          className='relative aspect-[4/3] overflow-hidden'
          variants={variants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: i * 0.08 }}
        >
          <div
            className='w-full h-full bg-cover bg-center'
            style={{ backgroundImage: `url(${img.src})` }}
            role='img'
            aria-label={img.alt}
          />
        </motion.div>
      ))}
    </div>
  )
}
