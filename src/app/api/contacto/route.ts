import { responderContacto } from '@/lib/contacto/responder'
import { enviarPorSmtp } from '@/lib/contacto/smtp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request): Promise<Response> {
  return responderContacto(request, enviarPorSmtp)
}
