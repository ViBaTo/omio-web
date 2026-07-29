import { describe, expect, test } from 'vitest'
import { componerCorreo } from './mensaje'

describe('componerCorreo', () => {
  const datos = {
    name: 'Ana Ruiz',
    email: 'ana@hotelmercer.com',
    company: 'Hotel Mercer',
    projectType: 'hospitality',
    message: 'Necesitamos 120 luminarias a medida para el lobby.',
  }

  test('el asunto identifica a quien escribe y su empresa', () => {
    const correo = componerCorreo(datos)

    expect(correo.subject).toContain('Ana Ruiz')
    expect(correo.subject).toContain('Hotel Mercer')
  })

  test('el cuerpo recoge todo lo que rellenó el cliente', () => {
    const correo = componerCorreo(datos)

    expect(correo.text).toContain('ana@hotelmercer.com')
    expect(correo.text).toContain('hospitality')
    expect(correo.text).toContain('120 luminarias')
  })

  test('al responder el correo se le escribe al cliente', () => {
    const correo = componerCorreo(datos)

    expect(correo.replyTo).toBe('ana@hotelmercer.com')
  })

  test('un nombre con saltos de línea no puede inyectar cabeceras en el asunto', () => {
    const correo = componerCorreo({
      ...datos,
      name: 'Ana\r\nBcc: victima@ejemplo.com',
    })

    expect(correo.subject).not.toContain('\n')
    expect(correo.subject).not.toContain('\r')
  })

  test('sin empresa el asunto sigue siendo legible', () => {
    const correo = componerCorreo({ ...datos, company: '' })

    expect(correo.subject).toContain('Ana Ruiz')
    expect(correo.subject).not.toContain('()')
  })
})
