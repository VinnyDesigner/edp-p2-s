export type Language = 'EN' | 'AR';

export type ThemeId =
  | 'ecosystem'
  | 'groundwater'
  | 'soil'
  | 'waste-management'
  | 'air-quality'
  | 'marine-water-quality'
  | 'fisheries'
  | 'protected-area';

export interface EnvironmentalTheme {
  id: ThemeId;
  portalUrl: string;
  title: { EN: string; AR: string };
  heroHeading: { EN: string; AR: string };
  heroDescription: { EN: string; AR: string };
  ctaLabel: { EN: string; AR: string };
  icon: 'trees' | 'droplets' | 'layers' | 'recycle' | 'wind' | 'waves' | 'fish' | 'shield';
  cardImage: string;
  heroImage: string;
  imageAlt: string;
  datasetsCount: string;
}

export interface SmartApplication {
  id: string;
  url: string;
  screenImage: string;
  allowIframe?: boolean;
  title: { EN: string; AR: string };
  shortDesc: { EN: string; AR: string };
  icon: 'userCheck' | 'bot' | 'globe' | 'wind' | 'waves' | 'leaf' | 'fileText';
  metricTitle: string;
  metricValue: string;
  metricStatus: string;
  metricUnit?: string;
  chartLabel: string;
  chartBars: number[];
  stations: { id: string; label: string; x: number; y: number; color: 'gold' | 'cyan' }[];
  features: {
    icon: 'radio' | 'chart' | 'bell';
    title: { EN: string; AR: string };
  }[];
}

export interface DataCollectionCard {
  id: string;
  themeId: ThemeId;
  title: { EN: string; AR: string };
  countText: { EN: string; AR: string };
  icon: 'wind' | 'droplet' | 'waves' | 'leaf' | 'mountain';
  image: string;
  imageAlt: string;
}

export interface UpdateArticle {
  id: string;
  badge: { EN: string; AR: string };
  title: { EN: string; AR: string };
  description: { EN: string; AR: string };
  date: string;
  cta: { EN: string; AR: string };
  image: string;
  imageAlt: string;
}

export interface InsightStat {
  id: string;
  target: number;
  suffix: string;
  label: { EN: string; AR: string };
  icon: 'layers' | 'grid' | 'database' | 'leaf';
}

export const NAV_LINKS = [
  { id: 'home', label: { EN: 'Home', AR: 'الرئيسية' }, path: '/' },
  { id: 'applications', label: { EN: 'Applications', AR: 'التطبيقات' }, path: '/applications' },
  { id: 'catalogues', label: { EN: 'Datasets', AR: 'مجموعات البيانات' }, path: '/catalogues' },
  { id: 'about', label: { EN: 'About Us', AR: 'من نحن' }, path: '/about' },
  { id: 'contact', label: { EN: 'Contact Us', AR: 'اتصل بنا' }, path: '/contact' },
];

export const ENVIRONMENTAL_THEMES: EnvironmentalTheme[] = [
  {
    id: 'ecosystem',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/Biodiversity',
    title: { EN: 'Ecosystem', AR: 'النظام البيئي' },
    heroHeading: { EN: 'Ecosystem', AR: 'النظام البيئي' },
    heroDescription: {
      EN: 'Explore coastal wetlands, desert habitats and interconnected ecological corridors across Abu Dhabi.',
      AR: 'استكشف الأراضي الرطبة الساحلية والموائل الصحراوية والممرات البيئية المترابطة في أبوظبي.',
    },
    ctaLabel: { EN: 'Explore Ecosystem Data', AR: 'استكشف بيانات النظام البيئي' },
    icon: 'trees',
    cardImage: '/images/theme-ecosystem.jpg',
    heroImage: '/images/theme-ecosystem.jpg',
    imageAlt: 'Coastal desert wetland ecosystem and turquoise lagoon under clear Abu Dhabi sky',
    datasetsCount: '1,180 datasets',
  },
  {
    id: 'groundwater',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/GW',
    title: { EN: 'Groundwater', AR: 'المياه الجوفية' },
    heroHeading: { EN: 'Groundwater', AR: 'المياه الجوفية' },
    heroDescription: {
      EN: 'Monitor strategic aquifer reserves, piezometric levels and groundwater quality across the Emirate.',
      AR: 'راقب احتياطيات الخزانات الجوفية الاستراتيجية ومستوياتها وجودة المياه عبر الإمارة.',
    },
    ctaLabel: { EN: 'Explore Groundwater Data', AR: 'استكشف بيانات المياه الجوفية' },
    icon: 'droplets',
    cardImage: '/images/theme-groundwater.jpg',
    heroImage: '/images/theme-groundwater.jpg',
    imageAlt: 'EAD field specialists sampling groundwater monitoring well in Abu Dhabi oasis',
    datasetsCount: '980 datasets',
  },
  {
    id: 'soil',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/SOIL',
    title: { EN: 'Soil', AR: 'التربة' },
    heroHeading: { EN: 'Soil', AR: 'التربة' },
    heroDescription: {
      EN: 'Discover soil horizons, salinity profiles, arid land surveys and terrestrial geology across Abu Dhabi.',
      AR: 'اكتشف آفاق التربة وملامح الملوحة ومسوحات الأراضي القاحلة والجيولوجيا البرية في أبوظبي.',
    },
    ctaLabel: { EN: 'Explore Soil Data', AR: 'استكشف بيانات التربة' },
    icon: 'layers',
    cardImage: '/images/theme-soil.jpg',
    heroImage: '/images/theme-soil.jpg',
    imageAlt: 'Natural stratified desert sandstone and soil horizon layers',
    datasetsCount: '840 datasets',
  },
  {
    id: 'waste-management',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/WM',
    title: { EN: 'Waste Management', AR: 'إدارة النفايات' },
    heroHeading: { EN: 'Waste Management', AR: 'إدارة النفايات' },
    heroDescription: {
      EN: 'Track municipal recycling streams, material recovery rates and circular economy milestones.',
      AR: 'تتبع مسارات إعادة التدوير البلدية ومعدلات استرداد المواد ومبادرات الاقتصاد الدائري.',
    },
    ctaLabel: { EN: 'Explore Waste Data', AR: 'استكشف بيانات النفايات' },
    icon: 'recycle',
    cardImage: '/images/theme-waste-management.jpg',
    heroImage: '/images/theme-waste-management.jpg',
    imageAlt: 'Modern indoor materials recovery and recycling sorting line in Abu Dhabi',
    datasetsCount: '720 datasets',
  },
  {
    id: 'air-quality',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/AQ',
    title: { EN: 'Air Quality', AR: 'جودة الهواء' },
    heroHeading: { EN: 'Air Quality', AR: 'جودة الهواء' },
    heroDescription: {
      EN: 'Track ambient airshed metrics, particulate levels and urban atmospheric stations across Abu Dhabi.',
      AR: 'تتبع مؤشرات جودة الهواء المحيط ومستويات الجسيمات الدقيقة عبر محطات أبوظبي.',
    },
    ctaLabel: { EN: 'Explore Air Quality Data', AR: 'استكشف بيانات جودة الهواء' },
    icon: 'wind',
    cardImage: '/images/air-skyline-card.jpg',
    heroImage: '/images/air-skyline-card.jpg',
    imageAlt: 'Abu Dhabi modern skyline and sunlit waterfront horizon',
    datasetsCount: '1,240 datasets',
  },
  {
    id: 'marine-water-quality',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/MWQ',
    title: { EN: 'Marine Water Quality', AR: 'جودة المياه البحرية' },
    heroHeading: { EN: 'Marine Water Quality', AR: 'جودة المياه البحرية' },
    heroDescription: {
      EN: 'Monitor seawater clarity, dissolved oxygen, coastal reefs and marine ecosystems across Abu Dhabi.',
      AR: 'راقب صفاء مياه البحر والأكسجين المذاب والشعاب المرجانية والنظم البحرية في أبوظبي.',
    },
    ctaLabel: { EN: 'Explore Marine Data', AR: 'استكشف البيانات البحرية' },
    icon: 'waves',
    cardImage: '/images/update-marine-turtle.jpg',
    heroImage: '/images/marine-hero-bg.jpg',
    imageAlt: 'Sea turtle swimming over sunlit coral reef ecosystem in crystal blue Abu Dhabi waters',
    datasetsCount: '1,360 datasets',
  },
  {
    id: 'fisheries',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/FS',
    title: { EN: 'Fisheries', AR: 'الثروة السمكية' },
    heroHeading: { EN: 'Fisheries', AR: 'الثروة السمكية' },
    heroDescription: {
      EN: 'Analyse sustainable fisheries management, commercial landings and marine stock assessments.',
      AR: 'تحليل إدارة المصايد المستدامة ومعدلات الصيد التجاري وتقييمات المخزون السمكي.',
    },
    ctaLabel: { EN: 'Explore Fisheries Data', AR: 'استكشف بيانات الثروة السمكية' },
    icon: 'fish',
    cardImage: '/images/theme-fisheries.jpg',
    heroImage: '/images/theme-fisheries.jpg',
    imageAlt: 'Traditional wooden fishing dhows moored in turquoise Abu Dhabi harbor waters',
    datasetsCount: '690 datasets',
  },
  {
    id: 'protected-area',
    portalUrl: 'https://edp.ead.ae/map/Catalogue/PA',
    title: { EN: 'Protected Area', AR: 'المحميات الطبيعية' },
    heroHeading: { EN: 'Protected Area', AR: 'المحميات الطبيعية' },
    heroDescription: {
      EN: 'Conserve biodiversity across the Sheikh Zayed Protected Areas Network of terrestrial and marine reserves.',
      AR: 'الحفاظ على التنوع البيولوجي عبر شبكة زايد للمحميات الطبيعية البرية والبحرية.',
    },
    ctaLabel: { EN: 'Explore Protected Areas', AR: 'استكشف المحميات الطبيعية' },
    icon: 'shield',
    cardImage: '/images/update-mangroves-skyline.jpg',
    heroImage: '/images/update-mangroves-skyline.jpg',
    imageAlt: 'Protected turquoise tidal lagoon and coastal mangrove sanctuary in Abu Dhabi',
    datasetsCount: '1,120 datasets',
  },
];

export const SMART_APPLICATIONS: SmartApplication[] = [
  {
    id: 'avatar',
    url: 'https://avatar.ead.ae/',
    screenImage: '/images/screen-avatar.png',
    allowIframe: false,
    title: { EN: 'Avatar', AR: 'المساعد الرقمي' },
    shortDesc: {
      EN: 'EAD Avatar and chatbot are innovative AI-powered solutions that enhance environmental guidance across Abu Dhabi.',
      AR: 'حلول مبتكرة مدعومة بالذكاء الاصطناعي من هيئة البيئة – أبوظبي لتعزيز الإرشاد البيئي وتجربة المستخدم.',
    },
    icon: 'userCheck',
    metricTitle: 'AI Index',
    metricValue: '98%',
    metricStatus: 'Active',
    chartLabel: 'Guided Environmental Inquiries',
    chartBars: [52, 64, 58, 72, 69, 80, 76, 86, 84, 91, 88, 95],
    stations: [
      { id: 'ad-hq', label: 'Abu Dhabi HQ Hub', x: 58, y: 31, color: 'gold' },
      { id: 'al-dhafra-hub', label: 'Al Dhafra Portal Node', x: 26, y: 40, color: 'cyan' },
      { id: 'al-ain-hub', label: 'Al Ain Public Desk', x: 83, y: 43, color: 'gold' },
      { id: 'yas-center', label: 'Yas Sustainability Center', x: 63, y: 27, color: 'cyan' },
    ],
    features: [
      { icon: 'radio', title: { EN: 'AI Voice Guide', AR: 'دليل صوتي ذكي' } },
      { icon: 'chart', title: { EN: 'Bilingual Support', AR: 'دعم ثنائي اللغة' } },
      { icon: 'bell', title: { EN: 'Instant Guidance', AR: 'إرشاد فوري' } },
    ],
  },
  {
    id: 'chatbot',
    url: 'https://envirobot.ead.ae/',
    screenImage: '/images/screen-chatbot.png',
    allowIframe: false,
    title: { EN: 'Chatbot', AR: 'المحادثة الذكية' },
    shortDesc: {
      EN: 'EAD AI-powered chatbot delivering instant answers on environmental services, datasets, and regulations.',
      AR: 'مساعد محادثة ذكي مدعوم بالذكاء الاصطناعي يقدم إجابات فورية حول الخدمات والبيانات البيئية.',
    },
    icon: 'bot',
    metricTitle: 'Response',
    metricValue: '24/7',
    metricStatus: 'Online',
    chartLabel: 'Resolved Knowledge Sessions',
    chartBars: [46, 54, 62, 68, 71, 74, 79, 82, 85, 89, 92, 96],
    stations: [
      { id: 'ad-digital', label: 'Abu Dhabi Cloud Edge', x: 59, y: 30, color: 'gold' },
      { id: 'liwa-assist', label: 'Liwa Service Terminal', x: 44, y: 61, color: 'cyan' },
      { id: 'al-ain-chat', label: 'Al Ain Region', x: 82, y: 44, color: 'cyan' },
      { id: 'ruwais-chat', label: 'Ruwais Community Hub', x: 27, y: 39, color: 'gold' },
    ],
    features: [
      { icon: 'radio', title: { EN: 'Smart Answers', AR: 'إجابات ذكية' } },
      { icon: 'chart', title: { EN: 'Data Discovery', AR: 'اكتشاف البيانات' } },
      { icon: 'bell', title: { EN: '24/7 Assistant', AR: 'مساعد دائم' } },
    ],
  },
  {
    id: 'enviroportal',
    url: 'https://edp.ead.ae/map/',
    screenImage: '/images/screen-enviroportal.png',
    allowIframe: true,
    title: { EN: 'Enviroportal', AR: 'البوابة البيئية' },
    shortDesc: {
      EN: 'The Enviroportal by the Environment Agency – Abu Dhabi provides an interactive GIS platform for spatial environmental intelligence.',
      AR: 'توفر البوابة البيئية من هيئة البيئة – أبوظبي منصة نظم معلومات جغرافية تفاعلية للبيانات البيئية.',
    },
    icon: 'globe',
    metricTitle: 'Layers',
    metricValue: '140+',
    metricStatus: 'Synced',
    chartLabel: 'Geospatial Thematic Layers',
    chartBars: [58, 63, 70, 66, 75, 81, 84, 79, 88, 91, 86, 94],
    stations: [
      { id: 'gis-west', label: 'Western Marine GIS Grid', x: 20, y: 38, color: 'cyan' },
      { id: 'gis-marawah', label: 'Marawah Biosphere Layer', x: 36, y: 33, color: 'gold' },
      { id: 'gis-city', label: 'Abu Dhabi Island', x: 59, y: 29, color: 'gold' },
      { id: 'gis-east', label: 'Jebel Hafeet Corridor', x: 84, y: 47, color: 'cyan' },
    ],
    features: [
      { icon: 'radio', title: { EN: 'Interactive GIS', AR: 'خرائط تفاعلية' } },
      { icon: 'chart', title: { EN: 'Spatial Layers', AR: 'طبقات مكانية' } },
      { icon: 'bell', title: { EN: 'Open Catalogues', AR: 'فهارس مفتوحة' } },
    ],
  },
  {
    id: 'air-quality-portal',
    url: 'https://adairquality.ae/',
    screenImage: '/images/screen-air-quality.png',
    allowIframe: true,
    title: { EN: 'Air Quality Portal', AR: 'بوابة جودة الهواء' },
    shortDesc: {
      EN: 'The Abu Dhabi Air Quality website provides real-time data on air quality metrics and ambient forecasts across Abu Dhabi.',
      AR: 'يوفر موقع جودة الهواء في أبوظبي بيانات فورية وتوقعات شاملة لجودة الهواء عبر الإمارة.',
    },
    icon: 'wind',
    metricTitle: 'AQI',
    metricValue: '32',
    metricStatus: 'Good',
    chartLabel: 'Hourly Pollutant Dispersion Index',
    chartBars: [34, 48, 39, 62, 54, 45, 76, 84, 68, 52, 64, 46],
    stations: [
      { id: 'ad-city', label: 'Abu Dhabi Corniche', x: 58, y: 31, color: 'gold' },
      { id: 'ruwais', label: 'Al Dhafra / Ruwais', x: 26, y: 40, color: 'cyan' },
      { id: 'liwa', label: 'Liwa Oasis', x: 42, y: 63, color: 'gold' },
      { id: 'al-ain', label: 'Al Ain Oasis', x: 83, y: 43, color: 'cyan' },
      { id: 'mussafah', label: 'Mussafah Basin', x: 63, y: 39, color: 'cyan' },
    ],
    features: [
      { icon: 'radio', title: { EN: 'Real-time Monitoring', AR: 'المراقبة الفورية' } },
      { icon: 'chart', title: { EN: 'Air Quality Insights', AR: 'رؤى جودة الهواء' } },
      { icon: 'bell', title: { EN: 'Alerts & Notifications', AR: 'التنبيهات والإشعارات' } },
    ],
  },
  {
    id: 'abu-dhabi-nature',
    url: 'https://adnature.ead.ae/',
    screenImage: '/images/screen-abu-dhabi-nature.png',
    allowIframe: true,
    title: { EN: 'Abu Dhabi Nature', AR: 'طبيعة أبوظبي' },
    shortDesc: {
      EN: 'The Abu Dhabi Nature platform, managed by the Environment Agency – Abu Dhabi, showcases biodiversity, habitats, and species.',
      AR: 'منصة طبيعة أبوظبي بإدارة هيئة البيئة – أبوظبي لاستكشاف التنوع البيولوجي والموائل الطبيعية والأنواع.',
    },
    icon: 'leaf',
    metricTitle: 'Species',
    metricValue: '480+',
    metricStatus: 'Tracked',
    chartLabel: 'Protected Biodiversity Observations',
    chartBars: [45, 52, 58, 64, 67, 73, 78, 82, 86, 89, 92, 95],
    stations: [
      { id: 'wathba', label: 'Al Wathba Wetland', x: 65, y: 37, color: 'gold' },
      { id: 'jubail', label: 'Jubail Mangrove Park', x: 62, y: 29, color: 'cyan' },
      { id: 'houbara', label: 'Houbara Protected Area', x: 48, y: 54, color: 'gold' },
      { id: 'jebel-hafeet', label: 'Jebel Hafeet Park', x: 84, y: 48, color: 'cyan' },
    ],
    features: [
      { icon: 'radio', title: { EN: 'Species Atlas', AR: 'أطلس الأنواع' } },
      { icon: 'chart', title: { EN: 'Habitat Trends', AR: 'اتجاهات الموائل' } },
      { icon: 'bell', title: { EN: 'Reserve Alerts', AR: 'تنبيهات المحميات' } },
    ],
  },
];

export const DATA_COLLECTIONS: DataCollectionCard[] = [
  {
    id: 'col-air-quality',
    themeId: 'air-quality',
    title: { EN: 'Air Quality', AR: 'جودة الهواء' },
    countText: { EN: '1,240 datasets', AR: '١٬٢٤٠ مجموعة بيانات' },
    icon: 'wind',
    image: '/images/air-skyline-card.jpg',
    imageAlt: 'Abu Dhabi city skyline along waterfront',
  },
  {
    id: 'col-water-resources',
    themeId: 'groundwater',
    title: { EN: 'Water Resources', AR: 'الموارد المائية' },
    countText: { EN: '980 datasets', AR: '٩٨٠ مجموعة بيانات' },
    icon: 'droplet',
    image: '/images/theme-water-ripple.jpg',
    imageAlt: 'Concentric turquoise water droplet ripples',
  },
  {
    id: 'col-marine-environment',
    themeId: 'marine-water-quality',
    title: { EN: 'Marine Environment', AR: 'البيئة البحرية' },
    countText: { EN: '1,360 datasets', AR: '١٬٣٦٠ مجموعة بيانات' },
    icon: 'waves',
    image: '/images/marine-theme-card.jpg',
    imageAlt: 'Underwater coral reefs and marine species',
  },
  {
    id: 'col-biodiversity',
    themeId: 'protected-area',
    title: { EN: 'Biodiversity', AR: 'التنوع البيولوجي' },
    countText: { EN: '1,120 datasets', AR: '١٬١٢٠ مجموعة بيانات' },
    icon: 'leaf',
    image: '/images/biodiversity-flamingo.jpg',
    imageAlt: 'Greater flamingo standing in Abu Dhabi mangrove waters',
  },
  {
    id: 'col-land-habitat',
    themeId: 'soil',
    title: { EN: 'Land & Habitat', AR: 'الأراضي والموائل' },
    countText: { EN: '950 datasets', AR: '٩٥٠ مجموعة بيانات' },
    icon: 'mountain',
    image: '/images/collection-dunes-card.jpg',
    imageAlt: 'Golden desert dunes in Abu Dhabi',
  },
];

export const LATEST_UPDATES: UpdateArticle[] = [
  {
    id: 'new-mangrove-dataset',
    badge: { EN: 'NEW DATASET', AR: 'بيانات جديدة' },
    title: { EN: 'New Dataset Released', AR: 'إطلاق مجموعة بيانات جديدة' },
    description: {
      EN: 'Updated mangrove coverage and coastal ecosystem data for Abu Dhabi.',
      AR: 'تحديث بيانات تغطية أشجار القرم والنظم البيئية الساحلية في أبوظبي.',
    },
    date: '15 Jan 2026',
    cta: { EN: 'Learn More', AR: 'اعرف المزيد' },
    image: '/images/update-mangroves-skyline.jpg',
    imageAlt: 'Abu Dhabi coastal mangroves and skyline reflection',
  },
  {
    id: 'marine-monitoring-insights',
    badge: { EN: 'INSIGHTS', AR: 'رؤى بيئية' },
    title: { EN: 'Marine Monitoring Insights', AR: 'رؤى المراقبة البحرية' },
    description: {
      EN: 'Key trends in marine water quality and coastal health across Abu Dhabi.',
      AR: 'أبرز الاتجاهات في جودة المياه البحرية وصحة السواحل في أبوظبي.',
    },
    date: '10 Jan 2026',
    cta: { EN: 'View Insights', AR: 'عرض الرؤى' },
    image: '/images/update-marine-turtle.jpg',
    imageAlt: 'Green sea turtle swimming above coral reef ecosystem',
  },
  {
    id: 'platform-enhancement',
    badge: { EN: 'PLATFORM', AR: 'المنصة' },
    title: { EN: 'Platform Enhancement', AR: 'تطوير المنصة' },
    description: {
      EN: 'New features for faster data discovery, smarter search and an improved user experience.',
      AR: 'ميزات جديدة لاكتشاف البيانات بسرعة أكبر وبحث أذكى وتجربة مستخدم مطورة.',
    },
    date: '05 Jan 2026',
    cta: { EN: "Explore What's New", AR: 'اكتشف الجديد' },
    image: '/images/update-dashboard-futuristic.jpg',
    imageAlt: 'Futuristic environmental intelligence dashboard interface',
  },
];

export const INSIGHT_STATS: InsightStat[] = [
  {
    id: 'catalogues',
    target: 160,
    suffix: '+',
    label: { EN: 'Data Catalogues', AR: 'فهارس البيانات' },
    icon: 'layers',
  },
  {
    id: 'applications',
    target: 12,
    suffix: '',
    label: { EN: 'Applications', AR: 'التطبيقات' },
    icon: 'grid',
  },
  {
    id: 'records',
    target: 50,
    suffix: 'M+',
    label: { EN: 'Data Records', AR: 'سجل بيانات' },
    icon: 'database',
  },
  {
    id: 'themes',
    target: 20,
    suffix: '+',
    label: { EN: 'Environmental Themes', AR: 'موضوعاً بيئياً' },
    icon: 'leaf',
  },
];
