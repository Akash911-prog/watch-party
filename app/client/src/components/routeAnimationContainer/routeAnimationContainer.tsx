import { useRouter } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RouteAnimationContainerProps {
  children: ReactNode;
}

function RouteAnimationContainer({ children }: RouteAnimationContainerProps) {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const ref = useRef<HTMLDivElement>(null);

  const [transitionKey, setTransitionKey] = useState(0);

  useEffect(() => {
    return router.subscribe('onBeforeNavigate', () => {
      setTransitionKey((key) => key + 1);
    });
  }, [router]);

  return (
    <div className="relative">
      {/* Route */}
      <AnimatePresence mode="popLayout" initial={true}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.9,
            duration: 0.3,
          }}
          className="z-30"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Cover */}
      <motion.div
        ref={ref}
        key={transitionKey}
        className="fixed inset-0 bg-black z-1000"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
        onAnimationComplete={() => (ref.current!.style.zIndex = '-1')}
      />
    </div>
  );
}

export default RouteAnimationContainer;
