export const MAX_LONG_EDGE = 2000
export const SKIP_MAX_BYTES = 200 * 1024
export const WEBP_QUALITY = 80

export function shouldSkip(longEdge: number, bytes: number): boolean {
  return longEdge <= MAX_LONG_EDGE && bytes < SKIP_MAX_BYTES
}

export function toWebpUrl(url: string): string {
  return url.replace(/\.(png|jpe?g)(?=[?#]|$)/gi, '.webp')
}

export function rewriteImageRefs(source: string): string {
  return source.replace(
    /(["'(])([^"'()\s]+)\.(png|jpe?g)(["')])/gi,
    (match, open, filePath, ext, close) => {
      if (filePath.includes('/images/materiales')) return match
      return `${open}${toWebpUrl(`${filePath}.${ext}`)}${close}`
    }
  )
}
