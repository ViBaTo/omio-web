'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

      {/* Bottom Left: Scroll to enter */}
      <motion.div
        className='absolute bottom-8 left-8 z-30 flex items-center gap-3'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.6 }}
      >
        <span
          className='font-ingeniero text-[11px] tracking-[0.3em] uppercase'
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
          className='font-ingeniero text-[11px] tracking-[0.2em]'
          style={{ color: '#F3ECEB' }}
        >
          Valencia, España
        </p>
        <p
          className='font-ingeniero text-[11px] tracking-[0.2em] mt-1'
          style={{ color: '#8C7732' }}
        >
          <LiveClock />
        </p>
      </motion.div>
    </section>
  )
}
