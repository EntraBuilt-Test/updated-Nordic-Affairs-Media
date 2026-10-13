'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/getDictionary'
import { href } from '@/lib/site'

type EventItem = {
  id: string
  title: string
  slug: string
  subtitle?: string
  artist?: string
  artistHighlight?: string
  dateStr: string
  timeStr: string
  venue: string
  city: string
  category: string
  languages: string
  priceFrom: number
  bookedPercent: number
  urgencyText: string
  badgeText: string
  badgeColor: 'rose' | 'amber' | 'emerald' | 'purple' | 'cyan'
  bgGradient: string
  glowClass: string
  description: string
  tags: string[]
}

const FEATURED_EVENTS: EventItem[] = [
  {
    id: 'evt-najim',
    title: 'Najim Arshad: Soul of Malayalam & Bollywood',
    slug: 'najim-arshad-live-stockholm',
    artist: 'NAJIM',
    artistHighlight: 'ARSHAD',
    subtitle: 'Soulful Melodies Live in Concert',
    dateStr: 'Sat, Oct 28, 2026',
    timeStr: '18:30 CET',
    venue: 'Stockholm Waterfront Arena',
    city: 'Stockholm',
    category: 'concert',
    languages: 'malayalam',
    priceFrom: 450,
    bookedPercent: 85,
    urgencyText: 'Selling Fast • 85% Booked',
    badgeText: 'LIVE CONCERT',
    badgeColor: 'rose',
    bgGradient: 'from-slate-950 via-slate-900 to-rose-950/60',
    glowClass: 'hover:shadow-[0_0_35px_-5px_rgba(244,63,94,0.45)]',
    description: 'Experience the enchanting voice behind Kerala state award-winning hits and romantic cinematic blockbusters live with a 12-piece instrumental orchestra.',
    tags: ['Malayalam / Hindi', 'Stockholm', 'Grand Concert'],
  },
  {
    id: 'evt-sumeet',
    title: 'Sumeet Kumar: Kishore Kumar Immortals Tour',
    slug: 'sumeet-kumar-kishore-immortals',
    artist: 'SUMEET',
    artistHighlight: 'KUMAR',
    subtitle: 'Timeless Kishore Da Magic in the Nordics',
    dateStr: 'Sat, Nov 14, 2026',
    timeStr: '19:00 CET',
    venue: 'Konserthuset • Gothenburg',
    city: 'gothenburg',
    category: 'bollywood',
    languages: 'hindi',
    priceFrom: 550,
    bookedPercent: 72,
    urgencyText: 'VIP Balcony Filling Fast',
    badgeText: 'BOLLYWOOD NOSTALGIA',
    badgeColor: 'amber',
    bgGradient: 'from-slate-950 via-slate-900 to-indigo-950/60',
    glowClass: 'hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.45)]',
    description: 'Relive the eternal golden era of Bollywood with Sumeet Kumar, presenting iconic Kishore Kumar masterpieces with original film orchestration in Sweden.',
    tags: ['Hindi Retro', 'Gothenburg', 'VIP Meet & Greet'],
  },
  {
    id: 'evt-sithara',
    title: 'Sithara Krishnakumar Live: Malmö Electro-Folk',
    slug: 'sithara-malabaricus-malmo',
    artist: 'SITHARA &',
    artistHighlight: 'MALABARICUS',
    subtitle: 'Electrifying World Folk-Fusion Tour',
    dateStr: 'Sun, Nov 22, 2026',
    timeStr: '18:00 CET',
    venue: 'Malmö Live Konserthus',
    city: 'malmo',
    category: 'concert',
    languages: 'malayalam',
    priceFrom: 490,
    bookedPercent: 60,
    urgencyText: 'Standard & Student Passes',
    badgeText: 'FOLK ROCK & INDIPOP',
    badgeColor: 'emerald',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950/60',
    glowClass: 'hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.45)]',
    description: 'High-octane energetic fusion combining Kerala traditional rhythms with contemporary blues, rock, and electronic soundscapes in Southern Sweden.',
    tags: ['Multilingual Fusion', 'Malmö', 'World Music'],
  },
  {
    id: 'evt-mgs',
    title: 'M G Sreekumar: The Nordic Symphony Tour',
    slug: 'm-g-sreekumar-live-concert-2026',
    artist: 'M G',
    artistHighlight: 'SREEKUMAR',
    subtitle: 'Symphony of Mohanlal Evergreen Hits',
    dateStr: 'Sat, Dec 05, 2026',
    timeStr: '17:30 CET',
    venue: 'Stockholm City Conference Centre',
    city: 'stockholm',
    category: 'concert',
    languages: 'malayalam',
    priceFrom: 600,
    bookedPercent: 50,
    urgencyText: 'Family Tier & Balcony Seats',
    badgeText: 'GRAND SYMPHONY',
    badgeColor: 'amber',
    bgGradient: 'from-slate-950 via-slate-900 to-amber-950/60',
    glowClass: 'hover:shadow-[0_0_35px_-5px_rgba(245,158,11,0.45)]',
    description: 'Two-time National Award maestro performing legendary timeless hits with a grand Scandinavian European string ensemble.',
    tags: ['Malayalam / Tamil', 'Stockholm', 'Orchestral Special'],
  },
  {
    id: 'evt-shaggy',
    title: 'Shaggy: Mr. Boombastic Scandinavian Tour',
    slug: 'shaggy-live-stockholm',
    artist: 'SHAGGY',
    artistHighlight: 'LIVE',
    subtitle: 'Caribbean Heat Stockholm Arena Takeover',
    dateStr: 'Fri, Dec 18, 2026',
    timeStr: '20:00 CET',
    venue: 'Hovet Arena • Stockholm',
    city: 'stockholm',
    category: 'concert',
    languages: 'english',
    priceFrom: 590,
    bookedPercent: 90,
    urgencyText: 'Standing Pit Almost Sold Out',
    badgeText: 'WORLD TOUR 2026',
    badgeColor: 'purple',
    bgGradient: 'from-slate-950 via-slate-900 to-purple-950/60',
    glowClass: 'hover:shadow-[0_0_35px_-5px_rgba(168,85,247,0.45)]',
    description: 'Global hitmaker Shaggy arrives in Stockholm along with international support acts for a massive high-energy reggae and pop arena spectacular.',
    tags: ['English / Dancehall', 'Stockholm', 'Arena Stadium'],
  },
  {
    id: 'evt-gala',
    title: 'Nordic Indo-Swedish Diplomatic Gala 2027',
    slug: 'nordic-indo-swedish-diplomatic-gala-2027',
    artist: 'INDO-SWEDISH',
    artistHighlight: 'DIPLOMATIC GALA',
    subtitle: 'Classical Fusion, Honors & Grand Banquet',
    dateStr: 'Fri, Jan 15, 2027',
    timeStr: '18:00 CET',
    venue: 'Stockholm City Hall (Stadshuset)',
    city: 'stockholm',
    category: 'gala',
    languages: 'multilingual',
    priceFrom: 1200,
    bookedPercent: 45,
    urgencyText: 'Invitation & Premium Delegate',
    badgeText: 'STATE PROTOCOL & GALA',
    badgeColor: 'cyan',
    bgGradient: 'from-slate-950 via-slate-900 to-cyan-950/60',
    glowClass: 'hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.45)]',
    description: 'Featuring top diplomatic delegations, keynote luminaries, classical Bharatanatyam-Nordic fusion performance and three-course Swedish banquet.',
    tags: ['Multilingual', 'Stockholm', 'Black Tie Gala'],
  },
]

type Props = {
  locale: Locale
  t: Dictionary
}

const EVENTS_STRINGS: Record<
  Locale,
  {
    presents: string
    titlePrefix: string
    titleHighlight: string
    subtitle: string
    ticketPartner: string
    showsAnnounced: string
    category: string
    allEvents: string
    liveConcerts: string
    bollywoodClassic: string
    royalGalas: string
    city: string
    allCities: string
    categoryFilter: string
    allCategories: string
    eventLanguage: string
    allLanguages: string
    showingEvents: string
    from: string
    bookSeats: string
    enquire: string
    resetFilters: string
  }
> = {
  en: {
    presents: 'NORDIC AFFAIRS MEDIA PRESENTS',
    titlePrefix: 'Upcoming',
    titleHighlight: 'Events',
    subtitle:
      'Experience world-class concerts, legendary voices, and diplomatic cultural galas celebrating the vibrant Indian diaspora across Stockholm, Gothenburg, Malmö & Europe.',
    ticketPartner: 'Official Nordic Ticket Partner • Verified Booking',
    showsAnnounced: '18 Shows Announced for 2026-2027',
    category: 'Category:',
    allEvents: 'All Events',
    liveConcerts: 'Live Concerts',
    bollywoodClassic: 'Bollywood Classic',
    royalGalas: 'Royal Galas & Summits',
    city: 'City',
    allCities: 'All Cities',
    categoryFilter: 'Category',
    allCategories: 'All Categories',
    eventLanguage: 'Event Language',
    allLanguages: 'All Languages',
    showingEvents: 'Showing {n} Events',
    from: 'From',
    bookSeats: 'Book Seats',
    enquire: 'Enquire',
    resetFilters: 'Reset filters',
  },
  sv: {
    presents: 'NORDIC AFFAIRS MEDIA PRESENTERAR',
    titlePrefix: 'Kommande',
    titleHighlight: 'Evenemang',
    subtitle:
      'Upplev konserter i världsklass, legendariska röster och diplomatiska kulturgalor som hyllar den sydasiatiska diasporan i Stockholm, Göteborg, Malmö och Europa.',
    ticketPartner: 'Officiell nordisk biljettpartner • Verifierad bokning',
    showsAnnounced: '18 föreställningar 2026-2027',
    category: 'Kategori:',
    allEvents: 'Alla evenemang',
    liveConcerts: 'Livekonserter',
    bollywoodClassic: 'Klassisk Bollywood',
    royalGalas: 'Kungliga galor & toppmöten',
    city: 'Stad',
    allCities: 'Alla städer',
    categoryFilter: 'Kategori',
    allCategories: 'Alla kategorier',
    eventLanguage: 'Evenemangsspråk',
    allLanguages: 'Alla språk',
    showingEvents: 'Visar {n} evenemang',
    from: 'Från',
    bookSeats: 'Boka biljetter',
    enquire: 'Förfrågan',
    resetFilters: 'Återställ filter',
  },
  ta: {
    presents: 'நார்டிக் அஃபேர்ஸ் மீடியா வழங்கும்',
    titlePrefix: 'வரவிருக்கும்',
    titleHighlight: 'நிகழ்வுகள்',
    subtitle:
      'ஸ்டாக்ஹோம், கோதன்பர்க், மால்மோ மற்றும் ஐரோப்பா முழுவதும் உலகத்தரம் வாய்ந்த இசை நிகழ்ச்சிகள் மற்றும் கலாச்சார விழாக்களை அனுபவியுங்கள்.',
    ticketPartner: 'அதிகாரப்பூர்வ நோர்டிக் டிக்கெட் கூட்டாளி • சரிபார்க்கப்பட்ட முன்பதிவு',
    showsAnnounced: '2026-2027 ஆண்டிற்கான 18 நிகழ்ச்சிகள்',
    category: 'பிரிவு:',
    allEvents: 'அனைத்து நிகழ்வுகள்',
    liveConcerts: 'நேரடி இசை நிகழ்ச்சிகள்',
    bollywoodClassic: 'பாலிவுட் கிளாசிக்',
    royalGalas: 'அரச விழாக்கள் & மாநாடுகள்',
    city: 'நகரம்',
    allCities: 'அனைத்து நகரங்கள்',
    categoryFilter: 'பிரிவு',
    allCategories: 'அனைத்து பிரிவுகள்',
    eventLanguage: 'நிகழ்ச்சி மொழி',
    allLanguages: 'அனைத்து மொழிகள்',
    showingEvents: '{n} நிகழ்வுகள் காட்டப்படுகின்றன',
    from: 'இருந்து',
    bookSeats: 'முன்பதிவு செய்க',
    enquire: 'விசாரிக்க',
    resetFilters: 'வடிகட்டிகளை மீட்டமைக்க',
  },
  ml: {
    presents: 'നോർഡിക് അഫയേഴ്‌സ് മീഡിയ അവതരിപ്പിക്കുന്നു',
    titlePrefix: 'വരാനിരിക്കുന്ന',
    titleHighlight: 'ഇവന്റുകൾ',
    subtitle:
      'സ്റ്റോക്ക്‌ഹോം, ഗോഥെൻബർഗ്, മാൽമോ എന്നിവിടങ്ങളിലെ ലോകോത്തര സംഗീതക്കച്ചേരികളും സാംസ്കാരിക ഗാലകളും ആസ്വദിക്കൂ.',
    ticketPartner: 'ഔദ്യോഗിക നോർഡിക് ടിക്കറ്റ് പങ്കാളി • പരിശോധിച്ച ബുക്കിംഗ്',
    showsAnnounced: '2026-2027 കാലയളവിൽ 18 ഷോകൾ',
    category: 'വിഭാഗം:',
    allEvents: 'എല്ലാ ഇവന്റുകളും',
    liveConcerts: 'ലൈവ് കച്ചേരികൾ',
    bollywoodClassic: 'ബോളിവുഡ് ക്ലാസിക്',
    royalGalas: 'റോയൽ ഗാലകളും ഉച്ചകോടികളും',
    city: 'നഗരം',
    allCities: 'എല്ലാ നഗരങ്ങളും',
    categoryFilter: 'വിഭാഗം',
    allCategories: 'എല്ലാ വിഭാഗങ്ങളും',
    eventLanguage: 'ഭാഷ',
    allLanguages: 'എല്ലാ ഭാഷകളും',
    showingEvents: '{n} ഇവന്റുകൾ കാണിക്കുന്നു',
    from: 'മുതൽ',
    bookSeats: 'ടിക്കറ്റ് ബുക്ക് ചെയ്യുക',
    enquire: 'അന്വേഷിക്കുക',
    resetFilters: 'ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്യുക',
  },
}

export function StitchEventsView({ locale, t }: Props) {
  const [selectedPill, setSelectedPill] = useState('all')
  const [filterCity, setFilterCity] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterLanguage, setFilterLanguage] = useState('all')
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null)
  const [selectedTier, setSelectedTier] = useState('standard')
  const [ticketQuantity, setTicketQuantity] = useState(2)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const str = EVENTS_STRINGS[locale] ?? EVENTS_STRINGS.en

  const filteredEvents = useMemo(() => {
    return FEATURED_EVENTS.filter((e) => {
      if (selectedPill === 'concerts' && e.category !== 'concert') return false
      if (selectedPill === 'bollywood' && e.category !== 'bollywood') return false
      if (selectedPill === 'gala' && e.category !== 'gala') return false
      if (filterCity !== 'all' && e.city.toLowerCase() !== filterCity.toLowerCase()) return false
      if (filterCategory !== 'all' && e.category !== filterCategory) return false
      if (filterLanguage !== 'all' && e.languages !== filterLanguage) return false
      return true
    })
  }, [selectedPill, filterCity, filterCategory, filterLanguage])

  const handleResetFilters = () => {
    setSelectedPill('all')
    setFilterCity('all')
    setFilterCategory('all')
    setFilterLanguage('all')
  }

  const tierPrices: Record<string, number> = {
    vip: 1.5,
    standard: 1.0,
    balcony: 0.8,
  }

  return (
    <div className="relative overflow-hidden bg-[#040812] text-slate-100 min-h-screen">
      {/* Ambient Aurora Lighting Mesh */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="aurora-orb w-[650px] h-[650px] bg-gradient-to-tr from-cyan-600/30 to-blue-600/20 top-[-10%] left-[-10%] animate-blob-float"></div>
        <div className="aurora-orb w-[750px] h-[750px] bg-gradient-to-br from-fuchsia-600/25 to-pink-500/20 top-[15%] right-[-15%] animate-blob-pulse"></div>
        <div className="aurora-orb w-[550px] h-[550px] bg-gradient-to-r from-amber-500/20 to-rose-600/20 top-[50%] left-[25%] animate-blob-float" style={{ animationDelay: '-4s' }}></div>
        <div className="aurora-orb w-[800px] h-[800px] bg-gradient-to-tr from-emerald-500/15 to-teal-700/20 bottom-[-10%] right-[10%] animate-blob-pulse" style={{ animationDelay: '-6s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 lg:pt-16 lg:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-6 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-mono uppercase tracking-[0.25em] mb-4 shadow-sm">
              <svg className="w-3.5 h-3.5 text-amber-400 animate-spin" fill="currentColor" style={{ animationDuration: '9s' }} viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"></path>
              </svg>
              {str.presents}
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] font-serif">
              {str.titlePrefix} <span className="gradient-text-aurora">{str.titleHighlight}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              {str.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:flex-col lg:items-end">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-ping"></span>
              <span className="text-xs font-semibold text-white tracking-wide">
                <span className="text-amber-400 font-bold font-mono text-sm">{str.showsAnnounced}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{str.ticketPartner}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="glass-panel p-4 sm:p-6 rounded-3xl shadow-2xl relative overflow-hidden bg-[#0e1b31]/75 backdrop-blur-xl border border-white/10">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400/60 via-rose-500/30 to-cyan-400/60"></div>
          
          {/* Category Quick Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">{str.category}</span>
            {[
              { id: 'all', label: `${str.allEvents} (${FEATURED_EVENTS.length})` },
              { id: 'concerts', label: str.liveConcerts },
              { id: 'bollywood', label: str.bollywoodClassic },
              { id: 'gala', label: str.royalGalas },
            ].map((pill) => {
              const active = selectedPill === pill.id
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedPill(pill.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    active
                      ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-md'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {pill.label}
                </button>
              )
            })}
          </div>

          {/* Form Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-3 border-t border-white/5 items-end">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5" htmlFor="f-city">
                {str.city}
              </label>
              <select
                id="f-city"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full bg-[#0a1628]/90 border border-white/15 text-white rounded-xl py-2.5 px-3.5 text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">{str.allCities}</option>
                <option value="stockholm">Stockholm (Sweden)</option>
                <option value="gothenburg">Gothenburg (Sweden)</option>
                <option value="malmo">Malmö (Sweden)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5" htmlFor="f-category">
                {str.categoryFilter}
              </label>
              <select
                id="f-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-[#0a1628]/90 border border-white/15 text-white rounded-xl py-2.5 px-3.5 text-sm focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">{str.allCategories}</option>
                <option value="concert">Concerts & Music</option>
                <option value="bollywood">Bollywood & Retro</option>
                <option value="gala">Diplomatic & Cultural Galas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5" htmlFor="f-lang">
                {str.eventLanguage}
              </label>
              <select
                id="f-lang"
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="w-full bg-[#0a1628]/90 border border-white/15 text-white rounded-xl py-2.5 px-3.5 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">{str.allLanguages}</option>
                <option value="malayalam">Malayalam</option>
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="multilingual">Multilingual / Nordic</option>
              </select>
            </div>

            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-2">
              <button
                type="button"
                onClick={() => {}}
                className="shine-hover flex-1 h-[42px] px-5 bg-gradient-to-r from-amber-400 to-rose-500 hover:opacity-95 text-white font-mono font-bold text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                {str.showingEvents.replace('{n}', String(filteredEvents.length))}
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-[42px] px-3.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl border border-white/10 transition-colors"
                title={str.resetFilters}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => {
            return (
              <article
                key={event.id}
                className={`glass-card rounded-3xl overflow-hidden group hover:-translate-y-2 ${event.glowClass} transition-all duration-300 flex flex-col border border-white/10 bg-[#0a1628]/85 backdrop-blur-md`}
              >
                {/* Event Poster Header */}
                <div className={`relative h-80 overflow-hidden bg-gradient-to-t ${event.bgGradient}`}>
                  <div className="absolute inset-0 bg-radial from-rose-500/10 via-amber-500/5 to-transparent mix-blend-screen pointer-events-none"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-center z-10">
                    <div className="w-full flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-white/10 text-slate-100 border border-white/15 backdrop-blur-md">
                        {event.badgeText}
                      </span>
                      <span className="p-2 rounded-full bg-black/40 text-amber-400 backdrop-blur-md">
                        ★
                      </span>
                    </div>

                    <div className="my-auto transform group-hover:scale-105 transition-transform duration-500">
                      <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-widest text-amber-300 font-semibold mb-1 bg-amber-400/10 border border-amber-400/20">
                        {event.subtitle}
                      </div>
                      <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-white tracking-wider uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        {event.artist}<br />
                        <span className="gradient-text-gold">{event.artistHighlight}</span>
                      </h2>
                    </div>

                    <div className="w-full flex justify-center items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]"></span>
                      <span className="text-[11px] text-amber-200/80 font-mono">{event.venue}</span>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/80 to-transparent z-10 pointer-events-none"></div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-[#0a1628]/95">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-300 mb-3">
                      <div className="flex items-center gap-1.5 text-rose-500 font-semibold">
                        <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                        <span className="text-white">{event.dateStr}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-[11px]">
                        {event.timeStr}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {event.title}
                    </h3>
                    
                    <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="mt-3.5 flex flex-wrap gap-1.5 text-[11px]">
                      {event.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA Bar */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-rose-400 font-semibold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                        {event.urgencyText}
                      </span>
                      <span className="text-slate-400 font-mono">
                        {str.from} <strong className="text-white text-sm">{event.priceFrom} SEK</strong>
                      </span>
                    </div>

                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full" style={{ width: `${event.bookedPercent}%` }}></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => {
                          setBookingEvent(event)
                          setBookingConfirmed(false)
                        }}
                        className="shine-hover py-2.5 px-3 bg-gradient-to-r from-amber-400 to-rose-500 text-white font-mono font-bold text-xs uppercase tracking-wider text-center rounded-xl shadow-md transition-all hover:brightness-110"
                      >
                        {str.bookSeats}
                      </button>
                      <Link
                        href={href(locale, `/contact`)}
                        className="py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold rounded-xl transition-colors text-center flex items-center justify-center"
                      >
                        {str.enquire}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom Pagination / Stats Banner */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-white font-bold">{filteredEvents.length} of {FEATURED_EVENTS.length}</span> upcoming performances in Scandinavia
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={href(locale, '/contact')}
              className="text-xs text-amber-300 font-semibold hover:underline"
            >
              Organizing an event? Contact Protocol Desk →
            </Link>
          </div>
        </div>
      </main>

      {/* Ticket Booking Modal */}
      {bookingEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0a1628] border border-white/15 p-6 sm:p-8 shadow-2xl text-left">
            <button
              onClick={() => setBookingEvent(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl p-1"
            >
              ✕
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-3xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-serif text-white font-semibold">Seat Reservation Initiated</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your request for <strong>{ticketQuantity} seats</strong> to <strong>{bookingEvent.title}</strong> has been assigned reservation reference <strong>#NAM-{(Math.random()*80000+10000).toFixed(0)}</strong>.
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => setBookingEvent(null)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-bold text-xs uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                    Reserve Seats
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-bold mt-1">
                    {bookingEvent.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {bookingEvent.venue} • {bookingEvent.dateStr}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300">
                    Select Seating Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'vip', name: 'VIP Parterre', mult: 1.5 },
                      { id: 'standard', name: 'Standard Hall', mult: 1.0 },
                      { id: 'balcony', name: 'Balcony Tier', mult: 0.8 },
                    ].map((tier) => {
                      const active = selectedTier === tier.id
                      const price = Math.round(bookingEvent.priceFrom * tier.mult)
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedTier(tier.id)}
                          className={`p-3 rounded-xl border text-center transition ${
                            active
                              ? 'bg-amber-500/20 border-amber-400 text-white'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-xs font-semibold">{tier.name}</div>
                          <div className="text-xs font-mono text-amber-300 mt-1">{price} SEK</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between border-y border-white/10 py-4">
                  <span className="text-sm font-semibold text-slate-200">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                    >
                      -
                    </button>
                    <span className="font-mono text-base font-bold text-white w-6 text-center">
                      {ticketQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 text-white font-bold flex items-center justify-center hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Total Price</span>
                  <span className="text-xl font-mono font-bold text-amber-400">
                    {Math.round(bookingEvent.priceFrom * (tierPrices[selectedTier] || 1) * ticketQuantity)} SEK
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setBookingConfirmed(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition hover:brightness-110"
                >
                  Confirm & Reserve Seats
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
