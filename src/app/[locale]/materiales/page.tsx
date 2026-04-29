import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import MaterialesContent from './MaterialesContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.materiales' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'es' ? '/materiales' : `/${locale}/materiales`,
      languages: {
        es: '/materiales',
        en: '/en/materiales',
      },
    },
  };
}

export default async function MaterialesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MaterialesContent />;
}
