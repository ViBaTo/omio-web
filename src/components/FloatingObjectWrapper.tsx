'use client';

import dynamic from 'next/dynamic';

const FloatingObject = dynamic(() => import('./FloatingObject'), {
  ssr: false,
});

export default function FloatingObjectWrapper() {
  return <FloatingObject />;
}
