import type { Metadata } from 'next';
import NosotrosContent from './NosotrosContent';

export const metadata: Metadata = {
  title: 'Nosotros — OMIO Atelier & Design',
  description: 'Conoce a OMIO: el aliado estratégico de los estudios de diseño de interiores más prestigiosos del mundo.',
};

export default function NosotrosPage() {
  return <NosotrosContent />;
}
