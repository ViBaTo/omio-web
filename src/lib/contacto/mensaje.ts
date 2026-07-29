import type { DatosContacto } from './validar'

export type CorreoContacto = {
  subject: string
  text: string
  replyTo: string
}

/** Una cabecera de correo no puede contener saltos de línea: por ahí se cuelan los bots. */
function unaSolaLinea(valor: string): string {
  return valor.replace(/[\r\n]+/g, ' ').trim()
}

export function componerCorreo(datos: DatosContacto): CorreoContacto {
  const quien = unaSolaLinea(datos.name)
  const empresa = unaSolaLinea(datos.company)

  const subject = empresa
    ? `Web OMIO · ${quien} (${empresa})`
    : `Web OMIO · ${quien}`

  const text = [
    'Nueva consulta desde el formulario de omioatelier.com',
    '',
    `Nombre:            ${datos.name}`,
    `Email:             ${datos.email}`,
    `Empresa:           ${datos.company || '—'}`,
    `Tipo de proyecto:  ${datos.projectType || '—'}`,
    '',
    'Mensaje:',
    datos.message,
    '',
    '—',
    'Responde a este correo y le contestarás directamente al cliente.',
  ].join('\n')

  return { subject, text, replyTo: datos.email }
}
