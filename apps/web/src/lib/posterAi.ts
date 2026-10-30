import 'server-only'

/**
 * Free AI poster pictures.
 *  1. Cloudflare Workers AI (FLUX.1 schnell): free daily allowance on the Cloudflare account the
 *     site already uses (about 170 pictures a day). Needs CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_AI_TOKEN
 *     (a token with "Workers AI" permission).
 *  2. Pollinations (no key, shared and slower, may add a small logo): used when the two values above
 *     are not set, so the feature works on a test site straight away.
 * Reference pictures are first described in words by a vision model (Cloudflare only) and that
 * description is added to the prompt. FLUX itself has no picture input.
 */

const STYLES: Record<string, string> = {
  poster: 'professional event poster artwork, bold composition, rich colours, cinematic lighting, no text',
  elegant: 'elegant diplomatic gala poster artwork, refined, gold and deep navy palette, Scandinavian, no text',
  concert: 'live concert stage poster artwork, dramatic stage lights, crowd silhouettes, energetic, no text',
  photo: 'photo realistic editorial photograph, natural light, high detail, no text',
}

export type GeneratedImage = { data: Buffer; mimetype: string; ext: string; provider: 'cloudflare' | 'pollinations' }

function cloudflareConfig() {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID
  const token = process.env.CLOUDFLARE_AI_TOKEN
  return account && token ? { account, token } : null
}

async function describeReference(cf: { account: string; token: string }, bytes: Uint8Array): Promise<string> {
  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cf.account}/ai/run/@cf/llava-hf/llava-1.5-7b-hf`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cf.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: Array.from(bytes),
        prompt: 'Describe the colours, mood, style and main subjects of this picture in one short sentence.',
        max_tokens: 60,
      }),
      signal: AbortSignal.timeout(25_000),
    })
    if (!res.ok) return ''
    const json = (await res.json()) as { result?: { description?: string } }
    return (json.result?.description ?? '').trim().slice(0, 240)
  } catch {
    return ''
  }
}

export async function generatePosterImage(args: {
  prompt: string
  style?: string
  references?: Uint8Array[]
}): Promise<GeneratedImage> {
  const cf = cloudflareConfig()
  const base = args.prompt.trim().slice(0, 600)
  if (!base) throw new Error('Write a prompt first.')

  const look = STYLES[args.style ?? 'poster'] ?? STYLES.poster
  let refText = ''
  if (cf && args.references?.length) {
    const notes = await Promise.all(args.references.slice(0, 3).map((b) => describeReference(cf, b)))
    refText = notes.filter(Boolean).join(' ')
  }
  const full = [base, refText ? `Visual reference: ${refText}` : '', look].filter(Boolean).join('. ')

  if (cf) {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${cf.account}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${cf.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: full.slice(0, 2000), steps: 6 }),
        signal: AbortSignal.timeout(60_000),
      },
    ).catch(() => null)
    if (res?.ok) {
      const json = (await res.json()) as { result?: { image?: string } }
      const b64 = json.result?.image
      if (b64) return { data: Buffer.from(b64, 'base64'), mimetype: 'image/jpeg', ext: 'jpg', provider: 'cloudflare' }
    }
    // Daily free allowance used up or a temporary error: fall through to the keyless service.
  }

  const seed = Math.floor(Math.random() * 1_000_000)
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(full.slice(0, 900))}?width=832&height=1216&model=flux&nologo=true&seed=${seed}`
  const res = await fetch(url, { signal: AbortSignal.timeout(90_000) }).catch(() => null)
  if (!res?.ok) {
    throw new Error(
      cf
        ? 'The AI service did not answer (the free daily allowance may be used up). Try again later.'
        : 'The free AI service is busy right now. Wait a minute and try again, or add the Cloudflare AI token for a steadier service.',
    )
  }
  const type = res.headers.get('content-type') ?? 'image/jpeg'
  const mimetype = type.includes('png') ? 'image/png' : 'image/jpeg'
  return { data: Buffer.from(await res.arrayBuffer()), mimetype, ext: mimetype === 'image/png' ? 'png' : 'jpg', provider: 'pollinations' }
}
