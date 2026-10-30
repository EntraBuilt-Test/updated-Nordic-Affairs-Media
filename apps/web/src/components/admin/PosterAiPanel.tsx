'use client'

import { useState } from 'react'
import { useForm, useFormFields } from '@payloadcms/ui'

/**
 * "Generate poster" button for the AI mode: sends the prompt (and reference pictures) to the
 * website's AI route, which saves the result in the media library, then fills "Generated poster".
 */
export function PosterAiPanel() {
  const { dispatchFields, setModified } = useForm()
  const prompt = useFormFields(([f]) => f.aiPrompt?.value) as string | undefined
  const style = useFormFields(([f]) => f.aiStyle?.value) as string | undefined
  const refs = useFormFields(([f]) => f.aiReferences?.value) as (string | number | { id: string | number })[] | undefined
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState('')

  async function generate() {
    if (!prompt?.trim()) {
      setMessage('Write a prompt first.')
      return
    }
    setBusy(true)
    setMessage('Making your poster… this takes up to a minute.')
    try {
      const res = await fetch('/api/posters/generate', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          referenceIds: (refs ?? []).map((r) => (typeof r === 'object' ? r.id : r)),
        }),
      })
      const json = (await res.json().catch(() => ({}))) as { id?: string | number; url?: string; error?: string }
      if (!res.ok || !json.id) {
        setMessage(json.error || 'The picture could not be made. Try again.')
      } else {
        dispatchFields({ type: 'UPDATE', path: 'generatedImage', value: json.id })
        setModified(true)
        setPreview(json.url ?? '')
        setMessage('Done. The picture is in "Generated poster" below. Press Save to keep it.')
      }
    } catch {
      setMessage('The connection failed. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ margin: '4px 0 18px' }}>
      <button type="button" className="btn btn--style-primary btn--size-medium" onClick={generate} disabled={busy}>
        {busy ? 'Generating…' : 'Generate poster'}
      </button>
      {message ? <p style={{ marginTop: 8, opacity: 0.85 }}>{message}</p> : null}
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt="Generated poster preview" style={{ marginTop: 8, maxWidth: 260, borderRadius: 8 }} />
      ) : null}
    </div>
  )
}
