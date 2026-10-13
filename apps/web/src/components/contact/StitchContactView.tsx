'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'
import type { SiteSettingsData } from '@/payload-types'

type Props = {
  locale: Locale
  t: Dictionary
  settings: SiteSettingsData
}

const CONTACT_STRINGS: Record<
  Locale,
  {
    protocolDesk: string
    protocolCountries: string
    stockholmStatus: string
    newDelhiStatus: string
    stockholmCet: string
    newDelhiIst: string
    directoryBadge: string
    scandinavianDesk: string
    heroTitlePrefix: string
    heroTitleName: string
    heroTitleSuffix: string
    heroSubtitle: string
    pressKit: string
    courtAccreditation: string
    sponsorshipDeck: string
    formEyebrow: string
    formTitle: string
    categoryLabel: string
    optGeneral: string
    optDiplomatic: string
    optPress: string
    optConcerts: string
    optEditorial: string
    optSponsorship: string
    fullNameLabel: string
    fullNamePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    subjectLabel: string
    subjectPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    attachPlaceholder: string
    browse: string
    attached: string
    submittingBtn: string
    submitBtn: string
    protocolGuarantee: string
    confirmedTitle: string
    confirmedBody: string
    sendAnother: string
    emailCardTag: string
    emailCardLabel: string
    copy: string
    copied: string
    emailCardDesc: string
    phoneCardTag: string
    phoneCardLabel: string
    phoneCardHours: string
    phoneCardDesc: string
    whatsappCardTag: string
    whatsappCardLabel: string
    whatsappLink: string
    whatsappSub: string
    chatLive: string
    locationCardTag: string
    locationCardLabel: string
    locationSub: string
    locationPin: string
    locationAppt: string
    partnersTitle: string
    partner1: string
    partner2: string
    partner3: string
    partner4: string
  }
> = {
  en: {
    protocolDesk: 'Bilateral Protocol Desk:',
    protocolCountries: 'Sweden • Norway • Denmark • Finland • Sovereign Cultural Partnerships',
    stockholmStatus: 'ACTIVE',
    newDelhiStatus: 'OPEN',
    stockholmCet: 'Stockholm (CET):',
    newDelhiIst: 'New Delhi (IST):',
    directoryBadge: 'DIPLOMATIC & MEDIA DIRECTORY',
    scandinavianDesk: 'SCANDINAVIAN DESK',
    heroTitlePrefix: 'Contact',
    heroTitleName: 'Nordic Affairs',
    heroTitleSuffix: 'Media',
    heroSubtitle:
      'Write to the Nordic Affairs Media chancery. We usually reply within a few working days. Serving bilateral diplomatic delegations, accredited press, concert promoters, and cultural partners across Scandinavia & beyond.',
    pressKit: 'Press Kit & Brand Assets (2026)',
    courtAccreditation: 'Royal Court Media Accreditation',
    sponsorshipDeck: 'Nordic Gala Sponsorship Deck',
    formEyebrow: 'Confidential Transmissions',
    formTitle: 'Direct Message Dispatch',
    categoryLabel: 'What is it about?',
    optGeneral: 'General Inquiries & Information',
    optDiplomatic: 'Diplomatic Protocol & Bilateral Delegations',
    optPress: 'Press & Royal Accreditation Coverage',
    optConcerts: 'Concerts, Cultural Galas & Ticketing',
    optEditorial: 'Editorial Submissions & Thought Leadership',
    optSponsorship: 'Brand Partnerships & Global Sponsorships',
    fullNameLabel: 'Full name',
    fullNamePlaceholder: 'e.g. Amb. Carl Lindqvist',
    emailLabel: 'Email address',
    emailPlaceholder: 'name@organization.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Brief nature of your communication',
    messageLabel: 'Message',
    messagePlaceholder:
      'Provide background, deadlines, official delegation details or coverage requests...',
    attachPlaceholder: 'Attach Diplomatic Credentials or Brief (PDF, DOCX up to 15MB)',
    browse: 'Browse',
    attached: 'Attached: ',
    submittingBtn: 'Transmitting Dispatch...',
    submitBtn: 'Transmit Message / Inquire Now',
    protocolGuarantee: 'Guaranteed confidential protocol handling • 24–48h response window',
    confirmedTitle: 'Dispatch Confirmed',
    confirmedBody:
      'Your communication has been formally transmitted to the Nordic Affairs Media Chancery Desk. Protocol officers have logged your transmission ID and will review within 24–48 hours.',
    sendAnother: 'Send Another Transmission',
    emailCardTag: 'Official Press & Editorial',
    emailCardLabel: 'EMAIL ADDRESS',
    copy: 'Copy',
    copied: 'Copied!',
    emailCardDesc: 'For press statements, interviews & accreditation filings.',
    phoneCardTag: 'Stockholm Bureau Direct Line',
    phoneCardLabel: 'PHONE',
    phoneCardHours: 'Mon–Fri 09:00 - 18:00 CET',
    phoneCardDesc: 'Direct diplomatic switchboard & event production management.',
    whatsappCardTag: 'Instant Messenger Concierge',
    whatsappCardLabel: 'WHATSAPP',
    whatsappLink: 'WhatsApp Direct →',
    whatsappSub: 'Live agent available for accredited media',
    chatLive: 'Chat Live',
    locationCardTag: 'Nordic Regional Headquarters',
    locationCardLabel: 'LOCATION',
    locationSub: 'Kungsträdgården 14, 111 47 Stockholm • Diplomatic Quarter Adjacent',
    locationPin: 'Kungsträdgården Bureau • Stockholm',
    locationAppt: 'Visits strictly by diplomatic appointment',
    partnersTitle: 'Collaborating Partners & Bilateral Media Circles',
    partner1: 'SCANDINAVIA PRESS UNION',
    partner2: 'NORDIC GALA ALLIANCE',
    partner3: 'INDO-NORDIC FORUM',
    partner4: 'STOCKHOLM PROTOCOL DESK',
  },
  sv: {
    protocolDesk: 'Bilateral protokollavdelning:',
    protocolCountries: 'Sverige • Norge • Danmark • Finland • Suveräna kultursamarbeten',
    stockholmStatus: 'AKTIV',
    newDelhiStatus: 'ÖPPEN',
    stockholmCet: 'Stockholm (CET):',
    newDelhiIst: 'New Delhi (IST):',
    directoryBadge: 'DIPLOMATISK & MEDIEKATALOG',
    scandinavianDesk: 'SKANDINAVISKA DESKEN',
    heroTitlePrefix: 'Kontakta',
    heroTitleName: 'Nordic Affairs',
    heroTitleSuffix: 'Media',
    heroSubtitle:
      'Skriv till Nordic Affairs Medias kansli. Vi svarar vanligtvis inom några arbetsdagar. Vi betjänar bilaterala diplomatiska delegationer, ackrediterad press, konsertarrangörer och kulturpartners i Skandinavien och internationellt.',
    pressKit: 'Presskit & varumärkesmaterial (2026)',
    courtAccreditation: 'Kungliga hovets medieackreditering',
    sponsorshipDeck: 'Nordic Gala sponsorskapspresentation',
    formEyebrow: 'Konfidentiell överföring',
    formTitle: 'Direktmeddelande till kansliet',
    categoryLabel: 'Vad gäller ärendet?',
    optGeneral: 'Allmänna frågor & information',
    optDiplomatic: 'Diplomatiskt protokoll & bilaterala delegationer',
    optPress: 'Press & kunglig ackrediteringsbevakning',
    optConcerts: 'Konserter, kulturgalor & biljetter',
    optEditorial: 'Redaktionella bidrag & artiklar',
    optSponsorship: 'Varumärkespartnerskap & global sponsring',
    fullNameLabel: 'Fullständigt namn',
    fullNamePlaceholder: 't.ex. Ambassadör Carl Lindqvist',
    emailLabel: 'E-postadress',
    emailPlaceholder: 'namn@organisation.se',
    subjectLabel: 'Ämne',
    subjectPlaceholder: 'Kort beskrivning av ditt ärende',
    messageLabel: 'Meddelande',
    messagePlaceholder:
      'Ange bakgrund, tidsfrister, officiella delegationsdetaljer eller bevakningsönskemål...',
    attachPlaceholder: 'Bifoga diplomatiska intyg eller PM (PDF, DOCX upp till 15MB)',
    browse: 'Bläddra',
    attached: 'Bifogad: ',
    submittingBtn: 'Skickar meddelande...',
    submitBtn: 'Skicka meddelande / Förfrågan',
    protocolGuarantee: 'Garanterad konfidentiell protokollhantering • Svar inom 24–48 timmar',
    confirmedTitle: 'Överföring bekräftad',
    confirmedBody:
      'Ditt meddelande har formellt överförts till Nordic Affairs Medias kansli. Protokollofficerare har registrerat ditt sändnings-ID och granskar det inom 24–48 timmar.',
    sendAnother: 'Skicka ett nytt meddelande',
    emailCardTag: 'Officiell press & redaktion',
    emailCardLabel: 'E-POSTADRESS',
    copy: 'Kopiera',
    copied: 'Kopierat!',
    emailCardDesc: 'För pressmeddelanden, intervjuer och ackrediteringsansökningar.',
    phoneCardTag: 'Stockholmsbyråns direktlinje',
    phoneCardLabel: 'TELEFON',
    phoneCardHours: 'Mån–Fre 09:00 - 18:00 CET',
    phoneCardDesc: 'Direkt diplomatisk växel och hantering av evenemangsproduktion.',
    whatsappCardTag: 'Direktmeddelande / Concierge',
    whatsappCardLabel: 'WHATSAPP',
    whatsappLink: 'WhatsApp direkt →',
    whatsappSub: 'Liveagent tillgänglig för ackrediterad media',
    chatLive: 'Chatta nu',
    locationCardTag: 'Nordiskt regionkontor',
    locationCardLabel: 'PLATS',
    locationSub: 'Kungsträdgården 14, 111 47 Stockholm • Intill diplomatkvarteren',
    locationPin: 'Kungsträdgårdsbyrån • Stockholm',
    locationAppt: 'Besök endast efter diplomatisk tidsbokning',
    partnersTitle: 'Samarbetspartners & bilaterala mediekretsar',
    partner1: 'SKANDINAVISKA PRESSUNIONEN',
    partner2: 'NORDISKA GALAALLIANSEN',
    partner3: 'INDO-NORDISKA FORUMET',
    partner4: 'STOCKHOLMS PROTOKOLLAVDELNING',
  },
  ta: {
    protocolDesk: 'இருதரப்பு நெறிமுறைப் பிரிவு:',
    protocolCountries: 'ஸ்வீடன் • நார்வே • டென்மார்க் • பின்லாந்து • கலாச்சார கூட்டாண்மை',
    stockholmStatus: 'செயலில்',
    newDelhiStatus: 'திறந்துள்ளது',
    stockholmCet: 'ஸ்டாக்ஹோம் (CET):',
    newDelhiIst: 'புது தில்லி (IST):',
    directoryBadge: 'தூதரக & ஊடக கையேடு',
    scandinavianDesk: 'ஸ்காண்டிநேவியன் பிரிவு',
    heroTitlePrefix: 'தொடர்பு கொள்க',
    heroTitleName: 'Nordic Affairs',
    heroTitleSuffix: 'Media',
    heroSubtitle:
      'நார்டிக் அஃபேர்ஸ் மீடியா அலுவலகத்திற்கு எழுதுங்கள். பொதுவாக சில வேலை நாட்களில் பதிலளிக்கிறோம். இருதரப்பு தூதரகக் குழுக்கள், பத்திரிகையாளர்கள் மற்றும் கலை-கலாச்சார அமைப்புகளுக்கு சேவை செய்கிறோம்.',
    pressKit: 'பத்திரிகை தொகுப்பு & பிராண்ட் கோப்புகள் (2026)',
    courtAccreditation: 'அரச நீதிமன்ற ஊடக அங்கீகாரம்',
    sponsorshipDeck: 'நார்டிக் காலா ஆதரவு விவரங்கள்',
    formEyebrow: 'ரகசிய தகவல் தொடர்பு',
    formTitle: 'நேரடி செய்தி அனுப்புக',
    categoryLabel: 'இது எதைப் பற்றியது?',
    optGeneral: 'பொதுவான விசாரணைகள் & தகவல்கள்',
    optDiplomatic: 'தூதரக நெறிமுறை & இருதரப்பு குழுக்கள்',
    optPress: 'பத்திரிகை & அரச அங்கீகார கவரேஜ்',
    optConcerts: 'இசை நிகழ்ச்சிகள், கலாச்சார விழாக்கள் & டிக்கெட்டுகள்',
    optEditorial: 'தலையங்கக் கட்டுரைகள் & சிந்தனைத் தலைமை',
    optSponsorship: 'பிராண்ட் கூட்டாண்மை & உலகளாவிய ஆதரவு',
    fullNameLabel: 'முழுப் பெயர்',
    fullNamePlaceholder: 'எ.கா. தூதர் கார்ல் லிண்ட்க்விஸ்ட்',
    emailLabel: 'மின்னஞ்சல் முகவரி',
    emailPlaceholder: 'name@organization.com',
    subjectLabel: 'பொருள்',
    subjectPlaceholder: 'உங்கள் தொடர்பின் சுருக்கம்',
    messageLabel: 'செய்தி',
    messagePlaceholder:
      'பின்னணி, காலக்கெடு, அதிகாரப்பூர்வ தூதுக்குழு விவரங்கள் அல்லது கவரேஜ் கோரிக்கைகளை குறிப்பிடவும்...',
    attachPlaceholder: 'தூதரக சான்றிதழ்கள் அல்லது ஆவணத்தை இணைக்கவும் (PDF, DOCX 15MB வரை)',
    browse: 'தேடுக',
    attached: 'இணைக்கப்பட்டது: ',
    submittingBtn: 'அனுப்பப்படுகிறது...',
    submitBtn: 'செய்தி அனுப்புக / விசாரிக்க',
    protocolGuarantee: 'உத்தரவாதமான ரகசிய நெறிமுறை கையாளுதல் • 24–48 மணி நேர பதில்',
    confirmedTitle: 'செய்தி அனுப்பப்பட்டது',
    confirmedBody:
      'உங்கள் தகவல் நார்டிக் அஃபேர்ஸ் மீடியா அலுவலகத்திற்கு அனுப்பப்பட்டுள்ளது. நெறிமுறை அதிகாரிகள் 24-48 மணி நேரத்திற்குள் பரிசீலிப்பார்கள்.',
    sendAnother: 'மற்றொரு செய்தி அனுப்புக',
    emailCardTag: 'அதிகாரப்பூர்வ பத்திரிகை & தலையங்கம்',
    emailCardLabel: 'மின்னஞ்சல்',
    copy: 'நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது!',
    emailCardDesc: 'செய்தி அறிக்கைகள், நேர்காணல்கள் & அங்கீகார விண்ணப்பங்களுக்கு.',
    phoneCardTag: 'ஸ்டாக்ஹோம் நேரடி அழைப்பு',
    phoneCardLabel: 'தொலைபேசி',
    phoneCardHours: 'திங்கள்–வெள்ளி 09:00 - 18:00 CET',
    phoneCardDesc: 'நேரடி தூதரக தொடர்பு & நிகழ்ச்சி மேலாண்மை.',
    whatsappCardTag: 'வாட்ஸ்அப் உடனடி உதவி',
    whatsappCardLabel: 'WHATSAPP',
    whatsappLink: 'நேரடி வாட்ஸ்அப் →',
    whatsappSub: 'அங்கீகரிக்கப்பட்ட ஊடகங்களுக்கு நேரடி உதவி',
    chatLive: 'உரையாடு',
    locationCardTag: 'நார்டிக் பிராந்திய தலைமை அலுவலகம்',
    locationCardLabel: 'இடம்',
    locationSub: 'குங்ஸ்ட்ராட்கார்டன் 14, 111 47 ஸ்டாக்ஹோம் • தூதரக பகுதி அருகில்',
    locationPin: 'ஸ்டாக்ஹோம் அலுவலகம்',
    locationAppt: 'முன் அனுமதியுடன் மட்டுமே சந்திப்பு',
    partnersTitle: 'கூட்டாண்மை நிறுவனங்கள் & இருதரப்பு ஊடக வட்டங்கள்',
    partner1: 'ஸ்காண்டிநேவியா பிரஸ் யூனியன்',
    partner2: 'நார்டிக் காலா கூட்டணி',
    partner3: 'இந்தோ-நார்டிக் மன்றம்',
    partner4: 'ஸ்டாக்ஹோம் நெறிமுறை பிரிவு',
  },
  ml: {
    protocolDesk: 'ദ്വികക്ഷി പ്രോട്ടോക്കോൾ വിഭാഗം:',
    protocolCountries: 'സ്വീഡൻ • നോർവേ • ഡെന്മാർക്ക് • ഫിൻലാൻഡ് • സാംസ്കാരിക പങ്കാളിത്തം',
    stockholmStatus: 'സജീവം',
    newDelhiStatus: 'തുറന്നിരിക്കുന്നു',
    stockholmCet: 'സ്റ്റോക്ക്‌ഹോം (CET):',
    newDelhiIst: 'ന്യൂഡൽഹി (IST):',
    directoryBadge: 'നയതന്ത്ര & മാധ്യമ ഡയറക്ടറി',
    scandinavianDesk: 'സ്കാൻഡിനേവിയൻ ഡെസ്ക്',
    heroTitlePrefix: 'ബന്ധപ്പെടുക',
    heroTitleName: 'Nordic Affairs',
    heroTitleSuffix: 'Media',
    heroSubtitle:
      'നോർഡിക് അഫയേഴ്‌സ് മീഡിയ ചാൻസറിയിലേക്ക് എഴുതുക. സാധാരണയായി ഏതാനും പ്രവൃത്തിദിനങ്ങൾക്കുള്ളിൽ മറുപടി നൽകും. സ്കാൻഡിനേവിയയിലുടനീളമുള്ള നയതന്ത്ര പ്രതിനിധികൾക്കും മാധ്യമപ്രവർത്തകർക്കും സാംസ്കാരിക പങ്കാളികൾക്കും സേവനം നൽകുന്നു.',
    pressKit: 'പ്രസ് കിറ്റ് & ബ്രാൻഡ് അസറ്റുകൾ (2026)',
    courtAccreditation: 'റോയൽ കോർട്ട് മീഡിയ അക്രഡിറ്റേഷൻ',
    sponsorshipDeck: 'നോർഡിക് ഗാല സ്പോൺസർഷിപ്പ് ഡെക്ക്',
    formEyebrow: 'രഹസ്യ സന്ദേശവിനിമയം',
    formTitle: 'നേരിട്ടുള്ള സന്ദേശം',
    categoryLabel: 'വിഷയം എന്താണ്?',
    optGeneral: 'പൊതുവായ അന്വേഷണങ്ങളും വിവരങ്ങളും',
    optDiplomatic: 'നയതന്ത്ര പ്രോട്ടോക്കോളും പ്രതിനിധി സംഘങ്ങളും',
    optPress: 'പ്രസ്സും റോയൽ അക്രഡിറ്റേഷൻ കവറേജും',
    optConcerts: 'സംഗീതക്കച്ചേരികൾ, സാംസ്കാരിക ഗാലകൾ & ടിക്കറ്റിംഗ്',
    optEditorial: 'എഡിറ്റോറിയൽ സമർപ്പണങ്ങൾ',
    optSponsorship: 'ബ്രാൻഡ് പങ്കാളിത്തവും ആഗോള സ്പോൺസർഷിപ്പും',
    fullNameLabel: 'പൂർണ്ണമായ പേര്',
    fullNamePlaceholder: 'ഉദാ. അംബാസഡർ കാൾ ലിൻഡ്ക്വിസ്റ്റ്',
    emailLabel: 'ഇമെയിൽ വിലാസം',
    emailPlaceholder: 'name@organization.com',
    subjectLabel: 'വിഷയം',
    subjectPlaceholder: 'സന്ദേശത്തിന്റെ സംഗ്രഹം',
    messageLabel: 'സന്ദേശം',
    messagePlaceholder:
      'വിശദാംശങ്ങൾ, ഔദ്യോഗിക പ്രതിനിധി സംഘ വിവരങ്ങൾ അല്ലെങ്കിൽ കവറേജ് അഭ്യർത്ഥനകൾ നൽകുക...',
    attachPlaceholder: 'നയതന്ത്ര രേഖകൾ അല്ലെങ്കിൽ കുറിപ്പ് അറ്റാച്ചുചെയ്യുക (PDF, DOCX 15MB വരെ)',
    browse: 'ബ്രൗസ്',
    attached: 'അറ്റാച്ചുചെയ്തത്: ',
    submittingBtn: 'അയച്ചുകൊണ്ടിരിക്കുന്നു...',
    submitBtn: 'സന്ദേശം അയക്കുക / അന്വേഷിക്കുക',
    protocolGuarantee: 'രഹസ്യമായ പ്രോട്ടോക്കോൾ കൈകാര്യം ചെയ്യൽ • 24–48 മണിക്കൂറിനുള്ളിൽ മറുപടി',
    confirmedTitle: 'സന്ദേശം അയച്ചു',
    confirmedBody:
      'നിങ്ങളുടെ സന്ദേശം നോർഡിക് അഫയേഴ്‌സ് മീഡിയ ചാൻസറിയിലേക്ക് കൈമാറി. പ്രോട്ടോക്കോൾ ഓഫീസർമാർ 24–48 മണിക്കൂറിനുള്ളിൽ പരിശോധിക്കും.',
    sendAnother: 'മറ്റൊരു സന്ദേശം അയക്കുക',
    emailCardTag: 'ഔദ്യോഗിക പ്രസ്സും എഡിറ്റോറിയലും',
    emailCardLabel: 'ഇമെയിൽ',
    copy: 'പകർപ്പുക',
    copied: 'പകർത്തി!',
    emailCardDesc: 'വാർത്താക്കുറിപ്പുകൾ, അഭിമുഖങ്ങൾ, അക്രഡിറ്റേഷൻ എന്നിവയ്ക്കായി.',
    phoneCardTag: 'സ്റ്റോക്ക്‌ഹോം ഡയറക്ട് ലൈൻ',
    phoneCardLabel: 'ഫോൺ',
    phoneCardHours: 'തിങ്കൾ–വെള്ളി 09:00 - 18:00 CET',
    phoneCardDesc: 'നയതന്ത്ര എക്സ്ചേഞ്ചും ഇവന്റ് പ്രൊഡക്ഷൻ മാനേജ്‌മെന്റും.',
    whatsappCardTag: 'ഇൻസ്റ്റന്റ് മെസഞ്ചർ കോൺസിയർജ്',
    whatsappCardLabel: 'WHATSAPP',
    whatsappLink: 'വാട്സാപ്പ് നേരിട്ട് →',
    whatsappSub: 'അംഗീകൃത മാധ്യമങ്ങൾക്ക് ലൈവ് ഏജന്റ് ലഭ്യമാണ്',
    chatLive: 'ചാറ്റ് ചെയ്യുക',
    locationCardTag: 'നോർഡിക് റീജിയണൽ ഹെഡ്ക്വാർട്ടേഴ്സ്',
    locationCardLabel: 'സ്ഥലം',
    locationSub: 'കുങ്സ്ട്രാഡ്ഗാർഡൻ 14, 111 47 സ്റ്റോക്ക്ഹോം • നയതന്ത്ര മേഖലയ്ക്കടുത്ത്',
    locationPin: 'സ്റ്റോക്ക്‌ഹോം ബ്യൂറോ',
    locationAppt: 'മുൻകൂർ അനുമതിയോടെ മാത്രം സന്ദർശനം',
    partnersTitle: 'പങ്കാളിത്ത സംഘടനകളും ദ്വികക്ഷി മാധ്യമ കൂട്ടായ്മകളും',
    partner1: 'സ്കാൻഡിനേവിയ പ്രസ്സ് യൂണിയൻ',
    partner2: 'നോർഡിക് ഗാല അലയൻസ്',
    partner3: 'ഇന്തോ-നോർഡിക് ഫോറം',
    partner4: 'സ്റ്റോക്ക്‌ഹോം പ്രോട്ടോക്കോൾ ഡെസ്ക്',
  },
}

export function StitchContactView({ locale, t, settings }: Props) {
  const [topic, setTopic] = useState('general')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const str = CONTACT_STRINGS[locale] ?? CONTACT_STRINGS.en

  const emailAddress = settings.contactEmail || 'contact@nordicaffairsmedia.com'
  const phoneNumber = settings.contactPhone || '+46 (0)8 559 21 400'
  const whatsappNum = settings.whatsappNumber || settings.whatsapp || '+46 70 123 4567'
  const locationText = settings.location || 'Stockholm, Kingdom of Sweden'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <div className="relative overflow-hidden bg-[#030712] text-slate-100 min-h-screen">
      {/* Ambient Aurora Glow Underlay */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden aurora-mesh">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] animate-aurora"></div>
        <div className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[150px] animate-aurora" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[130px] animate-aurora" style={{ animationDelay: '-9s' }}></div>
      </div>

      {/* Diplomatic Ticker Banner */}
      <section className="relative z-40 bg-[#070D1F]/90 border-b border-white/5 py-2 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-semibold tracking-wider uppercase text-[11px]">{str.protocolDesk}</span>
            <span className="truncate hidden sm:inline">{str.protocolCountries}</span>
          </div>
          <div className="flex items-center space-x-6 text-[11px] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> {str.stockholmCet} <strong className="text-slate-200">{str.stockholmStatus}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> {str.newDelhiIst} <strong className="text-slate-200">{str.newDelhiStatus}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <main className="relative z-10 pt-10 sm:pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Diplomatic Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {str.directoryBadge}
            <span className="text-emerald-500 font-bold">•</span>
            <span className="text-slate-300">{str.scandinavianDesk}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white mb-6 leading-[1.15]">
            {str.heroTitlePrefix} <span className="gradient-iridescent-text font-serif italic font-normal">{str.heroTitleName}</span> {str.heroTitleSuffix}
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            {str.heroSubtitle}
          </p>

          {/* Fast Access Action Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs">
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5 hover:border-cyan-400/40 hover:text-cyan-300 transition cursor-pointer">
              <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path clipRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" fillRule="evenodd"></path></svg>
              {str.pressKit}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5 hover:border-purple-400/40 hover:text-purple-300 transition cursor-pointer">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
              {str.courtAccreditation}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 flex items-center gap-1.5 hover:border-amber-400/40 hover:text-amber-300 transition cursor-pointer">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              {str.sponsorshipDeck}
            </span>
          </div>
        </div>

        {/* Grid Container (Form + Directory Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Contact Form */}
          <section className="lg:col-span-7 glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-400"></div>
            
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-bold block mb-1">{str.formEyebrow}</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-normal">{str.formTitle}</h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path>
                </svg>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-center animate-fade-in space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-serif text-white font-semibold">{str.confirmedTitle}</h3>
                <p className="text-sm text-emerald-200/90 leading-relaxed max-w-md mx-auto">
                  {str.confirmedBody}
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setMessage(''); setSubject(''); }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition"
                >
                  {str.sendAnother}
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5" htmlFor="topic-select">
                    {str.categoryLabel} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#070D1F]/90 border border-white/15 rounded-xl py-3.5 px-4 pr-10 text-white font-medium focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition cursor-pointer appearance-none"
                      id="topic-select"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      <option value="general">{str.optGeneral}</option>
                      <option value="diplomatic">{str.optDiplomatic}</option>
                      <option value="press">{str.optPress}</option>
                      <option value="concerts">{str.optConcerts}</option>
                      <option value="editorial">{str.optEditorial}</option>
                      <option value="sponsorship">{str.optSponsorship}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Name & Email Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2" htmlFor="full-name">
                      {str.fullNameLabel} <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                      </div>
                      <input
                        className="w-full bg-[#070D1F]/90 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition text-sm"
                        id="full-name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={str.fullNamePlaceholder}
                        required
                        type="text"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2" htmlFor="email-address">
                      {str.emailLabel} <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                      </div>
                      <input
                        className="w-full bg-[#070D1F]/90 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-sm"
                        id="email-address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={str.emailPlaceholder}
                        required
                        type="email"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2" htmlFor="subject">
                    {str.subjectLabel} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </div>
                    <input
                      className="w-full bg-[#070D1F]/90 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition text-sm"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={str.subjectPlaceholder}
                      required
                      type="text"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300" htmlFor="message">
                      {str.messageLabel} <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    className="w-full bg-[#070D1F]/90 border border-white/15 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition text-sm leading-relaxed"
                    id="message"
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={str.messagePlaceholder}
                    required
                    rows={5}
                  ></textarea>
                </div>

                {/* Attachment Drag & Drop Prompt (Optional) */}
                <label className="border border-dashed border-white/15 hover:border-cyan-400/50 rounded-xl p-3.5 bg-white/[0.02] transition flex items-center justify-between text-xs text-slate-400 cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </div>
                    <span>{fileName ? `${str.attached}${fileName}` : str.attachPlaceholder}</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) setFileName(e.target.files[0].name)
                    }}
                  />
                  <span className="text-cyan-400 font-medium hover:underline">{str.browse}</span>
                </label>

                {/* Submission Button */}
                <div className="pt-2">
                  <button
                    className="w-full relative group overflow-hidden rounded-xl p-[1px] font-bold text-white shadow-xl shadow-purple-950/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    type="submit"
                    disabled={submitting}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-500 rounded-xl transition duration-300 group-hover:opacity-100 opacity-90 animate-pulse"></span>
                    <div className="relative px-6 py-4 rounded-[11px] bg-gradient-to-r from-cyan-600 via-purple-600 to-rose-600 group-hover:from-cyan-500 group-hover:via-purple-500 group-hover:to-rose-500 flex items-center justify-center gap-3 transition">
                      <span className="text-sm uppercase tracking-wider font-extrabold text-white">
                        {submitting ? str.submittingBtn : str.submitBtn}
                      </span>
                      <svg className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Protocol Handling Guarantee */}
                <div className="pt-2 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd"></path>
                  </svg>
                  <span>{str.protocolGuarantee}</span>
                </div>
              </form>
            )}
          </section>

          {/* Right Column: Interactive Contact Channels & Directory Cards */}
          <section className="lg:col-span-5 space-y-4">
            {/* CARD 1: EMAIL ADDRESS (Cyan Theme) */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 relative border-l-4 border-l-cyan-400 group border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-300 font-semibold block">{str.emailCardTag}</span>
                    <span className="text-xs text-slate-400">{str.emailCardLabel}</span>
                  </div>
                </div>
                <button
                  className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 transition flex items-center gap-1"
                  onClick={handleCopyEmail}
                  type="button"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                  <span>{copied ? str.copied : str.copy}</span>
                </button>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <a className="text-lg sm:text-xl font-bold font-mono text-white hover:text-cyan-300 transition-colors tracking-tight block break-all" href={`mailto:${emailAddress}`}>
                  {emailAddress}
                </a>
                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {str.emailCardDesc}
                </p>
              </div>
            </div>

            {/* CARD 2: PHONE & HOTLINE (Amethyst Theme) */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 relative border-l-4 border-l-purple-500 group border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider uppercase text-purple-300 font-semibold block">{str.phoneCardTag}</span>
                    <span className="text-xs text-slate-400">{str.phoneCardLabel}</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                  {str.phoneCardHours}
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <a className="text-xl sm:text-2xl font-bold font-mono text-white hover:text-purple-300 transition-colors tracking-wide block" href={`tel:${phoneNumber.replace(/\s+/g, '')}`}>
                  {phoneNumber}
                </a>
                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  {str.phoneCardDesc}
                </p>
              </div>
            </div>

            {/* CARD 3: WHATSAPP DIRECT CONCIERGE (Emerald Theme) */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 relative border-l-4 border-l-emerald-400 group bg-emerald-950/20 border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-300 font-semibold block">{str.whatsappCardTag}</span>
                    <span className="text-xs text-slate-400">{str.whatsappCardLabel}</span>
                  </div>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <a className="text-lg font-bold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5" href={`https://wa.me/${whatsappNum.replace(/\D/g, '')}`} rel="noopener noreferrer" target="_blank">
                    {str.whatsappLink}
                  </a>
                  <p className="text-xs text-slate-400 mt-1">{str.whatsappSub}</p>
                </div>
                <a className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-emerald-500/20" href={`https://wa.me/${whatsappNum.replace(/\D/g, '')}`} rel="noopener noreferrer" target="_blank">
                  {str.chatLive}
                </a>
              </div>
            </div>

            {/* CARD 4: LOCATION (Amber/Sunset Theme) */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 relative border-l-4 border-l-amber-400 group border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300 font-semibold block">{str.locationCardTag}</span>
                    <span className="text-xs text-slate-400">{str.locationCardLabel}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">59.3293° N, 18.0686° E</span>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-normal">{locationText}</h3>
                <p className="text-xs text-slate-300 mt-1">{str.locationSub}</p>
              </div>
              {/* Stylized Map Preview Graphic */}
              <div className="mt-4 rounded-xl overflow-hidden border border-white/10 relative h-28 bg-[#070D1F] flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]"></div>
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-400/40 text-amber-300 text-xs font-semibold backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    {str.locationPin}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{str.locationAppt}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Trust Logos & Accreditations */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">{str.partnersTitle}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center text-center opacity-70">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-serif tracking-widest text-slate-300">{str.partner1}</div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-serif tracking-widest text-slate-300">{str.partner2}</div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-serif tracking-widest text-slate-300">{str.partner3}</div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-serif tracking-widest text-slate-300">{str.partner4}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
