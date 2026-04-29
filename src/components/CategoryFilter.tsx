'use client'

import { motion } from 'framer-motion'

interface CategoryFilterProps {
  /** Canonical category keys */
  categories: string[]
  active: string | null
  onSelect: (category: string | null) => void
  /** Map from category key to display label (already translated) */
  labelFor?: (category: string) => string
  /** Display label for the "all" option */
  allLabel: string
  accentColor?: string
  textColor?: string
}

export default function CategoryFilter({
  categories,
  active,
  onSelect,
  labelFor,
  allLabel,
  accentColor = '#8C7732',
  textColor = '#002A3A'
}: CategoryFilterProps) {
  return (
    <div className='flex flex-wrap gap-3'>
      <button
        onClick={() => onSelect(null)}
        className='font-ingeniero text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300'
        style={{
          borderColor: active === null ? accentColor : `${textColor}20`,
          backgroundColor: active === null ? accentColor : 'transparent',
          color: active === null ? '#fff' : textColor,
          opacity: active === null ? 1 : 0.6
        }}
      >
        {allLabel}
      </button>
      {categories.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onSelect(cat)}
          className='font-ingeniero text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300'
          style={{
            borderColor: active === cat ? accentColor : `${textColor}20`,
            backgroundColor: active === cat ? accentColor : 'transparent',
            color: active === cat ? '#fff' : textColor,
            opacity: active === cat ? 1 : 0.6
          }}
          whileHover={{ opacity: 1 }}
        >
          {labelFor ? labelFor(cat) : cat}
        </motion.button>
      ))}
    </div>
  )
}
