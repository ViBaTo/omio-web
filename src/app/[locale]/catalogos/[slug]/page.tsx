import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllCatalogSlugs, getCatalogBySlug } from '@/data/catalogs';
import { routing, type Locale } from '@/i18n/routing';
import CatalogDetailContent from './CatalogDetailContent';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCatalogSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: 'Catalogue not found' };
  }
  const catalog = getCatalogBySlug(slug, locale as Locale);
  const t = await getTranslations({ locale, namespace: 'pages.catalogos' });
  if (!catalog) return { title: t('notFoundTitle') };

  return {
    title: `${catalog.title} — ${t('heroLabel')} — OMIO Atelier & Design`,
    description: catalog.description || t('heroSubtitle'),
    alternates: {
      canonical: locale === 'es' ? `/catalogos/${slug}` : `/${locale}/catalogos/${slug}`,
      languages: {
        es: `/catalogos/${slug}`,
        en: `/en/catalogos/${slug}`,
      },
    },
  };
}

export default async function CatalogDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const catalog = getCatalogBySlug(slug, locale as Locale);
  if (!catalog) notFound();

  return <CatalogDetailContent catalog={catalog} />;
}
