import AnimatedRoute from '@/components/animatedRoute';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import SplashScreen from '@/components/splashScreen';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { motion } from 'motion/react';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/_unprotected')({
  component: RouteComponent,
});

function RouteComponent() {
  const shrinkRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-white">
      <SplashScreen />
      <motion.nav
        className="navbar fixed top-0 z-50"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: loaded ? 'none' : '' }}
      >
        <Navbar />
      </motion.nav>
      <AnimatedRoute
        variant="cover"
        onAnimationStart={() => setLoaded(true)}
        onAnimationComplete={() => setLoaded(false)}
      >
        <motion.nav
          className="navbar fixed top-0 z-50"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: loaded ? '' : 'none' }}
        >
          <Navbar />
        </motion.nav>
        <div ref={shrinkRef} className="min-h-screen">
          <Outlet />
        </div>
        <Footer shrinkRef={shrinkRef} />
      </AnimatedRoute>
    </div>
  );
}
