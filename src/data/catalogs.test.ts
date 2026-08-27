import { describe, expect, test } from 'vitest'
import {
  catalogMissingEssentials,
  catalogsFromRaw,
  catalogBySlug,
  catalogSlugs,
  catalogDownloadName,
  type CatalogI18n,
} from './catalogs'

const completo: CatalogI18n = {
  slug: 'mobiliario-2025',
  title: { es: 'Mobiliario 2025', en: 'Furniture 2025' },
  description: { es: 'Piezas de contract', en: 'Contract pieces' },
  cover: '/images/catalogos/mobiliario-2025/cover.webp',
  file: '/catalogos/mobiliario-2025/file.pdf',
  year: 2025,
}

const masAntiguo: CatalogI18n = {
  slug: 'iluminacion-2024',
  title: { es: 'Iluminación', en: 'Lighting' },
  description: { es: '', en: '' },
  cover: '/images/catalogos/iluminacion-2024/cover.webp',
  file: '/catalogos/iluminacion-2024/file.pdf',
  year: 2024,
}

const sinAno: CatalogI18n = {
  slug: 'textiles',
  title: { es: 'Textiles', en: 'Textiles' },
  description: { es: 'Tejidos', en: 'Fabrics' },
  cover: '/images/catalogos/textiles/cover.webp',
  file: '/catalogos/textiles/file.pdf',
}

describe('catalogMissingEssentials', () => {
  test('no exige nada si título ES, portada y PDF están', () => {
    expect(catalogMissingEssentials(completo)).toEqual([])
  })

  test('señala título ES, portada y PDF cuando faltan', () => {
    expect(
      catalogMissingEssentials({
        title: { es: '  ', en: 'Furniture' },
        cover: null,
        file: '',
      })
    ).toEqual(['título (ES)', 'portada', 'PDF'])
  })
})

describe('catalogsFromRaw', () => {
  test('localiza al español y ordena por año descendente, sin año al final', () => {
    const list = catalogsFromRaw([sinAno, masAntiguo, completo], 'es')

    expect(list.map((c) => c.slug)).toEqual([
      'mobiliario-2025',
      'iluminacion-2024',
      'textiles',
    ])
    expect(list[0]).toMatchObject({
      slug: 'mobiliario-2025',
      title: 'Mobiliario 2025',
      description: 'Piezas de contract',
      year: 2025,
      cover: completo.cover,
      file: completo.file,
    })
  })

  test('localiza al inglés', () => {
    const list = catalogsFromRaw([completo], 'en')
    expect(list[0]?.title).toBe('Furniture 2025')
    expect(list[0]?.description).toBe('Contract pieces')
  })
})

describe('catalogBySlug', () => {
  test('devuelve el catálogo localizado', () => {
    const found = catalogBySlug([completo, masAntiguo], 'iluminacion-2024', 'en')
    expect(found?.title).toBe('Lighting')
  })

  test('devuelve undefined si el slug no existe', () => {
    expect(catalogBySlug([completo], 'no-existe', 'es')).toBeUndefined()
  })
})

describe('catalogSlugs', () => {
  test('lista los slugs sin localizar', () => {
    expect(catalogSlugs([completo, masAntiguo])).toEqual([
      'mobiliario-2025',
      'iluminacion-2024',
    ])
  })
})

describe('catalogDownloadName', () => {
  test('usa el slug con extensión pdf', () => {
    expect(catalogDownloadName('mobiliario-2025')).toBe('mobiliario-2025.pdf')
  })
})
