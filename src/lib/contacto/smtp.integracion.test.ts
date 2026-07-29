import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { SMTPServer } from 'smtp-server'
import { enviarPorSmtp } from './smtp'

/**
 * Prueba de integración real: levanta un servidor SMTP de mentira en local y
 * comprueba que el envío del formulario llega de verdad, autenticado y con las
 * cabeceras correctas. Sin esto solo sabríamos que el código "parece" enviar.
 */

const PUERTO = 2526
const recibidos: { usuario?: string; sobre: string[]; contenido: string }[] = []
let servidor: SMTPServer

beforeAll(async () => {
  servidor = new SMTPServer({
    authOptional: false,
    disabledCommands: ['STARTTLS'],
    onAuth(auth, _session, callback) {
      if (auth.username === 'web@omioatelier.com' && auth.password === 'secreto') {
        callback(null, { user: auth.username })
        return
      }
      callback(new Error('Credenciales incorrectas'))
    },
    onData(stream, session, callback) {
      let contenido = ''
      stream.on('data', (trozo) => (contenido += trozo.toString()))
      stream.on('end', () => {
        recibidos.push({
          usuario: session.user as string | undefined,
          sobre: session.envelope.rcptTo.map((r) => r.address),
          contenido,
        })
        callback()
      })
    },
  })

  await new Promise<void>((resolve) => servidor.listen(PUERTO, '127.0.0.1', resolve))

  process.env.SMTP_HOST = '127.0.0.1'
  process.env.SMTP_PORT = String(PUERTO)
  process.env.SMTP_USER = 'web@omioatelier.com'
  process.env.SMTP_PASS = 'secreto'
  process.env.CONTACTO_DESTINO = 'hola@omioatelier.com'
})

afterAll(async () => {
  await new Promise<void>((resolve) => servidor.close(() => resolve()))
})

describe('enviarPorSmtp contra un servidor real', () => {
  test('el correo llega al buzón de OMIO, autenticado y respondible al cliente', async () => {
    await enviarPorSmtp({
      subject: 'Web OMIO · Ana Ruiz (Hotel Mercer)',
      text: 'Necesitamos 120 luminarias a medida para el lobby.',
      replyTo: 'ana@hotelmercer.com',
    })

    expect(recibidos).toHaveLength(1)
    expect(recibidos[0].usuario).toBe('web@omioatelier.com')
    expect(recibidos[0].sobre).toEqual(['hola@omioatelier.com'])
    expect(recibidos[0].contenido).toContain('Reply-To: ana@hotelmercer.com')
    expect(recibidos[0].contenido).toContain('120 luminarias')
  })
})
