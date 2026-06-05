# Optimización móvil de la web OMIO — Diseño

**Fecha:** 2026-06-05
**Autor:** Vicente Barberá Tormo (con Claude Code)
**Estado:** Aprobado el enfoque, pendiente revisión del spec

---

## 1. Objetivo

Optimizar de forma **completa** la web de OMIO (`omio-web`) para dispositivos móviles,
manteniendo intacta la identidad visual y la experiencia de escritorio. Cubre las 7
páginas, los componentes compartidos, las interacciones táctiles y el rendimiento.

**Decisiones de alcance acordadas:**
- Nivel: **optimización completa** (no solo críticos) en las 7 páginas.
- Rendimiento: **sí** — vídeos, imágenes, animaciones y confirmación del 3D.
- Validación: **navegador real** con Playwright en viewports móviles, capturas antes/después.

## 2. No-objetivos (YAGNI)

- No rediseñar la UX móvil de raíz (no se reemplaza el scroll horizontal por un carrusel
  táctil con gestos *salvo que se decida explícitamente más adelante*).
- No introducir dependencias nuevas salvo justificación clara (se consultará antes).
- No cambiar el aspecto en escritorio: todos los cambios son aditivos vía breakpoints.
- No tocar copy/contenido ni i18n salvo lo imprescindible para que quepa en móvil.

## 3. Contexto técnico actual

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lenis
  (smooth scroll), Three.js / React Three Fiber, next-intl. `pnpm`. Dev en puerto 3002.
- **Sistema de diseño ("Tres Mundos, Una Pieza"):**
  - Paleta: cream `#f3eceb`, ebony `#002a3a`, gold `#8c7732` (vía CSS custom properties).
  - Fuentes: `font-artesano` (Caslon serif italic), `font-ingeniero`/`font-fabrica`
    (Cascadia Code mono), `font-body` (Lato).
  - Fondo y color interpolados por scroll (`TextureBackground.tsx`).
- **Hooks existentes** (`src/lib/useMediaQuery.ts`), a reutilizar:
  - `useIsMobile()` → `(max-width: 768px)`
  - `useIsDesktop()` → `(min-width: 1024px)`
  - `useIsTouch()` → `ontouchstart` / `maxTouchPoints`
- **Buenas bases ya presentes:** `prefers-reduced-motion`, `.skip-to-content`, fallback de
  grid en `SectionProyectos`, 3D desactivado en móvil vía `useIsDesktop`.

## 4. Diagnóstico (auditoría completa)

Resumen priorizado de los problemas detectados. Las líneas son orientativas (snapshot).

### 4.1 🔴 Crítico — rompe el layout / overflow horizontal
- Grids de *stats* `grid-cols-3` que **no colapsan** en móvil:
  `NosotrosContent.tsx:89`, `SectionCapacidades.tsx:87`.
- Metadatos en `flex … gap-12 md:gap-20` → overflow: `ProjectDetailContent.tsx:139`.
- `grid-cols-2 md:grid-cols-4` sin paso intermedio: `ProjectDetailContent.tsx:207`.
- `gap-16` / `gap-12` fijos que comen el ancho útil en móvil: Nosotros, Servicios,
  Contacto, Proceso, MaterialDetail.
- `ProjectCard` con `w-screen h-screen` (`ProjectCard.tsx:37`) — verificar que no desborda.

### 4.2 🟠 Alto — legibilidad y jerarquía
- Tipografía micro fija `text-[10px]` / `text-[11px]` ilegible en móvil:
  `HeroDoor.tsx:73-104` (scroll-to-enter + reloj), `Footer.tsx:44,57`,
  `ProcessTimeline.tsx:87`, `Breadcrumbs.tsx:30`, `MaterialDetailContent.tsx:79`.
- Heros desproporcionados: `PageHero.tsx:36` (`min-h-[60vh]` + `pt-32`),
  `ProjectDetailContent.tsx:64` (`min-h-[80vh]`).
- CTAs gigantes `px-16 py-6` sin escalar: `HomeContacto.tsx:74`, `ProcesoContent.tsx:183`.
- Saltos bruscos de tipografía (`text-2xl md:text-4xl`) sin paso `sm:`:
  `ProjectCard.tsx:94`, `ProyectosContent.tsx:122`.

### 4.3 🟡 Medio — interacción táctil
- Overlays solo-hover que nunca aparecen en táctil: `HomeProyectos.tsx:116-123`,
  `ProjectCard.tsx:51-52`.
- Áreas táctiles < 44px: hamburguesa `w-8 h-8` (`Navbar.tsx:97`), `SoundToggle.tsx:82`,
  chips de filtro (`CategoryFilter.tsx:31`), social links (`ContactoContent.tsx:261`).
- `cursor: none !important` global en `@media (pointer: fine)` (`globals.css:87-91`) —
  riesgo en dispositivos híbridos.
- Lenis `touchMultiplier: 2` (`SmoothScroll.tsx:19`) → scroll "salta" en táctil.
- `select` sin indicador visual de desplegable en móvil (`ContactoContent.tsx:147`).

### 4.4 🟢 Rendimiento (mayormente controlado)
- 3D (`FloatingObject`, `HeroDoor`) **ya** desactivado en móvil ✅ (confirmar).
- `HomeServicios` usa `300vh` de scroll (`HomeServicios.tsx:32`).
- Vídeos del hero pesan; revisar `playsInline`/`preload`/poster e imagen alternativa.
- `SectionLabel` número de fondo `text-[30vw]` con `-left-[2vw]` puede desbordar en
  landscape (`SectionLabel.tsx:23`).

## 5. Enfoque elegido: **C — Híbrido**

Atacar la **raíz** (microtipografía y spacing fijos repetidos, cursor/scroll táctil) con
unas pocas convenciones y utilidades reutilizables, y luego aplicarlas página por página
siguiendo los patrones existentes. Equilibra consistencia y velocidad sin sobre-refactorizar.

Alternativas descartadas: **A (parches tácticos)** perpetúa la inconsistencia;
**B (sistema completo primero)** es más lento y arriesga tocar lo que ya funciona.

## 6. Diseño detallado

### 6.1 Sistema base (fundamentos)
- **Tipografía:** mínimo legible de **12px** para labels/mono en móvil. Convención:
  microtexto decorativo → `text-[11px] md:text-[10px]`; el resto sube de tamaño en móvil.
  Títulos → `clamp()` coherente, eliminando saltos bruscos `text-2xl md:text-4xl`.
- **Spacing:** regla "nunca un gap/padding grande fijo". Patrón escalable:
  `gap-8 md:gap-12 lg:gap-16`, `pt-24 md:pt-32`, padding de página `px-6 md:px-12 lg:px-24`
  (ya usado en varios sitios; normalizar al resto).
- **Cursor:** restringir a `@media (pointer: fine) and (hover: hover)` en `globals.css`.
- **Scroll táctil:** bajar `touchMultiplier` de Lenis a `1` (o desactivar smoothing en
  táctil, recomendado por Lenis), validando que no rompa el scroll dirigido por scroll.
- **`scroll-indicator`** (`globals.css:202`): ya oculto en no-desktop vía `ScrollIndicator`;
  confirmar y, si procede, reducir `right` en móvil.

### 6.2 Reglas transversales de layout
- **Ningún grid multi-columna sin base móvil.** Stats `grid-cols-3` →
  `grid-cols-1 sm:grid-cols-3` con números reducidos en móvil; `grid-cols-2 md:grid-cols-4`
  → añadir paso `sm:`/`md:` intermedio.
- **Heros proporcionados:** `min-h-[60vh]` → `min-h-[50vh] md:min-h-[60vh]`; reducir
  `pt-32`/`px-16` de CTAs en móvil (`px-8 md:px-16`, `py-4 md:py-6`).
- **Anti-overflow:** revisar cada `flex gap-12/gap-20` y `w-screen` para que no desborde a
  **360px** (target mínimo).

### 6.3 Interacciones táctiles
- **Overlays hover-only** (HomeProyectos, ProjectCard): en táctil (`useIsTouch`) mostrar la
  información de forma visible/persistente en lugar de oculta tras hover.
- **Áreas táctiles ≥ 44×44px:** hamburguesa, SoundToggle, chips de filtro, social links,
  thumbnails de galería.
- **`select` de contacto:** añadir indicador visual de desplegable.

### 6.4 Rendimiento móvil
- **Vídeos del hero:** garantizar `playsInline`, `muted`, `preload="metadata"`, `poster`;
  valorar imagen estática en móvil en lugar de vídeo pesado.
- **Imágenes:** confirmar `next/image` con `sizes` correctos y lazy-load donde aplique.
- **Animaciones:** simplificar las pesadas en móvil (letter-by-letter, `300vh` de
  `HomeServicios` → menor altura en móvil); 3D ya off (confirmar `isDesktop`/`webGLSupported`).

## 7. Plan de ejecución por fases

Cada fase termina con build verde (`pnpm build` o `pnpm lint`) y sin overflow en 360–390px.

1. **Fundamentos** — `globals.css` (cursor, convenciones), `SmoothScroll.tsx`
   (touchMultiplier), revisión de `useMediaQuery.ts`.
2. **Globales / compartidos** — `Navbar`, `Footer`, `HeroDoor`, `SoundToggle`,
   `ScrollIndicator`, `PageHero`, `MaterialCard`, `ProjectCard`, `CategoryFilter`,
   `ImageGallery`, `ProcessTimeline`, `Breadcrumbs`.
3. **Home + secciones** — `[locale]/page.tsx`, `home/*`, `Section*`
   (especial atención a `SectionCapacidades` stats, `SectionLabel`, `SectionNosotros`).
4. **Páginas internas** — `materiales` (+ detalle), `proyectos` (+ detalle), `servicios`,
   `nosotros`, `proceso`, `contacto`. (Verificar `lg:direction-rtl` en `ServiciosContent`,
   que no es clase estándar de Tailwind.)
5. **Rendimiento** — vídeos del hero, imágenes (`next/image`/`sizes`), animaciones.
6. **Validación Playwright** — viewports iPhone SE (375), iPhone 14 (390), Android pequeño
   (360) y un punto landscape; capturas antes/después por página; ajustes finales.

## 8. Estrategia de validación

- Levantar dev server (`pnpm dev`, puerto 3002).
- Con Playwright, recorrer cada ruta en los viewports indicados:
  - Comprobar **ausencia de scroll horizontal** (`document.scrollingElement.scrollWidth <=
    innerWidth`).
  - Capturas por página antes/después.
  - Comprobar tamaños de áreas táctiles clave (≥44px) e interacción de overlays en táctil.
- Regresión de escritorio: verificación visual de que no hay cambios en ≥1024px.

## 9. Criterios de éxito

- **0 overflow horizontal** en 360 / 375 / 390px en las 7 páginas.
- **Sin texto < 12px** salvo elementos decorativos justificados.
- **Áreas táctiles ≥ 44×44px** en todos los controles interactivos.
- **Todos los grids** colapsan de forma legible en móvil.
- **Overlays y CTAs** accesibles y usables en táctil.
- **Escritorio sin regresiones** visuales.
- **Vídeos** con `playsInline`/`preload`/poster optimizados; sin jank perceptible.

## 10. Riesgos y mitigaciones

- **Lenis en táctil:** cambiar `touchMultiplier` puede afectar secciones dirigidas por
  scroll (HorizontalScroll, HomeServicios). Mitigación: validar esas secciones tras el cambio.
- **`lg:direction-rtl`** posiblemente no es Tailwind estándar: verificar si funciona o
  reemplazar por `order`/`flex-row-reverse` controlado por breakpoint.
- **Vídeo→imagen en móvil:** si se sustituye, asegurar coherencia de la animación del hero.
- **Cambios de tipografía fluida:** revisar que no rompan layouts de escritorio existentes.
