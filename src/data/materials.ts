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
    name: { es: 'Piedra Arenisca', en: 'Sandstone' },
    category: 'Piedras',
    description: {
      es: 'Piedra sedimentaria de tonos arena con formas erosionadas y carácter escultórico.',
      en: 'Sedimentary stone in sandy tones with eroded forms and sculptural character.',
    },
    longDescription: {
      es: 'La piedra arenisca es una piedra sedimentaria que cautiva por sus formas suavemente erosionadas y su gama cromática que va del crema al ocre dorado. En OMIO la trabajamos en bloque y la esculpimos a mano para crear superficies de gran impacto visual. Su textura ligeramente rugosa y su capacidad para reflejar la luz cambian a lo largo del día, dotando a los espacios de una atmósfera viva y orgánica.',
      en: 'Sandstone is a sedimentary stone that captivates with its softly eroded forms and chromatic range from cream to golden ochre. At OMIO we work it in block and hand-sculpt it to create surfaces of great visual impact. Its slightly rough texture and its ability to reflect light shift throughout the day, giving spaces a living, organic atmosphere.',
    },
    image: '/images/new/11.png',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Mediterráneo', en: 'Mediterranean' } },
      { label: { es: 'Tipo', en: 'Type' }, value: { es: 'Piedra sedimentaria', en: 'Sedimentary stone' } },
      {
        label: { es: 'Acabado', en: 'Finish' },
        value: { es: 'Esculpido a mano, bush-hammered', en: 'Hand-sculpted, bush-hammered' },
      },
      { label: { es: 'Densidad', en: 'Density' }, value: { es: '2.200 kg/m³', en: '2,200 kg/m³' } },
    ],
    applications: [
      { es: 'Revestimientos murales', en: 'Wall claddings' },
      { es: 'Fachadas', en: 'Façades' },
      { es: 'Piezas escultóricas', en: 'Sculptural pieces' },
      { es: 'Encimeras', en: 'Countertops' },
    ],
    projects: [],
    featured: true,
  },
  {
    slug: 'roble-europeo',
    name: { es: 'Acero en Bruto', en: 'Raw Steel' },
    category: 'Metales',
    description: {
      es: 'Barras de acero forjado con carácter industrial y trazabilidad artesanal.',
      en: 'Forged steel bars with industrial character and artisan traceability.',
    },
    longDescription: {
      es: 'El acero en bruto que utilizamos proviene de pequeñas forjas que mantienen métodos tradicionales de laminado. Cada barra conserva las marcas del proceso —la numeración manual del calibre, las improntas del rodillo, el tono ligeramente azulado del temple— como una firma del oficio. Lo combinamos con maderas y piedras nobles para crear contrastes contundentes y honestos.',
      en: 'The raw steel we use comes from small forges that keep traditional rolling methods alive. Every bar preserves the marks of the process —the hand-written gauge number, the roller imprints, the slightly bluish tone of the temper— as a signature of the craft. We combine it with noble woods and stones to create bold, honest contrasts.',
    },
    image: '/images/new/12.png',
    properties: [
      { label: { es: 'Composición', en: 'Composition' }, value: { es: 'Acero al carbono', en: 'Carbon steel' } },
      { label: { es: 'Acabado', en: 'Finish' }, value: { es: 'Bruto laminado', en: 'Mill-rolled raw' } },
      {
        label: { es: 'Tratamiento', en: 'Treatment' },
        value: { es: 'Encerado anti-óxido', en: 'Anti-rust waxing' },
      },
      { label: { es: 'Reciclabilidad', en: 'Recyclability' }, value: { es: '100%', en: '100%' } },
    ],
    applications: [
      { es: 'Estructuras vistas', en: 'Exposed structures' },
      { es: 'Mobiliario industrial', en: 'Industrial furniture' },
      { es: 'Barandillas', en: 'Railings' },
      { es: 'Bases de mesa', en: 'Table bases' },
    ],
    projects: [],
    featured: true,
  },
  {
    slug: 'roble-blanqueado',
    name: { es: 'Cerámica Artesanal', en: 'Artisan Ceramic' },
    category: 'Acabados',
    description: {
      es: 'Cerámica modelada y cocida a mano, con texturas vivas y tonos crudos.',
      en: 'Hand-shaped, hand-fired ceramic with living textures and raw tones.',
    },
    longDescription: {
      es: 'Trabajamos con talleres ceramistas del Mediterráneo que mantienen vivas técnicas centenarias de modelado y cocción a leña. Cada pieza se forma a mano, lo que da lugar a variaciones sutiles de espesor, color y textura imposibles de replicar industrialmente. El resultado es una superficie blanca rota, ligeramente porosa, que envejece con dignidad y aporta calidez táctil a los espacios contemporáneos.',
      en: 'We work with ceramist workshops in the Mediterranean that keep centuries-old shaping and wood-fired techniques alive. Each piece is hand-formed, leading to subtle variations in thickness, color, and texture that cannot be replicated industrially. The result is a broken-white, slightly porous surface that ages with dignity and brings tactile warmth to contemporary spaces.',
    },
    image: '/images/new/13.png',
    properties: [
      { label: { es: 'Origen', en: 'Origin' }, value: { es: 'Mediterráneo', en: 'Mediterranean' } },
      { label: { es: 'Proceso', en: 'Process' }, value: { es: 'Modelado a mano', en: 'Hand-shaped' } },
      { label: { es: 'Cocción', en: 'Firing' }, value: { es: 'Horno de leña', en: 'Wood-fired kiln' } },
      {
        label: { es: 'Carácter', en: 'Character' },
        value: { es: 'Pieza única', en: 'Unique piece' },
      },
    ],
    applications: [
      { es: 'Paneles decorativos', en: 'Decorative panels' },
      { es: 'Revestimientos murales', en: 'Wall surfaces' },
      { es: 'Lámparas', en: 'Lamps' },
      { es: 'Vajilla a medida', en: 'Custom tableware' },
    ],
    projects: [],
    featured: false,
  },
  {
    slug: 'ebano-macassar',
    name: { es: 'Pino Macizo', en: 'Solid Pine' },
    category: 'Maderas',
    description: {
      es: 'Madera maciza de pino con nudos vistos y tonos miel, de carácter honesto.',
      en: 'Solid pine wood with visible knots and honey tones, of honest character.',
    },
    longDescription: {
      es: 'El pino macizo es una madera honesta y abundante, perfecta para piezas estructurales y mobiliario de carácter rústico-contemporáneo. Trabajamos con tablones gruesos provenientes de bosques certificados PEFC del norte de Europa. Sus nudos vistos, su grano abierto y sus tonos miel son parte intrínseca de su belleza, no defectos a ocultar.',
      en: 'Solid pine is an honest, abundant wood, perfect for structural pieces and rustic-contemporary furniture. We work with thick beams from PEFC-certified forests in northern Europe. Its visible knots, open grain, and honey tones are an intrinsic part of its beauty, not defects to hide.',
    },
    image: '/images/new/14.png',
    properties: [
      {
        label: { es: 'Origen', en: 'Origin' },
        value: { es: 'Norte de Europa', en: 'Northern Europe' },
      },
      { label: { es: 'Certificación', en: 'Certification' }, value: { es: 'PEFC', en: 'PEFC' } },
      { label: { es: 'Densidad', en: 'Density' }, value: { es: '510 kg/m³', en: '510 kg/m³' } },
      { label: { es: 'Acabado', en: 'Finish' }, value: { es: 'Aceite natural', en: 'Natural oil' } },
    ],
    applications: [
      { es: 'Vigas estructurales', en: 'Structural beams' },
      { es: 'Mobiliario macizo', en: 'Solid furniture' },
      { es: 'Suelos rústicos', en: 'Rustic flooring' },
    ],
    projects: [],
    featured: false,
  },
  {
    slug: 'teca-birmana',
    name: { es: 'Mimbre Trenzado', en: 'Woven Wicker' },
    category: 'Textiles',
    description: {
      es: 'Fibra natural trenzada a mano, de tacto cálido y formas escultóricas.',
      en: 'Natural fiber hand-woven into warm-touch, sculptural shapes.',
    },
    longDescription: {
      es: 'El mimbre trenzado es una fibra vegetal trabajada artesanalmente desde hace siglos en el Mediterráneo. En OMIO colaboramos con maestros cesteros que tejen a mano cada estructura, adaptando el patrón al diseño de la pieza final. Su flexibilidad permite formas curvas imposibles para otros materiales, y su carácter ligero y orgánico aporta calidez a los espacios más sofisticados.',
      en: 'Woven wicker is a plant fiber that has been handcrafted in the Mediterranean for centuries. At OMIO we collaborate with master basket-weavers who weave every structure by hand, adapting the pattern to the design of the final piece. Its flexibility allows curved shapes impossible for other materials, and its light, organic character brings warmth to the most sophisticated spaces.',
    },
    image: '/images/new/15.png',
    properties: [
      {
        label: { es: 'Origen', en: 'Origin' },
        value: { es: 'Mediterráneo', en: 'Mediterranean' },
      },
      { label: { es: 'Proceso', en: 'Process' }, value: { es: 'Trenzado a mano', en: 'Hand-woven' } },
      { label: { es: 'Tratamiento', en: 'Treatment' }, value: { es: 'Aceite natural', en: 'Natural oil' } },
      {
        label: { es: 'Sostenibilidad', en: 'Sustainability' },
        value: { es: 'Fibra renovable', en: 'Renewable fiber' },
      },
    ],
    applications: [
      { es: 'Lámparas escultóricas', en: 'Sculptural lamps' },
      { es: 'Sillas y butacas', en: 'Chairs and armchairs' },
      { es: 'Separadores de espacio', en: 'Room dividers' },
      { es: 'Paneles decorativos', en: 'Decorative panels' },
    ],
    projects: [],
    featured: true,
  },
  {
    slug: 'olivo-mediterraneo',
    name: { es: 'Cristal Templado', en: 'Tempered Glass' },
    category: 'Acabados',
    description: {
      es: 'Cristal templado de alta transparencia, ligero y resistente a impactos.',
      en: 'High-transparency tempered glass, light and impact-resistant.',
    },
    longDescription: {
      es: 'El cristal templado que utilizamos se fabrica en hornos especializados que multiplican por cinco la resistencia mecánica del vidrio convencional. Su canto extra-clear, libre del característico tono verdoso, permite trabajar con paneles de gran formato sin perder transparencia. Lo combinamos con metales y maderas para crear piezas en las que la luz es un material más del proyecto.',
      en: 'The tempered glass we use is produced in specialized kilns that multiply the mechanical strength of conventional glass by five. Its extra-clear edge, free of the typical greenish tint, allows us to work with large-format panels without losing transparency. We combine it with metals and woods to create pieces where light becomes another material of the project.',
    },
    image: '/images/new/16.png',
    properties: [
      { label: { es: 'Tipo', en: 'Type' }, value: { es: 'Templado extra-clear', en: 'Extra-clear tempered' } },
      {
        label: { es: 'Resistencia', en: 'Resistance' },
        value: { es: '5x vidrio convencional', en: '5x conventional glass' },
      },
      { label: { es: 'Espesores', en: 'Thicknesses' }, value: { es: '6 - 19 mm', en: '6 - 19 mm' } },
      {
        label: { es: 'Reciclabilidad', en: 'Recyclability' },
        value: { es: '100%', en: '100%' },
      },
    ],
    applications: [
      { es: 'Cerramientos', en: 'Glazed enclosures' },
      { es: 'Mesas y sobres', en: 'Tabletops' },
      { es: 'Separadores', en: 'Dividers' },
      { es: 'Vitrinas', en: 'Display cases' },
    ],
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
    projects: [],
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
