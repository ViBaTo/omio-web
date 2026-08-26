# Optimización de imágenes y vídeo — omio-web

**Fecha:** 2026-08-24  
**Autor:** Vicente Barberá Tormo (con Cursor)  
**Estado:** Diseño cerrado con Vicente; pendiente revisión de este spec antes del plan de implementación  
**Base de trabajo:** `origin/main` (la copia local de `main` tiene cambios viejos sin commitear: no se toca)

---

## 1. Objetivo

Que la web de OMIO (sobre todo la home) **deje de tardar en mostrar las fotos**, sin cambiar el look: mismas recortes, mismos hovers, mismo vídeo de portada en bucle y mudo.

Medida de éxito: la home deja de descargar decenas de megas de golpe; las fotos se ven igual de nítidas; el vídeo sigue auto-reproduciéndose en ordenador y en móvil, pero pesa ~2 MB en vez de 8 MB.

## 2. Decisiones ya cerradas con Vicente

| Tema | Decisión |
|---|---|
| Alcance | Adelgazar archivos **y** cargar solo lo que se ve **y** vídeo de portada más ligero |
| Enfoque | B: convertir fotos + pintarlas como imagen de verdad (no fondo CSS) + recodificar el vídeo |
| Formato / tamaño | WebP, lado largo máximo **2000 px**, calidad ~80. Vicente: prioridad velocidad; 2000 px es el equilibrio para una marca de atelier |
| Vídeo | Sigue en **todos** los tamaños (no se sustituye por foto en el móvil); solo más ligero |
| Fuera de este trabajo | Tope a fotos nuevas del CMS; borrar vídeos/fotos no usados; formulario; PostHog; 3D; copy |

## 3. No-objetivos (YAGNI)

- No rediseñar layout, tipografía ni identidad.
- No poner un CDN de imágenes nuevo (Cloudflare Images, etc.).
- No limitar lo que el panel Keystatic acepta al subir (fase siguiente).
- No borrar huérfanos (`public/images/projects/<slug>/…` viejos, vídeos no referenciados). Sí se pueden **convertir** si son raster y están en `public/images`; no se eliminan.
- No tocar SVG (logos). `next/image` en Navbar/Footer sigue con `unoptimized`.
- No mezclar este trabajo con los cambios locales sin commitear de `messages/*`, `middleware.ts`, `package.json`.

## 4. Diagnóstico (medido 2026-08-24)

Causa raíz: las fotos se sirven **tal cual salieron de la cámara/export @4x**, en PNG (pésimo para fotografía), y se pintan con `background-image`. El navegador se las baja **todas** al abrir la página, aunque estén más abajo.

Cifras:

- `public/images` ≈ **187 MB** + `public/videos` ≈ **43 MB**.
- Galería de la home (`HomeAtelier`, `/images/new/03.png`–`10.png`): **8 fotos = 90 MB**. Una sola (`03.png`) es **18 MB a 3908×4885**.
- Prueba de conversión de esa foto: **18 MB PNG → 285 KB WebP** a 1600 px q80 (misma foto a ojo).
- Vídeo de portada `IMG_1381.mp4`: **13,5 s, ~5 Mbps, 8 MB**. Es el único vídeo referenciado en código.
- `next/image` casi no se usa. Donde se usa (logos SVG) va con `unoptimized`.
- `next.config.ts` no configura imágenes.

Páginas afectadas: home (el peor caso), Nosotros, Proyectos (listado + ficha), Materiales (listado + ficha). El resto no pinta fotos pesadas.

## 5. Diseño

### 5.1 Archivos (adelgazar en disco)

Script de una pasada (`scripts/optimize-images.mjs` o `.ts`), con `sharp` (devDependency). No es un pipeline en cada build: se ejecuta, se revisa, se commitean los archivos nuevos.

Reglas:

1. Recorrer `public/images/**/*.{png,jpg,jpeg}` **excepto** SVG y `public/images/materiales/` (ya gitignorado).
2. Saltar archivos cuyo lado largo ya sea ≤ 2000 px **y** pesen < 200 KB (no merece la pena).
3. Antes de pisar: copiar el original a `assets_01/web-originals/…` (esa carpeta ya está gitignorada; es el archivo de los RAW).
4. Salida: **WebP**, lado largo 2000 px (sin agrandar los que ya son más pequeños), `quality: 80`. Mismo basename, extensión `.webp`.
5. Actualizar referencias `.png` / `.jpg` / `.jpeg` → `.webp` en:
   - componentes (`HomeAtelier`, `HomeNosotros`, `HomeServicios`, `NosotrosContent`, `HeroDoor` poster, …)
   - contenido Keystatic (`src/content/proyectos/*.json`, `src/content/materiales/*.json`)
   - Ojo: `HomeServicios` apunta a `Recurso%201%404x.png` (espacio y `@` en el nombre). El archivo nuevo es `Recurso 1@4x.webp`; la URL queda `/images/Recurso%201%404x.webp`.
6. Borrar de `public/` el raster original **solo si** ya existe el `.webp` y las referencias apuntan al nuevo. No borrar SVG.
7. El codegen de Keystatic (`prebuild`) regenera `src/data/_generated/` solo: no se edita a mano.

Nombres Keystatic con doble prefijo (`amazonico-monte-carlo__amazonico-monte-carlo__hero.jpg`) **se mantienen**; solo cambia la extensión. Así el panel sigue encontrando el archivo.

### 5.2 Cómo se pintan (cargar con cabeza)

Hoy: `style={{ backgroundImage: `url(${src})` }}` en casi todas las fotos.

Sustituir por un componente único, p. ej. `src/components/CoverImage.tsx`:

- `next/image` con `fill` + `object-cover` + `sizes` obligatorio.
- `loading` por defecto lazy; `priority` solo si es LCP (ninguna foto lo es: el LCP de la home es el vídeo).
- El padre sigue siendo `relative overflow-hidden` con el `aspect-*` que ya tiene. El hover `scale-[1.04]` / `1.05` se aplica al wrapper, no se pierde.
- Mientras carga: el fondo del padre (cream / ebony) se ve; **no** se añade skeleton ni blur (YAGNI).
- Filtro grayscale de `HomeServicios`: prop opcional `className` / `style` sobre la Image (`grayscale contrast`).
- `alt`: el que ya exista en datos; si no hay, `alt=""` decorativo.

`sizes` por uso (no uno genérico de 100vw en miniaturas):

| Uso | `sizes` |
|---|---|
| Banda a pantalla completa (`HomeServicios`, hero de ficha de proyecto) | `100vw` |
| Galería home 2 col / 4 col (`HomeAtelier`) | `(max-width: 768px) 50vw, 25vw` |
| Cards de proyecto / material | `(max-width: 768px) 100vw, 50vw` |
| Galería de ficha (imagen grande) | `(max-width: 768px) 100vw, 70vw` |
| Thumbnails de `ImageGallery` | `112px` |

Archivos a tocar (lista cerrada):

- `src/components/home/HomeAtelier.tsx`
- `src/components/home/HomeNosotros.tsx`
- `src/components/home/HomeServicios.tsx`
- `src/components/home/HomeProyectos.tsx`
- `src/components/home/HomeMateriales.tsx`
- `src/components/MaterialCard.tsx`
- `src/components/ImageGallery.tsx`
- `src/app/[locale]/nosotros/NosotrosContent.tsx`
- `src/app/[locale]/proyectos/ProyectosContent.tsx`
- `src/app/[locale]/proyectos/[slug]/ProjectDetailContent.tsx`
- `src/app/[locale]/materiales/[slug]/MaterialDetailContent.tsx`

No se toca `style.overlay` de mundos en `ProjectDetailContent` (es un gradiente CSS, no una foto).

### 5.3 Vídeo de portada

Archivo: `public/videos/IMG_1381.mp4`. Original → `assets_01/web-originals/videos/`.

Recodificar **in-place** (mismo path, no cambia `HeroDoor.tsx` salvo si hace falta):

- Resolución máxima 1920×1080 (sin agrandar).
- H.264, ~1,5–2 Mbps o CRF ~28; AAC si lleva pista de audio (la UI lo deja en mute).
- Objetivo: **≤ 2,5 MB** (hoy 8 MB).
- Seguir igual en JSX: `autoPlay` `loop` `playsInline` `preload="metadata"` + `poster`. El poster `IMG_1458.jpg` entra en la pasada WebP y se actualiza la ruta.

No se añade versión WebM (YAGNI: un mp4 bien recodificado basta). No se desactiva el vídeo en móvil.

### 5.4 Configuración Next

En `next.config.ts`, solo lo necesario:

- `images.formats: ['image/avif', 'image/webp']` (por si el default del 16 cambiara).
- No `unoptimized: true`.
- No domains remotos: todo es estático en `public/`.

Railway sirve `next start`: el optimizador de Next funciona. Las fuentes ya son WebP ligeras, así que el coste de CPU del primer hit es bajo.

### 5.5 Cómo se trabaja en git

1. Worktree **limpio desde `origin/main`** (no la `main` local sucia).
2. Rama `feat/optimizacion-imagenes`.
3. Cuenta `gh`: `ViBaTo`.
4. Commits atómicos: (1) script + originales convertidos + refs de contenido, (2) `CoverImage` + componentes, (3) vídeo. El plan de implementación lo trocea.

## 6. Verificación

Antes de declarar hecho:

1. **Peso de la home.** En red: suma de transfer de imágenes+vídeo al cargar `/es` sin scroll vs con scroll hasta el final. Hoy, solo la galería Atelier son 90 MB al abrir. Después, al abrir: vídeo ≤ 2,5 MB + poster; la galería **no** debe transferirse hasta acercarse al viewport.
2. **Navegador real** (desktop ≥ 1280 px y viewport 390 px): home, `/es/proyectos`, una ficha, `/es/materiales`, una ficha, `/es/nosotros`. Comprobar: recorte `cover` igual, hover scale igual, grayscale de servicios igual, vídeo en bucle mudo.
3. **Build:** `pnpm build` verde. Typecheck con `tsc --noEmit` (el `pnpm lint` del repo ya estaba roto: no es criterio).
4. **Regresión visual:** no se acepta foto recortada distinto (object-cover en el mismo aspect-ratio del padre = mismo recorte que `bg-cover`).

## 7. Riesgos

- **Calidad a 2000 px en pantalla retina grande.** Si en un iMac se viera blando, subir calidad a 85 o lado largo a 2400 **solo** en héroes de proyecto; no reabrir el resto. Vicente priorizó velocidad.
- **Keystatic.** Al publicar, el codegen tiene que ver paths `.webp`. Si un editor sube un PNG nuevo después, volverá a colarse gordo: es la fase que se dejó fuera a propósito.
- **Archivos duplicados de proyectos** (carpeta por slug + archivos `__` planos). Convertir ambos no rompe; borrar los viejos no es de este spec.
- **`sips` vs `sharp`.** La prueba de diagnóstico usó `sips`/`cwebp`. La pasada real va con `sharp` para que sea reproducible en el repo.

## 8. Criterios de éxito (checklist)

- [ ] Ningún raster servido a la web supera ~2000 px de lado largo ni el peso absurdo actual (objetivo práctico: fotos de galería en cientos de KB, no en MB).
- [ ] Home al primer paint no descarga la galería Atelier.
- [ ] Vídeo de portada ≤ 2,5 MB y se reproduce en desktop y móvil.
- [ ] Look intacto en las páginas del §6.
- [ ] Originales gordos solo en `assets_01/web-originals/` (no en git).
- [ ] Rama basada en `origin/main`, sin los cambios sucios locales.
