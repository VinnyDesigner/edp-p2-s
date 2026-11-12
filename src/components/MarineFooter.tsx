import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { ENVIRONMENTAL_THEMES, Language, NAV_LINKS, ThemeId } from '../data/marinePlatformData';
import { EASE_EXEC, RevealItem, VIEWPORT_ONCE, smoothScrollToTarget } from './ScrollMotion';

interface MarineFooterProps {
  lang: Language;
  onNavigate: (id: string, path: string) => void;
  onSelectTheme: (id: ThemeId) => void;
  onOpenSupportInfo: (topic: string) => void;
}

export const MarineFooter: React.FC<MarineFooterProps> = ({
  lang,
  onNavigate,
  onSelectTheme,
  onOpenSupportInfo,
}) => {
  const supportLinks = [
    { en: 'Help & FAQs', ar: 'المساعدة والأسئلة الشائعة' },
    { en: 'User Guide', ar: 'دليل المستخدم' },
    { en: 'Data Policy', ar: 'سياسة البيانات' },
    { en: 'Terms of Use', ar: 'شروط الاستخدام' },
    { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    { en: 'Accessibility', ar: 'إمكانية الوصول' },
  ];

  const socials = [
    { name: 'LinkedIn', icon: <Linkedin className="w-3.5 h-3.5" /> },
    {
      name: 'X',
      icon: (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    { name: 'YouTube', icon: <Youtube className="w-3.5 h-3.5" /> },
    { name: 'Instagram', icon: <Instagram className="w-3.5 h-3.5" /> },
  ];

  return (
    <footer
      id="contact"
      className="relative w-full mt-8 pt-12 pb-6 overflow-hidden bg-gradient-to-b from-[#004658]/36 via-[#002C3A]/48 to-[#001B25]/62 backdrop-blur-2xl backdrop-saturate-150"
    >
      {/* Subtle frosted glass ambient sheen without a top border line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#B8FFFF]/[0.06] via-[#80F5F5]/[0.02] to-transparent"
      />
      {/* Translucent Aqua Tech Wave with Golden Glow — feathered & screen-blended into frosted glass */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 0.38, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_EXEC }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden mix-blend-screen"
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 26%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.75) 88%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 26%, rgba(0,0,0,1) 60%, rgba(0,0,0,0.75) 88%, transparent 100%)',
        }}
      >
        <div
          className="w-full"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          }}
        >
          <img
            src="/images/Translucent%20Aqua%20Tech%20Wave%20with%20Golden%20Glow.png"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-[165px] sm:h-[205px] lg:h-[245px] object-cover object-center select-none saturate-[1.15] contrast-[1.06]"
          />
        </div>
      </motion.div>
      {/* Subtle Illuminated Abu Dhabi Skyline Silhouette on the Right */}
      <motion.svg
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 0.35, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE_EXEC }}
        viewBox="0 0 420 120"
        className="pointer-events-none absolute right-4 sm:right-12 bottom-14 w-[280px] sm:w-[390px] h-auto"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="footerSkylineGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00D9E8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#80F5F5" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <g stroke="url(#footerSkylineGrad)" strokeWidth="1.2">
          <path d="M22 108 V78 H36 V108 M46 108 V64 Q56 50 66 64 V108 M76 108 V48 L86 36 L96 48 V108" />
          <path d="M108 108 V56 H128 V108 M140 108 V32 L152 20 L164 32 V108 M174 108 V22 Q186 12 198 22 V108" />
          <path d="M208 108 V46 H228 V108 M238 108 V68 Q254 44 270 68 V108 M282 108 V76 H298 V108" />
          <path d="M310 108 V40 L320 26 L330 40 V108 M340 108 V58 H362 V108 M372 108 V74 H396 V108" />
        </g>
      </motion.svg>

      {/* Main 5 Columns */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Column 1 — EAD Logo, Description & Social Icons */}
          <RevealItem delay={0.04} distance={22} className="lg:col-span-4 lg:pr-6 lg:border-r lg:border-[#80F5F5]/25">
            <div className="flex items-center">
              <img
                src="/images/ead-logo-white.png"
                alt="هيئة البيئة – أبوظبي | Environment Agency – Abu Dhabi"
                className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,18,24,0.55)]"
              />
            </div>

            <p className="mt-4 max-w-[290px] text-[13px] leading-[1.6] text-[#C6E4E8]">
              {lang === 'EN'
                ? 'Enabling a resilient and sustainable Abu Dhabi through trusted environmental data, science and innovation.'
                : 'تمكين إمارة أبوظبي من المرونة والاستدامة عبر البيانات البيئية الموثوقة والعلوم والابتكار.'}
            </p>

            <div className="mt-5 flex items-center gap-2.5">
              {socials.map((soc) => (
                <button
                  key={soc.name}
                  type="button"
                  aria-label={soc.name}
                  onClick={() => onOpenSupportInfo(soc.name)}
                  className="w-8 h-8 rounded-lg ocean-glass flex items-center justify-center text-[#C6E4E8] hover:text-white hover:border-[#00D9E8] transition-colors"
                >
                  {soc.icon}
                </button>
              ))}
            </div>
          </RevealItem>

          {/* Column 2 — Explore */}
          <RevealItem delay={0.1} distance={22} className="lg:col-span-2">
            <h3 className="font-display font-bold text-[14px] text-white mb-3.5">
              {lang === 'EN' ? 'Explore' : 'استكشف'}
            </h3>
            <ul className="space-y-2 text-[13px] text-[#C6E4E8]">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.id, link.path);
                    }}
                    className="hover:text-[#00D9E8] transition-colors"
                  >
                    {link.label[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Column 3 — Data Themes */}
          <RevealItem delay={0.16} distance={22} className="lg:col-span-2">
            <h3 className="font-display font-bold text-[14px] text-white mb-3.5">
              {lang === 'EN' ? 'Data Themes' : 'المواضيع البيئية'}
            </h3>
            <ul className="space-y-2 text-[13px] text-[#C6E4E8]">
              {ENVIRONMENTAL_THEMES.map((theme) => (
                <li key={theme.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTheme(theme.id);
                      smoothScrollToTarget(0);
                    }}
                    className="hover:text-[#00D9E8] transition-colors"
                  >
                    {theme.title[lang]}
                  </button>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Column 4 — Support */}
          <RevealItem delay={0.22} distance={22} className="lg:col-span-2">
            <h3 className="font-display font-bold text-[14px] text-white mb-3.5">
              {lang === 'EN' ? 'Support' : 'الدعم'}
            </h3>
            <ul className="space-y-2 text-[13px] text-[#C6E4E8]">
              {supportLinks.map((item) => (
                <li key={item.en}>
                  <button
                    type="button"
                    onClick={() => onOpenSupportInfo(lang === 'EN' ? item.en : item.ar)}
                    className="hover:text-[#00D9E8] transition-colors"
                  >
                    {lang === 'EN' ? item.en : item.ar}
                  </button>
                </li>
              ))}
            </ul>
          </RevealItem>

          {/* Column 5 — Contact Us */}
          <RevealItem delay={0.28} distance={22} className="lg:col-span-2">
            <h3 className="font-display font-bold text-[14px] text-white mb-3.5">
              {lang === 'EN' ? 'Contact Us' : 'اتصل بنا'}
            </h3>
            <ul className="space-y-3 text-[12.5px] text-[#C6E4E8]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#80F5F5] shrink-0" />
                <a href="tel:+97126934444" className="hover:text-white transition-colors tabular-nums">
                  +971 2 693 4444
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#80F5F5] shrink-0" />
                <a href="mailto:info@ead.ae" className="hover:text-[#FFC75E] transition-colors">
                  info@ead.ae
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#80F5F5] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Environment Agency – Abu Dhabi
                  <br />
                  Abu Dhabi, United Arab Emirates
                </span>
              </li>
            </ul>
          </RevealItem>
        </div>
      </div>

      {/* Bottom Copyright & Utilities */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-4 border-t border-[#80F5F5]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#C6E4E8]/85">
        <p>
          {lang === 'EN'
            ? '© 2026 Environment Agency – Abu Dhabi. All rights reserved.'
            : '© ٢٠٢٦ هيئة البيئة – أبوظبي. جميع الحقوق محفوظة.'}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenSupportInfo('Accessibility')}
            className="hover:text-white transition-colors"
          >
            {lang === 'EN' ? 'Accessibility' : 'إمكانية الوصول'}
          </button>
          <span className="text-[#80F5F5]/35">|</span>
          <button
            type="button"
            onClick={() => onOpenSupportInfo('Sitemap')}
            className="hover:text-white transition-colors"
          >
            {lang === 'EN' ? 'Sitemap' : 'خريطة الموقع'}
          </button>
        </div>
      </div>
    </footer>
  );
};

