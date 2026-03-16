'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CategoryFilter from '@/components/CategoryFilter';
import { PROJECTS, PROJECT_CATEGORIES } from '@/data/projects';
import { fadeInUp } from '@/lib/animations';

export default function ProyectosContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? PROJECTS.filter((p) => p.category === activeCategory)
    : PROJECTS;

  return (
    <main id="main-content">
      <PageHero
        number="04"
        label="PROYECTOS"
        title="Cada Proyecto, una Historia"
        subtitle="Nuestra cartera refleja el éxito de fusionar tres mundos: el artesano, el ingeniero y la fábrica. Nos especializamos en contract global de alta gama."
        world="fabrica"
      />

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#1c3037' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <CategoryFilter
              categories={PROJECT_CATEGORIES}
              active={activeCategory}
              onSelect={(cat) => setActiveCategory(cat)}
              accentColor="#94D2BD"
              textColor="#E8F5F2"
            />
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectListCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function ProjectListCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/proyectos/${project.slug}`}>
        <article
          className="group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor="precision"
        >
          <div
            className="relative overflow-hidden aspect-[16/10]"
            style={{ clipPath: 'polygon(2% 0%, 100% 1.5%, 98% 100%, 0% 98%)' }}
          >
            <motion.div
              className="w-full h-full"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              style={{
                background: `linear-gradient(${135 + index * 30}deg, #263f47 0%, #94D2BD 40%, #1c3037 100%)`,
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
              <p
                className="font-ingeniero text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ color: '#94D2BD' }}
              >
                {project.category} · {project.location} · {project.year}
              </p>
              <h3
                className="font-fabrica uppercase text-2xl md:text-3xl tracking-[0.03em]"
                style={{ color: '#E8F5F2' }}
              >
                {project.title}
              </h3>
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="font-ingeniero text-sm tracking-[0.3em] uppercase"
                style={{ color: '#E8F5F2' }}
              >
                Descubrir historia →
              </span>
            </motion.div>
          </div>

          <p
            className="font-body text-sm mt-4 line-clamp-2"
            style={{ color: '#E8F5F2', opacity: 0.6 }}
          >
            {project.shortDescription}
          </p>
        </article>
      </Link>
    </motion.div>
  );
}
