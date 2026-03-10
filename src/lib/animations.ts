import type { Variants, Transition } from 'framer-motion';

// --- Easing Curves ---
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
export const EASE_DRAMATIC: [number, number, number, number] = [0.76, 0, 0.24, 1];
export const EASE_GRAVITY: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// --- Fade In Up ---
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

// --- Line Reveal (mask from bottom) ---
export const lineReveal: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// --- Stagger Container ---
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// --- Scale In ---
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

// --- Slide from Left ---
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

// --- Slide from Right ---
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

// --- Letter by Letter (for Bebas Neue heavy titles) ---
export const letterReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.2,
    },
  },
};

export const letterChild: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_GRAVITY,
    },
  },
};

// --- Fade Only ---
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

// --- Door Opening Spring ---
export const doorSpring: Transition = {
  type: 'spring',
  damping: 30,
  stiffness: 100,
  mass: 1.2,
};

// --- Stagger with Custom Delay ---
export function staggerWith(stagger: number, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
}

// --- Typewriter Transition ---
export const typewriterTransition: Transition = {
  duration: 0.5,
  ease: 'easeInOut',
};
