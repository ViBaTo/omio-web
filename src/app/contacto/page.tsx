import type { Metadata } from 'next';
import ContactoContent from './ContactoContent';

export const metadata: Metadata = {
  title: 'Contacto — OMIO Atelier & Design',
  description: 'Construyamos vínculos. Contacta con OMIO para hablar de tu próximo proyecto.',
};

export default function ContactoPage() {
  return <ContactoContent />;
}
