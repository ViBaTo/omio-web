import { procesarContacto, type EnviarCorreo } from './procesar'

export async function responderContacto(
  request: Request,
  enviar: EnviarCorreo
): Promise<Response> {
  let entrada: unknown

  try {
    entrada = await request.json()
  } catch {
    return Response.json({ error: 'datos', campo: 'cuerpo' }, { status: 400 })
  }

  const resultado = await procesarContacto(entrada as Record<string, unknown>, enviar)

  if (resultado.ok) return Response.json({ ok: true })

  if (resultado.motivo === 'datos') {
    return Response.json({ error: 'datos', campo: resultado.campo }, { status: 400 })
  }

  return Response.json({ error: 'envio' }, { status: 502 })
}
