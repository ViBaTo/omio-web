import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAllProjectSlugs, getProjectBySlug } from '@/data/projects';
import { routing, type Locale } from '@/i18n/routing';
import ProjectDetailContent from './ProjectDetailContent';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return { title: 'Project not found' };
  }
  const project = getProjectBySlug(slug, locale as Locale);
  const t = await getTranslations({ locale, namespace: 'pages.proyectos' });
  if (!project) return { title: t('notFoundTitle') };

  return {
    title: `${project.title} — ${t('heroLabel')} — OMIO Atelier & Design`,
    description: project.shortDescription,
    alternates: {
      canonical: locale === 'es' ? `/proyectos/${slug}` : `/${locale}/proyectos/${slug}`,
      languages: {
        es: `/proyectos/${slug}`,
        en: `/en/proyectos/${slug}`,
      },
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const project = getProjectBySlug(slug, locale as Locale);
  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
