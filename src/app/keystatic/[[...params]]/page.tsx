'use client';

import { notFound } from 'next/navigation';
import { makePage } from '@keystatic/next/ui/app';
import config from '../../../../keystatic.config';

const KeystaticApp = makePage(config);

// En modo 'local' el panel escribe sin autenticación, así que en producción
// solo se sirve cuando el storage es 'cloud' (Keystatic Cloud pone el login).
// Al activar el modo cloud en keystatic.config.ts este guard se abre solo.
export default function KeystaticPage() {
  if (config.storage.kind === 'local' && process.env.NODE_ENV === 'production') {
    notFound();
  }
  return <KeystaticApp />;
}
