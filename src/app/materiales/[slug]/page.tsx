import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MATERIALS, getMaterialBySlug } from '@/data/materials';
import MaterialDetailContent from './MaterialDetailContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MATERIALS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) return { title: 'Material no encontrado' };

  return {
    title: `${material.name} — Materiales — OMIO Atelier & Design`,
    description: material.description,
  };
}

export default async function MaterialDetailPage({ params }: Props) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) notFound();

  return <MaterialDetailContent material={material} />;
}
