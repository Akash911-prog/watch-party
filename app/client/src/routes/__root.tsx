import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import type { RouterContext } from '../router';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toast';

// this is like the layout.tsx file of Nextjs

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Toaster position="bottom-right" />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
