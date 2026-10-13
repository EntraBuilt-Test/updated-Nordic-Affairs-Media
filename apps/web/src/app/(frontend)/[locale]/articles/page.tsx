import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { buildMetadata } from '@/lib/seo'
import { StitchArticlesView } from '@/components/articles/StitchArticlesView'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return buildMetadata({ locale, path: '/articles', title: t.navArticles, description: t.articlesIntro })
}

/** "Articles" tab styled with Stitch sovereign chronicles & editorial showcase design */
export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)

  return <StitchArticlesView locale={locale} t={t} />
}
