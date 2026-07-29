import nodemailer from 'nodemailer'
import type { EnviarCorreo } from './procesar'

export type ConfiguracionSmtp = {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  destino: string
  remitente: string
}

const OBLIGATORIAS = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACTO_DESTINO',
] as const

export function leerConfiguracionSmtp(
  entorno: Record<string, string | undefined>
): ConfiguracionSmtp {
  const faltan = OBLIGATORIAS.filter((clave) => !entorno[clave]?.trim())

  if (faltan.length > 0) {
    throw new Error(
      `Falta configurar el envío del formulario de contacto: ${faltan.join(', ')}`
    )
  }

  const port = Number(entorno.SMTP_PORT)
  const user = entorno.SMTP_USER!.trim()

  return {
    host: entorno.SMTP_HOST!.trim(),
    port,
    // El 465 va cifrado desde el saludo; el 587 se cifra después con STARTTLS.
    secure: port === 465,
    user,
    pass: entorno.SMTP_PASS!,
    destino: entorno.CONTACTO_DESTINO!.trim(),
    remitente: entorno.CONTACTO_REMITENTE?.trim() || `Web OMIO <${user}>`,
  }
}

export const enviarPorSmtp: EnviarCorreo = async (correo) => {
  const config = leerConfiguracionSmtp(process.env)

  const transporte = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  })

  await transporte.sendMail({
    from: config.remitente,
    to: config.destino,
    replyTo: correo.replyTo,
    subject: correo.subject,
    text: correo.text,
  })
}
