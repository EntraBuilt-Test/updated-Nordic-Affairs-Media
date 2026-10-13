'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/getDictionary'
import { href } from '@/lib/site'

type ArticleItem = {
  id: string
  title: string
  slug: string
  category: string
  categorySlug: string
  locationDate: string
  dateColor: string
  readTime: string
  readTimeBorder: string
  summary: string
  author: string
  palette: 'cyan' | 'purple' | 'gold' | 'emerald' | 'rose'
  badgeBg: string
  borderHover: string
  gradient: string
  faIcon: string
  iconColor: string
  accentColor: string
  image?: string
}

const FEATURED_ARTICLE = {
  id: 'featured-1',
  title: 'Vidhu Prathap: Live in Stockholm — Bridging Melody Across Continents',
  slug: 'vidhu-prathap-live-in-stockholm',
  category: 'CONCERTS & CULTURE',
  categorySlug: 'culture',
  venue: 'Stockholm Waterfront Arena',
  dateRead: '16 October 2026 • 6 min read',
  summary:
    'An exclusive report from the royal Swedish capital as acclaimed playback singer Vidhu Prathap arrives for the landmark Nordic tour, harmonizing South Asian musical heritage with Scandinavia’s vibrant diaspora.',
  quote:
    '“Music transcends territorial frontiers; bringing this symphony to the Stockholm skyline is a sovereign cultural milestone.”',
  author: 'By Nordic Affairs Media',
  role: 'Editorial Directorate',
  imageUrl:
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
}

const ARTICLES_LIST: ArticleItem[] = [
  {
    id: 'art-1',
    title: 'PM Modi & Royal Court of Sweden: Bilateral Accords & Polar Star Honor',
    slug: 'pm-modi-royal-court-bilateral-accords',
    category: 'Diplomatic',
    categorySlug: 'diplomatic',
    locationDate: 'Stockholm Royal Palace • 12 Oct 2026',
    dateColor: 'text-cyan-400',
    readTime: '8 min read',
    readTimeBorder: 'text-cyan-200 border-cyan-500/30',
    summary:
      'An unprecedented diplomatic session addressing high-tech green steel, Arctic energy pacts, and cultural exchange agreements at the Swedish Royal Palace.',
    author: 'Dr. Astrid Lindholm',
    palette: 'cyan',
    badgeBg: 'bg-cyan-400 text-slate-950',
    borderHover: 'border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.25)]',
    gradient: 'from-cyan-900/60 via-slate-900/80 to-blue-950/90',
    faIcon: 'fa-landmark',
    iconColor: 'text-cyan-400/25',
    accentColor: 'text-cyan-300',
  },
  {
    id: 'art-2',
    title: 'The Kishore Kumar Legacy in Gothenburg: Sumeet Kumar’s Arena Tour',
    slug: 'kishore-kumar-legacy-sumeet-tour',
    category: 'Music Tour',
    categorySlug: 'culture',
    locationDate: 'Gothenburg Scandinavium • 10 Oct 2026',
    dateColor: 'text-purple-300',
    readTime: '5 min read',
    readTimeBorder: 'text-purple-200 border-purple-500/30',
    summary:
      'Over four thousand fans gathered at the iconic arena to relive timeless vintage melodies arranged with the Gothenburg Symphony ensemble.',
    author: 'Rajeshwari Nair',
    palette: 'purple',
    badgeBg: 'bg-purple-400 text-slate-950',
    borderHover: 'border-purple-500/20 hover:border-purple-400/50 hover:shadow-[0_20px_40px_-15px_rgba(192,132,252,0.3)]',
    gradient: 'from-purple-900/60 via-slate-900/80 to-pink-950/90',
    faIcon: 'fa-music',
    iconColor: 'text-purple-400/25',
    accentColor: 'text-purple-300',
  },
  {
    id: 'art-3',
    title: 'King’s Golden Jubilee: Inside the Palace Chambers with Accredited Press',
    slug: 'kings-golden-jubilee-palace-chambers',
    category: 'Royal Court',
    categorySlug: 'royal',
    locationDate: 'Drottningholm Palace • 08 Oct 2026',
    dateColor: 'text-amber-300',
    readTime: '7 min read',
    readTimeBorder: 'text-amber-200 border-amber-500/30',
    summary:
      'Nordic Affairs Media was granted exclusive access to royal archive chambers, uncovering historical diplomatic gifts exchanged between Nordic monarchs and Indian royals.',
    author: 'Johan Wallenberg',
    palette: 'gold',
    badgeBg: 'bg-gradient-to-r from-amber-300 to-yellow-500 text-slate-950 font-semibold',
    borderHover: 'border-amber-500/30 hover:border-amber-400/60 hover:shadow-[0_20px_40px_-15px_rgba(230,195,135,0.35)]',
    gradient: 'from-amber-950/60 via-slate-900/80 to-yellow-950/90',
    faIcon: 'fa-crown',
    iconColor: 'text-amber-400/30',
    accentColor: 'text-amber-300',
  },
  {
    id: 'art-4',
    title: 'Sithara Krishnakumar & Malabaricus: Electrifying Nordic Folk-Fusion',
    slug: 'sithara-malabaricus-nordic-latitudes',
    category: 'Folk-Fusion',
    categorySlug: 'culture',
    locationDate: 'Malmö Live Arena • 04 Oct 2026',
    dateColor: 'text-emerald-400',
    readTime: '4 min read',
    readTimeBorder: 'text-emerald-200 border-emerald-500/30',
    summary:
      'A spellbinding collaboration bringing the raw rhythms of Kerala’s folk heritage into harmony with traditional Scandinavian nyckelharpa virtuosos.',
    author: 'Vivek Varma',
    palette: 'emerald',
    badgeBg: 'bg-emerald-400 text-slate-950',
    borderHover: 'border-emerald-500/25 hover:border-emerald-400/50 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]',
    gradient: 'from-emerald-950/70 via-slate-900/80 to-teal-950/80',
    faIcon: 'fa-compact-disc',
    iconColor: 'text-emerald-400/25',
    accentColor: 'text-emerald-300',
  },
  {
    id: 'art-5',
    title: 'Sweden vs Italy: The International Lens on Historic Fixtures',
    slug: 'sweden-vs-italy-international-lens',
    category: 'Sports & World',
    categorySlug: 'sports',
    locationDate: 'Friends Arena • 01 Oct 2026',
    dateColor: 'text-rose-400',
    readTime: '5 min read',
    readTimeBorder: 'text-rose-200 border-rose-500/30',
    summary:
      'Tactical nuances, geopolitical fan culture, and how Nordic football diplomacy continues to build bilateral bridges across the European continent.',
    author: 'Mikael Sjöberg',
    palette: 'rose',
    badgeBg: 'bg-rose-400 text-slate-950',
    borderHover: 'border-rose-500/25 hover:border-rose-400/50 hover:shadow-[0_20px_40px_-15px_rgba(251,113,133,0.3)]',
    gradient: 'from-rose-950/70 via-slate-900/80 to-amber-950/80',
    faIcon: 'fa-trophy',
    iconColor: 'text-rose-400/25',
    accentColor: 'text-rose-300',
  },
  {
    id: 'art-6',
    title: 'The Indian Diaspora in Scandinavia: Tech Pioneers & Cultural Architects',
    slug: 'indian-diaspora-scandinavia-pioneers',
    category: 'Investigation',
    categorySlug: 'investigation',
    locationDate: 'Oslo & Stockholm • 28 Sept 2026',
    dateColor: 'text-cyan-300',
    readTime: '11 min read',
    readTimeBorder: 'text-cyan-200 border-cyan-500/30',
    summary:
      'A comprehensive survey into the 80,000+ professionals reshaping fintech in Kista Science City and promoting South Asian classical arts in northern latitudes.',
    author: 'NAM Special Bureau',
    palette: 'cyan',
    badgeBg: 'bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-950',
    borderHover: 'border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.25)]',
    gradient: 'from-indigo-950/70 via-slate-900/80 to-cyan-950/80',
    faIcon: 'fa-magnifying-glass-chart',
    iconColor: 'text-cyan-400/25',
    accentColor: 'text-cyan-300',
  },
]

type Props = {
  locale: Locale
  t: Dictionary
}

const ARTICLES_STRINGS: Record<
  Locale,
  {
    gazetteLabel: string
    title: string
    subtitle: string
    allArticles: string
    diplomatic: string
    culture: string
    royal: string
    sports: string
    investigation: string
    searchPlaceholder: string
    sortLatest: string
    sortPopular: string
    sortArchive: string
    featuredDispatch: string
    readStory: string
    latestHeading: string
    latestSubheading: string
    displaying: string
    ofArticles: string
    by: string
    read: string
    vipDispatch: string
    subscribeHeading: string
    subscribeText: string
    subscribePlaceholder: string
    requestClearance: string
    subscribedMsg: string
  }
> = {
  en: {
    gazetteLabel: '★ The Royal & Diplomatic Gazette',
    title: 'Articles & Sovereign Chronicles',
    subtitle:
      'In-depth reportage, exclusive interviews, bilateral summit archives, and cultural dispatches from Nordic Affairs Media — connecting Scandinavia and the Indian Subcontinent.',
    allArticles: 'All Articles',
    diplomatic: 'Diplomatic Dispatches',
    culture: 'Concerts & Culture',
    royal: 'Royal & Statecraft',
    sports: 'Sports & Arena',
    investigation: 'Special Investigations',
    searchPlaceholder: 'Search reports...',
    sortLatest: 'Latest Dispatches',
    sortPopular: 'Most Read Sovereign',
    sortArchive: 'Archived Chronicles',
    featuredDispatch: 'Featured Dispatch',
    readStory: 'Read Full Story',
    latestHeading: 'Latest Sovereign Dispatches & Reportage',
    latestSubheading: 'Accredited Journalism • Nordic-Indian Bilateral Relations',
    displaying: 'Displaying',
    ofArticles: 'articles',
    by: 'By',
    read: 'Read',
    vipDispatch: 'Sovereign Diplomatic Dispatch',
    subscribeHeading: 'Receive Diplomatic Dispatches Directly',
    subscribeText:
      'Subscribe to the Nordic Affairs Media weekly editorial briefing covering ministerial visits, sovereign cultural exchanges, and accredited royal ceremonies.',
    subscribePlaceholder: 'Enter your diplomatic or press email...',
    requestClearance: 'Request Clearance',
    subscribedMsg:
      '✓ Protocol subscription verified. You will receive the next intelligence briefing on Thursday.',
  },
  sv: {
    gazetteLabel: '★ Kungliga & diplomatiska tidskriften',
    title: 'Artiklar & suveräna krönikor',
    subtitle:
      'Djupgående reportage, exklusiva intervjuer, bilaterala toppmötesarkiv och kulturrapporter från Nordic Affairs Media – som förenar Skandinavien och den indiska subkontinenten.',
    allArticles: 'Alla artiklar',
    diplomatic: 'Diplomatiska rapporter',
    culture: 'Konserter & kultur',
    royal: 'Kungligt & statskonst',
    sports: 'Sport & arena',
    investigation: 'Specialgranskningar',
    searchPlaceholder: 'Sök rapporter...',
    sortLatest: 'Senaste rapporterna',
    sortPopular: 'Mest lästa',
    sortArchive: 'Arkiverade krönikor',
    featuredDispatch: 'Utvald rapport',
    readStory: 'Läs hela artikeln',
    latestHeading: 'Senaste suveräna rapporter & journalistik',
    latestSubheading: 'Ackrediterad journalistik • Nordisk-indiska bilaterala relationer',
    displaying: 'Visar',
    ofArticles: 'artiklar',
    by: 'Av',
    read: 'Läs',
    vipDispatch: 'Suverän diplomatisk rapport',
    subscribeHeading: 'Få diplomatiska rapporter direkt i inkorgen',
    subscribeText:
      'Prenumerera på Nordic Affairs Medias veckovisa redaktionella sammanfattning med ministerbesök, kulturutbyten och kungliga ceremonier.',
    subscribePlaceholder: 'Ange din diplomatiska eller press-e-post...',
    requestClearance: 'Begär godkännande',
    subscribedMsg: '✓ Protokollprenumeration bekräftad. Du får nästa briefing på torsdag.',
  },
  ta: {
    gazetteLabel: '★ அரச & தூதரக செய்தித்தாள்',
    title: 'கட்டுரைகள் & வரலாற்று பதிவுகள்',
    subtitle:
      'ஸ்காண்டிநேவியாவையும் இந்திய துணைக் கண்டத்தையும் இணைக்கும் விரிவான அறிக்கைகள், பிரத்யேக நேர்காணல்கள் மற்றும் கலாச்சார செய்திகள்.',
    allArticles: 'அனைத்து கட்டுரைகள்',
    diplomatic: 'தூதரக அறிக்கைகள்',
    culture: 'இசை & கலாச்சாரம்',
    royal: 'அரசு & இறையாண்மை',
    sports: 'விளையாட்டு & அரங்கம்',
    investigation: 'சிறப்பு ஆய்வுகள்',
    searchPlaceholder: 'அறிக்கைகளைத் தேடுக...',
    sortLatest: 'சமீபத்திய கட்டுரைகள்',
    sortPopular: 'அதிகம் வாசிக்கப்பட்டவை',
    sortArchive: 'பழைய காப்பகம்',
    featuredDispatch: 'சிறப்பு கட்டுரை',
    readStory: 'முழுக் கட்டுரையை வாசிக்க',
    latestHeading: 'சமீபத்திய இறையாண்மை அறிக்கைகள்',
    latestSubheading: 'அங்கீகரிக்கப்பட்ட இதழியல் • நோர்டிக்-இந்திய இருதரப்பு உறவுகள்',
    displaying: 'காட்டப்படுகிறது',
    ofArticles: 'கட்டுரைகள்',
    by: 'எழுதியவர்',
    read: 'வாசிக்க',
    vipDispatch: 'சிறப்பு தூதரக செய்தி',
    subscribeHeading: 'தூதரக அறிக்கைகளை நேரடியாகப் பெறுங்கள்',
    subscribeText:
      'அமைச்சர்களின் வருகைகள், கலாச்சார பரிமாற்றங்கள் மற்றும் அரச விழாக்கள் குறித்த வாராந்திர செய்திமடலைப் பெறுங்கள்.',
    subscribePlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்...',
    requestClearance: 'அனுமதி கோருக',
    subscribedMsg: '✓ பதிவு உறுதி செய்யப்பட்டது. அடுத்த அறிக்கை வியாழக்கிழமை வரும்.',
  },
  ml: {
    gazetteLabel: '★ റോയൽ & ഡിപ്ലോമാറ്റിക് ഗസറ്റ്',
    title: 'ലേഖനങ്ങളും ചരിത്ര രേഖകളും',
    subtitle:
      'സ്കാൻഡിനേവിയയെയും ഇന്ത്യൻ ഉപഭൂഖണ്ഡത്തെയും ബന്ധിപ്പിക്കുന്ന സമഗ്രമായ റിപ്പോർട്ടുകൾ, പ്രത്യേക അഭിമുഖങ്ങൾ, ഉച്ചകോടി വിവരങ്ങൾ.',
    allArticles: 'എല്ലാ ലേഖനങ്ങളും',
    diplomatic: 'നയതന്ത്ര റിപ്പോർട്ടുകൾ',
    culture: 'സംഗീതവും സംസ്കാരവും',
    royal: 'റോയൽ & സ്റ്റേറ്റ് ക്രാഫ്റ്റ്',
    sports: 'കായികരംഗം',
    investigation: 'പ്രത്യേക അന്വേഷണങ്ങൾ',
    searchPlaceholder: 'റിപ്പോർട്ടുകൾ തിരയുക...',
    sortLatest: 'ഏറ്റവും പുതിയവ',
    sortPopular: 'കൂടുതൽ വായിക്കപ്പെട്ടവ',
    sortArchive: 'ആർക്കൈവ് ചെയ്തവ',
    featuredDispatch: 'പ്രത്യേക റിപ്പോർട്ട്',
    readStory: 'മുഴുവൻ വായിക്കുക',
    latestHeading: 'ഏറ്റവും പുതിയ നയതന്ത്ര റിപ്പോർട്ടുകൾ',
    latestSubheading: 'അംഗീകൃത പത്രപ്രവർത്തനം • നോർഡിക്-ഇന്ത്യൻ ദ്വികക്ഷി ബന്ധങ്ങൾ',
    displaying: 'കാണിക്കുന്നത്',
    ofArticles: 'ലേഖനങ്ങൾ',
    by: 'എഴുതിയത്',
    read: 'വായിക്കുക',
    vipDispatch: 'നയതന്ത്ര അറിയിപ്പ്',
    subscribeHeading: 'നയതന്ത്ര റിപ്പോർട്ടുകൾ നേരിട്ട് ലഭിക്കുക',
    subscribeText:
      'മന്ത്രിതല സന്ദർശനങ്ങൾ, സാംസ്കാരിക വിനിമയങ്ങൾ, റോയൽ ചടങ്ങുകൾ എന്നിവ ഉൾപ്പെടുന്ന പ്രതിവാര ബ്രീഫിംഗ് സബ്‌സ്‌ക്രൈബ് ചെയ്യുക.',
    subscribePlaceholder: 'നിങ്ങളുടെ ഇമെയിൽ നൽകുക...',
    requestClearance: 'അനുമതി തേടുക',
    subscribedMsg: '✓ സബ്‌സ്‌ക്രിപ്ഷൻ സ്ഥിരീകരിച്ചു. അടുത്ത ബ്രീഫിംഗ് വ്യാഴാഴ്ച അയക്കും.',
  },
}

export function StitchArticlesView({ locale, t }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('latest')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  const str = ARTICLES_STRINGS[locale] ?? ARTICLES_STRINGS.en

  const filteredArticles = useMemo(() => {
    return ARTICLES_LIST.filter((item) => {
      if (selectedCategory !== 'all' && item.categorySlug !== selectedCategory) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchSummary = item.summary.toLowerCase().includes(q)
        const matchAuthor = item.author.toLowerCase().includes(q)
        if (!matchTitle && !matchSummary && !matchAuthor) return false
      }
      return true
    })
  }, [selectedCategory, searchQuery])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubscribed(true)
  }

  const categoryOptions = [
    { id: 'all', label: str.allArticles, icon: 'fa-sparkles', color: 'text-white' },
    { id: 'diplomatic', label: str.diplomatic, icon: 'fa-landmark-flag', color: 'text-cyan-400' },
    { id: 'culture', label: str.culture, icon: 'fa-guitar', color: 'text-purple-400' },
    { id: 'royal', label: str.royal, icon: 'fa-chess-king', color: 'text-amber-400' },
    { id: 'sports', label: str.sports, icon: 'fa-shield-halved', color: 'text-emerald-400' },
    { id: 'investigation', label: str.investigation, icon: 'fa-feather', color: 'text-rose-400' },
  ]

  return (
    <div className="relative overflow-hidden bg-[#050a10] text-slate-100 min-h-screen">
      {/* Ambient Iridescent Background Mesh & Lighting */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[130px] ambient-glow-ball"></div>
        <div className="absolute top-10 -right-40 w-[700px] h-[700px] rounded-full bg-purple-600/15 blur-[150px] ambient-glow-ball" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[160px] ambient-glow-ball" style={{ animationDelay: '-6s' }}></div>
        <div className="absolute -bottom-20 left-10 w-[550px] h-[550px] rounded-full bg-emerald-500/10 blur-[140px]"></div>
        <div className="absolute -bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-rose-500/10 blur-[160px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035]"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28">
        {/* Hero Header & Sovereign Title Section */}
        <section className="mb-14 relative">
          <div className="flex items-center space-x-3 mb-4">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#e6c387]"></span>
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-[#e6c387] flex items-center gap-2">
              {str.gazetteLabel}
            </span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#e6c387]"></span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.03] mb-5 font-normal">
            <span className="text-glow-aurora">{str.title}</span>
          </h1>

          <p className="max-w-3xl text-lg sm:text-xl text-slate-300 font-light leading-relaxed mb-8">
            {str.subtitle}
          </p>

          <div className="w-full h-[1px] bg-gradient-to-r from-cyan-500/70 via-purple-500/60 to-amber-500/30 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.4)]"></div>
        </section>

        {/* Filter and Search Tooling Suite */}
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-2">
            {/* Glowing Category Pills with Stitch Icons */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {categoryOptions.map((cat) => {
                const active = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-2 ${
                      active
                        ? 'text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-[0_0_18px_rgba(6,182,212,0.45)]'
                        : 'text-slate-300 border border-white/10 bg-slate-900/60 hover:bg-white/10'
                    }`}
                  >
                    <i className={`fa-solid ${cat.icon} text-[11px] ${active ? 'text-white' : cat.color}`}></i>
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Search Bar & Sorting */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={str.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
                <i className="fa-solid fa-search absolute left-3 top-2.5 text-slate-400 text-xs"></i>
              </div>

              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-slate-900/90 border border-white/10 text-xs text-slate-300 font-medium py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="latest">{str.sortLatest}</option>
                  <option value="popular">{str.sortPopular}</option>
                  <option value="archive">{str.sortArchive}</option>
                </select>
                <i className="fa-solid fa-chevron-down absolute right-3 top-3 text-[10px] text-slate-400 pointer-events-none"></i>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Hero Showcase Article */}
        <section className="mb-16">
          <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-cyan-500/50 via-purple-600/60 to-amber-500/40 shadow-2xl shadow-cyan-950/40 group overflow-hidden">
            <article className="card-glass rounded-[23px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch bg-slate-950/90">
              {/* Media Container */}
              <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] overflow-hidden bg-slate-950 flex items-center justify-center">
                <img
                  src={FEATURED_ARTICLE.imageUrl}
                  alt={FEATURED_ARTICLE.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 lg:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/40 to-slate-950 hidden lg:block"></div>

                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-cyan-500/90 text-slate-950 shadow-lg backdrop-blur-md">
                    <i className="fa-solid fa-bolt-lightning mr-1.5 text-[10px]"></i> {str.featuredDispatch}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-slate-900/80 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
                    {FEATURED_ARTICLE.venue}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 flex items-center space-x-2 text-xs font-mono text-cyan-300 bg-slate-950/70 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                  <i className="fa-regular fa-clock mr-1.5 text-cyan-400"></i>
                  <span>{FEATURED_ARTICLE.dateRead}</span>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase">
                      {FEATURED_ARTICLE.category}
                    </span>
                    <span className="text-amber-400 text-xs">★</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl text-white font-normal leading-snug group-hover:text-cyan-200 transition-colors mb-4">
                    {FEATURED_ARTICLE.title}
                  </h2>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {FEATURED_ARTICLE.summary}
                  </p>

                  <div className="border-l-2 border-amber-400 pl-4 my-4 py-1 italic font-serif text-amber-200/90 text-base bg-amber-500/5 rounded-r-lg">
                    {FEATURED_ARTICLE.quote}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-[1.5px]">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-xs font-serif font-bold text-white">
                        NAM
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{FEATURED_ARTICLE.author}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{FEATURED_ARTICLE.role}</p>
                    </div>
                  </div>

                  <Link
                    href={href(locale, `/contact`)}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] hover:brightness-110 transition-all"
                  >
                    <span>{str.readStory}</span>
                    <i className="fa-solid fa-arrow-right text-[11px]"></i>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Section Header for Grid */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-normal">
              {str.latestHeading}
            </h3>
            <p className="text-xs text-slate-400 tracking-wider font-mono uppercase mt-1">
              {str.latestSubheading}
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-cyan-400">
            <span>
              {str.displaying} {filteredArticles.length} {str.ofArticles}
            </span>
          </div>
        </div>

        {/* Editorial Multi-Colored Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => {
            return (
              <article
                key={art.id}
                className={`card-glass rounded-2xl overflow-hidden card-hover-fx flex flex-col justify-between group bg-[#0b1422]/80 backdrop-blur-md border border-white/10 ${art.borderHover}`}
              >
                <div>
                  {/* Visual Header with Stitch Chromatic Gradient & Sovereign Symbol */}
                  <div className="relative h-56 overflow-hidden bg-slate-950">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${art.gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}
                    >
                      <i className={`fa-solid ${art.faIcon} text-6xl ${art.iconColor}`}></i>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md ${art.badgeBg}`}
                      >
                        {art.category}
                      </span>
                    </div>

                    {/* Read Time */}
                    <div
                      className={`absolute bottom-3 right-3 text-[11px] font-mono bg-slate-900/80 px-2.5 py-1 rounded backdrop-blur-sm border ${art.readTimeBorder}`}
                    >
                      <i className="fa-regular fa-clock mr-1"></i> {art.readTime}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className={`text-[11px] font-mono uppercase tracking-wider mb-2 ${art.dateColor}`}>
                      {art.locationDate}
                    </div>
                    <h4 className="font-serif text-2xl text-white font-medium leading-snug group-hover:text-cyan-300 transition-colors mb-3">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light mb-4">
                      {art.summary}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium">{str.by} {art.author}</span>
                  <Link
                    href={href(locale, `/contact`)}
                    className={`${art.accentColor} font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1`}
                  >
                    <span>{str.read}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                  </Link>
                </div>
              </article>
            )
          })}
        </section>

        {/* Newsletter VIP Dispatch Subscription Card */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0c182b] via-[#08101d] to-[#040812] border border-white/15 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold block mb-2">
              {str.vipDispatch}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-4">
              {str.subscribeHeading}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
              {str.subscribeText}
            </p>

            {newsletterSubscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
                {str.subscribedMsg}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={str.subscribePlaceholder}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition"
                >
                  {str.requestClearance}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
