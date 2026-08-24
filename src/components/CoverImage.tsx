import Image from 'next/image'

interface CoverImageProps {
  src: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
  opacity?: number
}

/**
 * Drop-in replacement for the old `background-image` divs. The parent must be
 * `relative overflow-hidden` with a fixed aspect ratio; this fills it and crops
 * with `object-cover`, matching the previous `bg-cover bg-center` look while
 * letting next/image lazy-load and serve scaled variants.
 */
export default function CoverImage({
  src,
  alt,
  sizes,
  className,
  priority,
  opacity,
}: CoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={['object-cover', className].filter(Boolean).join(' ')}
      style={opacity != null ? { opacity } : undefined}
    />
  )
}
