import { createContext, useContext, type ReactNode } from 'react';
import { useBlocker } from '@tanstack/react-router';

interface RouteTransitionContextValue {
  isExiting: boolean;
  onExitComplete: () => void;
}

const RouteTransitionContext =
  createContext<RouteTransitionContextValue | null>(null);

export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const blocker = useBlocker({
    shouldBlockFn: () => true,
    withResolver: true,
    enableBeforeUnload: false,
  });

  const isExiting = blocker.status === 'blocked';

  return (
    <RouteTransitionContext.Provider
      value={{
        isExiting,
        onExitComplete: () => {
          if (blocker.status === 'blocked') blocker.proceed();
        },
      }}
    >
      {children}
    </RouteTransitionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouteTransition() {
  const ctx = useContext(RouteTransitionContext);
  if (!ctx)
    throw new Error(
      'useRouteTransition must be used within RouteTransitionProvider',
    );
  return ctx;
}
