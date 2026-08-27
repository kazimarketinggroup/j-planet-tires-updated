// UI string dictionaries for the public site. English is the source of truth;
// Arabic mirrors the same keys for the Middle East / Iraq branch. Missing Arabic
// keys fall back to English at lookup time (see LanguageContext). Other languages
// (Kurdish, Chinese, Kiswahili) are machine-translated from English on demand.
export type { Lang } from './languages';

const en = {
  // Navbar
  'topbar.tagline': 'PCR tires manufactured in Korea | TBR & OTR tires manufactured in Vietnam & Thailand',
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.tires': 'Tires',
  'nav.allTires': 'All Tires',
  'nav.news': 'News',
  'nav.contact': 'Contact',
  'nav.getQuote': 'Get a Quote',

  // Home — hero
  'hero.badge': 'PCR & tbr Manufacturer  ·  Europe | Middle East | Africa | Asia - TRADE',
  'hero.titleLine1': 'Your Trusted Tire',
  'hero.titleLine2': 'Partner For Growth',
  'hero.description':
    'Passenger Car Radial and Truck & Bus Radial (TBR) tires  engineered for steer, drive and trailer positions.',
  'hero.cta': 'Find your tires',
  'hero.stat1.value': '10M',
  'hero.stat1.label': 'Radial tires produced annually',
  'hero.stat2.value': '3',
  'hero.stat2.label': 'Manufacturing origins Vietnam, Thailand and Korea',
  'hero.stat3.value': '35% ↓',
  'hero.stat3.label': 'Targeted cut in tire-related emissions (by 2030)',
  'hero.stat4.value': 'Global',
  'hero.stat4.label': 'Distribution across Europe, Middle East, Africa & Asia',
  'hero.accreditationsTitle': 'Accreditations & Compliance',
  'accreditation.ece': 'ECE R54 Certified',
  'accreditation.ukca': 'UKCA / E-Mark Approved',
  'accreditation.iso9001': 'ISO 9001:2015',
  'accreditation.iso14001': 'ISO 14001',

  // Home — about
  'about.badge': 'Who We Are',
  'about.title': 'An independent commercial tire manufacturer built for trade.',
  'about.p1':
    'J.Planet Tire is an independent commercial tire manufacturer headquartered in Baghdad, Iraq, with branch offices in the UK, Dubai, Kenya, Jordan and China. We design, manufacture and supply passenger car radial (PCR) tires, Truck (TBR) tires for steer, drive, trailer and bus/coach fitments and Off The Road tires (OTR).',
  'about.p2':
    'With deep expertise in TBR production for the haulage and fleet sector across the Europe, Middle East, Africa & Asia, we keep the right rubber on the road, at scale.',
  'about.cta': 'Learn More',

  // Home — why choose
  'why.badge': 'Why J.Planet',
  'why.title': 'Four reasons trade buyers choose us',
  'why.r1.title': 'Fleet Uptime',
  'why.r1.description':
    'Tires engineered for fleet uptime measurable gains in mileage and tread life across steer, drive and trailer positions.',
  'why.r2.title': 'Partnerships',
  'why.r2.description':
    'We believe in building long lasting relationships with all of our customers across Europe, the Middle East, Africa and Asia.',
  'why.r3.title': 'Expert Team',
  'why.r3.description':
    'Decades of PCR, TBR and OTR manufacturing know-how, from compound design to axle-specific fitment support.',
  'why.r4.title': 'Smart Technology',
  'why.r4.description':
    'Modern radial construction & testing standards that keep quality consistent across every production site.',

  // Home — who we work with
  'workWith.badge': 'Who We Work With',
  'workWith.titleLine1': 'Built for fleets.',
  'workWith.titleLine2': 'Built for distributors.',
  'workWith.a1.title': 'Fleet Operators & Haulage Companies',
  'workWith.a1.description':
    'You need reliable supply, correct axle fitment and  competitive trade pricing without the runaround.  Our global trade team handles enquiries directly across Europe, Middle East, Africa and Asia with fast quote  turnaround and consistent stock across steer, drive,  trailer and bus/coach positions.',
  'workWith.a2.title': 'Wholesalers & Distributors',
  'workWith.a2.description':
    "We're always looking to onboard new resellers across  the Europe, Middle East, Africa and Asia. Expect competitive  trade pricing, dependable stock you can sell on with  confidence, and a partnerships team that handles your  application directly with a fast turnaround.",
  'workWith.cta': 'Talk to our partnerships team',

  // Home — build programme
  'programme.badge': 'Original Equipment & Private Label',
  'programme.title': 'Buy direct from the manufacturer',
  'programme.description':
    "We're not a middleman, because we design and manufacture  our own PCR and TBR range. So you  get consistent quality, dependable supply and strong  pricing backed by trade Europe, Middle East and Africa who know the product inside out.",
  'programme.cta': 'Get A Quote',

  // Home — where we operate
  'operate.badge': 'Our Global Presence',
  'operate.title': 'Where We Operate',
  'operate.hq': 'Headquarters',
  'operate.branch': 'Branch',
  // Middle East hub card
  'operate.me.region': 'Middle East',
  'operate.me.note': 'Global HQ, trade and operations',
  'operate.me.iraq': 'Iraq',
  'operate.me.dubai': 'Dubai',
  'operate.me.jordan': 'Jordan',
  // Regional cards
  'operate.europe.region': 'Europe',
  'operate.europe.country': 'United Kingdom',
  'operate.europe.note': 'UK & EU trade operations',
  'operate.africa.region': 'Africa',
  'operate.africa.country': 'Kenya',
  'operate.africa.note': 'Serving East and Sub-Saharan African fleets',
  'operate.asia.region': 'Asia',
  'operate.asia.country': 'China',
  'operate.asia.note': 'Sourcing, quality and manufacturing liaison',
  'operate.fullDetails': 'Need a specific address? See full contact details →',

  // Home — tire range
  'range.badge': 'The Range',
  'range.title1': 'One specialism.',
  'range.title2': 'Every axle position.',
  'range.viewAll': 'View All Tires',
  'range.explore': 'Explore the Tires →',
  'range.pcr.tag': 'Passenger Car Radial',
  'range.pcr.title': 'PCR Tires',
  'range.pcr.description':
    'Manufactured in Korea, engineered for comfort, dry grip and long tread life across compact and mid-size cars.',
  'range.tbr.tag': 'Truck & Bus Radial',
  'range.tbr.title': 'TBR Tires',
  'range.tbr.description':
    'Manufactured in Thailand & Vietnam, built for steer, drive, trailer and bus/coach positions across commercial fleets.',
  'range.otr.tag': 'Construction & Heavy-Duty',
  'range.otr.title': 'OTR Tires',
  'range.otr.description':
    'Engineered for gravel, mud and paved job sites, with reinforced sidewalls built for heavy-duty construction fleets.',

  // Home — sustainability & news
  'sustainability.title':
    '35%↓ Targeted reduction in tire-related emissions across our manufacturing and product lifecycle.',
  'sustainability.tagline': 'We love nature. We value resources.',
  'sustainability.description':
    "Sustainability isn't a side note it's built into how we manufacture. From material efficiency to long-life tread compounds, we're committed to lowering the footprint of every fleet we supply without compromising the performance trade buyers depend on.",
  'news.title': 'News & Media',
  'news.readMore': 'Read More →',
  'news.n1.date': '12 May 2026',
  'news.n1.title': 'J.Planet Tire Exhibits at Automechanika Dubai 2026',
  'news.n1.description':
    'J.Planet Tire proudly participated in Automechanika Dubai, connecting with global industry professionals and showcasing its latest tire technologies, premium products, and commitment to innovation in the international automotive market.',
  'news.n1.body1':
    "J.Planet Tire successfully participated in Automechanika Dubai, one of the Middle East's leading automotive aftermarket exhibitions. During the event, the company welcomed distributors, partners, and visitors from around the world to explore its latest tire solutions for passenger cars, commercial vehicles, and industrial applications.",
  'news.n1.body2':
    "The exhibition provided an excellent opportunity to strengthen existing partnerships, establish new business relationships, and demonstrate J.Planet Tire's commitment to quality, performance, and continuous innovation in the global tire industry.",
  'news.n2.date': '8 Feb 2026',
  'news.n2.title': 'J.Planet Tire at Latin Tyre & Auto Parts Expo',
  'news.n2.description':
    'J.Planet Tire showcased its latest tire solutions at the Latin Tyre & Auto Parts Expo, engaging with industry professionals and expanding its presence across the Latin American automotive market.',
  'news.n2.body1':
    'J.Planet Tire participated in the Latin Tyre & Auto Parts Expo, presenting its latest range of tire products to buyers, distributors, and automotive professionals from across Latin America and beyond.',
  'news.n2.body2':
    "Throughout the exhibition, the company highlighted its focus on quality manufacturing, advanced technology, and customer-focused solutions while building valuable partnerships with international businesses. The event reinforced J.Planet Tire's commitment to expanding its global network and delivering reliable tire solutions to customers worldwide.",
  'news.n3.date': '3 July 2026',
  'news.n3.title': 'J. Planet Tires Showcased at Road Transport Expo 2026',
  'news.n3.description':
    'A successful exhibition at Stand GR13, NAEC Stoneleigh, connecting with transport professionals from across the industry.',
  'news.n3.body1':
    'J. Planet Tires was proud to exhibit at the Road Transport Expo (RTX) 2026 at NAEC Stoneleigh, where we welcomed fleet operators, distributors, transport professionals, and industry partners to our stand.',
  'news.n3.body2':
    'Throughout the event, our team showcased our latest commercial tyre solutions, discussed industry trends, and connected with visitors from across the UK and beyond. RTX provided an excellent opportunity to strengthen existing relationships, introduce our products to new customers, and exchange ideas with professionals from across the road transport sector.',
  'news.n3.body3':
    'We would like to thank everyone who visited Stand GR13 and took the time to meet with our team. We appreciate your interest in J. Planet Tires and look forward to continuing the conversations and building lasting partnerships.',

  // Home — CTA banner
  'cta.title': "Let's put J.Planet on your fleet.",
  'cta.description':
    "Whether you need tire fitment for steer, drive or trailer  positions, or you're evaluating us as a manufacturing  partner, our global trade team based across the Iraq, UK, Dubai, Kenya, Jordan and China ready to talk.",
  'cta.enquire': 'Enquire',
  'cta.partner': 'Become a Trade Partner',

  // Footer
  'footer.description':
    'PCR and Truck & Bus Radial (TBR) tires manufactured in Vietnam, Thailand and Korea for commercial fleets sold and supported across the UK, Europe, Dubai and Iraq.',
  'footer.explore': 'Explore',
  'footer.legal': 'Legal',
  'footer.contactUs': 'Contact Us',
  'footer.terms': 'Terms and Conditions',
  'footer.privacy': 'Privacy Policy',
  'footer.warranty': 'Warranty Policy',
  'footer.copyright': 'Copyright © {year} J. Planet Tire',
  'footer.rights': 'All Rights Reserved',

  // Common
  'common.viewMore': 'View More',
  'common.comingSoon': 'Coming soon',

  // About page
  'aboutPage.badge': 'About J.Planet Tire',
  'aboutPage.titleLine1': 'Manufacturing Standards',
  'aboutPage.titleLine2': 'Trade Buyers Can Rely On.',
  'aboutPage.h1.title': 'Tested, not assumed',
  'aboutPage.h1.description': 'every line goes through international radial testing before it reaches a fleet.',
  'aboutPage.h2.title': 'Consistent supply',
  'aboutPage.h2.description': 'Global trade operations run from our branches in UK, Dubai, Iraq, Jordan, Kenya and China.',
  'aboutPage.h3.title': 'Direct manufacturer support',
  'aboutPage.h3.description': 'Our team will directly support your business.',
  'mission.badge': 'Our Mission',
  'mission.titleLine1': 'Built around long-term health,',
  'mission.titleLine2': 'safety and sustainability.',
  'mission.p1':
    'J.Planet Tire is an independent commercial tire manufacturer and distributor headquartered in Wolverhampton, UK with branches across the Dubai and Iraq. We design and supply Passenger Car Radial tires, Truck & Bus Radial (TBR) tires steer, drive, trailer and bus/coach fitments manufactured across our partner facilities in Vietnam, Thailand and Korea.',
  'mission.p2':
    'With deep expertise in private branding and Original Equipment development, we help haulage companies, bus operators and fleet wholesalers across  Europe, Middle East, Africa & Asia to keep the right rubber on the road, at scale.',
  'journey.badge': 'Our Journey',
  'journey.title': 'Milestones',
  'journey.m1.label': 'VN · TH',
  'journey.m1.description': 'Radial manufacturing rooted in Vietnam & Thailand.',
  'journey.m2.label': 'Wolverhampton',
  'journey.m2.description': 'UK distribution & support base established.',
  'journey.m3.label': '2026',
  'journey.m3.description': 'Exhibiting internationally at Automechanika Dubai.',
  'journey.m4.label': 'Dubai & Iraq',
  'journey.m4.description': 'Branches opened across Dubai & Iraq.',
  'journey.sustainBadge': 'Sustainability',
  'journey.sustainStatDesc':
    'Our target reduction in tire-related emissions across manufacturing and product lifecycle.',
  'journey.commitTitleLine1': 'A measurable commitment',
  'journey.commitTitleLine2': 'to lower emissions.',
  'journey.commitDesc':
    "We're working to cut the emissions associated with our tires by more than a third through material efficiency, lower-rolling-resistance compounds and longer service life. A target we hold ourselves to, not a slogan.",
  'journey.point1': 'Lower-rolling-resistance compounds that save fleet fuel',
  'journey.point2': 'Longer tread life, fewer replacements per mile',
  'journey.point3': 'Material efficiency built into manufacturing',
  'journey.taglineDesc':
    'The principle behind every decision we make from the raw materials we choose to the lifecycle of every tire that leaves our factories.',
  'manufacturing.badge': 'Manufacturing & R&D',
  'manufacturing.title': 'Engineered across three countries, supported globally.',
  'manufacturing.p1':
    'Our tires are manufactured in Vietnam, Thailand  and Korea bringing compound development, building and rigorous  testing together then distributed and supported globally  from our   branches across Europe, Middle East, Africa & Asia.',
  'manufacturing.p2':
    'From rolling-resistance and endurance to high-speed and wet-grip validation, every pattern is proven before it reaches a fleet.',

  // Tires page
  'tiresPage.badge': 'The Range',
  'tiresPage.title': 'Tire Catalogue',
  'tiresPage.description':
    'Explore our complete range of passenger car radial tires, commercial tires, led by our Truck & Bus Radial range. Filter by your exact fitment and enquire in under three clicks.',
  'finder.title': 'Tire Finder',
  'finder.subtitle.size': 'Search by size and combine only the values you know.',
  'finder.subtitle.vehicle': 'Search by vehicle and combine only the values you know.',
  'finder.bySize': 'By Size',
  'finder.byVehicle': 'By Vehicle',
  'finder.width': 'Width',
  'finder.aspect': 'Aspect',
  'finder.rim': 'Rim',
  'finder.axle': 'Axle',
  'finder.vehicleType': 'Vehicle Type',
  'finder.roadType': 'Road Type',
  'finder.keyPriority': 'Key Priority',
  'finder.any': 'Any',
  'finder.find': 'Find Tires',
  'finder.reset': 'Reset',
  'catalogue.searchPlaceholder': 'Search model or size - e.g. 315/80 R22.5',
  'catalogue.searchModel': 'Search model e.g. CP521, JP500D',
  'catalogue.searchSize': 'Search size - e.g. 315/80 R22.5',
  'catalogue.allTires': 'All Tires',
  'catalogue.resultsCount': 'Showing {count} results',
  // Models / All Sizes view toggle
  'catalogue.viewModels': 'Models',
  'catalogue.viewSizes': 'All Sizes',
  // Size card
  'sizeCard.inch': 'Inch',
  'sizeCard.loadSpeed': 'LI & SR',
  'sizeCard.maxPsi': 'Max. Psi',
  'sizeCard.maxLoad': 'Max. Load (lbs)',
  'sizeCard.requestQuote': 'View More Specs',
  'catalogue.showing': 'Showing {shown} of {total} models',
  'catalogue.emptyNone': 'No published tires yet. Check back soon.',
  'catalogue.emptyNoMatch': 'No tires match that search. Try adjusting your filters.',
  'filter.button': 'Filter & Sort',
  'filter.ply': 'Ply Rating',
  'filter.loadRange': 'Load Range',
  'filter.markings': 'Markings',
  'filter.all': 'All',
  'filter.ms': 'M+S only',
  'filter.pmsf': '3PMSF only',
  'filter.regroovable': 'Regroovable',
  'filter.showing': 'Showing {count} result(s)',
  'filter.clearAll': 'Clear All',
  'card.sizes': 'Sizes',
  'card.sizeSingular': 'size',
  'card.sizePlural': 'sizes',
  'card.loadSpeed': 'Load/Speed',
  'card.keyBenefit': 'Key Benefit',
  'card.viewMore': 'View More Specs & Sizes',
  'card.fallbackExplore': 'Explore full specs and sizes.',
  'card.designedFor': 'Designed for {name} applications.',

  // Tire detail page
  'tab.performance_indicator': 'Key Performance Indicator',
  'tab.product_features': 'Product Features',
  'tab.product_description': 'Product Description',
  'tab.size_technical_data': 'Size/Technical Data',
  'tab.recommended_position': 'Recommended Vehicle Type & Position',
  'detail.notFoundTitle': 'Tire not found',
  'detail.notFoundDescription': "We couldn't find that model. Browse the full catalogue instead.",
  'detail.notFoundBack': '← Back to Tire Catalogue',
  'detail.benefits': 'Benefits',
  'detail.defaultCta': 'Request Quote / Pricing',
  'detail.downloadSpec': 'Download Spec Sheet',
  'detail.noPerformance': 'No performance data available.',
  'detail.noDescription': 'No product description available.',
  'detail.noSize': 'No size data available.',
  'detail.disclaimer1':
    '• Our company is entitled to make any change on any information in this catalogue, without further notice.',
  'detail.disclaimer2': '• All figures are for reference, our company is not responsible for printing errors.',

  // Per-size detail page
  'sizePage.viewDetails': 'View Tire',
  'sizePage.backTo': 'Back to',
  'sizePage.specTitle': 'Full Specification',
  'sizePage.otherSizes': 'Other Available Sizes',
  'detail.otherOptions': 'Other {category} Options',
  'detail.positionsError': 'Unable to load recommended position data.',
  'detail.positionsEmpty': 'No recommended position data available.',
  'acc1.title': 'Global Limited Warranty',
  'acc1.coverageTitle': 'Coverage & Integrity',
  'acc1.coverageBody':
    'All products are delivered free from defects in workmanship and material, meeting or exceeding technical performance and safety regulations in force within the country of origin.',
  'acc1.warningLabel': 'Warning:',
  'acc1.warningBody': 'This warranty does not apply if products are improperly installed, used, or serviced.',
  'acc1.claimsTitle': 'Claims & Liability',
  'acc1.claim1':
    'Notice Period: Written claims detailing full usage, installation, failure conditions, and invoice data must be submitted within 90 days of first application, or 180 days from the invoice date, whichever is longer.',
  'acc1.claim2':
    "Inspection: Claimed products must be held for inspection for up to 90 days. Product returns to the plant are at the user's expense; approved replacements are delivered on a CIF basis.",
  'acc1.claim3':
    'Limitation: Liability is strictly limited to the product value. The manufacturer is not liable for personal or property damages; users must maintain adequate liability insurance.',
  'acc2.title': 'Tire & Inner Tube Mounting Instructions',
  'acc2.intro':
    'Improper inflation, impact damage, or incorrect mounting can cause tube failures, leading to property damage or personal injury. Always adhere to the following precautions:',
  'acc2.item1':
    'Sizing: Always select the proper tube sizes for your tires. Do not use oversized or undersized tubes, as folding and stretching cause failures.',
  'acc2.item2':
    'Preparation: Thoroughly clean the inner tube and tire to remove dirt and debris before assembly. Never reuse old valve cores.',
  'acc2.item3':
    'Alignment: Ensure the valve is properly centred and aligned with the wheel hole. Do not fold or twist the valve, as this causes tearing and cracking.',
  'acc2.item4':
    'Lubrication: Use a proper liquid lubricant between the wheel and tire for smooth assembly. Never use oil, grease, or hard particle lubricants, which pinch tubes and create pinholes.',
  'acc2.item5':
    'Balancing: Always balance wheels thoroughly after fitting new components. Unbalanced wheels cause severe vibration and hazardous heat generation.',
  'quote.title': 'Request Quote',
  'quote.subtitle': 'Select sizes and quantities, then submit your enquiry',
  'quote.step1': 'Select sizes & quantities',
  'quote.selectSizes': 'Select sizes',
  'quote.qty': 'Qty',
  'quote.added': 'Added:',
  'quote.noSizes': 'No sizes added yet.',
  'quote.total': 'Total {n} Tires',
  'quote.step2': 'Your contact details',
  'quote.name': 'Name',
  'quote.company': 'Company',
  'quote.email': 'Email',
  'quote.phone': 'Phone',
  'quote.country': 'Country',
  'quote.role': 'Role',
  'quote.rolePlaceholder': 'Your Role',
  'quote.countryPlaceholder': 'Select country',
  'quote.replyNote': 'Our team responds within 1 working day',
  'quote.submit': 'Submit Enquiry',
  'quote.successToast': "Thanks — we've received your booking request and will confirm shortly.",

  // News page
  'newsPage.title': 'The J.Planet Newsroom',
  'newsPage.description':
    'Trade shows, product launches and company news straight from the factory floor and the road.',
  'newsPage.featured': 'Featured Event',
  'newsPage.back': '← Back to News',
  'newsPage.notFound': 'Article not found',
  'newsPage.notFoundDesc': "We couldn't find that article. Browse the newsroom instead.",
  'newsCat.all': 'All',
  'newsCat.events': 'Events',
  'newsCat.product': 'Product News',
  'newsCat.company': 'Company News',

  // Contact page
  'contactPage.badge': 'Contact',
  'contactPage.title': "Let's Talk Tires.",
  'contactPage.description':
    'General enquiry or fleet supply our global team across the Middle East, Europe, Africa and Asia will point you to the right person.',
  'contact.callTeam': 'Contact us',
  'contact.emailUs': 'Email us',
  'contact.address': 'Address',
  'contact.followUs': 'Follow Us',
  'contact.region.uk': 'UK',
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
  'contact.formTitle': 'Make an enquiry',
  'contact.formSubtitle': 'Tell us what you need we typically reply within one business day.',
  'contact.enquiryType': 'Enquiry type',
  'contact.enq.general': 'General enquiry',
  'contact.enq.fleetUk': 'Fleet supply - UK & Europe',
  'contact.enq.fleetDubai': 'Fleet supply - Dubai',
  'contact.enq.fleetIraq': 'Fleet supply - Iraq',
  'contact.enq.partnership': 'Trade partnership',
  'contact.consentPrivacy': 'I agree to J.Planet Tire processing my personal data to respond to this enquiry, in accordance with the',
  'contact.consentPrivacyLink': 'Privacy Policy.',
  'contact.consentNewsletter':
    'Keep me updated on new products, promotions industry news and events from J.Planet Tire. (you can unsubscribe anytime.)',
  'form.fullName': 'Full Name',
  'form.company': 'Company',
  'form.workEmail': 'Work Email',
  'form.phone': 'Phone',
  'form.message': 'Your message',
  'form.messagePlaceholder': 'Sizes, quantities, segments, or partnership details',
  'form.namePlaceholder': 'Jane Doe',
  'form.companyPlaceholder': 'Company Name',
  'form.emailPlaceholder': 'You@company.com',
  'form.phonePlaceholder': 'Your number',
  'form.send': 'Send Enquiry',
  'form.sending': 'Sending…',
  'contact.successToast': "Thanks — we've received your message and will be in touch shortly.",

  // Exhibition (RTX) page
  'rtx.badge': 'Exhibiting at Road Transport Expo 2026',
  'rtx.titleLine1': 'Meet J.Planet',
  'rtx.titleLine2': 'Tire at RTX 2026',
  'rtx.dates': 'Dates',
  'rtx.datesValue': 'Tuesday 30 June – Thursday 2 July 2026',
  'rtx.location': 'Location',
  'rtx.formTitle': 'Fill the form',
  'rtx.name': 'Name*',
  'rtx.company': 'Company',
  'rtx.role': 'Role',
  'rtx.rolePlaceholder': 'Your Role',
  'rtx.email': 'Email*',
  'rtx.phone': 'Phone*',
  'rtx.spokenWith': 'Spoken with*',
  'rtx.selectMember': 'Select Team Member....',
  'rtx.feedback': 'Comment/Feedback',
  'rtx.feedbackPlaceholder': 'Any questions, tire requirements, or notes from the conversation.',
  'rtx.success': 'Thanks! Your details have been submitted.',
  'rtx.errSelect': 'Please select a team member.',
  'rtx.errGeneric': 'Something went wrong. Please try again.',
  'rtx.submitting': 'Submitting...',
  'rtx.submit': 'Submit',

  // Legal layout
  'legal.questions': 'Questions about this policy? Email',
  'legal.ukOr': '(UK) or',
  'legal.uae': '(UAE).',
  'legal.backHome': '← Back to home',

  // 404 page
  'nf.badge': '404 · Page Not Found',
  'nf.title': 'This route is off the tread.',
  'nf.description':
    "The page you're looking for may have moved, been renamed, or the link may be incorrect. Head back to the catalogue or return home to keep browsing J.Planet Tire.",
  'nf.browse': 'Browse Tires',
  'nf.home': 'Go Home',
  'nf.back': 'Back to previous page',
  'nf.explore': 'Or explore',
};

const ar: Partial<Record<TranslationKey, string>> = {
  // Navbar
  'topbar.tagline': 'إطارات ريديال للشاحنات والحافلات وسيارات الركاب مُصنَّعة في فيتنام وتايلاند وكوريا.',
  'nav.home': 'الرئيسية',
  'nav.about': 'من نحن',
  'nav.tires': 'الإطارات',
  'nav.allTires': 'كل الإطارات',
  'nav.news': 'الأخبار',
  'nav.contact': 'اتصل بنا',
  'nav.getQuote': 'اطلب عرض سعر',

  // Home — hero
  'hero.badge': 'مصنِّع إطارات PCR وTBR · أوروبا | الشرق الأوسط | أفريقيا | آسيا',
  'hero.titleLine1': 'شريكك الموثوق في الإطارات',
  'hero.titleLine2': 'لتحقيق النمو',
  'hero.description':
    'إطارات ريديال لسيارات الركاب (PCR) وإطارات ريديال للشاحنات والحافلات (TBR) مصممة لمحاور التوجيه والدفع والمقطورات. تُصنَّع إطاراتنا في فيتنام وتايلاند وكوريا.',
  'hero.cta': 'اعثر على إطاراتك',
  'hero.stat1.value': '10M',
  'hero.stat1.label': 'إطار ريديال يُنتَج سنوياً',
  'hero.stat2.value': '3',
  'hero.stat2.label': 'مواقع التصنيع في فيتنام وتايلاند وكوريا',
  'hero.stat3.value': '35% ↓',
  'hero.stat3.label': 'خفض مستهدف في الانبعاثات المرتبطة بالإطارات (بحلول 2030)',
  'hero.stat4.value': 'عالمي',
  'hero.stat4.label': 'التوزيع عبر أوروبا والشرق الأوسط وأفريقيا وآسيا',
  'hero.accreditationsTitle': 'الاعتمادات والامتثال',
  'accreditation.ece': 'معتمد ECE R54',
  'accreditation.ukca': 'معتمد UKCA / E-Mark',
  'accreditation.iso9001': 'ISO 9001:2015',
  'accreditation.iso14001': 'ISO 14001',

  // Home — about
  'about.badge': 'من نحن',
  'about.title': 'مصنع مستقل لإطارات المركبات التجارية، مبني للتجارة.',
  'about.p1':
    'جي بلانيت تاير هي شركة مستقلة لتصنيع إطارات المركبات التجارية، يقع مقرها الرئيسي في بغداد، العراق، مع فروع في المملكة المتحدة ودبي وكينيا والأردن والصين. نصمم ونورّد إطارات ريديال لسيارات الركاب وإطارات الشاحنات (TBR) لمحاور التوجيه والدفع والمقطورات والحافلات.',
  'about.p2':
    'بخبرة عميقة في إنتاج إطارات الشاحنات والحافلات (TBR) لقطاع النقل والأساطيل عبر أوروبا والشرق الأوسط وأفريقيا وآسيا، نوفّر الإطارات المناسبة للأساطيل التجارية على نطاق واسع.',
  'about.cta': 'اعرف المزيد',

  // Home — why choose
  'why.badge': 'لماذا جي بلانيت',
  'why.title': 'أربعة أسباب تجعل المشترين التجاريين يختاروننا',
  'why.r1.title': 'جاهزية الأسطول',
  'why.r1.description':
    'إطارات مصممة لجاهزية الأسطول مع مكاسب ملموسة في المسافة المقطوعة وعمر المداس عبر محاور التوجيه والدفع والمقطورات.',
  'why.r2.title': 'شراكات طويلة الأمد',
  'why.r2.description':
    'نؤمن ببناء علاقات طويلة الأمد مع جميع عملائنا عبر أوروبا والشرق الأوسط وأفريقيا وآسيا.',
  'why.r3.title': 'فريق خبير',
  'why.r3.description':
    'عقود من الخبرة في تصنيع إطارات PCR وTBR، من تصميم المركّبات المطاطية إلى دعم التركيب حسب المحور.',
  'why.r4.title': 'تقنية ذكية',
  'why.r4.description':
    'بناء ريديال حديث ومعايير اختبار تحافظ على جودة ثابتة في كل مواقع الإنتاج.',

  // Home — who we work with
  'workWith.badge': 'مع من نعمل',
  'workWith.titleLine1': 'مصممة للأساطيل.',
  'workWith.titleLine2': 'ومصممة للموزعين.',
  'workWith.a1.title': 'مشغّلو الأساطيل وشركات النقل',
  'workWith.a1.description':
    'تحتاجون إلى توريد موثوق وتركيب صحيح حسب المحور وأسعار تجارية تنافسية دون تعقيدات. يتعامل فريقنا التجاري العالمي مع الاستفسارات مباشرة عبر أوروبا والشرق الأوسط وأفريقيا وآسيا، مع سرعة في تقديم عروض الأسعار ومخزون ثابت لمحاور التوجيه والدفع والمقطورات والحافلات.',
  'workWith.a2.title': 'تجار الجملة والموزعون',
  'workWith.a2.description':
    'نحن نرحب دائماً بشركاء بيع جدد عبر أوروبا والشرق الأوسط وأفريقيا وآسيا. توقّع أسعاراً تجارية تنافسية، ومخزوناً موثوقاً يمكنك بيعه بثقة، وفريق شراكات يتعامل مع طلبك مباشرة وبسرعة في الاستجابة.',
  'workWith.cta': 'تحدث إلى فريق الشراكات لدينا',

  // Home — build programme
  'programme.badge': 'المعدات الأصلية والعلامات الخاصة',
  'programme.title': 'اشترِ مباشرة من المصنّع',
  'programme.description':
    'نحن لسنا وسيطاً. فبما أننا نصمم ونصنّع تشكيلتنا الخاصة من إطارات PCR وTBR في فيتنام وتايلاند وكوريا، تحصل على جودة ثابتة وتوريد موثوق وأسعار قوية، مدعومة بفريقنا التجاري الدولي الذي يعرف المنتج تمام المعرفة.',
  'programme.cta': 'اطلب عرض سعر',

  // Home — where we operate
  'operate.badge': 'حضورنا العالمي',
  'operate.title': 'أين نعمل',
  'operate.hq': 'المقر الرئيسي',
  'operate.branch': 'فرع',
  'operate.me.region': 'الشرق الأوسط',
  'operate.me.note': 'المقر الرئيسي العالمي والتجارة والعمليات',
  'operate.me.iraq': 'العراق',
  'operate.me.dubai': 'دبي',
  'operate.me.jordan': 'الأردن',
  'operate.europe.region': 'أوروبا',
  'operate.europe.country': 'المملكة المتحدة',
  'operate.europe.note': 'عمليات تجارية في المملكة المتحدة والاتحاد الأوروبي',
  'operate.africa.region': 'أفريقيا',
  'operate.africa.country': 'كينيا',
  'operate.africa.note': 'خدمة أساطيل شرق أفريقيا وجنوب الصحراء',
  'operate.asia.region': 'آسيا',
  'operate.asia.country': 'الصين',
  'operate.asia.note': 'التوريد والجودة والتنسيق التصنيعي',
  'operate.fullDetails': 'تحتاج عنواناً محدداً؟ اطّلع على تفاصيل الاتصال الكاملة ←',

  // Home — sustainability & news
  // Home — tire range
  'range.badge': 'المجموعة',
  'range.title1': 'تخصص واحد.',
  'range.title2': 'لكل موضع محور.',
  'range.viewAll': 'عرض جميع الإطارات',
  'range.explore': 'استكشف الإطارات ←',
  'range.pcr.tag': 'إطارات شعاعية لسيارات الركاب',
  'range.pcr.title': 'إطارات PCR/SUV',
  'range.pcr.description':
    'مصنوعة في كوريا، ومصممة للراحة والتماسك على الطرق الجافة وعمر مداس طويل للسيارات الصغيرة والمتوسطة.',
  'range.tbr.tag': 'إطارات شعاعية للشاحنات والحافلات',
  'range.tbr.title': 'إطارات TBR',
  'range.tbr.description':
    'مصنوعة في تايلاند وفيتنام، مبنية لمواضع التوجيه والدفع والمقطورة والحافلات عبر الأساطيل التجارية.',
  'range.otr.tag': 'البناء والخدمة الشاقة',
  'range.otr.title': 'إطارات OTR',
  'range.otr.description':
    'مصممة للحصى والطين والطرق المعبّدة، بجدران جانبية معزّزة مبنية لأساطيل البناء الشاقة.',

  'sustainability.title':
    '35%↓ خفض مستهدف في الانبعاثات المرتبطة بالإطارات عبر التصنيع ودورة حياة المنتج.',
  'sustainability.tagline': 'نحب الطبيعة. ونُقدّر الموارد.',
  'sustainability.description':
    'الاستدامة ليست تفصيلاً جانبياً بل جزء من طريقة تصنيعنا. من كفاءة المواد إلى مركّبات المداس طويلة العمر، نلتزم بخفض البصمة البيئية لكل أسطول نورّده دون المساس بالأداء الذي يعتمد عليه المشترون التجاريون.',
  'news.title': 'الأخبار والإعلام',
  'news.readMore': 'اقرأ المزيد ←',
  'news.n1.date': '12 مايو 2026',
  'news.n1.title': 'جي بلانيت تاير تشارك في معرض أوتوميكانيكا دبي 2026',
  'news.n1.description':
    'شاركت جي بلانيت تاير بفخر في معرض أوتوميكانيكا دبي، حيث تواصلت مع محترفي الصناعة من جميع أنحاء العالم وعرضت أحدث تقنيات الإطارات ومنتجاتها المتميزة والتزامها بالابتكار في السوق العالمي للسيارات.',
  'news.n1.body1':
    'شاركت جي بلانيت تاير بنجاح في معرض أوتوميكانيكا دبي، أحد أبرز معارض ما بعد البيع للسيارات في الشرق الأوسط. وخلال الحدث، رحّبت الشركة بالموزّعين والشركاء والزوّار من مختلف أنحاء العالم لاستكشاف أحدث حلول الإطارات لسيارات الركاب والمركبات التجارية والتطبيقات الصناعية.',
  'news.n1.body2':
    'أتاح المعرض فرصة ممتازة لتعزيز الشراكات القائمة، وبناء علاقات تجارية جديدة، وإظهار التزام جي بلانيت تاير بالجودة والأداء والابتكار المستمر في صناعة الإطارات العالمية.',
  'news.n2.date': '8 فبراير 2026',
  'news.n2.title': 'جي بلانيت تاير في معرض لاتين تاير وقطع غيار السيارات',
  'news.n2.description':
    'عرضت جي بلانيت تاير أحدث حلول الإطارات في معرض لاتين تاير وقطع غيار السيارات، حيث تواصلت مع محترفي الصناعة ووسّعت حضورها في سوق السيارات في أمريكا اللاتينية.',
  'news.n2.body1':
    'شاركت جي بلانيت تاير في معرض لاتين تاير وقطع غيار السيارات، حيث قدّمت أحدث تشكيلة من منتجات الإطارات للمشترين والموزّعين ومحترفي السيارات من مختلف أنحاء أمريكا اللاتينية وخارجها.',
  'news.n2.body2':
    'وطوال المعرض، سلّطت الشركة الضوء على تركيزها على جودة التصنيع والتقنية المتقدمة والحلول التي تركّز على العميل، مع بناء شراكات قيّمة مع شركات دولية. وقد رسّخ الحدث التزام جي بلانيت تاير بتوسيع شبكتها العالمية وتقديم حلول إطارات موثوقة للعملاء حول العالم.',
  'news.n3.date': '3 يوليو 2026',
  'news.n3.title': 'جي بلانيت تايرز تشارك في معرض النقل البري 2026',
  'news.n3.description':
    'مشاركة ناجحة في الجناح GR13 بمركز NAEC ستونلي، مع التواصل مع محترفي النقل من مختلف أنحاء القطاع.',
  'news.n3.body1':
    'كانت جي بلانيت تايرز فخورة بالمشاركة في معرض النقل البري (RTX) 2026 في مركز NAEC ستونلي، حيث رحّبنا في جناحنا بمشغّلي الأساطيل والموزّعين ومحترفي النقل وشركاء الصناعة.',
  'news.n3.body2':
    'وطوال الحدث، عرض فريقنا أحدث حلول الإطارات التجارية، وناقش اتجاهات الصناعة، وتواصل مع الزوّار من مختلف أنحاء المملكة المتحدة وخارجها. وقد أتاح المعرض فرصة ممتازة لتعزيز العلاقات القائمة، وتقديم منتجاتنا لعملاء جدد، وتبادل الأفكار مع المحترفين في قطاع النقل البري.',
  'news.n3.body3':
    'نودّ أن نشكر كل من زار الجناح GR13 وخصّص وقتاً للقاء فريقنا. نقدّر اهتمامكم بجي بلانيت تايرز، ونتطلّع إلى مواصلة الحوار وبناء شراكات دائمة.',

  // Home — CTA banner
  'cta.title': 'دعنا نزوّد أسطولك بإطارات J.Planet Tire.',
  'cta.description':
    'سواء كنت بحاجة إلى تركيب إطارات لمحاور التوجيه أو الدفع أو المقطورات، أو كنت تقيّمنا كشريك تصنيع، فإن فريقنا التجاري الدولي المنتشر في العراق والمملكة المتحدة ودبي وكينيا والأردن والصين جاهز للحديث معك.',
  'cta.enquire': 'استفسر الآن',
  'cta.partner': 'كن شريكاً تجارياً',

  // Footer
  'footer.description':
    'إطارات PCR وإطارات TBR مُصنَّعة في فيتنام وتايلاند وكوريا للأساطيل التجارية، وتُباع وتُدعم في المملكة المتحدة وأوروبا ودبي والعراق.',
  'footer.explore': 'استكشف',
  'footer.legal': 'قانوني',
  'footer.contactUs': 'اتصل بنا',
  'footer.terms': 'الشروط والأحكام',
  'footer.privacy': 'سياسة الخصوصية',
  'footer.warranty': 'سياسة الضمان',
  'footer.copyright': 'حقوق النشر © {year} جي بلانيت تاير',
  'footer.rights': 'جميع الحقوق محفوظة',

  // Common
  'common.viewMore': 'عرض المزيد',
  'common.comingSoon': 'قريباً',

  // About page
  'aboutPage.badge': 'عن جي بلانيت تاير',
  'aboutPage.titleLine1': 'معايير تصنيع',
  'aboutPage.titleLine2': 'يمكن للمشترين التجاريين الاعتماد عليها.',
  'aboutPage.h1.title': 'مُختبَرة، لا مفترضة',
  'aboutPage.h1.description': 'كل خط إنتاج يمر باختبارات ريديال دولية قبل أن يصل إلى أي أسطول.',
  'aboutPage.h2.title': 'توريد ثابت',
  'aboutPage.h2.description': 'عمليات تجارية دولية تُدار من فروعنا في المملكة المتحدة ودبي والعراق والأردن وكينيا والصين.',
  'aboutPage.h3.title': 'دعم مباشر من المصنع',
  'aboutPage.h3.description': 'فريقنا يدعم أعمالك مباشرة.',
  'mission.badge': 'مهمتنا',
  'mission.titleLine1': 'مبنية على الصحة طويلة الأمد،',
  'mission.titleLine2': 'والسلامة والاستدامة.',
  'mission.p1':
    'جي بلانيت تاير شركة مستقلة لتصنيع إطارات المركبات التجارية، يقع مقرها الرئيسي في بغداد، العراق، مع فروع في المملكة المتحدة ودبي وكينيا والأردن والصين. نصمم ونورّد إطارات ريديال لسيارات الركاب وإطارات الشاحنات والحافلات الريديال (TBR) لمحاور التوجيه والدفع والمقطورات والحافلات، وتُصنَّع في منشآتنا الشريكة في فيتنام وتايلاند وكوريا.',
  'mission.p2':
    'بخبرة عميقة في العلامات الخاصة وتطوير المعدات الأصلية، نساعد شركات النقل ومشغّلي الحافلات وتجار جملة الأساطيل عبر أوروبا والشرق الأوسط وأفريقيا وآسيا على تزويد أساطيلهم بالإطارات المناسبة على نطاق واسع.',
  'journey.badge': 'مسيرتنا',
  'journey.title': 'محطات بارزة',
  'journey.m1.label': 'فيتنام · تايلاند',
  'journey.m1.description': 'تصنيع ريديال متجذر في فيتنام وتايلاند.',
  'journey.m2.label': 'ولفرهامبتون',
  'journey.m2.description': 'تأسيس قاعدة التوزيع والدعم في المملكة المتحدة.',
  'journey.m3.label': '2026',
  'journey.m3.description': 'مشاركة دولية في معرض أوتوميكانيكا دبي.',
  'journey.m4.label': 'دبي والعراق',
  'journey.m4.description': 'افتتاح فروع في دبي والعراق.',
  'journey.sustainBadge': 'الاستدامة',
  'journey.sustainStatDesc': 'هدفنا لخفض الانبعاثات المرتبطة بالإطارات عبر التصنيع ودورة حياة المنتج.',
  'journey.commitTitleLine1': 'التزام قابل للقياس',
  'journey.commitTitleLine2': 'بخفض الانبعاثات.',
  'journey.commitDesc':
    'نعمل على خفض الانبعاثات المرتبطة بإطاراتنا بأكثر من الثلث من خلال كفاءة المواد ومركّبات منخفضة مقاومة التدحرج وعمر خدمة أطول. هدف نلتزم به فعلاً، لا مجرد شعار.',
  'journey.point1': 'مركّبات منخفضة مقاومة التدحرج توفر وقود الأسطول',
  'journey.point2': 'عمر مداس أطول، واستبدالات أقل لكل ميل',
  'journey.point3': 'كفاءة مواد مدمجة في التصنيع',
  'journey.taglineDesc':
    'المبدأ الذي يقف خلف كل قرار نتخذه، من المواد الخام التي نختارها إلى دورة حياة كل إطار يغادر مصانعنا.',
  'manufacturing.badge': 'التصنيع والبحث والتطوير',
  'manufacturing.title': 'هندسة عبر ثلاث دول، ودعم عالمي.',
  'manufacturing.p1':
    'تُصنَّع إطاراتنا في فيتنام وتايلاند وكوريا، حيث يجتمع تطوير المركّبات وعمليات التصنيع والاختبارات الصارمة، ثم تُوزَّع وتُدعم عالمياً من فروعنا عبر أوروبا والشرق الأوسط وأفريقيا وآسيا.',
  'manufacturing.p2':
    'من مقاومة التدحرج والتحمل إلى اختبارات السرعة العالية والتماسك على الطرق المبللة، تُثبت كل نقشة جدارتها قبل أن تصل إلى أي أسطول.',

  // Tires page
  'tiresPage.badge': 'التشكيلة',
  'tiresPage.title': 'كتالوج الإطارات',
  'tiresPage.description':
    'استكشف تشكيلتنا الكاملة من الإطارات التجارية، وفي مقدمتها إطارات الشاحنات والحافلات الريديال. رشّح حسب مقاسك الدقيق واستفسر بأقل من ثلاث نقرات.',
  'finder.title': 'باحث الإطارات',
  'finder.subtitle.size': 'ابحث حسب المقاس وادمج القيم التي تعرفها فقط.',
  'finder.subtitle.vehicle': 'ابحث حسب المركبة وادمج القيم التي تعرفها فقط.',
  'finder.bySize': 'حسب المقاس',
  'finder.byVehicle': 'حسب المركبة',
  'finder.width': 'العرض',
  'finder.aspect': 'نسبة الارتفاع',
  'finder.rim': 'الجنط',
  'finder.axle': 'المحور',
  'finder.vehicleType': 'نوع المركبة',
  'finder.roadType': 'نوع الطريق',
  'finder.keyPriority': 'الأولوية الرئيسية',
  'finder.any': 'أي',
  'finder.find': 'ابحث عن الإطارات',
  'finder.reset': 'إعادة تعيين',
  'catalogue.searchPlaceholder': 'ابحث بالموديل أو المقاس - مثال 315/80 R22.5',
  'catalogue.searchModel': 'ابحث بالموديل مثال CP521، JP500D',
  'catalogue.searchSize': 'ابحث بالمقاس - مثال 315/80 R22.5',
  'catalogue.allTires': 'كل الإطارات',
  'catalogue.resultsCount': 'عرض {count} نتيجة',
  // Models / All Sizes view toggle
  'catalogue.viewModels': 'الموديلات',
  'catalogue.viewSizes': 'كل المقاسات',
  // Size card
  'sizeCard.inch': 'البوصة',
  'sizeCard.loadSpeed': 'مؤشر الحمل والسرعة',
  'sizeCard.maxPsi': 'أقصى ضغط (Psi)',
  'sizeCard.maxLoad': 'الحمولة القصوى (رطل)',
  'sizeCard.requestQuote': 'عرض المزيد من المواصفات',
  'catalogue.showing': 'عرض {shown} من {total} موديل',
  'catalogue.emptyNone': 'لا توجد إطارات منشورة بعد. عُد لاحقاً.',
  'catalogue.emptyNoMatch': 'لا توجد إطارات مطابقة لهذا البحث. جرّب تعديل عوامل التصفية.',
  'filter.button': 'تصفية وترتيب',
  'filter.ply': 'معدل الطبقات',
  'filter.loadRange': 'نطاق الحمولة',
  'filter.markings': 'العلامات',
  'filter.all': 'الكل',
  'filter.ms': 'M+S فقط',
  'filter.pmsf': '3PMSF فقط',
  'filter.regroovable': 'قابل لإعادة التحزيز',
  'filter.showing': 'عرض {count} نتيجة',
  'filter.clearAll': 'مسح الكل',
  'card.sizes': 'المقاسات',
  'card.sizeSingular': 'مقاس',
  'card.sizePlural': 'مقاسات',
  'card.loadSpeed': 'الحمولة/السرعة',
  'card.keyBenefit': 'الميزة الرئيسية',
  'card.viewMore': 'عرض المواصفات والمقاسات',
  'card.fallbackExplore': 'استكشف المواصفات والمقاسات كاملة.',
  'card.designedFor': 'مصمم لتطبيقات {name}.',

  // Tire detail page
  'tab.performance_indicator': 'مؤشرات الأداء الرئيسية',
  'tab.product_features': 'ميزات المنتج',
  'tab.product_description': 'وصف المنتج',
  'tab.size_technical_data': 'المقاسات / البيانات الفنية',
  'tab.recommended_position': 'نوع المركبة والموضع الموصى به',
  'detail.notFoundTitle': 'الإطار غير موجود',
  'detail.notFoundDescription': 'لم نتمكن من العثور على هذا الموديل. تصفح الكتالوج الكامل بدلاً من ذلك.',
  'detail.notFoundBack': '→ العودة إلى كتالوج الإطارات',
  'detail.benefits': 'المزايا',
  'detail.defaultCta': 'اطلب عرض سعر',
  'detail.downloadSpec': 'تحميل ورقة المواصفات',
  'detail.noPerformance': 'لا تتوفر بيانات أداء.',
  'detail.noDescription': 'لا يتوفر وصف للمنتج.',
  'detail.noSize': 'لا تتوفر بيانات مقاسات.',
  'detail.disclaimer1': '• يحق لشركتنا إجراء أي تغيير على أي معلومات في هذا الكتالوج دون إشعار مسبق.',
  'detail.disclaimer2': '• جميع الأرقام للاسترشاد فقط، وشركتنا غير مسؤولة عن أخطاء الطباعة.',

  // Per-size detail page
  'sizePage.viewDetails': 'عرض الإطار',
  'sizePage.backTo': 'العودة إلى',
  'sizePage.specTitle': 'المواصفات الكاملة',
  'sizePage.otherSizes': 'المقاسات الأخرى المتوفرة',
  'detail.otherOptions': 'خيارات {category} أخرى',
  'detail.positionsError': 'تعذر تحميل بيانات المواضع الموصى بها.',
  'detail.positionsEmpty': 'لا تتوفر بيانات مواضع موصى بها.',
  'acc1.title': 'الضمان العالمي المحدود',
  'acc1.coverageTitle': 'التغطية والسلامة',
  'acc1.coverageBody':
    'تُسلَّم جميع المنتجات خالية من عيوب التصنيع والمواد، ومطابقة أو متجاوزة للوائح الأداء الفني والسلامة السارية في بلد المنشأ.',
  'acc1.warningLabel': 'تحذير:',
  'acc1.warningBody': 'لا يسري هذا الضمان إذا رُكّبت المنتجات أو استُخدمت أو صيّنت بشكل غير صحيح.',
  'acc1.claimsTitle': 'المطالبات والمسؤولية',
  'acc1.claim1':
    'فترة الإخطار: يجب تقديم المطالبات كتابياً مع تفاصيل الاستخدام الكامل والتركيب وظروف العطل وبيانات الفاتورة خلال 90 يوماً من أول استخدام، أو 180 يوماً من تاريخ الفاتورة، أيهما أطول.',
  'acc1.claim2':
    'الفحص: يجب الاحتفاظ بالمنتجات موضوع المطالبة للفحص لمدة تصل إلى 90 يوماً. إعادة المنتجات إلى المصنع على نفقة المستخدم؛ وتُسلَّم البدائل المعتمدة على أساس CIF.',
  'acc1.claim3':
    'الحدود: تقتصر المسؤولية حصرياً على قيمة المنتج. الشركة المصنّعة غير مسؤولة عن الأضرار الشخصية أو أضرار الممتلكات؛ وعلى المستخدمين الاحتفاظ بتأمين مسؤولية كافٍ.',
  'acc2.title': 'تعليمات تركيب الإطار والأنبوب الداخلي',
  'acc2.intro':
    'قد يؤدي النفخ غير الصحيح أو أضرار الصدمات أو التركيب الخاطئ إلى فشل الأنابيب، مما يسبب أضراراً بالممتلكات أو إصابات شخصية. التزم دائماً بالاحتياطات التالية:',
  'acc2.item1':
    'المقاس: اختر دائماً مقاسات الأنابيب الصحيحة لإطاراتك. لا تستخدم أنابيب أكبر أو أصغر من اللازم، فالانثناء والتمدد يسببان الأعطال.',
  'acc2.item2':
    'التحضير: نظّف الأنبوب الداخلي والإطار جيداً لإزالة الأوساخ والشوائب قبل التجميع. لا تعد استخدام قلوب الصمامات القديمة أبداً.',
  'acc2.item3':
    'المحاذاة: تأكد من تمركز الصمام ومحاذاته بشكل صحيح مع فتحة العجلة. لا تثنِ الصمام أو تلوِه، فذلك يسبب التمزق والتشقق.',
  'acc2.item4':
    'التزييت: استخدم مزلّقاً سائلاً مناسباً بين العجلة والإطار لتجميع سلس. لا تستخدم أبداً الزيت أو الشحم أو المزلّقات ذات الجزيئات الصلبة التي تقرص الأنابيب وتُحدث ثقوباً دقيقة.',
  'acc2.item5':
    'الاتزان: وازن العجلات جيداً دائماً بعد تركيب مكونات جديدة. العجلات غير المتزنة تسبب اهتزازاً شديداً وتولّد حرارة خطرة.',
  'quote.title': 'طلب عرض سعر',
  'quote.subtitle': 'اختر المقاسات والكميات ثم أرسل استفسارك',
  'quote.step1': 'اختر المقاسات والكميات',
  'quote.selectSizes': 'اختر المقاسات',
  'quote.qty': 'الكمية',
  'quote.added': 'المضاف:',
  'quote.noSizes': 'لم تُضف أي مقاسات بعد.',
  'quote.total': 'الإجمالي {n} إطار',
  'quote.step2': 'بيانات التواصل الخاصة بك',
  'quote.name': 'الاسم',
  'quote.company': 'الشركة',
  'quote.email': 'البريد الإلكتروني',
  'quote.phone': 'الهاتف',
  'quote.country': 'الدولة',
  'quote.role': 'المنصب',
  'quote.rolePlaceholder': 'منصبك',
  'quote.countryPlaceholder': 'اختر الدولة',
  'quote.replyNote': 'يرد فريقنا التجاري خلال يوم عمل واحد',
  'quote.submit': 'إرسال الاستفسار',
  'quote.successToast': 'شكراً لك — لقد استلمنا طلب الحجز وسنؤكده قريباً.',

  // News page
  'newsPage.title': 'غرفة أخبار جي بلانيت',
  'newsPage.description': 'معارض تجارية وإطلاقات منتجات وأخبار الشركة مباشرة من أرض المصنع ومن الطريق.',
  'newsPage.featured': 'حدث مميز',
  'newsPage.back': '← العودة إلى الأخبار',
  'newsPage.notFound': 'المقال غير موجود',
  'newsPage.notFoundDesc': 'لم نتمكن من العثور على هذا المقال. تصفّح غرفة الأخبار بدلاً من ذلك.',
  'newsCat.all': 'الكل',
  'newsCat.events': 'فعاليات',
  'newsCat.product': 'أخبار المنتجات',
  'newsCat.company': 'أخبار الشركة',

  // Contact page
  'contactPage.badge': 'اتصل بنا',
  'contactPage.title': 'لنتحدث عن الإطارات.',
  'contactPage.description':
    'سواء كان لديك استفسار عام أو طلب لتوريد الأساطيل، فإن فريقنا العالمي في الشرق الأوسط وأوروبا وأفريقيا وآسيا سيوجّهك إلى الشخص المناسب.',
  'contact.callTeam': 'اتصل بنا',
  'contact.emailUs': 'راسلنا عبر البريد',
  'contact.address': 'العنوان',
  'contact.followUs': 'تابعنا',
  'contact.region.uk': 'المملكة المتحدة',
  'contact.region.dubai': 'دبي',
  'contact.region.iraq': 'العراق',
  'contact.phone.uk': '+44 1902 200269, +44 20 7088 8353',
  'contact.phone.dubai': '+971 4 883 3304',
  'contact.phone.iraq': '+964 775 511 0045',
  'contact.email.uk': 'info@jplanettire.net, info@jplanettire.co.uk',
  'contact.email.dubai': 'info@jplanettire.net',
  'contact.email.iraq': 'info@jplanettire.net',
  'contact.address.uk': 'Unit 1, Ashford Estate, Wolverhampton WV2 2BX, United Kingdom',
  'contact.address.dubai': 'Office No RA07-AA03, Jebel Ali Free Zone, Dubai, United Arab Emirates',
  'contact.address.iraq': 'Al Jawaden Group Company Building, Mishn Complex, Al-Rasheed Camp Road, Baghdad, Iraq',
  'contact.formTitle': 'قدّم استفساراً',
  'contact.formSubtitle': 'أخبرنا بما تحتاجه — نرد عادة خلال يوم عمل واحد.',
  'contact.enquiryType': 'نوع الاستفسار',
  'contact.enq.general': 'استفسار عام',
  'contact.enq.fleetUk': 'توريد أسطول - المملكة المتحدة وأوروبا',
  'contact.enq.fleetDubai': 'توريد أسطول - دبي',
  'contact.enq.fleetIraq': 'توريد أسطول - العراق',
  'contact.enq.partnership': 'شراكة تجارية',
  'contact.consentPrivacy': 'أوافق على معالجة جي بلانيت تاير لبياناتي الشخصية للرد على هذا الاستفسار، وفقاً لـ',
  'contact.consentPrivacyLink': 'سياسة الخصوصية.',
  'contact.consentNewsletter':
    'أبقني على اطلاع بالمنتجات الجديدة والعروض وأخبار الصناعة وفعاليات جي بلانيت تاير. (يمكنك إلغاء الاشتراك في أي وقت.)',
  'form.fullName': 'الاسم الكامل',
  'form.company': 'الشركة',
  'form.workEmail': 'البريد الإلكتروني للعمل',
  'form.phone': 'الهاتف',
  'form.message': 'رسالتك',
  'form.messagePlaceholder': 'مقاسات أو كميات أو فئات أو تفاصيل شراكة',
  'form.namePlaceholder': 'الاسم الكامل',
  'form.companyPlaceholder': 'اسم الشركة',
  'form.emailPlaceholder': 'you@company.com',
  'form.phonePlaceholder': 'رقمك',
  'form.send': 'إرسال الاستفسار',
  'form.sending': 'جارٍ الإرسال…',
  'contact.successToast': 'شكراً لك — لقد استلمنا رسالتك وسنتواصل معك قريباً.',

  // Exhibition (RTX) page
  'rtx.badge': 'نشارك في معرض Road Transport Expo 2026',
  'rtx.titleLine1': 'قابل جي بلانيت',
  'rtx.titleLine2': 'تاير في RTX 2026',
  'rtx.dates': 'التواريخ',
  'rtx.datesValue': 'الثلاثاء 30 يونيو – الخميس 2 يوليو 2026',
  'rtx.location': 'الموقع',
  'rtx.formTitle': 'املأ النموذج',
  'rtx.name': 'الاسم*',
  'rtx.company': 'الشركة',
  'rtx.role': 'المنصب',
  'rtx.rolePlaceholder': 'منصبك',
  'rtx.email': 'البريد الإلكتروني*',
  'rtx.phone': 'الهاتف*',
  'rtx.spokenWith': 'تحدثت مع*',
  'rtx.selectMember': 'اختر عضو الفريق....',
  'rtx.feedback': 'تعليق / ملاحظات',
  'rtx.feedbackPlaceholder': 'أي أسئلة أو متطلبات إطارات أو ملاحظات من المحادثة.',
  'rtx.success': 'شكراً! تم إرسال بياناتك.',
  'rtx.errSelect': 'يرجى اختيار عضو الفريق.',
  'rtx.errGeneric': 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
  'rtx.submitting': 'جارٍ الإرسال...',
  'rtx.submit': 'إرسال',

  // Legal layout
  'legal.questions': 'لديك أسئلة حول هذه السياسة؟ راسلنا على',
  'legal.ukOr': '(المملكة المتحدة) أو',
  'legal.uae': '(الإمارات).',
  'legal.backHome': '→ العودة إلى الرئيسية',

  // 404 page
  'nf.badge': '404 · الصفحة غير موجودة',
  'nf.title': 'هذا المسار خارج الطريق.',
  'nf.description':
    'الصفحة التي تبحث عنها ربما نُقلت أو أُعيدت تسميتها، أو قد يكون الرابط غير صحيح. عُد إلى الكتالوج أو إلى الصفحة الرئيسية لمواصلة تصفح جي بلانيت تاير.',
  'nf.browse': 'تصفح الإطارات',
  'nf.home': 'إلى الرئيسية',
  'nf.back': 'العودة إلى الصفحة السابقة',
  'nf.explore': 'أو استكشف',
};

export type TranslationKey = keyof typeof en;

import { ku } from './dictionaries.ku';
import { zh } from './dictionaries.zh';
import { sw } from './dictionaries.sw';
import type { Lang } from './languages';

// One dictionary per language. English is complete; ar/ku/zh/sw are Partial and
// fall back to English per key at lookup time (see LanguageContext). es/de/nl
// have no hand-written dictionary — their UI is machine-translated at runtime, so
// they start empty and t() reads from the machine-translation cache instead.
export const translations: Record<Lang, Partial<Record<TranslationKey, string>>> = {
  en,
  ar,
  ku,
  zh,
  sw,
  es: {},
  de: {},
  nl: {},
};
