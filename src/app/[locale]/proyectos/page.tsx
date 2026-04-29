import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProyectosContent from './ProyectosContent';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.proyectos' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === 'es' ? '/proyectos' : `/${locale}/proyectos`,
      languages: {
        es: '/proyectos',
        en: '/en/proyectos',
      },
    },
  };
}

export default async function ProyectosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProyectosContent />;
}
