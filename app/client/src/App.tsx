import HeroImg from './assets/hero/3.jpg';
import bgImage from './assets/hero/1.jpg';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react';
import { useRef } from 'react';

// ─── shared variants ────────────────────────────────────────────

const boxVariants: Variants = {
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

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

type Direction = 'left' | 'right' | 'down';

// ─── AboutBox: label pinned bottom-left, no hover reveal ───────

interface AboutBoxProps {
  label: string;
  direction: Direction;
  className?: string;
}

function AboutBox({ label, direction, className = '' }: AboutBoxProps) {
  return (
    <motion.div
      custom={direction}
      variants={boxVariants}
      className={`bg-neutral-700 relative ${className}`}
    >
      <span className="text-lg font-semibold absolute bottom-10 left-5 text-neutral-300">
        {label}
      </span>
    </motion.div>
  );
}

const aboutBoxes: (AboutBoxProps & { className: string })[] = [
  {
    label: 'Create Room',
    direction: 'left',
    className: 'col-span-2 md:col-span-1',
  },
  {
    label: 'Press Play Together',
    direction: 'right',
    className: 'md:row-span-2',
  },
  { label: 'Invite Friends', direction: 'down', className: '' },
];

// ─── FeatureCard: image zoom + text lift + description reveal ─

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  direction: Direction;
  className?: string;
  order?: string;
}

function FeatureCard({
  title,
  description,
  image,
  direction,
  className = '',
  order = '',
}: FeatureCardProps) {
  return (
    <motion.div
      custom={direction}
      variants={boxVariants}
      className={`relative bg-neutral-700 overflow-hidden group z-0 ${className} ${order}`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 object-cover w-full h-full group-hover:w-[120%] group-hover:h-[120%] group-active:w-[120%] group-active:h-[120%] transition-all duration-300 z-10"
      />
      <span className="md:text-xl font-semibold absolute md:bottom-5 md:left-5 bottom-2 left-2 text-neutral-300 md:group-hover:-translate-y-15 group-hover:-translate-y-10 group-active:-translate-y-10 transition-all duration-300 z-30">
        {title}
      </span>
      <p className="text-neutral-500 md:text-md text-[10px] absolute -bottom-10 md:left-5 left-2 opacity-0 group-hover:opacity-100 group-hover:bottom-0 group-active:opacity-100 group-active:bottom-0 z-30 transition-all duration-300">
        {description}
      </p>
    </motion.div>
  );
}

const featureCards: (FeatureCardProps & { className: string })[] = [
  {
    title: 'Real Time Sync',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi reprehenderit tempora sunt.',
    image: bgImage,
    direction: 'left',
    className: 'md:col-span-2 md:row-span-2',
    order: 'order-1',
  },
  {
    title: 'Group Watch Parties',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi reprehenderit tempora sunt.',
    image: HeroImg,
    direction: 'right',
    className: 'md:col-span-2',
    order: 'order-2',
  },
  {
    title: 'Cross Platform',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi reprehenderit tempora sunt.',
    image: bgImage,
    direction: 'right',
    className: '',
    order: 'order-4',
  },
  {
    title: 'Zero Setup',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi reprehenderit tempora sunt.',
    image: HeroImg,
    direction: 'down',
    className: '',
    order: 'order-3',
  },
];

// ─── section header (the dot + label pattern used 3x) ──────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="w-fit mx-auto mt-8 flex gap-2 items-center">
      <span className="block size-4 rounded-full bg-white"></span>
      <span className="text-lg">{text}</span>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────

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

  return (
    <main className="app relative bg-black">
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
              {aboutBoxes.map((box) => (
                <AboutBox key={box.label} {...box} />
              ))}
            </motion.div>
          </div>
        </motion.section>
      </div>

      <section className="features h-screen bg-black">
        <SectionLabel text="WHY US?" />
        <motion.div
          className="grid md:grid-cols-4 grid-cols-2 grid-rows-2 h-[85%] md:gap-2.75 gap-1.25 md:mx-10 mx-2 mt-10"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {featureCards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </motion.div>
      </section>
    </main>
  );
}

export default App;
