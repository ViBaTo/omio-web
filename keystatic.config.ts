import { config, fields, collection, singleton } from '@keystatic/core';

/**
 * Campo de texto bilingüe: muestra "Etiqueta (ES)" y "Etiqueta (EN)" lado a lado.
 * Modela la estructura `LocalizedString = { es: string; en: string }` de src/data.
 */
function i18nText(
  label: string,
  opts: { multiline?: boolean; description?: string } = {}
) {
  return fields.object(
    {
      es: fields.text({ label: `${label} (ES)`, multiline: opts.multiline }),
      en: fields.text({ label: `${label} (EN)`, multiline: opts.multiline }),
    },
    {
      label,
      description: opts.description,
      layout: opts.multiline ? undefined : [6, 6],
    }
  );
}

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'OMIO' },
    navigation: {
      Contenido: ['proyectos', 'materiales', 'servicios'],
      'Textos de la web': ['textoHero', 'textoContacta', 'textoFooter'],
    },
  },
  singletons: {
    textoHero: singleton({
      label: 'Home · Hero',
      path: 'src/content/textos/hero',
      format: { data: 'json' },
      schema: {
        phrases: fields.array(i18nText('Frase'), {
          label: 'Frases rotativas',
          itemLabel: (props) => props.fields.es.value || 'Frase',
        }),
        location: i18nText('Ubicación'),
      },
    }),
    textoContacta: singleton({
      label: 'Sección Contacto',
      path: 'src/content/textos/contacta',
      format: { data: 'json' },
      schema: {
        title: i18nText('Título'),
        paragraphs: fields.array(i18nText('Párrafo', { multiline: true }), {
          label: 'Párrafos',
          itemLabel: (props) => props.fields.es.value || 'Párrafo',
        }),
        cta: i18nText('Botón (CTA)'),
        email: fields.text({ label: 'Email' }),
        phone: fields.text({ label: 'Teléfono' }),
        location: i18nText('Ubicación'),
      },
    }),
    textoFooter: singleton({
      label: 'Footer',
      path: 'src/content/textos/footer',
      format: { data: 'json' },
      schema: {
        addressLine1: fields.text({ label: 'Dirección línea 1' }),
        addressLine2: fields.text({ label: 'Dirección línea 2' }),
        copyright: i18nText('Copyright', {
          description: 'Usa {year} donde quieras que aparezca el año actual.',
        }),
      },
    }),
  },
  collections: {
    materiales: collection({
      label: 'Materiales',
      slugField: 'slug',
      path: 'src/content/materiales/*',
      format: 'json',
      columns: ['slug', 'category'],
      schema: {
        slug: fields.slug({
          name: {
            label: 'Identificador (slug)',
            description: 'No cambiar si el material ya está publicado: forma parte de la URL.',
          },
        }),
        name: i18nText('Nombre'),
        category: fields.select({
          label: 'Categoría',
          options: [
            { value: 'Maderas', label: 'Maderas' },
            { value: 'Metales', label: 'Metales' },
            { value: 'Piedras', label: 'Piedras' },
            { value: 'Textiles', label: 'Textiles' },
            { value: 'Acabados', label: 'Acabados' },
          ],
          defaultValue: 'Maderas',
        }),
        description: i18nText('Descripción corta', { multiline: true }),
        longDescription: i18nText('Descripción larga', { multiline: true }),
        image: fields.image({
          label: 'Imagen',
          directory: 'public/images/materials',
          publicPath: '/images/materials',
        }),
        properties: fields.array(
          fields.object({
            label: i18nText('Etiqueta'),
            value: i18nText('Valor'),
          }),
          {
            label: 'Propiedades',
            itemLabel: (props) => props.fields.label.fields.es.value || 'Propiedad',
          }
        ),
        applications: fields.array(i18nText('Aplicación'), {
          label: 'Aplicaciones',
          itemLabel: (props) => props.fields.es.value || 'Aplicación',
        }),
        projects: fields.array(fields.text({ label: 'Slug de proyecto' }), {
          label: 'Proyectos relacionados (slugs)',
          itemLabel: (props) => props.value || 'Proyecto',
        }),
        featured: fields.checkbox({ label: 'Destacado en portada', defaultValue: false }),
      },
    }),

    servicios: collection({
      label: 'Servicios',
      slugField: 'slug',
      path: 'src/content/servicios/*',
      format: 'json',
      columns: ['slug', 'world'],
      schema: {
        slug: fields.slug({ name: { label: 'Identificador (slug)' } }),
        world: fields.select({
          label: 'Mundo',
          options: [
            { value: 'artesano', label: 'Artesano' },
            { value: 'ingeniero', label: 'Ingeniero' },
            { value: 'fabrica', label: 'Fábrica' },
          ],
          defaultValue: 'artesano',
        }),
        icon: fields.select({
          label: 'Icono',
          options: [
            { value: 'artesano', label: 'Artesano' },
            { value: 'ingeniero', label: 'Ingeniero' },
            { value: 'fabrica', label: 'Fábrica' },
          ],
          defaultValue: 'artesano',
        }),
        title: i18nText('Título'),
        tagline: i18nText('Lema'),
        description: i18nText('Descripción', { multiline: true }),
        details: fields.array(i18nText('Detalle', { multiline: true }), {
          label: 'Detalles',
          itemLabel: (props) => props.fields.es.value || 'Detalle',
        }),
        capabilities: fields.array(i18nText('Capacidad'), {
          label: 'Capacidades',
          itemLabel: (props) => props.fields.es.value || 'Capacidad',
        }),
      },
    }),

    proyectos: collection({
      label: 'Proyectos',
      slugField: 'slug',
      path: 'src/content/proyectos/*',
      format: 'json',
      columns: ['slug', 'category'],
      schema: {
        slug: fields.slug({ name: { label: 'Identificador (slug)' } }),
        title: i18nText('Título'),
        category: fields.select({
          label: 'Categoría',
          options: [
            { value: 'Hospitality', label: 'Hospitality' },
            { value: 'Residencial', label: 'Residencial' },
            { value: 'Gastronomía', label: 'Gastronomía' },
            { value: 'Contract', label: 'Contract' },
          ],
          defaultValue: 'Hospitality',
        }),
        client: fields.text({ label: 'Cliente' }),
        creativeDirector: fields.text({ label: 'Dirección creativa (opcional)' }),
        location: i18nText('Ubicación'),
        year: fields.integer({ label: 'Año', defaultValue: 2024 }),
        world: fields.select({
          label: 'Mundo',
          options: [
            { value: 'artesano', label: 'Artesano' },
            { value: 'ingeniero', label: 'Ingeniero' },
            { value: 'fabrica', label: 'Fábrica' },
          ],
          defaultValue: 'artesano',
        }),
        shortDescription: i18nText('Descripción corta', { multiline: true }),
        longDescription: i18nText('Descripción larga', { multiline: true }),
        heroImage: fields.image({
          label: 'Imagen principal',
          directory: 'public/images/projects',
          publicPath: '/images/projects',
        }),
        featured: fields.checkbox({ label: 'Destacado en portada', defaultValue: false }),
        acts: fields.array(
          fields.object({
            id: fields.select({
              label: 'Acto',
              options: [
                { value: 'brief', label: 'El encargo' },
                { value: 'engineering', label: 'Ingeniería' },
                { value: 'execution', label: 'Ejecución' },
                { value: 'result', label: 'Resultado' },
              ],
              defaultValue: 'brief',
            }),
            world: fields.select({
              label: 'Mundo',
              options: [
                { value: 'artesano', label: 'Artesano' },
                { value: 'ingeniero', label: 'Ingeniero' },
                { value: 'fabrica', label: 'Fábrica' },
              ],
              defaultValue: 'artesano',
            }),
            title: i18nText('Título del acto'),
            body: i18nText('Texto del acto', { multiline: true }),
            images: fields.array(
              fields.object({
                src: fields.image({
                  label: 'Imagen',
                  directory: 'public/images/projects',
                  publicPath: '/images/projects',
                }),
                alt: i18nText('Texto alternativo'),
                caption: i18nText('Pie de foto (opcional)'),
              }),
              {
                label: 'Imágenes del acto',
                itemLabel: (props) => props.fields.alt.fields.es.value || 'Imagen',
              }
            ),
          }),
          {
            label: 'Actos (relato del proyecto)',
            itemLabel: (props) => props.fields.title.fields.es.value || 'Acto',
          }
        ),
        materials: fields.array(fields.text({ label: 'Slug de material' }), {
          label: 'Materiales usados (slugs)',
          itemLabel: (props) => props.value || 'Material',
        }),
        stats: fields.array(
          fields.object({
            label: i18nText('Etiqueta'),
            value: fields.text({ label: 'Valor' }),
          }),
          {
            label: 'Estadísticas',
            itemLabel: (props) => props.fields.label.fields.es.value || 'Estadística',
          }
        ),
      },
    }),
  },
});
