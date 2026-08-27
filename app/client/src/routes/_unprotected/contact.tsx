import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unprotected/contact')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen bg-black">Hello "/_unprotected/contact"!</div>
  );
}
