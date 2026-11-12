import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  ExternalLink,
  FileText,
  Globe,
  Leaf,
  Monitor,
  Radio,
  UserCheck,
  Waves,
  Wind,
} from 'lucide-react';
import { Language, SMART_APPLICATIONS, SmartApplication } from '../data/marinePlatformData';
import {
  EASE_EXEC,
  ParallaxLayer,
  RevealItem,
  SectionHeaderReveal,
  VIEWPORT_ONCE,
} from './ScrollMotion';

interface SmartApplicationsProps {
  lang: Language;
  onViewAllApps: () => void;
}

const APP_SUBTITLES: Record<string, { EN: string; AR: string; badge: string }> = {
  avatar: { EN: 'AI Voice & Visual Guide', AR: 'مرشد صوتي ومرئي بالذكاء الاصطناعي', badge: 'AI GUIDE' },
  chatbot: { EN: '24/7 Smart Assistant', AR: 'مساعد محادثة فوري', badge: 'LIVE CHAT' },
  enviroportal: { EN: 'Geospatial GIS Explorer', AR: 'منصة الخرائط المكانية', badge: 'GIS HUB' },
  'air-quality-portal': { EN: 'Live Atmospheric Network', AR: 'شبكة رصد الهواء الفورية', badge: 'REAL-TIME' },
  'abu-dhabi-nature': { EN: 'Biodiversity & Species Atlas', AR: 'أطلس التنوع البيولوجي', badge: 'ECOLOGY' },
};

const AppIcon: React.FC<{ icon: SmartApplication['icon']; className?: string }> = ({
  icon,
  className = 'w-6 h-6',
}) => {
  switch (icon) {
    case 'userCheck':
      return <UserCheck className={className} />;
    case 'bot':
      return <Bot className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'wind':
      return <Wind className={className} />;
    case 'waves':
      return <Waves className={className} />;
    case 'leaf':
      return <Leaf className={className} />;
    case 'fileText':
      return <FileText className={className} />;
  }
};

const FeatureIcon: React.FC<{ icon: 'radio' | 'chart' | 'bell' }> = ({ icon }) => {
  const cls = 'w-5 h-5 text-white stroke-[1.55] drop-shadow-[0_0_8px_rgba(128,245,245,0.45)]';
  switch (icon) {
    case 'radio':
      return <Radio className={cls} />;
    case 'chart':
      return <BarChart3 className={cls} />;
    case 'bell':
      return <Bell className={cls} />;
  }
};

export const SmartApplications: React.FC<SmartApplicationsProps> = ({
  lang,
  onViewAllApps,
}) => {
  const [selectedId, setSelectedId] = useState<string>('avatar');
  const [liveIframeActive, setLiveIframeActive] = useState(false);
  const [isShowcaseHovered, setIsShowcaseHovered] = useState(false);

  const selectedIndex = SMART_APPLICATIONS.findIndex((a) => a.id === selectedId);
  const selectedApp =
    (selectedIndex >= 0 ? SMART_APPLICATIONS[selectedIndex] : undefined) ||
    SMART_APPLICATIONS[0];

  useEffect(() => {
    setLiveIframeActive(false);
  }, [selectedId]);

  // Auto-cycle through smart application screens when idle; pauses on hover or live iframe
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    if (isShowcaseHovered || liveIframeActive) {
      return;
    }
    const timer = window.setInterval(() => {
      const currentIdx = selectedIndex >= 0 ? selectedIndex : 0;
      const nextIdx = (currentIdx + 1) % SMART_APPLICATIONS.length;
      setSelectedId(SMART_APPLICATIONS[nextIdx].id);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [selectedIndex, isShowcaseHovered, liveIframeActive]);

  const cleanDomain = selectedApp.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <section
      id="applications"
      className="relative w-full py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Rich Cyan-to-Gold Ambient Radial Bloom behind Laptop Showroom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 58% at 48% 54%, rgba(0, 217, 232, 0.16) 0%, rgba(0, 76, 89, 0.14) 44%, transparent 78%)',
        }}
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeaderReveal
          title={lang === 'EN' ? 'Explore Smart Applications' : 'استكشف التطبيقات الذكية'}
          subtitle={
            lang === 'EN'
              ? 'A curated application experience hub to turn environmental data into real-world insights.'
              : 'مركز تطبيقات مختار لتحويل البيانات البيئية إلى رؤى عملية.'
          }
          actionLabel={lang === 'EN' ? 'View All Applications' : 'عرض جميع التطبيقات'}
          onAction={onViewAllApps}
        />

        {/* Three-Column Interactive Laptop Showcase */}
        <div
          onMouseEnter={() => setIsShowcaseHovered(true)}
          onMouseLeave={() => setIsShowcaseHovered(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-5 items-center"
        >
          {/* LEFT COLUMN — 5 Stacked Interactive Application Buttons */}
          <div className="lg:col-span-3 space-y-2.5">
            {SMART_APPLICATIONS.map((app, idx) => {
              const isSelected = app.id === selectedApp.id;
              const sub = APP_SUBTITLES[app.id];
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.5, delay: idx * 0.075, ease: EASE_EXEC }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(app.id)}
                    className={`hover-sheen relative w-full rounded-[14px] px-4 py-2.5 flex items-center gap-3.5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC75E] ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#024F5D]/88 via-[#003E4E]/84 to-[#002D3A]/92 golden-glow-card ead-rim-glint-gold text-white scale-[1.015]'
                        : 'ead-glass-card ead-rim-glint text-[#E2F3F6] hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-px left-1/2 -translate-x-1/2 w-[72%] h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFE8A3] to-transparent shadow-[0_0_16px_3px_rgba(255,199,94,0.8)]"
                      />
                    )}
                    <AppIcon
                      icon={app.icon}
                      className={`w-6 h-6 shrink-0 stroke-[1.55] ${
                        isSelected
                          ? 'text-white drop-shadow-[0_0_10px_rgba(255,220,140,0.65)]'
                          : 'text-[#E8F8FA] drop-shadow-[0_0_6px_rgba(128,245,245,0.3)]'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-display font-semibold text-[14.5px] leading-snug tracking-[-0.01em] truncate">
                        {app.title[lang]}
                      </div>
                      {sub && (
                        <div className="text-[11px] text-[#B7DEE4]/80 truncate">
                          {sub[lang]}
                        </div>
                      )}
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* CENTER COLUMN — Executive 3D Studio Laptop Hardware Mockup Showing Real Portal Screens */}
          <motion.div
            initial={{ opacity: 0, y: 42, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXEC }}
            className="lg:col-span-5 flex flex-col items-center justify-center py-1"
          >
            <ParallaxLayer offsetY={16} className="w-full flex justify-center">
              <div className="relative w-full max-w-[570px] animate-float-gentle">
              {/* LAPTOP DISPLAY LID (Ultra-Thin Dark Space-Titanium Unibody Bezel) */}
              <div className="relative z-10 mx-auto w-[84%] rounded-t-[16px] rounded-b-[3px] p-[2px] bg-gradient-to-b from-[#96DCE5]/85 via-[#3B8494]/70 to-[#143743] shadow-[0_24px_56px_rgba(0,10,16,0.78),0_0_32px_rgba(0,217,232,0.2)]">
                {/* Inner Obsidian Glass Lid Frame */}
                <div className="rounded-t-[14px] rounded-b-[2px] bg-[#06131A] p-[6px] sm:p-[8px] pb-[7px] relative overflow-hidden">
                  {/* Subtle Executive Camera Pill Notch */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-30 w-14 h-[10px] rounded-b-[6px] bg-[#06131A] flex items-center justify-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B2D39] ring-1 ring-[#80F5F5]/30 flex items-center justify-center">
                      <span className="w-[2.5px] h-[2.5px] rounded-full bg-[#00E5EE]" />
                    </span>
                  </div>

                  {/* Subtle diagonal screen glass sheen */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-14 -right-14 w-64 h-64 bg-gradient-to-bl from-white/[0.06] via-transparent to-transparent rotate-12 z-20"
                  />

                  {/* Crisp Display Viewport (16:10 Aspect Ratio) */}
                  <div className="rounded-[8px] overflow-hidden bg-[#021218] ring-1 ring-white/10">
                    {/* Slim Glass Browser Top Strip */}
                    <div className="flex items-center justify-between gap-2 bg-[#041F29]/95 border-b border-white/10 px-2.5 py-1">
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B]/85" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFD166]/85" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#76EE36]/85" />
                      </div>

                      <a
                        href={selectedApp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 max-w-[215px] mx-auto flex items-center justify-center gap-1 rounded-full bg-[#02141B] border border-[#80F5F5]/20 hover:border-[#FFC75E] px-2.5 py-0.5 text-[9px] font-medium text-[#AEECEF] hover:text-[#FFC75E] transition-colors truncate"
                      >
                        <span className="truncate">{cleanDomain}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>

                      <div className="flex items-center justify-end min-w-[44px] shrink-0">
                        {selectedApp.allowIframe && (
                          <button
                            type="button"
                            onClick={() => setLiveIframeActive((prev) => !prev)}
                            title={
                              lang === 'EN'
                                ? 'Toggle live embedded portal view'
                                : 'تبديل العرض التفاعلي المباشر'
                            }
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-bold border transition-colors ${
                              liveIframeActive
                                ? 'bg-[#FFC75E] border-[#FFE399] text-[#002C3A]'
                                : 'bg-[#FFC75E]/20 border-[#FFC75E]/60 text-[#FFE8AD] hover:bg-[#FFC75E] hover:text-[#002C3A]'
                            }`}
                          >
                            <Monitor className="w-2.5 h-2.5" />
                            <span>{liveIframeActive ? 'Preview' : 'Live'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Portal Screen Content inside Laptop */}
                    <div className="relative aspect-[16/10] w-full bg-[#031B24] overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${selectedApp.id}-${liveIframeActive ? 'iframe' : 'screen'}`}
                          initial={{ opacity: 0.25 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0.25 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          {liveIframeActive && selectedApp.allowIframe ? (
                            <iframe
                              src={selectedApp.url}
                              title={selectedApp.title[lang]}
                              className="origin-top-left border-0 bg-white"
                              style={{
                                transform: 'scale(0.35)',
                                width: '285.7%',
                                height: '285.7%',
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <img
                              src={selectedApp.screenImage}
                              alt={`${selectedApp.title[lang]} portal screen`}
                              className="w-full h-full object-cover object-top"
                            />
                          )}

                          {/* Sleek Corner Launch Pill */}
                          <a
                            href={selectedApp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="golden-pill-btn absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold transition-transform hover:scale-[1.03]"
                          >
                            <span>{lang === 'EN' ? 'Open Portal' : 'فتح البوابة'}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* SLEEK PRECISION LAPTOP UNIBODY BASE (Slim Brushed Titanium Deck + Thumb Notch) */}
              <div className="relative z-10 mx-auto w-[92%] flex flex-col items-center pointer-events-none select-none">
                {/* Dark Recessed Hinge Channel matching Lid Width */}
                <div className="w-[74%] h-[3px] bg-gradient-to-b from-[#010C11] to-[#08222C] border-x border-[#4FE4EE]/30" />

                {/* Main Metallic Unibody Deck Overhang */}
                <div
                  className="relative w-full h-[12px] sm:h-[14px] rounded-t-[2px] rounded-b-[14px] border-t border-[#BCEFF5]/55 shadow-[0_12px_26px_rgba(0,10,16,0.72),inset_0_-2px_4px_rgba(0,10,16,0.65)] overflow-hidden"
                  style={{
                    background:
                      'linear-gradient(90deg, #13313C 0%, #4E8A98 6%, #244F5D 18%, #163642 50%, #244F5D 82%, #4E8A98 94%, #13313C 100%)',
                  }}
                >
                  {/* Subtle Center Top-Edge Rim Specular */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  />

                  {/* Signature Centered Curved Thumb-Lift Notch */}
                  <div className="mx-auto w-[68px] sm:w-[80px] h-[5px] rounded-b-[6px] bg-gradient-to-b from-[#031117] to-[#0B2A35] border-x border-b border-[#80F5F5]/25 shadow-[inset_0_1px_2px_rgba(0,0,0,0.85)]" />
                </div>

                {/* Soft Contact Shadow resting onto Platform Surface */}
                <div className="w-[90%] h-[8px] -mt-[3px] rounded-[100%] bg-[#010A10]/85 blur-[4px]" />
              </div>

              {/* Compact Low-Profile Neon Platform Disc matching Laptop Perspective */}
              <div className="relative z-0 w-[112%] -left-[6%] h-[76px] sm:h-[86px] -mt-[25px] sm:-mt-[29px] pointer-events-none select-none">
                <img
                  src="/images/Futuristic%20Teal%20Neon%20Platform.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute left-0 w-full h-auto block drop-shadow-[0_14px_24px_rgba(0,217,232,0.22)]"
                  style={{
                    top: '50%',
                    transformOrigin: '50% 52.5%',
                    transform: 'translateY(-52.5%) scaleY(0.38)',
                  }}
                />
              </div>
              </div>
            </ParallaxLayer>
          </motion.div>

          {/* RIGHT COLUMN — Clean Icon + Title, Summary, 3 Feature Cards, Golden CTA */}
          <RevealItem direction="right" delay={0.18} distance={28} className="lg:col-span-4 lg:pl-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedApp.id}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3.5">
                  <AppIcon
                    icon={selectedApp.icon}
                    className="w-9 h-9 shrink-0 text-white stroke-[1.45] drop-shadow-[0_0_12px_rgba(128,245,245,0.45)]"
                  />
                  <h3 className="font-display font-bold text-[22px] sm:text-[25px] tracking-[-0.015em] text-white leading-tight">
                    {selectedApp.title[lang]}
                  </h3>
                </div>

                <p className="mt-2.5 text-[14px] sm:text-[14.5px] leading-[1.55] text-[#C6E4E8] max-w-[360px]">
                  {selectedApp.shortDesc[lang]}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2.5 max-w-[370px]">
                  {selectedApp.features.map((feat) => (
                    <div
                      key={feat.title.EN}
                      className="ead-glass-card ead-rim-glint rounded-[14px] px-2 py-3.5 flex flex-col items-center text-center gap-2 transition-all duration-300"
                    >
                      <FeatureIcon icon={feat.icon} />
                      <span className="text-[11px] sm:text-[11.5px] font-medium text-[#EAF7F9] leading-snug">
                        {feat.title[lang]}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={selectedApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="golden-pill-btn group mt-5 inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-[13.5px] sm:text-[14px] font-bold transition-transform hover:scale-[1.03]"
                >
                  <span>{lang === 'EN' ? 'Explore Application' : 'استكشف التطبيق'}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.3] transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </a>
              </motion.div>
            </AnimatePresence>
          </RevealItem>
        </div>
      </div>
    </section>
  );
};
