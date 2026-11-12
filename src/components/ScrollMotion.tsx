import React, { ReactNode, useRef } from 'react';
import { animate, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const EASE_EXEC = [0.22, 1, 0.36, 1] as const;

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.16,
} as const;

let activeScrollCancel: (() => void) | null = null;

/**
 * Smoothly animates the viewport scroll position to a target selector or Y coordinate
 * using quintic easing while respecting sticky header clearance and user input interrupts.
 * Returns the glide duration in milliseconds.
 */
export function smoothScrollToTarget(
  target: string | number,
  options?: { offset?: number; duration?: number }
): number {
  if (typeof window === 'undefined') return 0;

  activeScrollCancel?.();
  activeScrollCancel = null;

  const offset = options?.offset ?? 82;
  const baseDuration = options?.duration ?? 0.95;

  let destinationY = 0;
  if (typeof target === 'number') {
    destinationY = Math.max(0, target);
  } else {
    const el = document.querySelector(target);
    if (!el) return 0;
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const rawTop = el.getBoundingClientRect().top + window.scrollY - offset;
    destinationY = Math.min(maxScroll, Math.max(0, rawTop));
  }

  const startY = window.scrollY;
  const distance = Math.abs(destinationY - startY);
  if (distance < 3) return 0;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, destinationY);
    return 0;
  }

  const scaledDuration = Math.min(
    1.25,
    Math.max(0.55, (distance / 2400) * baseDuration + 0.45)
  );

  const controls = animate(startY, destinationY, {
    duration: scaledDuration,
    ease: EASE_EXEC,
    onUpdate: (latest) => {
      window.scrollTo(0, latest);
    },
  });

  const cleanup = () => {
    window.removeEventListener('wheel', cancelOnUserInput);
    window.removeEventListener('touchstart', cancelOnUserInput);
    window.removeEventListener('keydown', cancelOnUserInput);
    activeScrollCancel = null;
  };

  const cancelOnUserInput = () => {
    controls.stop();
    cleanup();
  };

  window.addEventListener('wheel', cancelOnUserInput, { passive: true, once: true });
  window.addEventListener('touchstart', cancelOnUserInput, { passive: true, once: true });
  window.addEventListener('keydown', cancelOnUserInput, { passive: true, once: true });

  activeScrollCancel = () => {
    controls.stop();
    cleanup();
  };

  return Math.round(scaledDuration * 1000);
}

/**
 * Top executive scroll-progress luminescence indicator pinned along the viewport edge.
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 z-50 h-[2.5px] origin-left pointer-events-none bg-gradient-to-r from-[#00D9E8] via-[#80F5F5] to-[#FFC75E] shadow-[0_0_12px_rgba(0,217,232,0.78)]"
    />
  );
};

interface RevealItemProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}

/**
 * Scroll-triggered directional reveal block using unified easing and viewport config.
 */
export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  direction = 'up',
  delay = 0,
  distance = 28,
  duration = 0.65,
  className = '',
}) => {
  const initial =
    direction === 'up'
      ? { opacity: 0, y: distance }
      : direction === 'down'
      ? { opacity: 0, y: -distance }
      : direction === 'left'
      ? { opacity: 0, x: -distance }
      : direction === 'right'
      ? { opacity: 0, x: distance }
      : { opacity: 0, scale: 0.94, y: 14 };

  const target =
    direction === 'scale'
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={target}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, delay, ease: EASE_EXEC }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SectionHeaderRevealProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
  titleClassName?: string;
  lineWidthClassName?: string;
  className?: string;
}

/**
 * Animated section heading bar with drawing golden accent rule and right action link.
 */
export const SectionHeaderReveal: React.FC<SectionHeaderRevealProps> = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  titleClassName = 'text-[27px] sm:text-[33px]',
  lineWidthClassName = 'w-28',
  className = 'mb-8 sm:mb-10',
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.6, ease: EASE_EXEC }}
      >
        <div className="flex items-center gap-4">
          <h2
            className={`font-display font-extrabold tracking-[-0.02em] text-white ${titleClassName}`}
          >
            {title}
          </h2>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE_EXEC }}
            className={`hidden sm:block origin-left rtl:origin-right ${lineWidthClassName} h-[2px] bg-gradient-to-r from-[#FFC75E] via-[#80F5F5]/65 to-transparent`}
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55, delay: 0.12, ease: EASE_EXEC }}
          className="mt-1.5 text-[13.5px] sm:text-[14.5px] text-[#C6E4E8]"
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {actionLabel && onAction && (
        <motion.button
          type="button"
          onClick={onAction}
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.55, delay: 0.18, ease: EASE_EXEC }}
          className="group inline-flex items-center gap-2 text-[13.5px] font-semibold text-white hover:text-[#FFC75E] transition-colors self-start sm:self-auto"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
        </motion.button>
      )}
    </div>
  );
};

interface ParallaxLayerProps {
  children: ReactNode;
  offsetY?: number;
  scaleRange?: [number, number];
  className?: string;
}

/**
 * Scroll-linked parallax motion layer calibrated cleanly to container visibility.
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  offsetY = 26,
  scaleRange = [1, 1],
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offsetY, offsetY]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

