import { NextResponse } from 'next/server'
import { hasRole } from '@/access/roles'
import { getPayloadClient } from '@/lib/payload'
import { writePosterCopy } from '@/lib/posterCopy'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/** POST { prompt, title?, summary?, side? } — the AI writes the poster words and places them. Staff only. */
export async function POST(req: Request) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: req.headers })
  if (!user || !hasRole(user, 'admin', 'editor')) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })
  const body = (await req.json().catch(() => ({}))) as { prompt?: string; title?: string; summary?: string; side?: string }
  const out = await writePosterCopy({
    prompt: String(body.prompt ?? '').slice(0, 2000),
    title: String(body.title ?? '').slice(0, 200),
    summary: String(body.summary ?? '').slice(0, 1500),
    side: body.side === 'back' ? 'back' : 'front',
  })
  return NextResponse.json({ ok: true, ...out })
}
