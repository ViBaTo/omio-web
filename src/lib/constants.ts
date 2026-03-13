// ============================================
// OMIO ATELIER & DESIGN — Constants & Content
// ============================================

export type World = 'artesano' | 'ingeniero' | 'fabrica';

export interface SectionDef {
  id: string;
  label: string;
  number: string;
  world: World;
}

export const SECTIONS: SectionDef[] = [
  { id: 'nosotros', label: 'NOSOTROS', number: '01', world: 'artesano' },
  { id: 'capacidades', label: 'CAPACIDADES INDUSTRIALES', number: '02', world: 'fabrica' },
  { id: 'artesania', label: 'ARTESANÍA', number: '03', world: 'artesano' },
  { id: 'ingenieria', label: 'INGENIERÍA', number: '04', world: 'ingeniero' },
  { id: 'proyectos', label: 'PROYECTOS', number: '05', world: 'fabrica' },
  { id: 'contacta', label: 'CONTACTA', number: '06', world: 'artesano' },
];

// --- Hero ---
export const HERO_PHRASES = [
  'La unión de un artesano, un ingeniero y una fábrica',
  'Minimizamos los riesgos técnicos',
  'Solución integral desde el prototipado hasta la instalación',
  'Socio de confianza, tranquilidad y compromiso',
];

// --- Act 1: Nosotros ---
export const NOSOTROS = {
  title: 'El Aliado de tu Visión Creativa',
  paragraphs: [
    'En OMIO ATELIER & DESIGN no solo fabricamos elementos; construimos la confianza necesaria para que los estudios de diseño de interiores más prestigiosos del mundo hagan realidad lo imposible. Nos definimos como una asociación estratégica que trasciende la simple competencia funcional para convertirnos en el socio inestimable de firmas como GCA Arquitectos, Norman Foster o Lázaro Rosa-Violán.',
    'Nuestra razón de ser es mitigar los riesgos técnicos y logísticos de cada proyecto, ofreciendo tranquilidad a través de un sistema probado y una conexión humana profunda que protege la reputación de nuestros clientes.',
  ],
  highlightedFirms: ['GCA Arquitectos', 'Norman Foster', 'Lázaro Rosa-Violán'],
};

// --- Act 2: Capacidades Industriales ---
export interface Capability {
  number: string;
  title: string;
  description: string;
}

export const CAPACIDADES = {
  title: 'POTENCIA Y ESCALA GLOBAL',
  intro: 'Somos una fábrica con la capacidad de llevar la producción y la instalación a una escala global. A diferencia de los talleres tradicionales, contamos con la infraestructura necesaria para gestionar proyectos de gran envergadura y múltiples unidades sin perder el control de calidad.',
  blocks: [
    {
      number: '01',
      title: 'ALCANCE INTERNACIONAL',
      description: 'Desplazamos y organizamos equipos de instalación en cualquier parte del mundo.',
    },
    {
      number: '02',
      title: 'PRODUCCIÓN ROBUSTA',
      description: 'Ejecutamos la transición del diseño a la fabricación a gran escala con total fiabilidad.',
    },
    {
      number: '03',
      title: 'COMPROMISO DE CONTINUIDAD',
      description: 'Garantizamos soporte a largo plazo con nuestra promesa: «¡Ahí estaremos!» ante cualquier contingencia futura.',
    },
  ] as Capability[],
};

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: Stat[] = [
  { value: 42, suffix: '+', label: 'Países' },
  { value: 200, suffix: '+', label: 'Proyectos' },
  { value: 15, suffix: '', label: 'Años de experiencia' },
];

// --- Act 3: Artesanía ---
export const ARTESANIA = {
  title: 'El Alma del Atelier',
  paragraphs: [
    'El corazón de nuestra empresa late como un «Atelier». Entendemos y valoramos la creatividad pura, aportando el cuidado meticuloso y la sensibilidad que solo un artesano puede otorgar a una pieza única.',
    'Creemos que en el sector de alta gama, el valor reside en los detalles intangibles y el enfoque personal. Cada elemento que sale de nuestras manos conserva la esencia artesanal, asegurando que el resultado final sea tan exclusivo como la visión original del diseñador.',
  ],
};

// --- Act 4: Ingeniería ---
export interface ProcessStep {
  id: string;
  label: string;
  description: string;
}

export const INGENIERIA = {
  title: 'Precisión en la Complejidad',
  intro: 'Nuestra ingeniería es el puente entre la imaginación y la realidad tangible. Dotamos a la creatividad de la precisión técnica necesaria para superar las limitaciones prácticas de cualquier idea, por compleja que sea.',
  processSteps: [
    { id: 'diseno', label: 'DISEÑO', description: 'Interpretación y análisis del concepto creativo original.' },
    { id: 'ingenieria', label: 'INGENIERÍA', description: 'Desarrollo técnico detallado y resolución de complejidades.' },
    { id: 'prototipo', label: 'PROTOTIPO', description: 'Fabricación de prototipos reales para validación.' },
    { id: 'validacion', label: 'VALIDACIÓN', description: 'Supervisión del cliente y aprobación del resultado.' },
    { id: 'produccion', label: 'PRODUCCIÓN', description: 'Fabricación a escala con control de calidad total.' },
    { id: 'instalacion', label: 'INSTALACIÓN', description: 'Montaje e instalación en destino final.' },
  ] as ProcessStep[],
  blocks: [
    {
      title: 'Mitigación de Riesgos',
      description: 'Realizamos prototipos y pruebas piloto reales que permiten al cliente supervisar y validar el éxito antes de la producción final.',
    },
    {
      title: 'Resolución Audaz',
      description: 'Anticipamos y resolvemos problemas técnicos antes de que afecten al proyecto, garantizando un sistema robusto y eficiente.',
    },
  ],
};

// --- Act 5: Proyectos ---
export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
}

export const PROYECTOS = {
  title: 'El Dominio de lo Complejo',
  intro: 'Nuestra cartera de proyectos refleja el éxito de fusionar tres mundos: el artesano, el ingeniero y la fábrica. Nos especializamos en sectores de contract global de alta gama, donde la complejidad es la norma y la excelencia la única opción.',
  phrase: 'Cada proyecto es un testimonio de nuestra capacidad para dialogar con el cliente, escuchar sus necesidades y resolver con audacia los desafíos más exigentes del diseño contemporáneo.',
  projects: [
    { slug: 'hotel-arts-barcelona', title: 'Hotel Arts Barcelona', category: 'Hospitality', image: '/images/projects/placeholder-1.jpg' },
    { slug: 'four-seasons-madrid', title: 'Four Seasons Madrid', category: 'Hospitality', image: '/images/projects/placeholder-2.jpg' },
    { slug: 'residencia-dubai', title: 'Residencia Privada Dubai', category: 'Residencial', image: '/images/projects/placeholder-3.jpg' },
    { slug: 'mandarin-oriental', title: 'Mandarin Oriental', category: 'Hospitality', image: '/images/projects/placeholder-4.jpg' },
    { slug: 'restaurante-dani-garcia', title: 'Restaurante Dani García', category: 'Gastronomía', image: '/images/projects/placeholder-5.jpg' },
    { slug: 'yacht-club-monaco', title: 'Yacht Club Monaco', category: 'Contract', image: '/images/projects/placeholder-6.jpg' },
  ] as Project[],
};

// --- Act 6: Contacta ---
export const CONTACTA = {
  title: 'Construyamos Vínculos',
  paragraphs: [
    'La confianza es personal. En OMIO, buscamos establecer conexiones emocionales con nuestros clientes y sus proyectos, reduciendo cualquier fricción a través de un compromiso relacional genuino.',
    'Si buscas un aliado que no solo entienda tu «qué», sino que comparta tu «porqué», estamos listos para escucharte.',
  ],
  cta: 'Hablemos',
  contact: {
    email: 'info@omiodesign.com',
    phone: '+34 960 000 000',
    location: 'Valencia, España',
    social: {
      instagram: '#',
      linkedin: '#',
    },
  },
};

// --- Color Palettes for JS interpolation ---
export const PALETTES = {
  artesano: {
    bg: [232, 245, 242],     // #E8F5F2
    text: [38, 63, 71],      // #263f47
    accent: [7, 114, 117],   // #077275
  },
  ingeniero: {
    bg: [212, 234, 228],     // #D4EAE4
    text: [53, 96, 110],     // #35606e
    accent: [53, 96, 110],   // #35606e
  },
  fabrica: {
    bg: [28, 48, 55],        // #1c3037
    text: [232, 245, 242],   // #E8F5F2
    accent: [148, 210, 189], // #94D2BD
  },
} as const;

// --- Nav Links ---
export const NAV_LINKS = SECTIONS.map((s) => ({
  href: `#${s.id}`,
  label: s.label,
}));

// --- Footer ---
export const FOOTER = {
  easter_egg: 'Hecho con la misma precisión que nuestras piezas.',
  copyright: `© ${new Date().getFullYear()} OMIO Atelier & Design`,
};
