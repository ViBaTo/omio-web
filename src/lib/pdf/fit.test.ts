import { describe, expect, it } from 'vitest'
import { MIN_RENDER_WIDTH, renderWidth } from './fit'

/**
 * Una página apaisada de catálogo (A4 doble) en un portátil: si sólo se mira el
 * ancho, la página se sale por abajo y hay que ir haciendo scroll. Eso es lo que
 * se veía en la web.
 */
const spread = { pageWidth: 1684, pageHeight: 1191 }
const portrait = { pageWidth: 595, pageHeight: 842 }
const laptop = { boxWidth: 1440, boxHeight: 620 }

describe('renderWidth', () => {
  it('ajusta a la pantalla: la página entera cabe de alto', () => {
    const w = renderWidth({ ...spread, ...laptop, mode: 'screen', zoom: 1 })
    const alto = (w * spread.pageHeight) / spread.pageWidth
    expect(alto).toBeLessThanOrEqual(laptop.boxHeight)
    expect(w).toBeLessThanOrEqual(laptop.boxWidth)
  })

  it('ajusta a la pantalla una página vertical sin desbordar el alto', () => {
    const w = renderWidth({ ...portrait, ...laptop, mode: 'screen', zoom: 1 })
    const alto = (w * portrait.pageHeight) / portrait.pageWidth
    expect(Math.round(alto)).toBeLessThanOrEqual(laptop.boxHeight)
  })

  it('en modo ancho ocupa todo el ancho disponible aunque no quepa de alto', () => {
    const w = renderWidth({ ...spread, ...laptop, mode: 'width', zoom: 1 })
    expect(w).toBe(laptop.boxWidth)
  })

  it('el zoom multiplica sobre el ajuste elegido', () => {
    const base = renderWidth({ ...spread, ...laptop, mode: 'screen', zoom: 1 })
    const doble = renderWidth({ ...spread, ...laptop, mode: 'screen', zoom: 2 })
    // Con píxeles enteros el doble exacto no siempre es posible: basta con
    // que el zoom escale de verdad, sin desviarse más de un píxel.
    expect(Math.abs(doble - base * 2)).toBeLessThanOrEqual(1)
  })

  it('sin dimensiones de la página todavía, usa el ancho de la caja', () => {
    const w = renderWidth({
      pageWidth: 0,
      pageHeight: 0,
      ...laptop,
      mode: 'screen',
      zoom: 1,
    })
    expect(w).toBe(laptop.boxWidth)
  })

  it('nunca devuelve un ancho ilegible', () => {
    const w = renderWidth({
      ...spread,
      boxWidth: 50,
      boxHeight: 40,
      mode: 'screen',
      zoom: 1,
    })
    expect(w).toBe(MIN_RENDER_WIDTH)
  })
})
