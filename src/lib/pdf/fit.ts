/**
 * Cálculo del tamaño con el que se dibuja una página de PDF en el visor.
 *
 * `react-pdf` sólo acepta un ancho, así que el ajuste "a pantalla" hay que
 * traducirlo a un ancho: se toma la escala que hace caber la página entera
 * —ancho Y alto— en el hueco disponible.
 */

export type FitMode = 'screen' | 'width'

/** Por debajo de esto la página no se lee; preferimos que desborde. */
export const MIN_RENDER_WIDTH = 280

export interface RenderWidthInput {
  /** Dimensiones naturales de la página del PDF (0 si aún no se conocen). */
  pageWidth: number
  pageHeight: number
  /** Hueco disponible en pantalla. */
  boxWidth: number
  boxHeight: number
  mode: FitMode
  /** 1 = el ajuste exacto; >1 acerca, <1 aleja. */
  zoom: number
}

export function renderWidth({
  pageWidth,
  pageHeight,
  boxWidth,
  boxHeight,
  mode,
  zoom,
}: RenderWidthInput): number {
  const desconocida = pageWidth <= 0 || pageHeight <= 0
  const base =
    mode === 'width' || desconocida
      ? boxWidth
      : pageWidth * Math.min(boxWidth / pageWidth, boxHeight / pageHeight)

  // Hacia abajo a propósito: redondear hacia arriba deja la página un pelo
  // más alta que el hueco y reaparece la barra de scroll que queríamos quitar.
  return Math.max(MIN_RENDER_WIDTH, Math.floor(base * zoom))
}
