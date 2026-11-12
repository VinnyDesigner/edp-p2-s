import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ENVIRONMENTAL_THEMES,
  Language,
  ThemeId,
} from './data/marinePlatformData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SmartApplications } from './components/SmartApplications';
import { DataCollections } from './components/DataCollections';
import { LatestUpdates } from './components/LatestUpdates';
import { EnvironmentalInsights } from './components/EnvironmentalInsights';
import { AboutPlatform } from './components/AboutPlatform';
import { MarineFooter } from './components/MarineFooter';
import { MarineModals, MarineModalState } from './components/MarineModals';

const ROUTE_TO_SECTION: Record<string, { id: string; selector: string }> = {
  '/': { id: 'home', selector: '#top' },
  '/applications': { id: 'applications', selector: '#applications' },
  '/catalogues': { id: 'catalogues', selector: '#catalogues' },
  '/about': { id: 'about', selector: '#about' },
  '/contact': { id: 'contact', selector: '#contact' },
};

function MarineHomepage() {
  const [lang, setLang] = useState<Language>('EN');
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>('marine-water-quality');
  const [activeNav, setActiveNav] = useState<string>('home');
  const [modal, setModal] = useState<MarineModalState>({ kind: 'none' });

  const location = useLocation();
  const navigate = useNavigate();

  // Keep document direction synced with active language
  useEffect(() => {
    document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'AR' ? 'ar' : 'en';
  }, [lang]);

  // Handle deep-linked route navigation on mount or path change
  useEffect(() => {
    const mapped = ROUTE_TO_SECTION[location.pathname];
    if (!mapped) return;
    setActiveNav(mapped.id);
    if (location.pathname === '/') return;
    const timer = window.setTimeout(() => {
      const target = document.querySelector(mapped.selector);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  // Sync active header pill while scrolling through sections
  useEffect(() => {
    const sections: { id: string; selector: string }[] = [
      { id: 'contact', selector: '#contact' },
      { id: 'about', selector: '#about' },
      { id: 'catalogues', selector: '#catalogues' },
      { id: 'applications', selector: '#applications' },
      { id: 'home', selector: '#top' },
    ];

    const onScroll = () => {
      if (window.scrollY < 260) {
        setActiveNav('home');
        return;
      }
      const triggerY = window.innerHeight * 0.42;
      for (const section of sections) {
        const el = document.querySelector(section.selector);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY && rect.bottom >= 120) {
          setActiveNav(section.id);
          return;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (id: string, path: string) => {
    setActiveNav(id);
    if (location.pathname !== path) {
      navigate(path);
    }
    const targetSelector = ROUTE_TO_SECTION[path]?.selector ?? '#top';
    const targetEl = document.querySelector(targetSelector);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectFooterTheme = (themeId: ThemeId) => {
    setActiveThemeId(themeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const found = ENVIRONMENTAL_THEMES.find((t) => t.id === themeId);
    if (found) {
      setModal({ kind: 'theme', theme: found });
    }
  };

  const handleSelectStat = (statId: string) => {
    if (statId === 'applications') {
      setModal({ kind: 'allApps' });
    } else {
      setModal({ kind: 'allDatasets' });
    }
  };

  return (
    <div
      dir={lang === 'AR' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#002C3A] text-white flex flex-col selection:bg-[#00D9E8]/30 overflow-x-clip relative"
    >
      {/* Subtle Underwater Atmospheric Depth Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 18% 35%, rgba(0,217,232,0.08) 0%, transparent 45%), radial-gradient(circle at 82% 62%, rgba(39,201,208,0.09) 0%, transparent 48%), radial-gradient(circle at 50% 90%, rgba(0,76,89,0.28) 0%, transparent 55%)',
        }}
      />

      <Header
        lang={lang}
        onToggleLang={setLang}
        activeNav={activeNav}
        onNavigate={handleNavigate}
        onOpenLogin={() => setModal({ kind: 'login' })}
      />

      <main className="relative z-10 flex-1">
        {/* Hero + 6 Interactive Environmental Theme Cards */}
        <HeroSection
          lang={lang}
          activeThemeId={activeThemeId}
          onSelectTheme={setActiveThemeId}
          onOpenSearchModal={(query) => setModal({ kind: 'search', query })}
          onExploreTheme={(theme) => setModal({ kind: 'theme', theme })}
          onWatchOverview={() => setModal({ kind: 'overview' })}
        />

        {/* Environmental Insights at a Glance — Horizontal Pill Bar */}
        <EnvironmentalInsights lang={lang} onSelectStat={handleSelectStat} />

        {/* Explore Smart Applications — 3-column 3D monitor showcase */}
        <SmartApplications
          lang={lang}
          onViewAllApps={() => setModal({ kind: 'allApps' })}
        />

        {/* Explore Data Collections — Illuminated Abu Dhabi Map + 5 Cards */}
        <DataCollections
          lang={lang}
          onSelectCollection={(collection) => setModal({ kind: 'collection', collection })}
          onViewAllDatasets={() => setModal({ kind: 'allDatasets' })}
        />

        {/* Latest Updates — 3 News & Release Cards */}
        <LatestUpdates
          lang={lang}
          onSelectArticle={(article) => setModal({ kind: 'article', article })}
          onViewAllUpdates={() => setModal({ kind: 'allUpdates' })}
        />

        {/* About the Platform — Panoramic Mangrove & Skyline Banner */}
        <AboutPlatform
          lang={lang}
          onLearnMore={() => setModal({ kind: 'about' })}
        />
      </main>

      <MarineFooter
        lang={lang}
        onNavigate={handleNavigate}
        onSelectTheme={handleSelectFooterTheme}
        onOpenSupportInfo={(topic) => setModal({ kind: 'support', topic })}
      />

      <MarineModals
        lang={lang}
        modal={modal}
        onClose={() => setModal({ kind: 'none' })}
        onChangeModal={setModal}
        onActivateTheme={setActiveThemeId}
      />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MarineHomepage />} />
        <Route path="/applications" element={<MarineHomepage />} />
        <Route path="/catalogues" element={<MarineHomepage />} />
        <Route path="/about" element={<MarineHomepage />} />
        <Route path="/contact" element={<MarineHomepage />} />
        <Route path="*" element={<MarineHomepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
