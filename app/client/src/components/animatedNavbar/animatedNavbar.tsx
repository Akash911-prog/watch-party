import { motion, useAnimationControls } from 'motion/react';
import { useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { routeVariants, pageTransition } from '@/variants/animatedRoute';
import Navbar from '../navbar';

export default function AnimatedNavbar() {
  const controls = useAnimationControls();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const firstRun = useRef(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (firstRun.current) {
      firstRun.current = false;
      controls.start('in').then(() => {
        if (!cancelled) setHasLoaded(true);
      });
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      await controls.start('out');
      if (cancelled) return;
      controls.set('initial');
      await controls.start('in');
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, controls]);

  return (
    <div>
      <motion.nav
        className="navbar fixed top-0 z-50"
        variants={routeVariants.navLoad}
        initial="initial"
        animate={controls}
        transition={pageTransition}
      >
        <Navbar />
      </motion.nav>
      <motion.nav
        className={`navbar fixed top-0 z-50 ${hasLoaded ? 'hidden' : ''}`}
        variants={routeVariants.nav}
        initial="initial"
        animate={controls}
        transition={pageTransition}
      >
        <Navbar />
      </motion.nav>
    </div>
  );
}
