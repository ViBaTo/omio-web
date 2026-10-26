import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'
import { getControlOrigin, proxyControlRequest } from '@/lib/control-proxy'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function handle(request: NextRequest): Promise<Response> {
  const origin = getControlOrigin()
  if (!origin) notFound()
  return proxyControlRequest(request, origin)
}

export const GET = handle
export const POST = handle
export const PUT = handle
export const PATCH = handle
export const DELETE = handle
export const HEAD = handle
export const OPTIONS = handle
