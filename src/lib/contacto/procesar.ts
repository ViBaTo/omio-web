import { componerCorreo, type CorreoContacto } from './mensaje'
import { validarContacto, type EntradaContacto } from './validar'

export type EnviarCorreo = (correo: CorreoContacto) => Promise<void>

export type ResultadoContacto =
  | { ok: true }
  | { ok: false; motivo: 'datos'; campo: string }
  | { ok: false; motivo: 'envio' }

export async function procesarContacto(
  entrada: EntradaContacto,
  enviar: EnviarCorreo
): Promise<ResultadoContacto> {
  const validacion = validarContacto(entrada)

  if (!validacion.ok) {
    // Al bot se le devuelve un éxito silencioso: si le decimos que le hemos
    // calado, el siguiente intento vendrá sin el campo trampa.
    if (validacion.campo === 'trampa') return { ok: true }
    return { ok: false, motivo: 'datos', campo: validacion.campo }
  }

  try {
    await enviar(componerCorreo(validacion.datos))
  } catch {
    return { ok: false, motivo: 'envio' }
  }

  return { ok: true }
}
