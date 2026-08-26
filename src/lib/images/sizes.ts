// `sizes` hints for next/image so the browser downloads an appropriately scaled
// variant per breakpoint instead of the full 2000px asset. One entry per usage.
export const IMAGE_SIZES = {
  fullBleed: '100vw',
  atelierGallery: '(max-width: 768px) 50vw, 25vw',
  card: '(max-width: 768px) 100vw, 50vw',
  projectGallery: '(max-width: 768px) 100vw, 70vw',
  thumb: '112px',
} as const

export type ImageSizeKey = keyof typeof IMAGE_SIZES
