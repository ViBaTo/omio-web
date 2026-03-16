import HeroDoor from '@/components/HeroDoor';
import HomeNosotros from '@/components/home/HomeNosotros';
import HomeServicios from '@/components/home/HomeServicios';
import HomeMateriales from '@/components/home/HomeMateriales';
import HomeProyectos from '@/components/home/HomeProyectos';
import HomeContacto from '@/components/home/HomeContacto';
import FloatingObjectWrapper from '@/components/FloatingObjectWrapper';

export default function Home() {
  return (
    <>
      <FloatingObjectWrapper />
      <main id="main-content">
        <HeroDoor />
        <HomeNosotros />
        <HomeServicios />
        <HomeMateriales />
        <HomeProyectos />
        <HomeContacto />
      </main>
    </>
  );
}
