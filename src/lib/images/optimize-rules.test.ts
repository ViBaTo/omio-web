import { describe, expect, test } from 'vitest'
import {
  MAX_LONG_EDGE,
  SKIP_MAX_BYTES,
  WEBP_QUALITY,
  shouldSkip,
  toWebpUrl,
  rewriteImageRefs,
} from './optimize-rules'

describe('constantes', () => {
  test('valores acordados en la spec', () => {
    expect(MAX_LONG_EDGE).toBe(2000)
    expect(SKIP_MAX_BYTES).toBe(200 * 1024)
    expect(WEBP_QUALITY).toBe(80)
  })
})

describe('shouldSkip', () => {
  test('salta las que ya son pequeñas y ligeras', () => {
    expect(shouldSkip(1600, 100_000)).toBe(true)
  })

  test('no salta si pesa demasiado aunque sea pequeña', () => {
    expect(shouldSkip(1600, 500_000)).toBe(false)
  })

  test('no salta si el lado largo supera el máximo', () => {
    expect(shouldSkip(3908, 100_000)).toBe(false)
  })
})

describe('toWebpUrl', () => {
  test('cambia .png por .webp', () => {
    expect(toWebpUrl('/images/new/03.png')).toBe('/images/new/03.webp')
  })

  test('respeta el nombre URL-encoded con espacio y arroba', () => {
    expect(toWebpUrl('/images/Recurso%201%404x.png')).toBe(
      '/images/Recurso%201%404x.webp'
    )
  })

  test('cambia .jpg en rutas con doble prefijo de Keystatic', () => {
    expect(toWebpUrl('/images/projects/foo__foo__hero.jpg')).toBe(
      '/images/projects/foo__foo__hero.webp'
    )
  })

  test('cambia .jpeg también', () => {
    expect(toWebpUrl('/images/x.jpeg')).toBe('/images/x.webp')
  })

  test('no toca .svg', () => {
    expect(toWebpUrl('/images/logo.svg')).toBe('/images/logo.svg')
  })
})

describe('rewriteImageRefs', () => {
  test('reescribe una ruta en JSON', () => {
    const src = '  "src": "/images/projects/foo__foo__hero.jpg",'
    expect(rewriteImageRefs(src)).toBe(
      '  "src": "/images/projects/foo__foo__hero.webp",'
    )
  })

  test('reescribe dentro de url() con comillas simples', () => {
    const src = "url('/images/new/01.png')"
    expect(rewriteImageRefs(src)).toBe("url('/images/new/01.webp')")
  })

  test('reescribe dentro de url() sin comillas', () => {
    const src = 'url(/images/new/01.png)'
    expect(rewriteImageRefs(src)).toBe('url(/images/new/01.webp)')
  })

  test('reescribe rutas URL-encoded (Recurso)', () => {
    const src = "'/images/Recurso%201%404x.png'"
    expect(rewriteImageRefs(src)).toBe("'/images/Recurso%201%404x.webp'")
  })

  test('convierte /images/materials (inglés, sí se convierte)', () => {
    const src = '"image": "/images/materials/acero-negro.jpg"'
    expect(rewriteImageRefs(src)).toBe('"image": "/images/materials/acero-negro.webp"')
  })

  test('NO toca /images/materiales (español, carpeta excluida)', () => {
    const src = '"image": "/images/materiales/algo.jpg"'
    expect(rewriteImageRefs(src)).toBe(src)
  })

  test('NO toca .svg', () => {
    const src = 'src="/images/logo-white.svg"'
    expect(rewriteImageRefs(src)).toBe(src)
  })

  test('deja intacto el texto sin rutas de imagen', () => {
    const src = 'const x = "hola.pngfoo"'
    expect(rewriteImageRefs(src)).toBe(src)
  })
})
