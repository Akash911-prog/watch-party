import App from '@/App';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unprotected/home')({
  component: App,
});
