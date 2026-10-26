import { NextRequest, NextResponse } from 'next/server'

/** Puerto interno de Railway. No confundir con el puerto de `next start` en local. */
const RAILWAY_INTERNAL_PORT = '8080'

const REQUEST_HEADER_BLOCKLIST = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
  'accept-encoding',
])

const RESPONSE_HEADER_BLOCKLIST = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  // fetch (undici) descomprime el cuerpo y deja content-encoding/length
  // del wire. Si los copiamos, el navegador intenta descomprimir otra
  // vez (página sin estilos, "incorrect header check").
  'content-encoding',
  'content-length',
])

/**
 * Origen del servicio de control. Vacío o inválido → no hay proxy
 * (la ruta responde 404, igual que si no existiera).
 */
export function getControlOrigin(
  env: NodeJS.ProcessEnv = process.env
): string | null {
  const raw = env.CONTROL_ORIGIN?.trim()
  if (!raw) return null
  try {
    return new URL(raw).origin
  } catch {
    return null
  }
}

/**
 * Host/proto públicos del visitante. Prefiere X-Forwarded-* (Cloudflare /
 * Railway) y quita el :8080 interno de Railway, pero conserva el puerto
 * en local (p. ej. localhost:3111) para no romper redirects de prueba.
 */
export function resolvePublicOrigin(request: NextRequest): URL {
  const url = request.nextUrl.clone()
  const forwardedHost = firstForwarded(request.headers.get('x-forwarded-host'))
  const forwardedProto = firstForwarded(request.headers.get('x-forwarded-proto'))

  if (forwardedHost) {
    url.host = forwardedHost
    if (url.port === RAILWAY_INTERNAL_PORT) {
      url.port = ''
    }
  }
  if (forwardedProto) {
    url.protocol = `${forwardedProto}:`
  }
  return url
}

export function buildUpstreamUrl(
  request: NextRequest,
  controlOrigin: string
): URL {
  return new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    controlOrigin
  )
}

export function buildUpstreamHeaders(request: NextRequest): Headers {
  const headers = new Headers()
  const publicOrigin = resolvePublicOrigin(request)

  request.headers.forEach((value, key) => {
    if (REQUEST_HEADER_BLOCKLIST.has(key.toLowerCase())) return
    headers.append(key, value)
  })

  // Host lo pone fetch según CONTROL_ORIGIN. X-Forwarded-Host/Proto son
  // los que Next (server actions) y next-intl usan para comparar Origin
  // y para construir redirects absolutos.
  headers.set('x-forwarded-host', publicOrigin.host)
  headers.set('x-forwarded-proto', publicOrigin.protocol.replace(/:$/, ''))
  headers.set('x-forwarded-port', publicOrigin.port || defaultPort(publicOrigin.protocol))
  // identity: que fetch no pida gzip por su cuenta y no descomprima a
  // espaldas de los headers que reenviamos al navegador.
  headers.set('accept-encoding', 'identity')

  return headers
}

export function rewriteLocation(
  location: string,
  request: NextRequest,
  controlOrigin: string
): string {
  try {
    const resolved = new URL(location, controlOrigin)
    if (resolved.origin !== new URL(controlOrigin).origin) {
      return location
    }
    const publicOrigin = resolvePublicOrigin(request)
    return `${publicOrigin.origin}${resolved.pathname}${resolved.search}${resolved.hash}`
  } catch {
    return location
  }
}

/**
 * Si el control pone Domain=<host del servicio>, el navegador no guardaría
 * la cookie en omioatelier.com. Se quita Domain para que quede host-only
 * del dominio público.
 */
export function rewriteSetCookie(
  cookie: string,
  controlOrigin: string
): string {
  let controlHost: string
  try {
    controlHost = new URL(controlOrigin).hostname
  } catch {
    return cookie
  }

  const domainRe = /(?:;\s*)domain=([^;]*)/i
  const match = cookie.match(domainRe)
  if (!match) return cookie

  const cookieDomain = match[1].trim().replace(/^\./, '')
  const controlBare = controlHost.replace(/^\./, '')
  if (cookieDomain !== controlBare && !cookieDomain.endsWith(`.${controlBare}`)) {
    return cookie
  }

  return cookie.replace(domainRe, '')
}

export function buildClientHeaders(
  upstream: Headers,
  request: NextRequest,
  controlOrigin: string
): Headers {
  const headers = new Headers()

  upstream.forEach((value, key) => {
    const lower = key.toLowerCase()
    if (RESPONSE_HEADER_BLOCKLIST.has(lower)) return
    if (lower === 'set-cookie') return
    if (lower === 'location') {
      headers.set(key, rewriteLocation(value, request, controlOrigin))
      return
    }
    headers.set(key, value)
  })

  const cookies =
    typeof upstream.getSetCookie === 'function' ? upstream.getSetCookie() : []
  for (const cookie of cookies) {
    headers.append('set-cookie', rewriteSetCookie(cookie, controlOrigin))
  }

  return headers
}

export async function proxyControlRequest(
  request: NextRequest,
  controlOrigin: string
): Promise<NextResponse> {
  const target = buildUpstreamUrl(request, controlOrigin)
  const headers = buildUpstreamHeaders(request)
  const method = request.method
  const hasBody = method !== 'GET' && method !== 'HEAD'

  const init: RequestInit & { duplex?: 'half' } = {
    method,
    headers,
    redirect: 'manual',
    cache: 'no-store',
  }
  if (hasBody) {
    init.body = request.body
    init.duplex = 'half'
  }

  let upstream: Response
  try {
    upstream = await fetch(target, init)
  } catch {
    return new NextResponse('Bad Gateway', { status: 502 })
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: buildClientHeaders(upstream.headers, request, controlOrigin),
  })
}

function firstForwarded(value: string | null): string | null {
  if (!value) return null
  const first = value.split(',')[0]?.trim()
  return first || null
}

function defaultPort(protocol: string): string {
  return protocol === 'https:' ? '443' : '80'
}
