import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import NosotrosContent from './NosotrosContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.nosotros' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'es' ? '/nosotros' : `/${locale}/nosotros`,
      languages: {
        es: '/nosotros',
        en: '/en/nosotros',
      },
    },
  };
}

export default async function NosotrosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NosotrosContent />;
}
