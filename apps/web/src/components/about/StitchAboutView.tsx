'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries/en'
import type { SiteSettingsData } from '@/payload-types'
import { href } from '@/lib/site'

type Props = {
  locale: Locale
  t: Dictionary
  settings: SiteSettingsData
  enquireHref: string
}

const ABOUT_STRINGS: Record<
  Locale,
  {
    tagAbout: string
    tagJournalism: string
    headlineMain: string
    headlineSub: string
    chanceryAccredited: string
    chanceryDesc: string
    protocolTelemetry: string
    systemStatus: string
    inspect: string
    operatingJurisdictions: string
    archiveStandard: string
    editorialCompass: string
    compassTitle: string
    precisionTitle: string
    precisionDesc: string
    discretionTitle: string
    discretionDesc: string
    enlistTeam: string
    statYears: string
    statYearsDesc: string
    statMissions: string
    statMissionsDesc: string
    statGlobal: string
    statGlobalDesc: string
    statConfidentiality: string
    statConfidentialityDesc: string
    areasMastery: string
    capabilitiesTitle: string
    capabilitiesSub: string
    pillar1Title: string
    pillar1Desc: string
    pillar2Title: string
    pillar2Desc: string
    pillar3Title: string
    pillar3Desc: string
    pillar4Title: string
    pillar4Desc: string
    exploreArchive: string
    officialInquiry: string
    technicalIntegrity: string
    chancerySpecs: string
    tabMission: string
    tabAccreditations: string
    tabGear: string
    geoTag: string
    geoTitle: string
    geoDesc: string
    ctaTitle: string
    ctaDesc: string
    ctaWhatsapp: string
    ctaDispatch: string
  }
> = {
  en: {
    tagAbout: 'ABOUT US',
    tagJournalism: 'DIPLOMATIC JOURNALISM',
    headlineMain: 'CAPTURING HISTORY THROUGH EXCELLENCE',
    headlineSub:
      'Nordic Affairs Media is a Sweden-based media organization specializing in high-level official visits, diplomatic events, government engagements, royal ceremonies, and international sports coverage across Sweden and worldwide.',
    chanceryAccredited: 'ROYAL CHANCERY ACCREDITED',
    chanceryDesc:
      'Authorized documentation unit holding active sovereign press protocols for the Royal Court of Sweden and diplomatic missions globally.',
    protocolTelemetry: 'PROTOCOL TELEMETRY:',
    systemStatus: 'SYSTEM STATUS: NOMINAL • SECURE WIRE ACTIVE',
    inspect: 'Inspect',
    operatingJurisdictions:
      'OPERATING JURISDICTIONS: STOCKHOLM • GENEVA • LONDON • NEW DELHI • COPENHAGEN',
    archiveStandard: 'ENCRYPTED MEDIA ARCHIVE ISO 27001',
    editorialCompass: 'THE EDITORIAL COMPASS',
    compassTitle: 'A Sovereign Eye on Statecraft & Grand Ceremony',
    precisionTitle: 'Uncompromising Visual Precision',
    precisionDesc:
      'With a strong commitment to professionalism, accuracy, and visual storytelling, we provide world-class photography and videography services for prestigious national and international events.',
    discretionTitle: 'Discretion & Global Gravitas',
    discretionDesc:
      'Our team works with precision, discretion, and dedication to document moments of historical, cultural, and global significance through powerful visual media.',
    enlistTeam: 'ENLIST DELEGATION TEAM',
    officialInquiry: 'OFFICIAL INQUIRY',
    statYears: 'YEARS OF SERVICE',
    statYearsDesc:
      'Continuous diplomatic engagement and sovereign herald services across Europe and Asia.',
    statMissions: 'STATE MISSIONS',
    statMissionsDesc:
      'Royal visits, Head-of-State bilateral conclaves, and high-security chancery meetings documented.',
    statGlobal: 'GLOBAL REACH',
    statGlobalDesc:
      'Countries navigated with diplomatic clearance, multi-lingual liaisons, and secure satellite links.',
    statConfidentiality: 'CONFIDENTIALITY',
    statConfidentialityDesc:
      'Protocol compliance, secure archival custody, and uncompromised VIP discretion rating.',
    areasMastery: 'AREAS OF MASTERY',
    capabilitiesTitle: 'Core Diplomatic & Media Capabilities',
    capabilitiesSub:
      'Engineered for rapid deployment with institutional accreditation across ministerial summits, historic royal milestones, and global spectator arenas.',
    pillar1Title: 'Diplomatic & State Visits',
    pillar1Desc:
      'Full-protocol mastery and accredited access to Heads of State, bilateral treaty signings, and ministerial receptions with zero intrusion.',
    pillar2Title: 'Royal Ceremonies & Jubilees',
    pillar2Desc:
      'Documenting sovereign coronations, state banquets, and official royal jubilees with solemn respect and cinematic distinction.',
    pillar3Title: 'Concerts & Cultural Arenas',
    pillar3Desc:
      'Capturing multi-camera 8K cinema productions for premier South Asian performing arts, music legends, and cultural galas.',
    pillar4Title: 'Sports & Global Summits',
    pillar4Desc:
      'Accredited high-speed trackside, court-side and stadium sports capture during premier global tournaments and invitationals.',
    exploreArchive: 'EXPLORE ARCHIVE',
    technicalIntegrity: 'TECHNICAL & OPERATIONAL INTEGRITY',
    chancerySpecs: 'Chancery Specifications',
    tabMission: 'OUR MISSION',
    tabAccreditations: 'ACCREDITATIONS',
    tabGear: 'CINEMA GRADE GEAR',
    geoTag: 'SWEDEN & WORLDWIDE',
    geoTitle: 'Dispatched From Stockholm Across Continents',
    geoDesc:
      'Our principal editorial chancery operates from Stockholm, coordinating accredited field bureaus across major political and cultural centers in Scandinavia, the United Kingdom, and South Asia.',
    ctaTitle: 'Request Official Delegation Coverage',
    ctaDesc:
      'Engage our accredited photography and videography unit for upcoming state visits, embassy galas, high-level bilateral summits, or royal ceremonies.',
    ctaWhatsapp: 'ENLIST CHANCERY WIRE (WHATSAPP)',
    ctaDispatch: 'TRANSMIT OFFICIAL DISPATCH',
  },
  sv: {
    tagAbout: 'OM OSS',
    tagJournalism: 'DIPLOMATISK JOURNALISTIK',
    headlineMain: 'VI FÅNGAR HISTORIEN GENOM HÖGSTA KVALITET',
    headlineSub:
      'Nordic Affairs Media är en svensk medieorganisation specialiserad på officiella statsbesök på hög nivå, diplomatiska evenemang, kungliga ceremonier och internationell sportbevakning i Sverige och internationellt.',
    chanceryAccredited: 'ACKREDITERAD HOS HOVKANSLIET',
    chanceryDesc:
      'Auktoriserad dokumentationsenhet med aktiva pressprotokoll för Sveriges kungahus och diplomatiska beskickningar världen över.',
    protocolTelemetry: 'PROTOKOLLTELEMETRI:',
    systemStatus: 'SYSTEMSTATUS: NOMINELL • SÄKER LÄNK AKTIV',
    inspect: 'Granska',
    operatingJurisdictions:
      'VERKSAMHETSOMRÅDEN: STOCKHOLM • GENÈVE • LONDON • NEW DELHI • KÖPENHAMN',
    archiveStandard: 'KRYPTERAT MEDIEARKIV ISO 27001',
    editorialCompass: 'DEN REDAKTIONELLA KOMPASSEN',
    compassTitle: 'Ett suveränt öga på statskonst och högtidliga ceremonier',
    precisionTitle: 'Kompromisslös visuell precision',
    precisionDesc:
      'Med djup professionalism, precision och visuellt berättande levererar vi foto- och videoproduktion i världsklass för prestigefyllda nationella och internationella evenemang.',
    discretionTitle: 'Diskretion och global pondus',
    discretionDesc:
      'Vårt team arbetar med precision, diskretion och hängivenhet för att dokumentera ögonblick av historisk, kulturell och global betydelse genom slagkraftig media.',
    enlistTeam: 'ENGAGERA DELEGATIONSTEAM',
    officialInquiry: 'OFFICIELL FÖRFRÅGAN',
    statYears: 'ÅRS ERFARENHET',
    statYearsDesc:
      'Kontinuerligt diplomatiskt engagemang och mediebevakning i Europa och Asien.',
    statMissions: 'STATSMISSIONER',
    statMissionsDesc:
      'Kungliga besök, bilaterala toppmöten mellan statschefer och kanslimöten dokumenterade.',
    statGlobal: 'GLOBAL RÄCKVIDD',
    statGlobalDesc:
      'Länder med diplomatiskt tillstånd, flerspråkiga kontakter och säkra satellitlänkar.',
    statConfidentiality: 'KONFIDENTIALITET',
    statConfidentialityDesc:
      'Protokollföljsamhet, säker arkivförvaring och kompromisslös diskretion.',
    areasMastery: 'SPETSOMRÅDEN',
    capabilitiesTitle: 'Diplomatiska och mediala kärnkompetenser',
    capabilitiesSub:
      'Utvecklad för snabb insats med institutionell ackreditering vid ministermöten, kungliga milstolpar och internationella arenor.',
    pillar1Title: 'Diplomatiska statsbesök',
    pillar1Desc:
      'Protokollkompetens och ackrediterat tillträde till statschefer, bilaterala avtalssigneringar och mottagningar utan intrång.',
    pillar2Title: 'Kungliga ceremonier & jubileer',
    pillar2Desc:
      'Dokumentation av kungliga jubileer, statsbanketter och officiella ceremonier med djup respekt och filmisk precision.',
    pillar3Title: 'Konserter och kulturarenor',
    pillar3Desc:
      'Flerkameraproduktion i 8K-biografkvalitet för sydasiatiska kultur- och musikstjärnor samt galor.',
    pillar4Title: 'Sport och globala toppmöten',
    pillar4Desc:
      'Ackrediterad snabb sportbevakning vid internationella turneringar och mästerskap.',
    exploreArchive: 'UTFORSKA ARKIVET',
    technicalIntegrity: 'TEKNISK OCH OPERATIV INTEGRITET',
    chancerySpecs: 'Kanslispecifikationer',
    tabMission: 'VÅRT UPPDRAG',
    tabAccreditations: 'ACKREDITERINGAR',
    tabGear: 'BIOGRAFUTRUSTNING',
    geoTag: 'SVERIGE OCH VÄRLDEN ÖVER',
    geoTitle: 'Utsänd från Stockholm över kontinenter',
    geoDesc:
      'Vårt huvudsakliga redaktionella kansli verkar från Stockholm och samordnar ackrediterade fältbyråer i Skandinavien, Storbritannien och Sydasien.',
    ctaTitle: 'Begär officiell delegationsbevakning',
    ctaDesc:
      'Anlita vår ackrediterade foto- och videoenhet för kommande statsbesök, ambassadgalor, bilaterala toppmöten eller kungliga ceremonier.',
    ctaWhatsapp: 'ANLITA KANSLIET (WHATSAPP)',
    ctaDispatch: 'SKICKA OFFICIELL DISPENS',
  },
  ta: {
    tagAbout: 'எங்களைப் பற்றி',
    tagJournalism: 'தூதரக இதழியல்',
    headlineMain: 'சிறந்த தரம் மூலம் வரலாற்றை ஆவணப்படுத்துகிறோம்',
    headlineSub:
      'நோர்டிக் அஃபேர்ஸ் மீடியா என்பது ஸ்வீடனை மையமாகக் கொண்ட ஒரு ஊடக அமைப்பாகும், இது உயர்மட்ட அதிகாரப்பூர்வ வருகைகள், தூதரக நிகழ்வுகள், அரச விழாக்கள் மற்றும் விளையாட்டு நிகழ்வுகளை ஆவணப்படுத்துகிறது.',
    chanceryAccredited: 'அரச நீதிமன்ற அங்கீகாரம் பெற்றது',
    chanceryDesc:
      'ஸ்வீடன் அரச நீதிமன்றம் மற்றும் சர்வதேச தூதரகப் பணிகளுக்கான அதிகாரப்பூர்வ ஆவணப்படுத்தல் பிரிவு.',
    protocolTelemetry: 'நெறிமுறை கண்காணிப்பு:',
    systemStatus: 'நிலை: இயல்பானது • பாதுகாப்பான தொடர்பு செயலில்',
    inspect: 'பார்வையிடுக',
    operatingJurisdictions:
      'செயல்படும் பகுதிகள்: ஸ்டாக்ஹோம் • ஜெனீவா • லண்டன் • புது தில்லி • கோபன்ஹேகன்',
    archiveStandard: 'பாதுகாக்கப்பட்ட காப்பகம் ISO 27001',
    editorialCompass: 'தலையங்க வழிகாட்டுதல்',
    compassTitle: 'அரசு நிர்வாகம் மற்றும் விழாக்களின் ஆவணப் பார்வை',
    precisionTitle: 'துல்லியமான காட்சி ஆவணம்',
    precisionDesc:
      'தொழில்முறை ஈடுபாடு, துல்லியம் மற்றும் காட்சி கதைசொல்லல் மூலம் சர்வதேச நிகழ்வுகளுக்கு உலகத்தரம் வாய்ந்த புகைப்படம் மற்றும் ஒளிப்பதிவு சேவைகளை வழங்குகிறோம்.',
    discretionTitle: 'ரகசியத்தன்மையும் உலகளாவிய மதிப்பும்',
    discretionDesc:
      'வரலாற்று மற்றும் கலாச்சார முக்கியத்துவம் வாய்ந்த தருணங்களை ஆவணப்படுத்த எங்கள் குழு அர்ப்பணிப்புடன் செயல்படுகிறது.',
    enlistTeam: 'குழுவை தொடர்பு கொள்க',
    officialInquiry: 'அதிகாரப்பூர்வ விசாரணை',
    statYears: 'ஆண்டுகள் அனுபவம்',
    statYearsDesc: 'ஐரோப்பா மற்றும் ஆசியாவில் தொடர்ச்சியான தூதரக ஈடுபாடு மற்றும் ஊடகச் சேவை.',
    statMissions: 'அரசு பணிகள்',
    statMissionsDesc: 'அரச வருகைகள், இருதரப்பு உச்சிமாநாடுகள் மற்றும் சந்திப்புகள் ஆவணப்படுத்தப்பட்டுள்ளன.',
    statGlobal: 'உலகளாவிய வரம்பு',
    statGlobalDesc: 'தூதரக அனுமதி மற்றும் பல மொழி தொடர்புகளுடன் பல நாடுகளில் விரிவடைந்தது.',
    statConfidentiality: 'ரகசியத்தன்மை',
    statConfidentialityDesc: 'நெறிமுறை இணக்கம், பாதுகாப்பான காப்பகம் மற்றும் உயர்மட்ட ரகசியத்தன்மை மதிப்பீடு.',
    areasMastery: 'முக்கிய துறைகள்',
    capabilitiesTitle: 'முக்கிய தூதரக & ஊடகத் திறன்கள்',
    capabilitiesSub:
      'அமைச்சர்கள் மாநாடுகள், வரலாற்று சிறப்புமிக்க அரச நிகழ்வுகள் மற்றும் அரங்க நிகழ்வுகளுக்கான ஊடக கட்டமைப்பு.',
    pillar1Title: 'தூதரக & அரசு வருகைகள்',
    pillar1Desc:
      'அரசுத் தலைவர்கள், இருதரப்பு ஒப்பந்தங்கள் மற்றும் வரவேற்புகளை தடையின்றி ஆவணப்படுத்தும் நெறிமுறைத் திறன்.',
    pillar2Title: 'அரச விழாக்கள் & ஜூபிலிகள்',
    pillar2Desc: 'அரச விழாக்கள், விருந்துகள் மற்றும் கொண்டாட்டங்களை சினிமா தரத்தில் ஆவணப்படுத்துதல்.',
    pillar3Title: 'இசை நிகழ்ச்சிகள் & கலாச்சார அரங்குகள்',
    pillar3Desc:
      'தெற்காசிய கலைகள், இசை ஜாம்பவான்கள் மற்றும் கலாச்சார விழாக்களுக்கான 8K சினிமா தயாரிப்புகள்.',
    pillar4Title: 'விளையாட்டு & சர்வதேச உச்சிமாநாடுகள்',
    pillar4Desc: 'முக்கிய உலகளாவிய போட்டிகளில் அங்கீகரிக்கப்பட்ட அதிவேக விளையாட்டு புகைப்படம்.',
    exploreArchive: 'காப்பகத்தை காண்க',
    technicalIntegrity: 'தொழில்நுட்ப மற்றும் செயல்பாட்டு ஒருமைப்பாடு',
    chancerySpecs: 'சான்சரி விவரக்குறிப்புகள்',
    tabMission: 'எங்கள் நோக்கம்',
    tabAccreditations: 'அங்கீகாரங்கள்',
    tabGear: 'சினிமா தர உபகரணங்கள்',
    geoTag: 'ஸ்வீடன் & உலகம் முழுவதும்',
    geoTitle: 'ஸ்டாக்ஹோமிலிருந்து உலகெங்கும் சேவை',
    geoDesc:
      'எங்கள் முதன்மை அலுவலகம் ஸ்டாக்ஹோமில் செயல்படுகிறது, ஸ்காண்டிநேவியா, இங்கிலாந்து மற்றும் தெற்காசியாவில் களப் பணிகளை ஒருங்கிணைக்கிறது.',
    ctaTitle: 'அதிகாரப்பூர்வ தூதுக்குழு ஆவணத்தைக் கோருங்கள்',
    ctaDesc:
      'வரவிருக்கும் அரசு வருகைகள், தூதரக நிகழ்வுகள் மற்றும் விழாக்களுக்கு எங்கள் புகைப்பட மற்றும் வீடியோ பிரிவை அணுகவும்.',
    ctaWhatsapp: 'வாட்ஸ்அப் மூலம் தொடர்பு கொள்க',
    ctaDispatch: 'அதிகாரப்பூர்வ செய்தி அனுப்பவும்',
  },
  ml: {
    tagAbout: 'ഞങ്ങളെക്കുറിച്ച്',
    tagJournalism: 'നയതന്ത്ര പത്രപ്രവർത്തനം',
    headlineMain: 'മികവിലൂടെ ചരിത്രം പകർത്തുന്നു',
    headlineSub:
      'ഉന്നതതല ഔദ്യോഗിക സന്ദർശനങ്ങൾ, നയതന്ത്ര പരിപാടികൾ, രാജകീയ ചടങ്ങുകൾ, അന്താരാഷ്ട്ര കായിക ഇവന്റുകൾ എന്നിവയിൽ വൈദഗ്ധ്യമുള്ള സ്വീഡൻ ആസ്ഥാനമായുള്ള മാധ്യമ സ്ഥാപനം.',
    chanceryAccredited: 'റോയൽ ചാൻസറി അക്രഡിറ്റേഷൻ',
    chanceryDesc:
      'സ്വീഡൻ രാജകൊട്ടാരത്തിനും നയതന്ത്ര ദൗത്യങ്ങൾക്കും വേണ്ടിയുള്ള ഔദ്യോഗിക ഡോക്യുമെന്റേഷൻ യൂണിറ്റ്.',
    protocolTelemetry: 'പ്രോട്ടോക്കോൾ ടെലിമെട്രി:',
    systemStatus: 'സിസ്റ്റം സ്റ്റാറ്റസ്: സാധാരണ നിലയിൽ • ലിങ്ക് സജീവം',
    inspect: 'പരിശോധിക്കുക',
    operatingJurisdictions:
      'പ്രവർത്തന മേഖലകൾ: സ്റ്റോക്ക്ഹോം • ജനീവ • ലണ്ടൻ • ന്യൂഡൽഹി • കോപ്പൻഹേഗൻ',
    archiveStandard: 'എൻക്രിപ്റ്റ് ചെയ്ത ആർക്കൈവ് ISO 27001',
    editorialCompass: 'എഡിറ്റോറിയൽ ദിശാബോധം',
    compassTitle: 'ഭരണതന്ത്രവും പ്രൗഢ ചടങ്ങുകളും പകർത്തുന്ന നോട്ടം',
    precisionTitle: 'സമാനതകളില്ലാത്ത വിഷ്വൽ കൃത്യത',
    precisionDesc:
      'പ്രൊഫഷണലിസം, കൃത്യത, വിഷ്വൽ സ്റ്റോറിടെല്ലിംഗ് എന്നിവയോടെ അന്താരാഷ്ട്ര ഇവന്റുകൾക്കായി ലോകോത്തര ഫോട്ടോഗ്രാഫിയും വീഡിയോഗ്രാഫിയും നൽകുന്നു.',
    discretionTitle: 'രഹസ്യസ്വഭാവവും ആഗോള പ്രൗഢിയും',
    discretionDesc:
      'ചരിത്രപരവും സാംസ്കാരികവുമായ പ്രാധാന്യമുള്ള നിമിഷങ്ങൾ ശക്തമായ മാധ്യമങ്ങളിലൂടെ പകർത്താൻ ഞങ്ങളുടെ ടീം പ്രവർത്തിക്കുന്നു.',
    enlistTeam: 'ഡെലിഗേഷൻ ടീമിനെ ബന്ധപ്പെടുക',
    officialInquiry: 'ഔദ്യോഗിക അന്വേഷണം',
    statYears: 'വർഷങ്ങളുടെ സേവനം',
    statYearsDesc: 'യൂറോപ്പിലും ഏഷ്യയിലും തുടർച്ചയായ നയതന്ത്ര ഇടപെടലും മാധ്യമ സേവനങ്ങളും.',
    statMissions: 'സ്റ്റേറ്റ് മിഷനുകൾ',
    statMissionsDesc: 'രാജകീയ സന്ദർശനങ്ങൾ, ഉഭയകക്ഷി കോൺക്ലേവുകൾ എന്നിവ രേഖപ്പെടുത്തി.',
    statGlobal: 'ആഗോള വ്യാപനം',
    statGlobalDesc: 'നയതന്ത്ര അനുമതിയും സാറ്റലൈറ്റ് ലിങ്കുകളുമുള്ള രാജ്യങ്ങളിൽ സേവനം നൽകുന്നു.',
    statConfidentiality: 'രഹസ്യസ്വഭാവം',
    statConfidentialityDesc:
      'പ്രോട്ടോക്കോൾ പാലിക്കൽ, സുരക്ഷിത ആർക്കൈവൽ കസ്റ്റഡി, വിഐപി രഹസ്യസ്വഭാവം.',
    areasMastery: 'നൈപുണ്യ മേഖലകൾ',
    capabilitiesTitle: 'പ്രധാന നയതന്ത്ര & മാധ്യമ ശേഷികൾ',
    capabilitiesSub:
      'മന്ത്രിതല ഉച്ചകോടികൾ, ചരിത്രപരമായ രാജകീയ നാഴികക്കല്ലുകൾ എന്നിവയ്ക്കായുള്ള മീഡിയ ഇൻഫ്രാസ്ട്രക്ചർ.',
    pillar1Title: 'നയതന്ത്ര സന്ദർശനങ്ങൾ',
    pillar1Desc:
      'രാഷ്ട്രത്തലവന്മാർ, ഉഭയകക്ഷി ഉടമ്പടികൾ, റിസപ്ഷനുകൾ എന്നിവയ്ക്കുള്ള അക്രഡിറ്റഡ് ആക്സസ്.',
    pillar2Title: 'രാജകീയ ചടങ്ങുകളും ജൂബിലികളും',
    pillar2Desc:
      'രാജകീയ കിരീടധാരണങ്ങൾ, വിരുന്നുകൾ, ഔദ്യോഗിക ജൂബിലികൾ എന്നിവയുടെ ചലച്ചിത്ര ഗുണനിലവാരമുള്ള ഡോക്യുമെന്റേഷൻ.',
    pillar3Title: 'സംഗീതക്കച്ചേരികളും സാംസ്കാരിക വേദികളും',
    pillar3Desc:
      'സൗത്ത് ഏഷ്യൻ കലകൾ, സംഗീത ഇതിഹാസങ്ങൾ, സാംസ്കാരിക ഗാലകൾ എന്നിവയ്ക്കായുള്ള 8K സിനിമാ നിർമ്മാണം.',
    pillar4Title: 'കായികമേളകളും അന്താരാഷ്ട്ര ഉച്ചകോടികളും',
    pillar4Desc: 'പ്രമുഖ ആഗോള ടൂർണമെന്റുകളിലെ അത്യാധുനിക സ്പോർട്സ് കവറേജ്.',
    exploreArchive: 'ആർക്കൈവ് കാണുക',
    technicalIntegrity: 'സാങ്കേതിക & പ്രവർത്തനപരമായ സമഗ്രത',
    chancerySpecs: 'ചാൻസറി സവിശേഷതകൾ',
    tabMission: 'ഞങ്ങളുടെ ദൗത്യം',
    tabAccreditations: 'അംഗീകാരങ്ങൾ',
    tabGear: 'സിനിമാ ഗ്രേഡ് ഉപകരണങ്ങൾ',
    geoTag: 'സ്വീഡനും ലോകമെമ്പാടും',
    geoTitle: 'സ്റ്റോക്ക്ഹോമിൽ നിന്ന് ലോകമെമ്പാടും സേവനം',
    geoDesc:
      'ഞങ്ങളുടെ പ്രധാന എഡിറ്റോറിയൽ ചാൻസറി പ്രവർത്തിക്കുന്നത് സ്റ്റോക്ക്ഹോമിൽ നിന്നാണ്, സ്കാൻഡിനേവിയ, യുകെ, ദക്ഷിണേഷ്യ എന്നിവിടങ്ങളിലെ ഫീൽഡ് ബ്യൂറോകളെ ഏകോപിപ്പിക്കുന്നു.',
    ctaTitle: 'ഔദ്യോഗിക പ്രതിനിധി സംഘത്തിന്റെ കവറേജ് അഭ്യർത്ഥിക്കുക',
    ctaDesc:
      'വരാനിരിക്കുന്ന സ്റ്റേറ്റ് സന്ദർശനങ്ങൾ, എംബസി ഗാലകൾ, ഉഭയകക്ഷി ഉച്ചകോടികൾ എന്നിവയ്ക്കായി ഞങ്ങളുടെ അക്രഡിറ്റഡ് യൂണിറ്റിനെ സമീപിക്കുക.',
    ctaWhatsapp: 'വാട്ട്‌സ്ആപ്പ് വഴി ബന്ധപ്പെടുക',
    ctaDispatch: 'ഔദ്യോഗിക സന്ദേശം അയക്കുക',
  },
}

export function StitchAboutView({ locale, t, settings, enquireHref }: Props) {
  const str = ABOUT_STRINGS[locale] ?? ABOUT_STRINGS.en
  const [telemetry, setTelemetry] = useState(
    'Official State Lens • Certified Ultra-HD 8K Hasselblad & RED Monstro Rig',
  )
  const [activeTab, setActiveTab] = useState<'mission' | 'accreditations' | 'gear'>('mission')

  const badges = [
    {
      id: 'lens',
      tag: 'STATE LENS',
      title: '8K Optics',
      subtitle: 'Hasselblad & RED Monstro',
      icon: 'photo_camera',
      color: 'cyan',
      text: 'Official State Lens • Certified Ultra-HD 8K Hasselblad & RED Monstro Rig',
      floatClass: 'animate-float-slow',
      borderColor: 'border-cyan-500/20 hover:border-cyan-400/50',
      iconColor: 'text-cyan-400',
      glowColor: 'shadow-[0_0_20px_rgba(34,211,238,0.25)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]',
      badgeBg: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
    },
    {
      id: 'crest',
      tag: 'ROYAL CREST',
      title: 'Court Protocol',
      subtitle: 'Nordic Royal Cleared',
      icon: 'crown',
      color: 'purple',
      text: 'Accredited Royal Press Protocol • Official Nordic Court Cleared',
      floatClass: 'animate-float-reverse',
      borderColor: 'border-purple-500/20 hover:border-purple-400/50',
      iconColor: 'text-purple-400',
      glowColor: 'shadow-[0_0_20px_rgba(192,132,252,0.25)] group-hover:shadow-[0_0_30px_rgba(192,132,252,0.55)]',
      badgeBg: 'bg-purple-400/10 text-purple-300 border-purple-400/20',
    },
    {
      id: 'wire',
      tag: 'DIRECT LINK',
      title: 'Global Wire',
      subtitle: 'Reuters & AP Sync',
      icon: 'satellite_alt',
      color: 'blue',
      text: 'Worldwide Direct Wire • Live Reuters & AP Syndication Sync',
      floatClass: 'animate-float-slow',
      borderColor: 'border-blue-500/20 hover:border-blue-400/50',
      iconColor: 'text-blue-400',
      glowColor: 'shadow-[0_0_20px_rgba(96,165,250,0.25)] group-hover:shadow-[0_0_30px_rgba(96,165,250,0.5)]',
      badgeBg: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
    },
    {
      id: 'wave',
      tag: 'ARENA MASTERY',
      title: 'Audio & Wave',
      subtitle: '120+ Grand Productions',
      icon: 'wave',
      color: 'rose',
      text: 'Acoustic & Arena Mastery • 120+ International Stage Productions',
      floatClass: 'animate-float-reverse',
      borderColor: 'border-rose-500/20 hover:border-rose-400/50',
      iconColor: 'text-rose-400',
      glowColor: 'shadow-[0_0_20px_rgba(251,113,133,0.25)] group-hover:shadow-[0_0_30px_rgba(251,113,133,0.5)]',
      badgeBg: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    },
    {
      id: 'shield',
      tag: 'SECURITY CLEARED',
      title: 'VIP Shield',
      subtitle: 'Discretion & Immunity',
      icon: 'verified_user',
      color: 'emerald',
      text: 'Classified & VIP Discretion Guarantee • Diplomatic Immunity Compliance',
      floatClass: 'animate-float-slow',
      borderColor: 'border-emerald-500/20 hover:border-emerald-400/50',
      iconColor: 'text-emerald-400',
      glowColor: 'shadow-[0_0_20px_rgba(52,211,153,0.25)] group-hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]',
      badgeBg: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    },
  ]

  return (
    <div className="w-full bg-[#080f14] text-slate-100 font-sans selection:bg-[#f2ca50] selection:text-black">
      {/* =========================================================================
          HERO SECTION WITH ORBITAL FLOATING BADGES & PROTOCOL TELEMETRY
          ========================================================================= */}
      <section className="relative w-full overflow-hidden px-5 sm:px-10 lg:px-16 pt-12 pb-24 lg:pt-16 lg:pb-32">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#f2ca50]/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-[32rem] h-[32rem] rounded-full bg-blue-900/20 blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Section Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-cyan-400"></span>
            <span className="font-space text-[12px] font-semibold text-cyan-400 tracking-[0.25em] uppercase">
              {str.tagAbout}
            </span>
            <span className="text-slate-600">/</span>
            <span className="font-space text-[12px] font-semibold text-slate-400 uppercase tracking-widest">
              {str.tagJournalism}
            </span>
          </div>

          {/* Core Headline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-serif text-[42px] sm:text-[54px] lg:text-[64px] font-normal text-white tracking-tight uppercase leading-[1.05]">
                {str.headlineMain}
              </h1>
              <p className="font-manrope text-[18px] text-slate-300 max-w-2xl leading-relaxed">
                {str.headlineSub}
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end lg:items-end space-y-4 pt-4">
              <div className="p-6 bg-[#161c22]/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl max-w-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-400">verified</span>
                  <span className="text-purple-400 font-space text-[11px] font-bold tracking-widest uppercase">
                    {str.chanceryAccredited}
                  </span>
                </div>
                <p className="font-manrope text-[13px] text-slate-400 leading-normal">
                  {str.chanceryDesc}
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTIVE FLOATING BADGES STAGE */}
          <div className="relative w-full min-h-[380px] lg:min-h-[460px] bg-[#0c141d]/90 rounded-2xl p-6 lg:p-10 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between">
            {/* Subtle Vector Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f2ca50_1px,transparent_1px)] [background-size:24px_24px]"></div>

            {/* Live Action Feedback Ticker */}
            <div className="relative z-20 flex items-center justify-between bg-[#161c22]/90 border border-white/10 backdrop-blur-md px-6 py-3.5 rounded-lg shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-space text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                  {str.protocolTelemetry}
                </span>
                <span className="font-manrope text-[13px] text-white font-medium">
                  {telemetry}
                </span>
              </div>
              <span className="font-space text-[11px] text-slate-500 hidden md:inline tracking-wider">
                {str.systemStatus}
              </span>
            </div>

            {/* Interactive Floating Badges Cloud */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 my-10 items-center">
              {badges.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setTelemetry(b.text)}
                  onMouseEnter={() => setTelemetry(b.text)}
                  className={`${b.floatClass} group relative flex flex-col items-center text-center p-5 bg-[#1a2026]/80 hover:bg-[#242b31] backdrop-blur-xl rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg focus:outline-none border ${b.borderColor}`}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-[#080f14] flex items-center justify-center ${b.iconColor} mb-3 ${b.glowColor} transition-shadow border border-white/10`}
                  >
                    {b.icon === 'wave' ? (
                      <div className="flex items-center gap-1 h-7">
                        <span className="w-1 bg-rose-400 rounded-full wave-bar-1"></span>
                        <span className="w-1 bg-pink-300 rounded-full wave-bar-2"></span>
                        <span className="w-1 bg-rose-400 rounded-full wave-bar-3"></span>
                        <span className="w-1 bg-pink-300 rounded-full wave-bar-4"></span>
                      </div>
                    ) : (
                      <span className="material-symbols-outlined text-[32px]">{b.icon}</span>
                    )}
                  </div>
                  <span className={`font-space text-[11px] font-bold ${b.iconColor} tracking-wider uppercase mb-1`}>
                    {b.tag}
                  </span>
                  <span className="font-serif text-[18px] font-semibold text-white">
                    {b.title}
                  </span>
                  <span className="font-manrope text-[12px] text-slate-400 mt-1">
                    {b.subtitle}
                  </span>
                  <span
                    className={`mt-3 px-2 py-0.5 rounded font-space text-[10px] tracking-wider uppercase border ${b.badgeBg}`}
                  >
                    {str.inspect}
                  </span>
                </button>
              ))}
            </div>

            {/* Footnote inside stage */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/5 text-slate-500 font-space text-[11px]">
              <span>{str.operatingJurisdictions}</span>
              <span className="text-[#f2ca50] mt-2 sm:mt-0 font-medium">{str.archiveStandard}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL STORYTELLING & DIPLOMATIC PHOTOGRAPHY MOSAIC
          ========================================================================= */}
      <section className="w-full bg-[#0a121a] px-5 sm:px-10 lg:px-16 py-24 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-[#161c22] border border-white/10 group">
                <img
                  src="https://www.nordicaffairsmedia.com/wp-content/uploads/2026/05/7.Rosenbad-Government-Office.JPG-1.jpeg"
                  alt="Stockholm Government Office Bilateral Conclave"
                  className="w-full h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f14] via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#161c22]/90 backdrop-blur-xl rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-space text-[10px] font-bold text-[#f2ca50] uppercase tracking-wider">
                        ARCHIVAL CAPTURE • 2026
                      </span>
                      <p className="font-manrope text-[14px] text-white font-semibold">
                        Bilateral State Summit, Stockholm Palace Chamber
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">flag</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Editorial Pillars */}
            <div className="lg:col-span-6 space-y-8 lg:pl-6">
              <div className="space-y-3">
                <span className="font-space text-[12px] font-semibold text-cyan-400 tracking-widest uppercase">
                  {str.editorialCompass}
                </span>
                <h2 className="font-serif text-[36px] sm:text-[44px] font-medium text-white leading-tight">
                  {str.compassTitle}
                </h2>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-[#161c22] rounded-xl shadow-md border-l-2 border-cyan-400 border border-white/5">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-cyan-400 text-[26px] mt-1">lens</span>
                    <div>
                      <h3 className="font-serif text-[20px] font-semibold text-white mb-2">
                        {str.precisionTitle}
                      </h3>
                      <p className="font-manrope text-[15px] text-slate-300 leading-relaxed">
                        {str.precisionDesc}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-[#161c22] rounded-xl shadow-md border-l-2 border-purple-400 border border-white/5">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-purple-400 text-[26px] mt-1">shield</span>
                    <div>
                      <h3 className="font-serif text-[20px] font-semibold text-white mb-2">
                        {str.discretionTitle}
                      </h3>
                      <p className="font-manrope text-[15px] text-slate-300 leading-relaxed">
                        {str.discretionDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={enquireHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold font-space text-[12px] tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(79,70,229,0.35)] rounded"
                >
                  {str.enlistTeam}
                </a>
                <Link
                  href={href(locale, '/contact')}
                  className="inline-flex items-center gap-2 px-6 py-4 bg-[#161c22] hover:bg-[#202730] text-white font-space text-[12px] tracking-widest uppercase transition-all rounded border border-slate-700"
                >
                  <span className="material-symbols-outlined text-cyan-400 text-[18px]">mail</span>
                  {str.officialInquiry}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST METRICS & MILESTONES
          ========================================================================= */}
      <section className="w-full bg-[#080f14] px-5 sm:px-10 lg:px-16 py-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1: Cyan */}
            <div className="p-8 bg-[#161c22]/80 rounded-xl shadow-lg relative overflow-hidden border border-cyan-500/20">
              <span className="font-space text-[11px] font-semibold text-cyan-400 uppercase tracking-widest block mb-4">
                {str.statYears}
              </span>
              <div className="font-serif text-[56px] text-cyan-400 leading-none mb-3">15+</div>
              <p className="font-manrope text-[14px] text-slate-300">
                {str.statYearsDesc}
              </p>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl"></div>
            </div>

            {/* Stat 2: Purple */}
            <div className="p-8 bg-[#161c22]/80 rounded-xl shadow-lg relative overflow-hidden border border-purple-500/20">
              <span className="font-space text-[11px] font-semibold text-purple-400 uppercase tracking-widest block mb-4">
                {str.statMissions}
              </span>
              <div className="font-serif text-[56px] text-purple-400 leading-none mb-3">250+</div>
              <p className="font-manrope text-[14px] text-slate-300">
                {str.statMissionsDesc}
              </p>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
            </div>

            {/* Stat 3: Rose */}
            <div className="p-8 bg-[#161c22]/80 rounded-xl shadow-lg relative overflow-hidden border border-rose-500/20">
              <span className="font-space text-[11px] font-semibold text-rose-400 uppercase tracking-widest block mb-4">
                {str.statGlobal}
              </span>
              <div className="font-serif text-[56px] text-rose-400 leading-none mb-3">45+</div>
              <p className="font-manrope text-[14px] text-slate-300">
                {str.statGlobalDesc}
              </p>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-rose-500/10 rounded-full blur-xl"></div>
            </div>

            {/* Stat 4: Emerald */}
            <div className="p-8 bg-[#161c22]/80 rounded-xl shadow-lg relative overflow-hidden border border-emerald-500/20">
              <span className="font-space text-[11px] font-semibold text-emerald-400 uppercase tracking-widest block mb-4">
                {str.statConfidentiality}
              </span>
              <div className="font-serif text-[56px] text-emerald-400 leading-none mb-3">100%</div>
              <p className="font-manrope text-[14px] text-slate-300">
                {str.statConfidentialityDesc}
              </p>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE DIPLOMATIC & MEDIA CAPABILITIES (4 PILLARS)
          ========================================================================= */}
      <section className="w-full bg-[#0e141a] px-5 sm:px-10 lg:px-16 py-24 border-y border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-space text-[12px] font-semibold text-[#f2ca50] tracking-widest uppercase block mb-2">
                {str.areasMastery}
              </span>
              <h2 className="font-serif text-[36px] sm:text-[46px] font-normal text-white">
                {str.capabilitiesTitle}
              </h2>
            </div>
            <p className="font-manrope text-[16px] text-slate-400 max-w-md">
              {str.capabilitiesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar 01 */}
            <div className="bg-[#161c22] rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300 flex flex-col border border-cyan-500/30 hover:border-cyan-400/60">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://www.nordicaffairsmedia.com/wp-content/uploads/2026/05/48.Iceland-President-Visit-6-May-25.JPG-1.jpeg"
                  alt="Diplomatic State Visits"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#080f14]/80 backdrop-blur-md rounded font-space text-[10px] text-cyan-400 border border-cyan-500/40 tracking-wider uppercase">
                  PILLAR 01
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-white mb-2">
                    {str.pillar1Title}
                  </h3>
                  <p className="font-manrope text-[14px] text-slate-400">
                    {str.pillar1Desc}
                  </p>
                </div>
                <Link
                  href={href(locale, '/gallery')}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-space text-[11px] uppercase tracking-wider"
                >
                  <span>{str.exploreArchive}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="bg-[#161c22] rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300 flex flex-col border border-purple-500/30 hover:border-purple-400/60">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://www.nordicaffairsmedia.com/wp-content/uploads/2026/05/78.King-80th-Birthday-30-April-26.JPG-1.jpeg"
                  alt="Royal Ceremonies"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#080f14]/80 backdrop-blur-md rounded font-space text-[10px] text-purple-400 border border-purple-500/40 tracking-wider uppercase">
                  PILLAR 02
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-white mb-2">
                    {str.pillar2Title}
                  </h3>
                  <p className="font-manrope text-[14px] text-slate-400">
                    {str.pillar2Desc}
                  </p>
                </div>
                <Link
                  href={href(locale, '/gallery')}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-space text-[11px] uppercase tracking-wider"
                >
                  <span>{str.exploreArchive}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="bg-[#161c22] rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300 flex flex-col border border-rose-500/30 hover:border-rose-400/60">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://www.nordicaffairsmedia.com/wp-content/uploads/2026/05/11.ZLATAN-8-JUN-E-24.JPG-e1780562484562.jpeg"
                  alt="Concerts and Events"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#080f14]/80 backdrop-blur-md rounded font-space text-[10px] text-rose-400 border border-rose-500/40 tracking-wider uppercase">
                  PILLAR 03
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-white mb-2">
                    {str.pillar3Title}
                  </h3>
                  <p className="font-manrope text-[14px] text-slate-400">
                    {str.pillar3Desc}
                  </p>
                </div>
                <Link
                  href={href(locale, '/events')}
                  className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-space text-[11px] uppercase tracking-wider"
                >
                  <span>{str.exploreArchive}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Pillar 04 */}
            <div className="bg-[#161c22] rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-all duration-300 flex flex-col border border-emerald-500/30 hover:border-emerald-400/60">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://www.nordicaffairsmedia.com/wp-content/uploads/2026/05/104.Iceland-President-Visit-6-May-25.JPG-1.jpeg"
                  alt="Sports & Global Summits"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#080f14]/80 backdrop-blur-md rounded font-space text-[10px] text-emerald-400 border border-emerald-500/40 tracking-wider uppercase">
                  PILLAR 04
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-[20px] font-semibold text-white mb-2">
                    {str.pillar4Title}
                  </h3>
                  <p className="font-manrope text-[14px] text-slate-400">
                    {str.pillar4Desc}
                  </p>
                </div>
                <Link
                  href={href(locale, '/articles')}
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-space text-[11px] uppercase tracking-wider"
                >
                  <span>{str.exploreArchive}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE PROTOCOL & CHANCERY SPECIFICATIONS TABS
          ========================================================================= */}
      <section className="w-full bg-[#080f14] px-5 sm:px-10 lg:px-16 py-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-space text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
              {str.technicalIntegrity}
            </span>
            <h2 className="font-serif text-[36px] sm:text-[44px] font-medium text-white mt-2">
              {str.chancerySpecs}
            </h2>
          </div>

          {/* Tab Buttons */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('mission')}
              className={`px-6 py-3 rounded-lg font-space text-[12px] tracking-widest uppercase font-semibold transition-all ${
                activeTab === 'mission'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'bg-[#161c22] text-slate-400 hover:text-white'
              }`}
            >
              {str.tabMission}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('accreditations')}
              className={`px-6 py-3 rounded-lg font-space text-[12px] tracking-widest uppercase font-semibold transition-all ${
                activeTab === 'accreditations'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'bg-[#161c22] text-slate-400 hover:text-white'
              }`}
            >
              {str.tabAccreditations}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('gear')}
              className={`px-6 py-3 rounded-lg font-space text-[12px] tracking-widest uppercase font-semibold transition-all ${
                activeTab === 'gear'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'bg-[#161c22] text-slate-400 hover:text-white'
              }`}
            >
              {str.tabGear}
            </button>
          </div>

          {/* Tab Content Area */}
          <div className="bg-[#121921]/80 backdrop-blur-xl rounded-2xl p-8 lg:p-12 border border-white/10 shadow-2xl">
            {activeTab === 'mission' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <span className="font-space text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
                    CHANCERY CODE OF HONOUR
                  </span>
                  <h3 className="font-serif text-[28px] text-white">
                    Safeguarding Historical Record for Posterity
                  </h3>
                  <p className="font-manrope text-[15px] text-slate-300 leading-relaxed">
                    In an era of fleeting ephemeral media, Nordic Affairs Media stands as an archival
                    sanctuary. We chronicle the subtle gestures of diplomacy, the solemn dignity of
                    state transitions, and the grandeur of cross-cultural unity with uncompromising
                    aesthetic rigor.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {[
                      'Zero-Interference Protocol',
                      'Instant Syllabic Fact-Check',
                      'Dual Cryptographic Backup',
                      'Embassy Press Pool Certified',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">
                          check_circle
                        </span>
                        <span className="font-manrope text-[14px] text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-5 bg-[#1a232e] p-6 rounded-xl border border-white/5 space-y-4">
                  <span className="font-space text-[11px] text-[#f2ca50] tracking-wider uppercase block">
                    DIRECTOR'S STATEMENT
                  </span>
                  <blockquote className="font-serif text-[20px] text-slate-200 italic leading-snug">
                    "We do not merely take pictures; we bear witness to the treaties, alliances, and
                    celebrations that define modern Nordic history."
                  </blockquote>
                  <p className="font-manrope text-[13px] text-slate-400 font-medium">
                    — Editorial Chancery Directorate, Stockholm
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'accreditations' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-[#1a232e] rounded-xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[#f2ca50] text-[28px]">shield</span>
                    <span className="px-2.5 py-1 bg-[#f2ca50]/10 text-[#f2ca50] rounded font-mono text-[11px]">
                      STATUS: ACTIVE
                    </span>
                  </div>
                  <h4 className="font-serif text-[20px] text-white">Nordic Royal Court Cleared</h4>
                  <p className="font-manrope text-[14px] text-slate-400">
                    Annual clearance for sovereign venues including the Royal Palace of Stockholm, Drottningholm, and official state banquets.
                  </p>
                </div>
                <div className="p-6 bg-[#1a232e] rounded-xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[#f2ca50] text-[28px]">public</span>
                    <span className="px-2.5 py-1 bg-[#f2ca50]/10 text-[#f2ca50] rounded font-mono text-[11px]">
                      STATUS: SYNDICATED
                    </span>
                  </div>
                  <h4 className="font-serif text-[20px] text-white">Global Wire Credentials</h4>
                  <p className="font-manrope text-[14px] text-slate-400">
                    Permanent syndication clearance with Reuters, AP, AFP, and international diplomatic press correspondents associations.
                  </p>
                </div>
                <div className="p-6 bg-[#1a232e] rounded-xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-[#f2ca50] text-[28px]">gavel</span>
                    <span className="px-2.5 py-1 bg-[#f2ca50]/10 text-[#f2ca50] rounded font-mono text-[11px]">
                      STATUS: VERIFIED
                    </span>
                  </div>
                  <h4 className="font-serif text-[20px] text-white">Ministry for Foreign Affairs</h4>
                  <p className="font-manrope text-[14px] text-slate-400">
                    Sweden Utrikesdepartementet registered press pool member with high-level delegation handling clearance.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'gear' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'RED V-RAPTOR 8K', tag: 'PRIMARY CAMERA', desc: 'Full-frame 8K VV sensor with 17+ stops of dynamic range.' },
                  { title: 'Hasselblad H6D-100c', tag: 'MEDIUM FORMAT', desc: '100MP medium-format fidelity for sovereign portraits and royal archives.' },
                  { title: 'Angénieux Optimo', tag: 'CINE OPTICS', desc: 'Legendary French anamorphic and spherical zooms for diplomatic salons.' },
                  { title: 'Sennheiser MKH 8060', tag: 'ACOUSTIC CAPTURE', desc: 'Broadcast-reference shotgun microphones for plenary press pools.' },
                ].map((g, idx) => (
                  <div key={idx} className="p-6 bg-[#1a232e] rounded-xl border border-white/5 space-y-2">
                    <span className="font-space text-[10px] text-cyan-400 tracking-wider uppercase block">
                      {g.tag}
                    </span>
                    <h4 className="font-serif text-[18px] text-white">{g.title}</h4>
                    <p className="font-manrope text-[13px] text-slate-400">{g.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          GEOGRAPHIC DEPLOYMENT & GLOBAL OFFICES MAP VIEW
          ========================================================================= */}
      <section className="w-full bg-[#0a121a] px-5 sm:px-10 lg:px-16 py-20 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-space text-[11px] font-semibold text-[#f2ca50] tracking-widest uppercase">
                {str.geoTag}
              </span>
              <h2 className="font-serif text-[36px] sm:text-[44px] font-medium text-white">
                {str.geoTitle}
              </h2>
              <p className="font-manrope text-[15px] text-slate-300 leading-relaxed">
                {str.geoDesc}
              </p>
              <div className="space-y-3 font-manrope text-[13px]">
                <div className="flex items-center justify-between p-3.5 bg-[#161c22] rounded-lg border border-white/5">
                  <span className="font-semibold text-white">Stockholm Headquarters (Sveavägen)</span>
                  <span className="text-[#f2ca50] font-mono">59.3293° N</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-[#161c22] rounded-lg border border-white/5">
                  <span className="font-semibold text-white">London Diplomatic Bureau</span>
                  <span className="text-[#f2ca50] font-mono">51.5074° N</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-[#161c22] rounded-lg border border-white/5">
                  <span className="font-semibold text-white">New Delhi South Asia Desk</span>
                  <span className="text-[#f2ca50] font-mono">28.6139° N</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="w-full h-96 bg-cover bg-center rounded-2xl shadow-2xl relative overflow-hidden border border-white/10"
                style={{
                  backgroundImage:
                    "url('https://www.nordicaffairsmedia.com/wp-content/uploads/2020/01/e3886ac0-336a-472e-91d1-16df310137c0.png')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f14] via-[#080f14]/40 to-transparent flex items-end p-6">
                  <div className="bg-[#0e141a]/95 backdrop-blur-md px-4 py-2.5 rounded-lg border border-white/10 flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
                    <span className="font-space text-[11px] font-semibold text-[#f2ca50] tracking-wider uppercase">
                      CENTRAL DESK: STOCKHOLM CHANCERY ACTIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION / DIPLOMATIC INQUIRY SECTION
          ========================================================================= */}
      <section className="w-full bg-[#080f14] px-5 sm:px-10 lg:px-16 py-24 relative overflow-hidden text-center">
        <div className="absolute top-0 right-1/3 w-[30rem] h-[30rem] bg-[#f2ca50]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10 space-y-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#161c22] border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50] shadow-[0_0_20px_rgba(242,202,80,0.25)]">
            <span className="material-symbols-outlined text-[32px]">handshake</span>
          </div>
          <h2 className="font-serif text-[42px] sm:text-[52px] font-normal text-white tracking-tight uppercase leading-tight">
            {str.ctaTitle}
          </h2>
          <p className="font-manrope text-[17px] text-slate-300 leading-relaxed">
            {str.ctaDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#f2ca50] hover:from-[#e5be42] hover:to-[#ffd75a] text-[#080f14] font-bold font-space text-[12px] tracking-widest uppercase transition-all shadow-[0_0_30px_rgba(242,202,80,0.4)] rounded hover:scale-105 active:scale-95"
            >
              {str.ctaWhatsapp}
            </a>
            <Link
              href={href(locale, '/contact')}
              className="px-8 py-4 bg-[#161c22] hover:bg-[#202730] text-white font-space text-[12px] tracking-widest uppercase transition-all rounded border border-white/15"
            >
              {str.ctaDispatch}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
