import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useRef } from 'react';

export const Route = createFileRoute('/_unprotected')({
  component: RouteComponent,
});

function RouteComponent() {
  const shrinkRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <motion.nav
        className="navbar fixed top-0 z-50"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Navbar />
      </motion.nav>
      <div ref={shrinkRef} className="min-h-screen">
        <Outlet />
      </div>
      <Footer shrinkRef={shrinkRef} />
    </div>
  );
}
