import React, { useEffect } from 'react';
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

interface DepthOrbSpec {
  id: string;
  baseLeft: string;
  baseTop: string;
  sizeClass: string;
  gradient: string;
  scrollRange: [number, number];
  mouseRangeX: [number, number];
  mouseRangeY: [number, number];
}

const DEPTH_ORBS: DepthOrbSpec[] = [
  {
    id: 'orb-sunlit-cyan',
    baseLeft: '12%',
    baseTop: '18%',
    sizeClass: 'w-[34vw] max-w-[440px] aspect-square',
    gradient:
      'radial-gradient(circle, rgba(0, 229, 238, 0.22) 0%, rgba(0, 148, 174, 0.08) 48%, transparent 74%)',
    scrollRange: [40, -140],
    mouseRangeX: [-34, 34],
    mouseRangeY: [-24, 24],
  },
  {
    id: 'orb-warm-caustic',
    baseLeft: '64%',
    baseTop: '24%',
    sizeClass: 'w-[28vw] max-w-[360px] aspect-square',
    gradient:
      'radial-gradient(circle, rgba(255, 199, 94, 0.14) 0%, rgba(128, 245, 245, 0.09) 46%, transparent 74%)',
    scrollRange: [80, -190],
    mouseRangeX: [42, -42],
    mouseRangeY: [28, -28],
  },
  {
    id: 'orb-abyssal-teal',
    baseLeft: '36%',
    baseTop: '52%',
    sizeClass: 'w-[40vw] max-w-[520px] aspect-square',
    gradient:
      'radial-gradient(circle, rgba(39, 201, 208, 0.18) 0%, rgba(0, 96, 120, 0.08) 52%, transparent 76%)',
    scrollRange: [110, -150],
    mouseRangeX: [-26, 26],
    mouseRangeY: [-20, 20],
  },
  {
    id: 'orb-aqua-shimmer',
    baseLeft: '74%',
    baseTop: '66%',
    sizeClass: 'w-[30vw] max-w-[390px] aspect-square',
    gradient:
      'radial-gradient(circle, rgba(128, 245, 245, 0.18) 0%, rgba(0, 217, 232, 0.07) 50%, transparent 75%)',
    scrollRange: [130, -210],
    mouseRangeX: [36, -36],
    mouseRangeY: [26, -26],
  },
  {
    id: 'orb-deep-amber',
    baseLeft: '16%',
    baseTop: '76%',
    sizeClass: 'w-[26vw] max-w-[340px] aspect-square',
    gradient:
      'radial-gradient(circle, rgba(255, 206, 112, 0.11) 0%, rgba(0, 217, 232, 0.08) 48%, transparent 74%)',
    scrollRange: [150, -170],
    mouseRangeX: [-30, 30],
    mouseRangeY: [-22, 22],
  },
];

const DepthLightOrb: React.FC<{
  spec: DepthOrbSpec;
  scrollYProgress: MotionValue<number>;
  smoothNormX: MotionValue<number>;
  smoothNormY: MotionValue<number>;
  scrollScaleBoost: MotionValue<number>;
}> = ({ spec, scrollYProgress, smoothNormX, smoothNormY, scrollScaleBoost }) => {
  const scrollY = useTransform(scrollYProgress, [0, 1], spec.scrollRange);
  const mouseX = useTransform(smoothNormX, [-1, 1], spec.mouseRangeX);
  const mouseY = useTransform(smoothNormY, [-1, 1], spec.mouseRangeY);
  const y = useTransform([scrollY, mouseY], ([sy, my]: number[]) => sy + my);

  return (
    <motion.div
      style={{
        left: spec.baseLeft,
        top: spec.baseTop,
        x: mouseX,
        y,
        scale: scrollScaleBoost,
        background: spec.gradient,
      }}
      className={`absolute ${spec.sizeClass} -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl mix-blend-screen will-change-transform`}
    />
  );
};

/**
 * Full-page deep oceanic atmospheric backdrop combining:
 * - Sunlit underwater caustics photography with smooth 3D scroll & pointer parallax
 * - Layered depth light blooms shifting organically across scroll and cursor movement
 * - Dual-spring interactive underwater refraction spotlight energized by scroll velocity
 */
export const AmbientBackdrop: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 34,
    stiffness: 170,
    mass: 0.7,
  });

  // Pointer coordinates in px (zero React re-renders)
  const pointerX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth * 0.5 : 720,
  );
  const pointerY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight * 0.42 : 360,
  );
  const pointerActive = useMotionValue(0.35);

  // Primary responsive caustic spotlight + silky liquid-trailing warm bloom
  const auraX = useSpring(pointerX, { damping: 24, stiffness: 210, mass: 0.5 });
  const auraY = useSpring(pointerY, { damping: 24, stiffness: 210, mass: 0.5 });
  const trailX = useSpring(pointerX, { damping: 40, stiffness: 82, mass: 1.25 });
  const trailY = useSpring(pointerY, { damping: 40, stiffness: 82, mass: 1.25 });
  const smoothActive = useSpring(pointerActive, { damping: 28, stiffness: 140 });

  // Normalized pointer (-1 .. 1) for 3D depth parallax
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const smoothNormX = useSpring(normX, { damping: 32, stiffness: 110 });
  const smoothNormY = useSpring(normY, { damping: 32, stiffness: 110 });

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const updateFromClient = (clientX: number, clientY: number) => {
      const vw = window.innerWidth || 1;
      const vh = window.innerHeight || 1;
      pointerX.set(clientX);
      pointerY.set(clientY);
      normX.set((clientX / vw - 0.5) * 2);
      normY.set((clientY / vh - 0.5) * 2);
      pointerActive.set(1);
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateFromClient(e.clientX, e.clientY);
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.clientX > 0 || e.clientY > 0) {
        updateFromClient(e.clientX, e.clientY);
      }
    };

    const handlePointerLeave = () => {
      normX.set(0);
      normY.set(0);
      pointerActive.set(0.35);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [normX, normY, pointerActive, pointerX, pointerY, prefersReducedMotion]);

  // Background ocean image depth parallax
  const scrollImageY = useTransform(scrollYProgress, [0, 1], [0, -96]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const mouseBgX = useTransform(smoothNormX, [-1, 1], [20, -20]);
  const mouseBgY = useTransform(smoothNormY, [-1, 1], [14, -14]);
  const combinedBgY = useTransform(
    [scrollImageY, mouseBgY],
    ([sy, my]: number[]) => sy + my,
  );

  // Scroll momentum energy drives glow intensity, vertical refraction stretch, and subtle orb bloom
  const scrollEnergy = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [1, 0, 1],
  );
  const wakeOpacity = useTransform(
    [smoothActive, scrollEnergy],
    ([active, energy]: number[]) =>
      Math.min(1, 0.25 + active * 0.45 + energy * 0.35),
  );
  const scrollAuraRadius = useTransform(
    scrollEnergy,
    [0, 1],
    ['190px 175px', '250px 330px'],
  );
  const scrollScaleBoost = useTransform(scrollEnergy, [0, 1], [1, 1.14]);

  const prismX = useTransform(
    [scrollYProgress, smoothNormX],
    ([progress, nx]: number[]) => `${12 + progress * 26 - nx * 5}%`,
  );

  // Crisp compact caustic lens centered on cursor + subtle warm sunlit trailing shimmer
  const primaryMouseAura = useMotionTemplate`radial-gradient(${scrollAuraRadius} at ${auraX}px ${auraY}px, rgba(158, 255, 255, 0.34) 0%, rgba(0, 217, 232, 0.18) 32%, rgba(0, 110, 136, 0.06) 62%, transparent 100%)`;
  const trailingPrismAura = useMotionTemplate`radial-gradient(140px 130px at ${trailX}px ${trailY}px, rgba(255, 206, 112, 0.18) 0%, rgba(128, 245, 245, 0.11) 42%, transparent 100%)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#001821]"
    >
      {/* 1. Deep Sunlit Ocean Backdrop Image with Scroll & Mouse 3D Parallax */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { x: mouseBgX, y: combinedBgY, scale: imageScale }
        }
        className="absolute -top-[8%] -bottom-[14%] -inset-x-[3%] will-change-transform"
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

      {/* 3. Layered Underwater Light Blooms & Interactive Caustic Lens */}
      {!prefersReducedMotion && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {DEPTH_ORBS.map((orb) => (
              <DepthLightOrb
                key={orb.id}
                spec={orb}
                scrollYProgress={scrollYProgress}
                smoothNormX={smoothNormX}
                smoothNormY={smoothNormY}
                scrollScaleBoost={scrollScaleBoost}
              />
            ))}
          </div>

          <motion.div
            style={{
              background: primaryMouseAura,
              opacity: wakeOpacity,
            }}
            className="absolute inset-0 mix-blend-screen"
          />
          <motion.div
            style={{
              background: trailingPrismAura,
              opacity: wakeOpacity,
            }}
            className="absolute inset-0 mix-blend-screen"
          />
        </>
      )}

      {/* 4. Scroll-Linked Volumetric Prism Sunbeam */}
      <div className="absolute inset-0 overflow-hidden opacity-45">
        <motion.div
          style={prefersReducedMotion ? undefined : { left: prismX }}
          className="animate-prism-glide absolute -top-[18%] left-[18%] w-[26vw] max-w-[380px] h-[140vh] blur-3xl"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(128, 245, 245, 0.08) 45%, rgba(255, 215, 130, 0.06) 65%, transparent 100%)',
            }}
          />
        </motion.div>
      </div>

      {/* 5. Soft Outer Contrast Vignette */}
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
