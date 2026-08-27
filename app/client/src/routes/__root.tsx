import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import type { RouterContext } from '../router';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toast';
import Lenis from 'lenis';
import { useEffect } from 'react';
import RouteAnimationContainer from '@/components/routeAnimationContainer';

// this is like the layout.tsx file of Nextjs

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // there are more options — easing curve, wheel multiplier, etc.
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Toaster position="bottom-right" />
        <RouteAnimationContainer>
          <Outlet />
        </RouteAnimationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
