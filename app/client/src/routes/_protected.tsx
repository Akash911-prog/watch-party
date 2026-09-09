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
        <div className="md:hidden w-full h-10 fixed px-2 top-0 z-50 bg-black flex justify-between items-center border-b-neutral-500 border">
          <div>SHOWTIME</div>
          <div>
            <SidebarTrigger className="size-10" />
          </div>
        </div>
        <div className="pt-12.5 px-2">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
