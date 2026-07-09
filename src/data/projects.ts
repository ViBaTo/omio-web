import type { World } from '@/lib/constants';
import type { Locale } from '@/i18n/routing';
import { PROJECTS_RAW } from './_generated/projects.generated';

type LocalizedString = { es: string; en: string };

/** Canonical category key. Display name comes from messages.projectCategories[key]. */
export type ProjectCategory = 'Hospitality' | 'Residencial' | 'Gastronomía' | 'Contract';

export type ProjectActId = 'brief' | 'engineering' | 'execution' | 'result';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectAct {
  id: ProjectActId;
  world: World;
  title: string;
  body: string;
  images: ProjectImage[];
}

interface ProjectImageI18n {
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
}

interface ProjectActI18n {
  id: ProjectActId;
  world: World;
  title: LocalizedString;
  body: LocalizedString;
  images: ProjectImageI18n[];
}

export interface ProjectFullI18n {
  slug: string;
  title: LocalizedString;
  category: ProjectCategory;
  client: string;
  creativeDirector?: string;
  location: LocalizedString;
  year: number;
  world: World;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  heroImage: string;
  acts: ProjectActI18n[];
  materials: string[];
  featured: boolean;
  stats?: { label: LocalizedString; value: string }[];
}

export interface ProjectFull {
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string;
  creativeDirector?: string;
  location: string;
  year: number;
  world: World;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  acts: ProjectAct[];
  materials: string[];
  featured: boolean;
  stats?: { label: string; value: string }[];
}


export const PROJECT_CATEGORIES: ProjectCategory[] = [
  ...new Set(PROJECTS_RAW.map((p) => p.category)),
] as ProjectCategory[];

export const PROJECT_WORLDS: World[] = ['artesano', 'ingeniero', 'fabrica'];

function localizeProject(p: ProjectFullI18n, locale: Locale): ProjectFull {
  return {
    slug: p.slug,
    title: p.title[locale],
    category: p.category,
    client: p.client,
    creativeDirector: p.creativeDirector,
    location: p.location[locale],
    year: p.year,
    world: p.world,
    shortDescription: p.shortDescription[locale],
    longDescription: p.longDescription[locale],
    heroImage: p.heroImage,
    acts: p.acts.map((a) => ({
      id: a.id,
      world: a.world,
      title: a.title[locale],
      body: a.body[locale],
      images: a.images.map((img) => ({
        src: img.src,
        alt: img.alt[locale],
        caption: img.caption?.[locale],
      })),
    })),
    materials: p.materials,
    featured: p.featured,
    stats: p.stats?.map((s) => ({ label: s.label[locale], value: s.value })),
  };
}

export function getProjects(locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.map((p) => localizeProject(p, locale));
}

export function getProjectBySlug(slug: string, locale: Locale): ProjectFull | undefined {
  const found = PROJECTS_RAW.find((p) => p.slug === slug);
  return found ? localizeProject(found, locale) : undefined;
}

export function getFeaturedProjects(locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.filter((p) => p.featured).map((p) => localizeProject(p, locale));
}

export function getProjectsByCategory(category: ProjectCategory, locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.filter((p) => p.category === category).map((p) => localizeProject(p, locale));
}

export function getProjectsByWorld(world: World, locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.filter((p) => p.world === world).map((p) => localizeProject(p, locale));
}

export function getAdjacentProjects(
  slug: string,
  locale: Locale
): { prev: ProjectFull | null; next: ProjectFull | null } {
  const idx = PROJECTS_RAW.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? localizeProject(PROJECTS_RAW[idx - 1], locale) : null,
    next:
      idx < PROJECTS_RAW.length - 1 && idx >= 0
        ? localizeProject(PROJECTS_RAW[idx + 1], locale)
        : null,
  };
}

/** Returns all project slugs (locale-independent) for static generation. */
export function getAllProjectSlugs(): string[] {
  return PROJECTS_RAW.map((p) => p.slug);
}
