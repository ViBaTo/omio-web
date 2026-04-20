'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Slide {
  id: string;
  phrase: string;
  media?: { type: 'image' | 'video'; src: string; poster?: string };
  gradient: string;
}

const SLIDES: Slide[] = [
  {
    id: 'artesano',
    phrase: 'La unión de un artesano, un ingeniero y una fábrica.',
    media: { type: 'video', src: '/videos/IMG_1674.mp4', poster: '/images/artesania/IMG_1711.jpg' },
    gradient: 'linear-gradient(135deg, #001A26 0%, #002A3A 60%, #001F2C 100%)',
  },
  {
    id: 'tranquilidad',
    phrase: 'Mitigamos los riesgos técnicos y logísticos de cada proyecto.',
    media: { type: 'video', src: '/videos/IMG_1854.mp4', poster: '/images/artesania/IMG_1842.jpg' },
    gradient: 'linear-gradient(135deg, #002A3A 0%, #001F2C 55%, #001A26 100%)',
  },
  {
    id: 'escala',
    phrase: 'De la sensibilidad artesanal a la potencia industrial.',
    media: { type: 'video', src: '/videos/IMG_1923.mp4', poster: '/images/artesania/colada.jpg' },
    gradient: 'linear-gradient(135deg, #001F2C 0%, #002A3A 50%, #001A26 100%)',
  },
  {
    id: 'prototipo',
    phrase: 'Del prototipado a la instalación, una única mano guía el proceso.',
    media: { type: 'video', src: '/videos/IMG_1848.mp4', poster: '/images/artesania/IMG_1410.jpg' },
    gradient: 'linear-gradient(135deg, #002A3A 0%, #001A26 50%, #001F2C 100%)',
  },
  {
    id: 'detalle',
    phrase: 'En el detalle intangible reside el valor de la alta gama.',
    media: { type: 'image', src: '/images/artesania/IMG_2146.jpg' },
    gradient: 'linear-gradient(135deg, #001A26 0%, #001F2C 50%, #002A3A 100%)',
  },
  {
    id: 'prueba',
    phrase: 'Anticipamos lo que otros dan por imposible.',
    media: { type: 'video', src: '/videos/IMG_1938.mp4', poster: '/images/artesania/IMG_1458.jpg' },
    gradient: 'linear-gradient(135deg, #002A3A 0%, #001F2C 60%, #001A26 100%)',
  },
  {
    id: 'promesa',
    phrase: 'Socio inestimable de los estudios más prestigiosos del mundo.',
    media: { type: 'video', src: '/videos/IMG_1693.mp4', poster: '/images/artesania/IMG_1647.jpg' },
    gradient: 'linear-gradient(135deg, #001A26 0%, #001F2C 50%, #002A3A 100%)',
  },
];

const AUTOPLAY_MS = 6000;

export default function HomeServicios() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [next, index]);

  const current = SLIDES[index];

  return (
    <section
      className="relative w-full h-[85vh] md:h-screen overflow-hidden"
      style={{ backgroundColor: '#001A26' }}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Media background — image OR video. Placeholder gradient until media is added. */}
          {current.media?.type === 'video' ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={current.media.poster}
              style={{ filter: 'grayscale(100%) contrast(1.05)' }}
            >
              <source src={current.media.src} type="video/mp4" />
            </video>
          ) : current.media?.type === 'image' ? (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${current.media.src})`,
                filter: 'grayscale(100%) contrast(1.05)',
              }}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: current.gradient }} />
          )}

          {/* Subtle texture overlay for depth */}
          <div className="absolute inset-0 texture-artesano opacity-30" />

          {/* Dark gradient overlay for legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,26,38,0.55) 0%, rgba(0,42,58,0.4) 50%, rgba(0,26,38,0.7) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Phrase overlay */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-6 md:px-16">
        <AnimatePresence mode="wait">
          <motion.h2
            key={current.id}
            className="font-artesano italic text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.15] text-center max-w-5xl"
            style={{ color: '#F3ECEB' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {current.phrase}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom: pagination + CTA */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex flex-col items-center gap-6 px-6">
        <div className="flex items-center gap-3" role="tablist" aria-label="Slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir al slide ${i + 1}`}
              aria-selected={i === index}
              role="tab"
              className="h-[2px] transition-all"
              style={{
                width: i === index ? '40px' : '18px',
                backgroundColor: i === index ? '#8C7732' : '#F3ECEB',
                opacity: i === index ? 1 : 0.35,
              }}
            />
          ))}
        </div>

        <Link
          href="/servicios"
          className="inline-flex items-center gap-3 font-ingeniero text-[11px] tracking-[0.25em] uppercase group"
          style={{ color: '#F3ECEB' }}
        >
          <span>Explorar servicios</span>
          <span className="inline-block transition-transform group-hover:translate-x-2" style={{ color: '#8C7732' }}>
            →
          </span>
        </Link>
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center font-ingeniero text-xl transition-opacity hover:opacity-100"
        style={{ color: '#F3ECEB', opacity: 0.5 }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Siguiente slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center font-ingeniero text-xl transition-opacity hover:opacity-100"
        style={{ color: '#F3ECEB', opacity: 0.5 }}
      >
        →
      </button>
    </section>
  );
}
