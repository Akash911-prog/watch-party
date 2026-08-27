// src/components/route-animation-container.tsx
import { useRouter } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import type { ReactNode } from 'react';

interface RouteAnimationContainerProps {
  children: ReactNode;
}

function RouteAnimationContainer({ children }: RouteAnimationContainerProps) {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={router.state.location.pathname}>{children}</div>
    </AnimatePresence>
  );
}

export default RouteAnimationContainer;
