'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { NAV_PAGES } from '@/lib/constants';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import LocaleSwitcher from './LocaleSwitcher';

const DARK_PAGES = ['/servicios', '/proyectos'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

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
        transition={isHome ? { delay: 0.4, duration: 0.8 } : { duration: 0.4 }}
      >
        <div
          className="absolute inset-0 backdrop-blur-md -z-10 border-b"
          style={{
            backgroundColor: isDarkPage ? 'rgba(0, 42, 58, 0.85)' : 'rgba(243, 236, 235, 0.85)',
            borderColor: isDarkPage ? 'rgba(243, 236, 235, 0.08)' : 'rgba(0, 42, 58, 0.08)',
          }}
        />

        <Link href="/" className="relative z-10 grid">
          <Image
            src="/images/loogo-blue.svg"
            alt={tCommon('logoAlt')}
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
                className="font-ingeniero text-[13px] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-100"
                style={{
                  color: isDarkPage ? '#F3ECEB' : '#002A3A',
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                {tNav(link.labelKey)}
              </Link>
            );
          })}
          <LocaleSwitcher textColor={isDarkPage ? '#F3ECEB' : '#002A3A'} />
        </div>

        <button
          className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? tCommon('menuClose') : tCommon('menuOpen')}
        >
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: isDarkPage ? '#F3ECEB' : '#002A3A' }}
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: isDarkPage ? '#F3ECEB' : '#002A3A' }}
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block w-6 h-[1px]"
            style={{ backgroundColor: isDarkPage ? '#F3ECEB' : '#002A3A' }}
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: '#001A26' }}
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
                    style={{ color: '#F3ECEB' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeInUp} className="mt-4">
                <LocaleSwitcher textColor="#F3ECEB" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
