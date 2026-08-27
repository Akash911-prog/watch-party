import { Link } from '@tanstack/react-router';
import { motion, useScroll, useTransform, type Variants } from 'motion/react';
import bgImage from '@/assets/hero/1.jpg';

const Footer = ({
  shrinkRef,
}: {
  shrinkRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const textVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 18, delay: 0.15 },
    },
  };
  const { scrollYProgress: shrinkProgress } = useScroll({
    target: shrinkRef,
    offset: ['start start', 'end end'],
  });
  const shrinkPhase = useTransform(shrinkProgress, [0, 0.4], [0, 1]);
  const scale = useTransform(shrinkPhase, [0, 1], [1, 0.94]);
  const y = useTransform(shrinkProgress, [0, 1], ['0%', '-85%']);

  return (
    <div className="relative bg-white" ref={shrinkRef}>
      <motion.section
        className="cta h-screen sticky top-0 overflow-hidden z-50 bg-black"
        style={{ scale, y }}
      >
        <motion.div
          className="relative w-fit h-fit mx-auto top-1/2 -translate-y-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            className="w-fit h-fit md:text-9xl text-5xl tracking-tight leading-tight"
            variants={textVariants}
          >
            LIGHTS DOWN,
          </motion.div>
          <motion.div
            className="w-fit h-fit md:text-9xl text-5xl tracking-tight leading-tight"
            variants={textVariants}
          >
            ROLL THE TAPE
          </motion.div>
          <motion.button
            className="relative left-1/2 -translate-x-1/2 bg-neutral-300 text-black font-semibold rounded-xl w-62.5 h-15 mt-4"
            variants={textVariants}
          >
            <Link
              to="/dashboard"
              className="text-lg w-full h-full absolute inset-0 flex items-center justify-center"
            >
              Get Started
            </Link>
          </motion.button>
        </motion.div>
      </motion.section>

      <footer className="sticky bottom-0 w-full bg-white text-black h-[80%]">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 pt-16 pb-6">
          <div className="mb-16">
            <svg viewBox="0 0 40 40" className="h-9 w-9" fill="currentColor">
              <path d="M20 4 L34 34 L20 26 L6 34 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-10 gap-x-6 pb-20 border-b border-black/10">
            <div>
              <p className="text-xs tracking-widest text-neutral-500 mb-4">
                INFOS
              </p>
              <p className="text-sm mb-1">Delhi, India</p>
              <p className="text-sm mb-1">akashsamanta0571@gmail.com</p>
              <p className="text-sm">+91 7503242769</p>
            </div>

            <div className="ml-10">
              <p className="text-xs tracking-widest text-neutral-500 mb-4">
                PAGES
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-500">
                {['Home', 'Dashboard', 'About', 'Contact'].map((label) => (
                  <li key={label}>
                    <a
                      href={`/${label.toLowerCase()}`}
                      className="hover:text-black transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs tracking-widest text-neutral-500 mb-4">
                SOCIALS
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-500">
                {['Instagram', 'LinkedIn'].map((label) => (
                  <li key={label}>
                    <a href="#" className="hover:text-black transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ml-10">
              <p className="text-xs tracking-widest text-neutral-500 mb-4">
                LEGALS
              </p>
              <ul className="space-y-1.5 text-sm text-neutral-500">
                <li>
                  <a href="#" className="hover:text-black transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 md:text-right self-end">
              <p className="text-xs tracking-widest text-neutral-500">
                DESIGNED &amp; DEVELOPED BY{' '}
                <a
                  href="https://github.com/Akash911-prog"
                  className="underline text-black"
                >
                  Akash Samanta
                </a>
              </p>
            </div>
          </div>

          <div className="relative pt-10 pb-2 select-none overflow-hidden">
            <svg
              viewBox="0 0 1000 180"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="wordmarkFill"
                  patternUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <image
                    href={bgImage}
                    x="0"
                    y="0"
                    width="1000"
                    height="180"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>
              <text
                x="0"
                y="150"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                className="font-bold"
                style={{ fontSize: '180px', fill: 'url(#wordmarkFill)' }}
              >
                SHOWTIME
              </text>
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
