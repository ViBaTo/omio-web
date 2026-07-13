/**
 * Migración (una sola vez): convierte el contenido hardcodeado en src/data/*.ts
 * a archivos JSON de Keystatic en src/content/{materiales,servicios,proyectos}/.
 *
 * Reconstruye la estructura bilingüe { es, en } llamando a las funciones get*()
 * en ambos locales y emparejando campo a campo (el orden es estable porque ambos
 * derivan del mismo array RAW).
 *
 * Normaliza las imágenes a los directorios gestionados por Keystatic, aplanando
 * las subcarpetas por proyecto (p. ej. projects/<slug>/hero.jpg -> <slug>__hero.jpg)
 * para que el campo fields.image las parsee y permita reemplazarlas.
 *
 * Ejecutar con: pnpm tsx scripts/migrate-content.ts
 */
import { mkdirSync, writeFileSync, existsSync, copyFileSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { getMaterials } from '../src/data/materials';
import { getServices } from '../src/data/services';
import { getProjects } from '../src/data/projects';

const ROOT = process.cwd();
const ES = JSON.parse(readFileSync(join(ROOT, 'messages/es.json'), 'utf8'));
const EN = JSON.parse(readFileSync(join(ROOT, 'messages/en.json'), 'utf8'));
const pair = (a: string, b: string) => ({ es: a, en: b });

function ensureDir(p: string) {
  mkdirSync(p, { recursive: true });
}

function writeJson(dir: string, slug: string, data: unknown) {
  writeFileSync(join(dir, `${slug}.json`), JSON.stringify(data, null, 2) + '\n', 'utf8');
}

/** Copia una imagen al directorio gestionado y devuelve su ruta pública final. */
function normalizeImage(publicSrc: string, destDir: string, destPublic: string, flatName?: string): string {
  const file = flatName ?? basename(publicSrc);
  ensureDir(destDir);
  const dest = join(destDir, file);
  if (!existsSync(dest)) {
    const source = join(ROOT, 'public', publicSrc.replace(/^\//, ''));
    if (existsSync(source)) copyFileSync(source, dest);
    else console.warn(`  ⚠ imagen no encontrada: ${source}`);
  }
  return `${destPublic}/${file}`;
}

// --- MATERIALES ---------------------------------------------------------------
function migrateMateriales() {
  const dir = join(ROOT, 'src/content/materiales');
  ensureDir(dir);
  const es = getMaterials('es');
  const en = new Map(getMaterials('en').map((m) => [m.slug, m]));
  let n = 0;
  for (const m of es) {
    const e = en.get(m.slug)!;
    writeJson(dir, m.slug, {
      name: { es: m.name, en: e.name },
      category: m.category,
      description: { es: m.description, en: e.description },
      longDescription: { es: m.longDescription, en: e.longDescription },
      image: normalizeImage(m.image, join(ROOT, 'public/images/materials'), '/images/materials'),
      properties: m.properties.map((p, i) => ({
        label: { es: p.label, en: e.properties[i]?.label ?? p.label },
        value: { es: p.value, en: e.properties[i]?.value ?? p.value },
      })),
      applications: m.applications.map((a, i) => ({ es: a, en: e.applications[i] ?? a })),
      projects: m.projects,
      featured: m.featured,
    });
    n++;
  }
  console.log(`✅ ${n} materiales`);
}

// --- SERVICIOS ----------------------------------------------------------------
function migrateServicios() {
  const dir = join(ROOT, 'src/content/servicios');
  ensureDir(dir);
  const es = getServices('es');
  const en = new Map(getServices('en').map((s) => [s.slug, s]));
  let n = 0;
  for (const s of es) {
    const e = en.get(s.slug)!;
    writeJson(dir, s.slug, {
      world: s.world,
      icon: s.icon,
      title: { es: s.title, en: e.title },
      tagline: { es: s.tagline, en: e.tagline },
      description: { es: s.description, en: e.description },
      details: s.details.map((d, i) => ({ es: d, en: e.details[i] ?? d })),
      capabilities: s.capabilities.map((c, i) => ({ es: c, en: e.capabilities[i] ?? c })),
    });
    n++;
  }
  console.log(`✅ ${n} servicios`);
}

// --- PROYECTOS ----------------------------------------------------------------
const PROJ_DIR = join(ROOT, 'public/images/projects');
const PROJ_PUBLIC = '/images/projects';

/** Aplana projects/<slug>/foo.jpg -> <slug>__foo.jpg (dir plano gestionado). */
function flattenProjectImage(publicSrc: string, slug: string): string {
  const rel = publicSrc.replace(`${PROJ_PUBLIC}/`, ''); // p.ej. "amazonico/hero.jpg" o "hero.jpg"
  const flat = rel.includes('/') ? rel.split('/').join('__') : `${slug}__${rel}`;
  return normalizeImage(publicSrc, PROJ_DIR, PROJ_PUBLIC, flat);
}

function migrateProyectos() {
  const dir = join(ROOT, 'src/content/proyectos');
  ensureDir(dir);
  const es = getProjects('es');
  const en = new Map(getProjects('en').map((p) => [p.slug, p]));
  let n = 0;
  for (const p of es) {
    const e = en.get(p.slug)!;
    writeJson(dir, p.slug, {
      title: { es: p.title, en: e.title },
      category: p.category,
      client: p.client,
      creativeDirector: p.creativeDirector ?? '',
      location: { es: p.location, en: e.location },
      year: p.year,
      world: p.world,
      shortDescription: { es: p.shortDescription, en: e.shortDescription },
      longDescription: { es: p.longDescription, en: e.longDescription },
      heroImage: flattenProjectImage(p.heroImage, p.slug),
      featured: p.featured,
      acts: p.acts.map((act, ai) => ({
        id: act.id,
        world: act.world,
        title: { es: act.title, en: e.acts[ai]?.title ?? act.title },
        body: { es: act.body, en: e.acts[ai]?.body ?? act.body },
        images: act.images.map((img, ii) => ({
          src: flattenProjectImage(img.src, p.slug),
          alt: { es: img.alt, en: e.acts[ai]?.images[ii]?.alt ?? img.alt },
          caption: { es: img.caption ?? '', en: e.acts[ai]?.images[ii]?.caption ?? img.caption ?? '' },
        })),
      })),
      materials: p.materials,
      stats: (p.stats ?? []).map((s, si) => ({
        label: { es: s.label, en: e.stats?.[si]?.label ?? s.label },
        value: s.value,
      })),
    });
    n++;
  }
  console.log(`✅ ${n} proyectos`);
}

// --- TEXTOS UI (singletons) ---------------------------------------------------
function migrateTextos() {
  const dir = join(ROOT, 'src/content/textos');
  ensureDir(dir);

  writeFileSync(
    join(dir, 'hero.json'),
    JSON.stringify(
      {
        phrases: ES.hero.phrases.map((p: string, i: number) => pair(p, EN.hero.phrases[i] ?? p)),
        location: pair(ES.hero.location, EN.hero.location),
      },
      null,
      2
    ) + '\n'
  );

  writeFileSync(
    join(dir, 'contacta.json'),
    JSON.stringify(
      {
        title: pair(ES.contacta.title, EN.contacta.title),
        paragraphs: ES.contacta.paragraphs.map((p: string, i: number) =>
          pair(p, EN.contacta.paragraphs[i] ?? p)
        ),
        cta: pair(ES.contacta.cta, EN.contacta.cta),
        email: ES.contacta.email,
        phone: ES.contacta.phone,
        location: pair(ES.contacta.location, EN.contacta.location),
      },
      null,
      2
    ) + '\n'
  );

  writeFileSync(
    join(dir, 'footer.json'),
    JSON.stringify(
      {
        addressLine1: ES.footer.addressLine1,
        addressLine2: ES.footer.addressLine2,
        copyright: pair(ES.footer.copyright, EN.footer.copyright),
      },
      null,
      2
    ) + '\n'
  );

  console.log('✅ textos (hero, contacta, footer)');
}

migrateMateriales();
migrateServicios();
migrateProyectos();
migrateTextos();
console.log('🎉 Migración de contenido completada.');
