import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getSiteChrome } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { StitchContactView } from '@/components/contact/StitchContactView'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return buildMetadata({
    locale,
    path: '/contact',
    title: t.contactTitle,
    description: t.contactIntro,
  })
}

/** Contact page styled with the Stitch interactive diplomatic directory design */
export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const { settings } = await getSiteChrome(locale)

  return <StitchContactView locale={locale} t={t} settings={settings} />
}
