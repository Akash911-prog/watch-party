import { QueryClient } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { NotFoundPage } from './components/NotFound';
import type { User } from '@watchparty/shared/types';
import { api } from './lib/api-client';
import { useAuthStore } from './hooks/useAuth';

export type RouterContext = NotAuthenticated | Authenticated;

export interface NotAuthenticated {
  queryClient: QueryClient;
  user: null;
  isAuthenticated: false;
}

export interface Authenticated {
  queryClient: QueryClient;
  user: User;
  isAuthenticated: true;
}

export async function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient, user: null, isAuthenticated: false },
    defaultNotFoundComponent: NotFoundPage,
  });

  try {
    const user = await api.get<User>('/auth/verify');
    useAuthStore.getState().setUser(user);
    router.update({ context: { queryClient, user, isAuthenticated: true } });
  } catch {
    useAuthStore.getState().setUser(null);
    router.update({
      context: { queryClient, user: null, isAuthenticated: false },
    });
  }

  return router;
}
