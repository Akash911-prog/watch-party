import { useRouteTransition } from '@/contexts/routeTransition';
import {
  motion,
  type MotionProps,
  type Transition,
  type Variants,
} from 'motion/react';
import { type ReactNode } from 'react';

interface AnimatedRouteProps extends MotionProps {
  children: ReactNode;
  variant?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'cover';
}

const routeVariants: Record<string, Variants> = {
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
    in: { y: '0%', scale: 1, opacity: 1 },
    out: {
      y: '0%',
      scale: 0.9,
      z: -100,
      opacity: 0.8,
    },
  },
};

const pageTransition: Transition = {
  type: 'spring',
  damping: 20,
  duration: 1,
};

export default function AnimatedRoute({
  children,
  variant = 'fade',
  ...motionProps
}: AnimatedRouteProps) {
  const { isExiting, onExitComplete } = useRouteTransition();

  const { onAnimationComplete: externalOnComplete, ...restMotionProps } =
    motionProps;

  return (
    <motion.div
      initial="initial"
      animate={isExiting ? 'out' : 'in'}
      variants={routeVariants[variant]}
      transition={pageTransition}
      onAnimationComplete={(definition) => {
        externalOnComplete?.(definition);
        if (definition !== 'out') return;
        onExitComplete();
      }}
      {...restMotionProps}
    >
      {children}
    </motion.div>
  );
}
