'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const tCommon = useTranslations('common')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
    }, 150)

    const minTime = new Promise((resolve) => setTimeout(resolve, 2000))
    const windowLoad = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve(true)
      } else {
        window.addEventListener('load', () => resolve(true), { once: true })
      }
    })

    Promise.all([minTime, windowLoad]).then(() => {
      clearInterval(interval)
      setProgress(100)
      setTimeout(() => setIsLoading(false), 400)
    })

    document.body.style.overflow = 'hidden'
    return () => {
      clearInterval(interval)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className='fixed inset-0 z-[60] flex flex-col items-center justify-center'
          style={{ backgroundColor: '#001A26' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-label={tCommon('loading')}
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Image
              src='/images/logo-white.svg'
              alt={tCommon('logoAlt')}
              width={161}
              height={70}
              className='h-[clamp(6rem,18vw,12rem)] w-auto'
              priority
              unoptimized
            />
          </motion.div>

          <div className='mt-12 w-48 h-[1px] bg-[#002A3A] overflow-hidden'>
            <motion.div
              className='h-full origin-left'
              style={{ backgroundColor: '#8C7732' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: Math.min(progress / 100, 1) }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
