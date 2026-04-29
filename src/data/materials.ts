import type { Locale } from '@/i18n/routing';

type LocalizedString = { es: string; en: string };

/** Canonical category key. Display name comes from messages.materialCategories[key]. */
export type MaterialCategory = 'Maderas' | 'Metales' | 'Piedras' | 'Textiles' | 'Acabados';

interface MaterialI18n {
  slug: string;
  name: LocalizedString;
  category: MaterialCategory;
  description: LocalizedString;
  longDescription: LocalizedString;
  image: string;
  properties: { label: LocalizedString; value: LocalizedString }[];
  applications: LocalizedString[];
  projects: string[]; // project slugs
  featured: boolean;
}

export interface Material {
  slug: string;
  name: string;
  category: MaterialCategory;
  description: string;
  longDescription: string;
  image: string;
  properties: { label: string; value: string }[];
  applications: string[];
  projects: string[];
  featured: boolean;
}

const MATERIALS_RAW: MaterialI18n[] = [
  // --- Maderas ---
  {
    slug: 'nogal-americano',
    name: { es: 'Nogal Americano', en: 'American Walnut' },
    category: 'Maderas',
    description: {
      es: 'Madera noble de tonos cálidos oscuros, referencia en mobiliario de alta gama.',
      en: 'A noble wood with warm dark tones, a reference in high-end furniture.',
    },
    longDescription: {
      es: 'El nogal americano es una de las maderas más apreciadas en el mundo del diseño de interiores por su grano elegante y sus tonos chocolate profundos. En OMIO trabajamos con proveedores certificados FSC que garantizan la trazabilidad completa de cada tabla. Su estabilidad dimensional y su capacidad para recibir acabados de alta calidad la convierten en nuestra elección predilecta para proyectos hospitality.',
      en: 'American walnut is one of the most appreciated woods in interior design for its elegant grain and deep chocolate tones. At OMIO we work with FSC-certified suppliers that guarantee full traceability of every board. Its dimensional stability and its ability to receive high-quality finishes make it our favorite choice for hospitality projects.',
    },
    image: '/images/materials/nogal-americano.jpg',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Norteamérica', en: 'North America' } },
      { label: { es: 'Dureza Janka', en: 'Janka hardness' }, value: { es: '1.010 lbf', en: '1,010 lbf' } },
      { label: { es: 'Densidad', en: 'Density' }, value: { es: '610 kg/m³', en: '610 kg/m³' } },
      { label: { es: 'Certificación', en: 'Certification' }, value: { es: 'FSC', en: 'FSC' } },
    ],
    applications: [
      { es: 'Mobiliario de hotel', en: 'Hotel furniture' },
      { es: 'Panelados', en: 'Wall paneling' },
      { es: 'Mesas de restaurante', en: 'Restaurant tables' },
      { es: 'Cabeceros', en: 'Headboards' },
    ],
    projects: ['hotel-arts-barcelona'],
    featured: true,
  },
  {
    slug: 'roble-europeo',
    name: { es: 'Roble Europeo', en: 'European Oak' },
    category: 'Maderas',
    description: {
      es: 'Madera versátil y resistente, con veta pronunciada y gran durabilidad.',
      en: 'A versatile, resistant wood with pronounced grain and great durability.',
    },
    longDescription: {
      es: 'El roble europeo es sinónimo de durabilidad y elegancia atemporal. Su veta pronunciada y su capacidad para recibir diferentes tratamientos —desde blanqueado hasta ahumado— lo convierten en un material extraordinariamente versátil. Lo utilizamos tanto en su estado natural como tratado con técnicas tradicionales de envejecimiento.',
      en: 'European oak is a synonym of durability and timeless elegance. Its pronounced grain and its ability to receive different treatments —from bleaching to smoking— make it an extraordinarily versatile material. We use it both in its natural state and treated with traditional aging techniques.',
    },
    image: '/images/materials/roble-europeo.jpg',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Europa Central', en: 'Central Europe' } },
      { label: { es: 'Dureza Janka', en: 'Janka hardness' }, value: { es: '1.290 lbf', en: '1,290 lbf' } },
      { label: { es: 'Densidad', en: 'Density' }, value: { es: '710 kg/m³', en: '710 kg/m³' } },
      {
        label: { es: 'Tratamientos', en: 'Treatments' },
        value: { es: 'Natural, ahumado, blanqueado', en: 'Natural, smoked, bleached' },
      },
    ],
    applications: [
      { es: 'Suelos', en: 'Flooring' },
      { es: 'Mobiliario contract', en: 'Contract furniture' },
      { es: 'Barras de bar', en: 'Bar counters' },
      { es: 'Revestimientos', en: 'Wall claddings' },
    ],
    projects: ['four-seasons-madrid'],
    featured: true,
  },
  {
    slug: 'roble-blanqueado',
    name: { es: 'Roble Blanqueado', en: 'Bleached Oak' },
    category: 'Maderas',
    description: {
      es: 'Roble tratado con técnica de blanqueo que aporta luminosidad y serenidad.',
      en: 'Oak treated with a bleaching technique that brings luminosity and calm.',
    },
    longDescription: {
      es: 'El roble blanqueado se obtiene mediante un proceso de tratamiento que aclara la madera sin perder la riqueza de su veta. Es ideal para espacios donde se busca transmitir calma y pureza, como spas y áreas wellness. Nuestro proceso de blanqueo es respetuoso con el medio ambiente y garantiza una tonalidad uniforme.',
      en: 'Bleached oak is obtained through a treatment process that lightens the wood without losing the richness of its grain. It is ideal for spaces meant to convey calm and purity, such as spas and wellness areas. Our bleaching process is environmentally respectful and guarantees a uniform tone.',
    },
    image: '/images/materials/roble-blanqueado.jpg',
    properties: [
      { label: { es: 'Base', en: 'Base' }, value: { es: 'Roble Europeo', en: 'European Oak' } },
      { label: { es: 'Proceso', en: 'Process' }, value: { es: 'Blanqueo ecológico', en: 'Eco-friendly bleaching' } },
      { label: { es: 'Acabado', en: 'Finish' }, value: { es: 'Mate sedoso', en: 'Silky matte' } },
      { label: { es: 'Mantenimiento', en: 'Maintenance' }, value: { es: 'Bajo', en: 'Low' } },
    ],
    applications: [
      { es: 'Spas', en: 'Spas' },
      { es: 'Áreas wellness', en: 'Wellness areas' },
      { es: 'Mobiliario minimalista', en: 'Minimalist furniture' },
    ],
    projects: ['mandarin-oriental'],
    featured: false,
  },
  {
    slug: 'ebano-macassar',
    name: { es: 'Ébano Macassar', en: 'Macassar Ebony' },
    category: 'Maderas',
    description: {
      es: 'Madera exótica de extrema belleza con veteado rayado negro y marrón.',
      en: 'An exotic wood of extreme beauty with striped black and brown veining.',
    },
    longDescription: {
      es: 'El ébano Macassar es una de las maderas más lujosas del mundo, reconocida por su dramático veteado de líneas oscuras sobre fondo marrón dorado. Utilizamos exclusivamente ébano de plantaciones sostenibles y lo trabajamos con técnicas que maximizan el rendimiento de cada pieza, minimizando el desperdicio.',
      en: 'Macassar ebony is one of the most luxurious woods in the world, recognized for its dramatic dark-line veining over a golden brown background. We exclusively use ebony from sustainable plantations and work it with techniques that maximize the yield of each piece, minimizing waste.',
    },
    image: '/images/materials/ebano-macassar.jpg',
    properties: [
      {
        label: { es: 'Origen', en: 'Origin' },
        value: { es: 'Indonesia (plantación sostenible)', en: 'Indonesia (sustainable plantation)' },
      },
      { label: { es: 'Dureza Janka', en: 'Janka hardness' }, value: { es: '3.220 lbf', en: '3,220 lbf' } },
      { label: { es: 'Densidad', en: 'Density' }, value: { es: '1.120 kg/m³', en: '1,120 kg/m³' } },
      { label: { es: 'Acabado', en: 'Finish' }, value: { es: 'Alto brillo natural', en: 'Natural high gloss' } },
    ],
    applications: [
      { es: 'Mobiliario de lujo', en: 'Luxury furniture' },
      { es: 'Paneles decorativos', en: 'Decorative panels' },
      { es: 'Detalles de acento', en: 'Accent details' },
    ],
    projects: ['residencia-dubai'],
    featured: false,
  },
  {
    slug: 'teca-birmana',
    name: { es: 'Teca Birmana', en: 'Burmese Teak' },
    category: 'Maderas',
    description: {
      es: 'La madera náutica por excelencia, resistente al agua y a la intemperie.',
      en: 'The nautical wood par excellence, resistant to water and weather.',
    },
    longDescription: {
      es: 'La teca birmana es el estándar de oro para mobiliario de exterior y entornos marinos. Su alto contenido en aceites naturales la hace excepcionalmente resistente al agua, la salinidad y los rayos UV. En OMIO la combinamos frecuentemente con metales navales para proyectos en entornos costeros.',
      en: 'Burmese teak is the gold standard for outdoor furniture and marine environments. Its high content of natural oils makes it exceptionally resistant to water, salinity, and UV rays. At OMIO we frequently combine it with naval metals for projects in coastal environments.',
    },
    image: '/images/materials/teca-birmana.jpg',
    properties: [
      {
        label: { es: 'Origen', en: 'Origin' },
        value: { es: 'Myanmar (plantación certificada)', en: 'Myanmar (certified plantation)' },
      },
      { label: { es: 'Resistencia', en: 'Resistance' }, value: { es: 'Marina / exterior', en: 'Marine / outdoor' } },
      { label: { es: 'Densidad', en: 'Density' }, value: { es: '630 kg/m³', en: '630 kg/m³' } },
      {
        label: { es: 'Vida útil exterior', en: 'Outdoor lifespan' },
        value: { es: '25+ años', en: '25+ years' },
      },
    ],
    applications: [
      { es: 'Mobiliario náutico', en: 'Marine furniture' },
      { es: 'Terrazas', en: 'Terraces' },
      { es: 'Cubiertas', en: 'Decks' },
      { es: 'Yates', en: 'Yachts' },
    ],
    projects: ['yacht-club-monaco'],
    featured: true,
  },
  {
    slug: 'olivo-mediterraneo',
    name: { es: 'Olivo Mediterráneo', en: 'Mediterranean Olive' },
    category: 'Maderas',
    description: {
      es: 'Madera de olivo con veta irregular y carácter único en cada pieza.',
      en: 'Olive wood with irregular grain and a unique character in every piece.',
    },
    longDescription: {
      es: 'La madera de olivo es una celebración de la imperfección. Cada pieza tiene un grano único, nudos orgánicos y variaciones de color que van del dorado al ámbar oscuro. En OMIO seleccionamos madera de olivos centenarios que ya no producen fruto, dándoles una segunda vida como piezas de mobiliario únicas.',
      en: 'Olive wood is a celebration of imperfection. Every piece has a unique grain, organic knots, and color variations that range from golden to dark amber. At OMIO we select wood from centuries-old olive trees that no longer bear fruit, giving them a second life as unique furniture pieces.',
    },
    image: '/images/materials/olivo-mediterraneo.jpg',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Mediterráneo', en: 'Mediterranean' } },
      {
        label: { es: 'Carácter', en: 'Character' },
        value: { es: 'Veta única por pieza', en: 'Unique grain per piece' },
      },
      { label: { es: 'Densidad', en: 'Density' }, value: { es: '990 kg/m³', en: '990 kg/m³' } },
      {
        label: { es: 'Sostenibilidad', en: 'Sustainability' },
        value: { es: 'Olivos no productivos', en: 'Non-productive olive trees' },
      },
    ],
    applications: [
      { es: 'Mesas de restaurante', en: 'Restaurant tables' },
      { es: 'Piezas escultóricas', en: 'Sculptural pieces' },
      { es: 'Marquetería', en: 'Marquetry' },
    ],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },
  {
    slug: 'madera-recuperada',
    name: { es: 'Madera Recuperada', en: 'Reclaimed Wood' },
    category: 'Maderas',
    description: {
      es: 'Maderas rescatadas de embarcaciones, edificios y estructuras históricas.',
      en: 'Wood reclaimed from boats, buildings, and historic structures.',
    },
    longDescription: {
      es: 'Nuestra madera recuperada proviene de barcos pesqueros retirados, vigas de edificios históricos y estructuras portuarias del Mediterráneo. Cada pieza lleva consigo décadas de historia y una pátina imposible de replicar. Aplicamos un riguroso proceso de selección, saneamiento y estabilización que preserva el carácter original.',
      en: 'Our reclaimed wood comes from retired fishing boats, beams of historic buildings, and harbor structures of the Mediterranean. Every piece carries decades of history and a patina that is impossible to replicate. We apply a rigorous process of selection, sanitization, and stabilization that preserves the original character.',
    },
    image: '/images/materials/madera-recuperada.jpg',
    properties: [
      {
        label: { es: 'Origen', en: 'Origin' },
        value: { es: 'Puertos del Mediterráneo', en: 'Mediterranean harbors' },
      },
      {
        label: { es: 'Proceso', en: 'Process' },
        value: { es: 'Selección, saneamiento, estabilización', en: 'Selection, sanitization, stabilization' },
      },
      { label: { es: 'Carácter', en: 'Character' }, value: { es: 'Irrepetible', en: 'Unrepeatable' } },
      {
        label: { es: 'Sostenibilidad', en: 'Sustainability' },
        value: { es: 'Economía circular', en: 'Circular economy' },
      },
    ],
    applications: [
      { es: 'Mesas de restaurante', en: 'Restaurant tables' },
      { es: 'Piezas de acento', en: 'Accent pieces' },
      { es: 'Revestimientos', en: 'Claddings' },
    ],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },

  // --- Metales ---
  {
    slug: 'laton-envejecido',
    name: { es: 'Latón Envejecido', en: 'Aged Brass' },
    category: 'Metales',
    description: {
      es: 'Latón con pátina controlada que aporta calidez y carácter artesanal.',
      en: 'Brass with a controlled patina that brings warmth and craft character.',
    },
    longDescription: {
      es: 'El latón envejecido es uno de nuestros materiales insignia. Aplicamos técnicas de patinado controlado que aceleran el proceso natural de oxidación, consiguiendo tonos que van del dorado cálido al bronce profundo. Cada pieza desarrolla una pátina única que evoluciona con el tiempo.',
      en: 'Aged brass is one of our signature materials. We apply controlled patination techniques that accelerate the natural oxidation process, achieving tones that range from warm gold to deep bronze. Every piece develops a unique patina that evolves over time.',
    },
    image: '/images/materials/laton-envejecido.jpg',
    properties: [
      { label: { es: 'Composición', en: 'Composition' }, value: { es: 'Cu 65% / Zn 35%', en: 'Cu 65% / Zn 35%' } },
      { label: { es: 'Acabado', en: 'Finish' }, value: { es: 'Patinado artesanal', en: 'Artisan patina' } },
      { label: { es: 'Sellado', en: 'Sealing' }, value: { es: 'Cera microcristalina', en: 'Microcrystalline wax' } },
      { label: { es: 'Evolución', en: 'Evolution' }, value: { es: 'Pátina viva', en: 'Living patina' } },
    ],
    applications: [
      { es: 'Tiradores', en: 'Handles' },
      { es: 'Detalles decorativos', en: 'Decorative details' },
      { es: 'Perfilería', en: 'Profiles' },
      { es: 'Lámparas', en: 'Lamps' },
    ],
    projects: ['hotel-arts-barcelona'],
    featured: true,
  },
  {
    slug: 'laton-pulido',
    name: { es: 'Latón Pulido', en: 'Polished Brass' },
    category: 'Metales',
    description: {
      es: 'Latón con acabado espejo de alta reflectividad y brillo dorado intenso.',
      en: 'Brass with a high-reflectivity mirror finish and intense golden shine.',
    },
    longDescription: {
      es: 'El latón pulido ofrece una superficie reflectante de brillo cálido que eleva cualquier espacio. En OMIO aplicamos un proceso de pulido en múltiples fases seguido de un lacado protector que mantiene el brillo durante años. Es nuestra elección para detalles que necesitan brillar sin resultar fríos.',
      en: 'Polished brass offers a reflective surface with a warm shine that elevates any space. At OMIO we apply a multi-stage polishing process followed by a protective lacquer that keeps the shine for years. It is our choice for details that need to shine without feeling cold.',
    },
    image: '/images/materials/laton-pulido.jpg',
    properties: [
      { label: { es: 'Acabado', en: 'Finish' }, value: { es: 'Espejo', en: 'Mirror' } },
      {
        label: { es: 'Protección', en: 'Protection' },
        value: { es: 'Lacado PU transparente', en: 'Clear PU lacquer' },
      },
      { label: { es: 'Mantenimiento', en: 'Maintenance' }, value: { es: 'Bajo', en: 'Low' } },
      { label: { es: 'Reflectividad', en: 'Reflectivity' }, value: { es: 'Alta', en: 'High' } },
    ],
    applications: [
      { es: 'Barras de bar', en: 'Bar counters' },
      { es: 'Marcos', en: 'Frames' },
      { es: 'Mobiliario de acento', en: 'Accent furniture' },
      { es: 'Iluminación', en: 'Lighting' },
    ],
    projects: ['four-seasons-madrid'],
    featured: false,
  },
  {
    slug: 'acero-inoxidable',
    name: { es: 'Acero Inoxidable', en: 'Stainless Steel' },
    category: 'Metales',
    description: {
      es: 'Acero de grado alimentario y naval para aplicaciones de máxima exigencia.',
      en: 'Food-grade and marine-grade steel for the most demanding applications.',
    },
    longDescription: {
      es: 'Trabajamos con acero inoxidable AISI 316L, el estándar para entornos marinos y alimentarios. Su resistencia a la corrosión y su versatilidad de acabados (satinado, espejo, cepillado) lo convierten en un material fundamental para proyectos de contract y exterior.',
      en: 'We work with AISI 316L stainless steel, the standard for marine and food environments. Its corrosion resistance and finish versatility (satin, mirror, brushed) make it a fundamental material for contract and outdoor projects.',
    },
    image: '/images/materials/acero-inoxidable.jpg',
    properties: [
      { label: { es: 'Grado', en: 'Grade' }, value: { es: 'AISI 316L', en: 'AISI 316L' } },
      {
        label: { es: 'Resistencia', en: 'Resistance' },
        value: { es: 'Marina y alimentaria', en: 'Marine and food-grade' },
      },
      {
        label: { es: 'Acabados', en: 'Finishes' },
        value: { es: 'Satinado, espejo, cepillado', en: 'Satin, mirror, brushed' },
      },
      { label: { es: 'Reciclabilidad', en: 'Recyclability' }, value: { es: '100%', en: '100%' } },
    ],
    applications: [
      { es: 'Mobiliario náutico', en: 'Marine furniture' },
      { es: 'Cocinas profesionales', en: 'Professional kitchens' },
      { es: 'Estructura', en: 'Structure' },
      { es: 'Exterior', en: 'Outdoor' },
    ],
    projects: ['mandarin-oriental', 'yacht-club-monaco'],
    featured: false,
  },
  {
    slug: 'acero-negro',
    name: { es: 'Acero al Carbono Negro', en: 'Black Carbon Steel' },
    category: 'Metales',
    description: {
      es: 'Acero con acabado negro mate para estructuras de carácter industrial refinado.',
      en: 'Steel with a matte black finish for refined industrial structures.',
    },
    longDescription: {
      es: 'El acero al carbono con acabado en negro mate aporta presencia y definición estructural sin competir con los materiales nobles que lo rodean. Lo utilizamos como esqueleto visible en mesas, estanterías y estructuras donde queremos celebrar la honestidad constructiva.',
      en: 'Carbon steel with a matte black finish adds presence and structural definition without competing with the noble materials around it. We use it as visible skeleton in tables, shelves, and structures where we want to celebrate constructive honesty.',
    },
    image: '/images/materials/acero-negro.jpg',
    properties: [
      {
        label: { es: 'Acabado', en: 'Finish' },
        value: { es: 'Pintura epoxi negro mate', en: 'Matte black epoxy paint' },
      },
      {
        label: { es: 'Espesor', en: 'Thickness' },
        value: { es: 'Variable según proyecto', en: 'Variable per project' },
      },
      { label: { es: 'Protección', en: 'Protection' }, value: { es: 'Anti-corrosión', en: 'Anti-corrosion' } },
      { label: { es: 'Tacto', en: 'Touch' }, value: { es: 'Suave, aterciopelado', en: 'Soft, velvety' } },
    ],
    applications: [
      { es: 'Estructuras de mesa', en: 'Table structures' },
      { es: 'Estanterías', en: 'Shelving' },
      { es: 'Marcos', en: 'Frames' },
      { es: 'Bases', en: 'Bases' },
    ],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },
  {
    slug: 'acero-oro-rosa',
    name: { es: 'Acero con Acabado Oro Rosa', en: 'Rose Gold Finish Steel' },
    category: 'Metales',
    description: {
      es: 'Acero inoxidable con recubrimiento PVD en tono oro rosa.',
      en: 'Stainless steel with a rose gold PVD coating.',
    },
    longDescription: {
      es: 'El acabado oro rosa se consigue mediante deposición física de vapor (PVD) sobre acero inoxidable, creando una capa extremadamente resistente de color cálido y sofisticado. Es un acabado que aporta lujo contemporáneo sin la frialdad del cromo ni la obviedad del dorado.',
      en: 'The rose gold finish is achieved through physical vapor deposition (PVD) on stainless steel, creating an extremely resistant layer of warm, sophisticated color. It is a finish that brings contemporary luxury without the coldness of chrome or the obviousness of gold.',
    },
    image: '/images/materials/acero-oro-rosa.jpg',
    properties: [
      { label: { es: 'Base', en: 'Base' }, value: { es: 'Acero inoxidable 316L', en: 'Stainless steel 316L' } },
      { label: { es: 'Recubrimiento', en: 'Coating' }, value: { es: 'PVD oro rosa', en: 'Rose gold PVD' } },
      { label: { es: 'Dureza', en: 'Hardness' }, value: { es: '2.000 HV', en: '2,000 HV' } },
      { label: { es: 'Durabilidad', en: 'Durability' }, value: { es: 'Permanente', en: 'Permanent' } },
    ],
    applications: [
      { es: 'Detalles de lujo', en: 'Luxury details' },
      { es: 'Tiradores', en: 'Handles' },
      { es: 'Perfilería', en: 'Profiles' },
      { es: 'Mobiliario residencial', en: 'Residential furniture' },
    ],
    projects: ['residencia-dubai'],
    featured: false,
  },
  {
    slug: 'aluminio-naval',
    name: { es: 'Aluminio Naval', en: 'Marine Aluminum' },
    category: 'Metales',
    description: {
      es: 'Aleación de aluminio de grado marino, ligera y resistente a la corrosión.',
      en: 'Marine-grade aluminum alloy, light and corrosion-resistant.',
    },
    longDescription: {
      es: 'El aluminio naval (aleación 5083) es nuestra elección para proyectos de exterior y entornos marinos donde se necesita combinar ligereza con resistencia extrema a la corrosión. Lo anodizamos con colores personalizados que mantienen su aspecto durante décadas.',
      en: 'Marine aluminum (alloy 5083) is our choice for outdoor projects and marine environments where lightness must be combined with extreme corrosion resistance. We anodize it in custom colors that keep their look for decades.',
    },
    image: '/images/materials/aluminio-naval.jpg',
    properties: [
      { label: { es: 'Aleación', en: 'Alloy' }, value: { es: '5083 / 6082', en: '5083 / 6082' } },
      {
        label: { es: 'Acabado', en: 'Finish' },
        value: { es: 'Anodizado personalizado', en: 'Custom anodized' },
      },
      {
        label: { es: 'Peso', en: 'Weight' },
        value: { es: '2.66 g/cm³ (ligero)', en: '2.66 g/cm³ (light)' },
      },
      {
        label: { es: 'Resistencia', en: 'Resistance' },
        value: { es: 'Marina certificada', en: 'Certified marine' },
      },
    ],
    applications: [
      { es: 'Mobiliario de exterior', en: 'Outdoor furniture' },
      { es: 'Náutica', en: 'Marine' },
      { es: 'Estructuras ligeras', en: 'Lightweight structures' },
    ],
    projects: ['yacht-club-monaco'],
    featured: false,
  },

  // --- Piedras ---
  {
    slug: 'marmol-calacatta',
    name: { es: 'Mármol Calacatta', en: 'Calacatta Marble' },
    category: 'Piedras',
    description: {
      es: 'El mármol más exclusivo del mundo, con vetas doradas sobre fondo blanco.',
      en: 'The world\'s most exclusive marble, with golden veins over a white background.',
    },
    longDescription: {
      es: 'El mármol Calacatta, extraído exclusivamente de las canteras de Carrara, es sinónimo de lujo absoluto. Sus vetas doradas y grises sobre un fondo blanco puro lo hacen inconfundible. En OMIO lo utilizamos con máximo respeto, seleccionando cada plancha personalmente en cantera para garantizar la continuidad del veteado.',
      en: 'Calacatta marble, extracted exclusively from the Carrara quarries, is a synonym of absolute luxury. Its golden and gray veins over a pure white background make it unmistakable. At OMIO we use it with the utmost respect, personally selecting every slab in the quarry to guarantee continuity of the veining.',
    },
    image: '/images/materials/marmol-calacatta.jpg',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Carrara, Italia', en: 'Carrara, Italy' } },
      { label: { es: 'Tipo', en: 'Type' }, value: { es: 'Mármol metamórfico', en: 'Metamorphic marble' } },
      {
        label: { es: 'Acabado', en: 'Finish' },
        value: { es: 'Pulido, apomazado, bruto', en: 'Polished, honed, raw' },
      },
      {
        label: { es: 'Selección', en: 'Selection' },
        value: { es: 'En cantera, por plancha', en: 'In quarry, per slab' },
      },
    ],
    applications: [
      { es: 'Encimeras', en: 'Countertops' },
      { es: 'Revestimientos', en: 'Claddings' },
      { es: 'Mesas', en: 'Tables' },
      { es: 'Baños de lujo', en: 'Luxury bathrooms' },
    ],
    projects: ['hotel-arts-barcelona', 'residencia-dubai'],
    featured: true,
  },
  {
    slug: 'marmol-verde-guatemala',
    name: { es: 'Mármol Verde Guatemala', en: 'Verde Guatemala Marble' },
    category: 'Piedras',
    description: {
      es: 'Mármol de tonos verdes profundos con vetas blancas, de gran dramatismo visual.',
      en: 'Marble with deep green tones and white veins, of great visual drama.',
    },
    longDescription: {
      es: 'El Verde Guatemala es un mármol de serpentina que cautiva por su color verde intenso y sus vetas blancas irregulares. Cada plancha es una composición abstracta natural. Lo utilizamos en barras de bar, mostradores y piezas de acento donde se busca un impacto visual potente y sofisticado.',
      en: 'Verde Guatemala is a serpentine marble that captivates with its intense green color and irregular white veins. Every slab is a natural abstract composition. We use it on bar counters, reception desks, and accent pieces where a powerful and sophisticated visual impact is sought.',
    },
    image: '/images/materials/marmol-verde-guatemala.jpg',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'India', en: 'India' } },
      { label: { es: 'Tipo', en: 'Type' }, value: { es: 'Serpentina', en: 'Serpentine' } },
      {
        label: { es: 'Acabado', en: 'Finish' },
        value: { es: 'Pulido alto brillo', en: 'High-gloss polished' },
      },
      {
        label: { es: 'Carácter', en: 'Character' },
        value: { es: 'Altamente decorativo', en: 'Highly decorative' },
      },
    ],
    applications: [
      { es: 'Barras de bar', en: 'Bar counters' },
      { es: 'Mostradores', en: 'Reception desks' },
      { es: 'Piezas de acento', en: 'Accent pieces' },
    ],
    projects: ['four-seasons-madrid'],
    featured: false,
  },
  {
    slug: 'piedra-caliza',
    name: { es: 'Piedra Caliza', en: 'Limestone' },
    category: 'Piedras',
    description: {
      es: 'Piedra natural de tacto suave y aspecto sereno, ideal para espacios de calma.',
      en: 'Natural stone with a soft touch and serene look, ideal for calm spaces.',
    },
    longDescription: {
      es: 'La piedra caliza que utilizamos proviene de canteras seleccionadas del Mediterráneo. Su textura porosa y su gama de tonos neutros —desde el blanco hueso hasta el gris perla— la hacen perfecta para crear ambientes de serenidad. Su tacto suave y cálido contrasta con la frialdad de otros materiales pétreos.',
      en: 'The limestone we use comes from selected Mediterranean quarries. Its porous texture and its range of neutral tones —from bone white to pearl gray— make it perfect for creating serene atmospheres. Its soft and warm touch contrasts with the coldness of other stone materials.',
    },
    image: '/images/materials/piedra-caliza.jpg',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Mediterráneo', en: 'Mediterranean' } },
      {
        label: { es: 'Acabado', en: 'Finish' },
        value: { es: 'Apomazado, bush-hammered', en: 'Honed, bush-hammered' },
      },
      { label: { es: 'Tacto', en: 'Touch' }, value: { es: 'Suave y cálido', en: 'Soft and warm' } },
      { label: { es: 'Uso', en: 'Use' }, value: { es: 'Interior', en: 'Interior' } },
    ],
    applications: [
      { es: 'Spas', en: 'Spas' },
      { es: 'Baños', en: 'Bathrooms' },
      { es: 'Revestimientos interiores', en: 'Interior claddings' },
      { es: 'Encimeras', en: 'Countertops' },
    ],
    projects: ['mandarin-oriental'],
    featured: false,
  },

  // --- Textiles ---
  {
    slug: 'lino-natural',
    name: { es: 'Lino Natural', en: 'Natural Linen' },
    category: 'Textiles',
    description: {
      es: 'Fibra natural de tacto fresco y aspecto orgánico, cultivada sin pesticidas.',
      en: 'A natural fiber with a fresh touch and organic look, grown without pesticides.',
    },
    longDescription: {
      es: 'El lino es la fibra textil más antigua y sostenible. Trabajamos con lino europeo certificado MASTERS OF LINEN, cultivado sin irrigación ni pesticidas. Su textura ligeramente irregular y su caída natural aportan calidez orgánica a las tapicerías y complementan la madera y la piedra.',
      en: 'Linen is the oldest and most sustainable textile fiber. We work with European linen certified MASTERS OF LINEN, grown without irrigation or pesticides. Its slightly irregular texture and natural drape bring organic warmth to upholstery and complement wood and stone.',
    },
    image: '/images/materials/lino-natural.jpg',
    properties: [
      {
        label: { es: 'Certificación', en: 'Certification' },
        value: { es: 'Masters of Linen', en: 'Masters of Linen' },
      },
      {
        label: { es: 'Origen', en: 'Origin' },
        value: { es: 'Europa (Francia/Bélgica)', en: 'Europe (France/Belgium)' },
      },
      {
        label: { es: 'Sostenibilidad', en: 'Sustainability' },
        value: { es: 'Sin pesticidas, sin riego', en: 'No pesticides, no irrigation' },
      },
      { label: { es: 'Tacto', en: 'Touch' }, value: { es: 'Fresco, orgánico', en: 'Fresh, organic' } },
    ],
    applications: [
      { es: 'Tapicería', en: 'Upholstery' },
      { es: 'Cortinas', en: 'Curtains' },
      { es: 'Cabeceros', en: 'Headboards' },
      { es: 'Cojines', en: 'Cushions' },
    ],
    projects: ['hotel-arts-barcelona', 'mandarin-oriental'],
    featured: true,
  },
  {
    slug: 'terciopelo-italiano',
    name: { es: 'Terciopelo Italiano', en: 'Italian Velvet' },
    category: 'Textiles',
    description: {
      es: 'Terciopelo de algodón de alta densidad con tacto ultra suave.',
      en: 'High-density cotton velvet with an ultra-soft touch.',
    },
    longDescription: {
      es: 'Nuestro terciopelo proviene de los mejores telares de Como, Italia. Con una densidad de pelo excepcional, ofrece una profundidad de color y un tacto que no se encuentra en ningún otro textil. Es la elección perfecta para sillas de comedor, sofás y cabeceros donde se busca opulencia contenida.',
      en: 'Our velvet comes from the best looms in Como, Italy. With exceptional pile density, it offers a depth of color and a touch unmatched by any other textile. It is the perfect choice for dining chairs, sofas, and headboards where contained opulence is sought.',
    },
    image: '/images/materials/terciopelo-italiano.jpg',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Como, Italia', en: 'Como, Italy' } },
      { label: { es: 'Composición', en: 'Composition' }, value: { es: '100% Algodón', en: '100% Cotton' } },
      {
        label: { es: 'Martindale', en: 'Martindale' },
        value: { es: '50.000+ ciclos', en: '50,000+ cycles' },
      },
      { label: { es: 'Ancho', en: 'Width' }, value: { es: '140 cm', en: '140 cm' } },
    ],
    applications: [
      { es: 'Sillas de comedor', en: 'Dining chairs' },
      { es: 'Sofás', en: 'Sofas' },
      { es: 'Cabeceros', en: 'Headboards' },
      { es: 'Paneles acústicos', en: 'Acoustic panels' },
    ],
    projects: ['four-seasons-madrid'],
    featured: false,
  },
  {
    slug: 'cuero-natural',
    name: { es: 'Cuero Natural', en: 'Natural Leather' },
    category: 'Textiles',
    description: {
      es: 'Cuero de curtición vegetal, con pátina que mejora con el uso.',
      en: 'Vegetable-tanned leather with a patina that improves with use.',
    },
    longDescription: {
      es: 'Trabajamos exclusivamente con cuero de curtición vegetal, un proceso tradicional que utiliza extractos de corteza de árbol en lugar de cromo. Este cuero desarrolla una pátina rica con el uso, volviéndose más bello con el tiempo. Cada pieza es única y cuenta la historia de su uso.',
      en: 'We exclusively work with vegetable-tanned leather, a traditional process that uses tree bark extracts instead of chromium. This leather develops a rich patina with use, becoming more beautiful over time. Every piece is unique and tells the story of its use.',
    },
    image: '/images/materials/cuero-natural.jpg',
    properties: [
      {
        label: { es: 'Curtición', en: 'Tanning' },
        value: { es: 'Vegetal (sin cromo)', en: 'Vegetable (chromium-free)' },
      },
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Toscana, Italia', en: 'Tuscany, Italy' } },
      { label: { es: 'Espesor', en: 'Thickness' }, value: { es: '1.2 - 1.4 mm', en: '1.2 - 1.4 mm' } },
      {
        label: { es: 'Pátina', en: 'Patina' },
        value: { es: 'Evoluciona con el uso', en: 'Evolves with use' },
      },
    ],
    applications: [
      { es: 'Asientos', en: 'Seats' },
      { es: 'Tiradores', en: 'Handles' },
      { es: 'Detalles de acento', en: 'Accent details' },
      { es: 'Escritorios', en: 'Desks' },
    ],
    projects: ['restaurante-dani-garcia'],
    featured: false,
  },
  {
    slug: 'seda-natural',
    name: { es: 'Seda Natural', en: 'Natural Silk' },
    category: 'Textiles',
    description: {
      es: 'Seda de morera para aplicaciones decorativas de máximo lujo.',
      en: 'Mulberry silk for the most luxurious decorative applications.',
    },
    longDescription: {
      es: 'La seda natural que utilizamos proviene de talleres artesanales de India que mantienen las técnicas tradicionales de tejido. Su brillo inimitable y su tacto incomparable la reservamos para proyectos residenciales de ultra-lujo donde cada detalle debe ser extraordinario.',
      en: 'The natural silk we use comes from artisan workshops in India that keep traditional weaving techniques alive. Its inimitable shine and incomparable touch are reserved for ultra-luxury residential projects where every detail must be extraordinary.',
    },
    image: '/images/materials/seda-natural.jpg',
    properties: [
      { label: { es: 'Tipo', en: 'Type' }, value: { es: 'Seda de morera', en: 'Mulberry silk' } },
      {
        label: { es: 'Origen', en: 'Origin' },
        value: { es: 'India (tejido artesanal)', en: 'India (artisan weaving)' },
      },
      {
        label: { es: 'Uso', en: 'Use' },
        value: { es: 'Decorativo / Interior controlado', en: 'Decorative / Controlled interior' },
      },
      {
        label: { es: 'Brillo', en: 'Shine' },
        value: { es: 'Natural, incomparable', en: 'Natural, incomparable' },
      },
    ],
    applications: [
      { es: 'Paneles decorativos', en: 'Decorative panels' },
      { es: 'Cabeceros', en: 'Headboards' },
      { es: 'Cojines de lujo', en: 'Luxury cushions' },
    ],
    projects: ['residencia-dubai'],
    featured: false,
  },
  {
    slug: 'tejido-nautico',
    name: { es: 'Tejido Náutico', en: 'Marine Fabric' },
    category: 'Textiles',
    description: {
      es: 'Textil técnico de grado marino, resistente a UV, salinidad y moho.',
      en: 'Marine-grade technical textile, resistant to UV, salinity, and mold.',
    },
    longDescription: {
      es: 'Los tejidos náuticos que utilizamos cumplen los más altos estándares de resistencia marina. Mantienen su color y textura tras años de exposición solar directa y ambiente salino. Disponibles en una paleta de colores diseñada para complementar la madera y el metal en entornos costeros.',
      en: 'The marine fabrics we use meet the highest standards of marine resistance. They keep their color and texture after years of direct solar exposure and salt environment. Available in a color palette designed to complement wood and metal in coastal environments.',
    },
    image: '/images/materials/tejido-nautico.jpg',
    properties: [
      {
        label: { es: 'Resistencia UV', en: 'UV resistance' },
        value: { es: '2.000+ horas', en: '2,000+ hours' },
      },
      { label: { es: 'Impermeabilidad', en: 'Waterproof' }, value: { es: 'Sí', en: 'Yes' } },
      {
        label: { es: 'Anti-moho', en: 'Anti-mold' },
        value: { es: 'Tratamiento integral', en: 'Comprehensive treatment' },
      },
      { label: { es: 'Limpieza', en: 'Cleaning' }, value: { es: 'Agua y jabón', en: 'Water and soap' } },
    ],
    applications: [
      { es: 'Tapicería de exterior', en: 'Outdoor upholstery' },
      { es: 'Náutica', en: 'Marine' },
      { es: 'Cojines de terraza', en: 'Terrace cushions' },
    ],
    projects: ['yacht-club-monaco'],
    featured: false,
  },
];

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  'Maderas',
  'Metales',
  'Piedras',
  'Textiles',
  'Acabados',
];

function localizeMaterial(m: MaterialI18n, locale: Locale): Material {
  return {
    slug: m.slug,
    name: m.name[locale],
    category: m.category,
    description: m.description[locale],
    longDescription: m.longDescription[locale],
    image: m.image,
    properties: m.properties.map((p) => ({
      label: p.label[locale],
      value: p.value[locale],
    })),
    applications: m.applications.map((a) => a[locale]),
    projects: m.projects,
    featured: m.featured,
  };
}

export function getMaterials(locale: Locale): Material[] {
  return MATERIALS_RAW.map((m) => localizeMaterial(m, locale));
}

export function getMaterialBySlug(slug: string, locale: Locale): Material | undefined {
  const found = MATERIALS_RAW.find((m) => m.slug === slug);
  return found ? localizeMaterial(found, locale) : undefined;
}

export function getFeaturedMaterials(locale: Locale): Material[] {
  return MATERIALS_RAW.filter((m) => m.featured).map((m) => localizeMaterial(m, locale));
}

export function getMaterialsForProject(projectSlug: string, locale: Locale): Material[] {
  return MATERIALS_RAW.filter((m) => m.projects.includes(projectSlug)).map((m) =>
    localizeMaterial(m, locale)
  );
}

/** Returns all material slugs (locale-independent) for static generation. */
export function getAllMaterialSlugs(): string[] {
  return MATERIALS_RAW.map((m) => m.slug);
}
