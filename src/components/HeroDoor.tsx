'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 40)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span>
      {displayedText}
      <span className='animate-pulse'>|</span>
    </span>
  )
}

function LiveClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Madrid'
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return <span>{time}</span>
}

export default function HeroDoor() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const tHero = useTranslations('hero')
  const heroPhrases = tHero.raw('phrases') as string[]

  // Set initial muted state imperatively so React's prop reconciliation does not
  // fight us when the SoundToggle later flips video.muted = false. We also kick
  // off playback here because, without the JSX `muted` attribute, the browser's
  // autoplay heuristics would otherwise refuse to start the unmuted source.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {
      // Autoplay rejected; user can still interact.
    })
  }, [])

  // Cycle phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % heroPhrases.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [heroPhrases.length])

  return (
    <section className='relative h-screen w-full overflow-hidden'>
      {/* Layer 1: Video Background */}
      <div className='absolute inset-0 z-0 bg-black'>
        <video
          data-hero-video
          ref={videoRef}
          className='absolute inset-0 w-full h-full object-cover'
          autoPlay
          loop
          playsInline
          preload='metadata'
          poster='/images/artesania/IMG_1458.jpg'
        >
          <source src='/videos/IMG_1381.mp4' type='video/mp4' />
        </video>
        {/* Subtle bottom darkening for text legibility */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20' />
      </div>

      {/* Layer 2: Text Overlay */}
      <div className='absolute inset-0 z-30 flex flex-col items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Image
            src='/images/logo-white.svg'
            alt='OMIO Atelier & Design'
            width={483}
            height={210}
            priority
            className='w-[clamp(280px,40vw,500px)] h-auto'
          />
        </motion.div>

        {/* Rotating phrases with typewriter */}
        <motion.div
          className='mt-12 h-8 flex items-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p
            className='font-body text-sm md:text-base tracking-wide text-center max-w-md px-6'
            style={{ color: '#F3ECEB', opacity: 0.7 }}
          >
            <AnimatePresence mode='wait'>
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TypewriterText text={heroPhrases[phraseIndex]} />
              </motion.span>
            </AnimatePresence>
          </p>
        </motion.div>
      </div>

      {/* Bottom Left: Scroll to enter */}
      <motion.div
        className='absolute bottom-8 left-8 z-30 flex items-center gap-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.6 }}
      >
        <span
          className='font-ingeniero text-[10px] tracking-[0.3em] uppercase'
          style={{ color: '#F3ECEB' }}
        >
          Scroll to enter
        </span>
        <motion.span
          className='inline-block'
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ color: '#8C7732' }}
        >
          ↓
        </motion.span>
      </motion.div>

      {/* Bottom Right: Location + Live Time */}
      <motion.div
        className='absolute bottom-8 right-8 z-30 text-right'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.6 }}
      >
        <p
          className='font-ingeniero text-[10px] tracking-[0.2em]'
          style={{ color: '#F3ECEB' }}
        >
          Valencia, España
        </p>
        <p
          className='font-ingeniero text-[10px] tracking-[0.2em] mt-1'
          style={{ color: '#8C7732' }}
        >
          <LiveClock />
        </p>
      </motion.div>
    </section>
  )
}
