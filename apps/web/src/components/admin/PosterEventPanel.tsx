'use client'

import { useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

/** "Create event from this poster": makes a draft event. The agency owner gets an email about it. */
export function PosterEventPanel() {
  const { id } = useDocumentInfo()
  const existing = useFormFields(([f]) => f.createdEvent?.value) as string | number | { id: string | number } | null | undefined
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [eventId, setEventId] = useState<string | number | null>(null)

  if (!id) return null
  const known = eventId ?? (existing && typeof existing === 'object' ? existing.id : existing) ?? null

  async function create() {
    setBusy(true)
    setMessage('')
    try {
      const res = await fetch('/api/posters/create-event', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const json = (await res.json().catch(() => ({}))) as { eventId?: string | number; message?: string; error?: string }
      if (!res.ok) setMessage(json.error || 'The event could not be created.')
      else {
        setEventId(json.eventId ?? null)
        setMessage(json.message || 'Event created.')
      }
    } catch {
      setMessage('The connection failed. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label className="field-label">Make an event</label>
      {known ? (
        <a className="btn btn--style-secondary btn--size-small" href={`/admin/collections/events/${known}`}>
          Open the event
        </a>
      ) : (
        <button type="button" className="btn btn--style-primary btn--size-small" onClick={create} disabled={busy}>
          {busy ? 'Creating…' : 'Create event from this poster'}
        </button>
      )}
      {message ? <p style={{ marginTop: 8, opacity: 0.85 }}>{message}</p> : null}
    </div>
  )
}
