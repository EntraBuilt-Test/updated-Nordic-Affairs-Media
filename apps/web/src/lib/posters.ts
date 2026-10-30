import 'server-only'
import type { Media } from '@/payload-types'
import { isDoc } from '@/lib/payload'
import { bindLayers, parseLayers, type PosterLayer } from '@/lib/posterLayers'

/** Shape of a newsletter poster as the website reads it (pictures loaded with depth 1+). */
export type PosterDoc = {
  id: string | number
  title: string
  slug: string
  mode?: 'template' | 'ai' | 'manual' | null
  summary?: string | null
  published?: boolean | null
  updatedAt?: string
  frontImage?: string | Media | null
  backImage?: string | Media | null
  frontHeadline?: string | null
  backTitle?: string | null
  backText?: string | null
  accentColor?: string | null
  animation?: 'flip' | 'tilt' | 'float' | null
  generatedImage?: string | Media | null
  images?: { id?: string | null; image?: string | Media | null; caption?: string | null }[] | null
  eventDate?: string | null
  venueName?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  layers?: unknown
  overlay?: number | null
  designed?: boolean | null
  brandName?: string | null
  brandTagline?: string | null
  greeting?: string | null
  intro?: string | null
  highlight?: string | null
  stats?: { id?: string | null; value?: string | null; label?: string | null }[] | null
  quoteText?: string | null
  quoteName?: string | null
  quoteRole?: string | null
  featuresTitle?: string | null
  features?: { id?: string | null; title?: string | null; text?: string | null }[] | null
  closingLine?: string | null
  closingScript?: string | null
  dButtonLabel?: string | null
  dButtonUrl?: string | null
}

/** The main picture of a poster, whichever way it was made. */
export function posterCover(p: PosterDoc): Media | null {
  const candidate =
    p.mode === 'template' ? p.frontImage : p.mode === 'ai' ? p.generatedImage : p.images?.[0]?.image
  return isDoc(candidate) ? candidate : null
}

/** The text layers of a poster with linked fields filled in, ready for the public pages. */
export function posterTextLayers(p: PosterDoc): PosterLayer[] {
  return bindLayers(
    parseLayers(p.layers),
    { title: p.title, summary: p.summary, frontHeadline: p.frontHeadline, backTitle: p.backTitle, backText: p.backText },
    true,
  )
}

/** Address of the main picture (the library keeps several sizes; this is the page-sized one). */
export function posterImageUrl(m: Media | null | undefined): string | null {
  if (!m) return null
  const sized = (m.sizes as { feature?: { url?: string | null } } | undefined)?.feature?.url
  return sized || m.url || null
}

/** Only http(s) links and site paths are allowed as the button link. */
export function safeLink(url: string | null | undefined): string | null {
  const v = (url ?? '').trim()
  if (/^https?:\/\//i.test(v) || /^\/(?!\/)/.test(v)) return v
  return null
}
