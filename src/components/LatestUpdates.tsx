import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { LATEST_UPDATES, Language, UpdateArticle } from '../data/marinePlatformData';
import { EASE_EXEC, SectionHeaderReveal, VIEWPORT_ONCE } from './ScrollMotion';

interface LatestUpdatesProps {
  lang: Language;
  onSelectArticle: (article: UpdateArticle) => void;
  onViewAllUpdates: () => void;
}

export const LatestUpdates: React.FC<LatestUpdatesProps> = ({
  lang,
  onSelectArticle,
  onViewAllUpdates,
}) => {
  return (
    <section
      id="updates"
      className="relative w-full py-12 sm:py-16 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeaderReveal
          title={lang === 'EN' ? 'Latest Updates' : 'آخر المستجدات'}
          subtitle={
            lang === 'EN'
              ? 'Platform news, new datasets, insights and key announcements.'
              : 'أخبار المنصة ومجموعات البيانات الجديدة والرؤى والإعلانات الرئيسية.'
          }
          actionLabel={lang === 'EN' ? 'View All Updates' : 'عرض جميع المستجدات'}
          onAction={onViewAllUpdates}
          titleClassName="text-[28px] sm:text-[34px]"
          lineWidthClassName="w-24"
          className="mb-8 sm:mb-9"
        />

        {/* 3 Horizontal News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {LATEST_UPDATES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: EASE_EXEC }}
              onClick={() => onSelectArticle(article)}
              className="hover-sheen group cursor-pointer relative min-h-[296px] sm:min-h-[308px] rounded-[20px] overflow-hidden ead-glass-card ead-rim-glint hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Continuous Upper Visual Bleeding Smoothly Behind Card Body */}
              <div className="absolute inset-x-0 top-0 h-[66%] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                    article.id === 'platform-enhancement' ? 'object-right-top' : 'object-center'
                  }`}
                />
              </div>

              {/* Seamless Ocean-Teal Glass Gradient Melting Image into Translucent Content Area */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 38, 50, 0.14) 0%, rgba(0, 44, 58, 0.24) 32%, rgba(0, 46, 60, 0.88) 54%, rgba(0, 34, 46, 0.96) 76%, rgba(0, 26, 36, 0.98) 100%)',
                }}
              />

              {/* Centered Bottom Aqua Rim Specular Glint */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 bottom-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#80F5F5]/85 to-transparent shadow-[0_0_10px_rgba(0,217,232,0.65)] z-20"
              />

              {/* Upper Golden Category Badge Row */}
              <div className="relative z-10 p-4 sm:p-5">
                <span className="inline-block rounded-full px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-b from-[#FFE8AD] via-[#FFC75E] to-[#DF9A28] text-[#00222E] shadow-[0_4px_14px_rgba(255,199,94,0.45),inset_0_1px_0_rgba(255,255,255,0.75)]">
                  {article.badge[lang]}
                </span>
              </div>

              {/* Lower Translucent Dark Teal Content over Blended Backdrop */}
              <div className="relative z-10 px-5 sm:px-6 pb-5 pt-16 sm:pt-[72px] flex flex-col justify-end">
                <h3 className="font-display font-bold text-[18.5px] sm:text-[20px] leading-snug text-white group-hover:text-[#80F5F5] transition-colors drop-shadow-[0_2px_8px_rgba(0,18,24,0.85)]">
                  {article.title[lang]}
                </h3>
                <p className="mt-2 text-[13px] sm:text-[13.5px] leading-[1.52] text-[#D0ECEF]">
                  {article.description[lang]}
                </p>

                {/* Open Footer Row: Date + CTA */}
                <div className="mt-5 flex items-center justify-between text-[12.5px]">
                  <span className="inline-flex items-center gap-1.5 text-[#D2EEF2]">
                    <Calendar className="w-3.5 h-3.5 text-[#80F5F5]" />
                    <span>{article.date}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 font-semibold text-white group-hover:text-[#FFC75E] transition-colors">
                    <span>{article.cta[lang]}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

