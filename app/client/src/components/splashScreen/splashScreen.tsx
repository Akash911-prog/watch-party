import { motion } from 'motion/react';
import { useRef } from 'react';

const SplashScreen = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="absolute top-0 bottom-0 w-screen h-screen bg-black z-999"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        delay: 1,
      }}
      onAnimationComplete={() => (ref.current!.style.zIndex = '-1000')}
    ></motion.div>
  );
};

export default SplashScreen;
