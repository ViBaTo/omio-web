import type { Locale } from '@/i18n/routing';
import { CATALOGS_RAW } from './_generated/catalogs.generated';
import type { Catalog, CatalogI18n } from './catalogs.schema';

// Los tipos y la validación viven en ./catalogs.schema (sin datos) para que el
// codegen pueda usarlos sin depender de _generated, que él mismo produce.
export type { Catalog, CatalogI18n, CatalogEssentialsInput } from './catalogs.schema';
export { catalogMissingEssentials } from './catalogs.schema';

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

export function catalogDownloadName(slug: string): string {
  return `${slug}.pdf`;
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
