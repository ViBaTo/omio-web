import { describe, expect, test } from 'vitest'
import { responderContacto } from './responder'

const valido = {
  name: 'Ana Ruiz',
  email: 'ana@hotelmercer.com',
  company: 'Hotel Mercer',
  projectType: 'hospitality',
  message: 'Necesitamos 120 luminarias a medida para el lobby.',
}

function peticion(cuerpo: unknown): Request {
  return new Request('https://omioatelier.com/api/contacto', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: typeof cuerpo === 'string' ? cuerpo : JSON.stringify(cuerpo),
  })
}

const enviarSiempreBien = async () => {}

describe('responderContacto', () => {
  test('responde 200 cuando el correo sale', async () => {
    const respuesta = await responderContacto(peticion(valido), enviarSiempreBien)

    expect(respuesta.status).toBe(200)
    await expect(respuesta.json()).resolves.toEqual({ ok: true })
  })

  test('responde 400 y señala el campo cuando los datos no valen', async () => {
    const respuesta = await responderContacto(
      peticion({ ...valido, email: 'sin-arroba' }),
      enviarSiempreBien
    )

    expect(respuesta.status).toBe(400)
    await expect(respuesta.json()).resolves.toEqual({ error: 'datos', campo: 'email' })
  })

  test('responde 400 si el cuerpo no es JSON válido', async () => {
    const respuesta = await responderContacto(peticion('esto no es json'), enviarSiempreBien)

    expect(respuesta.status).toBe(400)
  })

  test('responde 502 cuando el servidor de correo falla', async () => {
    const respuesta = await responderContacto(peticion(valido), async () => {
      throw new Error('SMTP caído')
    })

    expect(respuesta.status).toBe(502)
    await expect(respuesta.json()).resolves.toEqual({ error: 'envio' })
  })
})
