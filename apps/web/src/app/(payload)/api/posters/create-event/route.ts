import { NextResponse } from 'next/server'
import { hasRole } from '@/access/roles'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

/** Picture used as the event poster for each way of making a newsletter poster. */
type P = {
  id: string | number
  title: string
  summary?: string | null
  mode?: string | null
  frontImage?: string | { id: string | number } | null
  generatedImage?: string | { id: string | number } | null
  images?: { image?: string | { id: string | number } | null }[] | null
  createdEvent?: string | { id: string | number } | null
}
const idOf = (v: string | number | { id: string | number } | null | undefined) =>
  v && typeof v === 'object' ? v.id : v ?? undefined

/**
 * POST { id } — makes a draft event from a newsletter poster. The email to the agency owner is sent
 * by the event itself (see the "created from a poster" notice on the Events collection), so the
 * same happens when someone picks the poster by hand on a new event.
 */
export async function POST(req: Request) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user || !hasRole(user, 'admin')) return NextResponse.json({ error: 'Only an admin manager can create events.' }, { status: 403 })

  const { id } = (await req.json().catch(() => ({}))) as { id?: string | number }
  if (!id) return NextResponse.json({ error: 'Save the poster first.' }, { status: 400 })
  const poster = (await payload.findByID({ collection: 'newsletter-posters' as never, id, depth: 0, overrideAccess: true }).catch(() => null)) as P | null
  if (!poster) return NextResponse.json({ error: 'Poster not found.' }, { status: 404 })

  const existing = idOf(poster.createdEvent)
  if (existing) return NextResponse.json({ ok: true, eventId: existing, existing: true, message: 'An event was already made from this poster.' })

  const picture = idOf(poster.mode === 'template' ? poster.frontImage : poster.mode === 'ai' ? poster.generatedImage : poster.images?.[0]?.image)
  if (!picture) return NextResponse.json({ error: 'Add the poster picture first, then save.' }, { status: 400 })

  const event = await payload
    .create({
      collection: 'events',
      draft: true,
      overrideAccess: true,
      data: { title: poster.title, summary: poster.summary ?? undefined, poster: picture, fromPoster: poster.id, _status: 'draft' } as never,
    })
    .catch((e: unknown) => ({ error: e instanceof Error ? e.message : 'The event could not be created.' }))
  if ('error' in event) return NextResponse.json({ error: event.error }, { status: 500 })

  await payload.update({ collection: 'newsletter-posters' as never, id, data: { createdEvent: event.id } as never, overrideAccess: true }).catch(() => null)
  return NextResponse.json({ ok: true, eventId: event.id, message: 'Draft event created. Open it to add the date, venue and tickets.' })
}
