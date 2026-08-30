import type { Transition, Variants } from 'motion/react';

export const routeVariants: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  },
  cover: {
    initial: { y: '100%', z: 100, opacity: 1 },
    in: { y: '0%' },
    out: { y: '0%', scale: 0.9, z: -100, opacity: 0.8 },
  },
  navLoad: {
    initial: { opacity: 0, y: '100vh', scale: 1 },
    in: { opacity: 1, y: 0, scale: 1 },
  },
  nav: {
    initial: { y: '0%', z: 100, opacity: 1, scale: 1 },
    in: { y: '0%', scale: 1, opacity: 1, z: 100 },
    out: { y: '0%', scale: 0.9, z: -100, opacity: 0.8 },
  },
};

export const pageTransition: Transition = {
  type: 'spring',
  damping: 20,
  duration: 1,
};
