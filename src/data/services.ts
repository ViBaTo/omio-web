import type { World } from '@/lib/constants';
import type { Locale } from '@/i18n/routing';
import { SERVICES_RAW } from './_generated/services.generated';

type LocalizedString = { es: string; en: string };

export interface ServiceI18n {
  slug: string;
  world: World;
  title: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  details: LocalizedString[];
  capabilities: LocalizedString[];
  icon: 'artesano' | 'ingeniero' | 'fabrica';
}

export interface Service {
  slug: string;
  world: World;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  capabilities: string[];
  icon: 'artesano' | 'ingeniero' | 'fabrica';
}


function localizeService(s: ServiceI18n, locale: Locale): Service {
  return {
    slug: s.slug,
    world: s.world,
    title: s.title[locale],
    tagline: s.tagline[locale],
    description: s.description[locale],
    details: s.details.map((d) => d[locale]),
    capabilities: s.capabilities.map((c) => c[locale]),
    icon: s.icon,
  };
}

export function getServices(locale: Locale): Service[] {
  return SERVICES_RAW.map((s) => localizeService(s, locale));
}

export function getServiceBySlug(slug: string, locale: Locale): Service | undefined {
  const found = SERVICES_RAW.find((s) => s.slug === slug);
  return found ? localizeService(found, locale) : undefined;
}
