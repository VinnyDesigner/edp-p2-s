import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Language } from '../data/marinePlatformData';
import { EASE_EXEC, ParallaxLayer, RevealItem, VIEWPORT_ONCE } from './ScrollMotion';

interface AboutPlatformProps {
  lang: Language;
  onLearnMore: () => void;
}

export const AboutPlatform: React.FC<AboutPlatformProps> = ({ lang, onLearnMore }) => {
  return (
    <section
      id="about"
      className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 34, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.75, ease: EASE_EXEC }}
        className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden ead-glass-card ead-rim-glint border border-[#80F5F5]/45 shadow-[0_24px_60px_rgba(0,16,22,0.84),0_0_32px_rgba(0,217,232,0.2)]"
      >
        {/* Integrated Panoramic Photographic Background with Scroll Parallax: Mangroves left, Skyline & Sunset right */}
        <ParallaxLayer
          offsetY={20}
          scaleRange={[1.09, 1.0]}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <img
            src="/images/about-panoramic-banner.jpg"
            alt="Abu Dhabi coastal mangroves and sunset skyline with Sheikh Zayed Grand Mosque"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </ParallaxLayer>

        {/* Smooth Directional Ocean-Teal Scrim preserving Left Mangroves & Clear Right Skyline */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(0, 36, 46, 0.72) 0%, rgba(0, 44, 58, 0.86) 24%, rgba(0, 50, 65, 0.84) 56%, rgba(0, 40, 52, 0.34) 76%, rgba(0, 32, 42, 0.08) 100%)',
          }}
        />

        {/* Subtle Cyan & Gold Rim Highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#80F5F5]/75 to-transparent"
        />

        {/* Balanced 12-Col Banner Content: Heading (4) | Divider + Copy & CTA (5) | Skyline Showcase (3) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 px-6 sm:px-10 lg:px-12 py-8 sm:py-10">
          {/* Left Heading Column — flush with site grid margin */}
          <RevealItem direction="left" delay={0.14} distance={24} className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="w-6 h-[2px] rounded-full bg-gradient-to-r from-[#FFC75E] to-[#80F5F5]"
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#80F5F5]">
                {lang === 'EN' ? 'ABOUT THE PLATFORM' : 'حول المنصة'}
              </p>
            </div>
            <h2 className="mt-2.5 font-display font-extrabold text-[26px] sm:text-[31px] leading-[1.15] tracking-[-0.02em] text-white">
              {lang === 'EN' ? (
                <>
                  A Trusted Source for
                  <br />
                  <span className="text-[#FFC75E]">Environmental Data</span>
                </>
              ) : (
                <>
                  مصدر موثوق
                  <br />
                  <span className="text-[#FFC75E]">للبيانات البيئية</span>
                </>
              )}
            </h2>
          </RevealItem>

          {/* Center Description + Learn More CTA with Clean Vertical Divider */}
          <RevealItem
            direction="right"
            delay={0.22}
            distance={24}
            className="lg:col-span-5 lg:border-l lg:border-[#80F5F5]/22 lg:pl-8 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-8"
          >
            <p className="text-[13.5px] sm:text-[14.5px] leading-[1.6] text-[#D8EFF3] max-w-[470px]">
              {lang === 'EN'
                ? "The Environmental Data Platform (EDP) is EAD's central platform for environmental data discovery, access and intelligence, enabling evidence-based decision-making for a healthier and more sustainable Abu Dhabi."
                : 'تعد منصة البيانات البيئية المنصة المركزية لهيئة البيئة لاكتشاف البيانات البيئية والوصول إليها، لتمكين صنع القرار القائم على الأدلة من أجل أبوظبي أكثر صحة واستدامة.'}
            </p>

            <button
              type="button"
              onClick={onLearnMore}
              className="golden-pill-btn group mt-4 inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 text-[13.5px] font-bold transition-transform hover:scale-[1.03]"
            >
              <span>{lang === 'EN' ? 'Learn More' : 'اعرف المزيد'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.3] transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </button>
          </RevealItem>

          {/* Right Mosque & Sunset Skyline Visual Window */}
          <div className="hidden lg:block lg:col-span-3 min-h-[124px]" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
};

