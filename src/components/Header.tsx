import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, X } from 'lucide-react';
import { Language, NAV_LINKS } from '../data/marinePlatformData';

interface HeaderProps {
  lang: Language;
  onToggleLang: (lang: Language) => void;
  activeNav: string;
  onNavigate: (id: string, path: string) => void;
  onOpenLogin: () => void;
}

export const EadMarineEmblem: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <img
    src="/images/ead-emblem-mark.png"
    alt="Environment Agency – Abu Dhabi emblem"
    className={`${className} object-contain drop-shadow-[0_0_6px_rgba(128,245,245,0.22)]`}
  />
);

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  activeNav,
  onNavigate,
  onOpenLogin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, id: string, path: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(id, path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#002C3A]/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,18,24,0.45)]'
          : 'bg-gradient-to-b from-[#002C3A]/75 via-[#002C3A]/35 to-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between gap-4">
        {/* Left: EAD Branding */}
        <a
          href="#top"
          onClick={(e) => handleClick(e, 'home', '/')}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9E8] rounded-lg"
        >
          <img
            src="/images/ead-logo-white.png"
            alt="هيئة البيئة – أبوظبي | Environment Agency – Abu Dhabi"
            className="h-9 sm:h-11 w-auto object-contain shrink-0 drop-shadow-[0_2px_10px_rgba(0,18,24,0.55)]"
          />
        </a>

        {/* Right: Navigation + Arabic + Login + Language Switcher */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          <nav className="flex items-center gap-1.5" aria-label="Primary navigation">
            {NAV_LINKS.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => handleClick(e, item.id, item.path)}
                  className={`relative px-4 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9E8] ${
                    isActive
                      ? 'text-[#002C3A] font-semibold'
                      : 'text-[#C6E4E8] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="header-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#80F5F5] to-[#27C9D0] shadow-[0_0_16px_rgba(0,217,232,0.55)] -z-10"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label[lang]}</span>
                </a>
              );
            })}
          </nav>

          {/* Arabic Shortcut */}
          <button
            type="button"
            onClick={() => onToggleLang(lang === 'EN' ? 'AR' : 'EN')}
            className="font-arabic text-[13.5px] font-medium text-[#C6E4E8] hover:text-[#80F5F5] transition-colors"
          >
            {lang === 'EN' ? 'عربي' : 'English'}
          </button>

          {/* Login Button */}
          <button
            type="button"
            onClick={onOpenLogin}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white bg-[#003B48]/70 border border-[#80F5F5]/40 hover:border-[#00D9E8] hover:bg-[#004C59]/80 hover:shadow-[0_0_18px_rgba(0,217,232,0.35)] transition-all"
          >
            <User className="w-3.5 h-3.5 text-[#80F5F5]" />
            <span>{lang === 'EN' ? 'Log In' : 'تسجيل الدخول'}</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden w-10 h-10 rounded-full ocean-glass flex items-center justify-center text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
            className="lg:hidden bg-[#002C3A]/95 backdrop-blur-2xl border-t border-[#27C9D0]/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1.5">
              {NAV_LINKS.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => handleClick(e, item.id, item.path)}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gradient-to-r from-[#80F5F5] to-[#27C9D0] text-[#002C3A] font-bold'
                        : 'text-[#C6E4E8] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item.label[lang]}
                  </a>
                );
              })}

              <div className="pt-3 mt-2 border-t border-[#27C9D0]/20 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onToggleLang(lang === 'EN' ? 'AR' : 'EN')}
                  className="font-arabic rounded-full ocean-glass px-4 py-1.5 text-xs font-semibold text-[#C6E4E8] hover:text-white transition-colors"
                >
                  {lang === 'EN' ? 'عربي' : 'English'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenLogin();
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white ocean-glass"
                >
                  <User className="w-3.5 h-3.5 text-[#80F5F5]" />
                  <span>{lang === 'EN' ? 'Log In' : 'تسجيل الدخول'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

