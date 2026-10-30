import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { href } from '@/lib/site'
import { posterCover, posterImageUrl, posterTextLayers, type PosterDoc } from '@/lib/posters'
import { PosterCanvas } from '@/components/newsletter/PosterCanvas'
import { MediaImage } from '@/components/ui/MediaImage'
import { EmptyState, PageHeader } from '@/components/ui/primitives'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return buildMetadata({ locale, path: '/newsletters', title: t.navNewsletter, description: t.newslettersIntro })
}

export default async function NewslettersPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)

  const payload = await getPayloadClient()
  const result = await payload
    .find({
      collection: 'newsletter-posters',
      where: { published: { equals: true } },
      sort: '-updatedAt',
      limit: 60,
      depth: 1,
      overrideAccess: true,
    })
    .catch(() => null)
  const posters = (result?.docs ?? []) as unknown as PosterDoc[]

  return (
    <div className="container-max pb-20">
      <PageHeader title={t.navNewsletter} intro={t.newslettersIntro} />
      {posters.length === 0 ? (
        <div className="mt-12">
          <EmptyState title={t.newslettersEmptyTitle} body={t.newslettersEmptyBody} />
        </div>
      ) : (
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posters.map((p) => (
            <li key={p.id}>
              <Link href={href(locale, `/newsletters/${p.slug}`)} className="group block">
                {p.mode !== 'manual' && posterTextLayers(p).length > 0 ? (
                  <div className="overflow-hidden rounded-lg">
                    <PosterCanvas image={posterImageUrl(posterCover(p))} layers={posterTextLayers(p)} overlay={p.overlay} alt={p.title} />
                  </div>
                ) : (
                  <MediaImage media={posterCover(p)} ratio="2/3" sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" fit="contain" fallbackLabel={p.title} />
                )}
                <h2 className="mt-3 font-display text-h3 text-ink group-hover:underline">{p.title}</h2>
                {p.summary ? <p className="mt-1 line-clamp-2 text-slate">{p.summary}</p> : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
