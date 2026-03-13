'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { HERO_PHRASES } from '@/lib/constants';

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 40);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Europe/Madrid',
        })
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

export default function HeroDoor() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Door panels movement
  const leftDoorX = useTransform(scrollYProgress, [0, 0.35], ['0%', '-105%']);
  const rightDoorX = useTransform(scrollYProgress, [0, 0.35], ['0%', '105%']);

  // Text fades out early
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Video scales down
  const videoScale = useTransform(scrollYProgress, [0, 0.4], [1.15, 1]);

  // Golden crack width
  const crackWidth = useTransform(scrollYProgress, [0, 0.05, 0.1], [2, 2, 0]);
  const crackOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Scroll indicator fades
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Cycle phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % HERO_PHRASES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: Video Background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: videoScale }}
        >
          {/* Placeholder gradient - replace with actual video */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#162a30] via-[#263f47] to-[#1c3037]" />
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
          >
            {/* PLACEHOLDER: Add video source */}
            {/* <source src="/videos/hero.mp4" type="video/mp4" /> */}
          </video>
          {/* Gradient mesh overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#101e23] via-transparent to-[#101e23]/40" />
        </motion.div>

        {/* Layer 2: Door Panels */}
        {/* Left Door */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 z-10"
          style={{
            x: leftDoorX,
            backgroundColor: '#101e23',
          }}
        >
          <div className="absolute inset-0 texture-artesano opacity-10" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #162a30 0%, #101e23 50%, #162a30 100%)',
            }}
          />
        </motion.div>

        {/* Right Door */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 z-10"
          style={{
            x: rightDoorX,
            backgroundColor: '#101e23',
          }}
        >
          <div className="absolute inset-0 texture-artesano opacity-10" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(225deg, #162a30 0%, #101e23 50%, #162a30 100%)',
            }}
          />
        </motion.div>

        {/* Golden Light Crack */}
        <motion.div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-20"
          style={{
            width: crackWidth,
            opacity: crackOpacity,
            background: 'linear-gradient(180deg, transparent 0%, #077275 20%, #077275 80%, transparent 100%)',
            boxShadow: '0 0 30px 10px rgba(7, 114, 117, 0.3)',
          }}
        />

        {/* Layer 3: Text Overlay */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center"
          style={{ opacity: textOpacity, scale: textScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
          >
            <Image
              src="/images/logo-white.svg"
              alt="OMIO Atelier & Design"
              width={483}
              height={210}
              priority
              className="w-[clamp(280px,40vw,500px)] h-auto"
            />
          </motion.div>

          {/* Rotating phrases with typewriter */}
          <motion.div
            className="mt-12 h-8 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.6 }}
          >
            <p
              className="font-body text-sm md:text-base tracking-wide text-center max-w-md px-6"
              style={{ color: '#E8F5F2', opacity: 0.7 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={phraseIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TypewriterText text={HERO_PHRASES[phraseIndex]} />
                </motion.span>
              </AnimatePresence>
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Left: Scroll to enter */}
        <motion.div
          className="absolute bottom-8 left-8 z-30 flex items-center gap-3"
          style={{ opacity: scrollIndicatorOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 4.2 }}
        >
          <span className="font-ingeniero text-[10px] tracking-[0.3em] uppercase" style={{ color: '#E8F5F2' }}>
            Scroll to enter
          </span>
          <motion.span
            className="inline-block"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ color: '#077275' }}
          >
            ↓
          </motion.span>
        </motion.div>

        {/* Bottom Right: Location + Live Time */}
        <motion.div
          className="absolute bottom-8 right-8 z-30 text-right"
          style={{ opacity: scrollIndicatorOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 4.2 }}
        >
          <p className="font-ingeniero text-[10px] tracking-[0.2em]" style={{ color: '#E8F5F2' }}>
            Valencia, España
          </p>
          <p className="font-ingeniero text-[10px] tracking-[0.2em] mt-1" style={{ color: '#077275' }}>
            <LiveClock />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
