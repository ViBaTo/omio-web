import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProcesoContent from './ProcesoContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.proceso' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'es' ? '/proceso' : `/${locale}/proceso`,
      languages: {
        es: '/proceso',
        en: '/en/proceso',
      },
    },
  };
}

export default async function ProcesoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProcesoContent />;
}
