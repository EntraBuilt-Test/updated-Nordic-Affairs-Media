import 'server-only'
import { makeLayer, newId, type PosterLayer } from '@/lib/posterLayers'

/**
 * Writes the words of a poster (headline, a few lines, date, button text) with a free AI text model:
 *  1. Groq (GROQ_API_KEY), 2. Google Gemini (GEMINI_API_KEY), 3. your own title and description.
 * The AI only writes the words; the words are placed as text layers, so spelling is always right.
 */
type Copy = { headline: string; subtitle?: string; lines?: string[]; dateLine?: string; callToAction?: string }

const SYSTEM =
  'You write short, polished poster copy for Nordic Affairs Media, a Scandinavian diplomatic and cultural media house. ' +
  'Reply with JSON only, no markdown: {"headline": string (max 6 words), "subtitle": string (max 14 words), "lines": string[] (3 or 4 items, max 8 words each), "dateLine": string (date and place if given, else empty), "callToAction": string (max 4 words)}. ' +
  'Use only facts from the brief. Never invent dates, prices, names or numbers. Write in the language of the brief.'

function parseCopy(text: string): Copy | null {
  try {
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    const j = JSON.parse(text.slice(start, end + 1)) as Record<string, unknown>
    if (typeof j.headline !== 'string' || !j.headline.trim()) return null
    const str = (v: unknown, n: number) => (typeof v === 'string' ? v.trim().slice(0, n) : '')
    return {
      headline: str(j.headline, 90),
      subtitle: str(j.subtitle, 160),
      lines: Array.isArray(j.lines) ? j.lines.filter((x): x is string => typeof x === 'string').slice(0, 4).map((x) => x.trim().slice(0, 90)) : [],
      dateLine: str(j.dateLine, 120),
      callToAction: str(j.callToAction, 40),
    }
  } catch {
    return null
  }
}

async function groq(key: string, brief: string): Promise<Copy | null> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: brief }],
      response_format: { type: 'json_object' },
      temperature: 0.6,
    }),
    signal: AbortSignal.timeout(30_000),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}`)
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] }
  return parseCopy(json.choices?.[0]?.message?.content ?? '')
}

async function gemini(key: string, brief: string): Promise<Copy | null> {
  const model = process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-flash'
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM }] },
      contents: [{ parts: [{ text: brief }] }],
      generationConfig: { responseMimeType: 'application/json', temperature: 0.6 },
    }),
    signal: AbortSignal.timeout(30_000),
  })
  if (!res.ok) throw new Error(`Gemini ${res.status}`)
  const json = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] }
  return parseCopy(json.candidates?.[0]?.content?.parts?.[0]?.text ?? '')
}

/** Places the words on the poster in a clean, readable layout. */
export function layoutCopy(c: Copy, side: 'front' | 'back' = 'front'): PosterLayer[] {
  const out: PosterLayer[] = []
  out.push(makeLayer(side, { text: c.headline, y: 15, size: 38, w: 88, font: 'serif', color: '#ffffff' }))
  if (c.subtitle) out.push(makeLayer(side, { text: c.subtitle, y: 29, size: 16, w: 80, weight: 400, font: 'sans', color: '#f6d97a' }))
  ;(c.lines ?? []).forEach((line, i) => out.push(makeLayer(side, { text: `• ${line}`, y: 56 + i * 7.5, size: 17, w: 80, weight: 700, font: 'sans', color: '#ffffff', align: 'left', x: 52 })))
  if (c.dateLine) out.push(makeLayer(side, { text: c.dateLine, y: 87, size: 15, w: 86, font: 'sans', color: '#ffffff' }))
  if (c.callToAction) out.push(makeLayer(side, { text: c.callToAction.toUpperCase(), y: 94, size: 15, w: 70, font: 'sans', color: '#f6d97a' }))
  return out.map((l) => ({ ...l, id: newId() }))
}

export async function writePosterCopy(args: { prompt: string; title?: string; summary?: string; side?: 'front' | 'back' }): Promise<{ layers: PosterLayer[]; provider: string; note?: string }> {
  const brief = [
    args.title ? `Title: ${args.title}` : '',
    args.summary ? `Details: ${args.summary}` : '',
    args.prompt ? `Idea: ${args.prompt}` : '',
  ]
    .filter(Boolean)
    .join('\n')
    .slice(0, 3000)
  const side = args.side ?? 'front'
  const tries: [string, string | undefined, (k: string, b: string) => Promise<Copy | null>][] = [
    ['groq', process.env.GROQ_API_KEY, groq],
    ['gemini', process.env.GEMINI_API_KEY, gemini],
  ]
  const notes: string[] = []
  for (const [name, key, run] of tries) {
    if (!key) continue
    try {
      const copy = await run(key, brief)
      if (copy) return { layers: layoutCopy(copy, side), provider: name }
      notes.push(`${name}: unreadable answer`)
    } catch (e) {
      notes.push(e instanceof Error ? e.message : `${name} failed`)
    }
  }
  const head = (args.title || args.prompt.split(/[.\n]/)[0] || 'Nordic Affairs Media').trim().slice(0, 80)
  const sub = (args.summary || '').trim().slice(0, 140)
  return {
    layers: layoutCopy({ headline: head, subtitle: sub, lines: [], dateLine: '', callToAction: '' }, side),
    provider: 'none',
    note: notes.length ? `The AI writer did not answer (${notes.join('; ')}). Your own title and description were used.` : 'Add GROQ_API_KEY or GEMINI_API_KEY in the site settings so the AI writes the text. Your own title and description were used.',
  }
}
