'use client'

import { useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

/** Share links for a poster: copy link, email, WhatsApp, Facebook, LinkedIn, X and Telegram. */
export function PosterSharePanel() {
  const { id } = useDocumentInfo()
  const slug = useFormFields(([f]) => f.slug?.value) as string | undefined
  const title = useFormFields(([f]) => f.title?.value) as string | undefined
  const published = useFormFields(([f]) => f.published?.value) as boolean | undefined
  const [copied, setCopied] = useState(false)

  if (!id || !slug) {
    return <p style={{ opacity: 0.8 }}>Save the poster to get its share link.</p>
  }
  const url = `${typeof window === 'undefined' ? '' : window.location.origin}/en/newsletters/${slug}`
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title || 'Nordic Affairs Media')
  const links = [
    { name: 'Email', href: `mailto:?subject=${t}&body=${t}%0A%0A${u}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: 'X', href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { name: 'Telegram', href: `https://t.me/share/url?url=${u}&text=${t}` },
  ]

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label className="field-label">Share this poster</label>
      <input readOnly value={url} onFocus={(e) => e.currentTarget.select()} style={{ width: '100%', marginBottom: 8 }} />
      {!published ? <p style={{ opacity: 0.8, margin: '0 0 8px' }}>Tick “Show on the website” and Save first, or the link shows “not found”.</p> : null}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <button type="button" className="btn btn--style-primary btn--size-small" onClick={copy}>
          {copied ? 'Copied' : 'Copy link'}
        </button>
        {links.map((l) => (
          <a key={l.name} className="btn btn--style-secondary btn--size-small" href={l.href} target="_blank" rel="noopener noreferrer">
            {l.name}
          </a>
        ))}
      </div>
    </div>
  )
}
