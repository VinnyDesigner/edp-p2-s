import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Droplet, Leaf, Mountain, Waves, Wind } from 'lucide-react';
import {
  DATA_COLLECTIONS,
  DataCollectionCard,
  Language,
} from '../data/marinePlatformData';
import { AbuDhabiMapVisual } from './AbuDhabiMapVisual';

interface DataCollectionsProps {
  lang: Language;
  onSelectCollection: (card: DataCollectionCard) => void;
  onViewAllDatasets: () => void;
}

const CollectionIcon: React.FC<{ icon: DataCollectionCard['icon'] }> = ({ icon }) => {
  const cls =
    'w-[22px] h-[22px] text-white stroke-[1.65] drop-shadow-[0_2px_6px_rgba(0,18,24,0.65)]';
  switch (icon) {
    case 'wind':
      return <Wind className={cls} />;
    case 'droplet':
      return <Droplet className={cls} />;
    case 'waves':
      return <Waves className={cls} />;
    case 'leaf':
      return <Leaf className={cls} />;
    case 'mountain':
      return <Mountain className={cls} />;
  }
};

const getCardImageClass = (cardId: string): string => {
  switch (cardId) {
    case 'col-air-quality':
      return 'object-cover object-[76%_bottom]';
    case 'col-water-resources':
      return 'object-cover object-[50%_72%]';
    case 'col-marine-environment':
      return 'object-cover object-[58%_bottom]';
    case 'col-biodiversity':
      return 'object-cover object-[51%_70%]';
    case 'col-land-habitat':
      return 'object-cover object-[44%_bottom]';
    default:
      return 'object-cover object-bottom';
  }
};

export const DataCollections: React.FC<DataCollectionsProps> = ({
  lang,
  onSelectCollection,
  onViewAllDatasets,
}) => {
  return (
    <section
      id="catalogues"
      className="relative w-full py-9 sm:py-12 overflow-hidden bg-gradient-to-b from-[#002834]/95 via-[#00323F]/90 to-[#002733]/95"
    >
      {/* Subtle Ambient Aqua & Gold Flowing Ribbon Light Trails matching Section Backdrop */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-45"
      >
        <defs>
          <linearGradient id="dcAquaRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D9E8" stopOpacity="0" />
            <stop offset="32%" stopColor="#80F5F5" stopOpacity="0.45" />
            <stop offset="68%" stopColor="#27C9D0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFC75E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dcGoldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFC75E" stopOpacity="0" />
            <stop offset="48%" stopColor="#FFC75E" stopOpacity="0.32" />
            <stop offset="85%" stopColor="#80F5F5" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#00D9E8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -40 42 C 260 110, 540 -20, 880 65 C 1140 128, 1300 45, 1480 18"
          fill="none"
          stroke="url(#dcAquaRibbon)"
          strokeWidth="1.4"
        />
        <path
          d="M -60 285 C 240 215, 580 330, 960 275 C 1220 238, 1360 280, 1490 230"
          fill="none"
          stroke="url(#dcGoldRibbon)"
          strokeWidth="1.5"
        />
        <path
          d="M 880 350 C 1100 315, 1280 285, 1480 322"
          fill="none"
          stroke="url(#dcAquaRibbon)"
          strokeWidth="1.1"
          opacity="0.7"
        />
      </svg>

      {/* Soft Radial Depth Glow Behind Map Stage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-1/2 -translate-y-1/2 w-[520px] h-[300px] rounded-full blur-[90px] opacity-30 bg-[radial-gradient(circle,rgba(0,217,232,0.45)_0%,rgba(255,199,94,0.18)_48%,transparent_72%)]"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 sm:mb-7">
          <div>
            <div className="flex items-center gap-4">
              <h2 className="font-display font-extrabold text-[27px] sm:text-[32px] leading-[1.12] tracking-[-0.02em] text-white">
                {lang === 'EN' ? 'Explore Data Collections' : 'استكشف مجموعات البيانات'}
              </h2>
              <span
                aria-hidden="true"
                className="hidden sm:block w-28 h-[2px] bg-gradient-to-r from-[#FFC75E] via-[#80F5F5]/65 to-transparent"
              />
            </div>
            <p className="mt-1 text-[13.5px] sm:text-[14.5px] text-[#C6E4E8]">
              {lang === 'EN'
                ? 'Discover and access curated environmental datasets across key themes.'
                : 'اكتشف مجموعات البيانات البيئية المعتمدة عبر المواضيع الرئيسية.'}
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllDatasets}
            className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-white hover:text-[#FFC75E] transition-colors self-start sm:self-auto"
          >
            <span>{lang === 'EN' ? 'View All Datasets' : 'عرض جميع البيانات'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </button>
        </div>

        {/* Left Illuminated 3D Abu Dhabi Map + Right 5 Frosted Glass Dataset Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[390px_1fr] gap-6 lg:gap-5 items-center">
          {/* Left Side — Holographic 3D Abu Dhabi Geographical Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="flex flex-col items-center justify-center min-h-[195px] sm:min-h-[215px]"
          >
            <AbuDhabiMapVisual
              onSelectStation={() => onViewAllDatasets()}
            />
          </motion.div>

          {/* Right Side — 5 Compact Frosted Glass Dataset Cards */}
          <div className="min-w-0">
            <div className="flex lg:grid lg:grid-cols-5 gap-3 sm:gap-3.5 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory py-1.5">
              {DATA_COLLECTIONS.map((card, idx) => {
                const isTwoLineTitle =
                  lang === 'EN' &&
                  (card.id === 'col-water-resources' || card.id === 'col-marine-environment');
                const titleWords = isTwoLineTitle ? card.title.EN.split(' ') : null;

                return (
                  <motion.button
                    key={card.id}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.48, delay: idx * 0.06 }}
                    onClick={() => onSelectCollection(card)}
                    className="hover-sheen group relative snap-start shrink-0 w-[152px] sm:w-[162px] lg:w-full h-[186px] sm:h-[194px] rounded-[16px] overflow-hidden text-left ead-glass-card ead-rim-glint hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9E8]"
                    style={{
                      background:
                        'linear-gradient(172deg, rgba(16, 102, 118, 0.52) 0%, rgba(2, 66, 82, 0.64) 48%, rgba(0, 38, 48, 0.72) 100%)',
                      borderColor: 'rgba(150, 244, 248, 0.42)',
                    }}
                  >
                    {/* Crisp Lower Environmental Scene fading seamlessly upward into Frosted Glass */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[66%] overflow-hidden"
                      style={{
                        WebkitMaskImage:
                          'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.42) 26%, rgba(0,0,0,0.92) 48%, black 66%)',
                        maskImage:
                          'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.42) 26%, rgba(0,0,0,0.92) 48%, black 66%)',
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        loading="lazy"
                        className={`w-full h-full ${getCardImageClass(
                          card.id
                        )} transition-transform duration-500 group-hover:scale-105`}
                      />
                    </div>

                    {/* Translucent Frosted Aqua Veil over upper card */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(10, 90, 106, 0.62) 0%, rgba(3, 72, 88, 0.42) 60%, rgba(0, 52, 66, 0.0) 100%)',
                      }}
                    />

                    {/* Bottom Aqua/Gold Specular Rim Glint */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-3 bottom-0 h-[1.5px] rounded-full z-20 ${
                        card.id === 'col-land-habitat'
                          ? 'bg-gradient-to-r from-[#80F5F5]/40 via-[#FFC75E]/90 to-transparent shadow-[0_0_10px_rgba(255,199,94,0.55)]'
                          : 'bg-gradient-to-r from-transparent via-[#80F5F5]/85 to-transparent shadow-[0_0_10px_rgba(0,217,232,0.65)]'
                      }`}
                    />

                    {/* Compact Icon, Title & Dataset Count */}
                    <div className="relative z-10 p-3.5 sm:p-4 flex flex-col">
                      <CollectionIcon icon={card.icon} />
                      <h3 className="mt-2.5 font-display font-bold text-[14.5px] sm:text-[15.5px] leading-[1.16] tracking-[-0.01em] text-white group-hover:text-[#80F5F5] transition-colors drop-shadow-[0_2px_8px_rgba(0,18,24,0.8)]">
                        {titleWords && titleWords.length === 2 ? (
                          <>
                            <span className="block">{titleWords[0]}</span>
                            <span className="block">{titleWords[1]}</span>
                          </>
                        ) : (
                          card.title[lang]
                        )}
                      </h3>
                      <span className="mt-1 text-[11.5px] sm:text-[12px] font-medium text-[#D6F3F6] group-hover:text-[#FFC75E] transition-colors tabular-nums drop-shadow-[0_1px_5px_rgba(0,18,24,0.85)]">
                        {card.countText[lang]}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Section Bottom Horizon Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#80F5F5]/55 to-transparent shadow-[0_0_14px_rgba(0,217,232,0.45)]"
      />
    </section>
  );
};

