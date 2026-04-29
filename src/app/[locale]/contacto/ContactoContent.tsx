'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import PageHero from '@/components/PageHero'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function ContactoContent() {
  const t = useTranslations('contacta')
  const tPage = useTranslations('pages.contacto')
  const tProjectTypes = useTranslations('pages.contacto.projectTypes')

  const paragraphs = t.raw('paragraphs') as string[]
  const email = t('email')
  const phone = t('phone')
  const location = t('location')

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24'>
            <motion.div
              variants={staggerContainer}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div
                  className='py-16 text-center'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3
                    className='font-artesano italic text-3xl'
                    style={{ color: '#8C7732' }}
                  >
                    {tPage('thanksTitle')}
                  </h3>
                  <p
                    className='font-body text-base mt-4'
                    style={{ color: '#002A3A', opacity: 0.7 }}
                  >
                    {tPage('thanksText')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <motion.div variants={fadeInUp}>
                    <label
                      className='font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2'
                      style={{ color: '#8C7732' }}
                    >
                      {tPage('formNameLabel')}
                    </label>
                    <input
                      type='text'
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      className='w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732]'
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      className='font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2'
                      style={{ color: '#8C7732' }}
                    >
                      {tPage('formEmailLabel')}
                    </label>
                    <input
                      type='email'
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      className='w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732]'
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      className='font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2'
                      style={{ color: '#8C7732' }}
                    >
                      {tPage('formCompanyLabel')}
                    </label>
                    <input
                      type='text'
                      value={formState.company}
                      onChange={(e) =>
                        setFormState({ ...formState, company: e.target.value })
                      }
                      className='w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732]'
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      className='font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2'
                      style={{ color: '#8C7732' }}
                    >
                      {tPage('formProjectTypeLabel')}
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          projectType: e.target.value
                        })
                      }
                      className='w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732] appearance-none'
                      style={{ color: '#002A3A' }}
                    >
                      <option value=''>{tPage('formSelectPlaceholder')}</option>
                      <option value='hospitality'>{tProjectTypes('hospitality')}</option>
                      <option value='residencial'>{tProjectTypes('residencial')}</option>
                      <option value='gastronomia'>{tProjectTypes('gastronomia')}</option>
                      <option value='contract'>{tProjectTypes('contract')}</option>
                      <option value='otro'>{tProjectTypes('otro')}</option>
                    </select>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <label
                      className='font-ingeniero text-[10px] tracking-[0.2em] uppercase block mb-2'
                      style={{ color: '#8C7732' }}
                    >
                      {tPage('formMessageLabel')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className='w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732] resize-none'
                      style={{ color: '#002A3A' }}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} className='pt-4'>
                    <button
                      type='submit'
                      className='cta-fill inline-flex items-center justify-center px-12 py-5 font-artesano italic text-xl tracking-wide transition-colors duration-500 w-full md:w-auto'
                      style={{ color: '#8C7732' }}
                      data-cursor='precision'
                    >
                      {tPage('formSubmit')}
                    </button>
                  </motion.div>
                </form>
              )}
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

              <motion.div className='mt-12 space-y-8' variants={fadeInUp}>
                <div>
                  <h3
                    className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-2'
                    style={{ color: '#8C7732' }}
                  >
                    {tPage('emailLabel')}
                  </h3>
                  <a
                    href={`mailto:${email}`}
                    className='font-body text-lg transition-opacity hover:opacity-100'
                    style={{ color: '#002A3A', opacity: 0.7 }}
                  >
                    {email}
                  </a>
                </div>

                <div>
                  <h3
                    className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-2'
                    style={{ color: '#8C7732' }}
                  >
                    {tPage('phoneLabel')}
                  </h3>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className='font-body text-lg transition-opacity hover:opacity-100'
                    style={{ color: '#002A3A', opacity: 0.7 }}
                  >
                    {phone}
                  </a>
                </div>

                <div>
                  <h3
                    className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-2'
                    style={{ color: '#8C7732' }}
                  >
                    {tPage('locationLabel')}
                  </h3>
                  <p
                    className='font-body text-lg'
                    style={{ color: '#002A3A', opacity: 0.7 }}
                  >
                    {location}
                  </p>
                </div>

                <div>
                  <h3
                    className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mb-4'
                    style={{ color: '#8C7732' }}
                  >
                    {tPage('socialLabel')}
                  </h3>
                  <div className='flex gap-8'>
                    <a
                      href='#'
                      className='font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100'
                      style={{ color: '#002A3A', opacity: 0.5 }}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Instagram
                    </a>
                    <a
                      href='#'
                      className='font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100'
                      style={{ color: '#002A3A', opacity: 0.5 }}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className='mt-12 aspect-[4/3] relative overflow-hidden'
                variants={fadeInUp}
              >
                <div
                  className='w-full h-full flex items-center justify-center'
                  style={{
                    background:
                      'linear-gradient(135deg, #F3ECEB 0%, #F3ECEB 100%)'
                  }}
                >
                  <div className='text-center'>
                    <p
                      className='font-ingeniero text-[11px] tracking-[0.2em] uppercase'
                      style={{ color: '#002A3A', opacity: 0.5 }}
                    >
                      {location}
                    </p>
                    <p
                      className='font-body text-sm mt-2'
                      style={{ color: '#002A3A', opacity: 0.3 }}
                    >
                      39.4699° N, 0.3763° W
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
