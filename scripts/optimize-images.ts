import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import {
  MAX_LONG_EDGE,
  WEBP_QUALITY,
  rewriteImageRefs,
} from '../src/lib/images/optimize-rules'

const ROOT = process.cwd()
const IMAGES_DIR = path.join(ROOT, 'public/images')
const EXCLUDE_DIR = path.join(ROOT, 'public/images/materiales')
const ARCHIVE_ROOT = path.join(ROOT, 'assets_01/web-originals')
const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg'])

async function walk(dir: string): Promise<string[]> {
  let entries: import('node:fs').Dirent[]
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return []
  }
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else {
      files.push(full)
    }
  }
  return files
}

async function convertAll(): Promise<{ converted: string[]; alreadyDone: number }> {
  const allFiles = await walk(IMAGES_DIR)
  const converted: string[] = []
  let alreadyDone = 0

  for (const file of allFiles) {
    if (file === EXCLUDE_DIR || file.startsWith(EXCLUDE_DIR + path.sep)) continue
    const ext = path.extname(file).toLowerCase()
    if (!RASTER_EXT.has(ext)) continue

    // Every referenced raster is rewritten to .webp unconditionally, so a .webp
    // must exist for every raster we touch. Skip only if it already exists
    // (idempotent re-runs), never based on size.
    const webpSibling = file.slice(0, -ext.length) + '.webp'
    try {
      await fs.access(webpSibling)
      alreadyDone++
      continue
    } catch {
      // no webp yet: convert below
    }

    const stat = await fs.stat(file)
    const rel = path.relative(ROOT, file)
    const archivePath = path.join(ARCHIVE_ROOT, rel)
    await fs.mkdir(path.dirname(archivePath), { recursive: true })
    await fs.copyFile(file, archivePath)

    const webpPath = file.slice(0, -ext.length) + '.webp'
    await sharp(file)
      .rotate()
      .resize({
        width: MAX_LONG_EDGE,
        height: MAX_LONG_EDGE,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath)

    const before = (stat.size / 1024).toFixed(0)
    const after = ((await fs.stat(webpPath)).size / 1024).toFixed(0)
    console.log(`  ${rel}  ${before}KB -> ${after}KB`)
    converted.push(file)
  }

  return { converted, alreadyDone }
}

function isRewritable(file: string): boolean {
  if (file.endsWith('.test.ts')) return false
  if (file.includes(`${path.sep}lib${path.sep}images${path.sep}`)) return false
  if (file.includes(`${path.sep}_generated${path.sep}`)) return false
  const ext = path.extname(file)
  return ext === '.ts' || ext === '.tsx' || ext === '.json'
}

async function rewriteRefs(): Promise<number> {
  const files = (await walk(path.join(ROOT, 'src'))).filter(isRewritable)
  let changed = 0
  for (const file of files) {
    const original = await fs.readFile(file, 'utf8')
    const updated = rewriteImageRefs(original)
    if (updated !== original) {
      await fs.writeFile(file, updated)
      changed++
    }
  }
  return changed
}

async function deleteOriginals(converted: string[]): Promise<number> {
  let deleted = 0
  for (const file of converted) {
    const ext = path.extname(file)
    const webpPath = file.slice(0, -ext.length) + '.webp'
    try {
      const webpStat = await fs.stat(webpPath)
      if (webpStat.size > 0) {
        await fs.rm(file)
        deleted++
      }
    } catch {
      // webp missing: keep the original to be safe
    }
  }
  return deleted
}

async function main(): Promise<void> {
  console.log(`Optimizing raster images under ${path.relative(ROOT, IMAGES_DIR)}`)
  const { converted, alreadyDone } = await convertAll()
  console.log(`\nConverted ${converted.length}, already webp ${alreadyDone}`)

  const changed = await rewriteRefs()
  console.log(`Rewrote image refs in ${changed} source/content files`)

  const deleted = await deleteOriginals(converted)
  console.log(`Deleted ${deleted} original raster files (kept as .webp)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
