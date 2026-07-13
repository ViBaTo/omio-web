---
name: verify
description: Cómo verificar omio-web en local de punta a punta (web + panel Keystatic)
---

# Verificar omio-web

## Build y arranque

```bash
pnpm install
pnpm build            # prebuild ejecuta el codegen de Keystatic automáticamente
PORT=3111 pnpm start  # producción local en :3111
```

El locale por defecto (`es`) se sirve SIN prefijo: `/es/...` responde 307 hacia la ruta sin prefijo. Ojo: el middleware reescribe el Location quitando el puerto interno (fix Railway), así que en local los redirects apuntan a `http://localhost/...` sin `:3111` — seguir la ruta a mano, no con `curl -L`.

## Flujos que merece la pena conducir

- **Web**: `/` (hero con frases rotativas), `/proyectos` + detalle, `/materiales` + detalle, `/en` (inglés). Los nombres de materiales hidratan en cliente: verificar el detalle por HTTP 200 + `<title>`, no por grep del listado.
- **Panel CMS**: `/keystatic` → editar un campo (p. ej. singleton Home · Hero → Ubicación ES) → Save → el JSON de `src/content/` cambia en disco. Ciclo completo: editar → `pnpm codegen` → `pnpm build` → reiniciar server → el texto aparece en la home servida.
- **Codegen estable**: `pnpm codegen` sobre árbol limpio no debe producir diff (`git status --short` vacío).

## Gotchas

- `next start` cachea el build en memoria: tras `pnpm build`, reiniciar el server para servir lo nuevo.
- En modo `storage: local`, el panel y su API (`/api/keystatic/*`) funcionan SIN autenticación también bajo `next start` — no desplegar así a producción.
- Revertir las ediciones de prueba con `git checkout src/content/... && pnpm codegen` para dejar el árbol limpio.
