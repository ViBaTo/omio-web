import type { World } from '@/lib/constants';
import type { Locale } from '@/i18n/routing';

type LocalizedString = { es: string; en: string };

/** Canonical category key. Display name comes from messages.projectCategories[key]. */
export type ProjectCategory = 'Hospitality' | 'Residencial' | 'Gastronomía' | 'Contract';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectPhase {
  title: string;
  description: string;
}

interface ProjectImageI18n {
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
}

interface ProjectPhaseI18n {
  title: LocalizedString;
  description: LocalizedString;
}

interface ProjectFullI18n {
  slug: string;
  title: LocalizedString;
  category: ProjectCategory;
  client: string;
  location: LocalizedString;
  year: number;
  world: World;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  result: LocalizedString;
  heroImage: string;
  images: ProjectImageI18n[];
  materials: string[];
  phases: ProjectPhaseI18n[];
  featured: boolean;
  stats?: { label: LocalizedString; value: string }[];
}

export interface ProjectFull {
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string;
  location: string;
  year: number;
  world: World;
  shortDescription: string;
  longDescription: string;
  challenge: string;
  solution: string;
  result: string;
  heroImage: string;
  images: ProjectImage[];
  materials: string[];
  phases: ProjectPhase[];
  featured: boolean;
  stats?: { label: string; value: string }[];
}

const PROJECTS_RAW: ProjectFullI18n[] = [
  {
    slug: 'hotel-arts-barcelona',
    title: { es: 'Hotel Arts Barcelona', en: 'Hotel Arts Barcelona' },
    category: 'Hospitality',
    client: 'Hotel Arts Barcelona — Ritz-Carlton',
    location: { es: 'Barcelona, España', en: 'Barcelona, Spain' },
    year: 2022,
    world: 'artesano',
    shortDescription: {
      es: 'Renovación integral del lobby y suites principales del icónico hotel frente al mar Mediterráneo.',
      en: 'Full renovation of the lobby and main suites of the iconic hotel facing the Mediterranean Sea.',
    },
    longDescription: {
      es: 'El Hotel Arts Barcelona necesitaba una renovación que mantuviese su esencia contemporánea mientras incorporaba un lenguaje más cálido y mediterráneo. Trabajamos codo a codo con el estudio de arquitectura para desarrollar un mobiliario a medida que combinase la madera de nogal con detalles en latón envejecido y mármol Calacatta.',
      en: 'Hotel Arts Barcelona needed a renovation that kept its contemporary essence while incorporating a warmer, more Mediterranean language. We worked side by side with the architecture studio to develop bespoke furniture that combined walnut with details in aged brass and Calacatta marble.',
    },
    challenge: {
      es: 'La principal complejidad residía en la instalación sin interrumpir la operativa del hotel, coordinando más de 200 piezas únicas en un plazo de 8 semanas.',
      en: 'The main complexity was installing without interrupting hotel operations, coordinating more than 200 unique pieces within an 8-week timeframe.',
    },
    solution: {
      es: 'Diseñamos un sistema modular de ensamblaje rápido que permitió reducir los tiempos de instalación en sala a menos de 4 horas por suite, manteniendo la calidad artesanal de cada pieza.',
      en: 'We designed a quick-assembly modular system that reduced in-room installation times to less than 4 hours per suite, while maintaining the craft quality of every piece.',
    },
    result: {
      es: 'El resultado fue un espacio que respira Mediterráneo sin perder la sofisticación internacional que define al Hotel Arts. El proyecto recibió el premio Best Hotel Renovation de los European Hospitality Awards 2023.',
      en: 'The result is a space that breathes Mediterranean without losing the international sophistication that defines Hotel Arts. The project received the Best Hotel Renovation award at the 2023 European Hospitality Awards.',
    },
    heroImage: '/images/projects/placeholder-1.jpg',
    images: [
      {
        src: '/images/projects/placeholder-1.jpg',
        alt: { es: 'Lobby principal Hotel Arts', en: 'Hotel Arts main lobby' },
        caption: {
          es: 'Lobby renovado con mobiliario en nogal y latón',
          en: 'Renovated lobby with walnut and brass furniture',
        },
      },
      {
        src: '/images/projects/placeholder-2.jpg',
        alt: { es: 'Suite presidencial', en: 'Presidential suite' },
        caption: {
          es: 'Suite con cabecero artesanal y detalles en mármol',
          en: 'Suite with artisan headboard and marble details',
        },
      },
      {
        src: '/images/projects/placeholder-3.jpg',
        alt: { es: 'Detalle de acabados', en: 'Finish detail' },
        caption: {
          es: 'Unión de nogal macizo y latón envejecido',
          en: 'Joint of solid walnut and aged brass',
        },
      },
    ],
    materials: ['nogal-americano', 'laton-envejecido', 'marmol-calacatta', 'lino-natural'],
    phases: [
      {
        title: { es: 'Concepto', en: 'Concept' },
        description: {
          es: 'Interpretación del briefing del estudio de arquitectura y desarrollo de muestras.',
          en: 'Interpretation of the architecture studio briefing and sample development.',
        },
      },
      {
        title: { es: 'Prototipado', en: 'Prototyping' },
        description: {
          es: 'Fabricación de 3 prototipos a escala real para validación del cliente.',
          en: 'Manufacture of 3 full-scale prototypes for client validation.',
        },
      },
      {
        title: { es: 'Producción', en: 'Production' },
        description: {
          es: 'Fabricación de más de 200 piezas en nuestro taller de Valencia.',
          en: 'Manufacture of more than 200 pieces in our Valencia workshop.',
        },
      },
      {
        title: { es: 'Instalación', en: 'Installation' },
        description: {
          es: 'Montaje en 8 semanas sin interrumpir la operativa del hotel.',
          en: 'Assembly in 8 weeks without interrupting hotel operations.',
        },
      },
    ],
    featured: true,
    stats: [
      { label: { es: 'Piezas fabricadas', en: 'Pieces manufactured' }, value: '200+' },
      { label: { es: 'Semanas de instalación', en: 'Installation weeks' }, value: '8' },
      { label: { es: 'Suites renovadas', en: 'Renovated suites' }, value: '48' },
    ],
  },
  {
    slug: 'four-seasons-madrid',
    title: { es: 'Four Seasons Madrid', en: 'Four Seasons Madrid' },
    category: 'Hospitality',
    client: 'Four Seasons Hotels & Resorts',
    location: { es: 'Madrid, España', en: 'Madrid, Spain' },
    year: 2023,
    world: 'fabrica',
    shortDescription: {
      es: 'Fabricación del mobiliario de las áreas comunes y restaurante del Four Seasons en el corazón de Madrid.',
      en: 'Manufacture of the furniture for the common areas and restaurant of Four Seasons in the heart of Madrid.',
    },
    longDescription: {
      es: 'El Four Seasons Madrid, situado en el histórico Centro Canalejas, requería un nivel de detalle y acabado excepcional. Colaboramos con el estudio de interiorismo para traducir su visión de lujo contemporáneo en piezas fabricadas con la máxima precisión técnica.',
      en: 'The Four Seasons Madrid, located in the historic Centro Canalejas, required an exceptional level of detail and finish. We collaborated with the interior design studio to translate its contemporary luxury vision into pieces manufactured with maximum technical precision.',
    },
    challenge: {
      es: 'Los techos abovedados del edificio histórico requerían soluciones de anclaje personalizadas para cada pieza, sin dañar la estructura protegida.',
      en: 'The vaulted ceilings of the historic building required custom anchoring solutions for each piece, without damaging the protected structure.',
    },
    solution: {
      es: 'Desarrollamos un sistema de fijación reversible que respetaba la arquitectura original mientras aseguraba la estabilidad de piezas de gran formato. Cada anclaje fue diseñado por nuestro equipo de ingeniería con modelado 3D del edificio.',
      en: 'We developed a reversible fixing system that respected the original architecture while ensuring the stability of large-format pieces. Each anchor was designed by our engineering team using 3D modeling of the building.',
    },
    result: {
      es: 'El restaurante y las áreas comunes del Four Seasons Madrid se han convertido en referencia del diseño de interiores de lujo en España, combinando patrimonio histórico con confort contemporáneo.',
      en: 'The restaurant and common areas of the Four Seasons Madrid have become a benchmark of luxury interior design in Spain, combining historic heritage with contemporary comfort.',
    },
    heroImage: '/images/projects/placeholder-2.jpg',
    images: [
      {
        src: '/images/projects/placeholder-2.jpg',
        alt: { es: 'Restaurante Four Seasons Madrid', en: 'Four Seasons Madrid restaurant' },
        caption: { es: 'Comedor principal con mobiliario a medida', en: 'Main dining room with bespoke furniture' },
      },
      {
        src: '/images/projects/placeholder-3.jpg',
        alt: { es: 'Detalle barra', en: 'Bar detail' },
        caption: {
          es: 'Barra del bar con mármol verde Guatemala y latón',
          en: 'Bar with Verde Guatemala marble and brass',
        },
      },
      {
        src: '/images/projects/placeholder-4.jpg',
        alt: { es: 'Recepción', en: 'Reception' },
        caption: {
          es: 'Mostrador de recepción en piedra natural y roble',
          en: 'Reception desk in natural stone and oak',
        },
      },
    ],
    materials: ['roble-europeo', 'marmol-verde-guatemala', 'laton-pulido', 'terciopelo-italiano'],
    phases: [
      {
        title: { es: 'Ingeniería', en: 'Engineering' },
        description: {
          es: 'Escaneo 3D del edificio y diseño de anclajes personalizados.',
          en: '3D scanning of the building and design of custom anchors.',
        },
      },
      {
        title: { es: 'Muestras', en: 'Samples' },
        description: {
          es: 'Desarrollo de 12 muestras de acabados para aprobación del estudio.',
          en: 'Development of 12 finish samples for studio approval.',
        },
      },
      {
        title: { es: 'Fabricación', en: 'Manufacturing' },
        description: {
          es: 'Producción de 340 piezas en dos fases durante 16 semanas.',
          en: 'Production of 340 pieces in two phases over 16 weeks.',
        },
      },
      {
        title: { es: 'Instalación', en: 'Installation' },
        description: {
          es: 'Coordinación con 6 gremios diferentes para la instalación final.',
          en: 'Coordination with 6 different trades for the final installation.',
        },
      },
    ],
    featured: true,
    stats: [
      { label: { es: 'Piezas únicas', en: 'Unique pieces' }, value: '340' },
      { label: { es: 'Meses de proyecto', en: 'Project months' }, value: '14' },
      { label: { es: 'Gremios coordinados', en: 'Trades coordinated' }, value: '6' },
    ],
  },
  {
    slug: 'residencia-dubai',
    title: { es: 'Residencia Privada Dubai', en: 'Private Residence Dubai' },
    category: 'Residencial',
    client: 'Cliente privado',
    location: { es: 'Dubai, EAU', en: 'Dubai, UAE' },
    year: 2023,
    world: 'artesano',
    shortDescription: {
      es: 'Diseño y fabricación del mobiliario completo de una residencia de 1.200m² en Palm Jumeirah.',
      en: 'Design and manufacture of the complete furniture for a 1,200 m² residence in Palm Jumeirah.',
    },
    longDescription: {
      es: 'Una residencia privada de ultra-lujo en Palm Jumeirah que demandaba piezas exclusivas combinando la tradición artesanal mediterránea con la opulencia contemporánea del Golfo Pérsico. Cada pieza fue diseñada como una obra de arte funcional.',
      en: 'An ultra-luxury private residence in Palm Jumeirah that demanded exclusive pieces combining Mediterranean craft tradition with the contemporary opulence of the Persian Gulf. Every piece was designed as a functional work of art.',
    },
    challenge: {
      es: 'El transporte intercontinental de piezas de gran formato (algunas superiores a 4 metros) y la adaptación a condiciones climáticas extremas de humedad y temperatura.',
      en: 'Intercontinental transport of large-format pieces (some over 4 meters) and adaptation to extreme climate conditions of humidity and temperature.',
    },
    solution: {
      es: 'Desarrollamos acabados específicos resistentes a la humedad del Golfo y diseñamos un sistema de embalaje y logística puerta a puerta que garantizó la integridad de cada pieza en un viaje de más de 5.000 km.',
      en: 'We developed specific finishes resistant to the Gulf humidity and designed a door-to-door packaging and logistics system that guaranteed the integrity of every piece over a 5,000+ km journey.',
    },
    result: {
      es: 'La residencia se ha convertido en ejemplo de cómo la artesanía europea puede dialogar con la estética contemporánea del Medio Oriente, creando espacios verdaderamente únicos.',
      en: 'The residence has become an example of how European craft can converse with contemporary Middle Eastern aesthetics, creating truly unique spaces.',
    },
    heroImage: '/images/projects/placeholder-3.jpg',
    images: [
      {
        src: '/images/projects/placeholder-3.jpg',
        alt: { es: 'Salón principal', en: 'Main lounge' },
        caption: { es: 'Salón con mobiliario en ébano y oro rosa', en: 'Lounge with ebony and rose gold furniture' },
      },
      {
        src: '/images/projects/placeholder-4.jpg',
        alt: { es: 'Master suite', en: 'Master suite' },
        caption: {
          es: 'Dormitorio principal con cabecero escultórico',
          en: 'Master bedroom with sculptural headboard',
        },
      },
    ],
    materials: ['ebano-macassar', 'marmol-calacatta', 'acero-oro-rosa', 'seda-natural'],
    phases: [
      {
        title: { es: 'Diseño', en: 'Design' },
        description: {
          es: 'Visita al emplazamiento y sesiones de diseño con el cliente.',
          en: 'On-site visit and design sessions with the client.',
        },
      },
      {
        title: { es: 'Prototipado', en: 'Prototyping' },
        description: {
          es: 'Prototipos de las 5 piezas principales enviados a Dubai para aprobación.',
          en: 'Prototypes of the 5 main pieces shipped to Dubai for approval.',
        },
      },
      {
        title: { es: 'Producción', en: 'Production' },
        description: {
          es: 'Fabricación completa de 85 piezas durante 20 semanas.',
          en: 'Complete manufacture of 85 pieces over 20 weeks.',
        },
      },
      {
        title: { es: 'Logística', en: 'Logistics' },
        description: {
          es: 'Envío intercontinental y montaje in situ con equipo propio.',
          en: 'Intercontinental shipping and on-site installation with our own team.',
        },
      },
    ],
    featured: true,
    stats: [
      { label: { es: 'Superficie', en: 'Surface' }, value: '1.200m²' },
      { label: { es: 'Piezas a medida', en: 'Bespoke pieces' }, value: '85' },
      { label: { es: 'Km de transporte', en: 'Transport km' }, value: '5.000+' },
    ],
  },
  {
    slug: 'mandarin-oriental',
    title: { es: 'Mandarin Oriental', en: 'Mandarin Oriental' },
    category: 'Hospitality',
    client: 'Mandarin Oriental Hotel Group',
    location: { es: 'Milán, Italia', en: 'Milan, Italy' },
    year: 2024,
    world: 'ingeniero',
    shortDescription: {
      es: 'Fabricación e instalación del mobiliario del spa y áreas wellness del Mandarin Oriental de Milán.',
      en: 'Manufacture and installation of the furniture for the spa and wellness areas of Mandarin Oriental Milan.',
    },
    longDescription: {
      es: 'El spa del Mandarin Oriental de Milán necesitaba transmitir calma y precisión a partes iguales. El estudio de arquitectura planteó un diseño minimalista donde cada junta, cada unión y cada superficie debía ser perfecta. La ingeniería fue clave para resolver las curvas complejas del mobiliario.',
      en: 'The Mandarin Oriental Milan spa needed to convey calm and precision in equal measure. The architecture studio proposed a minimalist design where every joint, every union, and every surface had to be perfect. Engineering was key to solving the complex curves of the furniture.',
    },
    challenge: {
      es: 'Las curvas de doble curvatura del mobiliario requerían técnicas de fabricación avanzadas que mantuviesen tolerancias inferiores a 0.5mm.',
      en: 'The double-curvature surfaces of the furniture required advanced manufacturing techniques while maintaining tolerances below 0.5 mm.',
    },
    solution: {
      es: 'Combinamos fresado CNC de 5 ejes con acabado manual para lograr superficies de doble curvatura perfectas. Cada pieza pasó por un protocolo de control de calidad de 27 puntos.',
      en: 'We combined 5-axis CNC milling with manual finishing to achieve perfect double-curvature surfaces. Each piece went through a 27-point quality control protocol.',
    },
    result: {
      es: 'El spa del Mandarin Oriental ha sido reconocido como uno de los mejores espacios wellness de Europa por Condé Nast Traveller, destacando la perfección de los acabados.',
      en: 'The Mandarin Oriental spa has been recognized as one of the best wellness spaces in Europe by Condé Nast Traveller, highlighting the perfection of the finishes.',
    },
    heroImage: '/images/projects/placeholder-4.jpg',
    images: [
      {
        src: '/images/projects/placeholder-4.jpg',
        alt: { es: 'Zona de relajación', en: 'Relaxation area' },
        caption: {
          es: 'Tumbonas de doble curvatura en roble blanqueado',
          en: 'Double-curvature loungers in bleached oak',
        },
      },
      {
        src: '/images/projects/placeholder-5.jpg',
        alt: { es: 'Recepción spa', en: 'Spa reception' },
        caption: {
          es: 'Mostrador orgánico con superficie continua',
          en: 'Organic counter with continuous surface',
        },
      },
    ],
    materials: ['roble-blanqueado', 'piedra-caliza', 'acero-inoxidable', 'lino-natural'],
    phases: [
      {
        title: { es: 'Ingeniería', en: 'Engineering' },
        description: {
          es: 'Modelado paramétrico y cálculo de tolerancias para curvas complejas.',
          en: 'Parametric modeling and tolerance calculation for complex curves.',
        },
      },
      {
        title: { es: 'Prototipo', en: 'Prototype' },
        description: {
          es: 'Fabricación de prototipo a escala 1:1 de la tumbona principal.',
          en: 'Manufacture of a 1:1 scale prototype of the main lounger.',
        },
      },
      {
        title: { es: 'Producción', en: 'Production' },
        description: {
          es: 'Fabricación CNC + acabado manual de 45 piezas.',
          en: 'CNC manufacture + manual finishing of 45 pieces.',
        },
      },
      {
        title: { es: 'Instalación', en: 'Installation' },
        description: {
          es: 'Montaje y ajuste fino in situ durante 3 semanas.',
          en: 'Assembly and fine on-site adjustments over 3 weeks.',
        },
      },
    ],
    featured: false,
    stats: [
      { label: { es: 'Tolerancia', en: 'Tolerance' }, value: '<0.5mm' },
      { label: { es: 'Puntos de control', en: 'Control points' }, value: '27' },
      { label: { es: 'Piezas fabricadas', en: 'Pieces manufactured' }, value: '45' },
    ],
  },
  {
    slug: 'restaurante-dani-garcia',
    title: { es: 'Restaurante Dani García', en: 'Dani García Restaurant' },
    category: 'Gastronomía',
    client: 'Grupo Dani García',
    location: { es: 'Marbella, España', en: 'Marbella, Spain' },
    year: 2024,
    world: 'artesano',
    shortDescription: {
      es: 'Mobiliario artesanal para el nuevo concepto gastronómico del chef Dani García en Marbella.',
      en: 'Artisan furniture for chef Dani García\'s new gastronomic concept in Marbella.',
    },
    longDescription: {
      es: 'Dani García buscaba un espacio que transmitiese la misma creatividad que su cocina. Diseñamos un mobiliario donde cada mesa cuenta una historia diferente, utilizando maderas recuperadas del Mediterráneo y técnicas de marquetería tradicional actualizadas.',
      en: 'Dani García wanted a space that conveyed the same creativity as his kitchen. We designed furniture where every table tells a different story, using woods reclaimed from the Mediterranean and updated traditional marquetry techniques.',
    },
    challenge: {
      es: 'Integrar madera recuperada de barcos pesqueros (con todas sus imperfecciones) en un diseño de alta gama que cumpliese los estándares de un restaurante de primer nivel.',
      en: 'Integrating wood reclaimed from fishing boats (with all its imperfections) into a high-end design that meets the standards of a top-tier restaurant.',
    },
    solution: {
      es: 'Desarrollamos un proceso de selección, tratamiento y estabilización de maderas recuperadas que conserva el carácter original del material mientras garantiza su durabilidad en un entorno de uso intensivo.',
      en: 'We developed a process for selecting, treating, and stabilizing reclaimed woods that preserves the original character of the material while guaranteeing its durability in an intensive-use environment.',
    },
    result: {
      es: 'El restaurante se ha convertido en un destino tanto gastronómico como de diseño, con las mesas siendo protagonistas de innumerables publicaciones en redes sociales y revistas de interiorismo.',
      en: 'The restaurant has become a destination both gastronomic and design-driven, with the tables featured in countless social media posts and interior design magazines.',
    },
    heroImage: '/images/projects/placeholder-5.jpg',
    images: [
      {
        src: '/images/projects/placeholder-5.jpg',
        alt: { es: 'Comedor principal', en: 'Main dining room' },
        caption: {
          es: 'Mesas en madera recuperada con marquetería contemporánea',
          en: 'Reclaimed-wood tables with contemporary marquetry',
        },
      },
      {
        src: '/images/projects/placeholder-6.jpg',
        alt: { es: 'Detalle marquetería', en: 'Marquetry detail' },
        caption: {
          es: 'Detalle de la marquetería en olivo y teca',
          en: 'Detail of olive and teak marquetry',
        },
      },
    ],
    materials: ['madera-recuperada', 'olivo-mediterraneo', 'acero-negro', 'cuero-natural'],
    phases: [
      {
        title: { es: 'Concepto', en: 'Concept' },
        description: {
          es: 'Sesiones creativas con el equipo de Dani García.',
          en: 'Creative sessions with the Dani García team.',
        },
      },
      {
        title: { es: 'Selección', en: 'Selection' },
        description: {
          es: 'Búsqueda y selección de maderas recuperadas en puertos del Mediterráneo.',
          en: 'Search and selection of reclaimed woods in Mediterranean harbors.',
        },
      },
      {
        title: { es: 'Artesanía', en: 'Craft' },
        description: {
          es: 'Marquetería y acabados manuales durante 12 semanas.',
          en: 'Marquetry and manual finishes over 12 weeks.',
        },
      },
      {
        title: { es: 'Entrega', en: 'Delivery' },
        description: {
          es: 'Instalación y ajuste final con el equipo del restaurante.',
          en: 'Installation and final adjustments with the restaurant team.',
        },
      },
    ],
    featured: false,
    stats: [
      { label: { es: 'Mesas únicas', en: 'Unique tables' }, value: '24' },
      { label: { es: 'Tipos de madera', en: 'Wood types' }, value: '7' },
      { label: { es: 'Horas de marquetería', en: 'Marquetry hours' }, value: '480+' },
    ],
  },
  {
    slug: 'yacht-club-monaco',
    title: { es: 'Yacht Club Monaco', en: 'Yacht Club Monaco' },
    category: 'Contract',
    client: 'Yacht Club de Monaco',
    location: { es: 'Mónaco', en: 'Monaco' },
    year: 2021,
    world: 'fabrica',
    shortDescription: {
      es: 'Renovación del mobiliario de las zonas sociales del prestigioso Yacht Club de Mónaco.',
      en: 'Renovation of the furniture in the social areas of the prestigious Yacht Club de Monaco.',
    },
    longDescription: {
      es: 'El Yacht Club de Mónaco, con su icónica arquitectura contemporánea, necesitaba renovar el mobiliario de sus áreas sociales manteniendo la coherencia con el lenguaje arquitectónico del edificio. Producimos más de 150 piezas que combinan la ligereza visual con la robustez necesaria para un entorno náutico de uso intensivo.',
      en: 'The Yacht Club de Monaco, with its iconic contemporary architecture, needed to renew the furniture of its social areas while maintaining coherence with the building\'s architectural language. We produced more than 150 pieces that combine visual lightness with the robustness needed for an intensive-use marine environment.',
    },
    challenge: {
      es: 'El mobiliario debía resistir el ambiente salino y la exposición solar directa mientras mantenía un aspecto elegante y ligero acorde con la arquitectura del edificio.',
      en: 'The furniture had to resist the salt environment and direct solar exposure while keeping an elegant, light look in line with the building\'s architecture.',
    },
    solution: {
      es: 'Utilizamos aleaciones de aluminio naval con acabados anodizados personalizados y tapicerías técnicas de grado marino, todo ello sin sacrificar la estética de lujo que exige el club.',
      en: 'We used marine aluminum alloys with custom anodized finishes and marine-grade technical upholstery, all without sacrificing the luxury aesthetic the club demands.',
    },
    result: {
      es: 'Las nuevas piezas se integran perfectamente con la arquitectura del edificio y han demostrado una resistencia excepcional tras tres temporadas de uso intensivo frente al Mediterráneo.',
      en: 'The new pieces integrate perfectly with the building\'s architecture and have shown exceptional resistance after three seasons of intensive use facing the Mediterranean.',
    },
    heroImage: '/images/projects/placeholder-6.jpg',
    images: [
      {
        src: '/images/projects/placeholder-6.jpg',
        alt: { es: 'Terraza Yacht Club', en: 'Yacht Club terrace' },
        caption: {
          es: 'Terraza con mobiliario en aluminio naval y teca',
          en: 'Terrace with marine aluminum and teak furniture',
        },
      },
      {
        src: '/images/projects/placeholder-1.jpg',
        alt: { es: 'Interior club', en: 'Club interior' },
        caption: {
          es: 'Zona social con sillones tapizados en tejido marino',
          en: 'Social area with armchairs upholstered in marine fabric',
        },
      },
    ],
    materials: ['aluminio-naval', 'teca-birmana', 'tejido-nautico', 'acero-inoxidable'],
    phases: [
      {
        title: { es: 'Diseño técnico', en: 'Technical design' },
        description: {
          es: 'Adaptación del diseño a los requisitos navales y climáticos.',
          en: 'Adaptation of the design to marine and climate requirements.',
        },
      },
      {
        title: { es: 'Certificación', en: 'Certification' },
        description: {
          es: 'Ensayos de resistencia UV, salinidad y desgaste.',
          en: 'UV, salinity, and wear resistance testing.',
        },
      },
      {
        title: { es: 'Producción', en: 'Production' },
        description: {
          es: 'Fabricación de 150+ piezas con control de calidad naval.',
          en: 'Manufacture of 150+ pieces with marine quality control.',
        },
      },
      {
        title: { es: 'Instalación', en: 'Installation' },
        description: {
          es: 'Montaje coordinado con la temporada baja del club.',
          en: 'Assembly coordinated with the club\'s low season.',
        },
      },
    ],
    featured: false,
    stats: [
      { label: { es: 'Piezas producidas', en: 'Pieces produced' }, value: '150+' },
      { label: { es: 'Tests de calidad', en: 'Quality tests' }, value: '18' },
      { label: { es: 'Años de garantía', en: 'Warranty years' }, value: '10' },
    ],
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  ...new Set(PROJECTS_RAW.map((p) => p.category)),
] as ProjectCategory[];

function localizeProject(p: ProjectFullI18n, locale: Locale): ProjectFull {
  return {
    slug: p.slug,
    title: p.title[locale],
    category: p.category,
    client: p.client,
    location: p.location[locale],
    year: p.year,
    world: p.world,
    shortDescription: p.shortDescription[locale],
    longDescription: p.longDescription[locale],
    challenge: p.challenge[locale],
    solution: p.solution[locale],
    result: p.result[locale],
    heroImage: p.heroImage,
    images: p.images.map((img) => ({
      src: img.src,
      alt: img.alt[locale],
      caption: img.caption?.[locale],
    })),
    materials: p.materials,
    phases: p.phases.map((ph) => ({
      title: ph.title[locale],
      description: ph.description[locale],
    })),
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
