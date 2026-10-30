import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getPayloadClient, isDoc } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { href, siteUrl } from '@/lib/site'
import { posterCover, safeLink, type PosterDoc } from '@/lib/posters'
import { FlipPoster } from '@/components/newsletter/FlipPoster'
import { PosterDesign } from '@/components/newsletter/PosterDesign'
import { MediaImage } from '@/components/ui/MediaImage'
import { ShareLinks } from '@/components/editorial/ShareLinks'

export const revalidate = 300

type Props = { params: Promise<{ locale: string; slug: string }> }

async function getPoster(slug: string): Promise<PosterDoc | null> {
  const payload = await getPayloadClient()
  const result = await payload
    .find({
      collection: 'newsletter-posters',
      where: { and: [{ slug: { equals: slug } }, { published: { equals: true } }] },
      limit: 1,
      depth: 2,
      overrideAccess: true,
    })
    .catch(() => null)
  return ((result?.docs?.[0] as unknown as PosterDoc | undefined) ?? null)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const poster = await getPoster(slug)
  if (!poster) return {}
  return buildMetadata({
    locale,
    path: `/newsletters/${slug}`,
    title: poster.title,
    description: poster.summary,
    image: posterCover(poster),
  })
}

const mediaUrl = (m: unknown) => {
  if (!isDoc(m as never)) return null
  const d = m as { url?: string | null; sizes?: { feature?: { url?: string | null } } }
  return d.sizes?.feature?.url || d.url || null
}

export default async function PosterPage({ params }: Props) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const poster = await getPoster(slug)
  if (!poster) notFound()

  const cover = posterCover(poster)
  const cta = safeLink(poster.ctaUrl)
  const extra = (poster.images ?? []).slice(1).filter((i) => isDoc(i.image as never))
  const when = poster.eventDate
    ? new Date(poster.eventDate).toLocaleString(locale, { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Stockholm' })
    : null

  const designed = poster.mode !== 'template' && poster.designed !== false && Boolean(poster.intro || poster.stats?.length || poster.features?.length || poster.quoteText)

  if (designed) {
    return (
      <article className="container-max pb-20 pt-10 md:pt-16">
        <Link href={href(locale, '/newsletters')} className="font-ui text-caption font-semibold text-fjord hover:underline">
          ← {t.navNewsletter}
        </Link>
        <h1 className="sr-only">{poster.title}</h1>
        <div className="mx-auto mt-6 max-w-4xl">
          <PosterDesign poster={poster} />
          <div className="mt-8">
            <ShareLinks url={`${siteUrl}/${locale}/newsletters/${slug}`} title={poster.title} label={t.share} />
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="container-max pb-20 pt-10 md:pt-16">
      <Link href={href(locale, '/newsletters')} className="font-ui text-caption font-semibold text-fjord hover:underline">
        ← {t.navNewsletter}
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          {poster.mode === 'template' && mediaUrl(poster.frontImage) ? (
            <FlipPoster
              front={mediaUrl(poster.frontImage)!}
              back={mediaUrl(poster.backImage)}
              alt={poster.title}
              headline={poster.frontHeadline}
              backTitle={poster.backTitle}
              backText={poster.backText}
              accent={poster.accentColor}
              animation={poster.animation}
            />
          ) : (
            <MediaImage media={cover} ratio="2/3" sizes="(min-width:768px) 45vw, 95vw" priority fit="contain" fallbackLabel={poster.title} />
          )}
        </div>
        <div>
          <h1 className="text-h1">{poster.title}</h1>
          {when || poster.venueName ? (
            <p className="mt-3 font-ui text-meta text-slate">{[when, poster.venueName].filter(Boolean).join(' · ')}</p>
          ) : null}
          {poster.summary ? <p className="mt-6 whitespace-pre-line font-text text-deck text-charcoal">{poster.summary}</p> : null}
          {cta ? (
            <a href={cta} className="mt-8 inline-block rounded-sm bg-fjord px-6 py-3 font-ui text-caption font-semibold text-white hover:bg-fjord-deep">
              {poster.ctaLabel || 'Open'}
            </a>
          ) : null}
          <div className="mt-8">
            <ShareLinks url={`${siteUrl}/${locale}/newsletters/${slug}`} title={poster.title} label={t.share} />
          </div>
        </div>
      </div>
      {extra.length > 0 ? (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {extra.map((i, n) => (
            <li key={i.id ?? n}>
              <MediaImage media={i.image} ratio="4/3" sizes="(min-width:1024px) 30vw, 90vw" />
              {i.caption ? <p className="mt-1 text-caption text-slate">{i.caption}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
