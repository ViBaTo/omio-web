'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import PageHero from '@/components/PageHero';
import MaterialCard from '@/components/MaterialCard';
import CategoryFilter from '@/components/CategoryFilter';
import { getMaterials, MATERIAL_CATEGORIES } from '@/data/materials';
import type { Locale } from '@/i18n/routing';

export default function MaterialesContent() {
  const locale = useLocale() as Locale;
  const tPage = useTranslations('pages.materiales');
  const tCategories = useTranslations('materialCategories');

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const materials = getMaterials(locale);
  const filtered = activeCategory
    ? materials.filter((m) => m.category === activeCategory)
    : materials;

  const usableCategories = MATERIAL_CATEGORIES.filter((cat) =>
    materials.some((m) => m.category === cat)
  );

  return (
    <main id="main-content">
      <PageHero
        number={tPage('heroNumber')}
        label={tPage('heroLabel')}
        title={tPage('heroTitle')}
        subtitle={tPage('heroSubtitle')}
        world="artesano"
      />

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#F3ECEB' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <CategoryFilter
              categories={usableCategories}
              active={activeCategory}
              onSelect={(cat) => setActiveCategory(cat)}
              labelFor={(cat) => tCategories(cat)}
              allLabel={tPage('filterAll')}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((material) => (
                <motion.div
                  key={material.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <MaterialCard material={material} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="font-body text-center py-24" style={{ color: '#002A3A', opacity: 0.5 }}>
              {tPage('emptyState')}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
