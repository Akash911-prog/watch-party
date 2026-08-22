// Option 2 — create a configured instance, like axios.create(...)
import { createApiClient } from './api-client';

export const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  credentials: 'include',
});
