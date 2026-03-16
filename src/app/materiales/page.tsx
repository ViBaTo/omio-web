import type { Metadata } from 'next';
import MaterialesContent from './MaterialesContent';

export const metadata: Metadata = {
  title: 'Materiales — OMIO Atelier & Design',
  description: 'Descubre nuestra selección de materiales: maderas nobles, metales trabajados, piedras naturales y textiles de la más alta calidad.',
};

export default function MaterialesPage() {
  return <MaterialesContent />;
}
