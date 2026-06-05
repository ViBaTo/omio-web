# Optimización móvil de OMIO — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer la web de OMIO plenamente usable y legible en móvil (360–430px) sin alterar la experiencia de escritorio ni la identidad visual.

**Architecture:** Refactor responsive incremental sobre el código VIVO (Next.js 16 + Tailwind v4). Se aplican convenciones reutilizables (tipografía mínima, spacing escalable, áreas táctiles, anti-overflow) archivo por archivo, validando cada cambio en navegador real con el Playwright MCP del entorno. No se toca código muerto.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, Lenis, Three.js/R3F, next-intl. Gestor `pnpm`. Dev server en puerto 3002.

---

## Código VIVO vs MUERTO (alcance)

**VIVO (se optimiza):**
- Globales: `globals.css`, `SmoothScroll.tsx`, `Navbar.tsx`, `Footer.tsx`, `ScrollIndicator.tsx` (ya desktop-only), `FloatingObject.tsx` (ya desktop-only).
- Home: `HeroDoor.tsx`, `SoundToggle.tsx`, `home/HomeNosotros.tsx`, `home/HomeServicios.tsx`, `home/HomeAtelier.tsx`, `home/HomeMateriales.tsx`, `home/HomeProyectos.tsx`, `home/HomeContacto.tsx`.
- Compartidos: `PageHero.tsx`, `MaterialCard.tsx`, `CategoryFilter.tsx`, `ImageGallery.tsx`, `Breadcrumbs.tsx`.
- Páginas: `MaterialesContent.tsx`, `MaterialDetailContent.tsx`, `ProyectosContent.tsx`, `ProjectDetailContent.tsx`, `ServiciosContent.tsx`, `NosotrosContent.tsx`, `ProcesoContent.tsx`, `ContactoContent.tsx`.

**MUERTO (NO tocar; limpieza opcional en Task 17):** `SectionArtesania/Capacidades/Contacta/Ingenieria/Nosotros/Proyectos.tsx`, `SectionLabel.tsx`, `HorizontalScroll.tsx`, `ProjectCard.tsx`, `ProcessTimeline.tsx`. Verificado: sólo se importan entre sí, ninguna página/layout los usa.

---

## Convenciones de cambio (referenciadas por las tasks como "Convención X")

Aplicar SIEMPRE manteniendo el valor de escritorio (los cambios añaden el comportamiento móvil base y conservan `md:`/`lg:`).

- **Convención A — Microtipografía legible:** sustituir `text-[10px]` → `text-[11px]` en elementos decorativos (labels mono/uppercase). El texto de contenido (body/títulos) ya es ≥14px; no se reduce nada por debajo de 11px.
- **Convención B — Spacing vertical de sección:** `py-32 md:py-48` → `py-20 md:py-32 lg:py-48`; `py-24 md:py-32` → `py-16 md:py-24 lg:py-32`. Reduce scroll muerto en móvil sin cambiar desktop (`lg:` conserva el valor original).
- **Convención C — Gaps de grid de 2+ columnas:** `gap-16` → `gap-10 lg:gap-16`; `gap-12` → `gap-8 lg:gap-12`; `lg:gap-24` se mantiene pero el base pasa a `gap-10`.
- **Convención D — CTAs:** `px-16 py-6` → `px-8 md:px-16 py-4 md:py-6`; `text-2xl` (en CTA) → `text-xl md:text-2xl`.
- **Convención E — Áreas táctiles ≥44px:** todo control interactivo (botón/enlace de acción/chip) debe alcanzar 44×44px reales. Patrón: añadir padding o `min-h-11 min-w-11` + `flex items-center justify-center`.
- **Convención F — Grids que no colapsan:** ningún `grid-cols-3`/`grid-cols-2` "duro" en contenido; base móvil `grid-cols-1` (o `grid-cols-2` para miniaturas) con escalado `sm:`/`md:`.

---

## Procedimiento de validación (Playwright MCP) — referenciado como "Validar(ruta, viewports)"

Se usa el Playwright MCP del entorno (`mcp__plugin_playwright_playwright__*`), NO se añade `@playwright/test` al repo.

**Viewports objetivo:** `360×800` (Android pequeño), `375×667` (iPhone SE), `390×844` (iPhone 14). Regresión desktop: `1440×900`.

**Para cada (ruta, viewport):**
1. `browser_resize` al viewport.
2. `browser_navigate` a `http://localhost:3002<ruta>`.
3. `browser_evaluate` con esta función para medir invariantes (debe devolver `overflow:false` y `tinyText: []`):
   ```js
   () => {
     const docW = document.documentElement.clientWidth;
     const overflow = document.documentElement.scrollWidth > docW + 1;
     const offenders = [...document.querySelectorAll('*')]
       .filter(el => el.getBoundingClientRect().right > docW + 1)
       .slice(0, 10)
       .map(el => el.tagName + '.' + (el.className?.toString().slice(0,40) || ''));
     const tinyText = [...document.querySelectorAll('p,span,a,li,label,button,h1,h2,h3,input,select,textarea')]
       .filter(el => el.textContent.trim() && parseFloat(getComputedStyle(el).fontSize) < 11)
       .slice(0, 10)
       .map(el => el.tagName + ':' + getComputedStyle(el).fontSize);
     const smallTargets = [...document.querySelectorAll('a[href],button')]
       .filter(el => { const r = el.getBoundingClientRect(); return r.width>0 && (r.width<44 || r.height<44); })
       .slice(0, 10)
       .map(el => el.tagName + ' ' + Math.round(el.getBoundingClientRect().width) + 'x' + Math.round(el.getBoundingClientRect().height));
     return { overflow, offenders, tinyText, smallTargets };
   }
   ```
4. `browser_take_screenshot` (guardar como `<ruta>-<viewport>-after.png`).

**Criterio de aprobación por ruta:** `overflow === false`, `tinyText` vacío, y `smallTargets` sólo con controles decorativos justificados (anotar cuáles).

---

## Task 1: Baseline y arranque del entorno

**Files:** ninguno (sólo lectura/captura).

- [ ] **Step 1: Arrancar el dev server**

Run: `pnpm install` (si hace falta) y luego `pnpm dev` (en background).
Expected: servidor escuchando en `http://localhost:3002`.

- [ ] **Step 2: Obtener slugs reales para rutas de detalle**

Run: `grep -n "slug:" src/data/projects.ts | head -3` y `grep -n "slug:" src/data/materials.ts | head -3`
Anota un slug de proyecto (`<proj-slug>`) y uno de material (`<mat-slug>`) para las rutas `/proyectos/<proj-slug>` y `/materiales/<mat-slug>`.

- [ ] **Step 3: Capturar baseline ANTES**

Para las rutas `/`, `/nosotros`, `/servicios`, `/proceso`, `/materiales`, `/materiales/<mat-slug>`, `/proyectos`, `/proyectos/<proj-slug>`, `/contacto` en viewport `390×844`, ejecuta `Validar(ruta, [390])` (sólo medición + screenshot `*-before.png`).
Expected: registrar qué rutas devuelven `overflow:true` o `tinyText`. Sirve de referencia comparativa.

- [ ] **Step 4: Commit del baseline (sólo notas, sin cambios de código)**

No hay cambios de código que commitear aún. Continuar.

---

## Task 2: Fundamentos (cursor + scroll táctil)

**Files:**
- Modify: `src/app/globals.css:87-91`
- Modify: `src/components/SmoothScroll.tsx:16-21`

- [ ] **Step 1: Restringir el cursor custom a dispositivos con hover real**

En `src/app/globals.css`, reemplazar:
```css
/* Custom cursor — desktop only */
@media (pointer: fine) {
  * {
    cursor: none !important;
  }
}
```
por:
```css
/* Custom cursor — solo punteros finos CON hover real (evita híbridos/táctiles) */
@media (pointer: fine) and (hover: hover) {
  * {
    cursor: none !important;
  }
}
```

- [ ] **Step 2: Ajustar Lenis para táctil**

En `src/components/SmoothScroll.tsx`, reemplazar el bloque `new Lenis({...})`:
```js
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });
```
por:
```js
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // En táctil dejamos el scroll nativo del navegador (sin smoothing) para
      // evitar el "overshoot" del momentum duplicado. touchMultiplier 1 = 1:1.
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      infinite: false,
    });
```

- [ ] **Step 3: Build de comprobación**

Run: `pnpm build`
Expected: compila sin errores de TypeScript/ESLint.

- [ ] **Step 4: Validar scroll táctil en home**

`Validar('/', [390])` y verificar manualmente (drag) que el scroll no "salta". Comprobar que `HomeServicios` (sticky/transform) sigue avanzando.
Expected: `overflow:false`; scroll suave 1:1.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/components/SmoothScroll.tsx
git commit -m "fix(mobile): cursor solo en hover real y scroll táctil 1:1 (Lenis)"
```

---

## Task 3: Navbar — área táctil de la hamburguesa

**Files:** Modify `src/components/Navbar.tsx:96-100`

- [ ] **Step 1: Ampliar el botón hamburguesa a 44px**

Reemplazar:
```jsx
        <button
          className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? tCommon('menuClose') : tCommon('menuOpen')}
        >
```
por:
```jsx
        <button
          className="md:hidden relative z-10 -mr-2 w-11 h-11 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? tCommon('menuClose') : tCommon('menuOpen')}
        >
```
(`w-11 h-11` = 44px; `-mr-2` recupera la alineación visual al borde.)

- [ ] **Step 2: Validar**

`Validar('/', [360,390])`: el botón debe medir ≥44×44 (no aparece en `smallTargets`). Abrir/cerrar menú OK.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "fix(mobile): área táctil de 44px en botón de menú"
```

---

## Task 4: Footer — legibilidad de microtexto

**Files:** Modify `src/components/Footer.tsx:43-61`

- [ ] **Step 1: Subir tamaños mínimos (Convención A)**

Reemplazar en la `motion.address`:
```jsx
          className='not-italic font-ingeniero text-[11px] tracking-[0.15em] leading-relaxed'
```
(se mantiene en `text-[11px]`, ya es el mínimo — sin cambio.)

Reemplazar en el `<p>` de copyright:
```jsx
          className='font-ingeniero text-[10px] tracking-[0.15em] mt-12'
```
por:
```jsx
          className='font-ingeniero text-[11px] tracking-[0.15em] mt-12'
```

- [ ] **Step 2: Validar**

`Validar('/', [390])` → `tinyText` vacío en el footer.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "fix(mobile): copyright del footer legible (11px)"
```

---

## Task 5: HeroDoor + SoundToggle — textos legibles y sin solape

**Files:**
- Modify `src/components/HeroDoor.tsx:65-107`
- Modify `src/components/SoundToggle.tsx:80-90`

- [ ] **Step 1: Escalar microtexto del hero (Convención A) y dar aire en móvil**

En `HeroDoor.tsx`, en el bloque "Scroll to enter", reemplazar:
```jsx
        <span
          className='font-ingeniero text-[10px] tracking-[0.3em] uppercase'
          style={{ color: '#F3ECEB' }}
        >
          Scroll to enter
        </span>
```
por:
```jsx
        <span
          className='font-ingeniero text-[11px] tracking-[0.3em] uppercase'
          style={{ color: '#F3ECEB' }}
        >
          Scroll to enter
        </span>
```

En el bloque "Location + Live Time", reemplazar los dos párrafos `text-[10px]`:
```jsx
        <p
          className='font-ingeniero text-[10px] tracking-[0.2em]'
          style={{ color: '#F3ECEB' }}
        >
          Valencia, España
        </p>
        <p
          className='font-ingeniero text-[10px] tracking-[0.2em] mt-1'
          style={{ color: '#8C7732' }}
        >
          <LiveClock />
        </p>
```
por:
```jsx
        <p
          className='font-ingeniero text-[11px] tracking-[0.2em]'
          style={{ color: '#F3ECEB' }}
        >
          Valencia, España
        </p>
        <p
          className='font-ingeniero text-[11px] tracking-[0.2em] mt-1'
          style={{ color: '#8C7732' }}
        >
          <LiveClock />
        </p>
```

- [ ] **Step 2: Evitar el solape del SoundToggle con el reloj del hero**

El reloj está en `bottom-8 right-8`; el SoundToggle (global, sólo visible sobre el hero) en `bottom-6 right-6` → se solapan. En `SoundToggle.tsx` reemplazar:
```jsx
    <motion.button
      className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center"
```
por:
```jsx
    <motion.button
      className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-11 h-11 flex items-center justify-center"
```
(En móvil sube a `bottom-24` para quedar por encima del bloque reloj/scroll; `w-11 h-11` cumple 44px. En desktop conserva `bottom-6 right-6`.)

- [ ] **Step 3: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/', [360,390])`: `tinyText` vacío en hero; el SoundToggle no se superpone al reloj (revisar screenshot); botón ≥44px.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroDoor.tsx src/components/SoundToggle.tsx
git commit -m "fix(mobile): textos del hero legibles y SoundToggle sin solape (44px)"
```

---

## Task 6: PageHero — proporción en móvil

**Files:** Modify `src/components/PageHero.tsx:35-37`

- [ ] **Step 1: Reducir altura y padding superior en móvil**

Reemplazar:
```jsx
    <section
      className='relative min-h-[60vh] flex items-end pb-16 md:pb-24 pt-32 md:pt-40 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: colors.bg }}
    >
```
por:
```jsx
    <section
      className='relative min-h-[50vh] md:min-h-[60vh] flex items-end pb-12 md:pb-24 pt-28 md:pt-40 px-6 md:px-12 lg:px-24'
      style={{ backgroundColor: colors.bg }}
    >
```

- [ ] **Step 2: Validar (afecta a 6 páginas)**

`Validar('/nosotros', [390])` y `Validar('/contacto', [390])`: el hero no ocupa pantalla completa en móvil; sin overflow.

- [ ] **Step 3: Commit**

```bash
git add src/components/PageHero.tsx
git commit -m "fix(mobile): proporción del PageHero en móvil (altura y padding)"
```

---

## Task 7: Componentes compartidos (cards, filtro, galería, breadcrumbs)

**Files:**
- Modify `src/components/MaterialCard.tsx:51-63`
- Modify `src/components/CategoryFilter.tsx:29-31,45`
- Modify `src/components/Breadcrumbs.tsx:20-49`
- `src/components/ImageGallery.tsx` (sin cambios — thumbnails 80×56 ya táctiles; documentar)

- [ ] **Step 1: MaterialCard — mostrar la pista de acción también en táctil**

El overlay "ver detalle" sólo aparece en hover. En táctil la card es un `Link` (tappable) y el nombre/descripcion ya están debajo; basta con asegurar que el overlay no oculte nada. Sin cambio funcional necesario, pero subir el label decorativo a 11px si fuese `text-xs` (ya es `text-xs`=12px, OK). **No-op documentado.**

- [ ] **Step 2: CategoryFilter — área táctil de los chips (Convención E)**

Reemplazar las DOS apariciones de:
```jsx
          className='font-ingeniero text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300'
```
por:
```jsx
          className='font-ingeniero text-[11px] tracking-[0.2em] uppercase px-5 py-3 min-h-11 inline-flex items-center border transition-all duration-300'
```
(`py-3` + `min-h-11` garantiza 44px de alto; `inline-flex items-center` centra el texto.)

- [ ] **Step 3: Breadcrumbs — legibilidad, wrap y target**

Reemplazar el contenedor `<nav>`:
```jsx
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-4">
```
por:
```jsx
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 py-4">
```
Y subir los `text-[10px]` a `text-[11px]` en las 3 apariciones (link Home, separador `/`, link/label de cada crumb) — Convención A. (El `flex-wrap` evita overflow con títulos largos.)

- [ ] **Step 4: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/proyectos', [360,390])` (CategoryFilter) y `Validar('/proyectos/<proj-slug>', [360])` (Breadcrumbs): sin overflow; chips ≥44px; breadcrumbs hacen wrap.

- [ ] **Step 5: Commit**

```bash
git add src/components/CategoryFilter.tsx src/components/Breadcrumbs.tsx
git commit -m "fix(mobile): chips de filtro 44px y breadcrumbs legibles con wrap"
```

---

## Task 8: Home — spacing, CTA y servicios usables en móvil

**Files:**
- Modify `src/components/home/HomeServicios.tsx`
- Modify `src/components/home/HomeContacto.tsx:18,72-80`
- Modify `src/components/home/HomeNosotros.tsx:17,21`
- Modify `src/components/home/HomeAtelier.tsx:23`
- Modify `src/components/home/HomeMateriales.tsx:21`
- Modify `src/components/home/HomeProyectos.tsx:19`

- [ ] **Step 1: HomeServicios — stack vertical en móvil (sustituye el scroll horizontal de 300vh)**

El carrusel por scroll (300vh) es pesado y poco intuitivo en táctil. En móvil se renderiza como apilado simple. Reemplazar el componente completo por:
```jsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useIsMobile } from '@/lib/useMediaQuery'

const SLIDES = [
  '/images/Recurso%201%404x.png',
  '/images/Recurso%202%404x.png',
  '/images/Recurso%203%404x.png'
]

export default function HomeServicios() {
  const tHome = useTranslations('home.servicios')
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.6667%'])

  if (isMobile) {
    return (
      <section className='relative w-full' style={{ backgroundColor: '#001A26' }} aria-roledescription='carousel'>
        <div className='flex flex-col'>
          {SLIDES.map((src) => (
            <div key={src} className='relative aspect-[3/4] w-full'>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${src})`, filter: 'grayscale(100%) contrast(1.05)' }}
              />
              <div className='absolute inset-0 texture-artesano opacity-30' />
            </div>
          ))}
        </div>
        <div className='py-10 flex justify-center px-6'>
          <Link
            href='/servicios'
            className='inline-flex items-center gap-3 font-ingeniero text-xs tracking-[0.25em] uppercase group min-h-11'
            style={{ color: '#F3ECEB' }}
          >
            <span>{tHome('ctaExplore')}</span>
            <span className='inline-block transition-transform group-hover:translate-x-2' style={{ color: '#8C7732' }}>→</span>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className='relative w-full'
      style={{ height: `${SLIDES.length * 100}vh`, backgroundColor: '#001A26' }}
      aria-roledescription='carousel'
    >
      <div className='sticky top-0 h-screen w-full overflow-hidden'>
        <motion.div className='flex h-full will-change-transform' style={{ x, width: `${SLIDES.length * 100}%` }}>
          {SLIDES.map((src) => (
            <div key={src} className='relative h-full shrink-0' style={{ width: `${100 / SLIDES.length}%` }}>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${src})`, filter: 'grayscale(100%) contrast(1.05)' }}
              />
              <div className='absolute inset-0 texture-artesano opacity-30' />
            </div>
          ))}
        </motion.div>
        <div className='absolute bottom-10 left-0 right-0 z-20 flex justify-center px-6'>
          <Link
            href='/servicios'
            className='inline-flex items-center gap-3 font-ingeniero text-xs tracking-[0.25em] uppercase group'
            style={{ color: '#F3ECEB' }}
          >
            <span>{tHome('ctaExplore')}</span>
            <span className='inline-block transition-transform group-hover:translate-x-2' style={{ color: '#8C7732' }}>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: HomeContacto — spacing (B) y CTA (D)**

Reemplazar la `<section>` de apertura:
```jsx
      className='relative min-h-[70vh] flex items-center py-32 md:py-48 px-6 md:px-12 lg:px-24'
```
por:
```jsx
      className='relative min-h-[60vh] md:min-h-[70vh] flex items-center py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24'
```
Reemplazar el `Link` CTA:
```jsx
            className='cta-fill inline-flex items-center justify-center px-16 py-6 font-artesano italic text-2xl md:text-3xl tracking-wide transition-colors duration-500'
```
por:
```jsx
            className='cta-fill inline-flex items-center justify-center px-8 md:px-16 py-4 md:py-6 font-artesano italic text-xl md:text-3xl tracking-wide transition-colors duration-500'
```

- [ ] **Step 3: HomeNosotros — spacing (B) y gap (C)**

Reemplazar:
```jsx
      className='relative py-32 md:py-48 px-6 md:px-12 lg:px-24'
```
por:
```jsx
      className='relative py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24'
```
Y el grid:
```jsx
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
```
por:
```jsx
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>
```

- [ ] **Step 4: HomeAtelier, HomeMateriales, HomeProyectos — spacing (B)**

En cada uno, reemplazar la clase de la `<section>`:
```jsx
      className='relative py-32 md:py-48 px-6 md:px-12 lg:px-24'
```
por:
```jsx
      className='relative py-20 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24'
```

- [ ] **Step 5: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/', [360,390])`: sin overflow; `HomeServicios` se ve apilado en móvil; CTA de contacto no desborda.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/
git commit -m "fix(mobile): home con spacing escalable, CTA proporcional y servicios apilados"
```

---

## Task 9: Materiales (lista + detalle)

**Files:**
- `src/app/[locale]/materiales/MaterialesContent.tsx` (revisar — grid ya correcto)
- Modify `src/app/[locale]/materiales/[slug]/MaterialDetailContent.tsx:55,79,184`

- [ ] **Step 1: MaterialesContent — verificación**

El grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8` y `py-16 md:py-24` ya son responsive. **No-op documentado.**

- [ ] **Step 2: MaterialDetailContent — gap (C) y microtexto (A)**

Reemplazar:
```jsx
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
```
por:
```jsx
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16'>
```
Reemplazar el `text-[10px]` de la categoría (≈línea 79):
```jsx
                className='font-ingeniero text-[10px] tracking-[0.2em] uppercase'
```
por:
```jsx
                className='font-ingeniero text-[11px] tracking-[0.2em] uppercase'
```
Reemplazar el `text-[10px]` de la categoría en proyectos relacionados (≈línea 184):
```jsx
                          className='font-ingeniero text-[10px] tracking-[0.2em] uppercase'
```
por:
```jsx
                          className='font-ingeniero text-[11px] tracking-[0.2em] uppercase'
```

- [ ] **Step 3: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/materiales', [390])` y `Validar('/materiales/<mat-slug>', [360,390])`: sin overflow; `tinyText` vacío.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/materiales/
git commit -m "fix(mobile): detalle de material con gap escalable y labels legibles"
```

---

## Task 10: Proyectos (lista)

**Files:** Modify `src/app/[locale]/proyectos/ProyectosContent.tsx:116`

- [ ] **Step 1: Microtexto de la meta (A)**

Reemplazar:
```jsx
                className='font-ingeniero text-[10px] tracking-[0.3em] uppercase mb-2'
```
por:
```jsx
                className='font-ingeniero text-[11px] tracking-[0.3em] uppercase mb-2'
```
(El grid `grid-cols-1 md:grid-cols-2 gap-8 md:gap-12` ya es correcto; el overlay "discover" es decorativo y el título/meta siempre están visibles.)

- [ ] **Step 2: Validar**

`Validar('/proyectos', [360,390])`: sin overflow; `tinyText` vacío.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/proyectos/ProyectosContent.tsx
git commit -m "fix(mobile): meta de tarjetas de proyecto legible (11px)"
```

---

## Task 11: Proyecto — detalle (5 actos)

**Files:** Modify `src/app/[locale]/proyectos/[slug]/ProjectDetailContent.tsx:64,139,149,267,286,299,451`

- [ ] **Step 1: Hero del detalle — altura en móvil**

Reemplazar:
```jsx
      <section
        className='relative min-h-[80vh] flex items-end'
        style={{ backgroundColor: '#002A3A' }}
      >
```
por:
```jsx
      <section
        className='relative min-h-[70vh] md:min-h-[80vh] flex items-end'
        style={{ backgroundColor: '#002A3A' }}
      >
```

- [ ] **Step 2: Stats bar — gap anti-overflow (C) y label (A)**

Reemplazar:
```jsx
          <div className='max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-12 md:gap-20'>
```
por:
```jsx
          <div className='max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-20'>
```
Reemplazar el `text-[10px]` del label de stat (≈línea 149):
```jsx
                  className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mt-1'
```
por:
```jsx
                  className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-1'
```

- [ ] **Step 3: Navegación prev/next — evitar choque de títulos en móvil**

Reemplazar el contenedor:
```jsx
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
```
por:
```jsx
        <div className='max-w-7xl mx-auto flex items-center justify-between gap-4'>
```
En el `<p>` del título de `prev` (≈línea 273) reemplazar:
```jsx
                  className='font-artesano italic text-lg md:text-xl'
```
por:
```jsx
                  className='font-artesano italic text-base md:text-xl line-clamp-1 max-w-[38vw] md:max-w-none'
```
En el `<p>` del título de `next` (≈línea 305) reemplazar:
```jsx
                  className='font-artesano italic text-lg md:text-xl'
```
por:
```jsx
                  className='font-artesano italic text-base md:text-xl line-clamp-1 max-w-[38vw] md:max-w-none'
```
Subir los `text-[10px]` de "Anterior"/"Siguiente" (≈líneas 267 y 299) a `text-[11px]` (Convención A).

- [ ] **Step 4: Caption de ActImageGrid (1 imagen) — microtexto (A)**

Reemplazar (≈línea 451):
```jsx
            className='font-ingeniero text-[10px] tracking-[0.2em] uppercase mt-3'
```
por:
```jsx
            className='font-ingeniero text-[11px] tracking-[0.2em] uppercase mt-3'
```

- [ ] **Step 5: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/proyectos/<proj-slug>', [360,390])`: sin overflow (especial atención a stats bar y prev/next); `tinyText` vacío.

- [ ] **Step 6: Commit**

```bash
git add "src/app/[locale]/proyectos/[slug]/ProjectDetailContent.tsx"
git commit -m "fix(mobile): detalle de proyecto sin overflow (stats/prev-next) y labels legibles"
```

---

## Task 12: Servicios

**Files:** Modify `src/app/[locale]/servicios/ServiciosContent.tsx:57,62`

- [ ] **Step 1: Spacing (B), gap (C) y limpiar clase no estándar**

Reemplazar la `<section>`:
```jsx
            className='py-24 md:py-32 px-6 md:px-12 lg:px-24'
```
por:
```jsx
            className='py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24'
```
Reemplazar el grid (elimina `lg:direction-rtl`, que no es utilidad válida de Tailwind; el alternado ya lo hace `lg:order-1/2`):
```jsx
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${isEven ? '' : 'lg:direction-rtl'}`}
```
por:
```jsx
                className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start'
```

- [ ] **Step 2: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/servicios', [360,390])`: sin overflow; el alternado de columnas se mantiene en desktop (`lg:order`).

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/servicios/ServiciosContent.tsx
git commit -m "fix(mobile): servicios con spacing/gap escalable y limpieza de clase inválida"
```

---

## Task 13: Nosotros — grid de stats (crítico)

**Files:** Modify `src/app/[locale]/nosotros/NosotrosContent.tsx:43,89`

- [ ] **Step 1: Stats — colapsar en móvil (Convención F)**

Reemplazar:
```jsx
        <div className='max-w-5xl mx-auto grid grid-cols-3 gap-8 md:gap-16'>
```
por:
```jsx
        <div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16'>
```

- [ ] **Step 2: Gap del bloque imagen/texto (C)**

Reemplazar:
```jsx
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
```
por:
```jsx
        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center'>
```

- [ ] **Step 3: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/nosotros', [360,390])`: las stats se apilan (1 columna) en <640px; sin overflow.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/nosotros/NosotrosContent.tsx
git commit -m "fix(mobile): stats de Nosotros colapsan en móvil y gap escalable"
```

---

## Task 14: Proceso

**Files:** Modify `src/app/[locale]/proceso/ProcesoContent.tsx:74,183`

- [ ] **Step 1: Gap del grid de 12 columnas (C)**

Reemplazar:
```jsx
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start'>
```
por:
```jsx
              <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start'>
```

- [ ] **Step 2: CTA final (Convención D)**

Reemplazar:
```jsx
              className='cta-fill inline-flex items-center justify-center px-16 py-6 font-artesano italic text-2xl tracking-wide transition-colors duration-500'
```
por:
```jsx
              className='cta-fill inline-flex items-center justify-center px-8 md:px-16 py-4 md:py-6 font-artesano italic text-xl md:text-2xl tracking-wide transition-colors duration-500'
```

- [ ] **Step 3: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/proceso', [360,390])`: sin overflow; CTA proporcional.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/proceso/ProcesoContent.tsx
git commit -m "fix(mobile): proceso con gap escalable y CTA proporcional"
```

---

## Task 15: Contacto — formulario, select y enlaces

**Files:** Modify `src/app/[locale]/contacto/ContactoContent.tsx:48,78+,90+,147,261-280`

- [ ] **Step 1: Gap del grid (C)**

Reemplazar:
```jsx
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24'>
```
por:
```jsx
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24'>
```

- [ ] **Step 2: Labels del formulario legibles (A)**

Reemplazar TODAS las apariciones (5 labels + 4 títulos de la columna derecha + label del mapa) de:
```jsx
text-[10px] tracking-[0.2em] uppercase
```
por:
```jsx
text-[11px] tracking-[0.2em] uppercase
```
(Usar reemplazo cuidadoso por bloque; afecta a las clases de `label` y de los `h3` de email/teléfono/ubicación/social y al `<p>` del mapa.)

- [ ] **Step 3: Inputs/select/textarea con altura táctil**

En los 3 `input`, el `select` y el `textarea`, reemplazar `py-3` por `py-3.5` dentro de su className (altura ≥44px con `text-base`). Ejemplo para el primer input:
```jsx
                      className='w-full bg-transparent border-b border-[#8C7732]/20 py-3 font-body text-base outline-none transition-colors focus:border-[#8C7732]'
```
→
```jsx
                      className='w-full bg-transparent border-b border-[#8C7732]/20 py-3.5 font-body text-base outline-none transition-colors focus:border-[#8C7732]'
```
(`text-base` = 16px ya evita el zoom automático de iOS — mantener.)

- [ ] **Step 4: Indicador visual del desplegable (select)**

Envolver el `select` en un contenedor relativo con una flecha. Reemplazar el bloque del `select` (de `<select ...>` a `</select>`) envolviéndolo:
```jsx
                    <div className='relative'>
                      <select
                        value={formState.projectType}
                        onChange={(e) =>
                          setFormState({ ...formState, projectType: e.target.value })
                        }
                        className='w-full bg-transparent border-b border-[#8C7732]/20 py-3.5 pr-8 font-body text-base outline-none transition-colors focus:border-[#8C7732] appearance-none'
                        style={{ color: '#002A3A' }}
                      >
                        <option value=''>{tPage('formSelectPlaceholder')}</option>
                        <option value='hospitality'>{tProjectTypes('hospitality')}</option>
                        <option value='residencial'>{tProjectTypes('residencial')}</option>
                        <option value='gastronomia'>{tProjectTypes('gastronomia')}</option>
                        <option value='contract'>{tProjectTypes('contract')}</option>
                        <option value='otro'>{tProjectTypes('otro')}</option>
                      </select>
                      <span
                        className='pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 font-ingeniero text-xs'
                        style={{ color: '#8C7732' }}
                        aria-hidden='true'
                      >
                        ▼
                      </span>
                    </div>
```

- [ ] **Step 5: Enlaces sociales con área táctil (E)**

Reemplazar:
```jsx
                  <div className='flex gap-8'>
```
por:
```jsx
                  <div className='flex gap-8'>
```
(sin cambio de layout) y en los DOS `<a>` (Instagram/LinkedIn) reemplazar:
```jsx
                      className='font-ingeniero text-[11px] tracking-[0.2em] uppercase transition-opacity hover:opacity-100'
```
por:
```jsx
                      className='font-ingeniero text-[11px] tracking-[0.2em] uppercase inline-flex items-center min-h-11 transition-opacity hover:opacity-100'
```

- [ ] **Step 6: Build + Validar**

Run: `pnpm build` → OK.
`Validar('/contacto', [360,390])`: sin overflow; `tinyText` vacío; inputs/enlaces ≥44px; el select muestra la flecha. Probar foco en inputs (sin zoom brusco en iOS sim).

- [ ] **Step 7: Commit**

```bash
git add src/app/[locale]/contacto/ContactoContent.tsx
git commit -m "fix(mobile): formulario de contacto táctil, select con indicador y labels legibles"
```

---

## Task 16: Rendimiento móvil

**Files:**
- `src/components/HeroDoor.tsx` (vídeo — ya tiene `playsInline`/`preload='metadata'`/`poster`; confirmar)
- `src/components/FloatingObject.tsx` (confirmar desactivado en móvil)
- Revisión de imágenes de fondo (`bg-cover` con `url(...)`) y animaciones

- [ ] **Step 1: Confirmar el 3D y el vídeo**

Verificar en `FloatingObject.tsx:103` que `if (!isDesktop || !webGLSupported) return null` sigue presente, y en `HeroDoor.tsx` que el `<video>` mantiene `playsInline preload='metadata' poster=...`.
Expected: 3D no monta en móvil; vídeo no descarga el binario completo hasta interacción.

- [ ] **Step 2: Medir peso de red en móvil (home)**

`browser_resize(390×844)` → `browser_navigate('/')` → `browser_network_requests`.
Anota el tamaño del vídeo `IMG_1381.mp4` y de las imágenes `Recurso N@4x.png` (las de servicios). Si el vídeo supera ~3–4 MB y se descarga en móvil pese al `preload='metadata'`, considerar en Step 3.

- [ ] **Step 3: (Condicional) Poster-only en móvil para el hero**

SÓLO si el vídeo se descarga pesado en móvil: en `HeroDoor.tsx`, no renderizar el `<source>` en móvil y dejar el `poster` como imagen de fondo. Usar `useIsMobile()`:
```jsx
import { useIsMobile } from '@/lib/useMediaQuery'
// ...
const isMobile = useIsMobile()
// dentro del <video>:
{!isMobile && <source src='/videos/IMG_1381.mp4' type='video/mp4' />}
```
(El `poster` se muestra cuando no hay fuente reproducible. Verificar que `SoundToggle` sigue ocultándose si no hay audio: ya lo hace vía `hasVideo`/IntersectionObserver, pero confirmar que `[data-hero-video]` existe; el `<video>` sigue en el DOM, sólo sin `<source>` en móvil → `SoundToggle` puede aparecer sin audio; en ese caso, añadir `data-hero-video` sólo cuando `!isMobile` o condicionar el render del botón.)
Expected: en móvil no se descarga el `.mp4`; se ve el poster.

- [ ] **Step 4: Imágenes pesadas de servicios**

Las imágenes `Recurso N@4x.png` (@4x) pueden ser grandes. Si en Step 2 superan ~1 MB cada una, anotarlo como recomendación de optimización de assets (convertir a `webp`/redimensionar) — **no se realiza en este plan salvo que el usuario lo pida** (cambio de assets). Registrar con `log`/nota.

- [ ] **Step 5: Commit (si hubo cambios)**

```bash
git add src/components/HeroDoor.tsx
git commit -m "perf(mobile): hero sin descarga de vídeo en móvil (poster-only)"
```
(Si no hubo cambios porque el vídeo ya era ligero, omitir el commit y dejar constancia en notas.)

---

## Task 17: Validación final, regresión y limpieza

**Files:** ninguno (validación) + (opcional) borrado de código muerto.

- [ ] **Step 1: Auditoría completa DESPUÉS**

Ejecutar `Validar(ruta, [360,375,390])` para las 9 rutas (`/`, `/nosotros`, `/servicios`, `/proceso`, `/materiales`, `/materiales/<mat-slug>`, `/proyectos`, `/proyectos/<proj-slug>`, `/contacto`).
Expected: `overflow:false` en todas; `tinyText:[]` en todas; `smallTargets` sólo con decorativos documentados.

- [ ] **Step 2: Regresión de escritorio**

`Validar('/', [1440])` y una página interna en `1440×900`; comparar visualmente con `*-before` (o con la rama `main`).
Expected: sin cambios perceptibles en escritorio (animaciones, alternado de servicios/columnas, 3D, cursor custom intactos).

- [ ] **Step 3: Build de producción**

Run: `pnpm build`
Expected: build verde, sin warnings nuevos.

- [ ] **Step 4: (Opcional, requiere confirmación del usuario) Eliminar código muerto**

Si el usuario lo aprueba, borrar: `src/components/SectionArtesania.tsx`, `SectionCapacidades.tsx`, `SectionContacta.tsx`, `SectionIngenieria.tsx`, `SectionNosotros.tsx`, `SectionProyectos.tsx`, `SectionLabel.tsx`, `HorizontalScroll.tsx`, `ProjectCard.tsx`, `ProcessTimeline.tsx`.
Run después: `pnpm build` → OK (confirmar que nada los importaba).
```bash
git rm src/components/Section*.tsx src/components/HorizontalScroll.tsx src/components/ProjectCard.tsx src/components/ProcessTimeline.tsx
git commit -m "chore: eliminar componentes Section* y huérfanos no usados"
```

- [ ] **Step 5: Cierre**

Resumir capturas antes/después y resultados de la auditoría. Invocar `superpowers:finishing-a-development-branch` para decidir merge/PR.

---

## Self-Review (cobertura del spec)

- **Overflow / grids que no colapsan** → Tasks 7, 11, 13 (stats Nosotros), 8, 15. ✅
- **Microtipografía <12px** → Convención A aplicada en Tasks 4, 5, 7, 9, 10, 11, 15. ✅
- **Heros desproporcionados / CTAs gigantes** → Tasks 6, 8, 11, 14. ✅
- **Áreas táctiles ≥44px** → Tasks 3, 5, 7, 15. ✅
- **Interacción táctil (cursor/scroll)** → Task 2. ✅
- **Rendimiento (vídeo/imágenes/3D)** → Task 16. ✅
- **Validación en navegador real** → Procedimiento Validar + Tasks 1 y 17. ✅
- **No tocar código muerto** → sección de alcance + Task 17 opcional. ✅
- **Sin regresión desktop** → Task 17 Step 2. ✅
