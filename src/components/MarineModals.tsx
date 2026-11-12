import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers,
  Lock,
  MapPin,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
import {
  DATA_COLLECTIONS,
  DataCollectionCard,
  ENVIRONMENTAL_THEMES,
  EnvironmentalTheme,
  LATEST_UPDATES,
  Language,
  SMART_APPLICATIONS,
  SmartApplication,
  ThemeId,
  UpdateArticle,
} from '../data/marinePlatformData';

export type MarineModalState =
  | { kind: 'none' }
  | { kind: 'overview' }
  | { kind: 'search'; query: string }
  | { kind: 'theme'; theme: EnvironmentalTheme }
  | { kind: 'collection'; collection: DataCollectionCard }
  | { kind: 'allDatasets' }
  | { kind: 'application'; app: SmartApplication }
  | { kind: 'allApps' }
  | { kind: 'article'; article: UpdateArticle }
  | { kind: 'allUpdates' }
  | { kind: 'about' }
  | { kind: 'login' }
  | { kind: 'support'; topic: string };

interface MarineModalsProps {
  lang: Language;
  modal: MarineModalState;
  onClose: () => void;
  onChangeModal: (next: MarineModalState) => void;
  onActivateTheme: (id: ThemeId) => void;
}

interface SampleDatasetRow {
  titleEn: string;
  titleAr: string;
  formats: string[];
  updated: string;
  coverage: string;
}

const SAMPLE_ROWS_BY_THEME: Record<ThemeId, SampleDatasetRow[]> = {
  ecosystem: [
    {
      titleEn: 'Abu Dhabi Wetland & Coastal Sabkha Ecosystem Classification Atlas',
      titleAr: 'أطلس تصنيف النظم البيئية للأراضي الرطبة والسبخات الساحلية في أبوظبي',
      formats: ['GeoJSON', 'Shapefile', 'WMS'],
      updated: 'Jan 2026',
      coverage: 'Emirate Wetlands',
    },
    {
      titleEn: 'Terrestrial & Coastal Ecological Corridors Connectivity Index',
      titleAr: 'مؤشر ترابط الممرات البيئية البرية والساحلية',
      formats: ['GeoTIFF', 'CSV', 'API'],
      updated: 'Q4 2025',
      coverage: 'Abu Dhabi Emirate',
    },
  ],
  groundwater: [
    {
      titleEn: 'Strategic Freshwater Aquifer Piezometric & Salinity Grid',
      titleAr: 'شبكة مراقبة منسوب وملوحة المياه الجوفية الاستراتيجية',
      formats: ['GeoJSON', 'CSV', 'API'],
      updated: 'Monthly · 2026',
      coverage: 'Al Ain, Al Dhafra & Abu Dhabi',
    },
    {
      titleEn: 'Groundwater Extraction Well Inventory & Recharge Monitoring Series',
      titleAr: 'سجل آبار استخراج المياه الجوفية ومراقبة التغذية المائية',
      formats: ['REST API', 'CSV', 'Shapefile'],
      updated: 'Q1 2026',
      coverage: 'Liwa & Al Ain Aquifers',
    },
  ],
  soil: [
    {
      titleEn: 'Abu Dhabi Soil Horizons, Salinity & Carbon Content Survey',
      titleAr: 'مسح آفاق التربة وملوحتها ومحتوى الكربون في إمارة أبوظبي',
      formats: ['Shapefile', 'GeoTIFF', 'WMS'],
      updated: 'Jan 2026',
      coverage: 'Al Dhafra & Al Ain',
    },
    {
      titleEn: 'Desert Geomorphology & Sabkha Soil Suitability Layers',
      titleAr: 'طبقات الجيومورفولوجيا الصحراوية وملاءمة تربة السبخات',
      formats: ['GeoJSON', 'WMS'],
      updated: 'Dec 2025',
      coverage: 'Emirate Terrestrial Extent',
    },
  ],
  'waste-management': [
    {
      titleEn: 'Integrated Municipal & Industrial Waste Diversion & Recycling Registry',
      titleAr: 'سجل تحويل النفايات البلدية والصناعية وإعادة التدوير المتكامل',
      formats: ['REST API', 'CSV', 'JSON'],
      updated: 'Monthly · 2026',
      coverage: 'Emirate Recovery Facilities',
    },
    {
      titleEn: 'Hazardous Material Treatment & Circular Recovery Flow Analytics',
      titleAr: 'تحليلات معالجة المواد الخطرة وتدفقات الاسترداد الدائري',
      formats: ['CSV', 'JSON'],
      updated: 'Q1 2026',
      coverage: 'Industrial Zones',
    },
  ],
  'air-quality': [
    {
      titleEn: 'Abu Dhabi Continuous Ambient Air Quality (PM2.5, PM10, NO2, O3)',
      titleAr: 'بيانات جودة الهواء المحيط المستمرة في أبوظبي',
      formats: ['REST API', 'JSON', 'CSV'],
      updated: 'Live · Hourly',
      coverage: '22 Fixed Stations',
    },
    {
      titleEn: 'Emirate-wide Airshed Dispersion & Dust Plume Climatology',
      titleAr: 'نماذج تشتت الملوثات والعواصف الغبارية على مستوى الإمارة',
      formats: ['GeoTIFF', 'WMS', 'NetCDF'],
      updated: 'Jan 2026',
      coverage: '67,340 km²',
    },
  ],
  'marine-water-quality': [
    {
      titleEn: 'Abu Dhabi Blue Carbon Mangrove Canopy & Seagrass Water Clarity Atlas',
      titleAr: 'أطلس أشجار القرم والأعشاب البحرية وجودة المياه الساحلية في أبوظبي',
      formats: ['GeoJSON', 'Shapefile', 'WMS'],
      updated: '15 Jan 2026',
      coverage: '3,100+ km Coastline',
    },
    {
      titleEn: 'Coastal Buoy Telemetry — Dissolved Oxygen, Turbidity & pH Series',
      titleAr: 'قراءات العوامات البحرية — الأكسجين المذاب والعكارة ودرجة الحموضة',
      formats: ['REST API', 'NetCDF', 'CSV'],
      updated: 'Live · Hourly',
      coverage: 'Arabian Gulf Coast',
    },
  ],
  fisheries: [
    {
      titleEn: 'Commercial Fisheries Catch Effort, Fleet Landing & Stock Biomass Index',
      titleAr: 'مؤشر مصيد الأسماك التجارية وجهد الصيد والكتلة الحيوية المخزونية',
      formats: ['CSV', 'REST API', 'JSON'],
      updated: 'Monthly · 2026',
      coverage: 'Abu Dhabi Fishing Ports',
    },
    {
      titleEn: 'Sustainable Aquaculture Zoning & Key Fish Spawning Grounds',
      titleAr: 'نطاقات الاستزراع السمكي المستدام ومناطق تكاثر الأسماك الرئيسية',
      formats: ['GeoJSON', 'Shapefile', 'WMS'],
      updated: 'Jan 2026',
      coverage: 'Territorial Marine Waters',
    },
  ],
  'protected-area': [
    {
      titleEn: 'Sheikh Zayed Protected Areas Network & Marine Reserve Boundaries',
      titleAr: 'حدود شبكة زايد للمحميات الطبيعية والمناطق البحرية المحمية',
      formats: ['Shapefile', 'GeoJSON', 'WFS'],
      updated: 'Jan 2026',
      coverage: '20 Terrestrial & Marine Reserves',
    },
    {
      titleEn: 'Protected Area Mangrove Carbon & Key Biodiversity Census',
      titleAr: 'إحصاء التنوع البيولوجي وكربون أشجار القرم في المحميات الطبيعية',
      formats: ['CSV', 'REST API'],
      updated: 'Q4 2025',
      coverage: 'Al Wathba & Marawah Reserves',
    },
  ],
};

export const MarineModals: React.FC<MarineModalsProps> = ({
  lang,
  modal,
  onClose,
  onChangeModal,
  onActivateTheme,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [loginSubmitted, setLoginSubmitted] = useState(false);
  const [requestedItem, setRequestedItem] = useState<string | null>(null);

  useEffect(() => {
    if (modal.kind === 'search') {
      setSearchInput(modal.query);
    }
    setLoginSubmitted(false);
    setRequestedItem(null);
  }, [modal]);

  useEffect(() => {
    if (modal.kind === 'none') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modal.kind, onClose]);

  const searchResults = useMemo(() => {
    const q = searchInput.trim().toLowerCase();
    const themes = ENVIRONMENTAL_THEMES.filter(
      (t) =>
        !q ||
        t.title.EN.toLowerCase().includes(q) ||
        t.title.AR.includes(q) ||
        t.heroDescription.EN.toLowerCase().includes(q)
    );
    const apps = SMART_APPLICATIONS.filter(
      (a) =>
        !q ||
        a.title.EN.toLowerCase().includes(q) ||
        a.title.AR.includes(q) ||
        a.shortDesc.EN.toLowerCase().includes(q)
    );
    const collections = DATA_COLLECTIONS.filter(
      (c) =>
        !q ||
        c.title.EN.toLowerCase().includes(q) ||
        c.title.AR.includes(q) ||
        c.countText.EN.toLowerCase().includes(q)
    );
    const updates = LATEST_UPDATES.filter(
      (u) =>
        !q ||
        u.title.EN.toLowerCase().includes(q) ||
        u.title.AR.includes(q) ||
        u.description.EN.toLowerCase().includes(q)
    );
    return { themes, apps, collections, updates };
  }, [searchInput]);

  return (
    <AnimatePresence>
      {modal.kind !== 'none' && (
        <motion.div
          key="marine-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#00141B]/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            key="marine-modal-panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[780px] max-h-[88vh] overflow-y-auto rounded-[24px] ocean-glass-strong border border-[#00D9E8]/45 shadow-[0_28px_80px_rgba(0,12,18,0.88),0_0_40px_rgba(0,217,232,0.18)] text-white"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'EN' ? 'Close modal' : 'إغلاق'}
              className="sticky top-4 float-right mr-4 mt-4 z-20 w-9 h-9 rounded-full bg-[#FFC75E]/20 border border-[#FFC75E]/65 text-[#FFE8AD] hover:bg-[#FFC75E] hover:text-[#002C3A] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 1. WATCH OVERVIEW */}
            {modal.kind === 'overview' && (
              <div className="p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC75E]/15 border border-[#FFC75E]/40 text-[#FFC75E] text-[11px] font-bold tracking-[0.14em] uppercase mb-3">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {lang === 'EN' ? 'Platform Overview' : 'نظرة عامة على المنصة'}
                </div>
                <h3 className="font-display font-extrabold text-[24px] sm:text-[28px] text-white">
                  {lang === 'EN'
                    ? 'Environment Agency – Abu Dhabi Data Intelligence Tour'
                    : 'جولة ذكاء البيانات البيئية – هيئة البيئة أبوظبي'}
                </h3>
                <p className="mt-2 text-[14px] text-[#C6E4E8] max-w-2xl">
                  {lang === 'EN'
                    ? 'Explore how EAD unifies marine telemetry, airshed monitoring stations, coastal mangrove mapping and biodiversity corridors into one high-precision data experience.'
                    : 'اكتشف كيف توحد هيئة البيئة – أبوظبي بيانات الرصد البحري ومحطات جودة الهواء وخرائط أشجار القرم وممرات التنوع البيولوجي في منصة واحدة.'}
                </p>

                <div className="mt-5 relative rounded-2xl overflow-hidden border border-[#00D9E8]/35 aspect-[16/9] bg-[#001D26]">
                  <img
                    src="/images/marine-hero-bg.jpg"
                    alt="EAD Marine Ecosystem Overview"
                    className="w-full h-full object-cover animate-hero-zoom"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001D26] via-[#002C3A]/35 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002C3A]/85 border border-[#00D9E8]/45 text-[12px] text-[#80F5F5]">
                        <span className="w-2 h-2 rounded-full bg-[#2FE89A] animate-pulse" />
                        160+ {lang === 'EN' ? 'Live Data Catalogues' : 'فهرس بيانات'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#002C3A]/85 border border-[#FFC75E]/45 text-[12px] text-[#FFC75E]">
                        50M+ {lang === 'EN' ? 'Telemetry Records' : 'سجل رصد'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onChangeModal({ kind: 'allApps' })}
                      className="golden-pill-btn px-4 py-2 text-[12.5px] font-bold inline-flex items-center gap-1.5"
                    >
                      <span>{lang === 'EN' ? 'Open Smart Applications' : 'فتح التطبيقات الذكية'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SEARCH CATALOGUE */}
            {modal.kind === 'search' && (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[#80F5F5] text-[11px] font-bold tracking-[0.14em] uppercase mb-2">
                  <Search className="w-3.5 h-3.5" />
                  {lang === 'EN' ? 'Unified EDP Discovery' : 'البحث الموحد في المنصة'}
                </div>
                <h3 className="font-display font-extrabold text-[22px] sm:text-[26px]">
                  {lang === 'EN' ? 'Search Environmental Data & Tools' : 'البحث في البيانات والتطبيقات البيئية'}
                </h3>

                <div className="mt-4 relative">
                  <Search className="w-4 h-4 text-[#80F5F5] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder={
                      lang === 'EN'
                        ? 'Filter themes, smart apps, collections or updates...'
                        : 'تصفية المحاور والتطبيقات ومجموعات البيانات...'
                    }
                    className="w-full rounded-full bg-[#00222E] border border-[#00D9E8]/50 pl-11 pr-4 py-2.5 text-[14px] text-white placeholder-[#93CDD6] outline-none focus:border-[#FFC75E]"
                  />
                </div>

                <div className="mt-5 space-y-5">
                  {searchResults.themes.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFC75E] mb-2">
                        {lang === 'EN' ? 'Environmental Themes' : 'المحاور البيئية'} ({searchResults.themes.length})
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {searchResults.themes.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => onChangeModal({ kind: 'theme', theme: t })}
                            className="hover-sheen ead-glass-card ead-rim-glint text-left p-3.5 rounded-[14px] transition-all flex items-center justify-between gap-2"
                          >
                            <div>
                              <div className="font-semibold text-[14px] text-white">
                                {t.title[lang]}
                              </div>
                              <div className="text-[12px] text-[#80F5F5]">{t.datasetsCount}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#FFC75E]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.apps.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFC75E] mb-2">
                        {lang === 'EN' ? 'Smart Applications' : 'التطبيقات الذكية'} ({searchResults.apps.length})
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {searchResults.apps.map((app) => (
                          <button
                            key={app.id}
                            type="button"
                            onClick={() => onChangeModal({ kind: 'application', app })}
                            className="hover-sheen ead-glass-card ead-rim-glint text-left p-3.5 rounded-[14px] transition-all flex items-center justify-between gap-2"
                          >
                            <div>
                              <div className="font-semibold text-[14px] text-white">
                                {app.title[lang]}
                              </div>
                              <div className="text-[12px] text-[#C6E4E8] line-clamp-1">
                                {app.metricTitle}: {app.metricValue}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#00D9E8]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.collections.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#FFC75E] mb-2">
                        {lang === 'EN' ? 'Data Collections' : 'مجموعات البيانات'} ({searchResults.collections.length})
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {searchResults.collections.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => onChangeModal({ kind: 'collection', collection: c })}
                            className="hover-sheen ead-glass-card ead-rim-glint text-left p-3.5 rounded-[14px] transition-all flex items-center justify-between gap-2"
                          >
                            <div>
                              <div className="font-semibold text-[14px] text-white">
                                {c.title[lang]}
                              </div>
                              <div className="text-[12px] text-[#80F5F5]">{c.countText[lang]}</div>
                            </div>
                            <Database className="w-4 h-4 text-[#80F5F5]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.themes.length === 0 &&
                    searchResults.apps.length === 0 &&
                    searchResults.collections.length === 0 &&
                    searchResults.updates.length === 0 && (
                      <div className="ead-glass-card ead-rim-glint p-6 rounded-2xl text-center text-[#C6E4E8] text-[14px]">
                        {lang === 'EN'
                          ? `No items matched "${searchInput}". Try "Marine", "Mangrove", "Air Quality", or "Permits".`
                          : `لم يتم العثور على نتائج مطابقة لـ "${searchInput}".`}
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* 3. ENVIRONMENTAL THEME CATALOGUE */}
            {modal.kind === 'theme' && (
              <div>
                <div className="relative h-52 sm:h-60 overflow-hidden rounded-t-[24px]">
                  <img
                    src={modal.theme.heroImage}
                    alt={modal.theme.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002C3A] via-[#002C3A]/45 to-transparent" />
                  <div className="absolute bottom-5 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFC75E] text-[#051822] text-[10.5px] font-extrabold uppercase tracking-wider mb-1.5">
                        {modal.theme.datasetsCount}
                      </span>
                      <h3 className="font-display font-extrabold text-[26px] sm:text-[32px] text-white leading-tight">
                        {modal.theme.title[lang]}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href={modal.theme.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="golden-pill-btn px-4 py-2 rounded-full text-[12.5px] font-bold inline-flex items-center gap-1.5 transition-transform hover:scale-[1.03]"
                      >
                        <span>{lang === 'EN' ? 'Open Portal' : 'فتح البوابة'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          onActivateTheme(modal.theme.id);
                          onClose();
                        }}
                        className="golden-pill-btn px-4 py-2 rounded-full text-[12.5px] font-bold transition-transform hover:scale-[1.03]"
                      >
                        {lang === 'EN' ? 'Highlight on Homepage' : 'تفعيل على الرئيسية'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  <p className="text-[14.5px] text-[#D8F0F3] leading-relaxed">
                    {modal.theme.heroDescription[lang]}
                  </p>

                  <div>
                    <h4 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#FFC75E] mb-3">
                      {lang === 'EN' ? 'Featured Datasets in Catalogue' : 'مجموعات البيانات المختارة'}
                    </h4>
                    <div className="space-y-3">
                      {SAMPLE_ROWS_BY_THEME[modal.theme.id].map((row) => (
                        <div
                          key={row.titleEn}
                          className="ead-glass-card ead-rim-glint p-4 rounded-[18px] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="font-semibold text-[14px] text-white">
                              {lang === 'EN' ? row.titleEn : row.titleAr}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-[#9DD3DB]">
                              <span>{row.coverage}</span>
                              <span>•</span>
                              <span>{row.updated}</span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {row.formats.map((fmt) => (
                                <span
                                  key={fmt}
                                  className="px-2 py-0.5 rounded bg-[#004C59]/80 border border-[#80F5F5]/25 text-[10.5px] font-semibold text-[#80F5F5]"
                                >
                                  {fmt}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setRequestedItem(row.titleEn)}
                            className="shrink-0 golden-pill-btn px-4 py-2 text-[12px] font-bold inline-flex items-center gap-1.5"
                          >
                            {requestedItem === row.titleEn ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{lang === 'EN' ? 'Package Prepared' : 'تم التحضير'}</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5" />
                                <span>{lang === 'EN' ? 'Access Data' : 'تحميل البيانات'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. DATA COLLECTION CATALOGUE */}
            {modal.kind === 'collection' && (
              <div>
                <div className="relative h-48 overflow-hidden rounded-t-[24px]">
                  <img
                    src={modal.collection.image}
                    alt={modal.collection.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002C3A] via-[#002C3A]/45 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00D9E8]/25 border border-[#00D9E8] text-[#80F5F5] text-[11px] font-bold mb-1.5">
                      {modal.collection.countText[lang]}
                    </span>
                    <h3 className="font-display font-extrabold text-[26px] text-white">
                      {modal.collection.title[lang]}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <p className="text-[14px] text-[#C6E4E8]">
                    {lang === 'EN'
                      ? `Curated geospatial and monitoring records governed under Environment Agency – Abu Dhabi open environmental data standards (OGC / ISO 19115).`
                      : `سجلات مكانية وبيئية معتمدة وفق معايير البيانات المفتوحة لهيئة البيئة – أبوظبي.`}
                  </p>
                  <div className="space-y-3">
                    {SAMPLE_ROWS_BY_THEME[modal.collection.themeId].map((row) => (
                      <div
                        key={row.titleEn}
                        className="ead-glass-card ead-rim-glint p-4 rounded-[18px] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-semibold text-[14px]">
                            {lang === 'EN' ? row.titleEn : row.titleAr}
                          </div>
                          <div className="text-[12px] text-[#80F5F5] mt-1">
                            {row.coverage} · {row.updated} · {row.formats.join(' / ')}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setRequestedItem(row.titleEn)}
                          className="shrink-0 golden-pill-btn px-4 py-2 text-[12px] font-bold inline-flex items-center gap-1.5"
                        >
                          {requestedItem === row.titleEn ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{lang === 'EN' ? 'Ready' : 'جاهز'}</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>{lang === 'EN' ? 'Download' : 'تنزيل'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. ALL DATASETS DIRECTORY */}
            {modal.kind === 'allDatasets' && (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-[#80F5F5] text-[11px] font-bold tracking-[0.14em] uppercase mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  {lang === 'EN' ? 'Complete EDP Directory' : 'دليل فهارس البيانات الكامل'}
                </div>
                <h3 className="font-display font-extrabold text-[24px] sm:text-[28px]">
                  {lang === 'EN' ? 'All Environmental Data Collections' : 'جميع مجموعات البيانات البيئية'}
                </h3>
                <div className="mt-5 grid sm:grid-cols-2 gap-3.5">
                  {DATA_COLLECTIONS.map((col) => (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => onChangeModal({ kind: 'collection', collection: col })}
                      className="hover-sheen ead-glass-card ead-rim-glint group relative h-32 rounded-[18px] overflow-hidden transition-all text-left"
                    >
                      <img
                        src={col.image}
                        alt={col.imageAlt}
                        className="absolute inset-x-0 bottom-0 h-[58%] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(0, 56, 72, 0.96) 0%, rgba(0, 58, 74, 0.86) 48%, rgba(0, 44, 58, 0.18) 80%, rgba(0, 28, 38, 0.3) 100%)',
                        }}
                      />
                      <div className="relative z-10 h-full p-4 flex flex-col justify-start">
                        <div className="font-display font-bold text-[16.5px] text-white group-hover:text-[#80F5F5] transition-colors">
                          {col.title[lang]}
                        </div>
                        <div className="mt-0.5 text-[12px] text-[#D2EEF2] group-hover:text-[#FFC75E] font-medium transition-colors">
                          {col.countText[lang]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SMART APPLICATION LAUNCHER */}
            {modal.kind === 'application' && (
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#FFC75E]">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === 'EN' ? 'Smart Application Workspace' : 'مساحة عمل التطبيق الذكي'}
                    </div>
                    <h3 className="font-display font-extrabold text-[24px] sm:text-[28px] mt-1">
                      {modal.app.title[lang]}
                    </h3>
                  </div>
                  <div className="px-4 py-2 rounded-2xl bg-[#00222E] border border-[#00D9E8]/40 text-right">
                    <div className="text-[10.5px] uppercase tracking-wider text-[#80F5F5]">
                      {modal.app.metricTitle}
                    </div>
                    <div className="font-display font-extrabold text-[22px] text-[#FFC75E]">
                      {modal.app.metricValue}{' '}
                      <span className="text-[12px] text-[#2FE89A] font-semibold">
                        ({modal.app.metricStatus})
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] text-[#C6E4E8]">{modal.app.shortDesc[lang]}</p>

                <div className="grid sm:grid-cols-3 gap-3">
                  {modal.app.stations.map((st) => (
                    <div
                      key={st.id}
                      className="ead-glass-card ead-rim-glint p-3.5 rounded-[14px] flex items-center gap-2.5"
                    >
                      <MapPin
                        className={`w-4 h-4 shrink-0 ${
                          st.color === 'gold' ? 'text-[#FFC75E]' : 'text-[#00D9E8]'
                        }`}
                      />
                      <div>
                        <div className="text-[13px] font-semibold text-white">{st.label}</div>
                        <div className="text-[11px] text-[#80F5F5]">
                          {lang === 'EN' ? 'Telemetry online' : 'متصل بالرصد المباشر'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                  <div className="text-[12.5px] text-[#9DD3DB] flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00D9E8]" />
                    <span>{modal.app.chartLabel}</span>
                  </div>
                  <a
                    href={modal.app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="golden-pill-btn px-5 py-2.5 text-[13.5px] font-bold inline-flex items-center gap-2"
                  >
                    <span>
                      {lang === 'EN' ? 'Launch Full Portal' : 'تشغيل البوابة الكاملة'}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* 7. ALL SMART APPLICATIONS */}
            {modal.kind === 'allApps' && (
              <div className="p-6 sm:p-8">
                <div className="text-[#80F5F5] text-[11px] font-bold tracking-[0.14em] uppercase mb-1.5">
                  {lang === 'EN' ? 'EDP Applications Hub' : 'مركز التطبيقات الذكية'}
                </div>
                <h3 className="font-display font-extrabold text-[24px] sm:text-[28px]">
                  {lang === 'EN' ? 'All Smart Environmental Applications' : 'جميع التطبيقات البيئية الذكية'}
                </h3>
                <div className="mt-5 grid sm:grid-cols-2 gap-3.5">
                  {SMART_APPLICATIONS.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => onChangeModal({ kind: 'application', app })}
                      className="hover-sheen ead-glass-card ead-rim-glint p-4 rounded-[18px] text-left transition-all flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display font-bold text-[17px] text-white">
                            {app.title[lang]}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#FFC75E]/15 text-[#FFC75E] text-[11px] font-bold">
                            {app.metricValue}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[13px] text-[#C6E4E8]">{app.shortDesc[lang]}</p>
                      </div>
                      <div className="text-[12.5px] font-semibold text-[#80F5F5] inline-flex items-center gap-1.5">
                        <span>{lang === 'EN' ? 'Open Workspace' : 'فتح التطبيق'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 8. ARTICLE READER */}
            {modal.kind === 'article' && (
              <div>
                <div className="relative h-56 overflow-hidden rounded-t-[24px]">
                  <img
                    src={modal.article.image}
                    alt={modal.article.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002C3A] via-[#002C3A]/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FFC75E] text-[#051822] text-[10.5px] font-extrabold uppercase tracking-wider mb-2">
                      {modal.article.badge[lang]}
                    </span>
                    <h3 className="font-display font-extrabold text-[24px] sm:text-[28px] text-white">
                      {modal.article.title[lang]}
                    </h3>
                  </div>
                </div>
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-[12.5px] text-[#80F5F5]">
                    <Calendar className="w-4 h-4" />
                    <span>{modal.article.date}</span>
                    <span>•</span>
                    <span>Environment Agency – Abu Dhabi</span>
                  </div>
                  <p className="text-[15px] text-[#E6F4F6] leading-relaxed">
                    {modal.article.description[lang]}
                  </p>
                  <p className="text-[14px] text-[#B8D7DC] leading-relaxed">
                    {lang === 'EN'
                      ? 'The updated release incorporates verified multi-sensor observations, satellite Earth-observation Calibration across Abu Dhabi coastal lagoons, and standardized metadata ready for GIS analysts and researchers.'
                      : 'يتضمن الإصدار المحدث قراءات متعددة الحساسات ومعايرة صور الأقمار الاصطناعية عبر السواحل والجزر في أبوظبي مع بيانات وصفية موحدة جاهزة للباحثين ومحللي نظم المعلومات الجغرافية.'}
                  </p>
                </div>
              </div>
            )}

            {/* 9. ALL UPDATES */}
            {modal.kind === 'allUpdates' && (
              <div className="p-6 sm:p-8">
                <div className="text-[#80F5F5] text-[11px] font-bold tracking-[0.14em] uppercase mb-1.5">
                  {lang === 'EN' ? 'Newsroom & Releases' : 'الأخبار والإصدارات'}
                </div>
                <h3 className="font-display font-extrabold text-[24px] sm:text-[28px]">
                  {lang === 'EN' ? 'Latest Platform Updates' : 'جميع التحديثات والإصدارات'}
                </h3>
                <div className="mt-5 space-y-3">
                  {LATEST_UPDATES.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChangeModal({ kind: 'article', article: item })}
                      className="hover-sheen ead-glass-card ead-rim-glint w-full p-4 rounded-[18px] text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                    >
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-[#FFC75E]/20 text-[#FFC75E] text-[10px] font-bold uppercase mr-2">
                          {item.badge[lang]}
                        </span>
                        <span className="text-[12px] text-[#80F5F5]">{item.date}</span>
                        <div className="font-display font-bold text-[17px] mt-1">
                          {item.title[lang]}
                        </div>
                        <p className="text-[13px] text-[#C6E4E8] mt-0.5">{item.description[lang]}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#FFC75E] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 10. ABOUT PLATFORM */}
            {modal.kind === 'about' && (
              <div className="p-6 sm:p-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9E8]/15 border border-[#00D9E8]/40 text-[#80F5F5] text-[11px] font-bold tracking-[0.14em] uppercase">
                  <Globe2 className="w-3.5 h-3.5" />
                  {lang === 'EN' ? 'About the Platform' : 'حول المنصة'}
                </div>
                <h3 className="font-display font-extrabold text-[24px] sm:text-[30px]">
                  {lang === 'EN'
                    ? 'A Trusted Source for Abu Dhabi Environmental Intelligence'
                    : 'مصدر موثوق لذكاء البيانات البيئية في أبوظبي'}
                </h3>
                <p className="text-[14.5px] text-[#C6E4E8] leading-relaxed">
                  {lang === 'EN'
                    ? 'The Environmental Data Platform (EDP) is Environment Agency – Abu Dhabi’s central gateway for validated environmental datasets, spatial atlases, and decision-support applications covering marine ecosystems, ambient air quality, freshwater aquifers, biodiversity, climate resilience, and terrestrial habitats.'
                    : 'منصة البيانات البيئية (EDP) هي البوابة المركزية لهيئة البيئة – أبوظبي للوصول إلى مجموعات البيانات البيئية المعتمدة والأطالس المكانية والتطبيقات الذكية الداعمة لصناعة القرار.'}
                </p>
                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  {[
                    {
                      icon: <ShieldCheck className="w-5 h-5 text-[#FFC75E]" />,
                      title: lang === 'EN' ? 'Verified Governance' : 'حوكمة موثوقة',
                      desc: lang === 'EN' ? 'ISO 19115 & OGC compliant' : 'متوافق مع معايير OGC',
                    },
                    {
                      icon: <Database className="w-5 h-5 text-[#00D9E8]" />,
                      title: lang === 'EN' ? '160+ Catalogues' : 'أكثر من 160 فهرساً',
                      desc: lang === 'EN' ? '50M+ validated observations' : 'أكثر من 50 مليون سجل',
                    },
                    {
                      icon: <FileText className="w-5 h-5 text-[#80F5F5]" />,
                      title: lang === 'EN' ? 'Open API & GIS' : 'واجهات برمجة مفتوحة',
                      desc: lang === 'EN' ? 'REST, WMS, WFS & GeoJSON' : 'تنسيقات جغرافية مفتوحة',
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="ead-glass-card ead-rim-glint p-4 rounded-[18px]"
                    >
                      {card.icon}
                      <div className="font-semibold text-[14px] mt-2">{card.title}</div>
                      <div className="text-[12px] text-[#9DD3DB] mt-0.5">{card.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. LOGIN */}
            {modal.kind === 'login' && (
              <div className="p-6 sm:p-8 max-w-md mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9E8]/15 border border-[#00D9E8]/40 text-[#80F5F5] text-[11px] font-bold tracking-[0.14em] uppercase mb-3">
                  <Lock className="w-3.5 h-3.5" />
                  {lang === 'EN' ? 'EAD Portal Sign In' : 'تسجيل الدخول للمنصة'}
                </div>
                <h3 className="font-display font-extrabold text-[24px]">
                  {lang === 'EN' ? 'Access Restricted Datasets' : 'الوصول للبيانات المتقدمة'}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-[#C6E4E8]">
                  {lang === 'EN'
                    ? 'Sign in with UAE PASS or your EAD organizational researcher credentials.'
                    : 'سجل الدخول باستخدام الهوية الرقمية أو حساب الباحث المؤسسي.'}
                </p>

                <button
                  type="button"
                  onClick={() => setLoginSubmitted(true)}
                  className="golden-pill-btn mt-5 w-full py-3 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{lang === 'EN' ? 'Continue with UAE PASS' : 'المتابعة بالهوية الرقمية'}</span>
                </button>

                <div className="my-4 flex items-center gap-3 text-[11.5px] text-[#80F5F5]/70">
                  <span className="flex-1 h-[1px] bg-white/15" />
                  <span>{lang === 'EN' ? 'OR EMAIL LOGIN' : 'أو البريد المؤسسي'}</span>
                  <span className="flex-1 h-[1px] bg-white/15" />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoginSubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="researcher@ead.gov.ae"
                    className="w-full rounded-xl bg-[#00222E] border border-[#00D9E8]/40 px-4 py-2.5 text-[13.5px] text-white placeholder-[#7CB8C1] outline-none focus:border-[#FFC75E]"
                  />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-[#00222E] border border-[#00D9E8]/40 px-4 py-2.5 text-[13.5px] text-white placeholder-[#7CB8C1] outline-none focus:border-[#FFC75E]"
                  />
                  <button
                    type="submit"
                    className="w-full golden-pill-btn py-2.5 text-[14px] font-bold"
                  >
                    {lang === 'EN' ? 'Sign In' : 'دخول'}
                  </button>
                </form>

                {loginSubmitted && (
                  <div className="mt-4 p-3 rounded-xl bg-[#2FE89A]/15 border border-[#2FE89A]/50 text-[#96F8C9] text-[12.5px] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {lang === 'EN'
                        ? 'Preview session verified — public & research datasets unlocked.'
                        : 'تم التحقق من الجلسة التجريبية بنجاح.'}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 12. SUPPORT / POLICY / SITEMAP */}
            {modal.kind === 'support' && (
              <div className="p-6 sm:p-8 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFC75E]/15 border border-[#FFC75E]/40 text-[#FFC75E] text-[11px] font-bold uppercase tracking-wider">
                  {lang === 'EN' ? 'EDP Governance & Support' : 'الدعم والحوكمة'}
                </span>
                <h3 className="font-display font-extrabold text-[24px] sm:text-[28px]">
                  {modal.topic}
                </h3>
                <p className="text-[14.5px] text-[#C6E4E8] leading-relaxed">
                  {lang === 'EN'
                    ? `Information regarding "${modal.topic}" on the Environment Agency – Abu Dhabi Environmental Data Platform. All public layers adhere to Abu Dhabi Government open data transparency, WCAG AA contrast accessibility, and standardized environmental metadata policies.`
                    : `تفاصيل "${modal.topic}" على منصة البيانات البيئية لهيئة البيئة – أبوظبي، المتوافقة مع سياسات البيانات المفتوحة ومعايير إمكانية الوصول.`}
                </p>
                <div className="ead-glass-card ead-rim-glint p-4 rounded-[16px] text-[13px] text-[#80F5F5]">
                  {lang === 'EN'
                    ? 'Direct Inquiries: +971 2 693 4444 · info@ead.ae · Environment Agency – Abu Dhabi'
                    : 'للاستفسارات المباشرة: +971 2 693 4444 · info@ead.ae · هيئة البيئة – أبوظبي'}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

