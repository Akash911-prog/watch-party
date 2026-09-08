import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) throw Route.redirect({ to: '/' });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
