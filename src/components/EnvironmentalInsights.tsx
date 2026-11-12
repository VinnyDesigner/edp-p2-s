import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, Layers, LayoutGrid, Leaf } from 'lucide-react';
import { INSIGHT_STATS, InsightStat, Language } from '../data/marinePlatformData';
import { EASE_EXEC, RevealItem } from './ScrollMotion';

interface EnvironmentalInsightsProps {
  lang: Language;
  onSelectStat: (id: string) => void;
}

const GoldenStatIcon: React.FC<{ icon: InsightStat['icon'] }> = ({ icon }) => {
  const cls =
    'w-6 h-6 shrink-0 text-[#FFC75E] stroke-[1.65] drop-shadow-[0_0_10px_rgba(255,199,94,0.38)]';
  switch (icon) {
    case 'layers':
      return <Layers className={cls} />;
    case 'grid':
      return <LayoutGrid className={cls} />;
    case 'database':
      return <Database className={cls} />;
    case 'leaf':
      return <Leaf className={cls} />;
  }
};

const CountUpValue: React.FC<{
  target: number;
  suffix: string;
  active: boolean;
}> = ({ target, suffix, active }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1250;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return (
    <span className="font-display font-extrabold text-[27px] sm:text-[31px] tracking-[-0.02em] text-white leading-none tabular-nums">
      {value}
      {suffix}
    </span>
  );
};

export const EnvironmentalInsights: React.FC<EnvironmentalInsightsProps> = ({
  lang,
  onSelectStat,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      aria-label="Environmental Insights at a Glance"
      className="relative z-20 w-full py-6 sm:py-9 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: EASE_EXEC }}
          className="relative rounded-[26px] border border-[#27C9D0]/30 bg-[#002835]/70 backdrop-blur-xl shadow-[0_0_24px_rgba(0,217,232,0.08)] overflow-hidden"
        >
          {/* Left S-Curved Luminous Backdrop Panel with Gold Border Accent (Desktop) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 420 180"
            preserveAspectRatio="none"
            className="hidden xl:block pointer-events-none absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 rtl:-scale-x-100 w-[405px] h-full"
          >
            <defs>
              <linearGradient id="glanceCurveFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#014B5C" stopOpacity="0.82" />
                <stop offset="55%" stopColor="#003544" stopOpacity="0.76" />
                <stop offset="100%" stopColor="#002936" stopOpacity="0.68" />
              </linearGradient>
              <linearGradient id="glanceCurveEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#80F5F5" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#FFC75E" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFE599" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            <path
              d="M 0,0 L 388,0 C 350,26 376,120 315,180 L 0,180 Z"
              fill="url(#glanceCurveFill)"
            />
            <motion.path
              d="M 388,0 C 350,26 376,120 315,180"
              fill="none"
              stroke="url(#glanceCurveEdge)"
              strokeWidth="1.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 0.95, delay: 0.18, ease: EASE_EXEC }}
            />
          </svg>

          {/* Outer Frame Specular Rim Glints (Cyan Top-Left + Warm Gold Bottom-Right) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-[12%] w-36 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#9EFFFF] to-transparent shadow-[0_0_14px_2px_rgba(0,217,232,0.8)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[16%] w-28 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#80F5F5]/80 to-transparent shadow-[0_0_10px_rgba(0,217,232,0.55)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-[9%] w-36 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFE599] to-transparent shadow-[0_0_14px_2px_rgba(255,199,94,0.85)]"
          />

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-5 xl:gap-8 p-5 sm:p-6 xl:py-5 xl:px-7">
            {/* Left Editorial Telemetry Heading */}
            <RevealItem direction="left" delay={0.1} distance={24} className="shrink-0 xl:w-[325px]">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-[#00E5EE] shadow-[0_0_8px_#00E5EE] animate-pulse"
                />
                <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#9CECF0]">
                  {lang === 'EN' ? 'LIVE EMIRATE TELEMETRY' : 'مؤشرات الإمارة المباشرة'}
                </span>
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.25, ease: EASE_EXEC }}
                  className="origin-left rtl:origin-right w-14 h-[1.5px] bg-gradient-to-r from-[#FFC75E] to-transparent"
                />
              </div>
              <h2 className="mt-2.5 font-display font-extrabold text-[22px] sm:text-[26px] tracking-[-0.02em] text-white leading-[1.15]">
                {lang === 'EN' ? (
                  <>
                    Environmental
                    <br />
                    Insights at a Glance
                  </>
                ) : (
                  'لمحة عن المؤشرات البيئية'
                )}
              </h2>
            </RevealItem>

            {/* Right 4 Square-Rounded KPI Glass Sub-Cards with Vertical Dividers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 flex-1">
              {INSIGHT_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 24, scale: 0.94 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.14 + idx * 0.08, ease: EASE_EXEC }}
                  className="relative flex items-stretch"
                >
                  <button
                    type="button"
                    onClick={() => onSelectStat(stat.id)}
                    className="hover-sheen group relative w-full min-h-[124px] sm:min-h-[132px] flex flex-col items-center justify-center text-center rounded-[20px] px-3.5 py-4 transition-all duration-300 bg-gradient-to-b from-[#013B4B]/55 via-[#002330]/75 to-[#013645]/55 border border-[#80F5F5]/10 hover:border-[#FFC75E]/35 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC75E]"
                  >
                    {/* Soft Top & Bottom Centered Inner Cyan Bloom Matching Reference */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px] rounded-full bg-gradient-to-r from-transparent via-[#9EFFFF]/35 to-transparent shadow-[0_0_12px_rgba(0,217,232,0.28)]"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[45%] h-[1px] rounded-full bg-gradient-to-r from-transparent via-[#27C9D0]/25 to-transparent shadow-[0_0_10px_rgba(0,217,232,0.2)]"
                    />

                    <GoldenStatIcon icon={stat.icon} />
                    <div className="mt-2.5">
                      <CountUpValue target={stat.target} suffix={stat.suffix} active={inView} />
                    </div>
                    <span className="mt-1.5 text-[11.5px] sm:text-[12px] font-medium text-[#C6E4E8] group-hover:text-white leading-[1.3] max-w-[112px] transition-colors">
                      {stat.label[lang]}
                    </span>
                  </button>

                  {/* Thin Vertical Separator Line Between Cards */}
                  {idx < INSIGHT_STATS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden md:block pointer-events-none absolute -right-[9px] sm:-right-[11px] rtl:right-auto rtl:-left-[9px] rtl:sm:-left-[11px] top-1/2 -translate-y-1/2 w-[1px] h-16 bg-gradient-to-b from-transparent via-[#80F5F5]/20 to-transparent"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

