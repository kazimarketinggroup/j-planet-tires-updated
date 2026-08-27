import type { TranslationKey } from './translations';

// Kurdish (Kurmanji, Latin script) UI dictionary. Industry acronyms are
// transliterated/expanded per project preference. Any missing key falls back to
// English at lookup time.
export const ku: Partial<Record<TranslationKey, string>> = {
  // Navbar
  'topbar.tagline': 'Lastîkên PCR û TBR yên çêkirî li Viyetnam, Tayland û Koreyê.',
  'nav.home': 'Serûpel',
  'nav.about': 'Derbarê me',
  'nav.tires': 'Lastîk',
  'nav.allTires': 'Hemû Lastîk',
  'nav.news': 'Nûçe',
  'nav.contact': 'Têkilî',
  'nav.getQuote': 'Bihayê bistîne',

  // Home — hero
  'hero.badge': 'Hilberînerê PCR û TBR · Ewropa | Rojhilata Navîn | Afrîka | Asya - BAZIRGANÎ',
  'hero.titleLine1': 'Hevkarê Te yê Pêbawer',
  'hero.titleLine2': 'Ji bo Mezinbûnê',
  'hero.description':
    'Lastîkên Radiala Erebeya Rêwiyan (PCR) û Radiala Kamyon û Otobusê (TBR) yên ji bo pozîsyonên birêvebir, ajotin û kişandinê hatine çêkirin.',
  'hero.cta': 'Lastîkên xwe bibîne',
  'hero.stat1.value': '10M',
  'hero.stat1.label': 'Lastîkên radial ên salane têne hilberandin',
  'hero.stat2.value': '3',
  'hero.stat2.label': 'Cihên hilberînê: Viyetnam, Tayland û Kore',
  'hero.stat3.value': '35% ↓',
  'hero.stat3.label': 'Kêmkirina armanckirî ya emîsyonên girêdayî lastîkan (heta 2030)',
  'hero.stat4.value': 'Gerdûnî',
  'hero.stat4.label': 'Belavkirin li seranserê Ewropa, Rojhilata Navîn, Afrîka û Asyayê',
  'hero.accreditationsTitle': 'Pejirandin û Lihevkirin',
  'accreditation.ece': 'Bi ECE R54 pejirandî',
  'accreditation.ukca': 'Bi UKCA / E-Mark pejirandî',
  'accreditation.iso9001': 'ISO 9001:2015',
  'accreditation.iso14001': 'ISO 14001',

  // Home — about
  'about.badge': 'Em Kî ne',
  'about.title': 'Hilberînerê serbixwe yê lastîkên bazirganî ku ji bo bazirganiyê hatiye avakirin.',
  'about.p1':
    'J.Planet Tire hilberînerê serbixwe yê lastîkên bazirganî ye ku navenda wê li Bexdayê, Iraqê ye, bi nivîsgehên şaxan li Brîtanya, Dubai, Kenya, Urdun û Çînê. Em lastîkên PCR û TBR ji bo pozîsyonên birêvebir, ajotin, kişandin û otobusan dîzayn dikin û peyda dikin.',
  'about.p2':
    'Bi pisporiya kûr di hilberîna TBR de ji bo sektora barhilgirî û fîloyê li seranserê Ewropa, Rojhilata Navîn, Afrîka û Asyayê, em ji bo fîloyan çareseriyên lastîkê yên pêbawer û bi kalîte peyda dikin, bi pîvanê mezin.',
  'about.cta': 'Bêtir Fêr Bibe',

  // Home — why choose
  'why.badge': 'Çima J.Planet',
  'why.title': 'Çar sedem çima kirroxên bazirganî me hildibijêrin',
  'why.r1.title': 'Çalakiya Fîloyê',
  'why.r1.description':
    'Lastîkên ji bo çalakiya fîloyê hatine çêkirin, bi qezencên pîvanbar di mesafe û emrê tapanê de li ser pozîsyonên birêvebir, ajotin û kişandinê.',
  'why.r2.title': 'Hevkariyên Demdirêj',
  'why.r2.description':
    'Em bawer in ku têkiliyên demdirêj bi hemû xerîdarên xwe re li seranserê Ewropa, Rojhilata Navîn, Afrîka û Asyayê ava dikin.',
  'why.r3.title': 'Tîma Pispor',
  'why.r3.description':
    'Dehsalan zanîna hilberîna PCR û TBR, ji dîzayna pêkhateyê heta piştgiriya lihevanîna taybet bi eksê.',
  'why.r4.title': 'Teknolojiya Zîrek',
  'why.r4.description':
    'Avakirina radiala nûjen û standardên ceribandinê ku kalîteyê li her cihê hilberînê domdar dihêlin.',

  // Home — who we work with
  'workWith.badge': 'Em Bi Kê re Dixebitin',
  'workWith.titleLine1': 'Ji bo fîloyan hatiye çêkirin.',
  'workWith.titleLine2': 'Ji bo belavkeran hatiye çêkirin.',
  'workWith.a1.title': 'Karbidestên Fîloyê û Şirketên Barhilgirî',
  'workWith.a1.description':
    'Hûn hewceyê peydakirina pêbawer, lihevanîna rast a eksê û bihayên bazirganî yên hevrikî ne bêyî aloziyê. Tîma me ya bazirganî ya gerdûnî pirsên rasterast li seranserê Ewropa, Rojhilata Navîn, Afrîka û Asyayê bi bersivdana lezgîn û stoka domdar li ser hemû pozîsyonan birêve dibe.',
  'workWith.a2.title': 'Firotgerên Mezin û Belavker',
  'workWith.a2.description':
    'Em her tim li peydakirina firotgerên nû li seranserê Ewropa, Rojhilata Navîn, Afrîka û Asyayê digerin. Li bendê be bihayên bazirganî yên hevrikî, stoka pêbawer a ku hûn dikarin bi bawerî bifiroşin, û tîmeke hevkariyê ku serlêdana we rasterast birêve dibe.',
  'workWith.cta': 'Bi tîma hevkariya me re biaxive',

  // Home — build programme
  'programme.badge': 'Alavên Orîjînal û Markaya Taybet',
  'programme.title': 'Rasterast ji hilberîner bikire',
  'programme.description':
    'Em navbeynkar nîn in. Ji ber ku em rêza xwe ya PCR û TBR li Viyetnam, Tayland û Koreyê dîzayn û hilberînin, hûn kalîteya domdar, peydakirina pêbawer û bihayên xurt distînin, ku ji hêla tîma me ya bazirganiya navneteweyî ve tê piştgirî kirin.',
  'programme.cta': 'Bihayê bistîne',

  // Home — where we operate
  'operate.badge': 'Hebûna Me ya Gerdûnî',
  'operate.title': 'Em Li Ku Dixebitin',
  'operate.hq': 'Navenda Sereke',
  'operate.branch': 'Şax',
  'operate.me.region': 'Rojhilata Navîn',
  'operate.me.note': 'Navenda gerdûnî, bazirganî û operasyon',
  'operate.me.iraq': 'Iraq',
  'operate.me.dubai': 'Dubai',
  'operate.me.jordan': 'Urdun',
  'operate.europe.region': 'Ewropa',
  'operate.europe.country': 'Brîtanya',
  'operate.europe.note': 'Operasyonên bazirganî li Brîtanya û Yekîtiya Ewropayê',
  'operate.africa.region': 'Afrîka',
  'operate.africa.country': 'Kenya',
  'operate.africa.note': 'Xizmeta fîloyên Afrîkaya Rojhilat û Afrîkaya Jêr-Saharayê',
  'operate.asia.region': 'Asya',
  'operate.asia.country': 'Çîn',
  'operate.asia.note': 'Peydakirin, kalîte û pêwendiya hilberînê',
  'operate.fullDetails': 'Navnîşaneke taybet hewce ye? Hemû hûrgiliyên têkiliyê bibîne →',

  // Home — sustainability & news
  // Home — tire range
  'range.badge': 'Rêze',
  'range.title1': 'Yek pispority.',
  'range.title2': 'Her pozîsyona eksê.',
  'range.viewAll': 'Hemû Lastîkan Bibîne',
  'range.explore': 'Lastîkan Bibîne →',
  'range.pcr.tag': 'Radiala Erebeya Rêwiyan',
  'range.pcr.title': 'Lastîkên PCR/SUV',
  'range.pcr.description':
    'Li Koreyê hatine çêkirin, ji bo rehetî, girtina zuwa û emrê tapanê yê dirêj li erebeyên piçûk û navîn hatine sêwirandin.',
  'range.tbr.tag': 'Radiala Kamyon û Otobusê',
  'range.tbr.title': 'Lastîkên TBR',
  'range.tbr.description':
    'Li Tayland û Viyetnamê hatine çêkirin, ji bo pozîsyonên birêvebir, ajotin, kişandin û otobusê li fîloyên bazirganî hatine avakirin.',
  'range.otr.tag': 'Avakirin û Karê Giran',
  'range.otr.title': 'Lastîkên OTR',
  'range.otr.description':
    'Ji bo cihên xebatê yên xîzik, herî û asfalt hatine sêwirandin, bi kêlekên bihêzkirî yên ji bo fîloyên avakirinê yên giran.',

  'sustainability.title':
    '35%↓ Kêmkirina armanckirî ya emîsyonên girêdayî lastîkan li seranserê hilberîn û jiyana berhemê me.',
  'sustainability.tagline': 'Em ji xwezayê hez dikin. Em qedrê çavkaniyan digirin.',
  'sustainability.description':
    'Domdarî ne tiştekî aliyî ye, ew di nav awayê hilberîna me de hatiye avakirin. Ji karîgeriya materyalê heta pêkhateyên tapanê yên dirêj-emir, em soz didin ku şopa her fîloyê ku em peyda dikin kêm bikin bêyî ku em performansa ku kirroxên bazirganî bi wê ve girêdayî ne kêm bikin.',
  'news.title': 'Nûçe û Medya',
  'news.readMore': 'Bêtir Bixwîne →',
  'news.n1.date': '12 Gulan 2026',
  'news.n1.title': 'J.Planet Tire li Automechanika Dubai 2026 Pêşan Dide',
  'news.n1.description':
    'J.Planet Tire bi serbilindî beşdarî Automechanika Dubai bû, bi pisporên pîşesaziyê yên gerdûnî re têkilî danî û teknolojiyên xwe yên nû yên lastîkan, berhemên premyûm û soza xwe ya nûavakirinê li bazara otomotîvê ya navneteweyî pêşkêş kir.',
  'news.n1.body1':
    'J.Planet Tire bi serkeftî beşdarî Automechanika Dubai bû, yek ji pêşangehên pêşeng ên piştî-firotanê yên otomotîvê li Rojhilata Navîn. Di dema bûyerê de, şirket bi xêrhatina belavker, hevkar û mêvanên ji seranserê cîhanê pêşwazî kir da ku çareseriyên xwe yên nû yên lastîkan ji bo erebeyên rêwiyan, wesayîtên bazirganî û sepanên pîşesaziyê bikolin.',
  'news.n1.body2':
    'Pêşangeh derfeteke hêja peyda kir ji bo xurtkirina hevkariyên heyî, avakirina têkiliyên nû yên bazirganî û nîşandana soza J.Planet Tire ji bo kalîte, performans û nûavakirina domdar di pîşesaziya lastîkan a gerdûnî de.',
  'news.n2.date': '8 Sibat 2026',
  'news.n2.title': 'J.Planet Tire li Pêşangeha Latin Tyre & Auto Parts',
  'news.n2.description':
    'J.Planet Tire çareseriyên xwe yên nû yên lastîkan li Pêşangeha Latin Tyre & Auto Parts pêşkêş kir, bi pisporên pîşesaziyê re têkilî danî û hebûna xwe li bazara otomotîvê ya Amerîkaya Latîn berfireh kir.',
  'news.n2.body1':
    'J.Planet Tire beşdarî Pêşangeha Latin Tyre & Auto Parts bû, rêze berhemên xwe yên nû yên lastîkan ji kirrox, belavker û pisporên otomotîvê yên ji seranserê Amerîkaya Latîn û derveyî wê re pêşkêş kir.',
  'news.n2.body2':
    'Di seranserê pêşangehê de, şirket bal kişand ser kalîteya hilberînê, teknolojiya pêşketî û çareseriyên li ser xerîdar navendkirî, digel avakirina hevkariyên hêja bi karsaziyên navneteweyî re. Bûyerê soza J.Planet Tire ji bo berfirehkirina toreya xwe ya gerdûnî û peydakirina çareseriyên lastîkan ên pêbawer ji xerîdarên li seranserê cîhanê xurt kir.',
  'news.n3.date': '3 Tîrmeh 2026',
  'news.n3.title': 'J. Planet Tires li Pêşangeha Veguhastina Rê 2026 Hat Pêşandan',
  'news.n3.description':
    'Pêşangehek serketî li Stenda GR13, NAEC Stoneleigh, bi girêdana bi pisporên veguhastinê yên ji seranserê pîşesaziyê re.',
  'news.n3.body1':
    'J. Planet Tires serbilind bû ku li Pêşangeha Veguhastina Rê (RTX) 2026 li NAEC Stoneleigh beşdar bû, li wir me li stenda xwe pêşwazî li xebitandekarên filoyan, belavker, pisporên veguhastinê û hevkarên pîşesaziyê kir.',
  'news.n3.body2':
    'Di seranserê bûyerê de, tîma me çareseriyên xwe yên nû yên lastîkên bazirganî pêşkêş kir, li ser meylên pîşesaziyê nîqaş kir, û bi mêvanên ji seranserê Keyaniya Yekbûyî û derveyî wê re têkilî danî. RTX derfetek hêja pêşkêş kir ji bo xurtkirina têkiliyên heyî, nasandina berhemên me ji xerîdarên nû re, û guhertina ramanan bi pisporên sektora veguhastina rê re.',
  'news.n3.body3':
    'Em dixwazin spasiya her kesê ku serdana Stenda GR13 kir û wextê xwe ji bo hevdîtinê bi tîma me re veqetand bikin. Em ji eleqeya we ya bi J. Planet Tires re minetdar in û em li benda berdewamkirina axaftinan û avakirina hevkariyên mayînde ne.',

  // Home — CTA banner
  'cta.title': 'Ka em J.Planet li ser fîloya te bicî bikin.',
  'cta.description':
    'Çi hûn hewceyê lihevanîna lastîkê ji bo birêvebir, ajotin an kişandinê bin, an jî me wekî hevkarekî hilberînê binirxînin, tîma me ya bazirganî ya gerdûnî li seranserê Iraq, Brîtanya, Dubai, Kenya, Urdun û Çînê amade ye ku biaxive.',
  'cta.enquire': 'Pirs bike',
  'cta.partner': 'Bibe Hevkarê Bazirganî',

  // Footer
  'footer.description':
    'Lastîkên PCR û TBR yên çêkirî li Viyetnam, Tayland û Koreyê ji bo fîloyên bazirganî, ku li Brîtanya, Ewropa, Dubai û Iraqê têne firotin û piştgirî kirin.',
  'footer.explore': 'Vekole',
  'footer.legal': 'Qanûnî',
  'footer.contactUs': 'Bi me re têkilî daynin',
  'footer.terms': 'Merc û Şert',
  'footer.privacy': 'Polîtîkaya Nihêniyê',
  'footer.warranty': 'Polîtîkaya Garantiyê',
  'footer.copyright': 'Mafê kopîkirinê © {year} J. Planet Tire',
  'footer.rights': 'Hemû maf parastî ne',

  // Common
  'common.viewMore': 'Bêtir Bibîne',
  'common.comingSoon': 'Bi zûtirîn tê',

  // About page
  'aboutPage.badge': 'Derbarê J.Planet Tire',
  'aboutPage.titleLine1': 'Standardên Hilberînê',
  'aboutPage.titleLine2': 'Ku Kirroxên Bazirganî Dikarin Pê Bawer Bibin.',
  'aboutPage.h1.title': 'Ceribandî, ne texmînkirî',
  'aboutPage.h1.description': 'her rêz berî ku bigihîje fîloyekê di ceribandina radiala navneteweyî re derbas dibe.',
  'aboutPage.h2.title': 'Peydakirina domdar',
  'aboutPage.h2.description': 'Operasyonên bazirganî yên gerdûnî ji şaxên me li Brîtanya, Dubai, Iraq, Urdun, Kenya û Çînê têne birêvebirin.',
  'aboutPage.h3.title': 'Piştgiriya rasterast a hilberîner',
  'aboutPage.h3.description': 'Tîma me dê rasterast piştgirî bide karsaziya te.',
  'mission.badge': 'Mîsyona Me',
  'mission.titleLine1': 'Li dora tenduristiya demdirêj,',
  'mission.titleLine2': 'ewlehî û domdariyê hatiye avakirin.',
  'mission.p1':
    'J.Planet Tire hilberînerê serbixwe yê lastîkên bazirganî ye ku navenda wê li Bexdayê, Iraqê ye, bi şaxan li Brîtanya, Dubai, Kenya, Urdun û Çînê. Em lastîkên radiala erebeya rêwiyan (PCR), lastîkên radiala kamyon û otobusê (TBR) ji bo birêvebir, ajotin, kişandin û otobus/koçê dîzayn û çêdikin ku li cihên hevkarên me li Viyetnam, Tayland û Koreyê têne hilberandin.',
  'mission.p2':
    'Bi pisporiya kûr di markaya taybet û pêşxistina Alavên Orîjînal de, em alîkariya şirketên barhilgirî, karbidestên otobusê û firotgerên fîloyê li seranserê Ewropa, Rojhilata Navîn, Afrîka û Asyayê dikin ku fîloyên xwe bi lastîkên guncan piştgirî bikin, bi pîvanê mezin.',
  'journey.badge': 'Rêwîtiya Me',
  'journey.title': 'Kevçîkên Bîranînê',
  'journey.m1.label': 'VN · TH',
  'journey.m1.description': 'Hilberîna radial li Viyetnam û Taylandê kok girtiye.',
  'journey.m2.label': 'Wolverhampton',
  'journey.m2.description': 'Navenda belavkirin û piştgiriya Brîtanya hatiye avakirin.',
  'journey.m3.label': '2026',
  'journey.m3.description': 'Pêşandana navneteweyî li Automechanika Dubai.',
  'journey.m4.label': 'Dubai û Iraq',
  'journey.m4.description': 'Şax li Dubai û Iraqê hatine vekirin.',
  'journey.sustainBadge': 'Domdarî',
  'journey.sustainStatDesc':
    'Kêmkirina armanca me di emîsyonên girêdayî lastîkan de li seranserê hilberîn û jiyana berhemê.',
  'journey.commitTitleLine1': 'Sozeke pîvanbar',
  'journey.commitTitleLine2': 'ji bo kêmkirina emîsyonan.',
  'journey.commitDesc':
    'Em dixebitin ku emîsyonên girêdayî lastîkên me ji sêyekê zêdetir kêm bikin bi karîgeriya materyalê, pêkhateyên bergiriya-gerîna-kêm û emrê xizmetê yê dirêjtir. Armancek ku em xwe pê ve girêdidin, ne dirûşmek.',
  'journey.point1': 'Pêkhateyên bergiriya-gerîna-kêm ku sotemeniya fîloyê xilas dikin',
  'journey.point2': 'Emrê tapanê yê dirêjtir, guhertinên kêmtir li her mîlê',
  'journey.point3': 'Karîgeriya materyalê di nav hilberînê de hatiye avakirin',
  'journey.taglineDesc':
    'Prensîba li paş her biryara ku em digirin ji materyalên xav ên ku em hildibijêrin heta jiyana her lastîkê ku ji kargehên me derdikeve.',
  'manufacturing.badge': 'Hilberîn û Lêkolîn & Pêşxistin',
  'manufacturing.title': 'Li sê welatan hatiye çêkirin, li gerdûnî piştgirî tê kirin.',
  'manufacturing.p1':
    'Lastîkên me li Viyetnam, Tayland û Koreyê têne çêkirin, pêşxistina pêkhateyê, avakirin û ceribandina hişk tîne cem hev, paşê ji şaxên me li seranserê Ewropa, Rojhilata Navîn, Afrîka û Asyayê li gerdûnî têne belavkirin û piştgirî kirin.',
  'manufacturing.p2':
    'Ji bergiriya-gerînê û bîhnfirehiyê heta pejirandina bilez-û wet-grip, her nexş berî ku bigihîje fîloyekê tê îspatkirin.',

  // Tires page
  'tiresPage.badge': 'Rêze',
  'tiresPage.title': 'Kataloga Lastîkan',
  'tiresPage.description':
    'Rêze temam a lastîkên radiala erebeya rêwiyan û lastîkên bazirganî me bikolin, ku ji hêla rêza me ya Radiala Kamyon û Otobusê ve tê rêberî kirin. Li gorî lihevanîna xwe ya rast fîltir bike û di bin sê klîkan de pirs bike.',
  'finder.title': 'Lastîk-dîtin',
  'finder.subtitle.size': 'Li gorî pîvanê bigere û tenê nirxên ku tu dizanî bike yek.',
  'finder.subtitle.vehicle': 'Li gorî wesayîtê bigere û tenê nirxên ku tu dizanî bike yek.',
  'finder.bySize': 'Li gorî Pîvanê',
  'finder.byVehicle': 'Li gorî Wesayîtê',
  'finder.width': 'Firehî',
  'finder.aspect': 'Rêje',
  'finder.rim': 'Cant',
  'finder.axle': 'Eks',
  'finder.vehicleType': 'Cureyê Wesayîtê',
  'finder.roadType': 'Cureyê Rê',
  'finder.keyPriority': 'Pêşînîya Sereke',
  'finder.any': 'Herçi',
  'finder.find': 'Lastîkan Bibîne',
  'finder.reset': 'Ji nû ve saz bike',
  'catalogue.searchPlaceholder': 'Model an pîvanê bigere - mînak 315/80 R22.5',
  'catalogue.allTires': 'Hemû Lastîk',
  'catalogue.searchModel': 'Li modelê bigere mînak CP521, JP500D',
  'catalogue.searchSize': 'Li mezinahiyê bigere - mînak 315/80 R22.5',
  'catalogue.viewModels': 'Model',
  'catalogue.viewSizes': 'Hemû Mezinahî',
  'sizeCard.inch': 'Înç',
  'sizeCard.loadSpeed': 'LI & SR',
  'sizeCard.maxPsi': 'Herî Zêde Psi',
  'sizeCard.maxLoad': 'Barê Herî Zêde (lbs)',
  'sizeCard.requestQuote': 'Zêdetir Taybetmendî Bibîne',
  'catalogue.resultsCount': '{count} encam têne nîşandan',
  'catalogue.showing': '{shown} ji {total} modelan têne nîşandan',
  'catalogue.emptyNone': 'Hîn lastîk nehatine weşandin. Paşê vegere.',
  'catalogue.emptyNoMatch': 'Ti lastîk bi wê lêgerînê re nagunce. Fîltirên xwe biguherîne.',
  'filter.button': 'Fîltir & Rêzkirin',
  'filter.ply': 'Rêjeya Ply',
  'filter.loadRange': 'Rêza Barê',
  'filter.markings': 'Nîşan',
  'filter.all': 'Hemû',
  'filter.ms': 'Tenê M+S',
  'filter.pmsf': 'Tenê 3PMSF',
  'filter.regroovable': 'Ji nû ve şûnkarî',
  'filter.showing': '{count} encam têne nîşandan',
  'filter.clearAll': 'Hemî paqij bike',
  'card.sizes': 'Pîvan',
  'card.sizeSingular': 'pîvan',
  'card.sizePlural': 'pîvan',
  'card.loadSpeed': 'Bar/Lez',
  'card.keyBenefit': 'Feydeya Sereke',
  'card.viewMore': 'Zêdetir Taybetmendî & Pîvan Bibîne',
  'card.fallbackExplore': 'Taybetmendî û pîvanên temam bikole.',
  'card.designedFor': 'Ji bo sepanên {name} hatiye çêkirin.',

  // Tire detail page
  'tab.performance_indicator': 'Nîşana Performansa Sereke',
  'tab.product_features': 'Taybetmendiyên Berhemê',
  'tab.product_description': 'Danasîna Berhemê',
  'tab.size_technical_data': 'Pîvan/Daneyên Teknîkî',
  'tab.recommended_position': 'Cureyê Wesayît & Pozîsyona Pêşniyarkirî',
  'detail.notFoundTitle': 'Lastîk nehat dîtin',
  'detail.notFoundDescription': 'Me ew model nedît. Li şûna wê kataloga temam bikole.',
  'detail.notFoundBack': '← Vegere Kataloga Lastîkan',
  'detail.benefits': 'Feyde',
  'detail.defaultCta': 'Bihayê / Nirxê Bixwaze',
  'detail.downloadSpec': 'Pelê Taybetmendiyê Daxîne',
  'detail.noPerformance': 'Ti daneya performansê tune.',
  'detail.noDescription': 'Ti danasîna berhemê tune.',
  'detail.noSize': 'Ti daneya pîvanê tune.',
  'detail.disclaimer1':
    '• Şirketa me mafê wê heye ku her guhertinê li ser her agahiyê di vê katalogê de bêyî agahdariya din bike.',
  'detail.disclaimer2': '• Hemû hejmar ji bo referansê ne, şirketa me ji xeletiyên çapê berpirsiyar nîne.',

  // Per-size detail page
  'sizePage.viewDetails': 'Lastîkê Bibîne',
  'sizePage.backTo': 'Vegere',
  'sizePage.specTitle': 'Taybetmendiyên Tevahî',
  'sizePage.otherSizes': 'Mezinahiyên Din ên Berdest',
  'detail.otherOptions': 'Vebijarkên din ên {category}',
  'detail.positionsError': 'Barkirina daneya pozîsyona pêşniyarkirî ne mumkin bû.',
  'detail.positionsEmpty': 'Ti daneya pozîsyona pêşniyarkirî tune.',
  'acc1.title': 'Garantiya Sînordar a Gerdûnî',
  'acc1.coverageTitle': 'Pêçan & Yekparetî',
  'acc1.coverageBody':
    'Hemû berhem bêyî kêmasiyên di karûbar û materyalê de têne peydakirin, ku rêzikên performansa teknîkî û ewlehiyê yên li welatê jêderê digihîjin an jî ji wan derbas dibin.',
  'acc1.warningLabel': 'Hişyarî:',
  'acc1.warningBody': 'Ev garantî nayê sepandin heke berhem bi awayekî çewt bêne saz kirin, bikaranîn an xizmet kirin.',
  'acc1.claimsTitle': 'Daxwaz & Berpirsiyarî',
  'acc1.claim1':
    'Dema Agahdarkirinê: Daxwazên nivîskî yên ku bikaranîn, sazkirin, mercên têkçûnê û daneya fatûreyê bi tevahî diyar dikin divê di nav 90 rojan ji sepana yekem, an 180 rojan ji dîroka fatûreyê, kîjan dirêjtir be, bêne şandin.',
  'acc1.claim2':
    'Vekolîn: Berhemên daxwazkirî divê heta 90 rojan ji bo vekolînê bêne parastin. Vegera berheman a kargehê li ser lêçûna bikarhêner e; berdêlên pejirandî li ser bingeha CIF têne peydakirin.',
  'acc1.claim3':
    'Sînordarkirin: Berpirsiyarî bi tundî bi nirxê berhemê ve sînordar e. Hilberîner ji zirarên kesane an milkî berpirsiyar nîne; bikarhêner divê bîmeya berpirsiyariyê ya têra xwe bihêlin.',
  'acc2.title': 'Talîmatên Sazkirina Lastîk & Lûleya Hundir',
  'acc2.intro':
    'Bahdayîna çewt, zirara lêdanê, an sazkirina nerast dikare bibe sedema têkçûna lûleyê, ku dibe sedema zirara milkî an birîndarbûna kesane. Her tim li van tedbîran miqate be:',
  'acc2.item1':
    'Pîvankirin: Her tim pîvanên rast ên lûleyê ji bo lastîkên xwe hilbijêre. Lûleyên mezintir an biçûktir bikar neyîne, ji ber ku qatkirin û dirêjkirin dibin sedema têkçûnê.',
  'acc2.item2':
    'Amadekirin: Berî civandinê lûleya hundir û lastîkê baş paqij bike da ku qir û bermayî bêne rakirin. Tu carî navika valfê ya kevn ji nû ve bikar neyîne.',
  'acc2.item3':
    'Rêzkirin: Piştrast be ku valf bi rêkûpêk navendî ye û bi qulika teker re hevaheng e. Valfê qat neke an nezivirîne, ji ber ku ev dibe sedema qetandin û qelîştinê.',
  'acc2.item4':
    'Rûnkirin: Rûnkerekî şil ê rast di navbera teker û lastîkê de ji bo civandina hêsan bikar bîne. Tu carî rûn, bez, an rûnkerên bi parçeyên hişk bikar neyîne, ku lûleyan diçikînin û qulikên biçûk çêdikin.',
  'acc2.item5':
    'Hevsengkirin: Piştî sazkirina beşên nû her tim tekeran baş hevseng bike. Tekerên nehevseng dibin sedema lerzîna dijwar û hilberîna germahiya xeternak.',
  'quote.title': 'Bihayê Bixwaze',
  'quote.subtitle': 'Pîvan û hejmaran hilbijêre, paşê pirsa xwe bişîne',
  'quote.step1': 'Pîvan & hejmaran hilbijêre',
  'quote.selectSizes': 'Pîvanan hilbijêre',
  'quote.qty': 'Hejmar',
  'quote.added': 'Zêdekirî:',
  'quote.noSizes': 'Hîn ti pîvan nehatiye zêdekirin.',
  'quote.total': 'Bi tevahî {n} Lastîk',
  'quote.step2': 'Hûrgiliyên têkiliya te',
  'quote.name': 'Nav',
  'quote.company': 'Şirket',
  'quote.email': 'E-name',
  'quote.phone': 'Telefon',
  'quote.country': 'Welat',
  'quote.role': 'Rol',
  'quote.rolePlaceholder': 'Rola te',
  'quote.countryPlaceholder': 'Welatê hilbijêre',
  'quote.replyNote': 'Tîma me di nav 1 roja kar de bersiv dide',
  'quote.submit': 'Pirsê Bişîne',
  'quote.successToast': 'Spas — me daxwaza we wergirt û em ê zû piştrast bikin.',

  // News page
  'newsPage.title': 'Odeya Nûçeyan a J.Planet',
  'newsPage.description':
    'Pêşangehên bazirganî, destpêkirinên berheman û nûçeyên şirketê rasterast ji erdê kargehê û ji rê.',
  'newsPage.featured': 'Bûyera Taybet',
  'newsPage.back': '← Vegere Nûçeyan',
  'newsPage.notFound': 'Gotar nehat dîtin',
  'newsPage.notFoundDesc': 'Me ew gotar nedît. Li şûna wê odeya nûçeyan bikole.',
  'newsCat.all': 'Hemû',
  'newsCat.events': 'Bûyer',
  'newsCat.product': 'Nûçeyên Berhemê',
  'newsCat.company': 'Nûçeyên Şirketê',

  // Contact page
  'contactPage.badge': 'Têkilî',
  'contactPage.title': 'Ka em li ser Lastîkan biaxivin.',
  'contactPage.description':
    'Pirsa giştî, peydakirina fîloyê an hevkariya OEM / Markaya Taybet — tîma me ya gerdûnî li seranserê Rojhilata Navîn, Ewropa, Afrîka û Asyayê dê te ber bi kesê rast ve rêber bike.',
  'contact.callTeam': 'Bi me re têkilî daynin',
  'contact.emailUs': 'E-name ji me re bişîne',
  'contact.address': 'Navnîşan',
  'contact.followUs': 'Me bişopîne',
  'contact.region.uk': 'Brîtanya',
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
  'contact.formTitle': 'Pirsekê bike',
  'contact.formSubtitle': 'Ji me re bêje çi hewce ye, em bi gelemperî di nav rojeke kar de bersiv didin.',
  'contact.enquiryType': 'Cureyê pirsê',
  'contact.enq.general': 'Pirsa giştî',
  'contact.enq.fleetUk': 'Peydakirina fîloyê - Brîtanya & Ewropa',
  'contact.enq.fleetDubai': 'Peydakirina fîloyê - Dubai',
  'contact.enq.fleetIraq': 'Peydakirina fîloyê - Iraq',
  'contact.enq.partnership': 'Hevkariya bazirganî',
  'contact.consentPrivacy': 'Ez razî me ku J.Planet Tire daneyên min ên kesane ji bo bersivdana vê pirsê hilberîne, li gorî',
  'contact.consentPrivacyLink': 'Polîtîkaya Nihêniyê.',
  'contact.consentNewsletter':
    'Min derbarê berhemên nû, kampanya, nûçeyên pîşesaziyê û bûyerên J.Planet Tire de agahdar bike. (tu dikarî her dem betal bikî.)',
  'form.fullName': 'Navê Temam',
  'form.company': 'Şirket',
  'form.workEmail': 'E-nameya Kar',
  'form.phone': 'Telefon',
  'form.message': 'Peyama te',
  'form.messagePlaceholder': 'Pîvan, hejmar, beş, an hûrgiliyên hevkariyê',
  'form.namePlaceholder': 'Jane Doe',
  'form.companyPlaceholder': 'Navê Şirketê',
  'form.emailPlaceholder': 'Tu@sirket.com',
  'form.phonePlaceholder': 'Hejmara te',
  'form.send': 'Pirsê Bişîne',
  'form.sending': 'Tê şandin…',
  'contact.successToast': 'Spas — me peyama we wergirt û em ê zû bi we re têkilî daynin.',

  // Exhibition (RTX) page
  'rtx.badge': 'Pêşandan li Road Transport Expo 2026',
  'rtx.titleLine1': 'Bi J.Planet re bicive',
  'rtx.titleLine2': 'Tire li RTX 2026',
  'rtx.dates': 'Dîrok',
  'rtx.datesValue': 'Sêşem 30 Hezîran – Pêncşem 2 Tîrmeh 2026',
  'rtx.location': 'Cih',
  'rtx.formTitle': 'Formê tije bike',
  'rtx.name': 'Nav*',
  'rtx.company': 'Şirket',
  'rtx.role': 'Rol',
  'rtx.rolePlaceholder': 'Rola te',
  'rtx.email': 'E-name*',
  'rtx.phone': 'Telefon*',
  'rtx.spokenWith': 'Bi kê re axivî*',
  'rtx.selectMember': 'Endamê tîmê hilbijêre....',
  'rtx.feedback': 'Şîrove/Bersiv',
  'rtx.feedbackPlaceholder': 'Her pirs, pêwîstiyên lastîkan, an notên ji axaftinê.',
  'rtx.success': 'Spas! Hûrgiliyên te hatin şandin.',
  'rtx.errSelect': 'Ji kerema xwe endamekî tîmê hilbijêre.',
  'rtx.errGeneric': 'Tiştek çewt çû. Ji kerema xwe dîsa biceribîne.',
  'rtx.submitting': 'Tê şandin...',
  'rtx.submit': 'Bişîne',

  // Legal layout
  'legal.questions': 'Pirs derbarê vê polîtîkayê? E-name bişîne',
  'legal.ukOr': '(Brîtanya) an',
  'legal.uae': '(EAY).',
  'legal.backHome': '← Vegere serûpelê',

  // 404 page
  'nf.badge': '404 · Rûpel Nehat Dîtin',
  'nf.title': 'Ev rê ji tapanê der e.',
  'nf.description':
    'Rûpela ku tu lê digerî dibe ku hatibe guhertin, navê wê hatibe guhertin, an girêdan çewt be. Vegere katalogê an vegere malê da ku J.Planet Tire bikolî.',
  'nf.browse': 'Lastîkan Bikole',
  'nf.home': 'Here Malê',
  'nf.back': 'Vegere rûpela berê',
  'nf.explore': 'An bikole',
};
