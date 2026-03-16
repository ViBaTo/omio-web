export type MaterialCategory = 'Maderas' | 'Metales' | 'Piedras' | 'Textiles' | 'Acabados';

export interface Material {
  slug: string;
  name: string;
  category: MaterialCategory;
  description: string;
  longDescription: string;
  image: string;
  properties: { label: string; value: string }[];
  applications: string[];
  projects: string[]; // project slugs
  featured: boolean;
}

export const MATERIALS: Material[] = [
  // --- Maderas ---
  {
    slug: 'nogal-americano',
    name: 'Nogal Americano',
    category: 'Maderas',
    description: 'Madera noble de tonos cálidos oscuros, referencia en mobiliario de alta gama.',
    longDescription:
      'El nogal americano es una de las maderas más apreciadas en el mundo del diseño de interiores por su grano elegante y sus tonos chocolate profundos. En OMIO trabajamos con proveedores certificados FSC que garantizan la trazabilidad completa de cada tabla. Su estabilidad dimensional y su capacidad para recibir acabados de alta calidad la convierten en nuestra elección predilecta para proyectos hospitality.',
    image: '/images/materials/nogal-americano.jpg',
    properties: [
      { label: 'Origen', value: 'Norteamérica' },
      { label: 'Dureza Janka', value: '1.010 lbf' },
      { label: 'Densidad', value: '610 kg/m³' },
      { label: 'Certificación', value: 'FSC' },
    ],
    applications: ['Mobiliario de hotel', 'Panelados', 'Mesas de restaurante', 'Cabeceros'],
    projects: ['hotel-arts-barcelona'],
    featured: true,
  },
  {
    slug: 'roble-europeo',
    name: 'Roble Europeo',
    category: 'Maderas',
    description: 'Madera versátil y resistente, con veta pronunciada y gran durabilidad.',
    longDescription:
      'El roble europeo es sinónimo de durabilidad y elegancia atemporal. Su veta pronunciada y su capacidad para recibir diferentes tratamientos —desde blanqueado hasta ahumado— lo convierten en un material extraordinariamente versátil. Lo utilizamos tanto en su estado natural como tratado con técnicas tradicionales de envejecimiento.',
    image: '/images/materials/roble-europeo.jpg',
    properties: [
      { label: 'Origen', value: 'Europa Central' },
      { label: 'Dureza Janka', value: '1.290 lbf' },
      { label: 'Densidad', value: '710 kg/m³' },
      { label: 'Tratamientos', value: 'Natural, ahumado, blanqueado' },
    ],
    applications: ['Suelos', 'Mobiliario contract', 'Barras de bar', 'Revestimientos'],
    projects: ['four-seasons-madrid'],
    featured: true,
  },
  {
    slug: 'roble-blanqueado',
    name: 'Roble Blanqueado',
    category: 'Maderas',
    description: 'Roble tratado con técnica de blanqueo que aporta luminosidad y serenidad.',
    longDescription:
      'El roble blanqueado se obtiene mediante un proceso de tratamiento que aclara la madera sin perder la riqueza de su veta. Es ideal para espacios donde se busca transmitir calma y pureza, como spas y áreas wellness. Nuestro proceso de blanqueo es respetuoso con el medio ambiente y garantiza una tonalidad uniforme.',
    image: '/images/materials/roble-blanqueado.jpg',
    properties: [
      { label: 'Base', value: 'Roble Europeo' },
      { label: 'Proceso', value: 'Blanqueo ecológico' },
      { label: 'Acabado', value: 'Mate sedoso' },
      { label: 'Mantenimiento', value: 'Bajo' },
    ],
    applications: ['Spas', 'Áreas wellness', 'Mobiliario minimalista'],
    projects: ['mandarin-oriental'],
    featured: false,
  },
  {
    slug: 'ebano-macassar',
    name: 'Ébano Macassar',
    category: 'Maderas',
    description: 'Madera exótica de extrema belleza con veteado rayado negro y marrón.',
    longDescription:
      'El ébano Macassar es una de las maderas más lujosas del mundo, reconocida por su dramático veteado de líneas oscuras sobre fondo marrón dorado. Utilizamos exclusivamente ébano de plantaciones sostenibles y lo trabajamos con técnicas que maximizan el rendimiento de cada pieza, minimizando el desperdicio.',
    image: '/images/materials/ebano-macassar.jpg',
    properties: [
      { label: 'Origen', value: 'Indonesia (plantación sostenible)' },
      { label: 'Dureza Janka', value: '3.220 lbf' },
      { label: 'Densidad', value: '1.120 kg/m³' },
      { label: 'Acabado', value: 'Alto brillo natural' },
    ],
    applications: ['Mobiliario de lujo', 'Paneles decorativos', 'Detalles de acento'],
    projects: ['residencia-dubai'],
    featured: false,
  },
  {
    slug: 'teca-birmana',
    name: 'Teca Birmana',
    category: 'Maderas',
    description: 'La madera náutica por excelencia, resistente al agua y a la intemperie.',
    longDescription:
      'La teca birmana es el estándar de oro para mobiliario de exterior y entornos marinos. Su alto contenido en aceites naturales la hace excepcionalmente resistente al agua, la salinidad y los rayos UV. En OMIO la combinamos frecuentemente con metales navales para proyectos en entornos costeros.',
    image: '/images/materials/teca-birmana.jpg',
    properties: [
      { label: 'Origen', value: 'Myanmar (plantación certificada)' },
      { label: 'Resistencia', value: 'Marina / exterior' },
      { label: 'Densidad', value: '630 kg/m³' },
      { label: 'Vida útil exterior', value: '25+ años' },
    ],
    applications: ['Mobiliario náutico', 'Terrazas', 'Cubiertas', 'Yates'],
    projects: ['yacht-club-monaco'],
    featured: true,
  },
  {
    slug: 'olivo-mediterraneo',
    name: 'Olivo Mediterráneo',
    category: 'Maderas',
    description: 'Madera de olivo con veta irregular y carácter único en cada pieza.',
    longDescription:
      'La madera de olivo es una celebración de la imperfección. Cada pieza tiene un grano único, nudos orgánicos y variaciones de color que van del dorado al ámbar oscuro. En OMIO seleccionamos madera de olivos centenarios que ya no producen fruto, dándoles una segunda vida como piezas de mobiliario únicas.',
    image: '/images/materials/olivo-mediterraneo.jpg',
    properties: [
      { label: 'Origen', value: 'Mediterráneo' },
      { label: 'Carácter', value: 'Veta única por pieza' },
      { label: 'Densidad', value: '990 kg/m³' },
      { label: 'Sostenibilidad', value: 'Olivos no productivos' },
    ],
    applications: ['Mesas de restaurante', 'Piezas escultóricas', 'Marquetería'],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },
  {
    slug: 'madera-recuperada',
    name: 'Madera Recuperada',
    category: 'Maderas',
    description: 'Maderas rescatadas de embarcaciones, edificios y estructuras históricas.',
    longDescription:
      'Nuestra madera recuperada proviene de barcos pesqueros retirados, vigas de edificios históricos y estructuras portuarias del Mediterráneo. Cada pieza lleva consigo décadas de historia y una pátina imposible de replicar. Aplicamos un riguroso proceso de selección, saneamiento y estabilización que preserva el carácter original.',
    image: '/images/materials/madera-recuperada.jpg',
    properties: [
      { label: 'Origen', value: 'Puertos del Mediterráneo' },
      { label: 'Proceso', value: 'Selección, saneamiento, estabilización' },
      { label: 'Carácter', value: 'Irrepetible' },
      { label: 'Sostenibilidad', value: 'Economía circular' },
    ],
    applications: ['Mesas de restaurante', 'Piezas de acento', 'Revestimientos'],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },

  // --- Metales ---
  {
    slug: 'laton-envejecido',
    name: 'Latón Envejecido',
    category: 'Metales',
    description: 'Latón con pátina controlada que aporta calidez y carácter artesanal.',
    longDescription:
      'El latón envejecido es uno de nuestros materiales insignia. Aplicamos técnicas de patinado controlado que aceleran el proceso natural de oxidación, consiguiendo tonos que van del dorado cálido al bronce profundo. Cada pieza desarrolla una pátina única que evoluciona con el tiempo.',
    image: '/images/materials/laton-envejecido.jpg',
    properties: [
      { label: 'Composición', value: 'Cu 65% / Zn 35%' },
      { label: 'Acabado', value: 'Patinado artesanal' },
      { label: 'Sellado', value: 'Cera microcristalina' },
      { label: 'Evolución', value: 'Pátina viva' },
    ],
    applications: ['Tiradores', 'Detalles decorativos', 'Perfilería', 'Lámparas'],
    projects: ['hotel-arts-barcelona'],
    featured: true,
  },
  {
    slug: 'laton-pulido',
    name: 'Latón Pulido',
    category: 'Metales',
    description: 'Latón con acabado espejo de alta reflectividad y brillo dorado intenso.',
    longDescription:
      'El latón pulido ofrece una superficie reflectante de brillo cálido que eleva cualquier espacio. En OMIO aplicamos un proceso de pulido en múltiples fases seguido de un lacado protector que mantiene el brillo durante años. Es nuestra elección para detalles que necesitan brillar sin resultar fríos.',
    image: '/images/materials/laton-pulido.jpg',
    properties: [
      { label: 'Acabado', value: 'Espejo' },
      { label: 'Protección', value: 'Lacado PU transparente' },
      { label: 'Mantenimiento', value: 'Bajo' },
      { label: 'Reflectividad', value: 'Alta' },
    ],
    applications: ['Barras de bar', 'Marcos', 'Mobiliario de acento', 'Iluminación'],
    projects: ['four-seasons-madrid'],
    featured: false,
  },
  {
    slug: 'acero-inoxidable',
    name: 'Acero Inoxidable',
    category: 'Metales',
    description: 'Acero de grado alimentario y naval para aplicaciones de máxima exigencia.',
    longDescription:
      'Trabajamos con acero inoxidable AISI 316L, el estándar para entornos marinos y alimentarios. Su resistencia a la corrosión y su versatilidad de acabados (satinado, espejo, cepillado) lo convierten en un material fundamental para proyectos de contract y exterior.',
    image: '/images/materials/acero-inoxidable.jpg',
    properties: [
      { label: 'Grado', value: 'AISI 316L' },
      { label: 'Resistencia', value: 'Marina y alimentaria' },
      { label: 'Acabados', value: 'Satinado, espejo, cepillado' },
      { label: 'Reciclabilidad', value: '100%' },
    ],
    applications: ['Mobiliario náutico', 'Cocinas profesionales', 'Estructura', 'Exterior'],
    projects: ['mandarin-oriental', 'yacht-club-monaco'],
    featured: false,
  },
  {
    slug: 'acero-negro',
    name: 'Acero al Carbono Negro',
    category: 'Metales',
    description: 'Acero con acabado negro mate para estructuras de carácter industrial refinado.',
    longDescription:
      'El acero al carbono con acabado en negro mate aporta presencia y definición estructural sin competir con los materiales nobles que lo rodean. Lo utilizamos como esqueleto visible en mesas, estanterías y estructuras donde queremos celebrar la honestidad constructiva.',
    image: '/images/materials/acero-negro.jpg',
    properties: [
      { label: 'Acabado', value: 'Pintura epoxi negro mate' },
      { label: 'Espesor', value: 'Variable según proyecto' },
      { label: 'Protección', value: 'Anti-corrosión' },
      { label: 'Tacto', value: 'Suave, aterciopelado' },
    ],
    applications: ['Estructuras de mesa', 'Estanterías', 'Marcos', 'Bases'],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },
  {
    slug: 'acero-oro-rosa',
    name: 'Acero con Acabado Oro Rosa',
    category: 'Metales',
    description: 'Acero inoxidable con recubrimiento PVD en tono oro rosa.',
    longDescription:
      'El acabado oro rosa se consigue mediante deposición física de vapor (PVD) sobre acero inoxidable, creando una capa extremadamente resistente de color cálido y sofisticado. Es un acabado que aporta lujo contemporáneo sin la frialdad del cromo ni la obviedad del dorado.',
    image: '/images/materials/acero-oro-rosa.jpg',
    properties: [
      { label: 'Base', value: 'Acero inoxidable 316L' },
      { label: 'Recubrimiento', value: 'PVD oro rosa' },
      { label: 'Dureza', value: '2.000 HV' },
      { label: 'Durabilidad', value: 'Permanente' },
    ],
    applications: ['Detalles de lujo', 'Tiradores', 'Perfilería', 'Mobiliario residencial'],
    projects: ['residencia-dubai'],
    featured: false,
  },
  {
    slug: 'aluminio-naval',
    name: 'Aluminio Naval',
    category: 'Metales',
    description: 'Aleación de aluminio de grado marino, ligera y resistente a la corrosión.',
    longDescription:
      'El aluminio naval (aleación 5083) es nuestra elección para proyectos de exterior y entornos marinos donde se necesita combinar ligereza con resistencia extrema a la corrosión. Lo anodizamos con colores personalizados que mantienen su aspecto durante décadas.',
    image: '/images/materials/aluminio-naval.jpg',
    properties: [
      { label: 'Aleación', value: '5083 / 6082' },
      { label: 'Acabado', value: 'Anodizado personalizado' },
      { label: 'Peso', value: '2.66 g/cm³ (ligero)' },
      { label: 'Resistencia', value: 'Marina certificada' },
    ],
    applications: ['Mobiliario de exterior', 'Náutica', 'Estructuras ligeras'],
    projects: ['yacht-club-monaco'],
    featured: false,
  },

  // --- Piedras ---
  {
    slug: 'marmol-calacatta',
    name: 'Mármol Calacatta',
    category: 'Piedras',
    description: 'El mármol más exclusivo del mundo, con vetas doradas sobre fondo blanco.',
    longDescription:
      'El mármol Calacatta, extraído exclusivamente de las canteras de Carrara, es sinónimo de lujo absoluto. Sus vetas doradas y grises sobre un fondo blanco puro lo hacen inconfundible. En OMIO lo utilizamos con máximo respeto, seleccionando cada plancha personalmente en cantera para garantizar la continuidad del veteado.',
    image: '/images/materials/marmol-calacatta.jpg',
    properties: [
      { label: 'Origen', value: 'Carrara, Italia' },
      { label: 'Tipo', value: 'Mármol metamórfico' },
      { label: 'Acabado', value: 'Pulido, apomazado, bruto' },
      { label: 'Selección', value: 'En cantera, por plancha' },
    ],
    applications: ['Encimeras', 'Revestimientos', 'Mesas', 'Baños de lujo'],
    projects: ['hotel-arts-barcelona', 'residencia-dubai'],
    featured: true,
  },
  {
    slug: 'marmol-verde-guatemala',
    name: 'Mármol Verde Guatemala',
    category: 'Piedras',
    description: 'Mármol de tonos verdes profundos con vetas blancas, de gran dramatismo visual.',
    longDescription:
      'El Verde Guatemala es un mármol de serpentina que cautiva por su color verde intenso y sus vetas blancas irregulares. Cada plancha es una composición abstracta natural. Lo utilizamos en barras de bar, mostradores y piezas de acento donde se busca un impacto visual potente y sofisticado.',
    image: '/images/materials/marmol-verde-guatemala.jpg',
    properties: [
      { label: 'Origen', value: 'India' },
      { label: 'Tipo', value: 'Serpentina' },
      { label: 'Acabado', value: 'Pulido alto brillo' },
      { label: 'Carácter', value: 'Altamente decorativo' },
    ],
    applications: ['Barras de bar', 'Mostradores', 'Piezas de acento'],
    projects: ['four-seasons-madrid'],
    featured: false,
  },
  {
    slug: 'piedra-caliza',
    name: 'Piedra Caliza',
    category: 'Piedras',
    description: 'Piedra natural de tacto suave y aspecto sereno, ideal para espacios de calma.',
    longDescription:
      'La piedra caliza que utilizamos proviene de canteras seleccionadas del Mediterráneo. Su textura porosa y su gama de tonos neutros —desde el blanco hueso hasta el gris perla— la hacen perfecta para crear ambientes de serenidad. Su tacto suave y cálido contrasta con la frialdad de otros materiales pétreos.',
    image: '/images/materials/piedra-caliza.jpg',
    properties: [
      { label: 'Origen', value: 'Mediterráneo' },
      { label: 'Acabado', value: 'Apomazado, bush-hammered' },
      { label: 'Tacto', value: 'Suave y cálido' },
      { label: 'Uso', value: 'Interior' },
    ],
    applications: ['Spas', 'Baños', 'Revestimientos interiores', 'Encimeras'],
    projects: ['mandarin-oriental'],
    featured: false,
  },

  // --- Textiles ---
  {
    slug: 'lino-natural',
    name: 'Lino Natural',
    category: 'Textiles',
    description: 'Fibra natural de tacto fresco y aspecto orgánico, cultivada sin pesticidas.',
    longDescription:
      'El lino es la fibra textil más antigua y sostenible. Trabajamos con lino europeo certificado MASTERS OF LINEN, cultivado sin irrigación ni pesticidas. Su textura ligeramente irregular y su caída natural aportan calidez orgánica a las tapicerías y complementan la madera y la piedra.',
    image: '/images/materials/lino-natural.jpg',
    properties: [
      { label: 'Certificación', value: 'Masters of Linen' },
      { label: 'Origen', value: 'Europa (Francia/Bélgica)' },
      { label: 'Sostenibilidad', value: 'Sin pesticidas, sin riego' },
      { label: 'Tacto', value: 'Fresco, orgánico' },
    ],
    applications: ['Tapicería', 'Cortinas', 'Cabeceros', 'Cojines'],
    projects: ['hotel-arts-barcelona', 'mandarin-oriental'],
    featured: true,
  },
  {
    slug: 'terciopelo-italiano',
    name: 'Terciopelo Italiano',
    category: 'Textiles',
    description: 'Terciopelo de algodón de alta densidad con tacto ultra suave.',
    longDescription:
      'Nuestro terciopelo proviene de los mejores telares de Como, Italia. Con una densidad de pelo excepcional, ofrece una profundidad de color y un tacto que no se encuentra en ningún otro textil. Es la elección perfecta para sillas de comedor, sofás y cabeceros donde se busca opulencia contenida.',
    image: '/images/materials/terciopelo-italiano.jpg',
    properties: [
      { label: 'Origen', value: 'Como, Italia' },
      { label: 'Composición', value: '100% Algodón' },
      { label: 'Martindale', value: '50.000+ ciclos' },
      { label: 'Ancho', value: '140 cm' },
    ],
    applications: ['Sillas de comedor', 'Sofás', 'Cabeceros', 'Paneles acústicos'],
    projects: ['four-seasons-madrid'],
    featured: false,
  },
  {
    slug: 'cuero-natural',
    name: 'Cuero Natural',
    category: 'Textiles',
    description: 'Cuero de curtición vegetal, con pátina que mejora con el uso.',
    longDescription:
      'Trabajamos exclusivamente con cuero de curtición vegetal, un proceso tradicional que utiliza extractos de corteza de árbol en lugar de cromo. Este cuero desarrolla una pátina rica con el uso, volviéndose más bello con el tiempo. Cada pieza es única y cuenta la historia de su uso.',
    image: '/images/materials/cuero-natural.jpg',
    properties: [
      { label: 'Curtición', value: 'Vegetal (sin cromo)' },
      { label: 'Origen', value: 'Toscana, Italia' },
      { label: 'Espesor', value: '1.2 - 1.4 mm' },
      { label: 'Pátina', value: 'Evoluciona con el uso' },
    ],
    applications: ['Asientos', 'Tiradores', 'Detalles de acento', 'Escritorios'],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },
  {
    slug: 'seda-natural',
    name: 'Seda Natural',
    category: 'Textiles',
    description: 'Seda de morera para aplicaciones decorativas de máximo lujo.',
    longDescription:
      'La seda natural que utilizamos proviene de talleres artesanales de India que mantienen las técnicas tradicionales de tejido. Su brillo inimitable y su tacto incomparable la reservamos para proyectos residenciales de ultra-lujo donde cada detalle debe ser extraordinario.',
    image: '/images/materials/seda-natural.jpg',
    properties: [
      { label: 'Tipo', value: 'Seda de morera' },
      { label: 'Origen', value: 'India (tejido artesanal)' },
      { label: 'Uso', value: 'Decorativo / Interior controlado' },
      { label: 'Brillo', value: 'Natural, incomparable' },
    ],
    applications: ['Paneles decorativos', 'Cabeceros', 'Cojines de lujo'],
    projects: ['residencia-dubai'],
    featured: false,
  },
  {
    slug: 'tejido-nautico',
    name: 'Tejido Náutico',
    category: 'Textiles',
    description: 'Textil técnico de grado marino, resistente a UV, salinidad y moho.',
    longDescription:
      'Los tejidos náuticos que utilizamos cumplen los más altos estándares de resistencia marina. Mantienen su color y textura tras años de exposición solar directa y ambiente salino. Disponibles en una paleta de colores diseñada para complementar la madera y el metal en entornos costeros.',
    image: '/images/materials/tejido-nautico.jpg',
    properties: [
      { label: 'Resistencia UV', value: '2.000+ horas' },
      { label: 'Impermeabilidad', value: 'Sí' },
      { label: 'Anti-moho', value: 'Tratamiento integral' },
      { label: 'Limpieza', value: 'Agua y jabón' },
    ],
    applications: ['Tapicería de exterior', 'Náutica', 'Cojines de terraza'],
    projects: ['yacht-club-monaco'],
    featured: false,
  },
];

export const MATERIAL_CATEGORIES: MaterialCategory[] = ['Maderas', 'Metales', 'Piedras', 'Textiles', 'Acabados'];

export function getMaterialBySlug(slug: string): Material | undefined {
  return MATERIALS.find((m) => m.slug === slug);
}

export function getMaterialsByCategory(category: MaterialCategory): Material[] {
  return MATERIALS.filter((m) => m.category === category);
}

export function getFeaturedMaterials(): Material[] {
  return MATERIALS.filter((m) => m.featured);
}

export function getMaterialsForProject(projectSlug: string): Material[] {
  return MATERIALS.filter((m) => m.projects.includes(projectSlug));
}
