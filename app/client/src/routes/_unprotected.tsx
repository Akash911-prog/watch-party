import AnimatedNavbar from '@/components/animatedNavbar';
import AnimatedRoute from '@/components/animatedRoute';
import Footer from '@/components/footer';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { useRef } from 'react';

export const Route = createFileRoute('/_unprotected')({
  component: RouteComponent,
});

function RouteComponent() {
  const shrinkRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-black">
      <AnimatedNavbar />
      <AnimatedRoute variant="cover">
        <div ref={shrinkRef} className="min-h-screen">
          <Outlet />
        </div>
        <Footer shrinkRef={shrinkRef} />
      </AnimatedRoute>
    </div>
  );
}
