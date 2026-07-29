import { describe, expect, test } from 'vitest'
import { leerConfiguracionSmtp } from './smtp'

const entornoCompleto = {
  SMTP_HOST: 'mail.omioatelier.com',
  SMTP_PORT: '465',
  SMTP_USER: 'web@omioatelier.com',
  SMTP_PASS: 'secreto',
  CONTACTO_DESTINO: 'hola@omioatelier.com',
}

describe('leerConfiguracionSmtp', () => {
  test('lee la configuración del entorno', () => {
    const config = leerConfiguracionSmtp(entornoCompleto)

    expect(config).toMatchObject({
      host: 'mail.omioatelier.com',
      port: 465,
      secure: true,
      destino: 'hola@omioatelier.com',
    })
  })

  test('avisa de qué variable falta en vez de fallar en silencio', () => {
    const incompleto = { ...entornoCompleto, SMTP_PASS: '' }

    expect(() => leerConfiguracionSmtp(incompleto)).toThrowError(/SMTP_PASS/)
  })

  test('el puerto 587 no usa conexión cifrada desde el principio', () => {
    const config = leerConfiguracionSmtp({ ...entornoCompleto, SMTP_PORT: '587' })

    expect(config.port).toBe(587)
    expect(config.secure).toBe(false)
  })

  test('si no se indica remitente, se usa el propio usuario del buzón', () => {
    const config = leerConfiguracionSmtp(entornoCompleto)

    expect(config.remitente).toContain('web@omioatelier.com')
  })
})
