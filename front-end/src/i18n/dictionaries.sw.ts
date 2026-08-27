import type { TranslationKey } from './translations';

// Kiswahili (sw) UI dictionary. Industry acronyms are expanded/translated per
// project preference. Any missing key falls back to English.
export const sw: Partial<Record<TranslationKey, string>> = {
  // Navbar
  'topbar.tagline': 'Matairi ya Radial ya malori/mabasi na magari ya abiria yaliyotengenezwa Vietnam, Thailand na Korea',
  'nav.home': 'Nyumbani',
  'nav.about': 'Kuhusu',
  'nav.tires': 'Matairi',
  'nav.allTires': 'Matairi Yote',
  'nav.news': 'Habari',
  'nav.contact': 'Wasiliana',
  'nav.getQuote': 'Pata Nukuu',

  // Home — hero
  'hero.badge': 'Mtengenezaji wa Matairi ya PCR na TBR · Ulaya | Mashariki ya Kati | Afrika | Asia',
  'hero.titleLine1': 'Mshirika Wako wa Kuaminika wa Matairi',
  'hero.titleLine2': 'kwa Ukuaji',
  'hero.description':
    'Matairi ya Radial ya magari ya abiria (PCR) na matairi ya Radial ya malori na mabasi (TBR) yaliyoundwa kwa nafasi za usukani, uendeshaji na trela. Matairi yetu yanatengenezwa Vietnam, Thailand na Korea.',
  'hero.cta': 'Tafuta matairi yako',
  'hero.stat1.value': '10M',
  'hero.stat1.label': 'Matairi ya Radial yanayozalishwa kila mwaka',
  'hero.stat2.value': '3',
  'hero.stat2.label': 'Vituo vya utengenezaji: Vietnam, Thailand na Korea',
  'hero.stat3.value': '35% ↓',
  'hero.stat3.label': 'Lengo la kupunguza uchafuzi unaohusiana na matairi (ifikapo 2030)',
  'hero.stat4.value': 'Kimataifa',
  'hero.stat4.label': 'Usambazaji katika Ulaya, Mashariki ya Kati, Afrika na Asia',
  'hero.accreditationsTitle': 'Uthibitisho na Ufuataji',
  'accreditation.ece': 'Imethibitishwa na ECE R54',
  'accreditation.ukca': 'Imeidhinishwa na UKCA / E-Mark',
  'accreditation.iso9001': 'ISO 9001:2015',
  'accreditation.iso14001': 'ISO 14001',

  // Home — about
  'about.badge': 'Sisi ni Nani',
  'about.title': 'Mtengenezaji huru wa matairi ya kibiashara aliyejengwa kwa ajili ya biashara.',
  'about.p1':
    'J.Planet Tire ni mtengenezaji huru wa matairi ya kibiashara mwenye makao makuu Baghdad, Iraq, wenye ofisi za matawi nchini Uingereza, Dubai, Kenya, Yordani na China. Tunabuni na kusambaza matairi ya PCR na TBR kwa nafasi za usukani, uendeshaji, trela na mabasi/kochi.',
  'about.p2':
    'Kwa utaalamu wa kina katika utengenezaji wa matairi ya TBR kwa sekta ya usafirishaji na meli za magari katika Ulaya, Mashariki ya Kati, Afrika na Asia, tunatoa matairi sahihi kwa meli za magari za kibiashara kwa kiwango kikubwa.',
  'about.cta': 'Jifunze Zaidi',

  // Home — why choose
  'why.badge': 'Kwa Nini J.Planet',
  'why.title': 'Sababu nne zinazowafanya wanunuzi wa biashara watuchague',
  'why.r1.title': 'Uendeshaji Endelevu wa Meli',
  'why.r1.description':
    'Matairi yaliyotengenezwa kwa uendeshaji endelevu wa meli za magari, yenye faida zinazoonekana katika umbali na uhai wa uso wa tairi kwa nafasi za usukani, uendeshaji na trela.',
  'why.r2.title': 'Ushirikiano wa Muda Mrefu',
  'why.r2.description':
    'Tunaamini katika kujenga uhusiano wa muda mrefu na wateja wetu wote katika Ulaya, Mashariki ya Kati, Afrika na Asia.',
  'why.r3.title': 'Timu ya Wataalamu',
  'why.r3.description':
    'Miongo ya utaalamu wa utengenezaji wa matairi ya magari na malori, kutoka usanifu wa mchanganyiko hadi msaada wa ufaaji mahususi wa ekseli.',
  'why.r4.title': 'Teknolojia Bora',
  'why.r4.description':
    'Muundo wa kisasa wa Radial na viwango vya majaribio vinavyoweka ubora sawa katika kila kituo cha uzalishaji.',

  // Home — who we work with
  'workWith.badge': 'Tunaofanya Nao Kazi',
  'workWith.titleLine1': 'Imejengwa kwa ajili ya meli za magari.',
  'workWith.titleLine2': 'Imejengwa kwa ajili ya wasambazaji.',
  'workWith.a1.title': 'Waendeshaji wa Meli na Kampuni za Usafirishaji',
  'workWith.a1.description':
    'Unahitaji usambazaji wa kuaminika, ufaaji sahihi wa ekseli na bei shindani za biashara bila usumbufu. Timu yetu ya biashara ya kimataifa hushughulikia maswali moja kwa moja katika Ulaya, Mashariki ya Kati, Afrika na Asia kwa majibu ya haraka na hisa thabiti katika nafasi zote za usukani, uendeshaji, trela na mabasi/kochi.',
  'workWith.a2.title': 'Wauzaji wa Jumla na Wasambazaji',
  'workWith.a2.description':
    'Sikuzote tunatafuta kuwakaribisha wauzaji wapya katika Ulaya, Mashariki ya Kati, Afrika na Asia. Tarajia bei shindani za biashara, hisa za kuaminika unazoweza kuuza kwa uhakika, na timu ya ushirikiano inayoshughulikia maombi yako moja kwa moja kwa haraka.',
  'workWith.cta': 'Zungumza na timu yetu ya ushirikiano',

  // Home — build programme
  'programme.badge': 'Vifaa vya Asili na Chapa ya Kibinafsi',
  'programme.title': 'Nunua moja kwa moja kutoka kwa mtengenezaji',
  'programme.description':
    'Sisi si madalali. Kwa sababu tunabuni na kutengeneza safu yetu ya matairi ya PCR na TBR nchini Vietnam, Thailand na Korea, unapata ubora thabiti, usambazaji wa kuaminika na bei imara zinazoungwa mkono na timu yetu ya biashara ya kimataifa inayoijua bidhaa vizuri.',
  'programme.cta': 'Pata Nukuu',

  // Home — where we operate
  'operate.badge': 'Uwepo Wetu wa Kimataifa',
  'operate.title': 'Tunakofanyia Kazi',
  'operate.hq': 'Makao Makuu',
  'operate.branch': 'Tawi',
  'operate.me.region': 'Mashariki ya Kati',
  'operate.me.note': 'Makao makuu ya kimataifa, biashara na uendeshaji',
  'operate.me.iraq': 'Iraq',
  'operate.me.dubai': 'Dubai',
  'operate.me.jordan': 'Yordani',
  'operate.europe.region': 'Ulaya',
  'operate.europe.country': 'Uingereza',
  'operate.europe.note': 'Uendeshaji wa biashara wa Uingereza na Umoja wa Ulaya',
  'operate.africa.region': 'Afrika',
  'operate.africa.country': 'Kenya',
  'operate.africa.note': 'Kuhudumia meli za magari za Afrika Mashariki na Kusini mwa Jangwa la Sahara',
  'operate.asia.region': 'Asia',
  'operate.asia.country': 'China',
  'operate.asia.note': 'Ununuzi, ubora na uratibu wa utengenezaji',
  'operate.fullDetails': 'Unahitaji anwani mahususi? Ona maelezo kamili ya mawasiliano →',

  // Home — sustainability & news
  // Home — tire range
  'range.badge': 'Safu',
  'range.title1': 'Utaalamu mmoja.',
  'range.title2': 'Kila nafasi ya ekseli.',
  'range.viewAll': 'Tazama Matairi Yote',
  'range.explore': 'Chunguza Matairi →',
  'range.pcr.tag': 'Tairi Radial la Gari la Abiria',
  'range.pcr.title': 'Matairi ya PCR/SUV',
  'range.pcr.description':
    'Yametengenezwa Korea, yamebuniwa kwa faraja, mshiko wa barabara kavu na maisha marefu ya mkanda kwa magari madogo na ya wastani.',
  'range.tbr.tag': 'Tairi Radial la Lori na Basi',
  'range.tbr.title': 'Matairi ya TBR',
  'range.tbr.description':
    'Yametengenezwa Thailand na Vietnam, yamejengwa kwa nafasi za uelekezaji, uendeshaji, trela na basi/kochi katika meli za kibiashara.',
  'range.otr.tag': 'Ujenzi na Kazi Ngumu',
  'range.otr.title': 'Matairi ya OTR',
  'range.otr.description':
    'Yamebuniwa kwa changarawe, matope na barabara za lami, yenye kuta za pembeni zilizoimarishwa kwa meli za ujenzi za kazi ngumu.',

  'sustainability.title':
    '35%↓ Lengo la kupunguza uchafuzi unaohusiana na matairi katika utengenezaji na mzunguko wa maisha wa bidhaa zetu.',
  'sustainability.tagline': 'Tunapenda asili. Tunathamini rasilimali.',
  'sustainability.description':
    'Uendelevu si jambo la pembeni, umejengwa katika jinsi tunavyotengeneza. Kutoka ufanisi wa nyenzo hadi mchanganyiko wa uso wa tairi wa muda mrefu, tumejitolea tumejitolea kupunguza athari za kimazingira za kila meli ya magari tunayosambaza bila kuathiri utendaji ambao wanunuzi wa biashara wanautegemea.',
  'news.title': 'Habari na Vyombo vya Habari',
  'news.readMore': 'Soma Zaidi →',
  'news.n1.date': '12 Mei 2026',
  'news.n1.title': 'J.Planet Tire Yashiriki Maonyesho ya Automechanika Dubai 2026',
  'news.n1.description':
    'J.Planet Tire ilishiriki kwa fahari katika Automechanika Dubai, ikiungana na wataalamu wa sekta ya kimataifa na kuonyesha teknolojia zake za hivi karibuni za matairi, bidhaa bora, na kujitolea kwake kwa uvumbuzi katika soko la magari la kimataifa.',
  'news.n1.body1':
    'J.Planet Tire ilishiriki kwa mafanikio katika Automechanika Dubai, mojawapo ya maonyesho makuu ya soko la baada ya mauzo la magari katika Mashariki ya Kati. Wakati wa tukio, kampuni iliwakaribisha wasambazaji, washirika na wageni kutoka duniani kote kuchunguza suluhisho zake za hivi karibuni za matairi kwa magari ya abiria, magari ya kibiashara na matumizi ya viwandani.',
  'news.n1.body2':
    'Maonyesho yalitoa fursa nzuri ya kuimarisha ushirikiano uliopo, kuanzisha mahusiano mapya ya kibiashara, na kuonyesha kujitolea kwa J.Planet Tire kwa ubora, utendaji na uvumbuzi endelevu katika sekta ya matairi ya kimataifa.',
  'news.n2.date': '8 Feb 2026',
  'news.n2.title': 'J.Planet Tire katika Maonyesho ya Latin Tyre & Auto Parts',
  'news.n2.description':
    'J.Planet Tire ilionyesha suluhisho zake za hivi karibuni za matairi katika Maonyesho ya Latin Tyre & Auto Parts, ikiungana na wataalamu wa sekta na kupanua uwepo wake katika soko la magari la Amerika ya Kusini.',
  'news.n2.body1':
    'J.Planet Tire ilishiriki katika Maonyesho ya Latin Tyre & Auto Parts, ikiwasilisha safu yake ya hivi karibuni ya bidhaa za matairi kwa wanunuzi, wasambazaji na wataalamu wa magari kutoka Amerika ya Kusini na kwingineko.',
  'news.n2.body2':
    'Katika maonyesho yote, kampuni ilisisitiza umakini wake katika utengenezaji bora, teknolojia ya kisasa na suluhisho zinazomlenga mteja, huku ikijenga ushirikiano wa thamani na biashara za kimataifa. Tukio liliimarisha kujitolea kwa J.Planet Tire kupanua mtandao wake wa kimataifa na kutoa suluhisho za matairi za kuaminika kwa wateja duniani kote.',
  'news.n3.date': '3 Julai 2026',
  'news.n3.title': 'J. Planet Tires Yaonyeshwa katika Maonyesho ya Usafirishaji wa Barabarani 2026',
  'news.n3.description':
    'Maonyesho yenye mafanikio katika Banda GR13, NAEC Stoneleigh, tukiungana na wataalamu wa usafirishaji kutoka sekta nzima.',
  'news.n3.body1':
    'J. Planet Tires ilijivunia kushiriki katika Maonyesho ya Usafirishaji wa Barabarani (RTX) 2026 katika NAEC Stoneleigh, ambapo tuliwakaribisha waendeshaji wa magari ya kampuni, wasambazaji, wataalamu wa usafirishaji na washirika wa sekta katika banda letu.',
  'news.n3.body2':
    'Katika tukio lote, timu yetu ilionyesha suluhisho zetu za hivi karibuni za matairi ya kibiashara, ilijadili mwelekeo wa sekta, na kuungana na wageni kutoka Uingereza na kwingineko. RTX ilitoa fursa nzuri ya kuimarisha uhusiano uliopo, kuwatambulisha bidhaa zetu kwa wateja wapya, na kubadilishana mawazo na wataalamu wa sekta ya usafirishaji wa barabarani.',
  'news.n3.body3':
    'Tungependa kuwashukuru wote waliotembelea Banda GR13 na kutenga muda kukutana na timu yetu. Tunathamini shauku yenu kwa J. Planet Tires na tunatarajia kuendeleza mazungumzo na kujenga ushirikiano wa kudumu.',

  // Home — CTA banner
  'cta.title': 'Hebu J.Planet iwe mshirika wa meli yako ya magari.',
  'cta.description':
    'Iwe unahitaji ufaaji wa matairi kwa nafasi za usukani, uendeshaji au trela, au unatuchunguza kama mshirika wa utengenezaji, timu yetu ya biashara ya kimataifa iliyoko Iraq, Uingereza, Dubai, Kenya, Yordani na China iko tayari kuzungumza.',
  'cta.enquire': 'Uliza',
  'cta.partner': 'Kuwa Mshirika wa Biashara',

  // Footer
  'footer.description':
    'Matairi ya PCR na TBR yaliyotengenezwa Vietnam, Thailand na Korea kwa meli za magari za kibiashara, yanayouzwa na kuungwa mkono nchini Uingereza, Ulaya, Dubai na Iraq.',
  'footer.explore': 'Chunguza',
  'footer.legal': 'Kisheria',
  'footer.contactUs': 'Wasiliana Nasi',
  'footer.terms': 'Sheria na Masharti',
  'footer.privacy': 'Sera ya Faragha',
  'footer.warranty': 'Sera ya Dhamana',
  'footer.copyright': 'Hakimiliki © {year} J. Planet Tire',
  'footer.rights': 'Haki Zote Zimehifadhiwa',

  // Common
  'common.viewMore': 'Ona Zaidi',
  'common.comingSoon': 'Inakuja hivi karibuni',

  // About page
  'aboutPage.badge': 'Kuhusu J.Planet Tire',
  'aboutPage.titleLine1': 'Viwango vya Utengenezaji',
  'aboutPage.titleLine2': 'Ambavyo Wanunuzi wa Biashara Wanaweza Kuvitegemea.',
  'aboutPage.h1.title': 'Vimejaribiwa, si vya kudhaniwa',
  'aboutPage.h1.description': 'kila safu hupitia majaribio ya kimataifa ya Radial kabla ya kufika kwa meli ya magari.',
  'aboutPage.h2.title': 'Usambazaji thabiti',
  'aboutPage.h2.description': 'Uendeshaji wa biashara wa kimataifa unaendeshwa kutoka matawi yetu Uingereza, Dubai, Iraq, Yordani, Kenya na China.',
  'aboutPage.h3.title': 'Msaada wa moja kwa moja wa mtengenezaji',
  'aboutPage.h3.description': 'Timu yetu itasaidia biashara yako moja kwa moja.',
  'mission.badge': 'Dhamira Yetu',
  'mission.titleLine1': 'Imejengwa kuzunguka afya ya muda mrefu,',
  'mission.titleLine2': 'usalama na uendelevu.',
  'mission.p1':
    'J.Planet Tire ni mtengenezaji huru wa matairi ya kibiashara mwenye makao makuu Baghdad, Iraq, wenye matawi nchini Uingereza, Dubai, Kenya, Yordani na China. Tunabuni na kutengeneza matairi ya PCR na TBR kwa nafasi za usukani, uendeshaji, trela na mabasi/kochi, yaliyotengenezwa katika vituo vya washirika wetu Vietnam, Thailand na Korea.',
  'mission.p2':
    'Kwa utaalamu wa kina katika chapa za kibinafsi na uendelezaji wa Vifaa vya Asili, tunasaidia kampuni za usafirishaji, waendeshaji wa mabasi na wauzaji wa jumla wa meli za magari katika Ulaya, Mashariki ya Kati, Afrika na Asia kupata matairi sahihi kwa shughuli zao, kwa kiwango kikubwa.',
  'journey.badge': 'Safari Yetu',
  'journey.title': 'Hatua Muhimu',
  'journey.m1.label': 'VN · TH',
  'journey.m1.description': 'Utengenezaji wa Radial ulioanzia Vietnam na Thailand.',
  'journey.m2.label': 'Wolverhampton',
  'journey.m2.description': 'Kituo cha usambazaji na msaada cha Uingereza kimeanzishwa.',
  'journey.m3.label': '2026',
  'journey.m3.description': 'Kuonyesha kimataifa katika Automechanika Dubai.',
  'journey.m4.label': 'Dubai na Iraq',
  'journey.m4.description': 'Matawi yamefunguliwa Dubai na Iraq.',
  'journey.sustainBadge': 'Uendelevu',
  'journey.sustainStatDesc':
    'Lengo letu la kupunguza uchafuzi unaohusiana na matairi katika utengenezaji na mzunguko wa maisha wa bidhaa.',
  'journey.commitTitleLine1': 'Ahadi inayopimika',
  'journey.commitTitleLine2': 'ya kupunguza uchafuzi.',
  'journey.commitDesc':
    'Tunafanya kazi kupunguza uchafuzi unaohusiana na matairi yetu kwa zaidi ya theluthi moja kupitia ufanisi wa nyenzo, mchanganyiko wa upinzani wa chini wa kuviringika na maisha marefu ya huduma. Ni lengo tunalojiwekea sisi wenyewe, si kauli mbiu.',
  'journey.point1': 'Mchanganyiko wa upinzani wa chini wa kuviringika unaookoa mafuta ya meli',
  'journey.point2': 'Uhai mrefu wa uso wa tairi, ubadilishaji mchache kwa kila maili',
  'journey.point3': 'Ufanisi wa nyenzo uliojengwa katika utengenezaji',
  'journey.taglineDesc':
    'Kanuni iliyo nyuma ya kila uamuzi tunaofanya kutoka malighafi tunazochagua hadi mzunguko wa maisha wa kila tairi linaloondoka viwandani mwetu.',
  'manufacturing.badge': 'Utengenezaji na Utafiti',
  'manufacturing.title': 'Imetengenezwa katika nchi tatu, inaungwa mkono kimataifa.',
  'manufacturing.p1':
    'Matairi yetu yanatengenezwa Vietnam, Thailand na Korea yakileta pamoja uendelezaji wa mchanganyiko, utengenezaji na majaribio makali, kisha yanasambazwa na kuungwa mkono kimataifa kutoka matawi yetu katika Ulaya, Mashariki ya Kati, Afrika na Asia.',
  'manufacturing.p2':
    'Kutoka upinzani wa kuviringika na uvumilivu hadi uthibitisho wa kasi ya juu na mshiko wa mvua, kila muundo unathibitishwa kabla ya kufika kwa meli ya magari.',

  // Tires page
  'tiresPage.badge': 'Aina za Matairi',
  'tiresPage.title': 'Katalogi ya Matairi',
  'tiresPage.description':
    'Chunguza safu yetu kamili ya matairi ya Radial ya magari ya abiria na matairi ya kibiashara, yanayoongozwa na safu yetu ya matairi ya Radial ya malori na mabasi. Chuja kwa ufaaji wako kamili na uliza kwa chini ya mibofyo mitatu.',
  'finder.title': 'Kitafuta Matairi',
  'finder.subtitle.size': 'Tafuta kwa ukubwa na uchanganye tu maadili unayoyajua.',
  'finder.subtitle.vehicle': 'Tafuta kwa gari na uchanganye tu maadili unayoyajua.',
  'finder.bySize': 'Kwa Ukubwa',
  'finder.byVehicle': 'Kwa Gari',
  'finder.width': 'Upana',
  'finder.aspect': 'Uwiano',
  'finder.rim': 'Rimu',
  'finder.axle': 'Ekseli',
  'finder.vehicleType': 'Aina ya Gari',
  'finder.roadType': 'Aina ya Barabara',
  'finder.keyPriority': 'Kipaumbele Muhimu',
  'finder.any': 'Yoyote',
  'finder.find': 'Tafuta Matairi',
  'finder.reset': 'Weka Upya',
  'catalogue.searchPlaceholder': 'Tafuta modeli au ukubwa - mfano 315/80 R22.5',
  'catalogue.allTires': 'Matairi Yote',
  'catalogue.searchModel': 'Tafuta modeli mf. CP521, JP500D',
  'catalogue.searchSize': 'Tafuta ukubwa - mf. 315/80 R22.5',
  'catalogue.viewModels': 'Modeli',
  'catalogue.viewSizes': 'Ukubwa Wote',
  'sizeCard.inch': 'Inchi',
  'sizeCard.loadSpeed': 'LI & SR',
  'sizeCard.maxPsi': 'Psi ya Juu',
  'sizeCard.maxLoad': 'Mzigo wa Juu (lbs)',
  'sizeCard.requestQuote': 'Tazama Vipimo Zaidi',
  'catalogue.resultsCount': 'Inaonyesha matokeo {count}',
  'catalogue.showing': 'Inaonyesha {shown} kati ya modeli {total}',
  'catalogue.emptyNone': 'Hakuna matairi yaliyochapishwa bado. Rudi baadaye.',
  'catalogue.emptyNoMatch': 'Hakuna matairi yanayolingana na utafutaji huo. Jaribu kurekebisha vichujio vyako.',
  'filter.button': 'Chuja na Panga',
  'filter.ply': 'Kiwango cha Tabaka',
  'filter.loadRange': 'Kiwango cha Mzigo',
  'filter.markings': 'Alama',
  'filter.all': 'Yote',
  'filter.ms': 'M+S pekee',
  'filter.pmsf': '3PMSF pekee',
  'filter.regroovable': 'Inayoweza kuchorwa upya',
  'filter.showing': 'Inaonyesha matokeo {count}',
  'filter.clearAll': 'Futa Yote',
  'card.sizes': 'Ukubwa',
  'card.sizeSingular': 'ukubwa',
  'card.sizePlural': 'ukubwa',
  'card.loadSpeed': 'Mzigo/Kasi',
  'card.keyBenefit': 'Faida Kuu',
  'card.viewMore': 'Ona Vipimo na Ukubwa Zaidi',
  'card.fallbackExplore': 'Chunguza vipimo na ukubwa kamili.',
  'card.designedFor': 'Imebuniwa kwa matumizi ya {name}.',

  // Tire detail page
  'tab.performance_indicator': 'Kiashiria Muhimu cha Utendaji',
  'tab.product_features': 'Sifa za Bidhaa',
  'tab.product_description': 'Maelezo ya Bidhaa',
  'tab.size_technical_data': 'Ukubwa/Data ya Kiufundi',
  'tab.recommended_position': 'Aina ya Gari na Nafasi Inayopendekezwa',
  'detail.notFoundTitle': 'Tairi halikupatikana',
  'detail.notFoundDescription': 'Hatukuweza kupata modeli hiyo. Vinjari katalogi kamili badala yake.',
  'detail.notFoundBack': '← Rudi kwenye Katalogi ya Matairi',
  'detail.benefits': 'Faida',
  'detail.defaultCta': 'Omba Nukuu / Bei',
  'detail.downloadSpec': 'Pakua Karatasi ya Vipimo',
  'detail.noPerformance': 'Hakuna data ya utendaji inayopatikana.',
  'detail.noDescription': 'Hakuna maelezo ya bidhaa yanayopatikana.',
  'detail.noSize': 'Hakuna data ya ukubwa inayopatikana.',
  'detail.disclaimer1':
    '• Kampuni yetu ina haki ya kufanya mabadiliko yoyote kwa taarifa yoyote katika katalogi hii, bila taarifa zaidi.',
  'detail.disclaimer2': '• Takwimu zote ni za marejeo, kampuni yetu haiwajibiki kwa makosa ya uchapishaji.',

  // Per-size detail page
  'sizePage.viewDetails': 'Tazama Tairi',
  'sizePage.backTo': 'Rudi kwa',
  'sizePage.specTitle': 'Vipimo Kamili',
  'sizePage.otherSizes': 'Ukubwa Mwingine Unaopatikana',
  'detail.otherOptions': 'Chaguo Nyingine za {category}',
  'detail.positionsError': 'Imeshindwa kupakia data ya nafasi inayopendekezwa.',
  'detail.positionsEmpty': 'Hakuna data ya nafasi inayopendekezwa.',
  'acc1.title': 'Dhamana Kikomo ya Kimataifa',
  'acc1.coverageTitle': 'Ufunikaji na Uadilifu',
  'acc1.coverageBody':
    'Bidhaa zote zinatolewa bila kasoro za ufundi na nyenzo, zikikidhi au kuzidi kanuni za utendaji wa kiufundi na usalama zinazotumika katika nchi ya asili.',
  'acc1.warningLabel': 'Onyo:',
  'acc1.warningBody': 'Dhamana hii haitumiki iwapo bidhaa zimewekwa, kutumika au kuhudumiwa vibaya.',
  'acc1.claimsTitle': 'Madai na Uwajibikaji',
  'acc1.claim1':
    'Kipindi cha Taarifa: Madai ya maandishi yanayoeleza matumizi kamili, uwekaji, hali za kushindwa na data ya ankara lazima yawasilishwe ndani ya siku 90 tangu matumizi ya kwanza, au siku 180 tangu tarehe ya ankara, kipi kirefu zaidi.',
  'acc1.claim2':
    'Ukaguzi: Bidhaa zinazodaiwa lazima zihifadhiwe kwa ukaguzi hadi siku 90. Kurudisha bidhaa kiwandani ni kwa gharama ya mtumiaji; vibadala vilivyoidhinishwa vinatolewa kwa msingi wa CIF.',
  'acc1.claim3':
    'Kikomo: Uwajibikaji umewekewa kikomo kabisa kwa thamani ya bidhaa. Mtengenezaji hawajibiki kwa uharibifu wa kibinafsi au mali; watumiaji lazima wadumishe bima ya kutosha ya uwajibikaji.',
  'acc2.title': 'Maelekezo ya Kuweka Tairi na Mrija wa Ndani',
  'acc2.intro':
    'Kupuliza hewa vibaya, uharibifu wa mgongano, au uwekaji usio sahihi unaweza kusababisha kushindwa kwa mrija, na kusababisha uharibifu wa mali au majeraha ya kibinafsi. Zingatia sikuzote tahadhari zifuatazo:',
  'acc2.item1':
    'Ukubwa: Sikuzote chagua ukubwa sahihi wa mrija kwa matairi yako. Usitumie mrija mkubwa au mdogo kupita kiasi, kwani kukunja na kunyoosha husababisha kushindwa.',
  'acc2.item2':
    'Maandalizi: Safisha kabisa mrija wa ndani na tairi ili kuondoa uchafu na takataka kabla ya kuunganisha. Usitumie tena vali za zamani.',
  'acc2.item3':
    'Ulinganifu: Hakikisha vali imewekwa katikati vizuri na kulingana na tundu la gurudumu. Usikunje au kupinda vali, kwani hii husababisha kupasuka na kubomoka.',
  'acc2.item4':
    'Ulainishaji: Tumia kilainishi kifaacho cha kioevu kati ya gurudumu na tairi kwa uunganishaji laini. Usitumie mafuta, grisi, au vilainishi vya chembe ngumu, ambavyo hubana mrija na kutengeneza matundu madogo.',
  'acc2.item5':
    'Ulinganifu wa Uzito: Sikuzote linganisha magurudumu kikamilifu baada ya kuweka sehemu mpya. Magurudumu yasiyolinganishwa husababisha mtetemo mkali na uzalishaji wa joto hatari.',
  'quote.title': 'Omba Nukuu',
  'quote.subtitle': 'Chagua ukubwa na idadi, kisha wasilisha ombi lako',
  'quote.step1': 'Chagua ukubwa na idadi',
  'quote.selectSizes': 'Chagua ukubwa',
  'quote.qty': 'Idadi',
  'quote.added': 'Zilizoongezwa:',
  'quote.noSizes': 'Hakuna ukubwa ulioongezwa bado.',
  'quote.total': 'Jumla ya Matairi {n}',
  'quote.step2': 'Maelezo yako ya mawasiliano',
  'quote.name': 'Jina',
  'quote.company': 'Kampuni',
  'quote.email': 'Barua pepe',
  'quote.phone': 'Simu',
  'quote.country': 'Nchi',
  'quote.role': 'Wadhifa',
  'quote.rolePlaceholder': 'Wadhifa wako',
  'quote.countryPlaceholder': 'Chagua nchi',
  'quote.replyNote': 'Timu yetu hujibu ndani ya siku 1 ya kazi',
  'quote.submit': 'Wasilisha Ombi',
  'quote.successToast': 'Asante — tumepokea ombi lako na tutathibitisha hivi karibuni.',

  // News page
  'newsPage.title': 'Chumba cha Habari cha J.Planet',
  'newsPage.description':
    'Maonyesho ya biashara, uzinduzi wa bidhaa na habari za kampuni moja kwa moja kutoka sakafuni mwa kiwanda na barabarani.',
  'newsPage.featured': 'Tukio Maalum',
  'newsPage.back': '← Rudi kwenye Habari',
  'newsPage.notFound': 'Makala haipatikani',
  'newsPage.notFoundDesc': 'Hatukuweza kupata makala hiyo. Vinjari chumba cha habari badala yake.',
  'newsCat.all': 'Zote',
  'newsCat.events': 'Matukio',
  'newsCat.product': 'Habari za Bidhaa',
  'newsCat.company': 'Habari za Kampuni',

  // Contact page
  'contactPage.badge': 'Wasiliana',
  'contactPage.title': 'Hebu Tuzungumze Kuhusu Matairi.',
  'contactPage.description':
    'Iwe ni swali la jumla, usambazaji wa meli za magari au ushirikiano wa OEM / chapa binafsi, timu yetu itakuelekeza kwa mtu sahihi.',
  'contact.callTeam': 'Wasiliana nasi',
  'contact.emailUs': 'Tutumie barua pepe',
  'contact.address': 'Anwani',
  'contact.followUs': 'Tufuate',
  'contact.region.uk': 'Uingereza',
  'contact.region.dubai': 'Dubai',
  'contact.region.iraq': 'Iraq',
  'contact.phone.uk': '+44 1902 200269, +44 20 7088 8353',
  'contact.phone.dubai': '+971 4 883 3304',
  'contact.phone.iraq': '+964 775 511 0045',
  'contact.email.uk': 'info@jplanettire.net, info@jplanettire.co.uk',
  'contact.email.dubai': 'info@jplanettire.net',
  'contact.email.iraq': 'info@jplanettire.net',
  'contact.address.uk': 'Unit 1, Ashford Estate, Wolverhampton WV2 2BX, United Kingdom',
  'contact.address.dubai': 'Office No RA07-AA03, Jebel Ali Free Zone, Dubai, United Arab Emirates',
  'contact.address.iraq': 'Al Jawaden Group Company Building, Mishn Complex, Al-Rasheed Camp Road, Baghdad, Iraq',
  'contact.formTitle': 'Fanya ombi',
  'contact.formSubtitle': 'Tuambie unachohitaji, kwa kawaida tunajibu ndani ya siku moja ya kazi.',
  'contact.enquiryType': 'Aina ya ombi',
  'contact.enq.general': 'Ombi la jumla',
  'contact.enq.fleetUk': 'Usambazaji wa meli za magari - Uingereza na Ulaya',
  'contact.enq.fleetDubai': 'Usambazaji wa meli za magari - Dubai',
  'contact.enq.fleetIraq': 'Usambazaji wa meli za magari - Iraq',
  'contact.enq.partnership': 'Ushirikiano wa biashara',
  'contact.consentPrivacy': 'Nakubali J.Planet Tire kuchakata data yangu binafsi kujibu ombi hili, kwa mujibu wa',
  'contact.consentPrivacyLink': 'Sera ya Faragha.',
  'contact.consentNewsletter':
    'Niendelee kupata taarifa kuhusu bidhaa mpya, matangazo, habari za sekta na matukio kutoka J.Planet Tire. (unaweza kujiondoa wakati wowote.)',
  'form.fullName': 'Jina Kamili',
  'form.company': 'Kampuni',
  'form.workEmail': 'Barua pepe ya Kazi',
  'form.phone': 'Simu',
  'form.message': 'Ujumbe wako',
  'form.messagePlaceholder': 'Ukubwa, idadi, sehemu, au maelezo ya ushirikiano',
  'form.namePlaceholder': 'Jane Doe',
  'form.companyPlaceholder': 'Jina la Kampuni',
  'form.emailPlaceholder': 'You@company.com',
  'form.phonePlaceholder': 'Nambari yako',
  'form.send': 'Tuma Ombi',
  'form.sending': 'Inatumwa…',
  'contact.successToast': 'Asante — tumepokea ujumbe wako na tutawasiliana nawe hivi karibuni.',

  // Exhibition (RTX) page
  'rtx.badge': 'Kuonyesha katika Road Transport Expo 2026',
  'rtx.titleLine1': 'Kutana na J.Planet',
  'rtx.titleLine2': 'Tire katika RTX 2026',
  'rtx.dates': 'Tarehe',
  'rtx.datesValue': 'Jumanne 30 Juni – Alhamisi 2 Julai 2026',
  'rtx.location': 'Mahali',
  'rtx.formTitle': 'Jaza fomu',
  'rtx.name': 'Jina*',
  'rtx.company': 'Kampuni',
  'rtx.role': 'Wadhifa',
  'rtx.rolePlaceholder': 'Wadhifa wako',
  'rtx.email': 'Barua pepe*',
  'rtx.phone': 'Simu*',
  'rtx.spokenWith': 'Ulizungumza na*',
  'rtx.selectMember': 'Chagua Mwanachama wa Timu....',
  'rtx.feedback': 'Maoni/Mrejesho',
  'rtx.feedbackPlaceholder': 'Maswali yoyote, mahitaji ya matairi, au maelezo kutoka mazungumzo.',
  'rtx.success': 'Asante! Maelezo yako yamewasilishwa.',
  'rtx.errSelect': 'Tafadhali chagua mwanachama wa timu.',
  'rtx.errGeneric': 'Kitu kimeenda vibaya. Tafadhali jaribu tena.',
  'rtx.submitting': 'Inawasilisha...',
  'rtx.submit': 'Wasilisha',

  // Legal layout
  'legal.questions': 'Maswali kuhusu sera hii? Tuma barua pepe',
  'legal.ukOr': '(Uingereza) au',
  'legal.uae': '(UAE).',
  'legal.backHome': '← Rudi nyumbani',

  // 404 page
  'nf.badge': '404 · Ukurasa Haupatikani',
  'nf.title': 'Njia hii imetoka nje ya mstari.',
  'nf.description':
    'Ukurasa unaoutafuta huenda umehamishwa, umebadilishwa jina, au kiungo kinaweza kuwa si sahihi. Rudi kwenye katalogi au nyumbani ili kuendelea kuvinjari J.Planet Tire.',
  'nf.browse': 'Vinjari Matairi',
  'nf.home': 'Nenda Nyumbani',
  'nf.back': 'Rudi ukurasa uliopita',
  'nf.explore': 'Au chunguza',
};
