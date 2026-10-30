import { NextResponse } from 'next/server'
import { hasRole } from '@/access/roles'
import { getPayloadClient } from '@/lib/payload'
import { generatePosterImage } from '@/lib/posterAi'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

/**
 * POST { prompt, style?, referenceIds?, textInImage? } — makes a poster picture with a free AI service and
 * saves it in the media library. Returns { id, url, provider }. Staff only.
 */
export async function POST(req: Request) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user || !hasRole(user, 'admin', 'editor')) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })

  const body = (await req.json().catch(() => ({}))) as {
    prompt?: string
    style?: string
    referenceIds?: (string | number)[]
    textInImage?: boolean
  }
  const prompt = String(body.prompt ?? '').trim()
  if (!prompt) return NextResponse.json({ error: 'Write a prompt first.' }, { status: 400 })

  // Reference pictures: read the saved files so the AI can look at them.
  const references: { data: Uint8Array; mimetype: string }[] = []
  const site = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin
  for (const id of (body.referenceIds ?? []).slice(0, 3)) {
    try {
      const m = (await payload.findByID({ collection: 'media', id, depth: 0, overrideAccess: true })) as {
        url?: string | null
        mimeType?: string | null
        sizes?: { card?: { url?: string | null; mimeType?: string | null } }
      }
      const src = m.sizes?.card?.url || m.url
      if (!src) continue
      const r = await fetch(new URL(src, site), { signal: AbortSignal.timeout(15_000) })
      if (r.ok) {
        const mime = r.headers.get('content-type') || m.sizes?.card?.mimeType || m.mimeType || 'image/jpeg'
        references.push({ data: new Uint8Array(await r.arrayBuffer()), mimetype: mime.split(';')[0] || 'image/jpeg' })
      }
    } catch {
      // A reference that cannot be read is skipped.
    }
  }

  try {
    const img = await generatePosterImage({ prompt, style: body.style, references, textInImage: Boolean(body.textInImage) })
    const created = await payload.create({
      collection: 'media',
      data: { alt: prompt.slice(0, 120), credit: `AI generated (${img.provider})` },
      file: { data: img.data, mimetype: img.mimetype, name: `ai-poster-${Date.now()}.${img.ext}`, size: img.data.length },
      overrideAccess: true,
      context: { skipRevalidate: true },
    })
    return NextResponse.json({ ok: true, id: created.id, url: created.url, provider: img.provider })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'The picture could not be made.' }, { status: 502 })
  }
}
