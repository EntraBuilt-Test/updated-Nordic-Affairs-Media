'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, useFormFields } from '@payloadcms/ui'
import { PosterCanvas } from '@/components/newsletter/PosterCanvas'
import { BIND_LABELS, bindLayers, makeLayer, newId, parseLayers, type PosterBind, type PosterLayer } from '@/lib/posterLayers'

type Id = string | number
const idOf = (v: unknown): Id | null => {
  if (v && typeof v === 'object') return (v as { id?: Id }).id ?? null
  return typeof v === 'string' || typeof v === 'number' ? v : null
}
const clamp = (n: number, a = 0, b = 100) => Math.min(b, Math.max(a, n))

function useFormVal<T>(name: string) {
  return useFormFields(([f]) => f[name]?.value) as T | undefined
}

function useMediaUrl(id: Id | null) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    if (id == null) {
      setUrl(null)
      return
    }
    let alive = true
    fetch(`/api/media/${id}?depth=0`, { credentials: 'include' })
      .then((r) => r.json())
      .then((j: { url?: string; sizes?: { feature?: { url?: string } } }) => alive && setUrl(j?.sizes?.feature?.url || j?.url || null))
      .catch(() => alive && setUrl(null))
    return () => {
      alive = false
    }
  }, [id])
  return url
}

const row: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', margin: '8px 0' }
const box: React.CSSProperties = { border: '1px solid var(--theme-elevation-150)', borderRadius: 8, padding: 14, margin: '4px 0 18px', background: 'var(--theme-elevation-50)' }
const small: React.CSSProperties = { fontSize: 12, opacity: 0.8 }
const input: React.CSSProperties = { width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--theme-elevation-200)', background: 'var(--theme-input-bg, transparent)', color: 'inherit' }

/**
 * One workspace for every poster mode:
 *  - Upload image / Create image (AI) buttons, for all three modes.
 *  - Template and AI modes: the poster is shown big; add text, drag it where you want, set its size and colour.
 *  - AI mode: "Generate poster" makes the picture and writes the words (text stays editable and correctly spelled).
 */
export function PosterStudio() {
  const { dispatchFields, setModified, addFieldRow } = useForm()
  const mode = useFormVal<string>('mode') ?? 'manual'
  const title = useFormVal<string>('title')
  const summary = useFormVal<string>('summary')
  const frontHeadline = useFormVal<string>('frontHeadline')
  const backTitle = useFormVal<string>('backTitle')
  const backText = useFormVal<string>('backText')
  const aiPrompt = useFormVal<string>('aiPrompt')
  const aiStyle = useFormVal<string>('aiStyle')
  const refs = useFormVal<(Id | { id: Id })[]>('aiReferences')
  const frontId = idOf(useFormVal<unknown>('frontImage'))
  const backId = idOf(useFormVal<unknown>('backImage'))
  const genId = idOf(useFormVal<unknown>('generatedImage'))
  const firstImgId = idOf(useFormFields(([f]) => f['images.0.image']?.value))
  const rowCount = (useFormFields(([f]) => (f.images as { rows?: unknown[] } | undefined)?.rows?.length) as number | undefined) ?? 0
  const rawLayers = useFormVal<unknown>('layers')
  const overlay = useFormVal<number>('overlay') ?? 25

  const [side, setSide] = useState<'front' | 'back'>('front')
  const [selected, setSelected] = useState<string | null>(null)
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')
  const [makePrompt, setMakePrompt] = useState('')
  const [textInImage, setTextInImage] = useState(false)
  const canvasEl = useRef<HTMLDivElement | null>(null)
  const fileEl = useRef<HTMLInputElement | null>(null)
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null)

  const layout = mode === 'template' || mode === 'ai'
  const activeSide: 'front' | 'back' = mode === 'template' ? side : 'front'
  const all = parseLayers(rawLayers)
  const layersRef = useRef<PosterLayer[]>(all)
  layersRef.current = all
  const shown = bindLayers(all, { title, summary, frontHeadline, backTitle, backText })
  const current = all.find((l) => l.id === selected) ?? null

  const currentImageId = mode === 'template' ? (activeSide === 'front' ? frontId : backId) : mode === 'ai' ? genId : firstImgId
  const imageUrl = useMediaUrl(currentImageId)

  function setLayers(next: PosterLayer[]) {
    dispatchFields({ type: 'UPDATE', path: 'layers', value: next })
    setModified(true)
  }
  function patch(id: string, p: Partial<PosterLayer>) {
    setLayers(layersRef.current.map((l) => (l.id === id ? { ...l, ...p } : l)))
  }
  function addLayer(over: Partial<PosterLayer> = {}) {
    const l = makeLayer(activeSide, over)
    setLayers([...layersRef.current, l])
    setSelected(l.id)
  }
  function setImage(id: Id) {
    if (mode === 'template') dispatchFields({ type: 'UPDATE', path: activeSide === 'front' ? 'frontImage' : 'backImage', value: id })
    else if (mode === 'ai') dispatchFields({ type: 'UPDATE', path: 'generatedImage', value: id })
    else if (rowCount > 0) dispatchFields({ type: 'UPDATE', path: 'images.0.image', value: id })
    else (addFieldRow as unknown as (a: unknown) => void)({ path: 'images', rowIndex: 0, subFieldState: { image: { value: id, initialValue: id, valid: true } } })
    setModified(true)
  }

  function onLayerDown(id: string, e: React.PointerEvent<HTMLDivElement>) {
    e.stopPropagation()
    e.preventDefault()
    const rect = canvasEl.current?.getBoundingClientRect()
    const l = layersRef.current.find((x) => x.id === id)
    if (!rect || !l) return
    setSelected(id)
    drag.current = { id, dx: ((e.clientX - rect.left) / rect.width) * 100 - l.x, dy: ((e.clientY - rect.top) / rect.height) * 100 - l.y }
    const move = (ev: PointerEvent) => {
      const d = drag.current
      const r = canvasEl.current?.getBoundingClientRect()
      if (!d || !r) return
      patch(d.id, { x: clamp(Math.round((((ev.clientX - r.left) / r.width) * 100 - d.dx) * 10) / 10), y: clamp(Math.round((((ev.clientY - r.top) / r.height) * 100 - d.dy) * 10) / 10) })
    }
    const up = () => {
      drag.current = null
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  async function upload(file: File) {
    if (file.size > 4 * 1024 * 1024) {
      setMessage('This picture is bigger than 4 MB. Use "Create New" or "Choose from existing" in the picture box below for big files.')
      return
    }
    setBusy('upload')
    setMessage('Uploading…')
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('_payload', JSON.stringify({ alt: title || file.name.replace(/\.[^.]+$/, '') }))
      const res = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'include' })
      const json = (await res.json().catch(() => ({}))) as { doc?: { id?: Id }; errors?: { message?: string }[] }
      if (!res.ok || !json.doc?.id) setMessage(json.errors?.[0]?.message || 'The upload failed. Try again.')
      else {
        setImage(json.doc.id)
        setMessage('Picture added. Press Save to keep it.')
      }
    } catch {
      setMessage('The connection failed. Try again.')
    } finally {
      setBusy('')
    }
  }

  async function makeImage(prompt: string, sendRefs: boolean) {
    const res = await fetch('/api/posters/generate', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        style: aiStyle,
        textInImage,
        referenceIds: sendRefs ? (refs ?? []).map((r) => (typeof r === 'object' ? r.id : r)) : [],
      }),
    })
    const json = (await res.json().catch(() => ({}))) as { id?: Id; error?: string; provider?: string }
    if (!res.ok || !json.id) throw new Error(json.error || 'The picture could not be made.')
    setImage(json.id)
    return json.provider ?? ''
  }

  async function writeText(prompt: string) {
    const res = await fetch('/api/posters/copy', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, title, summary, side: activeSide }),
    })
    const json = (await res.json().catch(() => ({}))) as { layers?: unknown; note?: string; provider?: string }
    const written = parseLayers(json.layers)
    if (written.length) setLayers([...layersRef.current.filter((l) => l.side !== activeSide), ...written])
    return json.note ?? ''
  }

  async function createImageOnly() {
    const prompt = (mode === 'ai' ? aiPrompt : makePrompt)?.trim()
    if (!prompt) {
      setMessage(mode === 'ai' ? 'Write the prompt above first.' : 'Describe the picture first.')
      return
    }
    setBusy('image')
    setMessage('Creating the picture… up to a minute.')
    try {
      const provider = await makeImage(prompt, mode === 'ai')
      setMessage(`Picture made${provider ? ` (${provider})` : ''}. Press Save to keep it.`)
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'The picture could not be made.')
    } finally {
      setBusy('')
    }
  }

  async function generateAll() {
    const prompt = aiPrompt?.trim()
    if (!prompt) {
      setMessage('Write the prompt above first.')
      return
    }
    setBusy('all')
    setMessage('Making the picture and writing the words… up to a minute.')
    const brief = textInImage ? [prompt, title ? `Title: ${title}` : '', summary ? `Text: ${summary}` : ''].filter(Boolean).join('\n') : prompt
    const [img, txt] = await Promise.allSettled([makeImage(brief, true), textInImage ? Promise.resolve('') : writeText(prompt)])
    const notes: string[] = []
    if (img.status === 'rejected') notes.push(`Picture: ${img.reason instanceof Error ? img.reason.message : 'failed'} The text was still added on a colour background; press the button again to retry the picture.`)
    else notes.push(`Picture made${img.value ? ` (${img.value})` : ''}.`)
    if (txt.status === 'fulfilled' && txt.value) notes.push(txt.value)
    if (textInImage && img.status === 'fulfilled') notes.push('The words are inside the picture. Delete any text boxes on top if you see double text.')
    else if (textInImage === false && txt.status === 'fulfilled') notes.push('Text is placed on the poster: drag it, resize it, edit it. Press Save when happy.')
    setMessage(notes.join(' '))
    setBusy('')
  }

  const bindKeys: PosterBind[] = activeSide === 'front' ? ['title', 'frontHeadline', 'summary'] : ['backTitle', 'backText', 'title']

  return (
    <div style={box}>
      <input ref={fileEl} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) void upload(f) }} />

      <strong>Picture</strong>
      {mode === 'template' ? (
        <div style={row}>
          {(['front', 'back'] as const).map((s) => (
            <button key={s} type="button" className={`btn btn--style-${side === s ? 'primary' : 'secondary'} btn--size-small`} onClick={() => { setSide(s); setSelected(null) }}>
              {s === 'front' ? 'Front side' : 'Back side'}
            </button>
          ))}
        </div>
      ) : null}
      <div style={row}>
        <button type="button" className="btn btn--style-primary btn--size-small" disabled={Boolean(busy)} onClick={() => fileEl.current?.click()}>
          {busy === 'upload' ? 'Uploading…' : 'Upload image'}
        </button>
        {mode !== 'ai' ? (
          <>
            <input style={{ ...input, flex: '1 1 220px', width: 'auto' }} value={makePrompt} onChange={(e) => setMakePrompt(e.target.value)} placeholder="Describe a picture to create with AI" />
            <button type="button" className="btn btn--style-secondary btn--size-small" disabled={Boolean(busy)} onClick={createImageOnly}>
              {busy === 'image' ? 'Creating…' : 'Create image'}
            </button>
          </>
        ) : (
          <button type="button" className="btn btn--style-secondary btn--size-small" disabled={Boolean(busy)} onClick={createImageOnly}>
            {busy === 'image' ? 'Creating…' : 'Create image only'}
          </button>
        )}
      </div>

      {mode === 'ai' ? (
        <div style={{ ...row, alignItems: 'flex-start' }}>
          <button type="button" className="btn btn--style-primary btn--size-medium" disabled={Boolean(busy)} onClick={generateAll}>
            {busy === 'all' ? 'Generating…' : 'Generate poster (picture + text)'}
          </button>
          <label style={{ ...small, display: 'flex', gap: 6, alignItems: 'center' }}>
            <input type="checkbox" checked={textInImage} onChange={(e) => setTextInImage(e.target.checked)} />
            Let Gemini draw the words inside the picture (needs a Gemini key with image access)
          </label>
        </div>
      ) : null}

      {message ? <p style={{ margin: '8px 0', opacity: 0.95 }}>{message}</p> : null}

      {layout ? (
        <>
          <strong>Text on the poster</strong>
          <p style={small}>Click a text to select it, drag it anywhere, then use the controls to change size and colour. Text typed in the fields above can be linked, so it appears here by itself.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 340px) minmax(220px, 1fr)', gap: 16, alignItems: 'start' }}>
            <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 22px rgba(0,0,0,.35)' }}>
              <PosterCanvas
                image={imageUrl}
                layers={shown}
                side={activeSide}
                overlay={overlay}
                selectedId={selected}
                onLayerDown={onLayerDown}
                onCanvasDown={() => setSelected(null)}
                canvasRef={(el) => { canvasEl.current = el }}
              />
            </div>
            <div>
              <div style={row}>
                <button type="button" className="btn btn--style-primary btn--size-small" onClick={() => addLayer()}>+ Add text</button>
                {bindKeys.map((k) => (
                  <button key={k} type="button" className="btn btn--style-secondary btn--size-small" onClick={() => addLayer({ bind: k, text: BIND_LABELS[k], size: k === 'summary' || k === 'backText' ? 15 : 30, y: k === 'summary' || k === 'backText' ? 70 : 20 })}>
                    + {BIND_LABELS[k]}
                  </button>
                ))}
              </div>
              <label style={small}>Darken the picture: {overlay}%</label>
              <input type="range" min={0} max={80} value={overlay} style={{ width: '100%' }} onChange={(e) => { dispatchFields({ type: 'UPDATE', path: 'overlay', value: Number(e.target.value) }); setModified(true) }} />

              {current ? (
                <div style={{ marginTop: 12 }}>
                  {current.bind ? (
                    <p style={small}>
                      This text follows the “{BIND_LABELS[current.bind]}” field above.{' '}
                      <button type="button" className="btn btn--style-secondary btn--size-small" onClick={() => patch(current.id, { bind: undefined, text: shown.find((l) => l.id === current.id)?.text ?? current.text })}>Unlink to edit here</button>
                    </p>
                  ) : (
                    <textarea style={{ ...input, minHeight: 70 }} value={current.text} onChange={(e) => patch(current.id, { text: e.target.value })} />
                  )}
                  <label style={small}>Font size: {current.size}</label>
                  <input type="range" min={8} max={120} value={current.size} style={{ width: '100%' }} onChange={(e) => patch(current.id, { size: Number(e.target.value) })} />
                  <label style={small}>Text width: {current.w}%</label>
                  <input type="range" min={15} max={100} value={current.w} style={{ width: '100%' }} onChange={(e) => patch(current.id, { w: Number(e.target.value) })} />
                  <div style={row}>
                    <input type="color" aria-label="Text colour" value={current.color.length === 7 ? current.color : '#ffffff'} onChange={(e) => patch(current.id, { color: e.target.value })} />
                    <select style={{ ...input, width: 'auto' }} value={current.font} onChange={(e) => patch(current.id, { font: e.target.value as PosterLayer['font'] })}>
                      <option value="serif">Serif</option>
                      <option value="sans">Sans</option>
                      <option value="script">Script</option>
                    </select>
                    <button type="button" className={`btn btn--style-${current.weight === 700 ? 'primary' : 'secondary'} btn--size-small`} onClick={() => patch(current.id, { weight: current.weight === 700 ? 400 : 700 })}>Bold</button>
                    {(['left', 'center', 'right'] as const).map((a) => (
                      <button key={a} type="button" className={`btn btn--style-${current.align === a ? 'primary' : 'secondary'} btn--size-small`} onClick={() => patch(current.id, { align: a })}>{a}</button>
                    ))}
                    <label style={{ ...small, display: 'flex', gap: 4, alignItems: 'center' }}>
                      <input type="checkbox" checked={current.shadow} onChange={(e) => patch(current.id, { shadow: e.target.checked })} /> Shadow
                    </label>
                  </div>
                  <div style={row}>
                    <button type="button" className="btn btn--style-secondary btn--size-small" onClick={() => { const c: PosterLayer = { ...current, id: newId(), x: clamp(current.x + 4), y: clamp(current.y + 4), bind: undefined, text: shown.find((l) => l.id === current.id)?.text ?? current.text }; setLayers([...layersRef.current, c]); setSelected(c.id) }}>Duplicate</button>
                    <button type="button" className="btn btn--style-secondary btn--size-small" onClick={() => { setLayers(layersRef.current.filter((l) => l.id !== current.id)); setSelected(null) }}>Delete</button>
                  </div>
                </div>
              ) : (
                <p style={{ ...small, marginTop: 12 }}>Nothing selected. Click a text on the poster, or press “+ Add text”.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p style={small}>This poster is shown with the first picture, the title and the description. Use the buttons above to add or create the picture, then fill in the details below.</p>
      )}
    </div>
  )
}
