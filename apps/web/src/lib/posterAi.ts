import 'server-only'

/**
 * Pictures for posters, free services tried in this order:
 *  1. Google Gemini image model (GEMINI_API_KEY). Understands reference pictures and can draw text.
 *     Google decides whether a free key may use it; if not, the next service is tried.
 *  2. Cloudflare Workers AI, FLUX schnell (CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_AI_TOKEN). No text in pictures.
 *  3. Pollinations (no key, shared, may be busy and adds a small logo). No text in pictures.
 * When "text inside the picture" is asked for, only Gemini is used, since the others misspell words.
 */

const STYLES: Record<string, string> = {
  poster: 'professional event poster artwork, bold composition, rich colours, cinematic lighting',
  elegant: 'elegant diplomatic gala poster artwork, refined, gold and deep navy palette, Scandinavian',
  concert: 'live concert stage poster artwork, dramatic stage lights, crowd silhouettes, energetic',
  photo: 'photo realistic editorial photograph, natural light, high detail',
}

export type GeneratedImage = { data: Buffer; mimetype: string; ext: string; provider: 'gemini' | 'cloudflare' | 'pollinations' }
type Ref = { data: Uint8Array; mimetype: string }

const b64 = (u: Uint8Array) => Buffer.from(u).toString('base64')

async function geminiImage(key: string, prompt: string, refs: Ref[]): Promise<GeneratedImage> {
  const model = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
  const parts: unknown[] = [{ text: prompt }, ...refs.slice(0, 3).map((r) => ({ inlineData: { mimeType: r.mimetype, data: b64(r.data) } }))]
  const call = (withRatio: boolean) =>
    fetch(url, {
      method: 'POST',
      headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { responseModalities: ['IMAGE'], ...(withRatio ? { imageConfig: { aspectRatio: '2:3' } } : {}) },
      }),
      signal: AbortSignal.timeout(80_000),
    })
  let res = await call(true)
  if (res.status === 400) res = await call(false)
  const json = (await res.json().catch(() => ({}))) as {
    error?: { message?: string }
    candidates?: { content?: { parts?: { inlineData?: { mimeType?: string; data?: string } }[] } }[]
  }
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(json.error?.message ?? 'no answer').slice(0, 160)}`)
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)
  if (!part?.inlineData?.data) throw new Error('Gemini returned no picture')
  const mimetype = part.inlineData.mimeType?.includes('jpeg') ? 'image/jpeg' : 'image/png'
  return { data: Buffer.from(part.inlineData.data, 'base64'), mimetype, ext: mimetype === 'image/png' ? 'png' : 'jpg', provider: 'gemini' }
}

async function describeReference(cf: { account: string; token: string }, bytes: Uint8Array): Promise<string> {
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cf.account}/ai/run/@cf/llava-hf/llava-1.5-7b-hf`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cf.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: Array.from(bytes), prompt: 'Describe the colours, mood, style and main subjects of this picture in one short sentence.', max_tokens: 60 }),
      signal: AbortSignal.timeout(25_000),
    })
    if (!res.ok) return ''
    const json = (await res.json()) as { result?: { description?: string } }
    return (json.result?.description ?? '').trim().slice(0, 240)
  } catch {
    return ''
  }
}

async function cloudflareImage(cf: { account: string; token: string }, prompt: string): Promise<GeneratedImage> {
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cf.account}/ai/run/@cf/black-forest-labs/flux-1-schnell`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cf.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: prompt.slice(0, 2000), steps: 6 }),
    signal: AbortSignal.timeout(60_000),
  })
  const json = (await res.json().catch(() => ({}))) as { result?: { image?: string }; errors?: { message?: string }[] }
  if (!res.ok || !json.result?.image) throw new Error(`Cloudflare ${res.status}: ${(json.errors?.[0]?.message ?? 'no picture').slice(0, 140)}`)
  return { data: Buffer.from(json.result.image, 'base64'), mimetype: 'image/jpeg', ext: 'jpg', provider: 'cloudflare' }
}

async function pollinationsImage(prompt: string): Promise<GeneratedImage> {
  const seed = Math.floor(Math.random() * 1_000_000)
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt.slice(0, 900))}?width=832&height=1216&model=flux&nologo=true&seed=${seed}`
  const res = await fetch(url, { signal: AbortSignal.timeout(90_000) })
  if (!res.ok) throw new Error(`Pollinations ${res.status}`)
  const type = res.headers.get('content-type') ?? 'image/jpeg'
  const mimetype = type.includes('png') ? 'image/png' : 'image/jpeg'
  return { data: Buffer.from(await res.arrayBuffer()), mimetype, ext: mimetype === 'image/png' ? 'png' : 'jpg', provider: 'pollinations' }
}

export async function generatePosterImage(args: {
  prompt: string
  style?: string
  references?: Ref[]
  /** true: the picture itself must contain the words of the prompt (Gemini only). */
  textInImage?: boolean
}): Promise<GeneratedImage> {
  const base = args.prompt.trim().slice(0, 1500)
  if (!base) throw new Error('Write a prompt first.')
  const look = STYLES[args.style ?? 'poster'] ?? STYLES.poster
  const geminiKey = process.env.GEMINI_API_KEY
  const cf = process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_AI_TOKEN ? { account: process.env.CLOUDFLARE_ACCOUNT_ID, token: process.env.CLOUDFLARE_AI_TOKEN } : null
  const refs = args.references ?? []
  const errors: string[] = []

  if (args.textInImage) {
    if (!geminiKey) throw new Error('Drawing text inside the picture needs GEMINI_API_KEY in the site settings.')
    const prompt = `${base}\n\nDesign one complete, finished vertical poster (2:3). Write every word of text from the brief exactly as given, spelled correctly, large and easy to read, in a clean professional layout. Style: ${look}.`
    try {
      return await geminiImage(geminiKey, prompt, refs)
    } catch (e) {
      throw new Error(`${e instanceof Error ? e.message : 'Gemini failed'}. Your Gemini key may not have image access on the free plan; switch off "text inside the picture" to use the editable text instead.`)
    }
  }

  const noText = `${base}. ${look}. Leave calm space for text. No text, no letters, no logos.`
  if (geminiKey) {
    try {
      return await geminiImage(geminiKey, noText, refs)
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'Gemini failed')
    }
  }
  if (cf) {
    try {
      let ref = ''
      if (refs.length) ref = (await Promise.all(refs.slice(0, 3).map((r) => describeReference(cf, r.data)))).filter(Boolean).join(' ')
      return await cloudflareImage(cf, ref ? `${noText}. Visual reference: ${ref}` : noText)
    } catch (e) {
      errors.push(e instanceof Error ? e.message : 'Cloudflare failed')
    }
  }
  try {
    return await pollinationsImage(noText)
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'Pollinations failed')
  }
  throw new Error(`No picture service answered (${errors.join('; ')}). Try again in a minute, or add GEMINI_API_KEY or the Cloudflare keys.`)
}
