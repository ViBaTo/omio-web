import http from 'node:http'
import { gzipSync } from 'node:zlib'
import { NextRequest } from 'next/server'
import { afterEach, describe, expect, test } from 'vitest'
import {
  buildClientHeaders,
  buildUpstreamHeaders,
  buildUpstreamUrl,
  getControlOrigin,
  proxyControlRequest,
  resolvePublicOrigin,
  rewriteLocation,
  rewriteSetCookie,
} from './control-proxy'

function request(
  url: string,
  init?: { headers?: Record<string, string>; method?: string }
): NextRequest {
  return new NextRequest(url, init)
}

describe('getControlOrigin', () => {
  test('sin variable, no hay proxy', () => {
    expect(getControlOrigin({})).toBeNull()
    expect(getControlOrigin({ CONTROL_ORIGIN: '' })).toBeNull()
    expect(getControlOrigin({ CONTROL_ORIGIN: '   ' })).toBeNull()
  })

  test('rechaza un valor que no es URL', () => {
    expect(getControlOrigin({ CONTROL_ORIGIN: 'railway-interno' })).toBeNull()
  })

  test('devuelve solo el origen, aunque le pasen path o barra final', () => {
    expect(
      getControlOrigin({
        CONTROL_ORIGIN: 'https://omio-control.up.railway.app/control/',
      })
    ).toBe('https://omio-control.up.railway.app')
  })
})

describe('resolvePublicOrigin', () => {
  test('en local conserva el puerto del request', () => {
    const origin = resolvePublicOrigin(
      request('http://localhost:3111/control/login')
    )

    expect(origin.origin).toBe('http://localhost:3111')
  })

  test('usa X-Forwarded-* y quita el :8080 interno de Railway', () => {
    const origin = resolvePublicOrigin(
      request('http://127.0.0.1:8080/control', {
        headers: {
          'x-forwarded-host': 'omioatelier.com:8080',
          'x-forwarded-proto': 'https',
        },
      })
    )

    expect(origin.origin).toBe('https://omioatelier.com')
  })

  test('no toca un puerto público reenviado (pruebas locales)', () => {
    const origin = resolvePublicOrigin(
      request('http://127.0.0.1:3000/control', {
        headers: {
          'x-forwarded-host': 'localhost:4000',
          'x-forwarded-proto': 'http',
        },
      })
    )

    expect(origin.origin).toBe('http://localhost:4000')
  })
})

describe('buildUpstreamUrl', () => {
  test('repite path y query en el origen de control', () => {
    const url = buildUpstreamUrl(
      request('http://localhost:3000/control/_next/static/chunk.js?v=1'),
      'http://127.0.0.1:4000'
    )

    expect(url.href).toBe(
      'http://127.0.0.1:4000/control/_next/static/chunk.js?v=1'
    )
  })
})

describe('buildUpstreamHeaders', () => {
  test('pone X-Forwarded-Host/Proto públicos y deja Origin', () => {
    const headers = buildUpstreamHeaders(
      request('http://localhost:3000/control', {
        headers: {
          origin: 'http://localhost:3000',
          host: 'localhost:3000',
          cookie: 'sb-auth=token',
          'accept-encoding': 'gzip',
        },
      })
    )

    expect(headers.get('x-forwarded-host')).toBe('localhost:3000')
    expect(headers.get('x-forwarded-proto')).toBe('http')
    expect(headers.get('origin')).toBe('http://localhost:3000')
    expect(headers.get('cookie')).toBe('sb-auth=token')
    expect(headers.get('accept-encoding')).toBe('identity')
    expect(headers.get('host')).toBeNull()
  })
})

describe('rewriteLocation', () => {
  test('pasa un Location absoluto del control al host público, con puerto local', () => {
    const location = rewriteLocation(
      'http://127.0.0.1:4000/control/destino?ok=1',
      request('http://localhost:3000/control/redirect'),
      'http://127.0.0.1:4000'
    )

    expect(location).toBe('http://localhost:3000/control/destino?ok=1')
  })

  test('una ruta relativa se resuelve contra el origen de control y se reescribe', () => {
    const location = rewriteLocation(
      '/control/login',
      request('https://omioatelier.com/control'),
      'https://omio-control.up.railway.app'
    )

    expect(location).toBe('https://omioatelier.com/control/login')
  })

  test('no toca un Location a otro sitio', () => {
    const location = rewriteLocation(
      'https://accounts.google.com/o/oauth',
      request('https://omioatelier.com/control'),
      'https://omio-control.up.railway.app'
    )

    expect(location).toBe('https://accounts.google.com/o/oauth')
  })
})

describe('rewriteSetCookie', () => {
  test('quita Domain del host de control para que la cookie quede en el apex', () => {
    const cookie = rewriteSetCookie(
      'sb-auth=token; Path=/; Domain=omio-control.up.railway.app; HttpOnly',
      'https://omio-control.up.railway.app'
    )

    expect(cookie).toBe('sb-auth=token; Path=/; HttpOnly')
    expect(cookie).not.toMatch(/domain=/i)
  })

  test('deja una cookie sin Domain (ya es host-only)', () => {
    expect(
      rewriteSetCookie(
        'sb-auth=token; Path=/; HttpOnly',
        'https://omio-control.up.railway.app'
      )
    ).toBe('sb-auth=token; Path=/; HttpOnly')
  })

  test('no toca Domain de otro host', () => {
    const cookie =
      'other=1; Domain=supabase.co; Path=/; Secure'
    expect(
      rewriteSetCookie(cookie, 'https://omio-control.up.railway.app')
    ).toBe(cookie)
  })
})

describe('buildClientHeaders', () => {
  test('reescribe Location y Set-Cookie a la vez', () => {
    const upstream = new Headers({
      location: 'http://127.0.0.1:4000/control/ok',
      'content-type': 'text/plain',
    })
    upstream.append(
      'set-cookie',
      'sb-auth=token; Domain=127.0.0.1; Path=/control'
    )

    const headers = buildClientHeaders(
      upstream,
      request('http://localhost:3000/control'),
      'http://127.0.0.1:4000'
    )

    expect(headers.get('location')).toBe('http://localhost:3000/control/ok')
    expect(headers.get('content-type')).toBe('text/plain')
    expect(headers.getSetCookie()).toEqual(['sb-auth=token; Path=/control'])
  })

  test('quita content-encoding, content-length y transfer-encoding del upstream', () => {
    const upstream = new Headers({
      'content-type': 'text/css; charset=utf-8',
      'content-encoding': 'gzip',
      'content-length': '214',
      'transfer-encoding': 'chunked',
      etag: '"abc"',
    })

    const headers = buildClientHeaders(
      upstream,
      request('http://localhost:3000/control/_next/static/chunk.css'),
      'http://127.0.0.1:4000'
    )

    expect(headers.get('content-type')).toBe('text/css; charset=utf-8')
    expect(headers.get('etag')).toBe('"abc"')
    expect(headers.get('content-encoding')).toBeNull()
    expect(headers.get('content-length')).toBeNull()
    expect(headers.get('transfer-encoding')).toBeNull()
  })
})

describe('proxyControlRequest', () => {
  let server: http.Server | undefined
  let seenAcceptEncoding: string | undefined

  afterEach(async () => {
    if (!server) return
    await new Promise<void>((resolve, reject) => {
      server!.close((err) => (err ? reject(err) : resolve()))
    })
    server = undefined
  })

  test('un CSS gzippeado llega plano, sin content-encoding', async () => {
    const css = 'body{color:red}'
    const gz = gzipSync(css)

    server = http.createServer((req, res) => {
      seenAcceptEncoding = req.headers['accept-encoding']
      res.writeHead(200, {
        'content-type': 'text/css',
        'content-encoding': 'gzip',
        'content-length': String(gz.length),
      })
      res.end(gz)
    })

    const port = await new Promise<number>((resolve) => {
      server!.listen(0, '127.0.0.1', () => {
        const addr = server!.address()
        resolve(typeof addr === 'object' && addr ? addr.port : 0)
      })
    })

    const response = await proxyControlRequest(
      request(`http://localhost:3000/control/_next/static/chunk.css`, {
        headers: { 'accept-encoding': 'gzip' },
      }),
      `http://127.0.0.1:${port}`
    )

    expect(seenAcceptEncoding).toBe('identity')
    expect(response.headers.get('content-encoding')).toBeNull()
    expect(response.headers.get('content-length')).toBeNull()
    expect(response.headers.get('content-type')).toBe('text/css')
    expect(await response.text()).toBe(css)
  })
})
