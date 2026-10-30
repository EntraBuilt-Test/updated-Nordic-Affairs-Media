/**
 * Text on a poster. Every piece of text is a "layer": where it sits (x, y in percent of the poster),
 * how big (size is for a 400 px wide poster and scales with the screen), colour and so on.
 * Shared by the admin editor and the public poster pages (no server-only code here).
 */
export type PosterBind = 'title' | 'summary' | 'frontHeadline' | 'backTitle' | 'backText'

export type PosterLayer = {
  id: string
  side: 'front' | 'back'
  text: string
  x: number
  y: number
  size: number
  color: string
  weight: 400 | 700
  align: 'left' | 'center' | 'right'
  w: number
  font: 'sans' | 'serif' | 'script'
  shadow: boolean
  /** When set, the text follows the form field of that name (typed in the tab, shown on the poster). */
  bind?: PosterBind
}

export const FONT_STACKS: Record<PosterLayer['font'], string> = {
  sans: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  script: '"Brush Script MT", "Segoe Script", "Snell Roundhand", cursive',
}

export const BIND_LABELS: Record<PosterBind, string> = {
  title: 'Title',
  summary: 'Description',
  frontHeadline: 'Front headline',
  backTitle: 'Back title',
  backText: 'Back text',
}

const COLOR = /^#[0-9a-fA-F]{3,8}$/
const clamp = (n: unknown, min: number, max: number, fallback: number) => {
  const v = typeof n === 'number' && Number.isFinite(n) ? n : fallback
  return Math.min(max, Math.max(min, v))
}

export function newId() {
  return Math.random().toString(36).slice(2, 9)
}

export function makeLayer(side: 'front' | 'back', over: Partial<PosterLayer> = {}): PosterLayer {
  return {
    id: newId(),
    side,
    text: 'Your text',
    x: 50,
    y: 50,
    size: 24,
    color: '#ffffff',
    weight: 700,
    align: 'center',
    w: 80,
    font: 'serif',
    shadow: true,
    ...over,
  }
}

/** Reads whatever is stored (the database, an AI answer) and returns clean, safe layers. */
export function parseLayers(value: unknown): PosterLayer[] {
  if (!Array.isArray(value)) return []
  const out: PosterLayer[] = []
  for (const raw of value.slice(0, 60)) {
    if (!raw || typeof raw !== 'object') continue
    const r = raw as Record<string, unknown>
    const bind = ['title', 'summary', 'frontHeadline', 'backTitle', 'backText'].includes(String(r.bind)) ? (r.bind as PosterBind) : undefined
    out.push({
      id: typeof r.id === 'string' && r.id ? r.id.slice(0, 24) : newId(),
      side: r.side === 'back' ? 'back' : 'front',
      text: typeof r.text === 'string' ? r.text.slice(0, 1200) : '',
      x: clamp(r.x, 0, 100, 50),
      y: clamp(r.y, 0, 100, 50),
      size: clamp(r.size, 6, 160, 24),
      color: typeof r.color === 'string' && COLOR.test(r.color) ? r.color : '#ffffff',
      weight: r.weight === 400 ? 400 : 700,
      align: r.align === 'left' || r.align === 'right' ? r.align : 'center',
      w: clamp(r.w, 10, 100, 80),
      font: r.font === 'sans' || r.font === 'script' ? r.font : 'serif',
      shadow: r.shadow !== false,
      bind,
    })
  }
  return out
}

/** Replaces the text of bound layers with the current value of their form field. */
export function bindLayers(
  layers: PosterLayer[],
  values: Partial<Record<PosterBind, string | null | undefined>>,
  /** Public pages hide a bound layer whose field is empty; the editor keeps a placeholder. */
  dropEmpty = false,
): PosterLayer[] {
  const out: PosterLayer[] = []
  for (const l of layers) {
    if (!l.bind) {
      out.push(l)
      continue
    }
    const v = values[l.bind]
    if (typeof v === 'string' && v.trim()) out.push({ ...l, text: v })
    else if (!dropEmpty) out.push(l)
  }
  return out
}
