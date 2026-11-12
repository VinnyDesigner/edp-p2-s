import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Fish,
  Layers,
  Play,
  Recycle,
  Search,
  ShieldCheck,
  Trees,
  Waves,
  Wind,
} from 'lucide-react';
import {
  DATA_COLLECTIONS,
  ENVIRONMENTAL_THEMES,
  EnvironmentalTheme,
  Language,
  SMART_APPLICATIONS,
  ThemeId,
} from '../data/marinePlatformData';

interface HeroSectionProps {
  lang: Language;
  activeThemeId: ThemeId;
  onSelectTheme: (id: ThemeId) => void;
  onOpenSearchModal: (query: string) => void;
  onExploreTheme: (theme: EnvironmentalTheme) => void;
  onWatchOverview: () => void;
}

const ThemeLineIcon: React.FC<{ icon: EnvironmentalTheme['icon']; className?: string }> = ({
  icon,
  className = 'w-7 h-7',
}) => {
  switch (icon) {
    case 'trees':
      return <Trees className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'recycle':
      return <Recycle className={className} />;
    case 'wind':
      return <Wind className={className} />;
    case 'waves':
      return <Waves className={className} />;
    case 'fish':
      return <Fish className={className} />;
    case 'shield':
      return <ShieldCheck className={className} />;
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  activeThemeId,
  onSelectTheme,
  onOpenSearchModal,
  onExploreTheme,
  onWatchOverview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visibleCount, setVisibleCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 6;
    if (window.innerWidth >= 1024) return 6;
    if (window.innerWidth >= 640) return 3;
    return 2;
  });

  const activeTheme = useMemo(
    () => ENVIRONMENTAL_THEMES.find((t) => t.id === activeThemeId) || ENVIRONMENTAL_THEMES[5],
    [activeThemeId]
  );

  const activeIndex = ENVIRONMENTAL_THEMES.findIndex((t) => t.id === activeTheme.id);
  const maxStart = Math.max(0, ENVIRONMENTAL_THEMES.length - visibleCount);
  const [windowStart, setWindowStart] = useState<number>(() =>
    Math.min(maxStart, Math.max(0, activeIndex - visibleCount + 1))
  );

  useEffect(() => {
    const updateCount = () => {
      const nextCount = window.innerWidth >= 1024 ? 6 : window.innerWidth >= 640 ? 3 : 2;
      setVisibleCount(nextCount);
    };
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  useEffect(() => {
    const clampedMax = Math.max(0, ENVIRONMENTAL_THEMES.length - visibleCount);
    setWindowStart((prev) => {
      let next = Math.min(prev, clampedMax);
      if (activeIndex < next) next = activeIndex;
      else if (activeIndex >= next + visibleCount) next = activeIndex - visibleCount + 1;
      return Math.max(0, Math.min(next, clampedMax));
    });
  }, [activeIndex, visibleCount]);

  const visibleThemes = useMemo(
    () => ENVIRONMENTAL_THEMES.slice(windowStart, windowStart + visibleCount),
    [windowStart, visibleCount]
  );

  const handlePrevTheme = () => {
    const nextIdx = activeIndex <= 0 ? ENVIRONMENTAL_THEMES.length - 1 : activeIndex - 1;
    onSelectTheme(ENVIRONMENTAL_THEMES[nextIdx].id);
  };

  const handleNextTheme = () => {
    const nextIdx = activeIndex >= ENVIRONMENTAL_THEMES.length - 1 ? 0 : activeIndex + 1;
    onSelectTheme(ENVIRONMENTAL_THEMES[nextIdx].id);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: nx * 14, y: ny * 8 });
  };

  const quickMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: { label: string; sub: string; action: () => void }[] = [];
    ENVIRONMENTAL_THEMES.forEach((t) => {
      if (t.title.EN.toLowerCase().includes(q) || t.heroDescription.EN.toLowerCase().includes(q)) {
        results.push({
          label: t.title[lang],
          sub: `${t.datasetsCount} • Theme`,
          action: () => {
            onSelectTheme(t.id);
            onExploreTheme(t);
          },
        });
      }
    });
    SMART_APPLICATIONS.forEach((a) => {
      if (a.title.EN.toLowerCase().includes(q) || a.shortDesc.EN.toLowerCase().includes(q)) {
        results.push({
          label: a.title[lang],
          sub: 'Smart Application',
          action: () => onOpenSearchModal(searchQuery),
        });
      }
    });
    DATA_COLLECTIONS.forEach((c) => {
      if (c.title.EN.toLowerCase().includes(q)) {
        results.push({
          label: c.title[lang],
          sub: `${c.countText[lang]} • Collection`,
          action: () => onOpenSearchModal(searchQuery),
        });
      }
    });
    return results.slice(0, 5);
  }, [searchQuery, lang, onSelectTheme, onExploreTheme, onOpenSearchModal]);

  return (
    <section
      id="top"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[670px] sm:min-h-[710px] lg:min-h-[740px] flex flex-col justify-between overflow-hidden pt-[88px] pb-8"
    >
      {/* Full-width Cinematic Photorealistic Background with Smooth Theme Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#002C3A]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTheme.id}
            initial={{ opacity: 0.45, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.45 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{
              transform: `translate3d(${mousePos.x * -0.45}px, ${mousePos.y * -0.35}px, 0)`,
            }}
          >
            <img
              src={activeTheme.heroImage}
              alt={activeTheme.imageAlt}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-center animate-hero-zoom contrast-[1.04] saturate-[1.06]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle Underwater Sunlight Rays (Marine/Groundwater/Fisheries atmosphere without hazing the skyline or reef) */}
        {(activeTheme.id === 'marine-water-quality' ||
          activeTheme.id === 'groundwater' ||
          activeTheme.id === 'fisheries') && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
            <div
              className="animate-light-ray absolute top-[38%] left-[44%] w-24 h-[46%] bg-gradient-to-b from-[#80F5F5]/25 via-[#00D9E8]/8 to-transparent blur-2xl"
              style={{ transformOrigin: 'top center' }}
            />
            <div
              className="animate-light-ray absolute top-[36%] left-[56%] w-32 h-[48%] bg-gradient-to-b from-[#80F5F5]/20 via-[#27C9D0]/8 to-transparent blur-2xl"
              style={{ animationDelay: '2.2s', transformOrigin: 'top center' }}
            />
            {/* Subtle animated swimming fish silhouettes */}
            <svg
              viewBox="0 0 180 60"
              className="animate-swim-fish hidden md:block absolute top-[56%] left-[45%] w-36 opacity-50"
              fill="none"
            >
              <path d="M22 22 Q32 15 40 22 Q32 29 22 22 M22 22 L15 17 L15 27 Z" fill="#FFE08A" fillOpacity="0.65" />
              <path d="M64 38 Q72 32 79 38 Q72 44 64 38 M64 38 L58 34 L58 42 Z" fill="#80F5F5" fillOpacity="0.55" />
              <path d="M108 18 Q116 12 124 18 Q116 24 108 18 M108 18 L102 14 L102 22 Z" fill="#FFE08A" fillOpacity="0.5" />
            </svg>
          </div>
        )}

        {/* Targeted Upper-Left Text Contrast Wash + Minimal Edge Seam Fade (preserves crisp skyline, turtle & coral clarity) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 54% 64% at 18% 36%, rgba(0, 34, 46, 0.72) 0%, rgba(0, 42, 56, 0.34) 55%, transparent 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#002C3A] via-[#002C3A]/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#002C3A]/60 to-transparent"
        />
      </div>

      {/* Upper-Left Hero Content */}
      <div className="relative z-20 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 lg:pt-12">
        <div className="max-w-[820px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.22em] text-[#C6E4E8]"
          >
            {lang === 'EN' ? 'ENVIRONMENTAL DATA PLATFORM' : 'منصة البيانات البيئية'}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTheme.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mt-3 flex items-center gap-3.5 sm:gap-4">
                <ThemeLineIcon
                  icon={activeTheme.icon}
                  className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 text-white stroke-[1.6] drop-shadow-[0_0_16px_rgba(128,245,245,0.55)]"
                />
                <h1 className="whitespace-nowrap font-display font-extrabold text-[clamp(24px,4.2vw,56px)] leading-[1.08] tracking-[-0.025em] text-white drop-shadow-[0_4px_20px_rgba(0,25,35,0.65)]">
                  {activeTheme.heroHeading[lang]}
                </h1>
              </div>

              <p className="mt-3.5 sm:mt-4 text-[15px] sm:text-[17px] leading-[1.55] text-[#C6E4E8] max-w-[460px] sm:min-h-[54px]">
                {activeTheme.heroDescription[lang]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Search Input Bar */}
          <div className="relative mt-6 sm:mt-7 max-w-[495px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchFocused(false);
                onOpenSearchModal(searchQuery);
              }}
              className={`flex items-center rounded-full p-1.5 ps-4 sm:ps-5 transition-all duration-300 backdrop-blur-xl ${
                searchFocused
                  ? 'bg-[#003B48]/88 border border-[#00D9E8] shadow-[0_0_30px_rgba(0,217,232,0.48),inset_0_0_14px_rgba(128,245,245,0.16)]'
                  : 'bg-[#003B48]/70 border border-[#27C9D0]/55 shadow-[0_10px_32px_rgba(0,20,28,0.65),0_0_18px_rgba(0,217,232,0.2)] hover:border-[#80F5F5]'
              }`}
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#C6E4E8] shrink-0 me-3" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'EN'
                    ? 'Search environmental data, applications and catalogues...'
                    : 'ابحث في البيانات البيئية والتطبيقات والفهارس...'
                }
                aria-label="Search environmental data, applications and catalogues"
                className="w-full bg-transparent text-[13.5px] sm:text-[14px] text-white placeholder-[#C6E4E8]/80 focus:outline-none py-2 pe-2"
              />
              <button
                type="submit"
                aria-label="Search"
                className="golden-pill-btn shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5] rtl:rotate-180" />
              </button>
            </form>

            {/* Quick Autocomplete Dropdown */}
            {searchFocused && quickMatches.length > 0 && (
              <div className="absolute inset-x-0 top-full mt-2 ocean-glass-strong rounded-2xl p-2 z-50">
                {quickMatches.map((m) => (
                  <button
                    key={`${m.label}-${m.sub}`}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      m.action();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-[#00D9E8]/15 text-left transition-colors"
                  >
                    <div>
                      <div className="text-[13.5px] font-semibold text-white">{m.label}</div>
                      <div className="text-[11px] text-[#C6E4E8]/80">{m.sub}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#FFC75E] rtl:rotate-180" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-5 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => onExploreTheme(activeTheme)}
              className="golden-pill-btn group inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-[13.5px] sm:text-[14px] font-bold transition-all duration-200 hover:scale-[1.02]"
            >
              <span>{activeTheme.ctaLabel[lang]}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180" />
            </button>

            <button
              type="button"
              onClick={onWatchOverview}
              className="group inline-flex items-center gap-2.5 rounded-full px-5 sm:px-6 py-2.5 text-[13.5px] sm:text-[14px] font-semibold text-white bg-[#002C3A]/65 backdrop-blur-md border border-[#80F5F5]/45 hover:border-[#00D9E8] hover:bg-[#004C59]/80 hover:shadow-[0_0_20px_rgba(0,217,232,0.3)] transition-all duration-200"
            >
              <span>{lang === 'EN' ? 'Watch Overview' : 'شاهد النظرة العامة'}</span>
              <Play className="w-3.5 h-3.5 text-[#80F5F5] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Environmental Theme Carousel */}
      <div className="relative z-20 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="relative flex items-center gap-2 sm:gap-4">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrevTheme}
            aria-label="Previous environmental theme"
            className="shrink-0 w-9 h-9 rounded-full ocean-glass flex items-center justify-center text-[#C6E4E8] hover:text-white hover:border-[#00D9E8] transition-all"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>

          {/* Single-Row Environmental Theme Carousel (2 / 3 / 6 Complete Cards Visible, Zero Shadow Clipping) */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-3.5 sm:gap-4 overflow-visible py-5 px-2">
            {visibleThemes.map((theme) => {
              const selected = theme.id === activeTheme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onSelectTheme(theme.id)}
                  aria-pressed={selected}
                  className={`hover-sheen group relative w-full rounded-[18px] overflow-hidden text-left transform-gpu -skew-x-[8deg] rtl:skew-x-[8deg] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC75E] ${
                    selected
                      ? 'h-[146px] sm:h-[158px] lg:scale-[1.07] z-20 golden-glow-card ead-rim-glint-gold'
                      : 'h-[126px] sm:h-[136px] ead-glass-card ead-rim-glint hover:-translate-y-1 opacity-95 hover:opacity-100'
                  }`}
                >
                  {/* Counter-skewed Theme Thumbnail Photo so horizon never distorts */}
                  <div className="absolute -inset-3 skew-x-[8deg] rtl:-skew-x-[8deg] scale-[1.08]">
                    <img
                      src={theme.cardImage}
                      alt={theme.imageAlt}
                      loading="eager"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 contrast-[1.04] saturate-[1.06] ${
                        theme.id === 'air-quality' || theme.id === 'fisheries'
                          ? 'object-right'
                          : 'object-center'
                      }`}
                    />
                  </div>

                  {/* Subtle Text-Legibility Wash Only (Zero Dark/Black Box Patch) */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background: selected
                        ? 'linear-gradient(100deg, rgba(0, 44, 58, 0.52) 0%, rgba(0, 56, 72, 0.16) 44%, transparent 74%)'
                        : 'linear-gradient(100deg, rgba(0, 44, 58, 0.58) 0%, rgba(0, 56, 72, 0.2) 46%, transparent 76%)',
                    }}
                  />

                  {/* Subtle bottom cyan rim sheen */}
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-4 bottom-0 h-[1.5px] rounded-full ${
                      selected
                        ? 'bg-gradient-to-r from-transparent via-[#FFE599] to-transparent shadow-[0_0_12px_rgba(255,199,94,0.85)]'
                        : 'bg-gradient-to-r from-transparent via-[#80F5F5]/75 to-transparent shadow-[0_0_8px_rgba(0,217,232,0.55)]'
                    }`}
                  />

                  {/* Upright Counter-skewed Icon + Title inside Card */}
                  <div className="relative z-10 h-full px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col justify-between skew-x-[8deg] rtl:-skew-x-[8deg]">
                    <ThemeLineIcon
                      icon={theme.icon}
                      className={`stroke-[1.5] text-white drop-shadow-[0_2px_6px_rgba(0,24,34,0.65)] ${
                        selected ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-6 h-6 sm:w-7 sm:h-7'
                      }`}
                    />
                    <span
                      className={`font-display font-bold text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,24,34,0.8)] ${
                        selected ? 'text-[15px] sm:text-[16.5px]' : 'text-[13.5px] sm:text-[14.5px]'
                      }`}
                    >
                      {theme.title[lang]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNextTheme}
            aria-label="Next environmental theme"
            className="shrink-0 w-9 h-9 rounded-full ocean-glass flex items-center justify-center text-[#C6E4E8] hover:text-white hover:border-[#00D9E8] transition-all"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="mt-2 flex items-center justify-center gap-2">
          {ENVIRONMENTAL_THEMES.map((t) => {
            const active = t.id === activeTheme.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTheme(t.id)}
                aria-label={`Select ${t.title[lang]} theme`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? 'w-8 bg-[#FFC75E] shadow-[0_0_10px_rgba(255,199,94,0.8)]'
                    : 'w-4 bg-[#80F5F5]/30 hover:bg-[#80F5F5]/60'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
