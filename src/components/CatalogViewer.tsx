'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useTranslations } from 'next-intl'
import type { Catalog } from '@/data/catalogs'
import { renderWidth, type FitMode } from '@/lib/pdf/fit'
import CatalogDownloadLink from './CatalogDownloadLink'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const MIN_ZOOM = 0.6
const MAX_ZOOM = 3
const ZOOM_STEP = 1.15
/** Aire alrededor de la página, en píxeles, para que no toque los bordes. */
const STAGE_PADDING = 32
/** Recorrido mínimo de un deslizamiento para que cuente como pasar página. */
const SWIPE_THRESHOLD = 48

interface CatalogViewerProps {
  catalog: Catalog
}

export default function CatalogViewer({ catalog }: CatalogViewerProps) {
  const tPage = useTranslations('pages.catalogos')
  const stageRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const [stage, setStage] = useState({ width: 720, height: 520 })
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 })
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const [fitMode, setFitMode] = useState<FitMode>('screen')
  const [zoom, setZoom] = useState(1)
  const [failed, setFailed] = useState(false)

  // El hueco real disponible: ancho Y alto. Medir sólo el ancho era lo que
  // hacía que la página se saliera por abajo.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return

    const update = () => {
      const width = Math.floor(el.clientWidth) - STAGE_PADDING
      const height = Math.floor(el.clientHeight) - STAGE_PADDING
      if (width > 0 && height > 0) {
        setStage((prev) =>
          prev.width === width && prev.height === height
            ? prev
            : { width, height }
        )
      }
    }

    const frame = requestAnimationFrame(update)
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  const goTo = useCallback(
    (next: number) => {
      if (numPages < 1) return
      setPage(Math.min(numPages, Math.max(1, next)))
    },
    [numPages]
  )

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goTo(page - 1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goTo(page + 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo, page])

  const width = renderWidth({
    pageWidth: pageSize.width,
    pageHeight: pageSize.height,
    boxWidth: stage.width,
    boxHeight: stage.height,
    mode: fitMode,
    zoom,
  })
  // Reservar el hueco de la página mientras se dibuja la siguiente: sin esto el
  // contenedor colapsa un instante y la página entera pega un salto.
  const placeholderHeight =
    pageSize.width > 0 ? (width * pageSize.height) / pageSize.width : stage.height

  if (failed) {
    return (
      <div
        className='px-6 md:px-12 py-16 text-center'
        style={{ backgroundColor: '#F3ECEB' }}
      >
        <p
          className='font-body text-base md:text-lg max-w-xl mx-auto mb-8'
          style={{ color: '#002A3A', opacity: 0.8 }}
        >
          {tPage('viewerError')}
        </p>
        <CatalogDownloadLink catalog={catalog} label={tPage('downloadPdf')} />
      </div>
    )
  }

  const atFirst = page <= 1
  const atLast = numPages > 0 && page >= numPages

  return (
    <div
      data-lenis-prevent
      className='flex flex-col h-[calc(100svh-9rem)] md:h-[calc(100svh-6rem)] min-h-[420px]'
    >
      <div
        className='shrink-0 flex flex-wrap items-center justify-center gap-3 md:gap-5 px-4 py-3 border-y'
        style={{
          backgroundColor: '#002A3A',
          borderColor: 'rgba(243, 236, 235, 0.08)',
        }}
      >
        <ToolbarButton
          label={tPage('previousPage')}
          disabled={atFirst}
          onClick={() => goTo(page - 1)}
        >
          ←
        </ToolbarButton>
        <span
          className='font-ingeniero text-[11px] tracking-[0.15em] uppercase tabular-nums'
          style={{ color: '#F3ECEB' }}
          aria-live='polite'
        >
          {numPages
            ? tPage('pageOf', { current: page, total: numPages })
            : tPage('loadingViewer')}
        </span>
        <ToolbarButton
          label={tPage('nextPage')}
          disabled={atLast}
          onClick={() => goTo(page + 1)}
        >
          →
        </ToolbarButton>

        <span
          className='hidden md:inline w-px h-4'
          style={{ backgroundColor: '#8C7732', opacity: 0.4 }}
        />

        <ToolbarButton
          label={tPage('zoomOut')}
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z / ZOOM_STEP))}
        >
          −
        </ToolbarButton>
        <ToolbarButton
          label={fitMode === 'screen' ? tPage('fitWidth') : tPage('fitScreen')}
          onClick={() => {
            setFitMode((m) => (m === 'screen' ? 'width' : 'screen'))
            setZoom(1)
          }}
        >
          {fitMode === 'screen' ? tPage('fitWidth') : tPage('fitScreen')}
        </ToolbarButton>
        <ToolbarButton
          label={tPage('zoomIn')}
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z * ZOOM_STEP))}
        >
          +
        </ToolbarButton>

        <span
          className='w-full md:w-auto text-center font-ingeniero text-[10px] tracking-[0.15em] uppercase'
          style={{ color: '#F3ECEB', opacity: 0.55 }}
        >
          {tPage('navHint')}
        </span>
      </div>

      <div className='relative flex-1' style={{ backgroundColor: '#E8DEDC' }}>
        <div
          ref={stageRef}
          className='absolute inset-0 overflow-auto flex items-center justify-center p-4'
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current
            touchStartX.current = null
            if (start == null) return
            const delta = (e.changedTouches[0]?.clientX ?? start) - start
            if (Math.abs(delta) < SWIPE_THRESHOLD) return
            goTo(delta < 0 ? page + 1 : page - 1)
          }}
        >
          <Document
            file={catalog.file}
            loading={
              <p
                className='font-body py-24'
                style={{ color: '#002A3A', opacity: 0.5 }}
              >
                {tPage('loadingViewer')}
              </p>
            }
            error={
              <p className='font-body py-24' style={{ color: '#002A3A' }}>
                {tPage('viewerError')}
              </p>
            }
            onLoadSuccess={({ numPages: next }) => {
              setNumPages(next)
              setPage(1)
              setFailed(false)
            }}
            onLoadError={() => setFailed(true)}
          >
            <Page
              pageNumber={page}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className='shadow-2xl'
              loading={<div style={{ width, height: placeholderHeight }} />}
              onLoadSuccess={(loaded) => {
                const next = {
                  width: loaded.originalWidth,
                  height: loaded.originalHeight,
                }
                setPageSize((prev) =>
                  prev.width === next.width && prev.height === next.height
                    ? prev
                    : next
                )
              }}
            />
          </Document>
        </div>

        <EdgeButton
          side='left'
          label={tPage('previousPage')}
          disabled={atFirst}
          onClick={() => goTo(page - 1)}
        >
          ‹
        </EdgeButton>
        <EdgeButton
          side='right'
          label={tPage('nextPage')}
          disabled={atLast}
          onClick={() => goTo(page + 1)}
        >
          ›
        </EdgeButton>
      </div>
    </div>
  )
}

function ToolbarButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type='button'
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className='font-ingeniero text-[11px] tracking-[0.15em] uppercase px-2 py-1 transition-opacity disabled:opacity-30 hover:opacity-80'
      style={{ color: '#8C7732' }}
    >
      {children}
    </button>
  )
}

/** Flecha grande sobre el papel: pasar página tiene que verse sin buscarlo. */
function EdgeButton({
  side,
  label,
  onClick,
  disabled,
  children,
}: {
  side: 'left' | 'right'
  label: string
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type='button'
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === 'left' ? 'left-2 md:left-4' : 'right-2 md:right-4'
      } w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl leading-none transition-opacity disabled:opacity-0 hover:opacity-100`}
      style={{
        backgroundColor: 'rgba(0, 42, 58, 0.85)',
        color: '#F3ECEB',
        opacity: 0.75,
      }}
    >
      {children}
    </button>
  )
}
