import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CatalogosContent from './CatalogosContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.catalogos' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'es' ? '/catalogos' : `/${locale}/catalogos`,
      languages: {
        es: '/catalogos',
        en: '/en/catalogos',
      },
    },
  };
}

export default async function CatalogosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CatalogosContent />;
}
