import type { Metadata } from 'next';
import ServiciosContent from './ServiciosContent';

export const metadata: Metadata = {
  title: 'Servicios — OMIO Atelier & Design',
  description: 'Tres mundos fusionados: artesano, ingeniero y fábrica. Descubre cómo trabajamos para hacer realidad lo imposible.',
};

export default function ServiciosPage() {
  return <ServiciosContent />;
}
