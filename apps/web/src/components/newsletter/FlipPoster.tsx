'use client'

import { useRef, useState } from 'react'
import { PosterCanvas } from '@/components/newsletter/PosterCanvas'
import type { PosterLayer } from '@/lib/posterLayers'

type Props = {
  front: string
  back?: string | null
  alt: string
  headline?: string | null
  backTitle?: string | null
  backText?: string | null
  accent?: string | null
  animation?: 'flip' | 'tilt' | 'float' | null
  layers?: PosterLayer[]
  overlay?: number | null
}

const SAFE_COLOR = /^#[0-9a-fA-F]{3,8}$/

/**
 * A poster card with a front and a back. Flip: hover (mouse) or tap to turn it. Tilt: the card
 * follows the pointer, tap to turn. Float: it turns slowly by itself (stops for visitors who
 * asked their device for less motion). Keyboard: press Enter or Space.
 */
export function FlipPoster({ front, back, alt, headline, backTitle, backText, accent, animation = 'flip', layers = [], overlay }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement | null>(null)
  const color = accent && SAFE_COLOR.test(accent) ? accent : '#c8a24a'
  const mode = animation ?? 'flip'
  const hasLayers = layers.length > 0
  const backLayers = layers.some((l) => l.side === 'back')

  function onMove(e: React.PointerEvent) {
    if (mode !== 'tilt' || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: -py * 14, y: px * 14 })
  }

  const turn = flipped ? 180 : 0
  const transform =
    mode === 'tilt'
      ? `rotateX(${tilt.x}deg) rotateY(${tilt.y + turn}deg)`
      : mode === 'float'
        ? undefined
        : `rotateY(${turn}deg)`

  const face: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 18px 50px rgba(0,0,0,.35)',
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <style>{`
        @keyframes nam-float-turn { 0%{transform:rotateY(-14deg)} 50%{transform:rotateY(14deg)} 100%{transform:rotateY(-14deg)} }
        .nam-float { animation: nam-float-turn 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .nam-float { animation: none; } .nam-flip-inner { transition: none !important; } }
      `}</style>
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? 'Show the front of the poster' : 'Show the back of the poster'}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setFlipped((v) => !v)
          }
        }}
        onPointerEnter={(e) => {
          if (mode === 'flip' && e.pointerType === 'mouse') setFlipped(true)
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') {
            if (mode === 'flip') setFlipped(false)
            setTilt({ x: 0, y: 0 })
          }
        }}
        onPointerMove={onMove}
        style={{ perspective: 1400, cursor: 'pointer', aspectRatio: '2 / 3' }}
      >
        <div
          className={`nam-flip-inner ${mode === 'float' && !flipped ? 'nam-float' : ''}`}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform .8s cubic-bezier(.2,.8,.2,1)',
            transform: mode === 'float' && flipped ? `rotateY(180deg)` : transform,
          }}
        >
          <div style={face}>
            {hasLayers ? (
              <PosterCanvas image={front} layers={layers} side="front" overlay={overlay} alt={alt} style={{ height: '100%' }} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={front} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            {headline && !hasLayers ? (
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '28px 18px 16px', color: '#fff', background: 'linear-gradient(transparent, rgba(0,0,0,.72))', fontWeight: 700, fontSize: 22 }}>
                {headline}
              </div>
            ) : null}
          </div>
          <div style={{ ...face, transform: 'rotateY(180deg)', background: '#0b1b33', color: '#fff' }}>
            {hasLayers && (back || backLayers) ? (
              <PosterCanvas image={back} layers={layers} side="back" overlay={overlay} style={{ height: '100%' }} />
            ) : null}
            {!hasLayers && back ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={back} alt="" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: backTitle || backText ? 0.35 : 1 }} />
            ) : null}
            {!hasLayers && (backTitle || backText) ? (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
                {backTitle ? <p style={{ color, fontWeight: 700, fontSize: 24, margin: 0 }}>{backTitle}</p> : null}
                {backText ? <p style={{ marginTop: 14, lineHeight: 1.55, fontSize: 16, whiteSpace: 'pre-line' }}>{backText}</p> : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center font-ui text-caption text-slate">
        {back || backTitle || backText || backLayers ? (flipped ? 'Tap the poster to see the front' : 'Tap or hover the poster to turn it over') : ''}
      </p>
    </div>
  )
}
