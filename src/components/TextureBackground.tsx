'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PALETTES } from '@/lib/constants';
import type { World } from '@/lib/constants';

const PAGE_WORLDS: Record<string, World> = {
  '/': 'fabrica',
  '/nosotros': 'artesano',
  '/servicios': 'fabrica',
  '/materiales': 'artesano',
  '/proyectos': 'fabrica',
  '/proceso': 'ingeniero',
  '/contacto': 'artesano',
};

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

export default function TextureBackground() {
  const pathname = usePathname();

  const basePath = '/' + (pathname.split('/')[1] || '');
  const world = PAGE_WORLDS[basePath] || 'artesano';

  useEffect(() => {
    const root = document.documentElement;
    const palette = PALETTES[world];

    root.style.setProperty('--current-bg', rgbToHex(palette.bg[0], palette.bg[1], palette.bg[2]));
    root.style.setProperty('--current-text', rgbToHex(palette.text[0], palette.text[1], palette.text[2]));
    root.style.setProperty('--current-accent', rgbToHex(palette.accent[0], palette.accent[1], palette.accent[2]));

    root.style.setProperty('--blend-artesano', world === 'artesano' ? '1' : '0');
    root.style.setProperty('--blend-ingeniero', world === 'ingeniero' ? '1' : '0');
    root.style.setProperty('--blend-fabrica', world === 'fabrica' ? '1' : '0');
  }, [world]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <motion.div
        className="absolute inset-0 texture-artesano"
        animate={{ opacity: world === 'artesano' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute inset-0 texture-ingeniero"
        animate={{ opacity: world === 'ingeniero' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute inset-0 texture-fabrica"
        animate={{ opacity: world === 'fabrica' ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
}
