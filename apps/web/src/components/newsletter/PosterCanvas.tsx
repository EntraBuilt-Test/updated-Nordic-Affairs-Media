import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { FONT_STACKS, type PosterLayer } from '@/lib/posterLayers'

type Props = {
  image?: string | null
  layers: PosterLayer[]
  side?: 'front' | 'back'
  /** 0 to 80: how much the picture is darkened so white text stays readable. */
  overlay?: number | null
  alt?: string
  /** Editor only: drag handlers. */
  selectedId?: string | null
  onLayerDown?: (id: string, e: ReactPointerEvent<HTMLDivElement>) => void
  onCanvasDown?: () => void
  canvasRef?: (el: HTMLDivElement | null) => void
  style?: CSSProperties
}

/**
 * The poster itself: a picture (or a colour when there is none) with the text layers on top.
 * Sizes use the width of the poster, so it looks the same small in a list and large on a page.
 */
export function PosterCanvas({ image, layers, side = 'front', overlay, alt, selectedId, onLayerDown, onCanvasDown, canvasRef, style }: Props) {
  const editing = Boolean(onLayerDown)
  const dark = Math.min(80, Math.max(0, overlay ?? 0))
  return (
    <div
      ref={canvasRef}
      onPointerDown={onCanvasDown ? () => onCanvasDown() : undefined}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2 / 3',
        containerType: 'inline-size',
        overflow: 'hidden',
        background: image ? '#0b1b33' : 'linear-gradient(160deg,#0f2447 0%,#1b3a6b 58%,#c8a24a 130%)',
        userSelect: editing ? 'none' : undefined,
        touchAction: editing ? 'none' : undefined,
        ...style,
      }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={alt ?? ''} draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : null}
      {dark > 0 ? <div style={{ position: 'absolute', inset: 0, background: `rgba(5,15,35,${dark / 100})` }} /> : null}
      {layers
        .filter((l) => l.side === side && l.text.trim())
        .map((l) => (
          <div
            key={l.id}
            onPointerDown={onLayerDown ? (e) => onLayerDown(l.id, e) : undefined}
            style={{
              position: 'absolute',
              left: `${l.x}%`,
              top: `${l.y}%`,
              transform: 'translate(-50%, -50%)',
              width: `${l.w}%`,
              textAlign: l.align,
              color: l.color,
              fontWeight: l.weight,
              fontStyle: l.font === 'script' ? 'italic' : undefined,
              fontFamily: FONT_STACKS[l.font],
              fontSize: `calc(${l.size} * 100cqw / 400)`,
              lineHeight: 1.18,
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
              textShadow: l.shadow ? '0 1px 3px rgba(0,0,0,.65), 0 0 14px rgba(0,0,0,.35)' : undefined,
              cursor: editing ? 'move' : undefined,
              outline: editing && selectedId === l.id ? '2px dashed #f6d97a' : undefined,
              outlineOffset: 3,
            }}
          >
            {l.text}
          </div>
        ))}
    </div>
  )
}
