import type { Locale } from '@/i18n/routing';

type LocalizedString = { es: string; en: string };

/** Canonical category key. Display name comes from messages.materialCategories[key]. */
export type MaterialCategory = 'Maderas' | 'Metales' | 'Piedras' | 'Textiles' | 'Acabados';

export interface MaterialI18n {
  slug: string;
  name: LocalizedString;
  category: MaterialCategory;
  description: LocalizedString;
  longDescription: LocalizedString;
  image: string;
  properties: { label: LocalizedString; value: LocalizedString }[];
  applications: LocalizedString[];
  projects: string[]; // project slugs
  featured: boolean;
}

export interface Material {
  slug: string;
  name: string;
  category: MaterialCategory;
  description: string;
  longDescription: string;
  image: string;
  properties: { label: string; value: string }[];
  applications: string[];
  projects: string[];
  featured: boolean;
}

import { MATERIALS_RAW } from './_generated/materials.generated';

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  'Maderas',
  'Metales',
  'Piedras',
  'Textiles',
  'Acabados',
];

function localizeMaterial(m: MaterialI18n, locale: Locale): Material {
  return {
    slug: m.slug,
    name: m.name[locale],
    category: m.category,
    description: m.description[locale],
    longDescription: m.longDescription[locale],
    image: m.image,
    properties: m.properties.map((p) => ({
      label: p.label[locale],
      value: p.value[locale],
    })),
    applications: m.applications.map((a) => a[locale]),
    projects: m.projects,
    featured: m.featured,
  };
}

export function getMaterials(locale: Locale): Material[] {
  return MATERIALS_RAW.map((m) => localizeMaterial(m, locale));
}

export function getMaterialBySlug(slug: string, locale: Locale): Material | undefined {
  const found = MATERIALS_RAW.find((m) => m.slug === slug);
  return found ? localizeMaterial(found, locale) : undefined;
}

export function getFeaturedMaterials(locale: Locale): Material[] {
  return MATERIALS_RAW.filter((m) => m.featured).map((m) => localizeMaterial(m, locale));
}

export function getMaterialsForProject(projectSlug: string, locale: Locale): Material[] {
  return MATERIALS_RAW.filter((m) => m.projects.includes(projectSlug)).map((m) =>
    localizeMaterial(m, locale)
  );
}

/** Returns all material slugs (locale-independent) for static generation. */
export function getAllMaterialSlugs(): string[] {
  return MATERIALS_RAW.map((m) => m.slug);
}
