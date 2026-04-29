import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllMaterialSlugs, getMaterialBySlug } from '@/data/materials';
import { routing, type Locale } from '@/i18n/routing';
import MaterialDetailContent from './MaterialDetailContent';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllMaterialSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: 'Material not found' };
  }
  const material = getMaterialBySlug(slug, locale as Locale);
  const t = await getTranslations({ locale, namespace: 'pages.materiales' });
  if (!material) return { title: t('notFoundTitle') };

  return {
    title: `${material.name} — ${t('heroLabel')} — OMIO Atelier & Design`,
    description: material.description,
    alternates: {
      canonical: locale === 'es' ? `/materiales/${slug}` : `/${locale}/materiales/${slug}`,
      languages: {
        es: `/materiales/${slug}`,
        en: `/en/materiales/${slug}`,
      },
    },
  };
}

export default async function MaterialDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const material = getMaterialBySlug(slug, locale as Locale);
  if (!material) notFound();

  return <MaterialDetailContent material={material} />;
}
