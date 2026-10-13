'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { activeKey, type MainLink } from '@/lib/nav'
import { href } from '@/lib/site'

type Props = {
  locale: Locale
  links: MainLink[]
  galleries: { title: string; href: string }[]
  allGalleriesLabel: string
  menuLabel: string
}

/** Desktop menu. The current tab is underlined; Gallery opens a list of all galleries. */
export function PrimaryNav({ locale, links, galleries, allGalleriesLabel, menuLabel }: Props) {
  const current = activeKey(usePathname() ?? `/${locale}`, locale)
  const item =
    'inline-flex h-12 items-center gap-1 px-4 font-ui text-caption font-semibold uppercase tracking-[0.08em] text-ink hover:text-fjord'
  const underline = 'underline decoration-brass decoration-2 underline-offset-[10px]'

  return (
    <nav aria-label={menuLabel}>
      <ul className="flex flex-wrap items-center justify-center">
        {links.map((l) => {
          const isCurrent = current === l.key
          if (!l.dropdown) {
            return (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`${item} ${isCurrent ? underline : ''}`}
                >
                  {l.label}
                </Link>
              </li>
            )
          }
          return (
            <li key={l.key} className="group relative">
              <Link
                href={l.href}
                aria-current={isCurrent ? 'page' : undefined}
                aria-haspopup={galleries.length > 0 ? 'true' : undefined}
                className={`${item} ${isCurrent ? underline : ''}`}
              >
                {l.label}
                {galleries.length > 0 ? (
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:rotate-180"
                  />
                ) : null}
              </Link>
              {/* ==================== STITCH LUXURY VISUAL MEGA MENU ==================== */}
              <div className="invisible absolute top-full left-1/2 z-50 w-[840px] lg:w-[920px] -translate-x-[45%] lg:-translate-x-[42%] border border-[#c6a258]/35 bg-[#091523]/98 backdrop-blur-2xl opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(198,162,88,0.15)] rounded-lg p-6 normal-case text-left transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                {/* Glowing top accent line */}
                <div className="absolute -top-[1.5px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#c6a258]/80 to-transparent"></div>

                <div className="grid grid-cols-12 gap-6 pb-4">
                  {/* COLUMN 1: Diplomatic & Summits */}
                  <div className="col-span-4 space-y-3">
                    <div className="flex items-center space-x-2 border-b border-slate-700/60 pb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c6a258]"></span>
                      <h3 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#c6a258]">
                        Diplomatic & Summits
                      </h3>
                    </div>
                    <ul className="space-y-2.5 text-[12.5px]">
                      <li>
                        <Link
                          href={href(locale, '/gallery')}
                          className="group block p-2 rounded hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/60"
                        >
                          <span className="block font-semibold text-slate-100 group-hover:text-white transition-colors leading-snug">
                            Prime Minister Narendra Modi in Gothenburg
                          </span>
                          <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-[#c6a258]/15 text-[#e3be75] rounded border border-[#c6a258]/30">
                            Diplomatic • 54 Photos
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={href(locale, '/gallery')}
                          className="group block p-2 rounded hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/60"
                        >
                          <span className="block font-medium text-slate-200 group-hover:text-white transition-colors leading-snug">
                            Iceland President Sweden Visit
                          </span>
                          <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-sky-950/70 text-sky-300 rounded border border-sky-800/50">
                            Bilateral Summit
                          </span>
                        </Link>
                      </li>
                      {galleries.slice(0, 2).map((g) => (
                        <li key={g.href}>
                          <Link
                            href={g.href}
                            className="group block px-2 py-1.5 rounded hover:bg-slate-800/40 text-slate-300 hover:text-white transition-colors"
                          >
                            <span className="text-[12px] leading-snug block">{g.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* COLUMN 2: Royal & Ceremonial */}
                  <div className="col-span-4 space-y-3 border-l border-slate-800/80 pl-5">
                    <div className="flex items-center space-x-2 border-b border-slate-700/60 pb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c6a258]"></span>
                      <h3 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#c6a258]">
                        Royal & Ceremonial
                      </h3>
                    </div>
                    <ul className="space-y-2.5 text-[12.5px]">
                      <li>
                        <Link
                          href={href(locale, '/gallery')}
                          className="group block p-2 rounded hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/60"
                        >
                          <span className="block font-semibold text-slate-100 group-hover:text-white transition-colors leading-snug">
                            King & Queen’s Golden Wedding Jubilee
                          </span>
                          <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] tracking-wider uppercase font-medium bg-amber-950/60 text-[#e3be75] rounded border border-amber-800/40">
                            Royal Court
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={href(locale, '/gallery')}
                          className="group block px-2 py-1.5 rounded hover:bg-slate-800/40 text-slate-300 hover:text-white transition-colors"
                        >
                          <span className="text-[12px] leading-snug block">King’s 80th Birthday Celebrations</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={href(locale, '/gallery')}
                          className="group block px-2 py-1.5 rounded hover:bg-slate-800/40 text-slate-300 hover:text-white transition-colors"
                        >
                          <span className="text-[12px] leading-snug block">Marcus Wandt - European Space Agency Reception</span>
                        </Link>
                      </li>
                      {galleries.slice(2, 4).map((g) => (
                        <li key={g.href}>
                          <Link
                            href={g.href}
                            className="group block px-2 py-1.5 rounded hover:bg-slate-800/40 text-slate-300 hover:text-white transition-colors"
                          >
                            <span className="text-[12px] leading-snug block">{g.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* COLUMN 3: High-Impact Visual Feature */}
                  <div className="col-span-4 space-y-3 border-l border-slate-800/80 pl-5">
                    <div className="flex items-center space-x-2 border-b border-slate-700/60 pb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <h3 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                        Featured Capture
                      </h3>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-[#c6a258]/30 bg-[#0d1c2d] p-3 space-y-2 group">
                      <div className="relative h-28 w-full rounded overflow-hidden bg-slate-900">
                        <img
                          src="https://www.nordicaffairsmedia.com/wp-content/uploads/2026/05/40.PM-Modi-Gothenburg-17-18-May-26.JPG-1-e1780562495137.jpeg"
                          alt="Diplomatic State Capture"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-[#091523]/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-[#e3be75] border border-[#c6a258]/30">
                          RAW 8K
                        </div>
                      </div>
                      <p className="font-semibold text-slate-100 text-[12px] leading-tight">
                        State Bilateral Summit Series
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Official state photojournalism documented across Sweden & the Nordic region.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar in Mega Menu */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11.5px]">
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-1.5 text-[#e3be75] hover:text-white font-semibold transition-colors"
                  >
                    <span>{allGalleriesLabel}</span>
                    <span>→</span>
                  </Link>
                  <span className="text-slate-400 text-[11px] font-mono">
                    NORDIC SOVEREIGN ARCHIVES • STOCKHOLM
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
