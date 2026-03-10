import HeroDoor from '@/components/HeroDoor';
import SectionNosotros from '@/components/SectionNosotros';
import SectionCapacidades from '@/components/SectionCapacidades';
import SectionArtesania from '@/components/SectionArtesania';
import SectionIngenieria from '@/components/SectionIngenieria';
import SectionProyectos from '@/components/SectionProyectos';
import SectionContacta from '@/components/SectionContacta';
import FloatingObjectWrapper from '@/components/FloatingObjectWrapper';

export default function Home() {
  return (
    <>
      <FloatingObjectWrapper />
      <main id="main-content">
        <HeroDoor />
        <SectionNosotros />
        <SectionCapacidades />
        <SectionArtesania />
        <SectionIngenieria />
        <SectionProyectos />
        <SectionContacta />
      </main>
    </>
  );
}
