import type { Metadata } from 'next';
import ProcesoContent from './ProcesoContent';

export const metadata: Metadata = {
  title: 'Proceso — OMIO Atelier & Design',
  description: 'Del concepto a la instalación: conoce nuestro proceso de trabajo paso a paso.',
};

export default function ProcesoPage() {
  return <ProcesoContent />;
}
