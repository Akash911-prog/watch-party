import { AppSidebar } from '@/components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { RouteErrorFallback } from '@/components/common/route-error-fallback';

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated)
      throw Route.redirect({
        to: '/',
        search: { redirect: location.href },
      });
  },
  errorComponent: RouteErrorFallback,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider className="md:grid grid-cols-[clamp(200px,20vw,300px)_1fr] h-full">
      <AppSidebar />
      <main className="min-w-full min-h-screen overflow-x-hidden overflow-y-scroll">
        <div className="md:hidden w-full h-10 fixed px-2 top-0 z-50 bg-black flex justify-between items-center border-b-neutral-500 border">
          <div>SHOWTIME</div>
          <div>
            <SidebarTrigger className="size-10" />
          </div>
        </div>
        <div className="pt-12.5 md:pt-2 px-2 w-full min-h-full">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
