'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SECTIONS } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 300], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 300], [0, 0.1]);

  // Active section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.3, rootMargin: '-20% 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        {/* Background */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md -z-10"
          style={{
            backgroundColor: 'var(--current-bg)',
            opacity: bgOpacity,
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: `rgba(196, 150, 58, ${borderOpacity.get()})`,
          }}
        />

        {/* Logo */}
        <a href="#" className="relative z-10">
          <span className="font-fabrica text-xl tracking-[0.05em]" style={{ color: 'var(--current-text)' }}>
            OMIO
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100"
              style={{
                color: 'var(--current-text)',
                opacity: activeSection === section.id ? 1 : 0.5,
              }}
            >
              {section.label.split(' ')[0]}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: 'var(--current-text)' }}
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: 'var(--current-text)' }}
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: 'var(--current-text)' }}
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: '#0A0908' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="flex flex-col items-center gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {SECTIONS.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  className="font-artesano italic text-3xl tracking-wide"
                  style={{ color: '#F5F0EB' }}
                  variants={fadeInUp}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
