import 'server-only'
import type { Media } from '@/payload-types'
import { isDoc } from '@/lib/payload'

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
}

/** The main picture of a poster, whichever way it was made. */
export function posterCover(p: PosterDoc): Media | null {
  const candidate =
    p.mode === 'template' ? p.frontImage : p.mode === 'ai' ? p.generatedImage : p.images?.[0]?.image
  return isDoc(candidate) ? candidate : null
}

/** Only http(s) links and site paths are allowed as the button link. */
export function safeLink(url: string | null | undefined): string | null {
  const v = (url ?? '').trim()
  if (/^https?:\/\//i.test(v) || /^\/(?!\/)/.test(v)) return v
  return null
}
