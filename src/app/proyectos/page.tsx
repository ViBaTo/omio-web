import type { Metadata } from 'next';
import ProyectosContent from './ProyectosContent';

export const metadata: Metadata = {
  title: 'Proyectos — OMIO Atelier & Design',
  description: 'Cada proyecto es una historia. Descubre nuestra cartera de proyectos en hospitality, residencial, gastronomía y contract.',
};

export default function ProyectosPage() {
  return <ProyectosContent />;
}
