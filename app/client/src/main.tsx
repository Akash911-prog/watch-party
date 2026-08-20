import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { getRouter } from './router.tsx';
import { RouterProvider } from '@tanstack/react-router';

const router = getRouter();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
