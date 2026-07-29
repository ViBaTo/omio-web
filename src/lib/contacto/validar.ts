export type EntradaContacto = {
  name?: unknown
  email?: unknown
  company?: unknown
  projectType?: unknown
  message?: unknown
  /** Campo trampa: invisible para las personas, irresistible para los bots. */
  website?: unknown
}

export type DatosContacto = {
  name: string
  email: string
  company: string
  projectType: string
  message: string
}

export type ResultadoValidacion =
  | { ok: true; datos: DatosContacto }
  | { ok: false; campo: keyof DatosContacto | 'trampa' }

export const LIMITES: Record<keyof DatosContacto, number> = {
  name: 120,
  email: 160,
  company: 160,
  projectType: 40,
  message: 5000,
}

function texto(valor: unknown): string {
  return typeof valor === 'string' ? valor.trim() : ''
}

const EMAIL_RAZONABLE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validarContacto(entrada: EntradaContacto): ResultadoValidacion {
  if (texto(entrada.website)) return { ok: false, campo: 'trampa' }

  const datos: DatosContacto = {
    name: texto(entrada.name),
    email: texto(entrada.email),
    company: texto(entrada.company),
    projectType: texto(entrada.projectType),
    message: texto(entrada.message),
  }

  if (!datos.name) return { ok: false, campo: 'name' }
  if (!EMAIL_RAZONABLE.test(datos.email)) return { ok: false, campo: 'email' }
  if (!datos.message) return { ok: false, campo: 'message' }

  for (const [campo, maximo] of Object.entries(LIMITES)) {
    const clave = campo as keyof DatosContacto
    if (datos[clave].length > maximo) return { ok: false, campo: clave }
  }

  return { ok: true, datos }
}
