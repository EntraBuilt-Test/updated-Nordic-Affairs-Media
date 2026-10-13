import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { buildMetadata } from '@/lib/seo'
import { routes } from '@/lib/site'
import { StitchEventsView } from '@/components/events/StitchEventsView'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return buildMetadata({ locale, path: routes.events(), title: t.events })
}

/** Events listing styled with the Stitch interactive stage and concert design */
export default async function EventsPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)

  return <StitchEventsView locale={locale} t={t} />
}
