// ============================================
// OMIO ATELIER & DESIGN — Non-textual constants
// (All translatable copy lives in messages/{locale}.json)
// ============================================

export type World = 'artesano' | 'ingeniero' | 'fabrica'

export interface SectionDef {
  id: string
  /** Translation key under `sections.labels` */
  labelKey: string
  number: string
  world: World
}

export const SECTIONS: SectionDef[] = [
  { id: 'nosotros', labelKey: 'nosotros', number: '01', world: 'artesano' },
  { id: 'capacidades', labelKey: 'capacidades', number: '02', world: 'fabrica' },
  { id: 'artesania', labelKey: 'artesania', number: '03', world: 'artesano' },
  { id: 'ingenieria', labelKey: 'ingenieria', number: '04', world: 'ingeniero' },
  { id: 'proyectos', labelKey: 'proyectos', number: '05', world: 'fabrica' },
  { id: 'contacta', labelKey: 'contacta', number: '06', world: 'artesano' }
]

export interface NavLink {
  href: string
  /** Translation key under `nav` */
  labelKey: string
  world: World
}

export const NAV_PAGES: NavLink[] = [
  { href: '/nosotros', labelKey: 'nosotros', world: 'artesano' },
  { href: '/servicios', labelKey: 'servicios', world: 'fabrica' },
  { href: '/materiales', labelKey: 'materiales', world: 'artesano' },
  { href: '/proyectos', labelKey: 'proyectos', world: 'fabrica' },
  { href: '/proceso', labelKey: 'proceso', world: 'ingeniero' },
  { href: '/contacto', labelKey: 'contacto', world: 'artesano' }
]

// --- Color Palettes for JS interpolation ---
export const PALETTES = {
  artesano: {
    bg: [243, 236, 235], // #F3ECEB — PANTONE 11-3900 TCX
    text: [0, 42, 58], // #002A3A — PANTONE 303 C
    accent: [140, 119, 50] // #8C7732 — PANTONE 4495 C
  },
  ingeniero: {
    bg: [243, 236, 235], // #F3ECEB
    text: [0, 42, 58], // #002A3A
    accent: [140, 119, 50] // #8C7732
  },
  fabrica: {
    bg: [0, 42, 58], // #002A3A
    text: [243, 236, 235], // #F3ECEB
    accent: [140, 119, 50] // #8C7732
  }
} as const

// --- Stat metadata (numerics + translation key for label) ---
export interface StatDef {
  value: number
  suffix: string
  /** Translation key under `stats` */
  labelKey: string
}

export const STATS: StatDef[] = [
  { value: 42, suffix: '+', labelKey: 'countries' },
  { value: 200, suffix: '+', labelKey: 'projects' },
  { value: 15, suffix: '', labelKey: 'experience' }
]
