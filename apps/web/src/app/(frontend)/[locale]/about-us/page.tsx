import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  Award,
  Camera,
  Crown,
  Eye,
  Globe,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { isLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/getDictionary'
import { getPayloadClient, isDoc } from '@/lib/payload'
import { getSiteChrome } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { aboutFor } from '@/lib/i18n-content'
import { ScrollEffects } from '@/components/motion/ScrollEffects'
import { StitchAboutView } from '@/components/about/StitchAboutView'
import { whatsappUrl } from '@/lib/nav'

type Props = { params: Promise<{ locale: string }> }

const ICONS: Record<string, LucideIcon> = {
  landmark: Landmark,
  crown: Crown,
  globe: Globe,
  users: Users,
  trophy: Trophy,
  sparkles: Sparkles,
  award: Award,
  eye: Eye,
  camera: Camera,
  'map-pin': MapPin,
}

/** CMS text where the editor filled it in, otherwise the old website's wording. */
async function getAbout(locale: Locale) {
  const payload = await getPayloadClient()
  const g = await payload
    .findGlobal({
      slug: 'about-page',
      locale,
      fallbackLocale: false,
      depth: 1,
      overrideAccess: false,
    })
    .catch(() => null)
  const D = aboutFor(locale)
  const str = (v: unknown, fallback: string) => (typeof v === 'string' && v.trim() ? v : fallback)
  const list = <T,>(v: T[] | null | undefined, fallback: T[]) => (v && v.length ? v : fallback)
  return {
    title: str(g?.title, D.title),
    paragraphs: list(g?.paragraphs?.map((p: any) => p.text ?? '').filter(Boolean), D.paragraphs),
    image: g?.image && isDoc(g.image) ? g.image : null,
    expertiseEyebrow: str(g?.expertiseEyebrow, D.expertiseEyebrow),
    expertiseTitle: str(g?.expertiseTitle, D.expertiseTitle),
    expertise: list(
      g?.expertise
        ?.filter((e: any) => e.label)
        .map((e: any) => ({ label: e.label as string, icon: (e.icon ?? 'globe') as string })),
      D.expertise,
    ),
    eventsTitle: str(g?.eventsTitle, D.eventsTitle),
    eventsIntro: str(g?.eventsIntro, D.eventsIntro),
    events: list(g?.events?.map((e: any) => e.label ?? '').filter(Boolean), D.events),
    ministersTitle: str(g?.ministersTitle, D.ministersTitle),
    ministers: list(g?.ministers?.map((m: any) => m.name ?? '').filter(Boolean), D.ministers),
    ministersNote: str(g?.ministersNote, D.ministersNote),
    pillars: list(
      g?.pillars
        ?.filter((p: any) => p.title)
        .map((p: any) => ({
          title: p.title as string,
          text: p.text ?? '',
          icon: (p.icon ?? 'globe') as string,
        })),
      D.pillars,
    ),
    ctaTitle: str(g?.ctaTitle, D.ctaTitle),
    ctaText: str(g?.ctaText, D.ctaText),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const a = await getAbout(locale)
  return buildMetadata({
    locale,
    path: '/about-us',
    title: getDictionary(locale).navAbout,
    description: a.paragraphs[0],
  })
}

/**
 * About Us — Styled with the Stitch Interactive Design System
 */
export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const { settings } = await getSiteChrome(locale)
  const enquire = whatsappUrl(settings.whatsapp, t.whatsappMessage)

  return (
    <>
      <StitchAboutView locale={locale} t={t} settings={settings} enquireHref={enquire} />
      <ScrollEffects />
    </>
  )
}
