import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ServiciosContent from './ServiciosContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.servicios' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'es' ? '/servicios' : `/${locale}/servicios`,
      languages: {
        es: '/servicios',
        en: '/en/servicios',
      },
    },
  };
}

export default async function ServiciosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServiciosContent />;
}
