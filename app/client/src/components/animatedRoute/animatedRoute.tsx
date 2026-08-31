// src/components/animated-route.tsx
import { useRouter } from '@tanstack/react-router';
import {
  motion,
  type MotionProps,
  type Transition,
  type Variants,
} from 'motion/react';
import {
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

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
    initial: {},
    in: {
      opacity: 1,
      z: 100,
    },
    out: {
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
  const router = useRouter();
  const pathname = router.state.location.pathname;

  const currentChildrenRef = useRef<ReactNode>(children);

  const [previousRoute, setPreviousRoute] = useState<{
    key: string;
    children: ReactNode;
  } | null>(null);

  /*
   * Keep the ref synchronized with the currently committed Outlet.
   *
   * useLayoutEffect is intentional here. useEffect is too late for
   * a navigation that happens immediately after the render.
   */
  useLayoutEffect(() => {
    currentChildrenRef.current = children;
  }, [children]);

  useEffect(() => {
    return router.subscribe('onBeforeNavigate', () => {
      const currentPath = router.state.location.pathname;

      setPreviousRoute({
        key: currentPath,
        children: currentChildrenRef.current,
      });
    });
  }, [router]);

  return (
    <div className="relative animated-route">
      {/* Previous route */}
      {previousRoute && (
        <motion.div
          key={`previous-${previousRoute.key}`}
          className="absolute inset-0 z-40"
          initial="initial"
          animate="in"
          exit="out"
          variants={routeVariants[variant]}
          transition={pageTransition}
          {...motionProps}
        >
          {previousRoute.children}
        </motion.div>
      )}

      {/* Current route */}
      <motion.div
        key={`current-${pathname}`}
        className="relative z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.9,
          duration: 0.3,
        }}
        {...motionProps}
      >
        {children}
      </motion.div>
    </div>
  );
}
