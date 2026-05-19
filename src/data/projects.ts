import type { World } from '@/lib/constants';
import type { Locale } from '@/i18n/routing';

type LocalizedString = { es: string; en: string };

/** Canonical category key. Display name comes from messages.projectCategories[key]. */
export type ProjectCategory = 'Hospitality' | 'Residencial' | 'Gastronomía' | 'Contract';

export type ProjectActId = 'brief' | 'engineering' | 'execution' | 'result';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectAct {
  id: ProjectActId;
  world: World;
  title: string;
  body: string;
  images: ProjectImage[];
}

interface ProjectImageI18n {
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
}

interface ProjectActI18n {
  id: ProjectActId;
  world: World;
  title: LocalizedString;
  body: LocalizedString;
  images: ProjectImageI18n[];
}

interface ProjectFullI18n {
  slug: string;
  title: LocalizedString;
  category: ProjectCategory;
  client: string;
  creativeDirector?: string;
  location: LocalizedString;
  year: number;
  world: World;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  heroImage: string;
  acts: ProjectActI18n[];
  materials: string[];
  featured: boolean;
  stats?: { label: LocalizedString; value: string }[];
}

export interface ProjectFull {
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string;
  creativeDirector?: string;
  location: string;
  year: number;
  world: World;
  shortDescription: string;
  longDescription: string;
  heroImage: string;
  acts: ProjectAct[];
  materials: string[];
  featured: boolean;
  stats?: { label: string; value: string }[];
}

const PROJECTS_RAW: ProjectFullI18n[] = [
  {
    slug: 'amazonico-monte-carlo',
    title: { es: 'Amazónico Monte-Carlo', en: 'Amazónico Monte-Carlo' },
    category: 'Hospitality',
    client: 'Amazónico',
    creativeDirector: 'Lázaro Rosa-Violán',
    location: { es: 'Monte-Carlo, Mónaco', en: 'Monte-Carlo, Monaco' },
    year: 2024,
    world: 'artesano',
    shortDescription: {
      es: 'Pérgolas escultóricas, aves suspendidas y piezas arquitectónicas artesanales que materializan la jungla de Lázaro Rosa-Violán en la Riviera.',
      en: 'Sculptural pergolas, suspended birds and handcrafted architectural pieces that bring Lázaro Rosa-Violán’s jungle to the Riviera.',
    },
    longDescription: {
      es: 'La intervención en Amazónico Monte-Carlo se concibió como un ejercicio bespoke de arquitectura y decoración dentro de un entorno de hospitality de alta gama. El proyecto reforzó la identidad inmersiva del restaurante a través de elementos artesanales de gran escala inspirados en los paisajes tropicales y la biodiversidad exótica. El objetivo: una atmósfera sensorial donde diseño, artesanía y storytelling coexisten sin costuras.',
      en: 'The intervention for Amazónico Monte-Carlo was conceived as a bespoke architectural and decorative exercise within a high-end hospitality environment. The project enhanced the restaurant’s immersive identity through large-scale handcrafted elements inspired by tropical landscapes and exotic biodiversity. The objective: a sensory atmosphere where design, craftsmanship and storytelling coexist seamlessly.',
    },
    heroImage: '/images/projects/amazonico-monte-carlo/hero.jpg',
    acts: [
      {
        id: 'brief',
        world: 'artesano',
        title: { es: 'El encargo', en: 'The brief' },
        body: {
          es: 'A partir de la dirección creativa de Lázaro Rosa-Violán, el brief pedía elementos arquitectónicos escultóricos y altamente expresivos que reforzaran el lenguaje visual icónico del restaurante. Texturas naturales, geometrías orgánicas y acabados artesanales se combinaron para generar un entorno selvático inmersivo. Nuestro papel: traducir el concepto en soluciones técnicas viables sin perder la integridad artística de cada pieza.',
          en: 'From Lázaro Rosa-Violán’s creative direction, the brief required sculptural and highly expressive architectural features that would reinforce the restaurant’s iconic visual language. Natural textures, organic geometries and artisan finishes were combined to generate an immersive jungle-inspired environment. Our role: to transform the conceptual designs into technically feasible solutions while preserving the artistic integrity of every element.',
        },
        images: [
          {
            src: '/images/projects/amazonico-monte-carlo/brief-01.jpg',
            alt: { es: 'Moodboard del concepto Amazónico', en: 'Amazónico concept moodboard' },
          },
          {
            src: '/images/projects/amazonico-monte-carlo/brief-02.jpg',
            alt: { es: 'Render conceptual del estudio creativo', en: 'Creative studio conceptual render' },
          },
        ],
      },
      {
        id: 'engineering',
        world: 'ingeniero',
        title: { es: 'Ingeniería y desarrollo técnico', en: 'Engineering & technical development' },
        body: {
          es: 'Esta fase fue clave para resolver la complejidad de las pérgolas a medida, las aves suspendidas y las piezas arquitectónicas decorativas integradas en el espacio. Tradujimos las propuestas conceptuales a modelos 3D detallados y planos de fabricación. Realizamos estudios técnicos exhaustivos para garantizar la viabilidad estructural de las pérgolas y la integración segura de los elementos suspendidos, con especial atención al comportamiento del material, la distribución de cargas y los sistemas de instalación.',
          en: 'This phase was essential for resolving the complexity of the custom pergolas, suspended bird sculptures and decorative architectural pieces integrated throughout the space. We translated the conceptual proposals into detailed 3D models and fabrication drawings. Extensive technical studies were carried out to ensure the structural viability of the pergolas and the secure integration of the suspended decorative elements, with special attention to material behaviour, load distribution and installation systems.',
        },
        images: [
          {
            src: '/images/projects/amazonico-monte-carlo/tech-01.png',
            alt: { es: 'Modelo 3D de la pérgola escultórica', en: 'Sculptural pergola 3D model' },
          },
          {
            src: '/images/projects/amazonico-monte-carlo/tech-02.png',
            alt: { es: 'Despiece técnico de las aves suspendidas', en: 'Suspended birds technical exploded view' },
          },
          {
            src: '/images/projects/amazonico-monte-carlo/tech-03.png',
            alt: { es: 'Planos de fabricación', en: 'Fabrication drawings' },
          },
        ],
      },
      {
        id: 'execution',
        world: 'fabrica',
        title: { es: 'Fabricación e instalación', en: 'Manufacturing & installation' },
        body: {
          es: 'Fabricación precisa en nuestro taller y montaje meticuloso en sala. Coordinamos pérgolas escultóricas, aves talladas y detalles arquitectónicos para integrarlos en el funcionamiento del restaurante sin interrumpir la operativa del hotel.',
          en: 'Precise manufacturing in our workshop and meticulous on-site assembly. We coordinated sculptural pergolas, carved birds and architectural details to integrate them into the restaurant without disrupting hotel operations.',
        },
        images: [
          {
            src: '/images/projects/amazonico-monte-carlo/execution-01.jpg',
            alt: { es: 'Fabricación en taller', en: 'Workshop manufacturing' },
          },
          {
            src: '/images/projects/amazonico-monte-carlo/execution-02.jpg',
            alt: { es: 'Montaje on-site', en: 'On-site assembly' },
          },
          {
            src: '/images/projects/amazonico-monte-carlo/execution-03.jpg',
            alt: { es: 'Instalación de pérgola', en: 'Pergola installation' },
          },
          {
            src: '/images/projects/amazonico-monte-carlo/execution-04.jpg',
            alt: { es: 'Acabados artesanales in situ', en: 'On-site artisan finishing' },
          },
        ],
      },
      {
        id: 'result',
        world: 'artesano',
        title: { es: 'El resultado', en: 'The final result' },
        body: {
          es: 'Un entorno de hospitality donde artesanía e ingeniería se funden con naturalidad. Las pérgolas a medida, los pájaros escultóricos y los detalles arquitectónicos elevan la identidad espacial de Monte-Carlo manteniéndose fieles al universo Amazónico.',
          en: 'A hospitality environment where craftsmanship and engineering merge naturally. The bespoke pergolas, sculptural birds and architectural details elevate the spatial identity of Monte-Carlo while staying faithful to the Amazónico universe.',
        },
        images: [
          { src: '/images/projects/amazonico-monte-carlo/result-01.png', alt: { es: 'Vista general del comedor', en: 'Dining room overview' } },
          { src: '/images/projects/amazonico-monte-carlo/result-02.jpg', alt: { es: 'Detalle de aves suspendidas', en: 'Suspended birds detail' } },
          { src: '/images/projects/amazonico-monte-carlo/result-03.jpg', alt: { es: 'Pérgola escultórica finalizada', en: 'Completed sculptural pergola' } },
          { src: '/images/projects/amazonico-monte-carlo/result-04.jpg', alt: { es: 'Atmósfera del restaurante', en: 'Restaurant atmosphere' } },
        ],
      },
    ],
    materials: [],
    featured: true,
    stats: [
      { label: { es: 'Piezas escultóricas', en: 'Sculptural pieces' }, value: '40+' },
      { label: { es: 'Dirección creativa', en: 'Creative direction' }, value: 'L. Rosa-Violán' },
      { label: { es: 'Ubicación', en: 'Location' }, value: 'Monte-Carlo' },
    ],
  },
  {
    slug: 'grand-hotel-centenari',
    title: { es: 'Grand Hotel Centenari', en: 'Grand Hotel Centenari' },
    category: 'Hospitality',
    client: 'Marriott Autograph Collection',
    creativeDirector: 'ERRE Arquitectura',
    location: { es: 'Valencia, España', en: 'Valencia, Spain' },
    year: 2024,
    world: 'fabrica',
    shortDescription: {
      es: 'Lobby, restaurante y áreas de hospitality del Marriott Autograph Collection en Valencia: una traducción al Art Decó valenciano a escala industrial.',
      en: 'Lobby, restaurant and hospitality areas of Marriott Autograph Collection in Valencia: a Valencian Art Deco translation at industrial scale.',
    },
    longDescription: {
      es: 'La intervención en el Grand Hotel Centenari — Marriott Autograph Collection en Valencia representa un ejercicio integral de arquitectura interior bespoke. El proyecto se centró en la transformación del lobby, el restaurante y las áreas de hospitality mediante elementos arquitectónicos a medida inspirados en el patrimonio Art Decó de Valencia y la elegancia de los años 20. El objetivo: una experiencia sensorial donde artesanía, materialidad e identidad arquitectónica coexisten sin fisuras.',
      en: 'The intervention for Grand Hotel Centenari — Marriott Autograph Collection in Valencia represents a comprehensive exercise in bespoke interior architecture. The project focused on the transformation of the lobby, restaurant and hospitality areas through custom-designed architectural elements inspired by Valencia’s Art Deco heritage and the elegance of the 1920s. The objective: a sensory experience where craftsmanship, materiality and architectural identity coexist seamlessly.',
    },
    heroImage: '/images/projects/grand-hotel-centenari/hero.jpg',
    acts: [
      {
        id: 'brief',
        world: 'artesano',
        title: { es: 'El encargo', en: 'The brief' },
        body: {
          es: 'A partir de la dirección creativa de ERRE Arquitectura, el brief pedía un entorno de hospitality sofisticado definido por geometrías curvas, materiales nobles y elementos decorativos a medida. El lenguaje combinaba acabados cálidos en madera, detalles en latón, iluminación escultórica y composiciones geométricas para reforzar la elegancia atemporal de la identidad Autograph Collection. Nuestro papel: traducir la visión conceptual en soluciones técnicas viables preservando la precisión estética de cada componente.',
          en: 'From ERRE Arquitectura’s creative direction, the brief required a sophisticated hospitality environment defined by curved geometries, noble materials and custom-made decorative elements. The design language combined warm wood finishes, brass details, sculptural lighting and geometric compositions to reinforce the timeless elegance of the Autograph Collection identity. Our role: to translate the conceptual vision into technically feasible solutions while preserving the aesthetic precision of every bespoke component.',
        },
        images: [
          { src: '/images/projects/grand-hotel-centenari/brief-01.png', alt: { es: 'Concepto Art Decó del estudio', en: 'Studio Art Deco concept' } },
          { src: '/images/projects/grand-hotel-centenari/brief-02.png', alt: { es: 'Render del lobby propuesto', en: 'Proposed lobby render' } },
        ],
      },
      {
        id: 'engineering',
        world: 'ingeniero',
        title: { es: 'Ingeniería y desarrollo técnico', en: 'Engineering & technical development' },
        body: {
          es: 'Fase fundamental para resolver la complejidad de los elementos arquitectónicos bespoke: barra a medida, columnas monumentales, estructuras de iluminación suspendidas, expositores de botellas, celosías decorativas y sistemas de paneles integrados. Transformamos las propuestas conceptuales en planos de fabricación detallados, soluciones constructivas y modelos 3D precisos. Estudios técnicos rigurosos y prototipado garantizaron viabilidad estructural, coherencia material y precisión de fabricación, con especial atención a la integración entre iluminación, metalistería, ebanistería y acabados arquitectónicos.',
          en: 'A fundamental phase for resolving the complexity of the bespoke architectural elements developed throughout the project: custom bar counter, monumental columns, suspended lighting structures, bottle displays, decorative screens and integrated paneling systems. We transformed the conceptual proposals into detailed fabrication drawings, constructive solutions and precise 3D models. Rigorous technical studies and prototyping ensured structural viability, material coherence and manufacturing precision — with special attention to the integration between lighting, metalwork, woodwork and architectural finishes.',
        },
        images: [
          { src: '/images/projects/grand-hotel-centenari/tech-01.png', alt: { es: 'Modelo 3D de columna monumental', en: 'Monumental column 3D model' } },
          { src: '/images/projects/grand-hotel-centenari/tech-02.png', alt: { es: 'Planos del bar counter a medida', en: 'Bespoke bar counter drawings' } },
          { src: '/images/projects/grand-hotel-centenari/tech-03.png', alt: { es: 'Estructura de iluminación suspendida', en: 'Suspended lighting structure' } },
        ],
      },
      {
        id: 'execution',
        world: 'fabrica',
        title: { es: 'Fabricación e instalación', en: 'Manufacturing & installation' },
        body: {
          es: 'Producción meticulosa en taller y montaje on-site coordinado con seis gremios. Cada componente bespoke se integró en la arquitectura del edificio histórico garantizando precisión, funcionalidad y continuidad estética.',
          en: 'Meticulous workshop production and on-site assembly coordinated with six trades. Every bespoke component was integrated into the historic building’s architecture ensuring precision, functionality and aesthetic continuity.',
        },
        images: [
          { src: '/images/projects/grand-hotel-centenari/execution-01.jpg', alt: { es: 'Producción de columnas en taller', en: 'Columns manufacturing in workshop' } },
          { src: '/images/projects/grand-hotel-centenari/execution-02.jpg', alt: { es: 'Montaje del bar counter', en: 'Bar counter assembly' } },
          { src: '/images/projects/grand-hotel-centenari/execution-03.jpg', alt: { es: 'Instalación de iluminación', en: 'Lighting installation' } },
          { src: '/images/projects/grand-hotel-centenari/execution-04.jpg', alt: { es: 'Ajuste fino on-site', en: 'On-site fine adjustments' } },
        ],
      },
      {
        id: 'result',
        world: 'artesano',
        title: { es: 'El resultado', en: 'The final result' },
        body: {
          es: 'Una experiencia espacial de hospitality donde ingeniería y artesanía se funden. La ejecución entrega una atmósfera de nivel internacional fiel a la visión original mientras eleva la identidad del Grand Hotel Centenari — Marriott Autograph Collection.',
          en: 'A hospitality spatial experience where engineering and craftsmanship merge. The execution delivers a world-class atmosphere faithful to the original design vision while elevating the identity of Grand Hotel Centenari — Marriott Autograph Collection.',
        },
        images: [
          { src: '/images/projects/grand-hotel-centenari/result-02.jpg', alt: { es: 'Lobby finalizado', en: 'Completed lobby' } },
          { src: '/images/projects/grand-hotel-centenari/result-03.jpg', alt: { es: 'Detalle del bar counter', en: 'Bar counter detail' } },
          { src: '/images/projects/grand-hotel-centenari/result-04.jpg', alt: { es: 'Restaurante en operación', en: 'Restaurant in operation' } },
          { src: '/images/projects/grand-hotel-centenari/result-05.jpg', alt: { es: 'Columnas Art Decó iluminadas', en: 'Illuminated Art Deco columns' } },
          { src: '/images/projects/grand-hotel-centenari/result-06.jpg', alt: { es: 'Área social', en: 'Social area' } },
          { src: '/images/projects/grand-hotel-centenari/result-07.jpg', alt: { es: 'Vista nocturna', en: 'Night view' } },
        ],
      },
    ],
    materials: [],
    featured: true,
    stats: [
      { label: { es: 'Áreas intervenidas', en: 'Areas intervened' }, value: '3' },
      { label: { es: 'Estudio creativo', en: 'Creative studio' }, value: 'ERRE Arq.' },
      { label: { es: 'Colección', en: 'Collection' }, value: 'Autograph' },
    ],
  },
  {
    slug: 'mercer-hotel-madrid',
    title: { es: 'Mercer Hotel Madrid', en: 'Mercer Hotel Madrid' },
    category: 'Hospitality',
    client: 'Mercer Hotel',
    creativeDirector: 'Andreu Carulla',
    location: { es: 'Madrid, España', en: 'Madrid, Spain' },
    year: 2024,
    world: 'ingeniero',
    shortDescription: {
      es: 'Una escultura lumínica monumental y un mostrador de recepción en piedra geométrica para el Mercer de Madrid: arquitectura interior bespoke firmada por Andreu Carulla.',
      en: 'A monumental lighting sculpture and a geometric stone reception desk for Mercer Madrid: bespoke interior architecture signed by Andreu Carulla.',
    },
    longDescription: {
      es: 'La intervención en el Mercer Hotel de Madrid representa un ejercicio integral de arquitectura interior bespoke. El proyecto se centró en las áreas sociales públicas, donde estructuras contemporáneas se integraron dentro de un contexto arquitectónico histórico. El objetivo: crear una experiencia sensorial sofisticada a través de la fusión sin costuras entre patrimonio y artesanía de alta gama.',
      en: 'The intervention for the Mercer Hotel in Madrid represents a comprehensive exercise in bespoke interior architecture. The project focused on the public social areas, where contemporary structures were integrated within a historical architectural context. The objective: to create a sophisticated sensory experience through the seamless fusion of heritage and high-end craftsmanship.',
    },
    heroImage: '/images/projects/mercer-hotel-madrid/hero.png',
    acts: [
      {
        id: 'brief',
        world: 'artesano',
        title: { es: 'El encargo', en: 'The brief' },
        body: {
          es: 'A partir de la visión conceptual de Andreu Carulla, el brief requería materializar una atmósfera minimalista pero impactante. El diseño pedía materiales nobles aplicados en formas geométricas de gran escala. Nuestro papel fue transformar los moodboards y renders iniciales en una vía técnica que asegurase funcionalidad e integridad estructural.',
          en: 'Based on Andreu Carulla’s conceptual vision, the brief required the materialization of a minimalist yet impactful atmosphere. The design called for noble materials applied in large-scale geometric forms. Our role was to transform these initial moodboards and renders into a technical path that ensured functionality and structural integrity.',
        },
        images: [
          { src: '/images/projects/mercer-hotel-madrid/brief-01.png', alt: { es: 'Concepto minimalista del proyecto', en: 'Minimalist project concept' } },
          { src: '/images/projects/mercer-hotel-madrid/brief-02.jpg', alt: { es: 'Render de la escultura lumínica', en: 'Lighting sculpture render' } },
        ],
      },
      {
        id: 'engineering',
        world: 'ingeniero',
        title: { es: 'Ingeniería y desarrollo técnico', en: 'Engineering & technical development' },
        body: {
          es: 'Fase crítica para resolver la complejidad de la escultura lumínica monumental y el mostrador geométrico de piedra. Tradujimos los bocetos conceptuales a modelos 3D precisos y planos de fabricación. Realizamos estudios de viabilidad rigurosos para alinear los volúmenes masivos de piedra del mostrador, mientras la estructura interna de la instalación lumínica central se diseñó para garantizar seguridad y ligereza estética a partes iguales.',
          en: 'This phase was critical for resolving the complexity of the monumental lighting sculpture and the geometric stone front desk. We translated the conceptual sketches into precise 3D models and fabrication drawings. Rigorous viability studies were performed to align the massive stone volumes of the reception desk, while the internal framework of the central light installation was engineered to guarantee both safety and aesthetic lightness.',
        },
        images: [
          { src: '/images/projects/mercer-hotel-madrid/tech-01.png', alt: { es: 'Modelo 3D del mostrador en piedra', en: 'Stone reception desk 3D model' } },
          { src: '/images/projects/mercer-hotel-madrid/tech-02.png', alt: { es: 'Estructura interna de la escultura lumínica', en: 'Lighting sculpture internal framework' } },
          { src: '/images/projects/mercer-hotel-madrid/tech-03.png', alt: { es: 'Despiece geométrico de piedra', en: 'Geometric stone exploded view' } },
        ],
      },
      {
        id: 'execution',
        world: 'fabrica',
        title: { es: 'Fabricación e instalación', en: 'Manufacturing & installation' },
        body: {
          es: 'Fabricación meticulosa de los volúmenes pétreos y montaje on-site de la instalación lumínica central. Cada pieza se integró respetando el patrimonio del edificio mientras entrega una realidad tangible fiel a la visión de diseño original.',
          en: 'Meticulous manufacturing of the stone volumes and on-site assembly of the central lighting installation. Every piece was integrated while honouring the building’s heritage, delivering a tangible reality faithful to the original design vision.',
        },
        images: [
          { src: '/images/projects/mercer-hotel-madrid/execution-01.jpg', alt: { es: 'Producción de los bloques de piedra', en: 'Stone blocks production' } },
          { src: '/images/projects/mercer-hotel-madrid/execution-02.jpg', alt: { es: 'Montaje del mostrador', en: 'Desk assembly' } },
          { src: '/images/projects/mercer-hotel-madrid/execution-03.jpg', alt: { es: 'Instalación de la escultura lumínica', en: 'Lighting sculpture installation' } },
          { src: '/images/projects/mercer-hotel-madrid/execution-04.jpg', alt: { es: 'Ajustes on-site', en: 'On-site adjustments' } },
        ],
      },
      {
        id: 'result',
        world: 'artesano',
        title: { es: 'El resultado', en: 'The final result' },
        body: {
          es: 'Un espacio de hospitality donde ingeniería y estética convergen. La barra a medida y la iluminación arquitectónica se integran con éxito, honrando el patrimonio del edificio mientras entregan una realidad tangible fiel a la visión de diseño original.',
          en: 'A hospitality space where engineering and aesthetics converge. The bespoke bar counter and the architectural lighting were successfully integrated. The execution honours the building’s heritage while delivering a tangible reality faithful to the original design vision.',
        },
        images: [
          { src: '/images/projects/mercer-hotel-madrid/result-02.jpg', alt: { es: 'Mostrador de recepción finalizado', en: 'Completed reception desk' } },
          { src: '/images/projects/mercer-hotel-madrid/result-03.jpg', alt: { es: 'Vista de la escultura lumínica', en: 'Lighting sculpture view' } },
          { src: '/images/projects/mercer-hotel-madrid/result-04.jpg', alt: { es: 'Detalle de la geometría en piedra', en: 'Stone geometry detail' } },
          { src: '/images/projects/mercer-hotel-madrid/result-05.jpg', alt: { es: 'Área social', en: 'Social area' } },
        ],
      },
    ],
    materials: [],
    featured: true,
    stats: [
      { label: { es: 'Piezas singulares', en: 'Signature pieces' }, value: '2' },
      { label: { es: 'Diseño', en: 'Design' }, value: 'A. Carulla' },
      { label: { es: 'Tipología', en: 'Typology' }, value: 'Hospitality' },
    ],
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  ...new Set(PROJECTS_RAW.map((p) => p.category)),
] as ProjectCategory[];

export const PROJECT_WORLDS: World[] = ['artesano', 'ingeniero', 'fabrica'];

function localizeProject(p: ProjectFullI18n, locale: Locale): ProjectFull {
  return {
    slug: p.slug,
    title: p.title[locale],
    category: p.category,
    client: p.client,
    creativeDirector: p.creativeDirector,
    location: p.location[locale],
    year: p.year,
    world: p.world,
    shortDescription: p.shortDescription[locale],
    longDescription: p.longDescription[locale],
    heroImage: p.heroImage,
    acts: p.acts.map((a) => ({
      id: a.id,
      world: a.world,
      title: a.title[locale],
      body: a.body[locale],
      images: a.images.map((img) => ({
        src: img.src,
        alt: img.alt[locale],
        caption: img.caption?.[locale],
      })),
    })),
    materials: p.materials,
    featured: p.featured,
    stats: p.stats?.map((s) => ({ label: s.label[locale], value: s.value })),
  };
}

export function getProjects(locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.map((p) => localizeProject(p, locale));
}

export function getProjectBySlug(slug: string, locale: Locale): ProjectFull | undefined {
  const found = PROJECTS_RAW.find((p) => p.slug === slug);
  return found ? localizeProject(found, locale) : undefined;
}

export function getFeaturedProjects(locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.filter((p) => p.featured).map((p) => localizeProject(p, locale));
}

export function getProjectsByCategory(category: ProjectCategory, locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.filter((p) => p.category === category).map((p) => localizeProject(p, locale));
}

export function getProjectsByWorld(world: World, locale: Locale): ProjectFull[] {
  return PROJECTS_RAW.filter((p) => p.world === world).map((p) => localizeProject(p, locale));
}

export function getAdjacentProjects(
  slug: string,
  locale: Locale
): { prev: ProjectFull | null; next: ProjectFull | null } {
  const idx = PROJECTS_RAW.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? localizeProject(PROJECTS_RAW[idx - 1], locale) : null,
    next:
      idx < PROJECTS_RAW.length - 1 && idx >= 0
        ? localizeProject(PROJECTS_RAW[idx + 1], locale)
        : null,
  };
}

/** Returns all project slugs (locale-independent) for static generation. */
export function getAllProjectSlugs(): string[] {
  return PROJECTS_RAW.map((p) => p.slug);
}
