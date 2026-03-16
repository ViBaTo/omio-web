'use client';

import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { fadeInUp } from '@/lib/animations';
import type { World } from '@/lib/constants';

interface PageHeroProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  world: World;
}

const WORLD_COLORS: Record<World, { bg: string; text: string; accent: string }> = {
  artesano: { bg: '#E8F5F2', text: '#263f47', accent: '#077275' },
  ingeniero: { bg: '#D4EAE4', text: '#35606e', accent: '#35606e' },
  fabrica: { bg: '#1c3037', text: '#E8F5F2', accent: '#94D2BD' },
};

export default function PageHero({ number, label, title, subtitle, world }: PageHeroProps) {
  const colors = WORLD_COLORS[world];

  return (
    <section
      className="relative min-h-[60vh] flex items-end pb-16 md:pb-24 pt-32 md:pt-40 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: colors.bg }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            className="font-ingeniero text-sm tracking-[0.3em]"
            style={{ color: colors.accent }}
          >
            {number}
          </span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: colors.accent, opacity: 0.4 }} />
          <span
            className="font-ingeniero text-[11px] tracking-[0.2em] uppercase"
            style={{ color: colors.accent }}
          >
            {label}
          </span>
        </motion.div>

        <AnimatedText
          text={title}
          as="h1"
          className="font-artesano italic text-[clamp(2.5rem,7vw,6rem)] leading-[1.05]"
          splitBy="word"
        />

        {subtitle && (
          <motion.p
            className="font-body text-lg md:text-xl leading-relaxed mt-8 max-w-3xl"
            style={{ color: colors.text, opacity: 0.7 }}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
