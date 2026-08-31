/**
 * Tipos y validación de catálogos — SIN datos.
 *
 * Este módulo existe para que el codegen (`scripts/keystatic-codegen.ts`) pueda
 * reutilizar la validación sin arrastrar `src/data/_generated/`, que es
 * precisamente lo que el codegen genera. Importar esto desde `./catalogs`
 * (que sí lee `_generated`) rompía el build en limpio: el codegen necesitaba
 * su propia salida para poder arrancar.
 *
 * REGLA: aquí no se importa nada de `_generated`.
 */

type LocalizedString = { es: string; en: string };

export interface CatalogI18n {
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  cover: string;
  file: string;
  year?: number;
}

export interface Catalog {
  slug: string;
  title: string;
  description: string;
  cover: string;
  file: string;
  year?: number;
}

export interface CatalogEssentialsInput {
  title?: { es?: string | null; en?: string | null } | null;
  cover?: string | null;
  file?: string | null;
}

export function catalogMissingEssentials(entry: CatalogEssentialsInput): string[] {
  const missing: string[] = [];
  if (!entry.title?.es?.trim()) missing.push('título (ES)');
  if (!entry.cover) missing.push('portada');
  if (!entry.file) missing.push('PDF');
  return missing;
}
