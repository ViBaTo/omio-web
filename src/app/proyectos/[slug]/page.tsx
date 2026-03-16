import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS, getProjectBySlug } from '@/data/projects';
import ProjectDetailContent from './ProjectDetailContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Proyecto no encontrado' };

  return {
    title: `${project.title} — Proyectos — OMIO Atelier & Design`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjectDetailContent project={project} />;
}
