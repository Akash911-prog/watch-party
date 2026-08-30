// src/components/animated-route.tsx
import { pageTransition, routeVariants } from '@/variants/animatedRoute';
import { motion, type MotionProps } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedRouteProps extends MotionProps {
  children: ReactNode;
  variant?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'cover';
}

export default function AnimatedRoute({
  children,
  variant = 'fade',
  ...motionProps
}: AnimatedRouteProps) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={routeVariants[variant]}
      transition={pageTransition}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
