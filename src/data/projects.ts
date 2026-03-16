import type { World } from '@/lib/constants';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectPhase {
  title: string;
  description: string;
}

export interface ProjectFull {
  slug: string;
  title: string;
  category: string;
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
  materials: string[]; // slugs referencing materials
  phases: ProjectPhase[];
  featured: boolean;
  stats?: { label: string; value: string }[];
}

export const PROJECTS: ProjectFull[] = [
  {
    slug: 'hotel-arts-barcelona',
    title: 'Hotel Arts Barcelona',
    category: 'Hospitality',
    client: 'Hotel Arts Barcelona — Ritz-Carlton',
    location: 'Barcelona, España',
    year: 2022,
    world: 'artesano',
    shortDescription:
      'Renovación integral del lobby y suites principales del icónico hotel frente al mar Mediterráneo.',
    longDescription:
      'El Hotel Arts Barcelona necesitaba una renovación que mantuviese su esencia contemporánea mientras incorporaba un lenguaje más cálido y mediterráneo. Trabajamos codo a codo con GCA Arquitectos para desarrollar un mobiliario a medida que combinase la madera de nogal con detalles en latón envejecido y mármol Calacatta.',
    challenge:
      'La principal complejidad residía en la instalación sin interrumpir la operativa del hotel, coordinando más de 200 piezas únicas en un plazo de 8 semanas.',
    solution:
      'Diseñamos un sistema modular de ensamblaje rápido que permitió reducir los tiempos de instalación en sala a menos de 4 horas por suite, manteniendo la calidad artesanal de cada pieza.',
    result:
      'El resultado fue un espacio que respira Mediterráneo sin perder la sofisticación internacional que define al Hotel Arts. El proyecto recibió el premio Best Hotel Renovation de los European Hospitality Awards 2023.',
    heroImage: '/images/projects/placeholder-1.jpg',
    images: [
      { src: '/images/projects/placeholder-1.jpg', alt: 'Lobby principal Hotel Arts', caption: 'Lobby renovado con mobiliario en nogal y latón' },
      { src: '/images/projects/placeholder-2.jpg', alt: 'Suite presidencial', caption: 'Suite con cabecero artesanal y detalles en mármol' },
      { src: '/images/projects/placeholder-3.jpg', alt: 'Detalle de acabados', caption: 'Unión de nogal macizo y latón envejecido' },
    ],
    materials: ['nogal-americano', 'laton-envejecido', 'marmol-calacatta', 'lino-natural'],
    phases: [
      { title: 'Concepto', description: 'Interpretación del briefing de GCA Arquitectos y desarrollo de muestras.' },
      { title: 'Prototipado', description: 'Fabricación de 3 prototipos a escala real para validación del cliente.' },
      { title: 'Producción', description: 'Fabricación de más de 200 piezas en nuestro taller de Valencia.' },
      { title: 'Instalación', description: 'Montaje en 8 semanas sin interrumpir la operativa del hotel.' },
    ],
    featured: true,
    stats: [
      { label: 'Piezas fabricadas', value: '200+' },
      { label: 'Semanas de instalación', value: '8' },
      { label: 'Suites renovadas', value: '48' },
    ],
  },
  {
    slug: 'four-seasons-madrid',
    title: 'Four Seasons Madrid',
    category: 'Hospitality',
    client: 'Four Seasons Hotels & Resorts',
    location: 'Madrid, España',
    year: 2023,
    world: 'fabrica',
    shortDescription:
      'Fabricación del mobiliario de las áreas comunes y restaurante del Four Seasons en el corazón de Madrid.',
    longDescription:
      'El Four Seasons Madrid, situado en el histórico Centro Canalejas, requería un nivel de detalle y acabado excepcional. Colaboramos con el estudio de Lázaro Rosa-Violán para traducir su visión de lujo contemporáneo en piezas fabricadas con la máxima precisión técnica.',
    challenge:
      'Los techos abovedados del edificio histórico requerían soluciones de anclaje personalizadas para cada pieza, sin dañar la estructura protegida.',
    solution:
      'Desarrollamos un sistema de fijación reversible que respetaba la arquitectura original mientras aseguraba la estabilidad de piezas de gran formato. Cada anclaje fue diseñado por nuestro equipo de ingeniería con modelado 3D del edificio.',
    result:
      'El restaurante y las áreas comunes del Four Seasons Madrid se han convertido en referencia del diseño de interiores de lujo en España, combinando patrimonio histórico con confort contemporáneo.',
    heroImage: '/images/projects/placeholder-2.jpg',
    images: [
      { src: '/images/projects/placeholder-2.jpg', alt: 'Restaurante Four Seasons Madrid', caption: 'Comedor principal con mobiliario a medida' },
      { src: '/images/projects/placeholder-3.jpg', alt: 'Detalle barra', caption: 'Barra del bar con mármol verde Guatemala y latón' },
      { src: '/images/projects/placeholder-4.jpg', alt: 'Recepción', caption: 'Mostrador de recepción en piedra natural y roble' },
    ],
    materials: ['roble-europeo', 'marmol-verde-guatemala', 'laton-pulido', 'terciopelo-italiano'],
    phases: [
      { title: 'Ingeniería', description: 'Escaneo 3D del edificio y diseño de anclajes personalizados.' },
      { title: 'Muestras', description: 'Desarrollo de 12 muestras de acabados para aprobación del estudio.' },
      { title: 'Fabricación', description: 'Producción de 340 piezas en dos fases durante 16 semanas.' },
      { title: 'Instalación', description: 'Coordinación con 6 gremios diferentes para la instalación final.' },
    ],
    featured: true,
    stats: [
      { label: 'Piezas únicas', value: '340' },
      { label: 'Meses de proyecto', value: '14' },
      { label: 'Gremios coordinados', value: '6' },
    ],
  },
  {
    slug: 'residencia-dubai',
    title: 'Residencia Privada Dubai',
    category: 'Residencial',
    client: 'Cliente privado',
    location: 'Dubai, EAU',
    year: 2023,
    world: 'artesano',
    shortDescription:
      'Diseño y fabricación del mobiliario completo de una residencia de 1.200m² en Palm Jumeirah.',
    longDescription:
      'Una residencia privada de ultra-lujo en Palm Jumeirah que demandaba piezas exclusivas combinando la tradición artesanal mediterránea con la opulencia contemporánea del Golfo Pérsico. Cada pieza fue diseñada como una obra de arte funcional.',
    challenge:
      'El transporte intercontinental de piezas de gran formato (algunas superiores a 4 metros) y la adaptación a condiciones climáticas extremas de humedad y temperatura.',
    solution:
      'Desarrollamos acabados específicos resistentes a la humedad del Golfo y diseñamos un sistema de embalaje y logística puerta a puerta que garantizó la integridad de cada pieza en un viaje de más de 5.000 km.',
    result:
      'La residencia se ha convertido en ejemplo de cómo la artesanía europea puede dialogar con la estética contemporánea del Medio Oriente, creando espacios verdaderamente únicos.',
    heroImage: '/images/projects/placeholder-3.jpg',
    images: [
      { src: '/images/projects/placeholder-3.jpg', alt: 'Salón principal', caption: 'Salón con mobiliario en ébano y oro rosa' },
      { src: '/images/projects/placeholder-4.jpg', alt: 'Master suite', caption: 'Dormitorio principal con cabecero escultórico' },
    ],
    materials: ['ebano-macassar', 'marmol-calacatta', 'acero-oro-rosa', 'seda-natural'],
    phases: [
      { title: 'Diseño', description: 'Visita al emplazamiento y sesiones de diseño con el cliente.' },
      { title: 'Prototipado', description: 'Prototipos de las 5 piezas principales enviados a Dubai para aprobación.' },
      { title: 'Producción', description: 'Fabricación completa de 85 piezas durante 20 semanas.' },
      { title: 'Logística', description: 'Envío intercontinental y montaje in situ con equipo propio.' },
    ],
    featured: true,
    stats: [
      { label: 'Superficie', value: '1.200m²' },
      { label: 'Piezas a medida', value: '85' },
      { label: 'Km de transporte', value: '5.000+' },
    ],
  },
  {
    slug: 'mandarin-oriental',
    title: 'Mandarin Oriental',
    category: 'Hospitality',
    client: 'Mandarin Oriental Hotel Group',
    location: 'Milán, Italia',
    year: 2024,
    world: 'ingeniero',
    shortDescription:
      'Fabricación e instalación del mobiliario del spa y áreas wellness del Mandarin Oriental de Milán.',
    longDescription:
      'El spa del Mandarin Oriental de Milán necesitaba transmitir calma y precisión a partes iguales. Norman Foster planteó un diseño minimalista donde cada junta, cada unión y cada superficie debía ser perfecta. La ingeniería fue clave para resolver las curvas complejas del mobiliario.',
    challenge:
      'Las curvas de doble curvatura del mobiliario requerían técnicas de fabricación avanzadas que mantuviesen tolerancias inferiores a 0.5mm.',
    solution:
      'Combinamos fresado CNC de 5 ejes con acabado manual para lograr superficies de doble curvatura perfectas. Cada pieza pasó por un protocolo de control de calidad de 27 puntos.',
    result:
      'El spa del Mandarin Oriental ha sido reconocido como uno de los mejores espacios wellness de Europa por Condé Nast Traveller, destacando la perfección de los acabados.',
    heroImage: '/images/projects/placeholder-4.jpg',
    images: [
      { src: '/images/projects/placeholder-4.jpg', alt: 'Zona de relajación', caption: 'Tumbonas de doble curvatura en roble blanqueado' },
      { src: '/images/projects/placeholder-5.jpg', alt: 'Recepción spa', caption: 'Mostrador orgánico con superficie continua' },
    ],
    materials: ['roble-blanqueado', 'piedra-caliza', 'acero-inoxidable', 'lino-natural'],
    phases: [
      { title: 'Ingeniería', description: 'Modelado paramétrico y cálculo de tolerancias para curvas complejas.' },
      { title: 'Prototipo', description: 'Fabricación de prototipo a escala 1:1 de la tumbona principal.' },
      { title: 'Producción', description: 'Fabricación CNC + acabado manual de 45 piezas.' },
      { title: 'Instalación', description: 'Montaje y ajuste fino in situ durante 3 semanas.' },
    ],
    featured: false,
    stats: [
      { label: 'Tolerancia', value: '<0.5mm' },
      { label: 'Puntos de control', value: '27' },
      { label: 'Piezas fabricadas', value: '45' },
    ],
  },
  {
    slug: 'restaurante-dani-garcia',
    title: 'Restaurante Dani García',
    category: 'Gastronomía',
    client: 'Grupo Dani García',
    location: 'Marbella, España',
    year: 2024,
    world: 'artesano',
    shortDescription:
      'Mobiliario artesanal para el nuevo concepto gastronómico del chef Dani García en Marbella.',
    longDescription:
      'Dani García buscaba un espacio que transmitiese la misma creatividad que su cocina. Diseñamos un mobiliario donde cada mesa cuenta una historia diferente, utilizando maderas recuperadas del Mediterráneo y técnicas de marquetería tradicional actualizadas.',
    challenge:
      'Integrar madera recuperada de barcos pesqueros (con todas sus imperfecciones) en un diseño de alta gama que cumpliese los estándares de un restaurante de primer nivel.',
    solution:
      'Desarrollamos un proceso de selección, tratamiento y estabilización de maderas recuperadas que conserva el carácter original del material mientras garantiza su durabilidad en un entorno de uso intensivo.',
    result:
      'El restaurante se ha convertido en un destino tanto gastronómico como de diseño, con las mesas siendo protagonistas de innumerables publicaciones en redes sociales y revistas de interiorismo.',
    heroImage: '/images/projects/placeholder-5.jpg',
    images: [
      { src: '/images/projects/placeholder-5.jpg', alt: 'Comedor principal', caption: 'Mesas en madera recuperada con marquetería contemporánea' },
      { src: '/images/projects/placeholder-6.jpg', alt: 'Detalle marquetería', caption: 'Detalle de la marquetería en olivo y teca' },
    ],
    materials: ['madera-recuperada', 'olivo-mediterraneo', 'acero-negro', 'cuero-natural'],
    phases: [
      { title: 'Concepto', description: 'Sesiones creativas con el equipo de Dani García.' },
      { title: 'Selección', description: 'Búsqueda y selección de maderas recuperadas en puertos del Mediterráneo.' },
      { title: 'Artesanía', description: 'Marquetería y acabados manuales durante 12 semanas.' },
      { title: 'Entrega', description: 'Instalación y ajuste final con el equipo del restaurante.' },
    ],
    featured: false,
    stats: [
      { label: 'Mesas únicas', value: '24' },
      { label: 'Tipos de madera', value: '7' },
      { label: 'Horas de marquetería', value: '480+' },
    ],
  },
  {
    slug: 'yacht-club-monaco',
    title: 'Yacht Club Monaco',
    category: 'Contract',
    client: 'Yacht Club de Monaco',
    location: 'Mónaco',
    year: 2021,
    world: 'fabrica',
    shortDescription:
      'Renovación del mobiliario de las zonas sociales del prestigioso Yacht Club de Mónaco.',
    longDescription:
      'El Yacht Club de Mónaco, diseñado por Norman Foster, necesitaba renovar el mobiliario de sus áreas sociales manteniendo la coherencia con la arquitectura icónica del edificio. Producimos más de 150 piezas que combinan la ligereza visual con la robustez necesaria para un entorno náutico de uso intensivo.',
    challenge:
      'El mobiliario debía resistir el ambiente salino y la exposición solar directa mientras mantenía un aspecto elegante y ligero acorde con la arquitectura de Foster.',
    solution:
      'Utilizamos aleaciones de aluminio naval con acabados anodizados personalizados y tapicerías técnicas de grado marino, todo ello sin sacrificar la estética de lujo que exige el club.',
    result:
      'Las nuevas piezas se integran perfectamente con la arquitectura de Foster y han demostrado una resistencia excepcional tras tres temporadas de uso intensivo frente al Mediterráneo.',
    heroImage: '/images/projects/placeholder-6.jpg',
    images: [
      { src: '/images/projects/placeholder-6.jpg', alt: 'Terraza Yacht Club', caption: 'Terraza con mobiliario en aluminio naval y teca' },
      { src: '/images/projects/placeholder-1.jpg', alt: 'Interior club', caption: 'Zona social con sillones tapizados en tejido marino' },
    ],
    materials: ['aluminio-naval', 'teca-birmana', 'tejido-nautico', 'acero-inoxidable'],
    phases: [
      { title: 'Diseño técnico', description: 'Adaptación del diseño a los requisitos navales y climáticos.' },
      { title: 'Certificación', description: 'Ensayos de resistencia UV, salinidad y desgaste.' },
      { title: 'Producción', description: 'Fabricación de 150+ piezas con control de calidad naval.' },
      { title: 'Instalación', description: 'Montaje coordinado con la temporada baja del club.' },
    ],
    featured: false,
    stats: [
      { label: 'Piezas producidas', value: '150+' },
      { label: 'Tests de calidad', value: '18' },
      { label: 'Años de garantía', value: '10' },
    ],
  },
];

export const PROJECT_CATEGORIES = [...new Set(PROJECTS.map((p) => p.category))];

export function getProjectBySlug(slug: string): ProjectFull | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectFull[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): ProjectFull[] {
  return PROJECTS.filter((p) => p.category === category);
}

export function getAdjacentProjects(slug: string): { prev: ProjectFull | null; next: ProjectFull | null } {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? PROJECTS[idx - 1] : null,
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null,
  };
}
