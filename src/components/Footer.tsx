'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_PAGES, FOOTER } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function Footer() {
  return (
    <footer
      className="relative py-24 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: '#101e23' }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link href="/">
            <Image
              src="/images/logo-white.svg"
              alt="OMIO - Atelier & Design"
              width={161}
              height={70}
              className="h-20 md:h-24 w-auto mx-auto"
              unoptimized
            />
          </Link>
        </motion.div>

        <div
          className="w-24 h-[1px] mx-auto my-10"
          style={{ backgroundColor: '#077275', opacity: 0.3 }}
        />

        <motion.nav
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {NAV_PAGES.map((link) => (
            <motion.div key={link.href} variants={fadeInUp}>
              <Link
                href={link.href}
                className="font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
                style={{ color: '#E8F5F2', opacity: 0.4 }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <p
          className="font-ingeniero text-[10px] tracking-[0.15em] mt-16"
          style={{ color: '#E8F5F2', opacity: 0.2 }}
        >
          {FOOTER.copyright}
        </p>

        <p
          className="font-body text-[10px] italic mt-4"
          style={{ color: '#077275', opacity: 0.15 }}
        >
          {FOOTER.easter_egg}
        </p>
      </div>
    </footer>
  );
}
