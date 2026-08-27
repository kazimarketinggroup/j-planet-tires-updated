import type { TranslationKey } from './translations';

// Simplified Chinese (zh-CN) UI dictionary. Industry acronyms are expanded/
// translated per project preference. Any missing key falls back to English.
export const zh: Partial<Record<TranslationKey, string>> = {
  // Navbar
  'topbar.tagline': '在越南、泰国和韩国生产的 PCR 与 TBR 轮胎。',
  'nav.home': '首页',
  'nav.about': '关于我们',
  'nav.tires': '轮胎',
  'nav.allTires': '所有轮胎',
  'nav.news': '新闻',
  'nav.contact': '联系我们',
  'nav.getQuote': '获取报价',

  // Home — hero
  'hero.badge': 'PCR 与 TBR 轮胎制造商 · 欧洲 | 中东 | 非洲 | 亚洲',
  'hero.titleLine1': '您值得信赖的轮胎',
  'hero.titleLine2': '增长伙伴',
  'hero.description':
    'PCR（乘用车子午线轮胎）与 TBR（卡客车子午线轮胎），专为转向轴、驱动轴和挂车轴位置设计。我们的轮胎在越南、泰国和韩国制造。',
  'hero.cta': '查找您的轮胎',
  'hero.stat1.value': '1000万',
  'hero.stat1.label': '每年生产的子午线轮胎',
  'hero.stat2.value': '3',
  'hero.stat2.label': '生产基地：越南、泰国和韩国',
  'hero.stat3.value': '35% ↓',
  'hero.stat3.label': '轮胎相关排放的目标减排量（到2030年）',
  'hero.stat4.value': '全球',
  'hero.stat4.label': '覆盖欧洲、中东、非洲和亚洲的分销网络',
  'hero.accreditationsTitle': '认证与合规',
  'accreditation.ece': 'ECE R54 认证',
  'accreditation.ukca': 'UKCA / E-Mark 认可',
  'accreditation.iso9001': 'ISO 9001:2015',
  'accreditation.iso14001': 'ISO 14001',

  // Home — about
  'about.badge': '我们是谁',
  'about.title': '一家为贸易而生的独立商用轮胎制造商。',
  'about.p1':
    'J.Planet Tire 是一家独立的商用轮胎制造商，总部位于伊拉克巴格达，并在英国、迪拜、肯尼亚、约旦和中国设有分公司。我们设计并供应 PCR 与 TBR 轮胎，适用于转向、驱动、挂车及客车配置。，适用于转向、驱动、挂车及客车/大巴的配置。',
  'about.p2':
    '凭借在 TBR 轮胎制造方面的深厚经验，我们服务于欧洲、中东、非洲和亚洲的运输及车队行业，为商用车队提供可靠的轮胎解决方案。',
  'about.cta': '了解更多',

  // Home — why choose
  'why.badge': '为何选择 J.Planet',
  'why.title': '贸易买家选择我们的四大理由',
  'why.r1.title': '车队正常运行',
  'why.r1.description':
    '专为车队正常运行而设计的轮胎，在转向、驱动和挂车位置的里程和胎面寿命方面带来可衡量的提升。',
  'why.r2.title': '长期合作伙伴关系',
  'why.r2.description':
    '我们致力于与欧洲、中东、非洲和亚洲各地的所有客户建立长期关系。',
  'why.r3.title': '专家团队',
  'why.r3.description':
    '数十年的乘用车与卡客车子午线轮胎制造专业知识，从配方设计到特定轴位的配置支持。',
  'why.r4.title': '智能技术',
  'why.r4.description':
    '现代子午线结构和测试标准，确保每个生产基地的质量始终如一。',

  // Home — who we work with
  'workWith.badge': '我们的合作对象',
  'workWith.titleLine1': '为车队而生。',
  'workWith.titleLine2': '为分销商而生。',
  'workWith.a1.title': '车队运营商与运输公司',
  'workWith.a1.description':
    '您需要可靠的供应、正确的轴位配置和有竞争力的贸易价格，且省心无忧。我们的全球贸易团队直接处理来自欧洲、中东、非洲和亚洲的咨询，报价迅速，并在转向、驱动、挂车及客车/大巴各位置保持稳定库存。',
  'workWith.a2.title': '批发商与分销商',
  'workWith.a2.description':
    '我们一直在欧洲、中东、非洲和亚洲各地寻找新的经销商。期待有竞争力的贸易价格、您可以放心转售的可靠库存，以及一支直接快速处理您申请的合作团队。',
  'workWith.cta': '联系我们的合作团队',

  // Home — build programme
  'programme.badge': '原厂配套与自有品牌',
  'programme.title': '直接向制造商采购',
  'programme.description':
    '我们不是中间商。我们自主设计并在越南、泰国和韩国生产 PCR 与 TBR 轮胎，因此能够提供始终如一的品质、可靠的供应和具有竞争力的价格，并由熟悉产品的国际贸易团队提供支持。',
  'programme.cta': '获取报价',

  // Home — where we operate
  'operate.badge': '我们的全球布局',
  'operate.title': '我们的业务所在',
  'operate.hq': '总部',
  'operate.branch': '分公司',
  'operate.me.region': '中东',
  'operate.me.note': '全球总部、贸易与运营',
  'operate.me.iraq': '伊拉克',
  'operate.me.dubai': '迪拜',
  'operate.me.jordan': '约旦',
  'operate.europe.region': '欧洲',
  'operate.europe.country': '英国',
  'operate.europe.note': '英国及欧盟贸易运营',
  'operate.africa.region': '非洲',
  'operate.africa.country': '肯尼亚',
  'operate.africa.note': '服务于东非及撒哈拉以南非洲车队',
  'operate.asia.region': '亚洲',
  'operate.asia.country': '中国',
  'operate.asia.note': '采购、质量与制造对接',
  'operate.fullDetails': '需要具体地址？查看完整联系方式 →',

  // Home — sustainability & news
  // Home — tire range
  'range.badge': '产品系列',
  'range.title1': '专注一件事。',
  'range.title2': '覆盖每个轴位。',
  'range.viewAll': '查看全部轮胎',
  'range.explore': '探索轮胎 →',
  'range.pcr.tag': '乘用车子午线轮胎',
  'range.pcr.title': 'PCR/SUV 轮胎',
  'range.pcr.description':
    '在韩国制造，专为紧凑型和中型轿车打造，兼顾舒适性、干地抓地力和更长的胎面寿命。',
  'range.tbr.tag': '卡客车子午线轮胎',
  'range.tbr.title': 'TBR 轮胎',
  'range.tbr.description':
    '在泰国和越南制造，专为商用车队的转向、驱动、挂车及客车/大巴轴位而打造。',
  'range.otr.tag': '工程与重载',
  'range.otr.title': 'OTR 轮胎',
  'range.otr.description':
    '专为砾石、泥泞和铺装作业场地设计，配备加强胎侧，专为重载工程车队打造。',

  'sustainability.title':
    '35%↓ 在制造和产品生命周期中减少轮胎相关排放的目标。',
  'sustainability.tagline': '我们热爱自然。我们珍惜资源。',
  'sustainability.description':
    '可持续发展并非附带说明，而是融入我们的制造方式之中。从材料效率到长寿命胎面配方，我们致力于降低所供应每支车队的碳足迹，同时不影响贸易买家所依赖的性能。',
  'news.title': '新闻与媒体',
  'news.readMore': '阅读更多 →',
  'news.n1.date': '2026年5月12日',
  'news.n1.title': 'J.Planet Tire 亮相 2026 迪拜国际汽车配件展',
  'news.n1.description':
    'J.Planet Tire 自豪地参加了迪拜国际汽车配件展，与全球行业专业人士交流，展示其最新的轮胎技术、优质产品以及在国际汽车市场创新的承诺。',
  'news.n1.body1':
    'J.Planet Tire 成功参加了迪拜国际汽车配件展——中东领先的汽车售后市场展会之一。活动期间，公司欢迎来自世界各地的分销商、合作伙伴和访客，探索其面向乘用车、商用车和工业应用的最新轮胎解决方案。',
  'news.n1.body2':
    '此次展会为巩固现有合作关系、建立新的商业联系，以及展示 J.Planet Tire 对全球轮胎行业质量、性能和持续创新的承诺，提供了绝佳的机会。',
  'news.n2.date': '2026年2月8日',
  'news.n2.title': 'J.Planet Tire 亮相拉丁轮胎及汽车配件展',
  'news.n2.description':
    'J.Planet Tire 在拉丁轮胎及汽车配件展上展示了其最新的轮胎解决方案，与行业专业人士交流，并扩大其在拉丁美洲汽车市场的影响力。',
  'news.n2.body1':
    'J.Planet Tire 参加了拉丁轮胎及汽车配件展，向来自拉丁美洲及其他地区的买家、分销商和汽车专业人士展示其最新的轮胎产品系列。',
  'news.n2.body2':
    '在整个展会期间，公司着重展示了对优质制造、先进技术和以客户为中心解决方案的专注，同时与国际企业建立了宝贵的合作关系。此次活动进一步彰显了 J.Planet Tire 拓展全球网络、为世界各地客户提供可靠轮胎解决方案的承诺。',
  'news.n3.date': '2026年7月3日',
  'news.n3.title': 'J. Planet Tires 亮相 2026 道路运输展',
  'news.n3.description':
    '在 NAEC Stoneleigh 展馆 GR13 展位的成功参展，与来自整个行业的运输专业人士建立联系。',
  'news.n3.body1':
    'J. Planet Tires 很荣幸参加了在 NAEC Stoneleigh 举办的 2026 道路运输展（RTX），我们在展位上接待了车队运营商、分销商、运输专业人士以及行业合作伙伴。',
  'news.n3.body2':
    '在整个展会期间，我们的团队展示了最新的商用轮胎解决方案，探讨了行业趋势，并与来自英国及其他地区的访客进行了交流。RTX 为我们提供了巩固现有合作关系、向新客户介绍产品以及与道路运输行业专业人士交流想法的绝佳机会。',
  'news.n3.body3':
    '我们衷心感谢每一位到访 GR13 展位并抽出时间与我们团队会面的朋友。感谢您对 J. Planet Tires 的关注，我们期待继续深入交流并建立长久的合作伙伴关系。',

  // Home — CTA banner
  'cta.title': '让 J.Planet 助力您的车队。',
  'cta.description':
    '无论您需要转向、驱动或挂车位置的轮胎配置，还是正在评估我们作为制造合作伙伴，我们遍布伊拉克、英国、迪拜、肯尼亚、约旦和中国的全球贸易团队都随时准备与您沟通。',
  'cta.enquire': '咨询',
  'cta.partner': '成为贸易合作伙伴',

  // Footer
  'footer.description':
    '在越南、泰国和韩国生产的 PCR 与 TBR 轮胎，供应给商用车队，并在英国、欧洲、迪拜和伊拉克提供销售与支持。',
  'footer.explore': '探索',
  'footer.legal': '法律',
  'footer.contactUs': '联系我们',
  'footer.terms': '条款与条件',
  'footer.privacy': '隐私政策',
  'footer.warranty': '质保政策',
  'footer.copyright': '版权所有 © {year} J. Planet Tire',
  'footer.rights': '保留所有权利',

  // Common
  'common.viewMore': '查看更多',
  'common.comingSoon': '即将推出',

  // About page
  'aboutPage.badge': '关于 J.Planet Tire',
  'aboutPage.titleLine1': '制造标准',
  'aboutPage.titleLine2': '贸易买家可以信赖。',
  'aboutPage.h1.title': '经过测试，而非假设',
  'aboutPage.h1.description': '每条产品线在交付车队之前都要经过国际子午线测试。',
  'aboutPage.h2.title': '稳定供应',
  'aboutPage.h2.description': '全球贸易运营由我们在英国、迪拜、伊拉克、约旦、肯尼亚和中国的分支机构负责。',
  'aboutPage.h3.title': '制造商直接支持',
  'aboutPage.h3.description': '我们的团队将直接支持您的业务。',
  'mission.badge': '我们的使命',
  'mission.titleLine1': '围绕长期健康、',
  'mission.titleLine2': '安全和可持续发展而构建。',
  'mission.p1':
    'J.Planet Tire 是一家独立的商用轮胎制造商，总部位于伊拉克巴格达，并在英国、迪拜、肯尼亚、约旦和中国设有分支机构。我们设计并制造 PCR 与 TBR 轮胎，适用于转向、驱动、挂车及客车/大巴配置，由我们在越南、泰国和韩国的合作工厂生产。',
  'mission.p2':
    '凭借在自有品牌和原厂配套开发方面的深厚专长，我们帮助欧洲、中东、非洲和亚洲的运输公司、客车运营商和车队批发商大规模地为道路提供合适的轮胎。',
  'journey.badge': '我们的历程',
  'journey.title': '里程碑',
  'journey.m1.label': '越南 · 泰国',
  'journey.m1.description': '子午线制造植根于越南和泰国。',
  'journey.m2.label': '伍尔弗汉普顿',
  'journey.m2.description': '英国分销与支持基地建立。',
  'journey.m3.label': '2026',
  'journey.m3.description': '在迪拜国际汽车配件展进行国际展出。',
  'journey.m4.label': '迪拜与伊拉克',
  'journey.m4.description': '在迪拜和伊拉克开设分支机构。',
  'journey.sustainBadge': '可持续发展',
  'journey.sustainStatDesc':
    '我们在制造和产品生命周期中减少轮胎相关排放的目标。',
  'journey.commitTitleLine1': '可衡量的承诺',
  'journey.commitTitleLine2': '以降低排放。',
  'journey.commitDesc':
    '我们正努力通过材料效率、低滚动阻力配方和更长的使用寿命，将轮胎相关排放减少三分之一以上。这是我们对自己的要求，而非一句口号。',
  'journey.point1': '降低滚动阻力的配方，为车队节省燃油',
  'journey.point2': '更长的胎面寿命，每英里更换次数更少',
  'journey.point3': '将材料效率融入制造过程',
  'journey.taglineDesc':
    '这是我们做出每一个决定背后的原则，从我们选择的原材料到离开工厂的每一支轮胎的生命周期。',
  'manufacturing.badge': '制造与研发',
  'manufacturing.title': '在三个国家精心制造，全球提供支持。',
  'manufacturing.p1':
    '我们的轮胎在越南、泰国和韩国制造，将配方开发、制造和严格测试融为一体，随后由我们遍布欧洲、中东、非洲和亚洲的分支机构进行全球分销和支持。',
  'manufacturing.p2':
    '从滚动阻力和耐久性到高速和湿地抓地力验证，每一款花纹在交付车队之前都经过验证。',

  // Tires page
  'tiresPage.badge': '产品系列',
  'tiresPage.title': '轮胎目录',
  'tiresPage.description':
    '探索我们完整的乘用车子午线轮胎和商用轮胎系列，以卡客车子午线轮胎系列为主导。按您的精确配置筛选，三次点击内即可咨询。',
  'finder.title': '轮胎查找器',
  'finder.subtitle.size': '按尺寸搜索，只需组合您已知的数值。',
  'finder.subtitle.vehicle': '按车辆搜索，只需组合您已知的数值。',
  'finder.bySize': '按尺寸',
  'finder.byVehicle': '按车辆',
  'finder.width': '宽度',
  'finder.aspect': '扁平比',
  'finder.rim': '轮辋',
  'finder.axle': '轴位',
  'finder.vehicleType': '车辆类型',
  'finder.roadType': '路面类型',
  'finder.keyPriority': '关键需求',
  'finder.any': '任意',
  'finder.find': '查找轮胎',
  'finder.reset': '重置',
  'catalogue.searchPlaceholder': '搜索型号或尺寸 - 例如 315/80 R22.5',
  'catalogue.allTires': '所有轮胎',
  'catalogue.searchModel': '搜索型号 例如 CP521、JP500D',
  'catalogue.searchSize': '搜索尺寸 - 例如 315/80 R22.5',
  'catalogue.viewModels': '型号',
  'catalogue.viewSizes': '所有尺寸',
  'sizeCard.inch': '英寸',
  'sizeCard.loadSpeed': '负载/速度',
  'sizeCard.maxPsi': '最大 Psi',
  'sizeCard.maxLoad': '最大负载 (磅)',
  'sizeCard.requestQuote': '查看更多规格',
  'catalogue.resultsCount': '显示 {count} 个结果',
  'catalogue.showing': '显示 {total} 个型号中的 {shown} 个',
  'catalogue.emptyNone': '暂无已发布的轮胎。请稍后再来查看。',
  'catalogue.emptyNoMatch': '没有符合该搜索的轮胎。请尝试调整筛选条件。',
  'filter.button': '筛选与排序',
  'filter.ply': '层级',
  'filter.loadRange': '负载范围',
  'filter.markings': '标记',
  'filter.all': '全部',
  'filter.ms': '仅 M+S',
  'filter.pmsf': '仅 3PMSF',
  'filter.regroovable': '可翻新沟槽',
  'filter.showing': '显示 {count} 个结果',
  'filter.clearAll': '清除全部',
  'card.sizes': '尺寸',
  'card.sizeSingular': '个尺寸',
  'card.sizePlural': '个尺寸',
  'card.loadSpeed': '负载/速度',
  'card.keyBenefit': '主要优势',
  'card.viewMore': '查看更多规格与尺寸',
  'card.fallbackExplore': '探索完整规格与尺寸。',
  'card.designedFor': '专为 {name} 应用设计。',

  // Tire detail page
  'tab.performance_indicator': '关键性能指标',
  'tab.product_features': '产品特点',
  'tab.product_description': '产品描述',
  'tab.size_technical_data': '尺寸/技术数据',
  'tab.recommended_position': '推荐车辆类型与轴位',
  'detail.notFoundTitle': '未找到轮胎',
  'detail.notFoundDescription': '我们找不到该型号。请浏览完整目录。',
  'detail.notFoundBack': '← 返回轮胎目录',
  'detail.benefits': '优势',
  'detail.defaultCta': '请求报价 / 价格',
  'detail.downloadSpec': '下载规格表',
  'detail.noPerformance': '暂无性能数据。',
  'detail.noDescription': '暂无产品描述。',
  'detail.noSize': '暂无尺寸数据。',
  'detail.disclaimer1':
    '• 本公司有权对本目录中的任何信息进行任何更改，恕不另行通知。',
  'detail.disclaimer2': '• 所有数据仅供参考，本公司不对印刷错误负责。',

  // Per-size detail page
  'sizePage.viewDetails': '查看轮胎',
  'sizePage.backTo': '返回',
  'sizePage.specTitle': '完整规格',
  'sizePage.otherSizes': '其他可选尺寸',
  'detail.otherOptions': '其他 {category} 选项',
  'detail.positionsError': '无法加载推荐轴位数据。',
  'detail.positionsEmpty': '暂无推荐轴位数据。',
  'acc1.title': '全球有限质保',
  'acc1.coverageTitle': '覆盖范围与完整性',
  'acc1.coverageBody':
    '所有产品在交付时均无工艺和材料缺陷，符合或超过原产国现行的技术性能和安全法规。',
  'acc1.warningLabel': '警告：',
  'acc1.warningBody': '如果产品安装、使用或维护不当，本质保不适用。',
  'acc1.claimsTitle': '索赔与责任',
  'acc1.claim1':
    '通知期限：详细说明完整使用情况、安装、失效条件和发票数据的书面索赔，必须在首次使用后90天内，或发票日期后180天内（以较长者为准）提交。',
  'acc1.claim2':
    '检验：索赔产品必须保留供检验最多90天。产品退回工厂由用户承担费用；经批准的替换品按CIF条件交付。',
  'acc1.claim3':
    '限制：责任严格限于产品价值。制造商不对人身或财产损害负责；用户必须维持足够的责任保险。',
  'acc2.title': '轮胎与内胎安装说明',
  'acc2.intro':
    '充气不当、冲击损坏或安装不正确会导致内胎失效，造成财产损失或人身伤害。请始终遵守以下注意事项：',
  'acc2.item1':
    '尺寸：始终为您的轮胎选择合适的内胎尺寸。请勿使用过大或过小的内胎，因为折叠和拉伸会导致失效。',
  'acc2.item2':
    '准备：装配前彻底清洁内胎和轮胎，去除污垢和碎屑。切勿重复使用旧气门芯。',
  'acc2.item3':
    '对齐：确保气门正确居中并与轮孔对齐。请勿折叠或扭曲气门，因为这会导致撕裂和开裂。',
  'acc2.item4':
    '润滑：在轮辋和轮胎之间使用适当的液体润滑剂以便顺利装配。切勿使用油、油脂或硬颗粒润滑剂，它们会挤压内胎并产生针孔。',
  'acc2.item5':
    '平衡：安装新部件后始终彻底平衡车轮。不平衡的车轮会导致剧烈振动和危险的热量产生。',
  'quote.title': '请求报价',
  'quote.subtitle': '选择尺寸和数量，然后提交您的咨询',
  'quote.step1': '选择尺寸与数量',
  'quote.selectSizes': '选择尺寸',
  'quote.qty': '数量',
  'quote.added': '已添加：',
  'quote.noSizes': '尚未添加尺寸。',
  'quote.total': '共 {n} 支轮胎',
  'quote.step2': '您的联系方式',
  'quote.name': '姓名',
  'quote.company': '公司',
  'quote.email': '电子邮箱',
  'quote.phone': '电话',
  'quote.country': '国家',
  'quote.role': '职位',
  'quote.rolePlaceholder': '您的职位',
  'quote.countryPlaceholder': '选择国家',
  'quote.replyNote': '我们的团队将在1个工作日内回复',
  'quote.submit': '提交咨询',
  'quote.successToast': '感谢您——我们已收到您的预订请求，将尽快确认。',

  // News page
  'newsPage.title': 'J.Planet 新闻室',
  'newsPage.description':
    '来自工厂车间和一线道路的展会、产品发布和公司新闻。',
  'newsPage.featured': '精选活动',
  'newsPage.back': '← 返回新闻',
  'newsPage.notFound': '未找到文章',
  'newsPage.notFoundDesc': '我们找不到该文章。请浏览新闻室。',
  'newsCat.all': '全部',
  'newsCat.events': '活动',
  'newsCat.product': '产品新闻',
  'newsCat.company': '公司新闻',

  // Contact page
  'contactPage.badge': '联系',
  'contactPage.title': '聊聊轮胎吧。',
  'contactPage.description':
    '无论是一般咨询、车队供应，还是 OEM / 自有品牌合作，我们的团队都会为您对接合适的联系人。',
  'contact.callTeam': '联系我们',
  'contact.emailUs': '给我们发邮件',
  'contact.address': '地址',
  'contact.followUs': '关注我们',
  'contact.region.uk': '英国',
  'contact.region.dubai': '迪拜',
  'contact.region.iraq': '伊拉克',
  'contact.phone.uk': '+44 1902 200269, +44 20 7088 8353',
  'contact.phone.dubai': '+971 4 883 3304',
  'contact.phone.iraq': '+964 775 511 0045',
  'contact.email.uk': 'info@jplanettire.net, info@jplanettire.co.uk',
  'contact.email.dubai': 'info@jplanettire.net',
  'contact.email.iraq': 'info@jplanettire.net',
  'contact.address.uk': 'Unit 1, Ashford Estate, Wolverhampton WV2 2BX, United Kingdom',
  'contact.address.dubai': 'Office No RA07-AA03, Jebel Ali Free Zone, Dubai, United Arab Emirates',
  'contact.address.iraq': 'Al Jawaden Group Company Building, Mishn Complex, Al-Rasheed Camp Road, Baghdad, Iraq',
  'contact.formTitle': '提交咨询',
  'contact.formSubtitle': '告诉我们您的需求，我们通常在一个工作日内回复。',
  'contact.enquiryType': '咨询类型',
  'contact.enq.general': '一般咨询',
  'contact.enq.fleetUk': '车队供应 - 英国及欧洲',
  'contact.enq.fleetDubai': '车队供应 - 迪拜',
  'contact.enq.fleetIraq': '车队供应 - 伊拉克',
  'contact.enq.partnership': '贸易合作',
  'contact.consentPrivacy': '我同意 J.Planet Tire 处理我的个人数据以回复此咨询，依据',
  'contact.consentPrivacyLink': '隐私政策。',
  'contact.consentNewsletter':
    '请向我更新 J.Planet Tire 的新产品、促销、行业新闻和活动。（您可随时取消订阅。）',
  'form.fullName': '全名',
  'form.company': '公司',
  'form.workEmail': '工作邮箱',
  'form.phone': '电话',
  'form.message': '您的留言',
  'form.messagePlaceholder': '尺寸、数量、细分市场或合作详情',
  'form.namePlaceholder': 'Jane Doe',
  'form.companyPlaceholder': '公司名称',
  'form.emailPlaceholder': 'You@company.com',
  'form.phonePlaceholder': '您的号码',
  'form.send': '发送咨询',
  'form.sending': '发送中…',
  'contact.successToast': '感谢您——我们已收到您的留言，将尽快与您联系。',

  // Exhibition (RTX) page
  'rtx.badge': '参展 2026 道路运输博览会',
  'rtx.titleLine1': '在 RTX 2026 与',
  'rtx.titleLine2': 'J.Planet Tire 相约',
  'rtx.dates': '日期',
  'rtx.datesValue': '2026年6月30日（周二）至7月2日（周四）',
  'rtx.location': '地点',
  'rtx.formTitle': '填写表单',
  'rtx.name': '姓名*',
  'rtx.company': '公司',
  'rtx.role': '职位',
  'rtx.rolePlaceholder': '您的职位',
  'rtx.email': '电子邮箱*',
  'rtx.phone': '电话*',
  'rtx.spokenWith': '接洽人*',
  'rtx.selectMember': '选择团队成员....',
  'rtx.feedback': '意见/反馈',
  'rtx.feedbackPlaceholder': '任何问题、轮胎需求或洽谈中的备注。',
  'rtx.success': '谢谢！您的信息已提交。',
  'rtx.errSelect': '请选择一位团队成员。',
  'rtx.errGeneric': '出了点问题。请重试。',
  'rtx.submitting': '提交中...',
  'rtx.submit': '提交',

  // Legal layout
  'legal.questions': '对本政策有疑问？请发邮件至',
  'legal.ukOr': '（英国）或',
  'legal.uae': '（阿联酋）。',
  'legal.backHome': '← 返回首页',

  // 404 page
  'nf.badge': '404 · 页面未找到',
  'nf.title': '此路线偏离了轨道。',
  'nf.description':
    '您查找的页面可能已移动、重命名，或链接有误。请返回目录或回到首页继续浏览 J.Planet Tire。',
  'nf.browse': '浏览轮胎',
  'nf.home': '返回首页',
  'nf.back': '返回上一页',
  'nf.explore': '或探索',
};
