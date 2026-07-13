/**
 * Codegen: lee el contenido editado en Keystatic (src/content/**) mediante el
 * reader y regenera los datos tipados que consume la web (src/data/_generated/).
 *
 * Se ejecuta en `predev` y `prebuild`, de modo que la web siga consumiendo
 * src/data igual que siempre (sync, sin refactor de componentes), pero la fuente
 * de verdad real pase a ser el contenido de Keystatic.
 *
 * Ejecutar con: pnpm tsx scripts/keystatic-codegen.ts
 */
import { createReader } from '@keystatic/core/reader';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import keystaticConfig from '../keystatic.config';

const ROOT = process.cwd();
const OUT_DIR = join(ROOT, 'src/data/_generated');
mkdirSync(OUT_DIR, { recursive: true });

const reader = createReader(ROOT, keystaticConfig);

const HEADER = `// ⚠️ ARCHIVO GENERADO AUTOMÁTICAMENTE — NO EDITAR A MANO.
// Fuente: src/content/ (editado vía Keystatic). Regenerar con: pnpm tsx scripts/keystatic-codegen.ts
/* eslint-disable */
`;

/**
 * Red de seguridad: una entrada guardada a medias (sin imagen o sin título)
 * NUNCA debe tumbar el build — se aparta con un aviso y el resto de la web se
 * publica igual. El panel ya valida estos campos, pero el contenido antiguo o
 * editado fuera del panel puede venir incompleto.
 */
function partitionValid<T>(
  kind: string,
  entries: T[],
  missingEssentials: (e: T) => string[]
): T[] {
  const valid: T[] = [];
  for (const e of entries) {
    const missing = missingEssentials(e);
    if (missing.length === 0) {
      valid.push(e);
    } else {
      const slug = (e as { slug?: string }).slug ?? '(sin slug)';
      console.warn(
        `⚠️ ${kind} "${slug}" OMITIDO de la web (incompleto: falta ${missing.join(', ')}). ` +
          `Complétalo en el panel /keystatic para publicarlo.`
      );
    }
  }
  return valid;
}

/**
 * Lee una colección entrada a entrada: las que no pasan la validación del
 * schema (p. ej. guardadas antes de que un campo fuera obligatorio) se apartan
 * con un aviso en lugar de tumbar todo el codegen, como hace `.all()`.
 */
async function readCollectionTolerant(
  kind: string,
  collection: {
    list(): Promise<readonly string[]>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    read(slug: string): Promise<any>;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ slug: string; entry: any }[]> {
  const slugs = await collection.list();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: { slug: string; entry: any }[] = [];
  for (const slug of slugs) {
    try {
      const entry = await collection.read(slug);
      if (entry) out.push({ slug, entry });
    } catch (err) {
      const reason = err instanceof Error ? err.message.replace(/\n/g, ' · ') : String(err);
      console.warn(
        `⚠️ ${kind} "${slug}" OMITIDO de la web (${reason}). ` +
          `Complétalo en el panel /keystatic para publicarlo.`
      );
    }
  }
  return out;
}

async function generateMateriales() {
  const entries = partitionValid(
    'Material',
    await readCollectionTolerant('Material', reader.collections.materiales),
    (e) => [
      ...(e.entry.image ? [] : ['imagen']),
      ...(e.entry.name?.es ? [] : ['nombre (ES)']),
    ]
  );
  const raw = entries.map((e) => ({
    slug: e.slug,
    name: e.entry.name,
    category: e.entry.category,
    description: e.entry.description,
    longDescription: e.entry.longDescription,
    image: e.entry.image,
    properties: e.entry.properties,
    applications: e.entry.applications,
    projects: e.entry.projects,
    featured: e.entry.featured,
  }));

  const file = `${HEADER}
import type { MaterialI18n } from '../materials';

export const MATERIALS_RAW: MaterialI18n[] = ${JSON.stringify(raw, null, 2)};
`;
  writeFileSync(join(OUT_DIR, 'materials.generated.ts'), file, 'utf8');
  console.log(`✅ materials.generated.ts — ${raw.length} materiales`);
}

async function generateServicios() {
  const entries = partitionValid(
    'Servicio',
    await readCollectionTolerant('Servicio', reader.collections.servicios),
    (e) => (e.entry.title?.es ? [] : ['título (ES)'])
  );
  const raw = entries.map((e) => ({
    slug: e.slug,
    world: e.entry.world,
    icon: e.entry.icon,
    title: e.entry.title,
    tagline: e.entry.tagline,
    description: e.entry.description,
    details: e.entry.details,
    capabilities: e.entry.capabilities,
  }));
  const file = `${HEADER}
import type { ServiceI18n } from '../services';

export const SERVICES_RAW: ServiceI18n[] = ${JSON.stringify(raw, null, 2)};
`;
  writeFileSync(join(OUT_DIR, 'services.generated.ts'), file, 'utf8');
  console.log(`✅ services.generated.ts — ${raw.length} servicios`);
}

async function generateProyectos() {
  const entries = partitionValid(
    'Proyecto',
    await readCollectionTolerant('Proyecto', reader.collections.proyectos),
    (e) => [
      ...(e.entry.heroImage ? [] : ['imagen principal']),
      ...(e.entry.title?.es ? [] : ['título (ES)']),
      ...(e.entry.shortDescription?.es ? [] : ['descripción corta (ES)']),
    ]
  );
  const raw = entries.map((e) => ({
    slug: e.slug,
    title: e.entry.title,
    category: e.entry.category,
    client: e.entry.client,
    creativeDirector: e.entry.creativeDirector || undefined,
    location: e.entry.location,
    year: e.entry.year,
    world: e.entry.world,
    shortDescription: e.entry.shortDescription,
    longDescription: e.entry.longDescription,
    heroImage: e.entry.heroImage,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    acts: e.entry.acts.map((a: any) => ({
      id: a.id,
      world: a.world,
      title: a.title,
      body: a.body,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      images: a.images.map((img: any) => ({
        src: img.src,
        alt: img.alt,
        caption: img.caption?.es || img.caption?.en ? img.caption : undefined,
      })),
    })),
    materials: e.entry.materials,
    featured: e.entry.featured,
    stats: e.entry.stats.length ? e.entry.stats : undefined,
  }));
  const file = `${HEADER}
import type { ProjectFullI18n } from '../projects';

export const PROJECTS_RAW: ProjectFullI18n[] = ${JSON.stringify(raw, null, 2)};
`;
  writeFileSync(join(OUT_DIR, 'projects.generated.ts'), file, 'utf8');
  console.log(`✅ projects.generated.ts — ${raw.length} proyectos`);
}

/**
 * Codegen INVERSO para los textos UI: los singletons de Keystatic se vuelcan a
 * messages/{es,en}.json (que es lo que lee next-intl). Solo se reescriben las
 * secciones gestionadas (hero, contacta, footer); el resto del archivo se
 * preserva intacto, manteniendo el orden de claves.
 */
async function generateTextos() {
  const hero = await reader.singletons.textoHero.read();
  const contacta = await reader.singletons.textoContacta.read();
  const footer = await reader.singletons.textoFooter.read();

  const esPath = join(ROOT, 'messages/es.json');
  const enPath = join(ROOT, 'messages/en.json');
  const es = JSON.parse(readFileSync(esPath, 'utf8'));
  const en = JSON.parse(readFileSync(enPath, 'utf8'));

  if (hero) {
    es.hero = { phrases: hero.phrases.map((p) => p.es), location: hero.location.es };
    en.hero = { phrases: hero.phrases.map((p) => p.en), location: hero.location.en };
  }
  if (contacta) {
    const base = { email: contacta.email, phone: contacta.phone };
    es.contacta = {
      title: contacta.title.es,
      paragraphs: contacta.paragraphs.map((p) => p.es),
      cta: contacta.cta.es,
      ...base,
      location: contacta.location.es,
    };
    en.contacta = {
      title: contacta.title.en,
      paragraphs: contacta.paragraphs.map((p) => p.en),
      cta: contacta.cta.en,
      ...base,
      location: contacta.location.en,
    };
  }
  if (footer) {
    const base = { addressLine1: footer.addressLine1, addressLine2: footer.addressLine2 };
    es.footer = { ...base, copyright: footer.copyright.es };
    en.footer = { ...base, copyright: footer.copyright.en };
  }

  writeFileSync(esPath, JSON.stringify(es, null, 2) + '\n', 'utf8');
  writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
  console.log('✅ messages/{es,en}.json — hero, contacta, footer');
}

async function main() {
  await generateMateriales();
  await generateServicios();
  await generateProyectos();
  await generateTextos();
}

main().catch((err) => {
  console.error('❌ codegen falló:', err);
  process.exit(1);
});
