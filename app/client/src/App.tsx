import Navbar from './components/navbar';
import HeroImg from './assets/hero/3.jpg';
import { Link } from '@tanstack/react-router';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import bgImage from './assets/hero/1.jpg';

// direction each box enters from, keyed to visual position
const boxVariants = {
  hidden: (direction: 'left' | 'right' | 'down') => ({
    opacity: 0,
    x: direction === 'left' ? -60 : direction === 'right' ? 60 : 0,
    y: direction === 'down' ? 60 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

const textVariants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18, delay: 0.15 },
  },
};

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 20,
    restDelta: 0.001,
  });
  const padding = useTransform(smoothProgress, [0, 1], ['5%', '80%']);
  const paddingSmall = useTransform(smoothProgress, [0, 1], ['0%', '20%']);

  const { scrollYProgress: pinProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  });
  const smoothPinProgress = useSpring(pinProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const paddingP = useTransform(pinProgress, [0, 1], ['0%', '100%']);
  const aboutClip = useTransform(
    smoothPinProgress,
    [0.5, 1],
    ['inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
  );
  const heroContentY = useTransform(
    smoothPinProgress,
    [0, 0.5],
    ['0%', '-15%'],
  );

  const shrinkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: shrinkProgress } = useScroll({
    target: shrinkRef,
    offset: ['start start', 'end end'],
  });
  // shrink completes within the first 40% of the wrapper's scroll room,
  // then cta just sits pinned-small while footer scrolls normally beneath
  const shrinkPhase = useTransform(shrinkProgress, [0, 0.4], [0, 1]);
  const movePhase = useTransform(shrinkProgress, [0, 1], [0, 1]);
  const scale = useTransform(shrinkPhase, [0, 1], [1, 0.94]);
  const y = useTransform(movePhase, [0, 1], ['0%', '-85%']);

  return (
    <main className="app relative">
      <motion.nav
        className="navbar fixed top-0 z-50"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Navbar />
      </motion.nav>

      <div ref={pinRef} className="relative h-[200vh]">
        <section
          className="hero sticky top-0 h-screen overflow-hidden"
          ref={heroRef}
        >
          <motion.img
            src={HeroImg}
            alt="hero"
            className="absolute inset-0 w-full h-[120%] object-cover -z-10 blur-xs"
            style={{ y: heroContentY }}
          />
          <div className="grid grid-cols-3 grid-rows-[auto_auto_auto_1fr] md:grid-rows-4 h-screen md:pt-40 md:pb-10 pb-3 pt-[70%] gap-y-2">
            <motion.span
              className="md:text-main text-5xl col-span-3 min-w-0 pl-6 md:pl-15 font-bold relative w-fit"
              style={{ paddingLeft: padding }}
            >
              WATCH
            </motion.span>
            <motion.span
              className="md:text-main text-5xl col-span-3 justify-self-center min-w-0 font-bold w-fit"
              style={{ paddingLeft: paddingSmall }}
            >
              WITH
            </motion.span>
            <motion.span
              className="md:text-main text-5xl col-span-3 justify-self-end min-w-0 pr-6 md:pr-15 font-bold w-fit"
              style={{ paddingRight: padding }}
            >
              SYNC
            </motion.span>
            <motion.p
              className="col-span-3 self-end mx-auto md:mx-0 md:px-10 md:pl-10 text-sm w-[340px]"
              style={{ paddingBottom: paddingP }}
            >
              Lorem ipsum dolor sit abet cons ecte tur adipisicing elit. Rep
              ellat dicta nulla nihil
            </motion.p>
          </div>
        </section>

        <motion.section
          className="about sticky top-0 h-screen w-full bg-black"
          style={{ clipPath: aboutClip }}
        >
          <div className="w-fit mx-auto pt-10 flex gap-2 items-center">
            <span className="block size-4 rounded-full bg-white"></span>
            <span className="text-lg">HOW IT WORKS</span>
          </div>
          <div className="md:grid grid-cols-[450px_1fr_1fr] grid-rows-3 h-[90%] md:mt-10 mt-4">
            <div className="col-span-1 row-span-3 self-center flex flex-col md:gap-5 md:pl-9 gap-3 ml-2 mr-4 mb-5 md:mb-0">
              <p className="text-md font-semibold md:w-[80%]">
                Three steps between you and movie night with friends, wherever
                they are.
              </p>
              <p className="text-sm text-neutral-500 md:w-[80%]">
                No downloads, no waiting for someone to catch up. Set it up once
                and let the sync handle the rest.
              </p>
            </div>
            <motion.div
              className="col-span-2 row-span-3 grid grid-cols-2 grid-rows-2 md:mr-9 gap-1.25 md:gap-2.75 h-[75%] md:h-full md:m-0 mx-2"
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <motion.div
                custom="left"
                variants={boxVariants}
                className="bg-neutral-700 col-span-2 md:col-span-1 relative"
              >
                <span className="text-lg font-semibold absolute bottom-5 left-5 text-neutral-300">
                  Create Room
                </span>
              </motion.div>
              <motion.div
                custom="right"
                variants={boxVariants}
                className="bg-neutral-700 md:row-span-2 relative"
              >
                <span className="text-lg font-semibold absolute bottom-10 left-5 text-neutral-300">
                  Press Play Together
                </span>
              </motion.div>
              <motion.div
                custom="down"
                variants={boxVariants}
                className="bg-neutral-700 relative"
              >
                <span className="text-lg font-semibold absolute bottom-10 left-5 text-neutral-300">
                  Invite Friends
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* features section */}
      <section className="features h-screen">
        <div className="w-fit mx-auto mt-8 flex gap-2 items-center">
          <span className="block size-4 rounded-full bg-white"></span>
          <span className="text-lg">WHY US?</span>
        </div>
        <motion.div
          className="grid md:grid-cols-4 grid-cols-2 grid-rows-2 h-[85%] md:gap-2.75 gap-1.25 md:mx-10 mx-2 mt-10"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.div
            custom="left"
            variants={boxVariants}
            className="relative bg-neutral-700 md:col-span-2 md:row-span-2 overflow-hidden group z-0"
          >
            <img
              src={bgImage}
              alt="real time sync"
              className="absolute inset-0 object-cover w-full h-full group-active:w-[120%] group-active:h-[120%] group-hover:w-[120%] group-hover:h-[120%] transition-all duration-300 z-10"
            />
            <span className="md:text-xl font-semibold absolute md:bottom-5 md:left-5 bottom-2 left-2 text-neutral-300 group-hover:-translate-y-10 transition-all duration-300 z-30 group-active:-translate-y-10">
              Real Time Sync
            </span>
            <p className="text-neutral-500 md:text-md text-[10px] absolute -bottom-10 md:left-5 left-2 opacity-0 group-hover:opacity-100 group-hover:bottom-0 group-active:opacity-100 group-active:bottom-0 z-30 transition-all duration-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
              reprehenderit tempora sunt.
            </p>
          </motion.div>
          <motion.div
            custom="right"
            variants={boxVariants}
            className="bg-neutral-700 md:col-span-2"
          />
          <motion.div
            custom="down"
            variants={boxVariants}
            className="bg-neutral-700"
          />
          <motion.div
            custom="left"
            variants={boxVariants}
            className="bg-neutral-700"
          />
        </motion.div>
      </section>

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
              className="relative left-1/2 -translate-x-1/2 bg-neutral-300 text-black font-semibold rounded-xl w-62.5 h-15 mt-4 "
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
            {/* logo */}
            <div className="mb-16">
              <svg viewBox="0 0 40 40" className="h-9 w-9" fill="currentColor">
                <path d="M20 4 L34 34 L20 26 L6 34 Z" />
              </svg>
            </div>

            {/* info columns */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-6 pb-20 border-b border-black/10">
              <div>
                <p className="text-xs tracking-widest text-neutral-500 mb-4">
                  INFOS
                </p>
                <p className="text-sm mb-1">Delhi, India</p>
                <p className="text-sm mb-1">contact@yourprod.com</p>
                <p className="text-sm">+91 00000 00000</p>
              </div>

              <div>
                <p className="text-xs tracking-widest text-neutral-500 mb-4">
                  PAGES
                </p>
                <ul className="space-y-1.5 text-sm text-neutral-500">
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Work
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Archive
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs tracking-widest text-neutral-500 mb-4">
                  SOCIALS
                </p>
                <ul className="space-y-1.5 text-sm text-neutral-500">
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-black transition-colors">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>

              <div>
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
                  <a href="#" className="underline text-black">
                    Akash Samanta
                  </a>
                </p>
              </div>
            </div>

            {/* big image-clipped wordmark */}
            {/* big image-clipped wordmark */}
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
    </main>
  );
}

export default App;
