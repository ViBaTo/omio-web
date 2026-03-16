'use client';

import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  color?: string;
}

export default function Breadcrumbs({ items, color = '#263f47' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-4">
      <Link
        href="/"
        className="font-ingeniero text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
        style={{ color, opacity: 0.4 }}
      >
        Inicio
      </Link>
      {items.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="font-ingeniero text-[10px]" style={{ color, opacity: 0.2 }}>
            /
          </span>
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="font-ingeniero text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
              style={{ color, opacity: 0.4 }}
            >
              {crumb.label}
            </Link>
          ) : (
            <span
              className="font-ingeniero text-[10px] tracking-[0.2em] uppercase"
              style={{ color, opacity: 0.7 }}
            >
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
