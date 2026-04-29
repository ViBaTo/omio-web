import { setRequestLocale } from 'next-intl/server';
import HeroDoor from '@/components/HeroDoor';
import HomeNosotros from '@/components/home/HomeNosotros';
import HomeServicios from '@/components/home/HomeServicios';
import HomeAtelier from '@/components/home/HomeAtelier';
import HomeMateriales from '@/components/home/HomeMateriales';
import HomeProyectos from '@/components/home/HomeProyectos';
import HomeContacto from '@/components/home/HomeContacto';
import FloatingObjectWrapper from '@/components/FloatingObjectWrapper';
import SoundToggle from '@/components/SoundToggle';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <FloatingObjectWrapper />
      <main id="main-content">
        <HeroDoor />
        <HomeNosotros />
        <HomeServicios />
        <HomeAtelier />
        <HomeMateriales />
        <HomeProyectos />
        <HomeContacto />
      </main>
      <SoundToggle />
    </>
  );
}
