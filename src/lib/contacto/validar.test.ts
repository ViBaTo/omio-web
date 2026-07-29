import { describe, expect, test } from 'vitest'
import { validarContacto } from './validar'

describe('validarContacto', () => {
  const valido = {
    name: 'Ana Ruiz',
    email: 'ana@hotelmercer.com',
    company: 'Hotel Mercer',
    projectType: 'hospitality',
    message: 'Necesitamos 120 luminarias a medida para el lobby.',
  }

  test('rechaza un envío sin nombre', () => {
    const resultado = validarContacto({ ...valido, name: '   ' })

    expect(resultado.ok).toBe(false)
    expect(resultado.ok === false && resultado.campo).toBe('name')
  })

  test('rechaza un email sin arroba', () => {
    const resultado = validarContacto({ ...valido, email: 'ana-arroba-hotel.com' })

    expect(resultado.ok).toBe(false)
    expect(resultado.ok === false && resultado.campo).toBe('email')
  })

  test('rechaza un envío sin mensaje', () => {
    const resultado = validarContacto({ ...valido, message: '' })

    expect(resultado.ok).toBe(false)
    expect(resultado.ok === false && resultado.campo).toBe('message')
  })

  test('descarta el envío si el campo trampa viene relleno (bot)', () => {
    const resultado = validarContacto({ ...valido, website: 'http://spam.example' })

    expect(resultado.ok).toBe(false)
    expect(resultado.ok === false && resultado.campo).toBe('trampa')
  })

  test('rechaza un mensaje desmesurado', () => {
    const resultado = validarContacto({ ...valido, message: 'a'.repeat(5001) })

    expect(resultado.ok).toBe(false)
    expect(resultado.ok === false && resultado.campo).toBe('message')
  })

  test('acepta un envío correcto y devuelve los datos sin espacios sobrantes', () => {
    const resultado = validarContacto({ ...valido, name: '  Ana Ruiz  ' })

    expect(resultado.ok).toBe(true)
    expect(resultado.ok === true && resultado.datos.name).toBe('Ana Ruiz')
    expect(resultado.ok === true && resultado.datos.company).toBe('Hotel Mercer')
  })
})
