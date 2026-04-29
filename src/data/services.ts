import type { World } from '@/lib/constants';
import type { Locale } from '@/i18n/routing';

type LocalizedString = { es: string; en: string };

interface ServiceI18n {
  slug: string;
  world: World;
  title: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  details: LocalizedString[];
  capabilities: LocalizedString[];
  icon: 'artesano' | 'ingeniero' | 'fabrica';
}

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

const SERVICES_RAW: ServiceI18n[] = [
  {
    slug: 'artesano',
    world: 'artesano',
    title: { es: 'El Artesano', en: 'The Craftsman' },
    tagline: { es: 'El Alma del Atelier', en: 'The Soul of the Atelier' },
    description: {
      es: 'El corazón de nuestra empresa late como un Atelier. Entendemos y valoramos la creatividad pura, aportando el cuidado meticuloso y la sensibilidad que solo un artesano puede otorgar a una pieza única.',
      en: 'The heart of our company beats like an Atelier. We understand and value pure creativity, bringing the meticulous care and sensitivity that only a craftsman can give to a unique piece.',
    },
    details: [
      {
        es: 'En el sector de alta gama, el valor reside en los detalles intangibles y el enfoque personal.',
        en: 'In the high-end sector, value lies in the intangible details and the personal approach.',
      },
      {
        es: 'Cada elemento que sale de nuestras manos conserva la esencia artesanal, asegurando que el resultado final sea tan exclusivo como la visión original del diseñador.',
        en: 'Every element that leaves our hands keeps its craft essence, ensuring that the final result is as exclusive as the designer\'s original vision.',
      },
      {
        es: 'Nuestros artesanos son maestros con décadas de experiencia en técnicas tradicionales: marquetería, tallado, torneado, lacado a muñequilla y tapicería artesanal.',
        en: 'Our craftsmen are masters with decades of experience in traditional techniques: marquetry, carving, turning, hand-rubbed lacquering, and artisan upholstery.',
      },
    ],
    capabilities: [
      { es: 'Marquetería y taracea', en: 'Marquetry and inlay' },
      { es: 'Tallado y torneado manual', en: 'Manual carving and turning' },
      { es: 'Lacado artesanal a muñequilla', en: 'Hand-rubbed artisan lacquer' },
      { es: 'Tapicería de alta costura', en: 'Couture upholstery' },
      { es: 'Acabados a mano', en: 'Hand finishes' },
      { es: 'Restauración de piezas históricas', en: 'Restoration of historical pieces' },
    ],
    icon: 'artesano',
  },
  {
    slug: 'ingeniero',
    world: 'ingeniero',
    title: { es: 'El Ingeniero', en: 'The Engineer' },
    tagline: { es: 'Precisión en la Complejidad', en: 'Precision in Complexity' },
    description: {
      es: 'Nuestra ingeniería es el puente entre la imaginación y la realidad tangible. Dotamos a la creatividad de la precisión técnica necesaria para superar las limitaciones prácticas de cualquier idea, por compleja que sea.',
      en: 'Our engineering is the bridge between imagination and tangible reality. We give creativity the technical precision required to overcome the practical limits of any idea, no matter how complex.',
    },
    details: [
      {
        es: 'Realizamos prototipos y pruebas piloto reales que permiten al cliente supervisar y validar el éxito antes de la producción final.',
        en: 'We build real prototypes and pilot tests that allow the client to supervise and validate success before final production.',
      },
      {
        es: 'Anticipamos y resolvemos problemas técnicos antes de que afecten al proyecto, garantizando un sistema robusto y eficiente.',
        en: 'We anticipate and resolve technical issues before they affect the project, guaranteeing a robust and efficient system.',
      },
      {
        es: 'Nuestro equipo de ingeniería utiliza las herramientas más avanzadas de diseño paramétrico, simulación estructural y modelado 3D para resolver los desafíos más complejos.',
        en: 'Our engineering team uses the most advanced parametric design, structural simulation, and 3D modeling tools to solve the most complex challenges.',
      },
    ],
    capabilities: [
      { es: 'Diseño paramétrico y modelado 3D', en: 'Parametric design and 3D modeling' },
      { es: 'Simulación estructural (FEA)', en: 'Structural simulation (FEA)' },
      { es: 'Prototipado rápido', en: 'Rapid prototyping' },
      { es: 'Ingeniería de producción', en: 'Production engineering' },
      { es: 'Control de tolerancias', en: 'Tolerance control' },
      { es: 'Documentación técnica completa', en: 'Comprehensive technical documentation' },
    ],
    icon: 'ingeniero',
  },
  {
    slug: 'fabrica',
    world: 'fabrica',
    title: { es: 'La Fábrica', en: 'The Factory' },
    tagline: { es: 'Potencia y Escala Global', en: 'Global Power and Scale' },
    description: {
      es: 'Somos una fábrica con la capacidad de llevar la producción y la instalación a una escala global. A diferencia de los talleres tradicionales, contamos con la infraestructura necesaria para gestionar proyectos de gran envergadura sin perder el control de calidad.',
      en: 'We are a factory with the capacity to take production and installation to a global scale. Unlike traditional workshops, we have the infrastructure required to handle large-scale projects without losing quality control.',
    },
    details: [
      {
        es: 'Desplazamos y organizamos equipos de instalación en cualquier parte del mundo.',
        en: 'We deploy and organize installation teams anywhere in the world.',
      },
      {
        es: 'Ejecutamos la transición del diseño a la fabricación a gran escala con total fiabilidad.',
        en: 'We execute the transition from design to large-scale manufacturing with full reliability.',
      },
      {
        es: 'Garantizamos soporte a largo plazo con nuestra promesa: «¡Ahí estaremos!» ante cualquier contingencia futura.',
        en: 'We guarantee long-term support with our promise: «We\'ll be there!» for any future contingency.',
      },
    ],
    capabilities: [
      { es: 'CNC de 5 ejes', en: '5-axis CNC' },
      { es: 'Línea de lacado robotizada', en: 'Robotic lacquering line' },
      { es: 'Producción en serie con control unitario', en: 'Series production with per-unit control' },
      { es: 'Logística internacional puerta a puerta', en: 'International door-to-door logistics' },
      { es: 'Instalación con equipo propio', en: 'Installation with our own team' },
      { es: 'Garantía y soporte post-instalación', en: 'Warranty and post-installation support' },
    ],
    icon: 'fabrica',
  },
];

function localizeService(s: ServiceI18n, locale: Locale): Service {
  return {
    slug: s.slug,
    world: s.world,
    title: s.title[locale],
    tagline: s.tagline[locale],
    description: s.description[locale],
    details: s.details.map((d) => d[locale]),
    capabilities: s.capabilities.map((c) => c[locale]),
    icon: s.icon,
  };
}

export function getServices(locale: Locale): Service[] {
  return SERVICES_RAW.map((s) => localizeService(s, locale));
}

export function getServiceBySlug(slug: string, locale: Locale): Service | undefined {
  const found = SERVICES_RAW.find((s) => s.slug === slug);
  return found ? localizeService(found, locale) : undefined;
}
