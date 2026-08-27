'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useTranslations } from 'next-intl'
import type { Catalog } from '@/data/catalogs'
import CatalogDownloadLink from './CatalogDownloadLink'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const MIN_SCALE = 0.6
const MAX_SCALE = 2.4
const SCALE_STEP = 1.15

interface CatalogViewerProps {
  catalog: Catalog
}

export default function CatalogViewer({ catalog }: CatalogViewerProps) {
  const tPage = useTranslations('pages.catalogos')
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(720)
  const [numPages, setNumPages] = useState(0)
  const [page, setPage] = useState(1)
  const [scale, setScale] = useState(1)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const update = () => {
      const next = Math.floor(el.clientWidth)
      if (next > 0) setContainerWidth(next)
    }
    update()

    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
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

  const pageWidth = Math.max(280, Math.floor(containerWidth * scale))

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

  return (
    <div data-lenis-prevent className='flex flex-col'>
      <div
        className='flex flex-wrap items-center justify-center gap-3 md:gap-5 px-4 py-4 border-y'
        style={{
          backgroundColor: '#002A3A',
          borderColor: 'rgba(243, 236, 235, 0.08)',
        }}
      >
        <ToolbarButton
          label={tPage('previousPage')}
          disabled={page <= 1}
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
          disabled={numPages > 0 && page >= numPages}
          onClick={() => goTo(page + 1)}
        >
          →
        </ToolbarButton>
        <span className='hidden md:inline w-px h-4' style={{ backgroundColor: '#8C7732', opacity: 0.4 }} />
        <ToolbarButton label={tPage('zoomOut')} onClick={() => setScale((s) => Math.max(MIN_SCALE, s / SCALE_STEP))}>
          −
        </ToolbarButton>
        <ToolbarButton label={tPage('fitWidth')} onClick={() => setScale(1)}>
          {tPage('fitWidth')}
        </ToolbarButton>
        <ToolbarButton label={tPage('zoomIn')} onClick={() => setScale((s) => Math.min(MAX_SCALE, s * SCALE_STEP))}>
          +
        </ToolbarButton>
      </div>

      <div
        ref={containerRef}
        className='overflow-x-auto px-4 md:px-8 py-8 md:py-12 flex justify-center'
        style={{ backgroundColor: '#E8DEDC' }}
      >
        <Document
          file={catalog.file}
          loading={
            <p className='font-body py-24' style={{ color: '#002A3A', opacity: 0.5 }}>
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
            width={pageWidth}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className='shadow-2xl'
          />
        </Document>
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
