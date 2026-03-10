'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { PALETTES } from '@/lib/constants';

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

function interpolateRgb(
  artesano: readonly number[],
  ingeniero: readonly number[],
  fabrica: readonly number[],
  bA: number,
  bI: number,
  bF: number
): string {
  const total = bA + bI + bF || 1;
  const r = (artesano[0] * bA + ingeniero[0] * bI + fabrica[0] * bF) / total;
  const g = (artesano[1] * bA + ingeniero[1] * bI + fabrica[1] * bF) / total;
  const b = (artesano[2] * bA + ingeniero[2] * bI + fabrica[2] * bF) / total;
  return rgbToHex(r, g, b);
}

export default function TextureBackground() {
  const { scrollYProgress } = useScroll();

  // Blend factors mapped to scroll ranges
  // Hero=0-0.08 | Nosotros=0.08-0.22 | Capacidades=0.22-0.38 | Artesania=0.38-0.52
  // Ingenieria=0.52-0.68 | Proyectos=0.68-0.85 | Contacta=0.85-1.0
  const artesanoBlend = useTransform(
    scrollYProgress,
    [0, 0.06, 0.08, 0.22, 0.25, 0.35, 0.38, 0.52, 0.55, 0.65, 0.68, 0.82, 0.85, 1.0],
    [0, 0,    1,    1,    0.3,  0,    1,    1,    0.3,  0,    0.2,  0.2,  0.8,  1.0]
  );

  const ingenieroBlend = useTransform(
    scrollYProgress,
    [0, 0.08, 0.22, 0.35, 0.38, 0.52, 0.55, 0.68, 0.82, 0.85, 1.0],
    [0, 0,    0,    0,    0,    0,    1,    1,    0,    0,    0]
  );

  const fabricaBlend = useTransform(
    scrollYProgress,
    [0, 0.06, 0.08, 0.22, 0.25, 0.38, 0.52, 0.55, 0.65, 0.68, 0.85, 1.0],
    [1, 1,    0,    0,    0.7,  1,    0,    0,    0,    0.8,  0.2,  0]
  );

  // Update CSS custom properties on scroll
  useMotionValueEvent(scrollYProgress, 'change', () => {
    const bA = artesanoBlend.get();
    const bI = ingenieroBlend.get();
    const bF = fabricaBlend.get();

    const root = document.documentElement;
    root.style.setProperty('--blend-artesano', String(bA));
    root.style.setProperty('--blend-ingeniero', String(bI));
    root.style.setProperty('--blend-fabrica', String(bF));

    const bg = interpolateRgb(PALETTES.artesano.bg, PALETTES.ingeniero.bg, PALETTES.fabrica.bg, bA, bI, bF);
    const text = interpolateRgb(PALETTES.artesano.text, PALETTES.ingeniero.text, PALETTES.fabrica.text, bA, bI, bF);
    const accent = interpolateRgb(PALETTES.artesano.accent, PALETTES.ingeniero.accent, PALETTES.fabrica.accent, bA, bI, bF);

    root.style.setProperty('--current-bg', bg);
    root.style.setProperty('--current-text', text);
    root.style.setProperty('--current-accent', accent);
  });

  // Set initial values
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--current-bg', '#0D0D0D');
    root.style.setProperty('--current-text', '#F5F0EB');
    root.style.setProperty('--current-accent', '#C4963A');
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Artesano texture: warm grain noise */}
      <motion.div
        className="absolute inset-0 texture-artesano"
        style={{ opacity: artesanoBlend }}
      />

      {/* Ingeniero texture: blueprint dot grid */}
      <motion.div
        className="absolute inset-0 texture-ingeniero"
        style={{ opacity: ingenieroBlend }}
      />

      {/* Fabrica texture: brushed metal */}
      <motion.div
        className="absolute inset-0 texture-fabrica"
        style={{ opacity: fabricaBlend }}
      />
    </div>
  );
}
