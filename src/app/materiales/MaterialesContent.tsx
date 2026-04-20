'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '@/components/PageHero';
import MaterialCard from '@/components/MaterialCard';
import CategoryFilter from '@/components/CategoryFilter';
import { MATERIALS, MATERIAL_CATEGORIES } from '@/data/materials';
import type { MaterialCategory } from '@/data/materials';

export default function MaterialesContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? MATERIALS.filter((m) => m.category === activeCategory)
    : MATERIALS;

  const usableCategories = MATERIAL_CATEGORIES.filter((cat) =>
    MATERIALS.some((m) => m.category === cat)
  );

  return (
    <main id="main-content">
      <PageHero
        number="03"
        label="MATERIALES"
        title="La Materia Prima de lo Extraordinario"
        subtitle="Seleccionamos cada material con la misma exigencia que aplicamos a cada pieza. De la cantera al taller, de la plantación al telar."
        world="artesano"
      />

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#F3ECEB' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <CategoryFilter
              categories={usableCategories}
              active={activeCategory}
              onSelect={(cat) => setActiveCategory(cat)}
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
              No hay materiales en esta categoría.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
