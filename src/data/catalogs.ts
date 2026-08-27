import type { Locale } from '@/i18n/routing';
import { CATALOGS_RAW } from './_generated/catalogs.generated';

type LocalizedString = { es: string; en: string };

export interface CatalogI18n {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  cover: string;
  file: string;
  year?: number;
}

export interface Catalog {
  slug: string;
  title: string;
  description: string;
  cover: string;
  file: string;
  year?: number;
}

export interface CatalogEssentialsInput {
  title?: { es?: string | null; en?: string | null } | null;
  cover?: string | null;
  file?: string | null;
}

export function catalogMissingEssentials(entry: CatalogEssentialsInput): string[] {
  const missing: string[] = [];
  if (!entry.title?.es?.trim()) missing.push('título (ES)');
  if (!entry.cover) missing.push('portada');
  if (!entry.file) missing.push('PDF');
  return missing;
}

export function localizeCatalog(c: CatalogI18n, locale: Locale): Catalog {
  return {
    slug: c.slug,
    title: c.title[locale],
    description: c.description[locale] ?? '',
    cover: c.cover,
    file: c.file,
    year: c.year,
  };
}

export function catalogsFromRaw(raw: CatalogI18n[], locale: Locale): Catalog[] {
  return [...raw]
    .map((c) => localizeCatalog(c, locale))
    .sort((a, b) => {
      const yearDiff = (b.year ?? 0) - (a.year ?? 0);
      if (yearDiff !== 0) return yearDiff;
      return a.title.localeCompare(b.title, locale);
    });
}

export function catalogBySlug(
  raw: CatalogI18n[],
  slug: string,
  locale: Locale
): Catalog | undefined {
  const found = raw.find((c) => c.slug === slug);
  return found ? localizeCatalog(found, locale) : undefined;
}

export function catalogSlugs(raw: CatalogI18n[]): string[] {
  return raw.map((c) => c.slug);
}

export function getCatalogs(locale: Locale): Catalog[] {
  return catalogsFromRaw(CATALOGS_RAW, locale);
}

export function getCatalogBySlug(slug: string, locale: Locale): Catalog | undefined {
  return catalogBySlug(CATALOGS_RAW, slug, locale);
}

export function getAllCatalogSlugs(): string[] {
  return catalogSlugs(CATALOGS_RAW);
}
