'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { fadeInUp } from '@/lib/animations'

export default function Footer() {
  const tFooter = useTranslations('footer')
  const tCommon = useTranslations('common')
  const year = new Date().getFullYear()

  return (
    <footer
      className='relative py-24 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: '#001A26' }}
    >
      <div className='max-w-7xl mx-auto text-center'>
        <motion.div
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          <Link href='/'>
            <Image
              src='/images/logo-white.svg'
              alt={tCommon('logoAlt')}
              width={161}
              height={70}
              className='h-20 md:h-24 w-auto mx-auto'
              unoptimized
            />
          </Link>
        </motion.div>

        <div
          className='w-24 h-[1px] mx-auto my-10'
          style={{ backgroundColor: '#8C7732', opacity: 0.5 }}
        />

        <motion.address
          className='not-italic font-ingeniero text-[11px] tracking-[0.15em] leading-relaxed'
          style={{ color: '#F3ECEB', opacity: 0.7 }}
          variants={fadeInUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {tFooter('addressLine1')}
          <br />
          {tFooter('addressLine2')}
        </motion.address>

        <p
          className='font-ingeniero text-[11px] tracking-[0.15em] mt-12'
          style={{ color: '#F3ECEB', opacity: 0.25 }}
        >
          {tFooter('copyright', { year })}
        </p>
      </div>
    </footer>
  )
}
