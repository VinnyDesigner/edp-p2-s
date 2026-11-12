import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Full-page deep oceanic atmospheric backdrop powered by sunlit underwater caustics photography
 * with gentle breathing zoom, scroll-linked depth parallax, and dark-teal UI readability glazing.
 */
export const AmbientBackdrop: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#001821]"
    >
      {/* 1. Deep Sunlit Ocean Backdrop Image with Scroll Parallax & Slow Breathing Motion */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute -top-[6%] -bottom-[14%] inset-x-0 will-change-transform"
      >
        <img
          src="/images/ocean-ambient-bg.jpg"
          alt=""
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-top animate-hero-zoom opacity-85"
        />
      </motion.div>

      {/* 2. Balanced Ocean-Teal Luminance & Readability Glaze */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 36, 48, 0.34) 0%, rgba(0, 42, 56, 0.28) 42%, rgba(0, 28, 38, 0.42) 78%, rgba(0, 18, 26, 0.62) 100%)',
        }}
      />

      {/* 3. Subtle Volumetric Prism Sheen for Living Depth */}
      <div className="absolute inset-0 overflow-hidden opacity-45">
        <div
          className="animate-prism-glide absolute -top-[18%] left-[18%] w-[26vw] max-w-[380px] h-[140vh] blur-3xl"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(128, 245, 245, 0.08) 45%, rgba(255, 215, 130, 0.06) 65%, transparent 100%)',
          }}
        />
      </div>

      {/* 4. Soft Outer Contrast Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 92% 88% at 50% 42%, transparent 52%, rgba(0, 12, 18, 0.48) 100%)',
        }}
      />
    </div>
  );
};
