import { MediaImage } from '@/components/ui/MediaImage'
import { posterCover, safeLink, type PosterDoc } from '@/lib/posters'

/**
 * The designed poster page: header, big picture, numbers, quote, boxes and a button.
 * All words come from the admin fields, so spelling is always right (AI pictures cannot write text).
 */
const NAVY = 'bg-[#0f2447]'
const GOLD = '#c8a24a'

export function PosterDesign({ poster }: { poster: PosterDoc }) {
  const cover = posterCover(poster)
  const stats = (poster.stats ?? []).filter((s) => s.value)
  const features = (poster.features ?? []).filter((f) => f.title)
  const button = safeLink(poster.dButtonUrl) ?? safeLink(poster.ctaUrl)
  const buttonLabel = poster.dButtonLabel || poster.ctaLabel || 'Open'

  return (
    <div className="overflow-hidden rounded-2xl bg-[#fbf7ee] shadow-[0_20px_60px_-20px_rgba(15,36,71,0.35)]">
      {/* Top: words on the left, picture on the right */}
      <div className="grid md:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
          <p className="font-serif text-3xl font-bold tracking-tight text-[#0f2447] md:text-4xl">{poster.brandName || 'Nordic Affairs Media'}</p>
          {poster.brandTagline ? <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#0f2447]/70">{poster.brandTagline}</p> : null}
          {poster.greeting ? <p className="mt-8 font-serif text-2xl font-semibold text-[#0f2447]">{poster.greeting}</p> : null}
          {poster.intro ? <p className="mt-3 whitespace-pre-line font-serif text-lg leading-relaxed text-[#1b2433]">{poster.intro}</p> : null}
          {poster.highlight ? (
            <p className="mt-4">
              <span className="inline-block rounded-md px-3 py-1 font-serif text-lg font-bold text-[#0f2447]" style={{ background: '#f6d97a' }}>
                {poster.highlight}
              </span>
            </p>
          ) : null}
        </div>
        <div className="relative min-h-[320px] md:min-h-full">
          <div className="absolute inset-0">
            <MediaImage media={cover} ratio="2/3" sizes="(min-width:768px) 40vw, 95vw" priority className="!aspect-auto h-full w-full" fallbackLabel={poster.title} />
          </div>
        </div>
      </div>

      {/* Numbers */}
      {stats.length > 0 ? (
        <ul className="grid grid-cols-2 gap-y-6 border-y border-[#0f2447]/10 bg-white/70 px-4 py-7 md:grid-cols-4">
          {stats.map((s, n) => (
            <li key={s.id ?? n} className="text-center md:border-l md:border-[#0f2447]/10 md:first:border-l-0">
              <p className="font-serif text-3xl font-bold text-[#0f2447] md:text-4xl">{s.value}</p>
              {s.label ? <p className="mx-auto mt-1 max-w-[12rem] text-sm text-[#44506a]">{s.label}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}

      {/* Quote */}
      {poster.quoteText ? (
        <div className="px-4 py-8 md:px-10">
          <figure className="relative rounded-2xl bg-[#f6efdc] px-6 py-7 md:px-10">
            <span aria-hidden="true" className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full font-serif text-3xl leading-none text-[#0f2447]" style={{ background: GOLD }}>
              &ldquo;
            </span>
            <blockquote className="font-serif text-lg italic leading-relaxed text-[#1b2433] md:text-xl">&ldquo;{poster.quoteText}&rdquo;</blockquote>
            {poster.quoteName || poster.quoteRole ? (
              <figcaption className="mt-4 text-sm text-[#44506a]">
                {poster.quoteName ? <strong className="text-[#0f2447]">{poster.quoteName}</strong> : null}
                {poster.quoteName && poster.quoteRole ? ' · ' : ''}
                {poster.quoteRole}
              </figcaption>
            ) : null}
          </figure>
        </div>
      ) : null}

      {/* Boxes */}
      {features.length > 0 ? (
        <div className="px-4 pb-8 md:px-10">
          {poster.featuresTitle ? (
            <h2 className="text-center font-serif text-2xl font-bold text-[#0f2447] md:text-3xl">
              {poster.featuresTitle}
              <span className="mx-auto mt-2 block h-1 w-16 rounded-full" style={{ background: GOLD }} />
            </h2>
          ) : null}
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, n) => (
              <li key={f.id ?? n} className="rounded-xl border border-[#0f2447]/10 bg-white px-4 py-5 text-center shadow-sm">
                <span aria-hidden="true" className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg font-bold text-[#0f2447]" style={{ background: '#f6d97a' }}>
                  {n + 1}
                </span>
                <p className="font-serif text-base font-bold text-[#0f2447]">{f.title}</p>
                {f.text ? <p className="mt-1 text-sm text-[#44506a]">{f.text}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Closing band */}
      {poster.closingLine || poster.closingScript || button ? (
        <div className={`${NAVY} px-6 py-9 text-white md:px-10`}>
          {poster.closingLine ? <p className="font-serif text-2xl md:text-3xl">{poster.closingLine}</p> : null}
          {poster.closingScript ? (
            <p className="mt-1 font-serif text-2xl italic md:text-3xl" style={{ color: '#f6d97a' }}>
              {poster.closingScript}
            </p>
          ) : null}
          {button ? (
            <a
              href={button}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-7 py-3 font-ui text-base font-bold text-[#0f2447] transition hover:brightness-95"
              style={{ background: '#f6d97a' }}
            >
              {buttonLabel} <span aria-hidden="true">→</span>
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
