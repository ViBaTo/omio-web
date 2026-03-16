import type { World } from '@/lib/constants';

export interface Service {
  slug: string;
  world: World;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  capabilities: string[];
  icon: 'artesano' | 'ingeniero' | 'fabrica';
}

export const SERVICES: Service[] = [
  {
    slug: 'artesano',
    world: 'artesano',
    title: 'El Artesano',
    tagline: 'El Alma del Atelier',
    description:
      'El corazón de nuestra empresa late como un Atelier. Entendemos y valoramos la creatividad pura, aportando el cuidado meticuloso y la sensibilidad que solo un artesano puede otorgar a una pieza única.',
    details: [
      'En el sector de alta gama, el valor reside en los detalles intangibles y el enfoque personal.',
      'Cada elemento que sale de nuestras manos conserva la esencia artesanal, asegurando que el resultado final sea tan exclusivo como la visión original del diseñador.',
      'Nuestros artesanos son maestros con décadas de experiencia en técnicas tradicionales: marquetería, tallado, torneado, lacado a muñequilla y tapicería artesanal.',
    ],
    capabilities: [
      'Marquetería y taracea',
      'Tallado y torneado manual',
      'Lacado artesanal a muñequilla',
      'Tapicería de alta costura',
      'Acabados a mano',
      'Restauración de piezas históricas',
    ],
    icon: 'artesano',
  },
  {
    slug: 'ingeniero',
    world: 'ingeniero',
    title: 'El Ingeniero',
    tagline: 'Precisión en la Complejidad',
    description:
      'Nuestra ingeniería es el puente entre la imaginación y la realidad tangible. Dotamos a la creatividad de la precisión técnica necesaria para superar las limitaciones prácticas de cualquier idea, por compleja que sea.',
    details: [
      'Realizamos prototipos y pruebas piloto reales que permiten al cliente supervisar y validar el éxito antes de la producción final.',
      'Anticipamos y resolvemos problemas técnicos antes de que afecten al proyecto, garantizando un sistema robusto y eficiente.',
      'Nuestro equipo de ingeniería utiliza las herramientas más avanzadas de diseño paramétrico, simulación estructural y modelado 3D para resolver los desafíos más complejos.',
    ],
    capabilities: [
      'Diseño paramétrico y modelado 3D',
      'Simulación estructural (FEA)',
      'Prototipado rápido',
      'Ingeniería de producción',
      'Control de tolerancias',
      'Documentación técnica completa',
    ],
    icon: 'ingeniero',
  },
  {
    slug: 'fabrica',
    world: 'fabrica',
    title: 'La Fábrica',
    tagline: 'Potencia y Escala Global',
    description:
      'Somos una fábrica con la capacidad de llevar la producción y la instalación a una escala global. A diferencia de los talleres tradicionales, contamos con la infraestructura necesaria para gestionar proyectos de gran envergadura sin perder el control de calidad.',
    details: [
      'Desplazamos y organizamos equipos de instalación en cualquier parte del mundo.',
      'Ejecutamos la transición del diseño a la fabricación a gran escala con total fiabilidad.',
      'Garantizamos soporte a largo plazo con nuestra promesa: «¡Ahí estaremos!» ante cualquier contingencia futura.',
    ],
    capabilities: [
      'CNC de 5 ejes',
      'Línea de lacado robotizada',
      'Producción en serie con control unitario',
      'Logística internacional puerta a puerta',
      'Instalación con equipo propio',
      'Garantía y soporte post-instalación',
    ],
    icon: 'fabrica',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
