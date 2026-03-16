'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_PAGES } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const DARK_PAGES = ['/servicios', '/proyectos'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 300], [0, 0.85]);

  const isHome = pathname === '/';
  const isDarkPage = DARK_PAGES.includes(pathname) || pathname.startsWith('/proyectos/');
  const useDarkLogo = !isDarkPage;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
        initial={isHome ? { y: -100 } : { y: 0 }}
        animate={{ y: 0 }}
        transition={isHome ? { delay: 2.5, duration: 0.8 } : { duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-md -z-10"
          style={{
            backgroundColor: isDarkPage ? '#1c3037' : '#E8F5F2',
            opacity: bgOpacity,
          }}
        />

        <Link href="/" className="relative z-10 grid">
          <Image
            src="/images/loogo-blue.svg"
            alt="OMIO - Atelier & Design"
            width={161}
            height={70}
            className="h-10 md:h-12 w-auto col-start-1 row-start-1 transition-opacity duration-500"
            style={{ opacity: useDarkLogo ? 1 : 0 }}
            priority
            unoptimized
          />
          <Image
            src="/images/logo-white.svg"
            alt=""
            width={161}
            height={70}
            className="h-10 md:h-12 w-auto col-start-1 row-start-1 transition-opacity duration-500"
            style={{ opacity: useDarkLogo ? 0 : 1 }}
            priority
            unoptimized
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_PAGES.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100"
                style={{
                  color: isDarkPage ? '#E8F5F2' : '#263f47',
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: isDarkPage ? '#E8F5F2' : '#263f47' }}
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: isDarkPage ? '#E8F5F2' : '#263f47' }}
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: isDarkPage ? '#E8F5F2' : '#263f47' }}
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: '#101e23' }}
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
              {NAV_PAGES.map((link) => (
                <motion.div key={link.href} variants={fadeInUp}>
                  <Link
                    href={link.href}
                    className="font-artesano italic text-3xl tracking-wide block"
                    style={{ color: '#E8F5F2' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
