import { describe, expect, test, vi } from 'vitest'
import { procesarContacto } from './procesar'

const valido = {
  name: 'Ana Ruiz',
  email: 'ana@hotelmercer.com',
  company: 'Hotel Mercer',
  projectType: 'hospitality',
  message: 'Necesitamos 120 luminarias a medida para el lobby.',
}

describe('procesarContacto', () => {
  test('con datos válidos entrega el correo al envío', async () => {
    const enviados: unknown[] = []

    const resultado = await procesarContacto(valido, async (correo) => {
      enviados.push(correo)
    })

    expect(resultado.ok).toBe(true)
    expect(enviados).toHaveLength(1)
    expect(enviados[0]).toMatchObject({
      subject: 'Web OMIO · Ana Ruiz (Hotel Mercer)',
      replyTo: 'ana@hotelmercer.com',
    })
  })

  test('si faltan datos no se envía ningún correo', async () => {
    const enviar = vi.fn()

    const resultado = await procesarContacto({ ...valido, email: 'no-es-un-email' }, enviar)

    expect(resultado.ok).toBe(false)
    expect(resultado.ok === false && resultado.motivo).toBe('datos')
    expect(enviar).not.toHaveBeenCalled()
  })

  test('al bot se le responde que todo fue bien, pero no se envía nada', async () => {
    const enviar = vi.fn()

    const resultado = await procesarContacto({ ...valido, website: 'http://spam.example' }, enviar)

    expect(resultado.ok).toBe(true)
    expect(enviar).not.toHaveBeenCalled()
  })

  test('si el servidor de correo falla, se avisa del fallo en vez de fingir éxito', async () => {
    const resultado = await procesarContacto(valido, async () => {
      throw new Error('SMTP caído')
    })

    expect(resultado.ok).toBe(false)
    expect(resultado.ok === false && resultado.motivo).toBe('envio')
  })
})
