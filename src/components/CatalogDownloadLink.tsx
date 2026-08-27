import type { Catalog } from '@/data/catalogs'
import { catalogDownloadName } from '@/data/catalogs'

interface CatalogDownloadLinkProps {
  catalog: Catalog
  label: string
  className?: string
  variant?: 'primary' | 'bar'
}

export default function CatalogDownloadLink({
  catalog,
  label,
  className = '',
  variant = 'primary',
}: CatalogDownloadLinkProps) {
  const base =
    variant === 'bar'
      ? 'flex items-center justify-center w-full py-4 font-ingeniero text-[13px] tracking-[0.2em] uppercase'
      : 'inline-flex items-center justify-center px-8 py-3 font-ingeniero text-[13px] tracking-[0.2em] uppercase border transition-opacity hover:opacity-80'

  return (
    <a
      href={catalog.file}
      download={catalogDownloadName(catalog.slug)}
      className={`${base} ${className}`.trim()}
      style={
        variant === 'bar'
          ? { backgroundColor: '#002A3A', color: '#F3ECEB' }
          : { borderColor: '#8C7732', color: '#002A3A' }
      }
    >
      {label}
    </a>
  )
}
